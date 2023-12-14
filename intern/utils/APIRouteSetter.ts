
// to allow fetch requests to dynamically change between dev and live environment
export const mainRoute = ():string => {
    if (process.env.NODE_ENV === 'development') {
        // dev/local url
        return 'http:localhost:3000/'
    } else {
        // prod url
        return 'https://intern-soc.vercel.app/'
    }
}

// to allow rapid setting of GET request routes
export const getRoute:string = 'api/database/routes/GET/'

// to allow rapid setting of PATCH request routes
export const patchRoute:string = 'api/database/routes/PATCH/'

// to allow rapid setting of POST request routes
export const postRoute:string = 'api/database/routes/POSt/'

// to allow rapid setting of download request routes
export const downloadRoute:string = 'api/database/routes/download/'

// to allow rapid setting of DELETE request routes
export const deleteRoute:string = 'api/database/routes/DELETE/'
