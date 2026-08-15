export const originalEncodedSheet = () => {
  const url = new URL(window.location.href);
  const query = new URLSearchParams(url.search);
  const encodedSheet = query.get('s');
  return encodedSheet;
};
