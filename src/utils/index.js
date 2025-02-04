// const url =
// 'https://ide.sedatu.gob.mx/geoserver/wms?service=wms&version=1.1.1&request=GetCapabilities&format=text%2Fxml'

const { BASE_URL } = import.meta.env

const url = `${BASE_URL}api/sedatu/getcapabilities_1.1.1.xml`

const options = { method: 'GET' }

export const GetCapabilities = fetch(url, options)
// .then((response) => response.json())
// .then((response) => console.log(response))
// .catch((err) => console.error(err))
