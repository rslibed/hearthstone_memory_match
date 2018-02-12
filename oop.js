class MemoryMatch {
  constructor() {
    this.firstCardClicked = null;
    this.secondCardClicked = null;
    this.totalPossibleMatches = 9;
    this.matchCounter = 0;
    this.allowClick = true;
    this.attempts = 0;
    this.gamesPlayed = 0;
    this.cardArray = [];
    this.createCardElements();
    document.querySelector('.reset').addEventListener('click', () => {
      this.resetGame();
    });
  }
  createCardElements() {
    for (let i = 1; i < 10; i++) {
      for (let j = 0; j < 2; j++) {
        // Creating card elements on DOM
        const cardContainer = document.createElement('DIV');
        const card = document.createElement('DIV');
        const front = document.createElement('DIV');
        const frontImage = document.createElement('IMG');
        const back = document.createElement('DIV');
        const backImage = document.createElement('IMG');
        // Adding class lists on card elements
        cardContainer.classList.add('card-container');
        card.classList.add('card');
        front.classList.add('front', 'backface');
        back.classList.add('back', 'hoverEffect', 'backface');
        backImage.classList.add('legend');
        // Setting Attributes on card elements
        frontImage.setAttribute('src', `images/hero0${i}.png`);
        frontImage.setAttribute('draggable', 'false');
        backImage.setAttribute('src', 'images/card-back-legend.jpg');
        backImage.setAttribute('draggable', 'false');
        // Adding event listener to card back
        back.addEventListener('click', () => {
          this.cardClicked(front, back, frontImage.src, card);
        });
        // Appending card elements
        card.append(front, back);
        front.appendChild(frontImage);
        back.appendChild(backImage);
        cardContainer.appendChild(card);
        //  Pushing card containers to card array
        this.cardArray.push(cardContainer);
      }
    }
    this.shuffle(this.cardArray);
  }
  createWinModal() {
    const winModal = document.createElement("DIV");
    winModal.id = "win-modal";
    const winModalTitle = document.createElement("H1");
    winModalTitle.innerText = "Congratulations, you win!"
    const winModalButton = document.createElement("BUTTON");
    winModalButton.innerText = "Play Again!";
    winModalButton.classList.add("reset", "hoverEffect");
    winModalButton.addEventListener("click", () => {
      this.resetGame();
    })
    winModal.append(winModalTitle, winModalButton);
    document.getElementById("game-area").appendChild(winModal);
  }
  shuffle(array) {
    let remaining = array.length;
    while (remaining) {
      const i = Math.floor(Math.random() * remaining--);
      const temp = array[remaining];
      array[remaining] = array[i];
      array[i] = temp;
    }
    this.appendCardsToFragment(array);
  }
  appendCardsToFragment(array) {
    const deckFragment = document.createDocumentFragment();
    for (let i = 0; i < array.length; i++) {
      // document.getElementById("game-area").appendChild(array[i]);
      deckFragment.appendChild(array[i]);
    }
    this.appendCardstoDOM(deckFragment);
  }
  appendCardstoDOM(deckFragment) {
    document.getElementById('game-area').appendChild(deckFragment);
  }
  cardClicked(frontCardElement, backCardElement, frontImg, card) {
    if (frontCardElement.getAttribute('clicked')) {
      return;
    }
    if (this.allowClick) {
      this.allowClick = false;
      if (this.firstCardClicked === null) {
        this.allowClick = true;
        this.userClickedFirstCard(card);
      } else {
        this.userClickedSecondCard(card);
        const cardBacks = document.getElementsByClassName('back');
        for (let i = 0; i < cardBacks.length; i++) {
          cardBacks[i].classList.remove('hoverEffect');
        }
        const firstCardImgSrc = this.firstCardClicked.children[0].children[0]
          .src;
        const secondCardImgSrc = this.secondCardClicked.children[0].children[0]
          .src;
        if (firstCardImgSrc === secondCardImgSrc) {
          this.handleMatchedCards();
          if (this.matchCounter >= 9) {
            this.winCondition();
          }
        } else {
          this.hideMismatchedCards(
            this.firstCardClicked,
            this.secondCardClicked
          );
        }
        this.handleAttemptsStat();
        document.querySelector(
          '.accuracy-value'
        ).innerText = this.handleAccuracyStat();
      }
    }
  }
  userClickedFirstCard(card) {
    this.firstCardClicked = card;
    card.classList.add('flip');
    const frontCardContainer = card.children[0];
    frontCardContainer.classList.add('backface');
    frontCardContainer.setAttribute('clicked', 'true');
    frontCardContainer.style.transform = 'rotateY(180deg)';
  }
  userClickedSecondCard(card) {
    this.secondCardClicked = card;
    card.classList.add('flip');
    const frontCardContainer = card.children[0];
    frontCardContainer.style.transform = 'rotateY(180deg)';
  }
  handleMatchedCards() {
    this.allowClick = false;
    this.matchCounter = this.matchCounter + 1;
    setTimeout(() => {
      this.firstCardClicked.style.display = 'none';
      this.secondCardClicked.style.display = 'none';
    }, 750);
    setTimeout(() => {
      this.allowClick = true;
      this.firstCardClicked = null;
      this.secondCardClicked = null;
    }, 1000);
  }
  hideMismatchedCards(firstCard, secondCard) {
    setTimeout(() => {
      const cardBacks = document.getElementsByClassName('back');
      for (let i = 0; i < cardBacks.length; i++) {
        cardBacks[i].classList.add('hoverEffect');
      }
      const firstCardClicked = firstCard;
      const secondCardClicked = secondCard;
      firstCardClicked.classList.remove('flip');
      secondCardClicked.classList.remove('flip');
      firstCardClicked.children[0].removeAttribute('clicked');
      secondCardClicked.children[0].removeAttribute('clicked');
      this.firstCardClicked = null;
      this.secondCardClicked = null;
      this.allowClick = true;
    }, 1000);
  }
  handleAttemptsStat() {
    this.attempts = this.attempts + 1;
    document.querySelector('.attempts-value').innerText = this.attempts;
  }
  handleAccuracyStat() {
    if (this.attempts > 0) {
      let accuracy = this.matchCounter / this.attempts;
      accuracy = accuracy * 100;
      accuracy = accuracy.toFixed(2);
      return accuracy + '%';
    } else {
      return '0.00%';
    }
  }
  winCondition() {
    document.querySelector('.reset').innerText = 'Play again!';
    this.createWinModal();
  }
  resetGame() {
    document.querySelector('.reset').innerText = 'Reset';
    this.attempts = 0;
    this.matchCounter = 0;
    this.gamesPlayed = this.gamesPlayed + 1;
    document.querySelector('.games-value').innerText = this.gamesPlayed;
    document.querySelector('.attempts-value').innerText = this.attempts;
    document.querySelector(
      '.accuracy-value'
    ).innerText = this.handleAccuracyStat();
    document.getElementById('game-area').innerText = '';
    this.cardArray = [];
    this.createCardElements();
  }
}
new MemoryMatch();
