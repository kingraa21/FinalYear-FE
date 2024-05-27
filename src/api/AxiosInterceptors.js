import axios from 'axios';


const config = {
    timeout :400000,
    crossdomain : true,
    Headers : {
    'Content-Type' : 'application/json'
    },
    }
export const api = axios.create(config) 
// Set up the interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error && error.response) {
            const { status } = error.response;

            switch (status) {
                case 400:
                    // Handle 400 error
                    break;
                case 401:
                    // Handle 401 error, for example by refreshing the token
                    break;
                default:
                    break;
            }
        }

        // Retry logic
        if (!originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Retry the original request
                return api(originalRequest);
            } catch (retryError) {
                return Promise.reject(retryError);
            }
        }

        return Promise.reject(error);
    }
);
// const responseBody = (response) = response.data
// export const ApiRequester = {
// get:(url) => api.get(url).then(responseBody),
// post:(url) => api.post(url).then(responseBody, requestBody)
// }

