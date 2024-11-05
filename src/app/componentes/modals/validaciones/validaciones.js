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


//TODO
//completar las validaciones para la creacion de polizas
export const validarPoliza = (formData, atributos) => {
  const newErrors = {};
  atributos.forEach((atributo) => {
    const value = formData[atributo.name];
    if (atributo.required && !value) {
      newErrors[atributo.name] = `${atributo.placeholder} es obligatorio`;
    }
    if (atributo.name === "dni" && (value?.length < 7 || value?.length > 8)) {
      newErrors[atributo.name] = "El DNI debe tener entre 7 y 8 caracteres";
    }
    if (!isNaN(value) && value < 1) {
      newErrors[atributo.name] = "No es valido"
    }
    if (atributo.name === "anio" && (value?.length < 4)) {
      newErrors[atributo.name] = "Año no valido"
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
