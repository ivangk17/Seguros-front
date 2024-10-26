"use client";
import localFont from "next/font/local";
import "../globals.css";
import { AuthProvider, useAuth } from "../../context/AuthContext";
import SideBar from "../componentes/menu/SideBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const menuAsegurador = [
  { url: "/clientes", descripcion: "Clientes" },
  { url: "/polizas", descripcion: "Polizas" },
  { url: "/solicitudes", descripcion: "Solicitud" },
  { url: "/editarPerfil", descripcion: "Editar perfil" },
  { url: "/logout", descripcion: "Cerrar sesión" },
];

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

  if (valid === null) {
    return null;
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <SideBar items={menuAsegurador} />
          <div className="p-4 sm:ml-64">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
