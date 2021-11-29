const container = document.querySelector('#poke_container');
const loader = document.querySelector('.loader');
let pokemonNumber = 18;
const ttlPokemon = 1118;
let isFetching = false;
const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5'
};
let pokes = [];






function showLoader(){
  loader.classList.add('show');
}

function hideLoader(){
  loader.classList.remove('show');
}



async function getSeveralPokemons(offset,limit){
  let res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  if(!res.ok){
    throw new Error(`An error occurred: ${res.status}`);
  }
  return await res.json();
}


async function getApi(url){
  let x = await fetch(url);
  if(!x.ok){
    throw new Error(`An error occurred: ${x.status}`);
  }
  return await x.json();
}

const limit = 18;
let offset = 0;
let counts = 0;


async function loadPokemons(offset,limit){
  showLoader();

        try{
          isFetching = true;
          const res = await getSeveralPokemons(offset,limit);
          const promises = res.results.map(item => item.url);
          const y = await Promise.all(promises.map(async (url) => {
                          const resp = await fetch (url);
                          const ret = await resp.json();
                            return [ret.id,ret.forms[0].name,
                            ret.sprites.other["official-artwork"].front_default,
                            ret.types[0].type.name]
                        }));
        console.log(y);
        showPokemon(y);
        
          }catch(error){
            }finally{
              isFetching = false;
              hideLoader();
            }
          
          // for (let i = 0;i<=res.results.length;i++){
          //   const y = await getApi(res.results[i].url);
          //   await showPokemon(y.id,y.forms[0].name,y.sprites.other["official-artwork"].front_default,y.types[0].type.name);
          //   counts = res.count;
          // }
      // }

};
loadPokemons(offset,limit);

// y.forms[0].name          => name of pokemon
// y.sprites.other["official-artwork"].front_default        => image of pokemon
// y.types[0].type.name     => type of pokemon

function showPokemon(pokes){
   pokes.forEach((poke) => {
    const node = document.createElement('div');
   node.innerHTML = `<div class="pokemon" style="background-color: ${colors[poke[3]]};">
      <div class="img-container">
        <img src=${poke[2]} alt="pokemon-img">
      </div>
      <div class="info">
        <span class="number">#${poke[0]}</span>
        <h3 class="name">${poke[1]}</h3>
        <span class="type">Type: ${poke[3]}</span>
      </div>
    </div>`; 
  container.appendChild(node);
     
   });
}


window.addEventListener('scroll', async (e) => {
  if(isFetching) return;
  if(Math.floor(document.body.offsetHeight-window.scrollY-window.innerHeight)==0){
    offset = offset + 18;
    await loadPokemons(offset,limit);
  }
});










