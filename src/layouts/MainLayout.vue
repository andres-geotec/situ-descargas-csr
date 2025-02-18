<script setup>
import { useAccesibilidadStore } from '@centrogeomx/sisdai-componentes/src/stores'

const storeAccesibilidad = useAccesibilidadStore()
</script>

<template>
  <header>
    <SisdaiNavegacionGobMx />
  </header>

  <RouterView />

  <SisdaiMenuAccesibilidad :objetoStore="storeAccesibilidad" />

  <footer class="p-b-0">
    <SisdaiPiePaginaGobMx />
  </footer>
</template>
