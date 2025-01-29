<template>
  <SisdaiPestanias>
    <template #contenido-pestanias>
      <button
        id="tabvis-buscador"
        type="button"
        role="tab"
        aria-selected="true"
        aria-controls="tabpanelvis-buscador"
      >
        Buscador
      </button>
      <button
        id="tabvis-filtros"
        type="button"
        role="tab"
        aria-selected="false"
        aria-controls="tabpanelvis-filtros"
        tabindex="-1"
      >
        Filtros
      </button>
    </template>

    <template #contenido-paneles>
      <div id="tabpanelvis-buscador" role="tabpanel" tabindex="0" aria-labelledby="tabvis-buscador">
        <SisdaiCampoBusqueda class="m-t-3" />
      </div>

      <div
        id="tabpanelvis-filtros"
        role="tabpanel"
        tabindex="0"
        aria-labelledby="tabvis-filtros"
        hidden
      >
        <p>Filtros</p>
      </div>
    </template>
  </SisdaiPestanias>
</template>
