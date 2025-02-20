<script setup>
import { computed, ref, toRefs, watch } from 'vue'
import { ratio } from 'fuzzball'

const model = defineModel()
const props = defineProps({
  lista: {
    type: Array,
    default: () => [],
  },
})
const { lista } = toRefs(props)

const verListado = ref(false)

const textoBusqueda = ref('')
watch(textoBusqueda, (nv) => {
  model.value = NormalizarTexto(nv)

  // listaEvaluada.value = lista.value
  //   .map(([texto]) => [texto, ratio(NormalizarTexto(texto), model.value)])
  //   .sort((a, b) => b[1] - a[1])

  // console.log(toRaw(listaEvaluada.value))
})

const listaEvaluada = computed(() =>
  lista.value
    .map(([texto]) => [texto, ratio(NormalizarTexto(texto), model.value)])
    .sort((a, b) => b[1] - a[1]),
)

function focusout() {
  setTimeout(() => {
    verListado.value = false
  }, 300)
}
</script>

<template>
  <div class="campo-busqueda">
    <label for="id_aleatorio" class="a11y-solo-lectura"> Campo de búsqueda </label>

    <input
      id="id_aleatorio"
      type="search"
      class="campo-busqueda-entrada"
      placeholder="Buscar..."
      v-model="textoBusqueda"
      @focusin="() => (verListado = true)"
      @focusout="focusout"
    />

    <button
      testid="btn-limpiar-busqueda"
      type="button"
      class="boton-pictograma boton-sin-contenedor-secundario campo-busqueda-borrar"
      aria-label="Borrar"
      v-if="textoBusqueda.length > 0"
      @click="textoBusqueda = ''"
    >
      <span class="pictograma-cerrar" aria-hidden="true" />
    </button>

    <button
      type="button"
      class="boton-primario boton-pictograma campo-busqueda-buscar"
      aria-label="Buscar"
    >
      <span class="pictograma-buscar" aria-hidden="true" />
    </button>
  </div>

  <div class="resultados">
    <ol v-if="verListado" class="lista-sin-estilo borde-t-redondeado-0 borde-b-redondeado-8 p-y-1">
      <li
        class="m-0"
        v-for="(titulo, idx) in listaEvaluada.slice(0, 11)"
        :key="`titulo-${idx}`"
        @click="textoBusqueda = titulo[0]"
      >
        <button class="nav-boton-submenu">
          <!-- {{ titulo }} -->
          {{ titulo[0] }}
        </button>
      </li>
    </ol>
  </div>
</template>

<style lang="scss">
.resultados {
  position: relative;
  z-index: 9;

  ol {
    width: 100%;
    position: absolute;
    background-color: var(--fondo);
    box-shadow:
      inset 0 0 0 0.1px var(--menu-flotante-contenedor-sombra),
      0 8px 16px -4px var(--menu-flotante-contenedor-sombra);

    .nav-boton-submenu {
      padding: 8px 16px;
      text-align: left;
    }
  }
}
</style>

<script>
export function NormalizarTexto(texto) {
  return texto.trim().length > 0
    ? texto
        .trim()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase()
    : ''
}
</script>
