class Game {
    constructor() {
        this.gameData = {
            firstCardClicked: null,
            secondCardClicked: null,
            totalPossibleMatches: 9,
            matchCounter: 0,
            allowClick: true,
            attempts: 0,
            accuracy: 0,
            gamesPlayed: 0
        }
        this.cardArray = [];
        this.createCardElements();
        document.querySelector(".reset").addEventListener("click", () => {
            this.resetGame();
        })
    }
    createCardElements() {
        for (let i = 1; i < 10; i++) {
            for (let j = 0; j < 2; j++) {
                let cardContainer = document.createElement("DIV");
                let card = document.createElement("DIV");
                let front = document.createElement("DIV");
                let frontImage = document.createElement("IMG");
                let back = document.createElement("DIV");
                let backImage = document.createElement("IMG");
                cardContainer.classList.add("card-container");
                card.classList.add("card");
                cardContainer.appendChild(card);
                front.classList.add("front");
                frontImage.setAttribute("src", `images/hero0${i}.png`);
                frontImage.setAttribute("draggable", 'false');
                back.classList.add("back");
                back.classList.add("hoverEffect");
                back.classList.add("backface");
                back.addEventListener("click", () => {
                    this.cardClicked(front, back,frontImage.src, card);
                })
                backImage.classList.add("legend");
                backImage.setAttribute("src", "images/card-back-legend.jpg");
                backImage.setAttribute("draggable", 'false');
                front.appendChild(frontImage);
                back.appendChild(backImage);
                card.appendChild(front);
                card.appendChild(back);
                this.cardArray.push(cardContainer);
            }
        }
        this.shuffle(this.cardArray);
    }
    shuffle(array) {
        let remaining = array.length;
        while (remaining) {
            let i = Math.floor(Math.random() * remaining--);
            let temp = array[remaining];
            array[remaining] = array[i];
            array[i] = temp;
        }
        for (let i = 0; i < array.length; i++) {
            document.getElementById("game-area").appendChild(array[i]);
        }
    }
    cardClicked (frontCardElement, backCardElement, frontImg, card) {
        if (frontCardElement.getAttribute("clicked")) {
            return;
        }
        if (this.gameData.allowClick) {
            this.gameData.allowClick = false;
            if (this.gameData.firstCardClicked === null) {
                this.gameData.allowClick = true;
                this.userClickedFirstCard(card);
            } else {
                this.userClickedSecondCard(card);
                if (this.gameData.firstCardClicked.children[0].children[0].src === this.gameData.secondCardClicked.children[0].children[0].src) {
                    this.handleMatchedCards();
                } else {
                    this.hideMismatchedCards(this.gameData.firstCardClicked, this.gameData.secondCardClicked);
                }
                this.handleAttemptsStat();
                this.handleAccuracyStat();
            }
        }
    }
    userClickedFirstCard (card) {
        this.gameData.firstCardClicked = card;
        card.classList.add("flip");
        const frontCardContainer = card.children[0];
        frontCardContainer.classList.add("backface");
        frontCardContainer.setAttribute("clicked", "true");
        frontCardContainer.style.transform = "rotateY(180deg)";
    }
    userClickedSecondCard (card) {
        this.gameData.secondCardClicked = card;
        card.classList.add("flip");
        const frontCardContainer = card.children[0];
        frontCardContainer.style.transform = "rotateY(180deg)";
    }
    handleMatchedCards () {
        this.gameData.allowClick = false;
        this.gameData.matchCounter = this.gameData.matchCounter + 1;
            setTimeout( () => {
                this.gameData.allowClick = true;
                this.gameData.firstCardClicked = null;
                this.gameData.secondCardClicked = null;
            }, 1000)
    }
    hideMismatchedCards (firstCard, secondCard) {
        setTimeout ( () => {
            const firstCardClicked = firstCard;
            const secondCardClicked = secondCard;
            firstCardClicked.classList.remove("flip");
            secondCardClicked.classList.remove("flip");
            firstCardClicked.children[0].removeAttribute("clicked");
            secondCardClicked.children[0].removeAttribute("clicked");
            this.gameData.firstCardClicked = null;
            this.gameData.secondCardClicked = null;
            this.gameData.allowClick = true;
        }, 1000);
    }
    handleAttemptsStat () {
        this.gameData.attempts = this.gameData.attempts + 1;
        document.querySelector(".attempts-value").innerText = this.gameData.attempts;
    }
    handleAccuracyStat () {
        if (this.gameData.attempts > 0) {
            this.gameData.accuracy = this.gameData.matchCounter / this.gameData.attempts;
            this.gameData.accuracy = this.gameData.accuracy * 100;
            this.gameData.accuracy = this.gameData.accuracy.toFixed(2);
            document.querySelector(".accuracy-value").innerText = this.gameData.accuracy + "%";
        }
    }
    resetGame() {
        this.gameData.attempts = 0;
        this.gameData.accuracy = 0;
        this.gameData.gamesPlayed = this.gameData.gamesPlayed + 1;
        document.querySelector(".games-value").innerText = this.gameData.gamesPlayed;
        document.querySelector(".attempts-value").innerText = this.gameData.attempts;
        document.querySelector(".accuracy-value").innerText = this.gameData.accuracy;
        document.getElementById("game-area").innerText = "";
        this.cardArray = [];
        this.createCardElements();
    }
}
let initializeGame = new Game();