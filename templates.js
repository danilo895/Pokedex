function getHeader() {
    return /*html*/`
        <div class="headerInfos">
            <div class="header-left">
            <p class="header-font">POKEDEX</p>
            <img src="./assets/img/pokelogo.png" alt="Pokemon-Logo">
            </div>
            <div class="box">
        <form name="search">
        <input id="searchPoke" onkeyup="filterNameFunction()" type="text" class="input" name="txt" onmouseout="this.value = ''; this.blur();">


        </form>
        <i class="fas fa-search"></i>
        </div>
        </div>
    `
}

function getBottom() {
    return /*html*/`
        <button onclick="loadMorePokemons()" id="buttonLoadMorePokemons" class="buttonLoadMorePokemons">MEHR POKEMONS LADEN</button>
    `
}


function getPokeTemplate(pokemonId, name, imgOfPoke, idCounter, pokemonWeight, pokemonHeight, pokemonType) {
    return /*html*/`
        <div onclick="showDetailsOfPoke('${name}', '${imgOfPoke}', ${pokemonId}, ${pokemonWeight}, ${pokemonHeight}, '${pokemonType}')" id="pokeCard${idCounter}" class="pokeCardLandingpage">
            <div class="mainInfoCardHeader">
                <p class="pokeIdFont">#${pokemonId}</p>
                <p id="pokeName${idCounter}" class="pokeNameFont">${name}</p>
            </div>
            <div class="previewPokes ${pokemonType}">
                <img class="imgOfPokeLandingPage" loading="lazy" src="${imgOfPoke}" alt="Poke">
            </div>
            <div class="pokeTypeIcons" id="pokeIcons${idCounter}">
            </div>
        </div>
    `;
}



function getDetailTemplate(name, imgOfPoke, pokemonId, pokemonWeight, pokemonHeight, pokemonType) {
    return /*html*/`
            <div class="detailedPokeCard">
            <div class="headerOfDetailSite">
            <div class="leftHeaderDetailsite">
            <p class="pokeIdFontDetail">#${pokemonId}</p>        
            <div class="iconsInDetail" id="iconsDetailSite${pokemonId}">
            </div>
            </div>
            <div class="closeWindow">
                <div onclick=closeDetailSite() class="hover-close-detail">
                <p class="close">X</p>
                </div>
            <p class="pokeNameFont-detailsite">${name}</p>
            </div>
            </div>
            <div class="imgAndArrowSection ${pokemonType}">
            <img id="arrowLeft" onclick="showPreviousPoke(${pokemonId})" class="arrow d-none" src="./assets/img/left-arrow.png" alt="">
            <img id="currentPokeImg${pokemonId}" class="pokeDetailPic" src="${imgOfPoke}" alt="Image of Pokemon">
            <img id = "arrowRight" onclick="showNextPoke(${pokemonId})" class="arrow" src="./assets/img/right-arrow.png" alt="">
            </div>
            <div class="buttonsDetailsite">
                <button onclick="showDetailsOfPoke('${name}', '${imgOfPoke}', ${pokemonId}, ${pokemonWeight}, ${pokemonHeight}, '${pokemonType}')" class="button-detailsite" role="button">GENERAL</button>
                <button onclick="evochain(${pokemonId})" class="button-detailsite" role="button">EVO CHAIN</button>
                <button onclick="showPokeStats(${pokemonId})" class="button-detailsite" role="button">STATS</button>
            </div>
            <div class="detailInfoCont" id="stats${pokemonId}">
            <div id="subInfoPoke${pokemonId}" class="physicalFactsOfPoke">
                    <table id="pokeAbs${pokemonId}">
                        <tbody>
                            <tr>
                                <td>HEIGHT:</td>
                                <td>${pokemonHeight} M</td>
                            </tr>
                            <tr>
                                <td>WEIGHT:</td>
                                <td>${pokemonWeight} KG</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
    `
}


function getAbsTemplate(abilityName, p) {
    return /*html*/`
    <tr>
        <td>ABILITY ${p + 1}:</td>
        <td>${abilityName}</td>
    </tr>
    `
}

function statsTemplate(currentStatName, currentStatValue, progressPercentage) {
    return /*html*/`
    <div class="statsOfEachPoke">
        <p class="progress-p">${currentStatName}</p>
        <p class="progress-p">${currentStatValue}</p>
    <div class="progress">
    <div class="bar">
        <div class="progress-value" style="width: ${progressPercentage}%;">
        </div>
                </div>
            </div>
        </div>
    `
}

function getEvoTemplate(firstEvo, firstEvoImage, secondEvo, secondEvoImage) {
    return /*html*/`
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
    `
}

function getLastColumnOfEvo(thirdEvo, thirdEvoImage) {
    return /*html*/`
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

function getEvoClosingTag() {
    return  /*html*/`
    </section>
`
}