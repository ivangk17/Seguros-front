"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ScreenLoader from "../componentes/ScreenLoader";
import { useAuth } from "@/context/AuthContext";

export default function AdministracionPage() {
  const { role, token, setToken, setRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token || !role) {
      router.push("/");
      return;
    }
    if (role === "admin") {
      router.push("/administracion/aseguradores");
    } else if (role === "asegurador") {
      router.push("/administracion/clientes");
    } else {
     /*  sessionStorage.removeItem("role");
      sessionStorage.removeItem("token"); */
      router.push("/");
    }
  }, [token, role, router]);

  return <ScreenLoader />;
}
