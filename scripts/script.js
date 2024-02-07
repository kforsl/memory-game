function checkForGameOver() {

    const matchedCards = document.querySelectorAll(`.d-none`)

    if (matchedCards.length === cards.length * 2) {
        document.querySelector(`.game-area`).innerHTML = ``
        initGameOverScreen()
    }
}