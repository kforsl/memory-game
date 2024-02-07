function addEventListenerCard() {
    document.querySelectorAll(`.card`).forEach(card => card.addEventListener(`click`, flipCard))
}