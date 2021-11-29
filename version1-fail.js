const container = document.querySelector('#poke_container');
let pokemonNumber = 12;
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



async function pokemonList(n=1){
  for (let i = n;i<=pokemonNumber;i++){
    await getApi(i);
  }
};
pokemonList();

async function getApi(id){
  let x = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  let y = await x.json();
  await create(y.id,y.forms[0].name,y.sprites.other["official-artwork"].front_default,y.types[0].type.name );
}
// y.forms[0].name          => name of pokemon
// y.sprites.other["official-artwork"].front_default        => image of pokemon
// y.types[0].type.name     => type of pokemon

function create(id,name,img, type){
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
  if(window.scrollY+window.innerHeight>=document.body.offsetHeight){
    window.scrollBy(0, -200);
    increase();
    pokemonList(n);
  }
});



function increase(){
  pokemonNumber = pokemonNumber + 12;
  n = n + 12;
}

// setInterval(window.scrollY,1000)












