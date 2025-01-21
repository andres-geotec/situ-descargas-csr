<script setup>
import { ref } from 'vue'

const sisdaiModal = ref(null)

const capa = ref({})

defineExpose({
  abrir(params) {
    // console.log('abriendo...', datos)
    capa.value = params
    sisdaiModal.value.abrirModal()
  },
})
</script>

<template>
  <SisdaiModal ref="sisdaiModal">
    <template #encabezado>
      <h1 class="m-t-0 texto-tamanio-6">{{ capa?.titulo }}</h1>
    </template>

    <template #cuerpo>
      <p v-html="capa?.descripcion" />

      <div v-if="capa?.fuente">
        <p class="nota-titulo">Fuente:</p>
        <p class="nota" v-html="capa?.fuente" />
      </div>
    </template>

    <template #pie>
      <button
        type="button"
        class="boton-secundario"
        value="cancela"
        @click="sisdaiModal.cerrarModal()"
      >
        Cerrar
      </button>
    </template>
  </SisdaiModal>
</template>
