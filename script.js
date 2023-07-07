
const letterContainer = document.querySelector('#letter-container')
const selectContainer = document.querySelector('#select-container')
const userInput = document.querySelector('#user-input-section')
const newGameContainer = document.querySelector('#new-game-container')
const newGameBtn = document.querySelector('#new-game-button')
const canvas = document.querySelector('#canvas')
const resultText = document.querySelector('#result-text')

let options = {
    Animals1: [
        "cat", "frog", "chicken", "turtle", "crab", "rabbit", "shark", "crocodile", "giraffe", "cow", "horse", "butterfly", "bull", "pig", "rhino", "sheep", "snake", "panda"
    ],
    Animals2: [
        "eagle", "swan", "bee", "tortoise", "wolf", "lion", "owl", "caterpillar", "gorilla", "hippo", "goat", "snail", "beetle", "kangaroo", "parrot", "whale", "grasshopper", "ant", "camel", "lizard"
    ],
    Body: [
        "eyes", "teeth", "toes", "head", "eyebrow", "ears", "hair", "shoulder", "tongue", "bones", "hand", "finger", "knee", "moustache", "ankle", "nose", "leg", "thumb", "neck", "heel", "mouth", "beard"
    ],
    Nature: [
        "sun", "rainbow", "river", "volcano", "moon", "flower", "snow", "bush", "lightning", "planet", "rain", "clouds", "mountain", "forest", "cliffs", "tree", "leaf", "desert", "lake", "wind", "stars",
    ],
    Kitchen: [
        "cup", "spoon", "kettle", "coffee machine", "corkscrew", "bowl", "frying pan", "toaster", "wine glass", "mixer", "glass", "jug", "microwave", "dishcloth", "grater", "knife", "saucepan", "teapot",
    ]
}

let winCount = 0;
let count = 0;
let selectedWord = '';


function displayOptions() {
    selectContainer.innerHTML += `
        <h2> Select Content </h2>
    `
    let btnContainer = document.createElement('div')
    for (let value in options) {
        btnContainer.innerHTML += `
            <button class="options" onclick="generateWord('${value}')">${value}</button>
        `
    }
    selectContainer.appendChild(btnContainer)
}

// Disable all buttons
function blockBtns() {
    let optionsButtons = document.querySelectorAll('.options')
    let letterButtons = document.querySelectorAll('.letters')
    optionsButtons.forEach((button) => {
        button.disabled = true
    })

    // disable all letters
    letterButtons.forEach((button) => {
        button.disabled = true
    })
    newGameContainer.classList.remove('hide')
}

// Generate words
function generateWord(selectValue) {
    let selectBtns = document.querySelectorAll('.options')
    selectBtns.forEach((button) => {
        if (button.innerText.toLowerCase() === selectValue) {
            button.classList.add("active")
        }
        button.disabled = true
    })

    letterContainer.classList.remove('hide')
    userInput.innerText = ''

    let optionArray = options[selectValue]

    selectedWord = optionArray[Math.floor(Math.random() * optionArray.length)]
    selectedWord = selectedWord.toUpperCase()

    // Replace every letter with span containing dash
    let displayItem = selectedWord.replace(/./g, '<span class="dashes">_</span>');
    userInput.innerHTML = displayItem;
}


function starter() {
    winCount = 0
    count = 0

    userInput.innerHTML = ''
    selectContainer.innerHTML = ''
    letterContainer.classList.add('hide')
    newGameContainer.classList.add('hide')
    letterContainer.innerHTML = ''

    // Create uppercased letter buttons (A-Z) by referring to ASCII Code
    for (let i = 65; i <= 90; i++) {
        let btn = document.createElement('button')
        btn.classList.add('letters')
        btn.innerText = String.fromCharCode(i)

        btn.addEventListener('click', () => {
            let letterArray = selectedWord.split('')
            let dashes = document.getElementsByClassName('dashes')

            if (letterArray.includes(btn.innerText)) {
                letterArray.forEach((letter, index) => {
                    if (letter === btn.innerText) {
                        dashes[index].innerText = letter;
                        winCount += 1
                        btn.remove()
                        if (winCount == letterArray.length) {
                            resultText.innerHTML = `
                                <h2 class="win-msg">You Win!</h2>
                            `
                            blockBtns()
                        }
                    }
                })
            } else {
                count += 1
                if (count == 6) {
                    resultText.innerHTML = `
                        <h2 class="lose-msg">Game Over</h2><p>The word was <span>${selectedWord}</span></p> 
                    `
                    blockBtns()
                }
            }
            btn.disabled = true
        })
        letterContainer.append(btn)
    }

    displayOptions()
}

// //New Game
newGameBtn.addEventListener("click", starter);
window.onload = starter;

