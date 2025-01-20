<script setup>
import TarjetaDescarga from '@/components/TarjetaDescarga.vue'
</script>

<template>
  <main class="contenedor">
    <div class="ancho-lectura">
      <h1 class="texto-centrado">Descargas</h1>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam voluptate earum obcaecati cum
        vero? In perspiciatis illo ea omnis, quis, eligendi at odio inventore nihil ab modi vero
        dignissimos totam.
      </p>

      <SisdaiCampoBusqueda />
    </div>

    <div class="ancho-fijo flex flex-contenido-centrado m-8">
      <TarjetaDescarga
        class="columna-5"
        v-for="_ in 'abcdefghijk'"
        :key="`tarjeta-descarga-${_}`"
      />
    </div>
  </main>
</template>
