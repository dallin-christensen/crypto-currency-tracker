


function handleError(error){
  console.warn(error);
  return null;
}

export async function fetchCurrencyData(){
  const response = await fetch('https://api.coinmarketcap.com/v1/ticker/?limit=20');
  return response.json();
}
