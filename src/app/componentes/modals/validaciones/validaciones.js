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

    if (atributo.name === "dni" && (value?.length < 7 || value?.length > 8)) {
      newErrors[atributo.name] = "El DNI debe tener entre 7 y 8 caracteres";
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
      }
    }

    if (atributo.name === "zip_code" && value) {
      if (!validator.isNumeric(value)) {
        newErrors[atributo.name] = "El código postal debe ser numérico";
      } else if (value.length !== 4) {
        newErrors[atributo.name] =
          "El código postal debe tener exactamente 4 dígitos";
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
      }
    }

    const MAX_FLOOR = 200;
    if (atributo.name === "floor" && value) {
      if (!validator.isNumeric(value)) {
        newErrors[atributo.name] = "El piso debe ser un valor numérico";
      } else if (parseInt(value) > MAX_FLOOR) {
        newErrors[atributo.name] = `El piso no puede ser mayor a ${MAX_FLOOR}`;
      }
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
      newErrors[atributo.name] = "No es valido";
    }
    if (atributo.name === "anio" && value?.length < 4) {
      newErrors[atributo.name] = "Año no valido";
    }
  });
  return newErrors;
};
