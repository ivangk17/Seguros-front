"use client";
import localFont from "next/font/local";
import "../globals.css";

import SideBar from "../componentes/menu/SideBar";
import ConfirmLogoutModal from "../componentes/modals/ConfirmModalLogout";
import ScreenLoader from "../componentes/ScreenLoader";
import { AuthProvider, useAuth } from "../../context/AuthContext";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const router = useRouter();
  const { token, validateToken, setToken } = useAuth();
  const [valid, setValid] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [cerrandoSesion, setCerrandoSesion] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        router.push("/");
        return;
      }
      const isValid = await validateToken();
      if (isValid) {
        setValid(true);
      } else {
        setToken(null);
        sessionStorage.removeItem("token");
        router.push("/");
      }
    };

    checkAuth();
  }, [token, validateToken, setToken, router]);

  const menuAsegurador = [
    { url: "/administracion/clientes", descripcion: "Clientes" },
    { url: "/administracion/polizas", descripcion: "Polizas" },
    { url: "/administracion/solicitudes", descripcion: "Solicitudes" },
    { url: "/administracion/editarPerfil", descripcion: "Editar perfil" },
    {
      url: "#",
      descripcion: "Cerrar sesión",
      onClick: () => {
        setShowLogoutModal(true);
      },
    },
  ];

  const handleLogout = () => {
    setShowLogoutModal(false);
    setCerrandoSesion(true);
    const timer = setTimeout(() => {
      setCerrandoSesion(false);
      setToken(null);
      sessionStorage.removeItem("token");
    }, 1000);

    return () => clearTimeout(timer);
  };

  if (valid === null) {
    return null;
  }

  return (
    <AuthProvider>
      <main
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {cerrandoSesion ? <ScreenLoader /> : ""}
        <SideBar items={menuAsegurador} />
        <div className="p-4 sm:ml-64">{children}</div>

        <ConfirmLogoutModal
          show={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      </main>
    </AuthProvider>
  );
}
