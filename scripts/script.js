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