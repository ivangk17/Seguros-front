export const validarCliente = (formData, atributos) => {
  const newErrors = {};
  atributos.forEach((atributo) => {
    const value = formData[atributo.name];
    if (atributo.required && !value) {
      newErrors[atributo.name] = `${atributo.placeholder} es obligatorio`;
    }
    if (atributo.name === "dni" && (value?.length < 7 || value?.length > 8)) {
      newErrors[atributo.name] = "El DNI debe tener entre 7 y 8 caracteres";
    }
    if (atributo.name === "cuit" && !isValidCUIT(value)) {
      newErrors[atributo.name] = "El CUIT no es válido";
    }
    if (atributo.name === "email" && !isValidEmail(value)) {
      newErrors[atributo.name] = "El correo electrónico no es válido";
    }
  });
  return newErrors;
};

// Validaciones para la creación de pólizas
export const validarPoliza = (formData, atributos) => {
  const newErrors = {};
  atributos.forEach((atributo) => {
    const value = formData[atributo.name];
    if (atributo.required && !value) {
      newErrors[atributo.name] = `${atributo.placeholder} es obligatorio`;
    }
    if (atributo.name === "anio" && (value?.length !== 4 || isNaN(value))) {
      newErrors[atributo.name] = "Año no válido";
    }
    if (atributo.name === "primaSegura" && (isNaN(value) || value <= 0)) {
      newErrors[atributo.name] = "Prima Segura no válida";
    }
    if (atributo.name === "deducible" && (isNaN(value) || value < 0)) {
      newErrors[atributo.name] = "Deducible no válido";
    }
    if (atributo.name === "dominio" && !isValidDominio(value)) {
      newErrors[atributo.name] = "Dominio no válido";
    }
    if (atributo.name === "aseguradora" && (!value || value.length < 3)) {
      newErrors[atributo.name] = "Aseguradora debe tener al menos 3 caracteres";
    }
    if (atributo.name === "marca" && (!value || value.length < 3)) {
      newErrors[atributo.name] = "Marca debe tener al menos 3 caracteres";
    }
    if (atributo.name === "modelo" && (!value || value.length < 3)) {
      newErrors[atributo.name] = "Modelo debe tener al menos 3 caracteres";
    }
    if (atributo.name === "color" && (!value || value.length < 3)) {
      newErrors[atributo.name] = "Color es obligatorio";
    }
    if (atributo.name === "numeroIdentificador" && !value) {
      newErrors[atributo.name] = "Número identificador es obligatorio";
    }
    if (atributo.name === "dni" && !value) {
      newErrors[atributo.name] = "DNI es obligatorio";
    }
    if (atributo.name === "tipoCobertura" && !value) {
      newErrors[atributo.name] = "Tipo de Cobertura es obligatorio";
    }
    if (atributo.name === "tipoVehiculo" && !value) {
      newErrors[atributo.name] = "Tipo de Vehiculo es obligatorio";
    }
  });
  return newErrors;
};

const isValidCUIT = (cuit) => {
  if (!cuit || cuit.length !== 11) return false;

  const multipliers = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  const digits = cuit.split('').map(Number);
  const checkDigit = digits.pop();

  const sum = digits.reduce((acc, digit, index) => acc + digit * multipliers[index], 0);
  const mod11 = 11 - (sum % 11);

  return mod11 === checkDigit || (mod11 === 11 && checkDigit === 0);
};

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const isValidDominio = (dominio) => {
  const regex = /^[A-Z]{3} \d{3}$|^[A-Z]{2} \d{3} [A-Z]{2}$/i; // Ejemplo de validación de dominio (ABC 123 o AB 123 CD)
  return regex.test(dominio);
};

