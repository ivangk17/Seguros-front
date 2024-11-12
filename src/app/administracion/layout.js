"use client";
import localFont from "next/font/local";
import "../globals.css";

import SideBar from "../componentes/menu/SideBar";
import ConfirmLogoutModal from "../componentes/modals/ConfirmModalLogout";
import ScreenLoader from "../componentes/ScreenLoader";
import { AuthProvider, useAuth } from "../../context/AuthContext";
import jwt, { verify } from "jsonwebtoken";

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
  const { token, validateToken, setToken, role, setRole } = useAuth();
  const [valid, setValid] = useState(null);
  const [verify, setVerify] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [cerrandoSesion, setCerrandoSesion] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!token || !role) {
        router.push("/");
        return;
      }
      const isValid = await validateToken();
      if (isValid) {
        setValid(true);
        const decode = jwt.decode(token);
        setRole(decode.role);
      } else {
        setToken(null);
        setRole(null);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");
        router.push("/");
      }
    };

    checkAuth();
  }, [verify]);

  const menusPorRol = {
    asegurador: [
      {
        url: "#",
        descripcion: "Clientes",
        onClick: () => {
          setVerify((prev) => !prev);
          router.push("/administracion/clientes");
        },
      },
      {
        url: "#",
        descripcion: "Polizas",
        onClick: () => {
          setVerify((prev) => !prev);
          router.push("/administracion/polizas");
        },
      },
      {
        url: "#",
        descripcion: "Solicitudes",
        onClick: () => {
          setVerify((prev) => !prev);
          router.push("/administracion/solicitudes");
        },
      },
      {
        url: "/administracion/editarPerfil",
        descripcion: "Editar perfil",
        onClick: () => {
          router.push("/administracion/editarPerfil");
        },
      },
      {
        url: "#",
        descripcion: "Cerrar sesión",
        onClick: () => {
          setShowLogoutModal(true);
        },
      },
    ],
    admin: [
      {
        url: "#",
        descripcion: "Aseguradores",
        onClick: () => {
          setVerify((prev) => !prev);
          router.push("/administracion/aseguradores");
        },
      },
      {
        url: "#",
        descripcion: "Cerrar sesión",
        onClick: () => {
          setShowLogoutModal(true);
        },
      },
    ],
  };
  const handleLogout = () => {
    setShowLogoutModal(false);
    setCerrandoSesion(true);

    setTimeout(() => {
      setCerrandoSesion(false);

      // Las acciones que quieres que se ejecuten después del delay
      setToken(null);
      setRole(null);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");

      router.push("/");
    }, 1000); // Espera de 1 segundo
  };
  if (valid === null || role === null) {
    return null;
  }

  return (
    <AuthProvider>
      <main
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {cerrandoSesion ? <ScreenLoader /> : ""}
        <SideBar items={menusPorRol[role]} />
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
