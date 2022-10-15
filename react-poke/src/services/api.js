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
