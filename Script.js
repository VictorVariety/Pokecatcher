
let pokeballCount = 20
let winCon = 7
let rdmPokemon = ''
let gameMessage = 'You get 20 pokeballs, and <big><b>∞</b></big> stones. <br> Stones will increase capture chance <br> But it might scare the pokemon away. <br> Gotta Catch \'Em All!'
let wildPokemon = ['Charmander', 'Squirtle', 'Bulbasaur', 'Gabite', 'Munchlax']
let inventory = ['Pikachu']
let showInventory
let openInventory = false
let busyAction = true
let busyWorld = true
let storageInventory = []
let rdm
let catchFactor = 8
let escapeFactor = 5
let pokeballButton
let stoneButton
let walkButton
let bagButton
let image = `<img src="Pics/pokemon.png"></img>`
let anticipationMessages = [
    'You hit it! <br> But will you catch it?',
    'You pray for it to find peace in your balls..',
    'Mmmmyes? No..? Maybe?!',
    'Come on, come ooon!'
]
updateView()
function updateView() {
    showWorldButtons()
    showActionButtons()
    let html = /*HTML*/`
    <section class="outer">
        <div class="screen">
            <div>${openInventory ? showInventory : image}</div>
            `
    if (gameMessage !== '') {
        html += `<div class="message">${gameMessage}</div >`
    }
    html += /*HTML*/`               
            </div>
        <div class="worldButtons">
            ${walkButton} ${bagButton}                    
        </div>
        <div class="actionButtons">
            ${pokeballButton} ${stoneButton}
        </div>
    </section>
    `
    if (winCon <= 0) {
        gameMessage = 'Victory! <br><br> You have shown potential <br> maybe enough to become a master!'
        image = `<img src="Pics/victory.png"></img>`
        html = /*HTML*/`
    <section class="outer">
        <div class="screen">
            <div>${image}</div>       
            <div>${gameMessage}</div>       
        </div>
        <div class="worldButtons"></div>
        <div class="actionButtons"></div>
    </section>
    `
    } else if (pokeballCount < winCon) {
        gameMessage = 'Defeat <br> You ran out of pokeballs.'
        image = `<img src="Pics/gameover.png"></img>`
        html = /*HTML*/`
    <section class="outer">
        <div class="screen">
            <div>${image}</div>       
            <div>${gameMessage}</div>       
        </div>
        <div class="worldButtons"></div>
        <div class="actionButtons"></div>
    </section>
    `
    }
    document.getElementById('app').innerHTML = html
}

function showWorldButtons() {
    if (busyWorld) {
        walkButton = `<button onclick='walkInGrass()'>Walk</button>`
        bagButton = `<button onclick='inventoryFunc()'>Bag</button>`
    } else {
        walkButton = ''
        bagButton = ''
    }
}
function showActionButtons() {
    if (rdmPokemon !== '' && !openInventory && busyAction) {
        pokeballButton = `<button onclick='throwPokeball()'>Pokeball</button>`
        stoneButton = `<button onclick='stone()'>Stone</button>`
    } else {
        pokeballButton = ''
        stoneButton = ''
    }
}
function winLoss() {

}
function walkInGrass() {
    rdm = Math.ceil(Math.random() * 10)
    rdmPokemon = wildPokemon[Math.floor(Math.random() * wildPokemon.length)]
    gameMessage = 'You encountered a ' + rdmPokemon
    image = `<img src="Pics/` + rdmPokemon.toLowerCase() + `.png"></img>`
    if (openInventory == true) {
        openInventory = false
    }
    updateView()
}
function stone() {
    if (rdmGenCeil(5) == 5) {
        gameMessage = rdmPokemon + ' escaped!'
        rdmPokemon = ''
        image = `<img src="Pics/grass.png"></img>`
    } else {
        catchFactor - 3;
        escapeFactor--;
        image = `<img class="stoneAnimation" src="Pics/` + rdmPokemon.toLowerCase() + `.png"></img>`
    }
    updateView()
}
function throwPokeball() {
    image = `<img src="Pics/flyingball.gif"></img>`
    busyAction = !busyAction
    busyWorld = !busyWorld
    updateView()
    setTimeout(() => { pokeball() }, 600)
}
function pokeball() {
    image = `<img class="pokeballCaptureAnimation" src="Pics/` + rdmPokemon.toLowerCase() + `.png"></img>`
    updateView()
    setTimeout(() => { pokeballDecision() }, 890)
}

function pokeballDecision() {
    rdm = rdmGenCeil(10)
    gameMessage = anticipationMessages[rdmGenFloor(anticipationMessages.length)]
    if (rdm >= catchFactor) {
        winCon--
        image = `<img src="Pics/caught.gif"></img>`
        updateView()
        setTimeout(() => { pokeballCatch() }, 4900)

    } else if (rdm >= escapeFactor) {
        image = `<img src="Pics/caught.gif"></img>`

        updateView()
        setTimeout(() => { pokeballEscape() }, 3500)
    } else {
        image = `<img src="Pics/caught.gif"></img>`

        updateView()
        setTimeout(() => { pokeballPop() }, 3500)
    }
    pokeballButton = ''
    stoneButton = ''
    updateView()
}

function pokeballCatch() {
    if (inventory.length < 6) {
        inventory.push(rdmPokemon)
        gameMessage = 'Aww yeah!!'
        image = `<img src="Pics/success.gif"></img>`
        updateView()
        setTimeout(() => {
            image = `<img src="Pics/grass.png"></img>`
            gameMessage = 'You caught ' + rdmPokemon + ' <br> See if you can catch ' + wordNum(winCon) + ' more pokemon'
            updateView()
            rdmPokemon = ''
        }, 2200)
    } else {
        storageInventory.push(rdmPokemon)
        gameMessage = 'Aww yeah!!'
        image = `<img src="Pics/success.gif"></img>`
        updateView()
        setTimeout(() => {
            gameMessage = 'You caught ' + rdmPokemon + ' but have no room for more, so you stored it in a storage system, only ' + winCon + ' to go!'
            image = `<img src="Pics/pokemonstorage.png"></img>`
            updateView()
            rdmPokemon = ''
        }, 2200)
    }
    setTimeout(() => { busyAction = !busyAction, busyWorld = !busyWorld, updateView(), pokeballCount-- }, 2200)
}

function pokeballEscape() {
    gameMessage = 'Oh sheet, ' + rdmPokemon + ' escaped!'
    image = `<img src="Pics/forest.png"></img>`
    rdmPokemon = ''
    busyAction = !busyAction
    busyWorld = !busyWorld
    pokeballCount--
    updateView()
}
function pokeballPop() {
    gameMessage = 'Aarh, ' + rdmPokemon + ' broke free <br> and is eyeballing you nervously'
    image = `<img class="pokeballFailAnimation" src="Pics/` + rdmPokemon + `.png"></img>`
    busyAction = !busyAction
    busyWorld = !busyWorld
    pokeballCount--
    updateView()
}
function inventoryFunc() {
    showInventory = '<p>PokeBag</p>'
    showInventory += '<p>Pokeballs:' + pokeballCount
    for (i = 0; i < inventory.length; i++) {
        showInventory += `<ul>${inventory[i]}</ul>`
    }
    openInventory = !openInventory
    if (openInventory == false) {
        if (gameMessage == rdmPokemon + ' broke free <br> and is eyeballing you nervously' || gameMessage == 'You encountered a ' + rdmPokemon) {
        } else {
            gameMessage = 'New challenges to overcome <br> Let\'s go!'
        }
    }
    updateView()
}
function rdmGenFloor(x) {
    return Math.floor(Math.random() * x)
}
function rdmGenCeil(x) {
    return Math.ceil(Math.random() * x)
}
function wordNum(x) {
    if (x == 1) {
        return 'one'
    }
    if (x == 2) {
        return 'two'
    }
    if (x == 3) {
        return 'three'
    }
    if (x == 4) {
        return 'four'
    }
    if (x == 5) {
        return 'five'
    }
    if (x == 6) {
        return 'six'
    }
    if (x == 7) {
        return 'seven'
    }
}