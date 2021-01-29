import Axios from 'axios';
import _ from 'lodash';

export const AutoCompleteFunction = (value) => {

    let suggestions = [];
    const url = '/search/diagnostico/' + value;

    if (value.length >= 4) {
        try {
            Axios.get(url)
            .then(resp => {
                suggestions = resp.data.data;
                // suggestions = [1,2,3];
                console.log('target ftn', suggestions);
                return suggestions
            })
            .catch(err => {
                console.log(err)
            })
        } catch (error) {
            console.log(error);
        }
    }

}

export const AutoCompleteHandler = (value, arr) => {
    const arrIndex = _.findIndex(arr, ['nombre', value]);
    return arr[arrIndex].codigo;
}