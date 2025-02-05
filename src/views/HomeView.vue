<script setup>
// import OpcionesFiltrado from '@/components/OpcionesFiltrado.vue'
import CampoBusqueda, { NormalizarTexto } from '@/components/CampoBusqueda.vue'
import TarjetaDescarga from '@/components/TarjetaDescarga.vue'
import DetalleCapa from '@/components/DetalleCapa.vue'
import { ref, watch } from 'vue'
import { GetCapabilities } from '@/utils'
import { convertXML } from 'simple-xml-to-json'

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

const jsonCapa = ref({})
function layerADiccionario(obj) {
  // const dic = ['Name', 'Title', 'Abstract', 'KeywordList', 'SRS', 'MetadataURL']
  // jsonCapa.value = params.map((obj) => Object.keys(obj))

  const x = obj.reduce((a, b) => {
    // const val = Object.values(b)[0]
    // // console.log(val['content'])
    // // console.log(val['children'])
    // // console.log(Object.keys(val).length)
    // console.log(val)

    return { ...a, ...b }
  }, {})

  // Object.keys(x).forEach((k) => {
  //   console.log(x[k])
  // })

  jsonCapa.value = x
}

async function query() {
  GetCapabilities.then((response) => {
    // console.log(response)

    if (response.ok) {
      return response.text()
    }

    // return response.json()
  })
    .then((xml) => {
      const filtro = 'Layer' //SRS
      // jsonTexto.value = convertXML(xml)
      const json = convertXML(xml)['WMT_MS_Capabilities']['children'][1]['Capability'][
        'children'
      ][3]['Layer']['children'].filter((children) => Object.keys(children)[0] === filtro)

      layerADiccionario(json[0][filtro]['children'])
      // console.log(json[json.length - 1][filtro]['children'])
    })
    // .then((response) => console.log(response))
    .catch((err) => console.error(err))
}
query()

const busqueda = ref('')

watch(busqueda, (nv) => {
  // console.log(nv);
  gruposFiltrados.value = nv.trim().length > 0
    ? grupos.value
      .map(grupo => {

        return {
          ...grupo,
          capas: grupo.capas.filter(capa => NormalizarTexto(capa.titulo).includes(nv))
        }
      })
    : grupos.value
})
</script>

<template>
  <main class="contenedor contenedor-descargas">
    <div class="ancho-lectura">
      <h1 class="texto-centrado">Descargas</h1>
      <!-- <p>{{ jsonCapa }}</p> -->

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam voluptate earum obcaecati cum
        vero? In perspiciatis illo ea omnis, quis, eligendi at odio inventore nihil ab modi vero
        dignissimos totam.
      </p>

      <CampoBusqueda v-model="busqueda" />
      <!-- <OpcionesFiltrado /> -->
    </div>

    <div class="ancho-fijo m-y-5" v-for="grupo in gruposFiltrados" :key="`grupo-descarga-${grupo.id}`">
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
