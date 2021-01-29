import Axios from 'axios';

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