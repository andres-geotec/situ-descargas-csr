<script setup>
const data = {
  id: 604,
  titulo:
    'Autocorrelación espacial de la variable de tasa de mortalidad por enfermedad renal crónica y leucemias agudas, por región en la Cuenca del Alto Atoyac 2000 a 2019',
  nombre: 'caaresa_autocorr_mort_la_erc_00_19_reg_a',
  descripcion:
    '<p>La capa contiene el indicador de autocorrelaci&oacute;n espacial por regi&oacute;n en la Cuenca del Alto Atoyac (CAA) de las tasas de mortalidad (defunciones por cada cien mil habitantes) por leucemias agudas en toda la poblaci&oacute;n para el periodo del 2000 al 2019, as&iacute; como por enfermedad renal cr&oacute;nica en toda la poblaci&oacute;n, la poblaci&oacute;n de 15 a 49 a&ntilde;os y en hombres de 15 a 49 a&ntilde;os para el periodo del 2010 al 2019.</p>',
  destacada: false,
  fuente:
    '<p>Datos de origen del Consejo Nacional de Humanidades, Ciencias y Tecnolog&iacute;as (Conahcyt) con base en el Instituto Nacional de Estad&iacute;stica y Geograf&iacute;a (INEGI), 2000-2019.</p>',
  geometria: 'polygon',
  eni: [
    {
      id: 9,
      nombre: 'Región de Emergencia Sanitaria y Ambiental: Cuenca del Alto Atoyac',
      url: 'https://toxicologia.conahcyt.mx/resa-atoyac/',
    },
  ],
  subcapitulos: [],
  descarga_hotosm: [],
  preproduccion: false,
  num_estilos: 4,
}
</script>

<template>
  <div class="tarjeta tarjeta-descarga">
    <!-- <img class="tarjeta-imagen" /> -->

    <div class="tarjeta-cuerpo">
      <p class="tarjeta-titulo">{{ data.titulo }}</p>
      <p v-html="data.descripcion" />
      <p class="tarjeta-etiqueta" v-html="data.fuente" />
    </div>

    <div class="tarjeta-pie">
      <button class="boton-primario boton-chico">
        <span class="pictograma-documento-csv" aria-hidden="true" />
      </button>
      <button class="boton-primario boton-chico">
        <span class="pictograma-documento-geojson" aria-hidden="true" />
      </button>
      <button class="boton-primario boton-chico">
        <span class="pictograma-documento-geopaquete" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tarjeta-descarga {
  .boton-chico {
    span {
      padding: 0;
    }
  }
}
</style>
