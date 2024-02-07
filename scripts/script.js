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

}