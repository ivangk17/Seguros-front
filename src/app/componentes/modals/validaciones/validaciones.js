import validator from "validator";

export const validarCliente = (formData, atributos) => {
  const newErrors = {};
  const formDataTrimeado = Object.keys(formData).reduce((acc, key) => {
    acc[key] = formData[key]?.trim() || ""; // Se trimea el valor o se asigna una cadena vacía si es undefined
    return acc;
  }, {});

  atributos.forEach((atributo) => {
    const value = formDataTrimeado[atributo.name];

    if (atributo.required && !value) {
      newErrors[atributo.name] = `${atributo.placeholder} es obligatorio`;
    }

    if (atributo.name === "dni") {
      if (!value || value.length < 7 || value.length > 8) {
        newErrors[atributo.name] = "El DNI debe tener entre 7 y 8 caracteres";
      } else if (!validator.isNumeric(value)) {
        newErrors[atributo.name] = "El DNI debe ser numérico";
      } else if (parseInt(value) <= 0) {
        newErrors[atributo.name] = "El DNI no puede ser negativo";
      }
    }

    if (atributo.name === "email" && value && !validator.isEmail(value)) {
      newErrors[atributo.name] = "El correo electrónico no es válido";
    }

    if (atributo.name === "name" || atributo.name === "lastname") {
      if (!value || !validator.isAlpha(value, "es-ES", { ignore: " " })) {
        newErrors[
          atributo.name
        ] = `${atributo.placeholder} no es válido. Solo se permiten letras y espacios`;
      }
    }

    if (atributo.name === "date_of_birth" && value) {
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();
      const day = today.getDate() - birthDate.getDate();
      if (birthDate > today) {
        newErrors[atributo.name] = "La fecha de nacimiento no puede ser futura";
      } else if (
        age < 18 ||
        (age === 18 && (month < 0 || (month === 0 && day < 0)))
      ) {
        newErrors[atributo.name] = "Debe ser mayor de 18 años";
      }
    }

    if (atributo.name === "apartment" && value) {
      if (!validator.isAlphanumeric(value)) {
        newErrors[atributo.name] =
          "El departamento solo puede contener letras y números";
      } else if (value.length > 6) {
        newErrors[atributo.name] =
          "El departamento no puede tener más de 6 caracteres";
      }
    }

    if (atributo.name === "phone" && value) {
      if (!validator.isNumeric(value)) {
        newErrors[atributo.name] = "El teléfono solo puede contener números";
      } else if (value.length < 7 || value.length > 12) {
        newErrors[atributo.name] =
          "El teléfono debe tener entre 7 y 12 dígitos";
      } else if (parseInt(value) <= 0) {
        newErrors[atributo.name] = "El teléfono debe ser mayor que 0";
      }
    }

    if (atributo.name === "zip_code" && value) {
      if (!validator.isNumeric(value)) {
        newErrors[atributo.name] = "El código postal debe ser numérico";
      } else if (value.length !== 4) {
        newErrors[atributo.name] =
          "El código postal debe tener exactamente 4 dígitos";
      } else if (parseInt(value) <= 0) {
        newErrors[atributo.name] = "El código postal debe ser mayor que 0";
      }
    }

    if (atributo.name === "address" && value) {
      const addressRegex = /^[a-zA-Z0-9.,'\s]*$/;
      if (!addressRegex.test(value)) {
        newErrors[atributo.name] =
          "La calle solo puede contener letras, números y los caracteres . , '";
      }
    }

    if (atributo.name === "number" && value) {
      if (!validator.isNumeric(value)) {
        newErrors[atributo.name] =
          "El número de la calle debe ser un valor numérico";
      } else if (parseInt(value) <= 0) {
        newErrors[atributo.name] = "El número de la calle debe ser mayor que 0";
      }
    }

    const MAX_FLOOR = 200;
    if (atributo.name === "floor" && value) {
      if (!validator.isNumeric(value)) {
        newErrors[atributo.name] = "El piso debe ser un valor numérico";
      } else if (parseInt(value) < 0) {
        newErrors[atributo.name] = "El piso debe ser mayor o igual que 0";
      } else if (parseInt(value) > MAX_FLOOR) {
        newErrors[atributo.name] = `El piso no puede ser mayor a ${MAX_FLOOR}`;
      }
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

