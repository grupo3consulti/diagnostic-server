import PdfParse from 'pdf-parse';
import enviroment from '../config/enviroment';
import { AddressType, Client, GeocodingAddressComponentType } from "@googlemaps/google-maps-services-js";


const googleMap = new Client({});

const LIST_TYPES: { [key: string]: string } = { 
    CIUDAD: 'locality',
    PROVINCIA:'administrative_area_level_1',
    CANTON:'administrative_area_level_2',
    PAIS: 'country'
};

class UtilService {
    async getUbicacionByLatLng(lat: number, lng: number, type: string) {
        try {
            var termino = type.toUpperCase()
            const response = await googleMap.reverseGeocode({
                params: {
                    latlng: { lat, lng },
                    key: String(enviroment.GOOGLE_MAP_API_KEY)
                },
                timeout: 1000, // tiempo de espera en milisegundos
            });
            
            const results = response.data.results[0];
        
            return {nombre: this.getTerminoGeocodificacion(termino, results), datos: results};
            
        } catch (error) {
            console.error(error);
        }
    }

    getTerminoGeocodificacion(type: string, datos: { address_components: any[] }){
        var termino = type.toUpperCase()
        if(!Object.keys(LIST_TYPES).includes(termino))
        {
            throw new Error('El termino a buscar : '+termino+' no se encuentra definido en la lista de terminos disponibles')
        }
        const component = datos.address_components.find(component =>
            component.types.includes(LIST_TYPES[termino] as AddressType | GeocodingAddressComponentType)
          )?.long_name;
          return component
    }

    
    isValidJSON(jsonString: string) {
        try {
          JSON.parse(jsonString);
          return true;
        } catch (e) {
          return false;
        }
    }

    async extractTextFromPDF(file: any): Promise<string> {
        const pdfData = await PdfParse(file.buffer);
        return pdfData.text;
      }
}

export default new UtilService();
