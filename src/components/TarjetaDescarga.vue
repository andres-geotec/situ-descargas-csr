<script setup>
import dicGeometrias from '@/assets/data/dic-geometrias.json'

defineProps(['titulo', 'nombre', 'descripcion', 'fuente', 'geometria', 'num_estilos', 'match'])
const emits = defineEmits(['detalles'])

const imagen = [
  '13-Texcoco',
  '14-Texcoco_2',
  '01-vih',
  '02-distribucion_variantes',
  '03-cultivos',
  // '1-herbicidas',
  '06-covid19_indice de vulnerabilidad',
  '07-plataforma_vacunacion_covid19',
  '10-uso_de_maquinaria',
  '10-uso_de_maquinaria',
  '11_glifosfato',
][Math.floor(Math.random() * 10)]
</script>

<template>
  <div class="tarjeta tarjeta-descarga">
    <!-- <img
      class="tarjeta-imagen"
      :src="`https://cdn.conahcyt.mx/gema/landing-gema/inicio/mapa-vih.png`"
    /> -->
    <picture>
      <source
        :src="`https://cdn.conahcyt.mx/gema/landing-gema/ejemplos/${imagen}.webp`"
        type="image/webp"
      />
      <img
        class="tarjeta-imagen"
        loading="lazy"
        :src="`https://cdn.conahcyt.mx/gema/landing-gema/ejemplos/${imagen}.jpg`"
        alt="Imagen de muestra"
      />
    </picture>

    <div class="tarjeta-cuerpo">
      <p class="tarjeta-titulo">
        {{ titulo }}
        <span v-if="match" class="etiqueta">{{ match }}</span>
      </p>

      <!-- <p class="tarjeta-descripcion" v-html="descripcion" /> -->

      <!-- <div class="tarjeta-etiqueta fuente">
        <p class="m-b-0"><b>Fuente:</b></p>
        <span v-html="fuente" />
      </div> -->
    </div>

    <div class="tarjeta-pie">
      <p class="m-y-0">Descargas:</p>
      <div class="opciones-descarga flex flex-contenido-inicio">
        <button
          class="boton-pictograma boton-con-contenedor-secundario"
          v-globo-informacion:arriba="'Descargar metadatos'"
        >
          <span class="pictograma-metadatos" aria-hidden="true" />
        </button>
        <button
          class="boton-pictograma boton-con-contenedor-secundario"
          v-globo-informacion:arriba="'Descargar tabla en CSV'"
        >
          <span class="pictograma-documento-csv" aria-hidden="true" />
        </button>
        <button
          class="boton-pictograma boton-con-contenedor-secundario"
          v-globo-informacion:arriba="'Descargar capa en GeoJSON'"
        >
          <span class="pictograma-documento-geojson" aria-hidden="true" />
        </button>
        <button
          class="boton-pictograma boton-con-contenedor-secundario"
          v-globo-informacion:arriba="'Descargar capa en Geopaquete'"
        >
          <span class="pictograma-documento-geopaquete" aria-hidden="true" />
        </button>
        <button
          class="boton-pictograma boton-con-contenedor-secundario"
          v-globo-informacion:arriba="'Descargar capa en KML'"
        >
          <img src="@/assets/svg/file-kml-svgrepo-com.svg" alt="" />
        </button>
        <button
          class="boton-pictograma boton-con-contenedor-secundario"
          v-globo-informacion:arriba="'Copiar servicio WFS'"
        >
          <img src="@/assets/svg/wfs-svgrepo-com.svg" alt="" />
        </button>
        <button
          class="boton-pictograma boton-con-contenedor-secundario"
          v-globo-informacion:arriba="'Copiar servicio WMS'"
        >
          <img src="@/assets/svg/wms-svgrepo-com.svg" alt="" />
        </button>
      </div>

      <div class="flex flex-contenido-separado m-t-2">
        <span>
          <span :class="`pictograma-capa-${dicGeometrias[geometria]}`" />
          Capa de polígonos
        </span>

        <button class="boton-primario boton-chico" @click="emits('detalles')">Ver detalles</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.tarjeta-descarga {
  .tarjeta-cuerpo {
    .tarjeta-descripcion {
      max-height: 200px;
      overflow-y: auto;
    }
    .tarjeta-etiqueta.fuente span p:first-child {
      margin-top: 0;
    }
  }

  .tarjeta-pie {
    flex-direction: column;
    .opciones-descarga {
      gap: 8px;

      .boton-pictograma {
        span,
        img {
          min-height: 2rem;
          height: 2rem;
          min-width: 2rem;
          width: 2rem;
        }
      }
    }
  }
}
</style>
