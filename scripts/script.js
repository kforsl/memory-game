function flipToBackside() {
    flipedCards.forEach(card => {
        card.firstChild.classList.remove(`d-none`)
    });
}