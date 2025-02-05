<script setup>
import { ref, watch } from 'vue'
import { ratio } from 'fuzzball'

const busqueda = defineModel()

const textoBusqueda = ref('')

// const x = 'hello world'

watch(textoBusqueda, (nv) => {
  busqueda.value = NormalizarTexto(nv)
  // if (nv.trim().length > 0) {
  //   console.log(ratio(x, nv))
  // }
})
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
    />

    <button
      testid="btn-limpiar-busqueda"
      type="button"
      class="boton-pictograma boton-sin-contenedor-secundario campo-busqueda-borrar"
      aria-label="Borrar"
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
</template>

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
