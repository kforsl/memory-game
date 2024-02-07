window.addEventListener(`load`, () => {
    setGameArea(generateCardOrder())
});

function addEventListenerCard() {
    document.querySelectorAll(`.card`).forEach(card => card.addEventListener(`click`, flipCard))
}