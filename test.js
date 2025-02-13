function fillInAbilities(pokemonId){
        let pokemon = allPokemonsArray[pokemonId];

        let abilityInHtml = document.getElementById(`stats${pokemonId}`)
        for(let j = 0; j < pokemon.abilities.length; j++){
        let pokeAbilities = pokemon.abilities[j].ability.name;

        if(pokeAbilities){
            abilityInHtml.innerHTML += /*html*/`
                <p>${pokeAbilities}</p>
            `
        }
        
    }
}


function zgetPokeTemplate(pokemonId, name, imgOfPoke, idCounter, pokemonWeight, pokemonHeight, pokemonAbility, pokemonType) {
    return /*html*/`
        <div onclick="showDetailsOfPoke('${name}', '${imgOfPoke}', ${pokemonId}, ${pokemonWeight}, ${pokemonHeight}, '${pokemonAbility}')" id="pokeCard${idCounter}" class="pokeCardLandingpage">
            <div class="mainInfoCardHeader">
                <p class="pokeIdFont">#${pokemonId}</p>
                <p id="pokeName${idCounter}" class="pokeNameFont">${name}</p>
                <p>${pokemonType}</p>
            </div>
            <hr class="horizontalLine">
            <div class="previewPokes">
                <img class="imgOfPokeLandingPage ${pokemonType}" loading="lazy" src="${imgOfPoke}" alt="Poke">
            </div>
            <hr class="horizontalLine">
            <div class="pokeTypeIcons" id="pokeIcons${idCounter}"></div>
        </div>
    `;
}






function znextPoke(pokemonId) {
    // Berechne die ID des nächsten Pokémon
    let nextPokemonId = pokemonId + 1;

    // Stelle sicher, dass die ID innerhalb der Array-Grenzen liegt
    if (nextPokemonId > allPokemonsArray.length) {
        console.log("Du bist beim letzten Pokémon!");
        return; // Keine weiteren Pokémon
    }

    // Holen der Daten des nächsten Pokémon
    let nextPokemon = allPokemonsArray[nextPokemonId - 1]; // Array ist 0-indexiert
    let name = nextPokemon.name.toUpperCase();
    let imgOfPoke = nextPokemon.sprites.other.home.front_default;
    let pokemonWeight = nextPokemon.weight / 10; // Anpassen des Gewichts
    let pokemonHeight = nextPokemon.height / 10; // Anpassen der Höhe
    let pokemonType = nextPokemon.types[0].type.name;

    // Aktualisieren der Detailseite mit den neuen Werten
    showDetailsOfPoke(name, imgOfPoke, nextPokemonId, pokemonWeight, pokemonHeight, pokemonType);
}



function evoChain(pokemonId) {
    let subInfoPoke = document.getElementById(`subInfoPoke${pokemonId}`);
    subInfoPoke.innerHTML = '';
    subInfoPoke.innerHTML = /*html*/`
        <p>test</p>        
        `
}


function fevochain(pokemonId) {
    let subInfoPoke = document.getElementById(`subInfoPoke${pokemonId}`);
    let pokeName = allPokemonsArray[pokemonId - 1].name;
    subInfoPoke.innerHTML = '';

    for (let e = 0; e < evoChainArray.length; e++) {
        let idOfEvoChain = evoChainArray[e].id;
        let firstEvo = evoChainArray[e].chain.species.name;
        let secondEvo = evoChainArray[e].chain.evolves_to[0]?.species?.name;
        let thirdEvo = evoChainArray[e].chain.evolves_to[0]?.evolves_to[0]?.species?.name;

        // Wenn das Pokémon in der Evolutionskette gefunden wird
        if (
            evoChainArray[e].chain.species.name === pokeName ||
            (evoChainArray[e].chain.evolves_to?.[0]?.species?.name === pokeName) ||
            (evoChainArray[e].chain.evolves_to?.[0]?.evolves_to?.[0]?.species?.name === pokeName)
        ) {
            // Hol dir die Bilder für die Evolutionsstufen
            let firstEvoImage = getPokemonImageByName(firstEvo);
            let secondEvoImage = secondEvo ? getPokemonImageByName(secondEvo) : '';
            let thirdEvoImage = thirdEvo ? getPokemonImageByName(thirdEvo) : '';

            // Baue das HTML dynamisch
            let evolutionHtml = /*html*/`
                <section class="evoContainer">
                    <div class="speciesColumn">
                        <p class="evoNameFont">${firstEvo}</p>
                        <img class="evoImages" src="${firstEvoImage}" alt="${firstEvo}">
                    </div>
                    <div class="speciesColumn">
                        <p class="evoNameFont">${secondEvo}</p>
                        <img class="evoImages" src="${secondEvoImage}" alt="${secondEvo}">
                    </div>
            `;

            // Füge das dritte Pokémon nur hinzu, wenn es existiert
            if (thirdEvo) {
                evolutionHtml += /*html*/`
                    <div class="speciesColumn">
                        <p class="evoNameFont">${thirdEvo}</p>
                        <img class="evoImages" src="${thirdEvoImage}" alt="${thirdEvo}">
                    </div>
                `;
            }

            // Schließe das HTML ab
            evolutionHtml += `</section>`;

            // Füge das gerenderte HTML in den Container ein
            subInfoPoke.innerHTML = evolutionHtml;
        }
    }
}


function evochain(pokemonId){
    let subInfoPoke = document.getElementById(`subInfoPoke${pokemonId}`);
    let pokeName = moreDataForEvo[pokemonId-1].name;
    subInfoPoke.innerHTML = '';

    for (let e = 0; e < evoChainArray.length; e++) {
        let idOfEvoChain = evoChainArray[e].id;
        let firstEvo = evoChainArray[e].chain.species.name;
        let secondEvo = evoChainArray[e].chain.evolves_to[0]?.species?.name;
        let thirdEvo = evoChainArray[e].chain.evolves_to[0]?.evolves_to[0]?.species?.name;
        if (
            evoChainArray[e].chain.species.name === pokeName ||
            (evoChainArray[e].chain.evolves_to?.[0]?.species?.name === pokeName) ||
            (evoChainArray[e].chain.evolves_to?.[0]?.evolves_to?.[0]?.species?.name === pokeName)
        ){
            let firstEvoImage = getPokeEvoImages(firstEvo)
            let secondEvoImage = secondEvo ? getPokeEvoImages(secondEvo) : '';
            let thirdEvoImage = thirdEvo ? getPokeEvoImages(thirdEvo) : '';

            let evoHtml = /*html*/`
            <section class="evoContainer">
                <div class="speciesColumn">
                    <p class="evoNameFont">${firstEvo}</p>
                    <img class="evoImages" src="${firstEvoImage}" alt="">
                </div>
                <div class="speciesColumnSeparator">
                <p class="evoNameFont">|</p>
                <img class="evoArrow" src="./assets/img/evoArrow.png" alt="">
                </div>
                <div class="speciesColumnSeparatorResponsive">
                <img class="evoArrowResponsive" src="./assets/img/arrowResponsive.png" alt="">
                </div>
                <div class="speciesColumn">
                    <p class="evoNameFont">${secondEvo}</p>
                    <img class="evoImages" src="${secondEvoImage}" alt="">
                </div>     
            `;

            if(thirdEvo){
                evoHtml += /*html*/`
                <div class="speciesColumnSeparatorResponsive">
                <img class="evoArrowResponsive" src="./assets/img/arrowResponsive.png" alt="">
                </div>
                <div class="speciesColumnSeparator">
                <p class="evoNameFont">|</p>
                <img class="evoArrow" src="./assets/img/evoArrow.png" alt="">
                </div>
                <div class="speciesColumn">
                    <p class="evoNameFont">${thirdEvo}</p>
                    <img class="evoImages" src="${thirdEvoImage}" alt="">
                </div>
                `
            }


            evoHtml += /*html*/`
                </section>
            `
        subInfoPoke.innerHTML = evoHtml
        }
    }
}


// wie ich in in evochain auch mit einer normalen forschleife gestalten könnte
// TEIL DES CODES IN MEINEM PROJEKT

for (let e of evoChainArray) {
    let { chain } = e;
    let [firstEvo, secondEvo, thirdEvo] = [
        chain.species.name,
        chain.evolves_to[0]?.species?.name,
        chain.evolves_to[0]?.evolves_to[0]?.species?.name
    ];
    // ... (Rest des Codes)
}

// Teil des Codes wie es auch gehen würde!

for (let i = 0; i < evoChainArray.length; i++) {
    let chain = evoChainArray[i].chain;
    let [firstEvo, secondEvo, thirdEvo] = [
        chain.species.name,
        chain.evolves_to[0]?.species?.name,
        chain.evolves_to[0]?.evolves_to[0]?.species?.name
    ];
    // ... (Rest des Codes)
}