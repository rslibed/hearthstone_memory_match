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
            gamesPlayed: 0,
            audio: '',
            victory2: '',
            victory3: '',
            victory4: '',
            backgroundMusicData: {
                listOfBackgroundSongs: [
                    'background-music',
                    'background-music2',
                    'background-music3',
                    'background-music4'
                ],
                backgroundAudioPlaying: true,
                loop: true,
                randomSong: () => {
                    Math.floor(Math.random() * this.listOfBackgroundSongs.length);
                },
                backgroundAudio: () => {
                    new Audio('sounds/' + this.listOfBackgroundSongs[this.randomSong()] + '.ogg');
                },
                playAudio: () => {
                    this.backgroundAudio.play();
                }
            }
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
        let remaining = array.length, temp, i;
        while (remaining) {
            i = Math.floor(Math.random() * remaining--);
            temp = array[remaining];
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
                this.gameData.firstCardClicked = card;
                card.classList.add("flip");
                const frontCardContainer = card.children[0];
                frontCardContainer.classList.add("backface");
                frontCardContainer.setAttribute("clicked", "true");
                frontCardContainer.style.transform = "rotateY(180deg)";
            } else {
                this.gameData.secondCardClicked = card;
                card.classList.add("flip");
                const frontCardContainer = card.children[0];
                frontCardContainer.style.transform = "rotateY(180deg)";
                if (this.gameData.firstCardClicked.children[0].children[0].src === this.gameData.secondCardClicked.children[0].children[0].src) {
                    this.gameData.allowClick = false;
                    setTimeout( () => {
                        this.gameData.allowClick = true;
                        this.gameData.matchCounter = this.gameData.matchCounter + 1;
                        this.gameData.firstCardClicked = null;
                        this.gameData.secondCardClicked = null;
                    }, 1000)
                } else {
                    this.hideMismatchedCards(this.gameData.firstCardClicked, this.gameData.secondCardClicked);
                }
                this.gameData.attempts = this.gameData.attempts + 1;
                console.log(this.gameData.attempts);
                document.querySelector(".attempts-value").innerText = this.gameData.attempts;
            }
        }
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
    resetGame() {
        this.gameData.attempts = 0;
        this.gameData.accuracy = 0;
        this.gameData.gamesPlayed = this.gameData.gamesPlayed + 1;
        document.querySelector(".games-value").innerText = this.gameData.gamesPlayed;
        document.getElementById("game-area").innerText = "";
        this.cardArray = [];
        this.createCardElements();
    }
    settingsModal () {

    }
    winModal () {

    }
    toggleSound() {

    }
}
let initializeGame = new Game();