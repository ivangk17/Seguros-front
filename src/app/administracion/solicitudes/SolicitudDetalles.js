import React from 'react';
import Accordion from '../../componentes/acordeones/AcordionPrincipal';
import SecondaryAccordion from '../../componentes/acordeones/AcordionSecundario';

const SolicitudDetalles = ({selectedSolicitud}) => {

  const formatDate = (date) => {
    return date.toLocaleDateString();
  }
  return (
    <>
    <Accordion title="Información general">
        <p ><strong>Estado: </strong>{selectedSolicitud.estado}</p>
        <p ><strong>Daños asegurado: </strong> {selectedSolicitud.daniosVehiculoAsegurado}</p>
        <p ><strong>Daños afectado: </strong> {selectedSolicitud.daniosVehiculoAfectado}</p>
      </Accordion>
      <Accordion title="Propietario Asegurado">
        <SecondaryAccordion title="Datos de la Persona">
          <p ><strong>Nombre: </strong>{selectedSolicitud.propietarioAsegurado.datosPersona.nombreCompleto}</p>
          <p ><strong>CUIT: </strong>{selectedSolicitud.propietarioAsegurado.datosPersona.cuit}</p>
          <p ><strong>Email: </strong>{selectedSolicitud.propietarioAsegurado.datosPersona.email}</p>
          <p ><strong>Teléfono: </strong>{selectedSolicitud.propietarioAsegurado.datosPersona.telefono}</p>
          <p ><strong>Fecha de nacimiento: </strong>{formatDate(new Date(selectedSolicitud.propietarioAsegurado.datosPersona.fechaDeNacimiento))}</p>
          <p ><strong>Sexo: </strong>{selectedSolicitud.propietarioAsegurado.datosPersona.sexo}</p>
          <p ><strong>Domicilio: </strong>{`${selectedSolicitud.propietarioAsegurado.datosPersona.domicilio.address}, ${selectedSolicitud.propietarioAsegurado.datosPersona.domicilio.locality}, ${selectedSolicitud.propietarioAsegurado.datosPersona.domicilio.zip_code}, ${selectedSolicitud.propietarioAsegurado.datosPersona.domicilio.province}, ${selectedSolicitud.propietarioAsegurado.datosPersona.domicilio.country}`}</p>
        </SecondaryAccordion>
        <SecondaryAccordion title="Datos del Vehículo">
          <p ><strong>Tipo vehículo:</strong> {selectedSolicitud.propietarioAsegurado.vehiculo.datosVehiculo.tipoVehiculo}</p>
          <p ><strong>Marca y modelo:</strong> {selectedSolicitud.propietarioAsegurado.vehiculo.datosVehiculo.marca} {selectedSolicitud.propietarioAsegurado.vehiculo.datosVehiculo.modelo}</p>
          <p ><strong>Color:</strong> {selectedSolicitud.propietarioAsegurado.vehiculo.datosVehiculo.color}</p>
          <p ><strong>Año:</strong> {selectedSolicitud.propietarioAsegurado.vehiculo.datosVehiculo.anio}</p>
          <p ><strong>Dominio:</strong> {selectedSolicitud.propietarioAsegurado.vehiculo.datosVehiculo.dominio}</p>
          <p ><strong>Uso del Vehículo:</strong> {selectedSolicitud.propietarioAsegurado.vehiculo.usoDelVehiculo}</p>
        </SecondaryAccordion>
      </Accordion>
      <Accordion title="Conductor Asegurado">
        <SecondaryAccordion title="Datos de la Persona">
          <p ><strong>Nombre: </strong>{selectedSolicitud.conductorAsegurado.datosPersona.nombreCompleto}</p>
          <p ><strong>CUIT: </strong>{selectedSolicitud.conductorAsegurado.datosPersona.cuit}</p>
          <p ><strong>Email: </strong>{selectedSolicitud.conductorAsegurado.datosPersona.email}</p>
          <p ><strong>Teléfono: </strong>{selectedSolicitud.conductorAsegurado.datosPersona.telefono}</p>
          <p ><strong>Fecha de nacimiento: </strong>{formatDate(new Date(selectedSolicitud.conductorAsegurado.datosPersona.fechaDeNacimiento))}</p>
          <p ><strong>Sexo: </strong>{selectedSolicitud.conductorAsegurado.datosPersona.sexo}</p>
          <p ><strong>Domicilio: </strong>{`${selectedSolicitud.conductorAsegurado.datosPersona.domicilio.address}, ${selectedSolicitud.conductorAsegurado.datosPersona.domicilio.locality}, ${selectedSolicitud.conductorAsegurado.datosPersona.domicilio.zip_code}, ${selectedSolicitud.conductorAsegurado.datosPersona.domicilio.province}, ${selectedSolicitud.conductorAsegurado.datosPersona.domicilio.country}`}</p>
          <p ><strong>Relacion con Asegurado:</strong> {selectedSolicitud.conductorAsegurado.relacionAsegurado}</p>
        </SecondaryAccordion>
        <SecondaryAccordion title="Datos del Registro">
          <p ><strong>Nro.Registro:</strong> {selectedSolicitud.conductorAsegurado.nroRegistro}</p>
          <p ><strong>Clase Registro:</strong> {selectedSolicitud.conductorAsegurado.claseRegistro}</p>
          <p ><strong>Fecha Expedicion Registro:</strong> {formatDate(new Date(selectedSolicitud.conductorAsegurado.fechaRegistroExpedicion))}</p>
          <p ><strong>Fecha Vencimiento Registro:</strong> {formatDate(new Date(selectedSolicitud.conductorAsegurado.fechaRegistroVencimiento))}</p>
        </SecondaryAccordion>
      </Accordion>
      <Accordion title="Propietario Afectado">
        <SecondaryAccordion title="Datos de la Persona">
          <p ><strong>Nombre: </strong>{selectedSolicitud.propietarioAfectado.datosPersona.nombreCompleto}</p>
          <p ><strong>CUIT: </strong>{selectedSolicitud.propietarioAfectado.datosPersona.cuit}</p>
          <p ><strong>Email: </strong>{selectedSolicitud.propietarioAfectado.datosPersona.email}</p>
          <p ><strong>Teléfono: </strong>{selectedSolicitud.propietarioAfectado.datosPersona.telefono}</p>
          <p ><strong>Fecha de nacimiento: </strong>{formatDate(new Date(selectedSolicitud.propietarioAfectado.datosPersona.fechaDeNacimiento))}</p>
          <p ><strong>Sexo: </strong>{selectedSolicitud.propietarioAfectado.datosPersona.sexo}</p>
          <p ><strong>Domicilio: </strong>{`${selectedSolicitud.propietarioAfectado.datosPersona.domicilio.address}, ${selectedSolicitud.propietarioAfectado.datosPersona.domicilio.locality}, ${selectedSolicitud.propietarioAfectado.datosPersona.domicilio.zip_code}, ${selectedSolicitud.propietarioAfectado.datosPersona.domicilio.province}, ${selectedSolicitud.propietarioAfectado.datosPersona.domicilio.country}`}</p>   
        </SecondaryAccordion>
        <SecondaryAccordion title="Datos del Vehículo"> 
          <p ><strong>Tipo vehículo:</strong> {selectedSolicitud.propietarioAfectado.vehiculoPropietadoAfectado.datosVehiculo.tipoVehiculo}</p>
          <p ><strong>Marca y modelo:</strong> {selectedSolicitud.propietarioAfectado.vehiculoPropietadoAfectado.datosVehiculo.marca} {selectedSolicitud.propietarioAfectado.vehiculoPropietadoAfectado.datosVehiculo.modelo}</p>
          <p ><strong>Color:</strong> {selectedSolicitud.propietarioAfectado.vehiculoPropietadoAfectado.datosVehiculo.color}</p>
          <p ><strong>Año:</strong> {selectedSolicitud.propietarioAfectado.vehiculoPropietadoAfectado.datosVehiculo.anio}</p>
          <p ><strong>Dominio:</strong> {selectedSolicitud.propietarioAfectado.vehiculoPropietadoAfectado.datosVehiculo.dominio}</p>
        </SecondaryAccordion>
        <SecondaryAccordion title="Datos de la Póliza">
          <p ><strong>Aseguradora: </strong>{selectedSolicitud.propietarioAfectado.vehiculoPropietadoAfectado.aseguradora}</p>
          <p ><strong>Póliza: </strong>{selectedSolicitud.propietarioAfectado.vehiculoPropietadoAfectado.poliza}</p>
          <p ><strong>Fecha Vencimiento Póliza:</strong> {formatDate(new Date(selectedSolicitud.propietarioAfectado.fechaVencimientoPoliza))}</p>
        </SecondaryAccordion>
      </Accordion>
      <Accordion title="Conductor Afectado">
        <SecondaryAccordion title="Datos de la Persona">
          <p ><strong>Nombre: </strong>{selectedSolicitud.conductorAfectado.datosPersona.nombreCompleto}</p>
          <p ><strong>CUIT: </strong>{selectedSolicitud.conductorAfectado.datosPersona.cuit}</p>
          <p ><strong>Email: </strong>{selectedSolicitud.conductorAfectado.datosPersona.email}</p>
          <p ><strong>Teléfono: </strong>{selectedSolicitud.conductorAfectado.datosPersona.telefono}</p>
          <p ><strong>Fecha de nacimiento: </strong>{formatDate(new Date(selectedSolicitud.conductorAfectado.datosPersona.fechaDeNacimiento))}</p>
          <p ><strong>Sexo: </strong>{selectedSolicitud.conductorAfectado.datosPersona.sexo}</p>
          <p ><strong>Domicilio: </strong>{`${selectedSolicitud.conductorAfectado.datosPersona.domicilio.address}, ${selectedSolicitud.conductorAfectado.datosPersona.domicilio.locality}, ${selectedSolicitud.conductorAfectado.datosPersona.domicilio.zip_code}, ${selectedSolicitud.conductorAfectado.datosPersona.domicilio.province}, ${selectedSolicitud.conductorAfectado.datosPersona.domicilio.country}`}</p>
          <p ><strong>Relacion con Asegurado:</strong> {selectedSolicitud.conductorAfectado.relacionAsegurado}</p>
        </SecondaryAccordion>
        <SecondaryAccordion title="Datos del Registro">
          <p ><strong>Nro.Registro:</strong> {selectedSolicitud.conductorAfectado.nroRegistro}</p>
          <p ><strong>Clase Registro:</strong> {selectedSolicitud.conductorAfectado.claseRegistro}</p>
          <p ><strong>Fecha Expedición Registro:</strong> {formatDate(new Date(selectedSolicitud.conductorAfectado.fechaRegistroExpedicion))}</p>
          <p ><strong>Fecha Vencimiento Registro:</strong> {formatDate(new Date(selectedSolicitud.conductorAfectado.fechaRegistroVencimiento))}</p>
        </SecondaryAccordion>
      </Accordion>
      <Accordion title="Lesiones">
        <SecondaryAccordion title="Lesionado">
          <p ><strong>Nombre: </strong>{selectedSolicitud.lesiones.lesionado.datosPersona.nombreCompleto}</p>
          <p ><strong>CUIT: </strong>{selectedSolicitud.lesiones.lesionado.datosPersona.cuit}</p>
          <p ><strong>Email: </strong>{selectedSolicitud.lesiones.lesionado.datosPersona.email}</p>
          <p ><strong>Teléfono: </strong>{selectedSolicitud.lesiones.lesionado.datosPersona.telefono}</p>
          <p ><strong>Fecha de nacimiento: </strong>{formatDate(new Date(selectedSolicitud.lesiones.lesionado.datosPersona.fechaDeNacimiento))}</p>
          <p ><strong>Sexo: </strong>{selectedSolicitud.lesiones.lesionado.datosPersona.sexo}</p>
          <p ><strong>Domicilio: </strong>{`${selectedSolicitud.lesiones.lesionado.datosPersona.domicilio.address}, ${selectedSolicitud.lesiones.lesionado.datosPersona.domicilio.locality}, ${selectedSolicitud.lesiones.lesionado.datosPersona.domicilio.zip_code}, ${selectedSolicitud.lesiones.lesionado.datosPersona.domicilio.province}, ${selectedSolicitud.lesiones.lesionado.datosPersona.domicilio.country}`}</p>
          <p ><strong>Estado Civil:</strong> {selectedSolicitud.lesiones.lesionado.estadoCivil}</p>
          <p ><strong>Teléfono Alternativo:</strong> {selectedSolicitud.lesiones.lesionado.telefonoAlternativo}</p>
        </SecondaryAccordion>
        <SecondaryAccordion title="Otros detalles">
            <p ><strong>Peatón o Ciclista:</strong> {selectedSolicitud.lesiones.peatonOCiclista ? "Sí" : "No"}</p>
            <p ><strong>Conductor Tercero:</strong> {selectedSolicitud.lesiones.conductorTercero ? "Sí" : "No"}</p>
            <p ><strong>Ocupante Tercero:</strong> {selectedSolicitud.lesiones.ocupanteTercero ? "Sí" : "No"}</p>
            <p ><strong>Conductor Asegurado:</strong> {selectedSolicitud.lesiones.conductorAsegurado ? "Sí" : "No"}</p>
            <p ><strong>Asegurado:</strong> {selectedSolicitud.lesiones.asegurado ? "Sí" : "No"}</p>
            <p ><strong>Conductor:</strong> {selectedSolicitud.lesiones.conductor ? "Sí" : "No"}</p>
            <p ><strong>Propietario Vehículo Asegurado:</strong> {selectedSolicitud.lesiones.propietarioVehiculoAsegurado ? "Sí" : "No"}</p>
            <p ><strong>Relación con Propietario:</strong> {selectedSolicitud.lesiones.relacionConPropietario ? "Sí" : "No"}</p>
        </SecondaryAccordion>
      </Accordion>
      <Accordion title="Datos del Siniestro">
        <SecondaryAccordion title="Lugar de Asistencia">
            <p ><strong>Nombre del Centro:</strong> {selectedSolicitud.datosSiniestro.lugarAsistencia.nombreCentro}</p>
            <p ><strong>Queda Internado:</strong> {selectedSolicitud.datosSiniestro.lugarAsistencia.quedaInternado ? "Sí" : "No"}</p>
            <p ><strong>Detalle lesiones:</strong> {selectedSolicitud.datosSiniestro.lugarAsistencia.descripcionLesiones}</p>
            <p ><strong>Estado lesiones:</strong> {selectedSolicitud.datosSiniestro.lugarAsistencia.estadoLesiones}</p>
        </SecondaryAccordion>
        <SecondaryAccordion title="Daños materiales">
          <p ><strong>Daño parcial:</strong> {selectedSolicitud.datosSiniestro.consecuenciaSiniestro.danioParcial ? "Sí" : "No"}</p>
          <p ><strong>Robo rueda:</strong> {selectedSolicitud.datosSiniestro.consecuenciaSiniestro.roboRueda ? "Sí" : "No"}</p>
          <p ><strong>Robo parcial:</strong> {selectedSolicitud.datosSiniestro.consecuenciaSiniestro.roboParcial ? "Sí" : "No"}</p>
          <p ><strong>Daño terceros:</strong> {selectedSolicitud.datosSiniestro.consecuenciaSiniestro.danioTerceros ? "Sí" : "No"}</p>
          <p ><strong>Incendio total:</strong> {selectedSolicitud.datosSiniestro.consecuenciaSiniestro.incendioTotal ? "Sí" : "No"}</p>
          <p ><strong>Otros:</strong> {selectedSolicitud.datosSiniestro.consecuenciaSiniestro.otros ? "Sí" : "No"}</p>
          <p ><strong>Destrucción total:</strong> {selectedSolicitud.datosSiniestro.consecuenciaSiniestro.destruccionTotal ? "Sí" : "No"}</p>
          <p ><strong>Robo total:</strong> {selectedSolicitud.datosSiniestro.consecuenciaSiniestro.roboTotal ? "Sí" : "No"}</p>
          <p ><strong>Rotura cristales:</strong> {selectedSolicitud.datosSiniestro.consecuenciaSiniestro.roturaCristales ? "Sí" : "No"}</p>
          <p ><strong>Incendio parcial:</strong> {selectedSolicitud.datosSiniestro.consecuenciaSiniestro.incendioParcial ? "Sí" : "No"}</p>
        </SecondaryAccordion>
        <SecondaryAccordion title="Información general">
          <p ><strong>Fecha de ocurrencia:</strong> {formatDate(new Date(selectedSolicitud.datosSiniestro.fechaOcurrencia))}</p>
          <p ><strong>Hora de ocurrencia:</strong> {selectedSolicitud.datosSiniestro.horaOcurrencia}</p>
          <p ><strong>Lugar de ocurrencia:</strong> {selectedSolicitud.datosSiniestro.lugarOcurrencia}</p>
          <p ><strong>Código Postal:</strong> {selectedSolicitud.datosSiniestro.codigoPostal}</p>
          <p ><strong>Localidad:</strong> {selectedSolicitud.datosSiniestro.localidad}</p>
          <p ><strong>Provincia:</strong> {selectedSolicitud.datosSiniestro.provincia}</p>
          <p ><strong>País:</strong> {selectedSolicitud.datosSiniestro.pais}</p>
          <p ><strong>Cantidad de autos participantes:</strong> {selectedSolicitud.datosSiniestro.cantidadAutosParticipantes}</p>
          <p ><strong>Intersección:</strong> {selectedSolicitud.datosSiniestro.interseccion}</p>
          <p ><strong>Hubieron daños personales:</strong> {selectedSolicitud.datosSiniestro.hubieronDaniosPersonales ? "Sí" : "No"}</p>
          <p ><strong>Hubieron daños materiales:</strong> {selectedSolicitud.datosSiniestro.hubieronDaniosMateriales ? "Sí" : "No"}</p>
          <p ><strong>Hubieron testigos:</strong> {selectedSolicitud.datosSiniestro.hubieronTestigos ? "Sí" : "No"}</p>
          <p ><strong>Vigencia:</strong> {selectedSolicitud.datosSiniestro.vigencia}</p>
          <p ><strong>Cobertura:</strong> {selectedSolicitud.datosSiniestro.cobertura}</p>
          <p ><strong>Franquicia:</strong> {selectedSolicitud.datosSiniestro.franquicia}</p>
          <p ><strong>Cobranza:</strong> {selectedSolicitud.datosSiniestro.cobranza}</p>
          <p ><strong>Asistió grúa:</strong> {selectedSolicitud.datosSiniestro.asistioGrua ? "Sí" : "No"}</p>
          <p ><strong>Asistió ambulancia:</strong> {selectedSolicitud.datosSiniestro.asistioAmbulancia ? "Sí" : "No"}</p>
          <p ><strong>Asistió bomberos:</strong> {selectedSolicitud.datosSiniestro.asistioBomberos ? "Sí" : "No"}</p>
          <p ><strong>Hubo denuncia:</strong> {selectedSolicitud.datosSiniestro.huboDenuncia ? "Sí" : "No"}</p>
          <p ><strong>Estado del tiempo:</strong> {selectedSolicitud.datosSiniestro.estadoTiempo}</p>
          <p ><strong>Estado del camino:</strong> {selectedSolicitud.datosSiniestro.estadoCamino}</p>
          <p ><strong>Tipo de camino:</strong> {selectedSolicitud.datosSiniestro.tipoCamino}</p>
          <p ><strong>Observaciones:</strong> {selectedSolicitud.datosSiniestro.observaciones}</p>
          <p ><strong>relato:</strong> {selectedSolicitud.datosSiniestro.relato}</p>
        </SecondaryAccordion>
      </Accordion>
    </>
  );  
};

export default SolicitudDetalles;
