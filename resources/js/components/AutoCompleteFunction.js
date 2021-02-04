import Axios from 'axios';
import _ from 'lodash';

export async function AutoCompleteFunction (value) {
    let suggestions = [];
    const url = '/search/diagnostico/' + value;
    try {
        let response = await Axios.get(url)
        suggestions = response.data.data[0].descripcion_diagnostico;
    } catch (error) {
        console.error(error);
    }
    return suggestions;
}

export const AutoCompleteHandler = (value, arr) => {
    const arrIndex = _.findIndex(arr, ['nombre', value]);
    return arr[arrIndex].codigo;
}