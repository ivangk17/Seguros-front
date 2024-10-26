"use client";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdministracionPage() {
 
  const crearAsegurador = () => {
    router.push("/crearAsegurador");
  };

  const listarClientes = () => {
    router.push("/listarClientes");
  };

  return <h1>Admisnitracion</h1>;
}
