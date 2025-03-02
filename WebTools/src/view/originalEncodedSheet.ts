
export const originalEncodedSheet = () => {
    let url = new URL(window.location.href);
    let query = new URLSearchParams(url.search);
    let encodedSheet = query.get('s');
    return encodedSheet;
}