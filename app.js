document.addEventListener('DOMContentLoaded', () => {

    // Card options
    const cardArray = [
        {
            name: 'fantasma',
            img: 'images/001-fantasma.png'
        },
        {
            name: 'caballero',
            img: 'images/002-caballero.png'
        },    
        {
            name: 'dracula',
            img: 'images/003-dracula.png'
        },
        {
            name: 'parca',
            img: 'images/004-parca.png'
        },
        {
            name: 'ninja',
            img: 'images/005-ninja.png'
        },
        {
            name: 'superheroe',
            img: 'images/006-superheroe.png'
        },
        {
            name: 'vaquero',
            img: 'images/007-vaquero.png'
        },
        {
            name: 'momia',
            img: 'images/008-momia.png'
        },    
        {
            name: 'extraterrestre',
            img: 'images/009-extraterrestre.png'
        },
        {
            name: 'frankenstein',
            img: 'images/010-frankenstein.png'
        },
        {
            name: 'fantasma',
            img: 'images/001-fantasma.png'
        },
        {
            name: 'caballero',
            img: 'images/002-caballero.png'
        },    
        {
            name: 'dracula',
            img: 'images/003-dracula.png'
        },
        {
            name: 'parca',
            img: 'images/004-parca.png'
        },
        {
            name: 'ninja',
            img: 'images/005-ninja.png'
        },
        {
            name: 'superheroe',
            img: 'images/006-superheroe.png'
        },
        {
            name: 'vaquero',
            img: 'images/007-vaquero.png'
        },
        {
            name: 'momia',
            img: 'images/008-momia.png'
        },    
        {
            name: 'extraterrestre',
            img: 'images/009-extraterrestre.png'
        },
        {
            name: 'frankenstein',
            img: 'images/010-frankenstein.png'
        }        
    ]

    cardArray.sort(() => 0.5 - Math.random())

    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')

    document.querySelector('#restart').addEventListener('click', restartGame)

    var cardsChosen = []
    var cardsChosenId = []
    var cardsWon = []

    let attempts = 0

    // Create board
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            var card = document.createElement('img')
            card.setAttribute('src', 'images/back.png')
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipCard)
            grid.appendChild(card)
        }
    }

    // Check for matches
    function checkForMatch() {
        var cards = document.querySelectorAll('img')
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]
        if (cardsChosen[0] === cardsChosen[1]) {
            // alert('BIEN!')
            cardsWon.push(cardsChosen)
        } else {
            animateCSS(cards[optionOneId], 'flipOutY')
            cards[optionOneId].setAttribute('src', 'images/back.png')
            animateCSS(cards[optionTwoId], 'flipOutY')
            cards[optionTwoId].setAttribute('src', 'images/back.png')
        }
        cardsChosen = []
        cardsChosenId = []
        // resultDisplay.textContent = cardsWon.length
        attempts++
        resultDisplay.textContent = attempts
        if (cardsWon.length === cardArray.length/2) {
            document.querySelector('.title').innerHTML = `<span class="pr-4">;)</span>Terminaste`
        }
    }

    // Flip your card
    function flipCard() {
        if (this.getAttribute('src') === 'images/back.png') {
            var cardId = this.getAttribute('data-id')
            animateCSS(this, 'flipInY')
            cardsChosen.push(cardArray[cardId].name)
            cardsChosenId.push(cardId)
            this.setAttribute('src', cardArray[cardId].img)
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 500)
            }
        }
    }
    
    // Restart game
    function restartGame() {
        grid.querySelectorAll('*').forEach(n => n.remove())
        resultDisplay.textContent = 0
        document.querySelector('.title').innerHTML = `<span class="pr-4">:)</span>MEMORY`
        cardsWon = []
        cardArray.sort(() => 0.5 - Math.random()) 
        createBoard()
    }

    // Animate flip
    const animateCSS = (element, animation, prefix = 'animate__') =>
        // We create a Promise and return it
        new Promise((resolve, reject) => {
            const animationName = `${prefix}${animation}`;
            const node = element;
            console.log(node)

            node.classList.add(`${prefix}animated`, animationName);

            // When the animation ends, we clean the classes and resolve the Promise
            function handleAnimationEnd() {
                node.classList.remove(`${prefix}animated`, animationName);
                node.removeEventListener('animationend', handleAnimationEnd);

                resolve('Animation ended');
            }

            node.addEventListener('animationend', handleAnimationEnd);
        });

    createBoard()
});