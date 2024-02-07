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