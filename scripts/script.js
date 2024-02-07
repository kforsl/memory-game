window.addEventListener(`load`, () => {
    // setGameArea(generateCardOrder())
    initLoginForm()
});

function initLoginForm() {
    const loginForm = [
        {
            id: `username`,
            type: `text`,
            placeholder: `Username`
        },
        {
            id: `password`,
            type: `password`,
            placeholder: `Password`
        }
    ];

    const formRef = document.createElement(`form`);
    formRef.classList.add(`form-container`);
    document.querySelector(`.form-section`).appendChild(formRef);

    const h2Ref = document.createElement(`h2`);
    h2Ref.textContent = `Login`;
    formRef.appendChild(h2Ref);

    const errorMsgRef = document.createElement(`p`);
    errorMsgRef.classList.add(`error-msg`);
    formRef.appendChild(errorMsgRef);

    createFormInput(loginForm);

    const divRef = document.createElement(`div`);
    divRef.classList.add(`form-btnbox`);

    const loginBtnRef = document.createElement(`button`);
    loginBtnRef.classList.add(`form-btn`);
    loginBtnRef.id = `loginBtn`;
    loginBtnRef.textContent = `Login`;

    const signUpBtnRef = document.createElement(`button`);
    signUpBtnRef.classList.add(`form-btn`);
    signUpBtnRef.id = `signUpBtn`;
    signUpBtnRef.textContent = `Sign up`;

    divRef.appendChild(loginBtnRef);
    divRef.appendChild(signUpBtnRef);
    formRef.appendChild(divRef);

    loginBtnRef.addEventListener(`click`, validateLogin);
    signUpBtnRef.addEventListener(`click`, () => {
        event.preventDefault();
        console.log(`Clicked Sign Up`);
    });
}

function createFormInput(array) {
    array.forEach(item => {

        const divRef = document.createElement(`div`);
        divRef.classList.add(`form-inputbox`);

        const labelRef = document.createElement(`label`);
        labelRef.classList.add(`form-label`);
        labelRef.setAttribute(`for`, item.id);
        labelRef.textContent = `${item.placeholder}:`;

        const inputRef = document.createElement(`input`);
        inputRef.classList.add(`form-input`);
        inputRef.id = item.id;
        inputRef.type = item.type;
        inputRef.placeholder = `${item.placeholder}...`;

        divRef.appendChild(labelRef);
        divRef.appendChild(inputRef);
        document.querySelector(`.form-container`).appendChild(divRef);
    });
}

function validateLogin(event) {
    event.preventDefault();

    // Test User
    const users = [
        {
            username: `abc`,
            password: `123`,
            highScore: 0,
        },
    ]

    const usernameInput = document.querySelector(`#username`)
    const passwordInput = document.querySelector(`#password`)

    try {
        if (!usernameInput.value && !passwordInput.value) {
            throw {
                node: usernameInput,
                msg: `Please, enter in a username and a password.`
            }
        } else if (!usernameInput.value) {
            throw {
                node: usernameInput,
                msg: `Please, enter in a username.`
            }
        } else if (!passwordInput.value) {
            throw {
                node: passwordInput,
                msg: `Please, enter in a password.`
            }
        }

        const foundUser = users.find(user => user.username === usernameInput.value)

        if (!foundUser) {
            throw {
                node: usernameInput,
                msg: `Sorry, we couldn't find an account with that username.`
            }
        } else {
            if (foundUser.password !== passwordInput.value) {
                throw {
                    node: passwordInput,
                    msg: `Sorry, that password isn't right.`
                }
            } else {
                document.querySelector(`.form-section`).innerHTML = ``;
                setGameArea(generateCardOrder())
            }
        }

    } catch (error) {
        error.node.focus();
        error.node.value = ``;
        document.querySelector(`.error-msg`).textContent = error.msg;

    }

}

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
}

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
}

function checkForGameOver() {

    const matchedCards = document.querySelectorAll(`.d-none`)

    if (matchedCards.length === cards.length * 2) {
        document.querySelector(`.game-area`).innerHTML = ``
        initGameOverScreen()
    }
}

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