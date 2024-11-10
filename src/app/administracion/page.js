"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ScreenLoader from "../componentes/ScreenLoader";

export default function AdministracionPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/administracion/clientes");
  }, [router]);

  return <ScreenLoader/>;
}
