<script setup>
// import OpcionesFiltrado from '@/components/OpcionesFiltrado.vue'
import CampoBusqueda, { NormalizarTexto } from '@/components/CampoBusqueda.vue'
import TarjetaDescarga from '@/components/TarjetaDescarga.vue'
import DetalleCapa from '@/components/DetalleCapa.vue'
import { ref, watch } from 'vue'
import useGetCapabilities from '@/utils/useGetCapabilities'
import { ratio } from 'fuzzball'

const { BASE_URL } = import.meta.env

const grupos = ref([])
const gruposFiltrados = ref(grupos.value)
async function consultarDatos() {
  return fetch(`${BASE_URL}api/gema/grupos_capas.json`)
    .then((r) => {
      // console.log(r)
      return r.ok ? r.json() : []
    })
    .catch()
    .finally()
    .then((d) => {
      // console.log(d)
      grupos.value = d
      gruposFiltrados.value = d
    })
}
consultarDatos()

const detalleCapa = ref(null)

const busqueda = ref('')
watch(busqueda, (nv) => {
  gruposFiltrados.value =
    nv.trim().length > 0
      ? grupos.value
          .map((grupo) => ({
            ...grupo,
            capas: grupo.capas
              .filter((capa) => NormalizarTexto(capa.titulo).includes(nv))
              .map((capa) => ({ ...capa, match: ratio(NormalizarTexto(capa.titulo), nv) })),
          }))
          .filter((grupo) => grupo.capas.length > 0)
      : grupos.value
})

const { capas, consultar } = useGetCapabilities()
consultar()
watch(capas, (nv) => {
  console.log(nv)
})
</script>

<template>
  <main class="contenedor contenedor-descargas">
    <div class="ancho-lectura">
      <h1 class="texto-centrado">Descargas</h1>
      <!-- <p>{{ jsonCapa }}</p> -->

      <!-- <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam voluptate earum obcaecati cum
        vero? In perspiciatis illo ea omnis, quis, eligendi at odio inventore nihil ab modi vero
        dignissimos totam.
      </p> -->

      <CampoBusqueda v-model="busqueda" />
      <!-- <OpcionesFiltrado /> -->
    </div>

    <div
      class="ancho-fijo m-y-5"
      v-for="grupo in gruposFiltrados"
      :key="`grupo-descarga-${grupo.id}`"
    >
      <h2>Temática: {{ grupo.titulo }} ({{ grupo.capas.length }} capas)</h2>

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
