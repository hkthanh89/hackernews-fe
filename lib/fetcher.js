import fetch from 'unfetch';

export const fetcher = url => fetch(url).then(r => r.json())
