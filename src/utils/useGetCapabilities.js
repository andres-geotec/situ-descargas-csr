import { convertXML } from 'simple-xml-to-json'
import { ref } from 'vue'

// const url =
// 'https://ide.sedatu.gob.mx/geoserver/wms?service=wms&version=1.1.1&request=GetCapabilities&format=text%2Fxml'
const url = `${import.meta.env.BASE_URL}api/sedatu/getcapabilities_1.1.1.xml`
const options = { method: 'GET' }
const GetCapabilities = fetch(url, options)

const keys = {
  capabilities: 'WMT_MS_Capabilities',
  capa: 'Layer',
  capacidad: 'Capability',
  contenido: 'content',
  formato: 'Format',
  listaPalabrasClave: 'KeywordList',
  listaHijos: 'children',
  metadato: 'MetadataURL',
  nombre: 'Name',
  palabraClave: 'Keyword',
  resumen: 'Abstract',
  srs: 'SRS',
  titulo: 'Title',
}

const capas = ref([])

export default function () {
  function consultar() {
    GetCapabilities.then((response) => (response.ok ? response.text() : ''))
      .then((text) => {
        const xml = convertXML(text)

        // .filter((hijo) => {
        //   // filtrando solo las capas de la lista
        //   return Object.keys(hijo)[0] === keys.capa
        // })

        const _capas = xml[keys.capabilities][keys.listaHijos]
          .reduce(unirObjetos, {})
          [keys.capacidad][keys.listaHijos].reduce(unirObjetos, {})
          [keys.capa][keys.listaHijos].reduce((acumulado, hijo) => {
            // filtrando solo las capas de la lista

            if (hijo[keys.capa] === undefined) return acumulado

            // const capa = hijo[keys.capa][keys.listaHijos].reduce(unirObjetos, {})
            const capa = getHijos(hijo, keys.capa).reduce(unirObjetos, {})
            const resumen = capa[keys.resumen][keys.contenido]
            // const palabrasClave = capa[keys.listaPalabrasClave][keys.listaHijos]
            const palabrasClave = getHijos(capa, keys.listaPalabrasClave)

            if (
              resumen === undefined ||
              resumen === 'No hay resumen proporcionado' ||
              palabrasClave === undefined
            ) {
              return acumulado
            }

            // const metadato = capa[keys.metadato][keys.listaHijos].reduce(unirObjetos, {})
            const metadato = getHijos(capa, keys.metadato).reduce(unirObjetos, {})

            return [
              ...acumulado,
              {
                ...capa,
                // [keys.nombre]: capa[keys.nombre][keys.contenido],
                ...getContenido(capa, keys.nombre),
                [keys.titulo]: capa[keys.titulo][keys.contenido],
                [keys.resumen]: resumen,
                [keys.srs]: capa[keys.srs][keys.contenido],
                [keys.listaPalabrasClave]: palabrasClave.map(
                  (palabra) => palabra[keys.palabraClave][keys.contenido],
                ),
                // metadatos
                [keys.metadato]: {
                  ...capa[keys.metadato],
                  [keys.listaHijos]: {
                    ...metadato,
                    [keys.formato]: metadato[keys.formato][keys.contenido],
                    ['OnlineResource']: {
                      ...metadato['OnlineResource'],
                      ['xlink:href']: urlCheck(metadato['OnlineResource']['xlink:href']),
                    },
                  },
                },
              },
            ]
          }, [])

        // console.log(_capas.length)
        // console.log(_capas[0])

        capas.value = _capas
      })
      .catch((err) => console.error(err))
  }

  return {
    capas,
    consultar,
  }
}

function getContenido(obj, key) {
  return { [key]: obj[key][keys.contenido] }
}
function getHijos(obj, key) {
  return obj[key][keys.listaHijos]
}
function unirObjetos(a, b) {
  return { ...a, ...b }
}
function urlCheck(url) {
  return url.replaceAll('&amp;', '&')
}
