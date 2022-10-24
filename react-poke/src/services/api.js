export async function fetchApi(endpoint, setter) {
  let response = await fetch(
    'https://pokeapi.co/api/v2/' + endpoint,
    {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    }
  ).catch((error) => {
    console.log(error)
  });
  let data = await response.json();
  setter(data);
}

export function GetImageById(id) {
  id = id.toString().padStart(3, "0");
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`;
}
