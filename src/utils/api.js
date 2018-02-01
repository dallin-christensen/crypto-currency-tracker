

export function importAll(r){
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}


function handleError(error){
  console.warn(error);
  return null;
}

export async function fetchCurrencyData(){
  const response = await fetch('https://api.coinmarketcap.com/v1/ticker/?limit=40');
  return response.json();
}
