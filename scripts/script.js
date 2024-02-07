function initGameOverScreen() {
    const divRef = document.createElement(`div`)
    divRef.classList.add(`game-over`)

    const h2Ref = document.createElement(`h2`)
    h2Ref.classList.add(`congratulation-msg`)
    h2Ref.textContent = `Congratulation!!`
    divRef.appendChild(h2Ref)

    const msgRef = document.createElement(`p`)
    msgRef.classList.add(`victory-msg`)
    msgRef.textContent = `You matched all the cards in ${playedTurns} turns`
    divRef.appendChild(msgRef)

    const playAgainRef = document.createElement(`button`)
    playAgainRef.classList.add(`play-btn`)
    playAgainRef.textContent = `Play Again?`
    divRef.appendChild(playAgainRef)

    playAgainRef.addEventListener(`click`, () => {
        playedTurns = 0;
        setGameArea(generateCardOrder())
    })

    document.querySelector(`.game-area`).appendChild(divRef)
}
