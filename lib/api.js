export default async function fetcher(url, options = {}) {
    let response;
    if (!options) {
        response = await fetch(url);

    }else {
        response = await fetch(url, options);
    }
    const data = await response;
    return data;
}