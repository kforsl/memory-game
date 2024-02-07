window.addEventListener(`load`, () => {
    setGameArea(generateCardOrder())
});

function addEventListenerCard() {
    document.querySelectorAll(`.card`).forEach(card => card.addEventListener(`click`, flipCard));
}

function generateCardOrder() {
    const deck = [];
    const suffledDeck = [];

    cards.forEach(card => {
        for (let i = 0; i < 2; i++) {
            deck.push(card)
        }
    });

    for (let j = deck.length; j > 0; j--) {
        suffledDeck.push(...deck.splice(Math.floor(Math.random() * deck.length), 1));
    }
    return suffledDeck;
}

function setGameArea(playingCards) {
    document.querySelector(`.game-area`).innerHTML = ``

    playingCards.forEach(card => {
        const cardRef = document.createElement(`article`);
        cardRef.classList.add(`card`);

        const cardBackgroundRef = document.createElement(`div`)
        cardBackgroundRef.classList.add(`card-backside`)
        cardRef.appendChild(cardBackgroundRef);

        const cardImgRef = document.createElement(`img`);
        cardImgRef.src = card.cardImg
        cardImgRef.classList.add(`card-image`)
        cardRef.appendChild(cardImgRef);

        const cardTitleRef = document.createElement(`h2`);
        cardTitleRef.classList.add(`card-title`);
        cardTitleRef.textContent = card.cardName
        cardRef.appendChild(cardTitleRef);

        document.querySelector(`.game-area`).appendChild(cardRef)
        addEventListenerCard()
    });
  
  function flipCard(card) {
    const cardTarget = card.target
    const cardBackside = card.target.childNodes[0]

    if (nmbrFlipedCards === 1) {
        if (cardBackside.classList.value === `card-backside`) {
            cardBackside.classList.add(`d-none`)
            flipedCards.push(cardTarget)
            nmbrFlipedCards++
        }
    } else if (nmbrFlipedCards === 2) {
        if (cardBackside.classList.value === `card-backside`) {
            cardBackside.classList.add(`d-none`)
            flipedCards.push(cardTarget)
            nmbrFlipedCards--
            playedTurns++
            checkForMatch()
        }
    }
}
  
  function checkForMatch() {
    if (flipedCards[0].textContent !== flipedCards[1].textContent) {
        setTimeout(() => {
            flipToBackside()
            flipedCards = [];
        }, 700)
    } else {
        flipedCards = [];
        checkForGameOver()
    }

    function flipToBackside() {
    flipedCards.forEach(card => {
        card.firstChild.classList.remove(`d-none`)
    });
}
