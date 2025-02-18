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
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            class="icono-svg a11y-simplificada-mantener-imagen"
            aria-hidden="true"
          >
            <path
              d="M3 18H2v-7h1v4.293L5.293 13h1.414L4.85 14.857 7.006 18H5.793l-1.662-2.424L3 16.707zm13-7v7h1v-7zm-8 2v5h1v-3a1 1 0 0 1 2 0v3h1v-3a1 1 0 0 1 2 0v3h1v-3a1.991 1.991 0 0 0-3.5-1.309 1.959 1.959 0 0 0-2.5-.413V13zm13-6.291V23H3v-4h1v3h16V8h-6V2H4v8H3V1h12.29zM20 6.8L15.2 2H15v5h5z"
            />
            <path fill="none" d="M0 0h24v24H0z" />
          </svg>
        </button>
        <button
          class="boton-pictograma boton-con-contenedor-secundario"
          v-globo-informacion:arriba="'Copiar servicio WFS'"
        >
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            class="icono-svg a11y-simplificada-mantener-imagen"
            aria-hidden="true"
          >
            <path
              d="M49.953 5A45 45 0 0 0 7.758 34.498H2.5A3.002 3.002 0 0 0-.502 37.5v25A3.002 3.002 0 0 0 2.5 65.502h5.256A45 45 0 0 0 50 95a45 45 0 0 0 42.242-29.498H97.5a3.002 3.002 0 0 0 3.002-3.002v-25a3.002 3.002 0 0 0-3.002-3.002h-5.256A45 45 0 0 0 50 5a45 45 0 0 0-.047 0zm2.297 5.113c4.74.807 9.271 4.713 12.84 11.194c1.15 2.089 2.18 4.433 3.068 6.974H52.25V10.113zm-4.5.178v17.99H32.676c.889-2.541 1.916-4.885 3.066-6.974c3.36-6.1 7.571-9.915 12.008-11.016zM37.383 11.51c-2.092 2.116-3.971 4.698-5.584 7.627c-1.512 2.745-2.813 5.819-3.881 9.144h-12.11A40.522 40.522 0 0 1 37.384 11.51zm26.469.416c8.457 3.071 15.586 8.88 20.34 16.355H72.91c-1.066-3.326-2.365-6.4-3.877-9.144c-1.509-2.74-3.251-5.174-5.181-7.211zM13.33 32.78h13.328c-.135.561-.246 1.143-.367 1.717h-13.71a38.51 38.51 0 0 1 .75-1.717zm17.977 0H47.75v1.717H30.908c.131-.574.253-1.158.399-1.717zm20.943 0h17.275c.146.56.268 1.143.399 1.717H52.25V32.78zm21.92 0h12.5c.265.565.512 1.138.75 1.717H74.535c-.12-.574-.23-1.156-.365-1.717zm4.955 9.719c3.313 0 5.804.4 7.473 1.197c1.68.798 2.564 1.862 2.648 3.194l-5.33.129c-.228-.745-.722-1.28-1.478-1.602c-.745-.33-1.865-.494-3.366-.494c-1.548 0-2.762.174-3.638.523c-.565.224-.848.525-.848.9c0 .343.265.636.793.88c.672.31 2.305.632 4.898.968c2.593.336 4.508.687 5.744 1.05c1.249.355 2.222.846 2.918 1.472c.709.62 1.061 1.386 1.061 2.303c0 .83-.42 1.608-1.26 2.334c-.84.725-2.03 1.265-3.566 1.62c-1.537.35-3.45.526-5.742.526c-3.338 0-5.901-.422-7.69-1.266c-1.788-.85-2.857-2.087-3.205-3.709l5.186-.275c.312.956.944 1.657 1.892 2.105c.96.449 2.249.672 3.87.672c1.716 0 3.006-.198 3.87-.593c.877-.402 1.315-.869 1.315-1.403c0-.343-.185-.634-.557-.87c-.36-.245-.998-.456-1.91-.634c-.624-.118-2.045-.33-4.266-.632c-2.856-.39-4.863-.867-6.015-1.434c-1.62-.798-2.43-1.77-2.43-2.916c0-.738.377-1.43 1.133-2.068c.768-.646 1.868-1.137 3.297-1.473c1.44-.336 3.174-.504 5.203-.504zM10 42.748h5.453l3.983 9.955l4.826-9.955H30.6l4.627 10.125l4.05-10.125h5.368l-6.41 14.494h-5.657L27.32 46.406l-5.24 10.836H16.3L10 42.748zm37.38 0h18.097v2.453H52.71v3.43h11.02v2.451H52.71v6.16h-5.33V42.748zm-34.8 22.754h13.524c.112.573.214 1.154.341 1.715H13.33a38.624 38.624 0 0 1-.75-1.715zm18.129 0H47.75v1.715H31.082c-.137-.56-.25-1.142-.373-1.715zm21.541 0h17.873c-.123.573-.236 1.155-.373 1.715h-17.5v-1.715zm22.473 0H87.42a38.624 38.624 0 0 1-.75 1.715H74.38c.128-.561.23-1.142.343-1.715zm-58.914 6.215h11.824c1.117 3.675 2.518 7.056 4.166 10.049c1.294 2.35 2.762 4.472 4.369 6.316c-8.466-3.07-15.603-8.884-20.36-16.365zm16.554 0H47.75v18.719c-.277-.016-.55-.044-.826-.065c-4.132-1.35-8.032-5.057-11.182-10.777c-1.285-2.335-2.424-4.984-3.379-7.877zm19.887 0h16.219c-.955 2.893-2.094 5.542-3.38 7.877c-3.084 5.602-6.888 9.278-10.925 10.695c-.634.065-1.272.112-1.914.147v-18.72zm20.947 0h10.994a40.555 40.555 0 0 1-19.105 15.877c1.443-1.728 2.766-3.684 3.947-5.828c1.648-2.993 3.049-6.373 4.164-10.05z"
            />
          </svg>
        </button>
        <button
          class="boton-pictograma boton-con-contenedor-secundario"
          v-globo-informacion:arriba="'Copiar servicio WMS'"
        >
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            class="icono-svg a11y-simplificada-mantener-imagen"
            aria-hidden="true"
          >
            <path
              d="M49.953 5A45 45 0 0 0 7.758 34.498H2.5A3.002 3.002 0 0 0-.502 37.5v25A3.002 3.002 0 0 0 2.5 65.502h5.256A45 45 0 0 0 50 95a45 45 0 0 0 42.242-29.498H97.5a3.002 3.002 0 0 0 3.002-3.002v-25a3.002 3.002 0 0 0-3.002-3.002h-5.256A45 45 0 0 0 50 5a45 45 0 0 0-.047 0zm2.297 5.113c4.74.807 9.271 4.713 12.84 11.194c1.15 2.089 2.18 4.433 3.068 6.974H52.25V10.113zm-4.5.178v17.99H32.676c.889-2.541 1.916-4.885 3.066-6.974c3.36-6.1 7.571-9.915 12.008-11.016zM37.383 11.51c-2.092 2.116-3.971 4.698-5.584 7.627c-1.512 2.745-2.813 5.819-3.881 9.144h-12.11A40.522 40.522 0 0 1 37.384 11.51zm26.469.416c8.457 3.071 15.586 8.88 20.34 16.355H72.91c-1.066-3.326-2.365-6.4-3.877-9.144c-1.509-2.74-3.251-5.174-5.181-7.211zM13.33 32.78h13.328c-.135.561-.246 1.143-.367 1.717h-13.71a38.51 38.51 0 0 1 .75-1.717zm17.977 0H47.75v1.717H30.908c.131-.574.253-1.158.399-1.717zm20.943 0h17.275c.146.56.268 1.143.399 1.717H52.25V32.78zm21.92 0h12.5c.265.565.512 1.138.75 1.717H74.535c-.12-.574-.23-1.156-.365-1.717zm5.967 9.719c3.004 0 5.264.4 6.777 1.197c1.524.798 2.324 1.862 2.4 3.194l-4.834.127c-.206-.745-.654-1.277-1.34-1.6c-.674-.33-1.691-.496-3.052-.496c-1.404 0-2.504.176-3.299.525c-.512.224-.768.523-.768.899c0 .342.24.637.72.88c.609.31 2.09.633 4.44.97c2.352.336 4.088.686 5.21 1.048c1.132.356 2.015.847 2.646 1.473c.642.62.963 1.388.963 2.304c0 .831-.38 1.61-1.143 2.334c-.762.726-1.84 1.266-3.234 1.622c-1.393.349-3.13.523-5.209.523c-3.026 0-5.35-.422-6.973-1.266c-1.622-.85-2.59-2.085-2.906-3.707l4.703-.277c.283.956.855 1.657 1.715 2.105c.871.449 2.04.672 3.51.672c1.557 0 2.728-.198 3.512-.593c.794-.403 1.191-.869 1.191-1.403c0-.343-.168-.634-.506-.87c-.326-.245-.903-.456-1.73-.634c-.566-.118-1.857-.33-3.871-.632c-2.591-.39-4.408-.867-5.454-1.434c-1.47-.798-2.205-1.771-2.205-2.918c0-.738.344-1.425 1.03-2.064c.696-.647 1.692-1.139 2.988-1.475c1.306-.336 2.879-.504 4.719-.504zM10 42.746h4.947l3.61 9.96l4.377-9.96h5.748l4.197 10.127l3.674-10.127h4.865l-5.813 14.496H30.48l-4.77-10.836l-4.752 10.836h-5.242L10 42.746zm33.803 0h7.234l4.344 9.889l4.295-9.889h7.25v14.496h-4.49v-11.41l-4.752 11.41h-4.655l-4.736-11.41v11.41h-4.49V42.746zM12.58 65.502h13.524c.112.573.214 1.154.341 1.715H13.33a38.624 38.624 0 0 1-.75-1.715zm18.129 0H47.75v1.715H31.082c-.137-.56-.25-1.142-.373-1.715zm21.541 0h17.873c-.123.573-.236 1.155-.373 1.715h-17.5v-1.715zm22.473 0H87.42a38.624 38.624 0 0 1-.75 1.715H74.38c.128-.561.23-1.142.343-1.715zm-58.914 6.215h11.824c1.117 3.675 2.518 7.056 4.166 10.049c1.294 2.35 2.762 4.472 4.369 6.316c-8.466-3.07-15.603-8.884-20.36-16.365zm16.554 0H47.75v18.719c-.277-.016-.55-.044-.826-.065c-4.132-1.35-8.032-5.057-11.182-10.777c-1.285-2.335-2.424-4.984-3.379-7.877zm19.887 0h16.219c-.955 2.893-2.094 5.542-3.38 7.877c-3.084 5.602-6.888 9.278-10.925 10.695c-.634.065-1.272.112-1.914.147v-18.72zm20.947 0h10.994a40.555 40.555 0 0 1-19.105 15.877c1.443-1.728 2.766-3.684 3.947-5.828c1.648-2.993 3.049-6.373 4.164-10.05z"
            />
          </svg>
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
.icono-svg {
  // fill: #453b67;
  fill: var(--color-secundario-8);
}
.a11y-oscura {
  .icono-svg {
    // fill: #bfb5e0;
    fill: var(--color-secundario-5);
  }
}

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
        svg,
        img {
          min-height: 2rem;
          height: 2rem;
          min-width: 2rem;
          width: 2rem;
        }
        svg {
          padding: 0.2rem;
        }
      }
    }
  }
}
</style>
