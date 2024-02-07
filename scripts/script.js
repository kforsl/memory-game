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
}