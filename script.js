let maxPokeIndex = 20;
let allPokemonsArray = [];
const fetchPromises = [];

let evoChainArray = [];

let moreDataForEvo = [];
const moreDataEvoFetchPromises = [];


function init() {
    loadHeader();
    loadingSpinner();
    loadFirstPokemons();
    getMoreDataForEvo();
    getAllEvoChains();
    loadBottomArea();
}


function loadHeader() {
    let header = document.getElementById('header');
    header.innerHTML = '';
    header.innerHTML += getHeader();
}


function loadBottomArea() {
    let bottomArea = document.getElementById('bottomArea')
    bottomArea.innerHTML += getBottom();
}


async function loadFirstPokemons() {
    fetchPromises.length = 0;
    for (let i = 1; i <= 20; i++) {
        fetchPromises.push(
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(saveResponse));
    }
    const firstPokemons = await Promise.all(fetchPromises);
    for (let i = 0; i < firstPokemons.length; i++) {
        allPokemonsArray.push(firstPokemons[i]);
    }
    showPokemonsInHtml()
    fillInIcons()
    maxPokeIndex = 20;
}


function saveResponse(response) {
    return response.json();
}


async function loadMorePokemons() {
    fetchPromises.length = 0;
    for (let i = maxPokeIndex + 1; i <= maxPokeIndex + 20; i++) {
        fetchPromises.push(
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(saveResponse));
    }
    const nextPokemonsToShow = await Promise.all(fetchPromises)
    for (let i = 0; i < nextPokemonsToShow.length; i++) {
        allPokemonsArray.push(nextPokemonsToShow[i]);
    }    
    showPokemonsInHtml()
    fillInIcons()
}


async function getAllEvoChains() {
    evoChainArray = [];

    for (let i = 1; i < 209; i++) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${i}`);
            if (!response.ok) {
                console.error("das hat nicht geklappt");
                continue;
            }
            const evoFetchPromises = await response.json();
            evoChainArray.push(evoFetchPromises);
        } catch (error) {
            console.error(`Fehler bei der Anfrage nach Evolution Chain #${i}:`, error);
        }
    }
}


async function getMoreDataForEvo() {
    for (let i = 1; i < 1000; i++) {
        moreDataEvoFetchPromises.push(
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(saveResponse));
    }
    moreDataForEvo = await Promise.all(moreDataEvoFetchPromises);
}


function saveEvoResponse(response) {
    return response.json();
}


function showPokemonsInHtml() {
    let contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';
    let emptySearch = document.getElementById('emptySearchResults')
    emptySearchResults.innerHTML = '';
    for (let i = 0; i < allPokemonsArray.length; i++) {
        let pokemonId = allPokemonsArray[i].id;
        let name = allPokemonsArray[i].name.toUpperCase();
        let imgOfPoke = allPokemonsArray[i].sprites.other.home.front_default;
        let pokemonWeight = allPokemonsArray[i].weight / 10;
        let pokemonHeight = allPokemonsArray[i].height / 10;
        let pokemonType = allPokemonsArray[i].types[0].type.name;
        contentDiv.innerHTML += getPokeTemplate(pokemonId, name, imgOfPoke, i + 1, pokemonWeight, pokemonHeight, pokemonType);
    }
    maxPokeIndex = maxPokeIndex + 20
}


function getPokeEvoImages(pokemonName) {
    for (let i = 0; i < moreDataForEvo.length; i++) {
        if (moreDataForEvo[i].name === pokemonName) {
            return moreDataForEvo[i].sprites.other.home.front_default;
        }
    }
    return 'kein Bild gefunden';
}


function evochain(pokemonId) {
    let subInfoPoke = document.getElementById(`subInfoPoke${pokemonId}`);
    let pokeName = moreDataForEvo[pokemonId - 1].name;
    subInfoPoke.innerHTML = '';
    for (let e of evoChainArray) {
        let { chain } = e;
        let [firstEvo, secondEvo, thirdEvo] = [
            chain.species.name,
            chain.evolves_to[0]?.species?.name,
            chain.evolves_to[0]?.evolves_to[0]?.species?.name
        ];
        if ([firstEvo, secondEvo, thirdEvo].includes(pokeName)) {
            subInfoPoke.innerHTML = `
                ${getEvoTemplate(firstEvo, getPokeEvoImages(firstEvo), secondEvo, secondEvo ? getPokeEvoImages(secondEvo) : '')}
                ${thirdEvo ? getLastColumnOfEvo(thirdEvo, getPokeEvoImages(thirdEvo)) : ''}
                ${getEvoClosingTag()}
            `;
            break;
        }
    }
}


function showDetailsOfPoke(name, imgOfPoke, pokemonId, pokemonWeight, pokemonHeight, pokemonType) {
    let detailSite = document.getElementById('overlaySite');
    let body = document.getElementById('myBody');
    body.classList.add('o-hidden')
    detailSite.classList.remove('d-none')
    detailSite.innerHTML = '';
    detailSite.innerHTML = getDetailTemplate(name, imgOfPoke, pokemonId, pokemonWeight, pokemonHeight, pokemonType)   
    if(pokemonId > 1){
        document.getElementById('arrowLeft').classList.remove('d-none');
    }else{
        document.getElementById('arrowLeft').classList.add('d-none');
    }
    if(pokemonId === maxPokeIndex){
        document.getElementById('arrowRight').classList.add('d-none');
    }
    else{
        document.getElementById('arrowRight').classList.remove('d-none');
    }
    
    showPokeAbs(pokemonId);
    fillInIconsDetailSite(pokemonId);
}


function filterNameFunction() {
    let myFilter = document.getElementById('searchPoke').value.toLowerCase();
    let foundPokemon = false;
    if (myFilter.length < 3) {
        for (let i = 1; i <= maxPokeIndex; i++) {
            let wholePokeCard = document.getElementById(`pokeCard${i}`);
            wholePokeCard.style.display = ''; 
        }
        return;
    }
    for (let i = 1; i <= maxPokeIndex; i++) {
        let paramToFind = document.getElementById(`pokeName${i}`);
        let wholePokeCard = document.getElementById(`pokeCard${i}`);
        if (paramToFind.innerText.toLowerCase().includes(myFilter)) {
            wholePokeCard.style.display = '';
            foundPokemon = true;
        } else {
            wholePokeCard.style.display = 'none';
        }
    }
    showResultsMessage(foundPokemon);
}

function showResultsMessage(foundPokemon) {
    let emptySearchResultsDiv = document.getElementById('emptySearchResults');
    if (!foundPokemon) {
        emptySearchResultsDiv.innerHTML = /*html*/`
            <p class="emptySearchFont">KEIN POKEMON GEFUNDEN...</p>
        `;
    } else {
        emptySearchResultsDiv.innerHTML = '';
    }
}



function fillInIcons() {
    for (let i = 1; i <= maxPokeIndex; i++) {
        let pokemon = allPokemonsArray[i - 1];
        let iconToFill = document.getElementById(`pokeIcons${i}`);
        if (pokemon && pokemon.types) {
            for (let j = 0; j < pokemon.types.length; j++) {
                let pokeType = pokemon.types[j].type.name;
                let typeClassOfPoke = `poke-type-${pokeType}`;
                iconToFill.innerHTML += /*html*/`
                <div class="${typeClassOfPoke}" id="type${j}"></div>
            `
            }
        }
    }
}

function fillInIconsDetailSite(pokemonId) {
    let pokemon = allPokemonsArray[pokemonId - 1];
    let iconsDetailSite = document.getElementById(`iconsDetailSite${pokemonId}`);
    let iconHtml = '';
    if (pokemon && pokemon.types) {
        // Durchlaufe die Typen des Pokémon
        for (let j = 0; j < pokemon.types.length; j++) {
            let pokeType = pokemon.types[j].type.name;
            let typeClassOfPoke = `poke-type-${pokeType}`;
            // Füge für jeden Typ ein Icon hinzu
            iconHtml += `<div class="${typeClassOfPoke}" id="type${j}"></div>`;
        }
    }
    iconsDetailSite.innerHTML = iconHtml;
}


function closeDetailSite() {
    let body = document.getElementById('myBody');
    body.classList.remove('o-hidden');
    document.getElementById('overlaySite').classList.add('d-none')
}


function loadingSpinner() {
    setTimeout(function () {
        document.getElementById("overlay-loading-spinner").style.display = "none";
    }, 3000);
}


function showPokeAbs(pokemonId) {
    let chosenPoke = allPokemonsArray[pokemonId - 1]
    let absPoke = document.getElementById(`pokeAbs${pokemonId}`);
    for (let p = 0; p < chosenPoke.abilities.length; p++) {
        let abilityName = chosenPoke.abilities[p].ability.name;
        if (abilityName) {
            absPoke.innerHTML += getAbsTemplate(abilityName, p)
        }
    }
}


function showPokeStats(pokemonId) {
    let chosenPoke = allPokemonsArray[pokemonId - 1]
    let statsDiv = document.getElementById(`subInfoPoke${pokemonId}`);
    statsDiv.innerHTML = '';
    for (let s = 0; s < chosenPoke.stats.length; s++) {
        let currentStatName = chosenPoke.stats[s].stat.name.toUpperCase();
        let currentStatValue = chosenPoke.stats[s].base_stat;
        let progressPercentage = (currentStatValue / 100 * 70);
        statsDiv.innerHTML += statsTemplate(currentStatName, currentStatValue, progressPercentage);
    }
}


function showNextPoke(pokemonId) {
    let nextPokemonId = pokemonId + 1;
    let nextPokemon = allPokemonsArray[nextPokemonId - 1];
    let name = nextPokemon.name;
    let imgOfPoke = nextPokemon.sprites.other.home.front_default;
    let pokemonWeight = nextPokemon.weight / 10;
    let pokemonHeight = nextPokemon.height / 10;
    let pokemonType = nextPokemon.types[0].type.name;
    if (nextPokemonId === maxPokeIndex)
    {
        document.getElementById('arrowRight').classList.add('d-none');
    } else {
        document.getElementById('arrowRight').classList.remove('d-none');
    }
    showDetailsOfPoke(name, imgOfPoke, nextPokemonId, pokemonWeight, pokemonHeight, pokemonType)
}


function showPreviousPoke(pokemonId) {
    let previousPokemonId = pokemonId - 1;
    let previousPokemon = allPokemonsArray[previousPokemonId - 1];
    let name = previousPokemon.name;
    let imgOfPoke = previousPokemon.sprites.other.home.front_default;
    let pokemonWeight = previousPokemon.weight / 10;
    let pokemonHeight = previousPokemon.height / 10;
    let pokemonType = previousPokemon.types[0].type.name;
    if (pokemonId > 2) {
        document.getElementById('arrowLeft').classList.remove('d-none');
    }
    showDetailsOfPoke(name, imgOfPoke, previousPokemonId, pokemonWeight, pokemonHeight, pokemonType)
}









