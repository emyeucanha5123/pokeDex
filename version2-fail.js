const container = document.querySelector('#poke_container');
// const loader = document.querySelector('.loader');
let pokemonNumber = 18;
const ttlPokemon = 1118;
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






// function showLoader(){
//   loader.classList.add('show');
// }

// function hideLoader(){
//   loader.classList.remove('show');
// }



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
  // showLoader();
  setTimeout(async () => {
    try{
        if(hasMorePokemons(offset, limit, counts)){
          const res = await getSeveralPokemons(offset,limit);
          for (let i = 0;i<=res.results.length;i++){
            const y = await getApi(res.results[i].url);
            await showPokemon(y.id,y.forms[0].name,y.sprites.other["official-artwork"].front_default,y.types[0].type.name);
            counts = res.count;
          }
      }

  }catch(error){
    }finally{
      // hideLoader();
    }
  },500);
};
loadPokemons(offset,limit);


function hasMorePokemons(offset,limit, count){
  const final = (offset/limit - 1) * limit + 1;
  console.log(count === 0 || count > final);
  return count === 0 || count > final;
}
// y.forms[0].name          => name of pokemon
// y.sprites.other["official-artwork"].front_default        => image of pokemon
// y.types[0].type.name     => type of pokemon

function showPokemon(id,name,img, type){
   const node = document.createElement('div');
   node.innerHTML = `<div class="pokemon" style="background-color: ${colors[type]};">
      <div class="img-container">
        <img src=${img} alt="pokemon-img">
      </div>
      <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <span class="type">Type: ${type}</span>
      </div>
    </div>`; 
  container.appendChild(node);
}


let n =1;
window.addEventListener('scroll', function(e) {
  console.log(Math.floor(document.body.offsetHeight-window.scrollY-window.innerHeight) );
  if(Math.floor(document.body.offsetHeight-window.scrollY-window.innerHeight)==0 &&  hasMorePokemons(offset, limit, counts)){
    offset = offset + 18;
    loadPokemons(offset,limit);
  }
}, {
    passive: true
    });










