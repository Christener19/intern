export const mainRoute = (): string => {
    if (process.env.NODE_ENV === 'development') {
        // dev/local url
        return 'http://localhost:3000/';
    } else {
        // prod url
        return 'https://intern-soc.vercel.app/';
    }
}

// to allow rapid setting of GET request routes
export const getRoute = mainRoute() + 'api/database/routes/GET/';

// to allow rapid setting of PATCH request routes
export const patchRoute = mainRoute() + 'api/database/routes/PATCH/';

// to allow rapid setting of POST request routes
export const postRoute = mainRoute() + 'api/database/routes/POST/';

// to allow rapid setting of download request routes
export const downloadRoute = mainRoute() + 'api/database/routes/download/';

// to allow rapid setting of DELETE request routes
export const deleteRoute = mainRoute() + 'api/database/routes/DELETE/';
