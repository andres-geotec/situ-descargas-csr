<script setup>
import TarjetaDescarga from '@/components/TarjetaDescarga.vue'
import DetalleCapa from '@/components/DetalleCapa.vue'
import { ref } from 'vue'

const { BASE_URL } = import.meta.env

const grupos = ref([])
async function consultarDatos() {
  return fetch(`${BASE_URL}gema/grupos_capas.json`)
    .then((r) => {
      // console.log(r)
      return r.ok ? r.json() : []
    })
    .catch()
    .finally()
    .then((d) => {
      // console.log(d)
      grupos.value = d
    })
}
consultarDatos()

const detalleCapa = ref(null)
</script>

<template>
  <main class="contenedor contenedor-descargas">
    <div class="ancho-lectura">
      <h1 class="texto-centrado">Descargas</h1>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam voluptate earum obcaecati cum
        vero? In perspiciatis illo ea omnis, quis, eligendi at odio inventore nihil ab modi vero
        dignissimos totam.
      </p>

      <SisdaiCampoBusqueda />
    </div>

    <div class="ancho-fijo m-y-5" v-for="grupo in grupos" :key="`grupo-descarga-${grupo.id}`">
      <h2>Temática: {{ grupo.titulo }}</h2>
      <div class="grid">
        <TarjetaDescarga
          class="columna-16 columna-4-esc"
          v-for="capa in grupo.capas"
          :key="`tarjeta-descarga-${capa.id}`"
          v-bind="capa"
          @detalles="detalleCapa.abrir(capa)"
        />
      </div>
    </div>

    <DetalleCapa ref="detalleCapa" />
  </main>
</template>

<style lang="scss">
@use '@centrogeomx/sisdai-css/src/_mixins' as mix;

.contenedor-descargas .grid {
  @include mix.mediaquery('esc') {
    grid-template-columns: repeat(12, 1fr);
  }
}
</style>
