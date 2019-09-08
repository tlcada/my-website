import 'whatwg-fetch';

import config from '../../config/Config';

const callApi = (url, formData) => {
    return fetch(url, {
        mode: config.api.cors,
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8' },
        body: JSON.stringify(formData)
    })
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => error);
};

export { callApi };
