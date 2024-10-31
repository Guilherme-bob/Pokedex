
// CONECTAR E CAPTURAR AS INFORMAÇÕES DA POKE API~
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonName = document.querySelector('.pokemon__name');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonprev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchpokemon = 1;

// conectar e capiturar as inf

const fetchPokemon = async (pokemon) => {
    const APIReponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIReponse.status === 200) {

        const data = await APIReponse.json();
        
        return data;
        
    }
    
    
};

const renderPokemon = async (pokemon) => {
    
    pokemonName.innerHTML = "Loading...";
    pokemonNumber.innerHTML = "";
    pokemonImage.src = "./src/imagem/imagem loading.gif"

    const data = await fetchPokemon(pokemon);

    console.log(data);
    
    if (data){
        
        // Caso tudo de certo 
        pokemonImage.src = data.sprites.versions["generation-v"]["black-white"].animated.front_default
        pokemonImage.style.width = "25%";
        pokemonNumber.innerHTML = data.id;
        pokemonName.innerHTML = data.name;
        input.value = "";
        searchpokemon = data.id;
        
    } else {
        // Caso de errado
        pokemonImage.src = "./src/imagem/imagem erro.gif" 
        pokemonImage.style.width = "";
        pokemonNumber.innerHTML = "";
        pokemonName.innerHTML = "Not Found! :(";
    }

    
};

form.addEventListener('submit', (event) => {

    event.preventDefault();

    renderPokemon( input.value.toLowerCase());

});

buttonprev.addEventListener('click', () =>{

    if (searchpokemon > 1) {

        searchpokemon -= 1;
    
        renderPokemon(searchpokemon);
        
    }


});

buttonNext.addEventListener('click', ()=>{

    searchpokemon  += 1;

    renderPokemon(searchpokemon);

})
renderPokemon(searchpokemon);