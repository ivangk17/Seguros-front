"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ScreenLoader from "../componentes/ScreenLoader";
import { useAuth } from "@/context/AuthContext";

export default function AdministracionPage() {
  const router = useRouter();
  const {menu} = useAuth();
  console.log("asdasd");
  useEffect(() => {
    router.push("/administracion/clientes");
  }, [router]);

  return <ScreenLoader />;
}
