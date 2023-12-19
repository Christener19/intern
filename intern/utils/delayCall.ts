// simple function to delay api calls to prvent rate limit erros
export default async function throttle() {
    await new Promise(resolve => setTimeout(resolve, 1000));
}
