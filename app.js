$(document).ready(initializeApp);
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var preventClick = true;
var attempts = 0;
var accuracy = 0;
var games_played = 0;
var audio;
function background () {
    var backgroundMusic = ['background-music', 'background-music2', 'background-music3', 'background-music4'];
    var randomSong = Math.floor(Math.random() * backgroundMusic.length);
    var backgroundAudio = new Audio('sounds/' + backgroundMusic[randomSong] + '.ogg');
    backgroundAudio.loop = true;
    backgroundAudio.play();
}
background();
var victory2;
var victory3;
var victory4;
function initializeApp () {
    function createCardElements () {
        var cardArray = [];
        for (var i = 1; i < 10; i++) {
            for (var j = 0; j < 2; j++) {
                var cardContainer = $("<div>").addClass("card-container");
                var card = $("<div>").addClass("card");
                cardContainer.append(card);
                var front = $("<div>").addClass("front");
                var frontImage = $("<img>").addClass("hero").attr("src", "images/hero0" + i + ".png");
                front.append(frontImage);
                var back = $("<div>").addClass("back");
                var backImage = $("<img>").addClass("legend").attr({
                    "src": "images/card-back-legend.jpg",
                    "draggable": "false"
            });
                back.append(backImage);
                card.append(front, back);
                cardArray.push(cardContainer);
            }
        }
        function shuffle(array) {
            var remaining = array.length, temp, i;
            while (remaining) {
                i = Math.floor(Math.random() * remaining--);
                temp = array[remaining];
                array[remaining] = array[i];
                array[i] = temp;
            }

            for (var i = 0; i < array.length; i++) {
                $("#game-area").append(array[i]);
            }
        }
        shuffle(cardArray);
    }
    createCardElements();
    $(".card").click(card_clicked).mouseenter(card_hover);
    $(".reset").click(resetGame);
    function card_hover () {
        console.log($(this).find(".front").find("img").attr("src"));
    }
    function card_clicked () {
        if ($(this).find(".front").attr("matched")) {
            return;
        }
        if (preventClick) {
            var cardFlipSound = new Audio("sounds/card-flip.ogg");
            cardFlipSound.play();
            preventClick = false;
            if (first_card_clicked === null) {
                first_card_clicked = this;
                $(first_card_clicked).find(".back").hide();
                preventClick = true;
            } else {
                second_card_clicked = this;
                $(second_card_clicked).find(".back").hide();
                attempts++;
                $(".attempts .value").text(attempts);
                if ($(first_card_clicked).find(".front").find("img").attr("src") === $(second_card_clicked).find(".front").find("img").attr("src")) {
                    $(first_card_clicked).find(".front").attr("matched", "true");
                    $(second_card_clicked).find(".front").attr("matched", "true");
                    match_counter++;
                    console.log(match_counter);
                    preventClick = true;
                    if ($(first_card_clicked).find(".front").find("img").attr("src")  === 'images/hero01.png') {
                        audio = new Audio('sounds/priest.ogg');
                        audio.play();
                    } else if ($(first_card_clicked).find(".front").find("img").attr("src")  === 'images/hero02.png') {
                        audio = new Audio('sounds/warrior.ogg');
                        audio.play();
                    } else if ($(first_card_clicked).find(".front").find("img").attr("src")  === 'images/hero03.png') {
                        audio = new Audio('sounds/warlock.ogg');
                        audio.play();
                    } else if ($(first_card_clicked).find(".front").find("img").attr("src")  === 'images/hero04.png') {
                        audio = new Audio('sounds/mage.ogg');
                        audio.play();
                    } else if ($(first_card_clicked).find(".front").find("img").attr("src")  === 'images/hero05.png') {
                        audio = new Audio('sounds/druid.ogg');
                        audio.play();
                    } else if ($(first_card_clicked).find(".front").find("img").attr("src")  === 'images/hero06.png') {
                        audio = new Audio('sounds/hunter.ogg');
                        audio.play();
                    } else if ($(first_card_clicked).find(".front").find("img").attr("src")  === 'images/hero07.png') {
                        audio = new Audio('sounds/shaman.ogg');
                        audio.play();
                    } else if ($(first_card_clicked).find(".front").find("img").attr("src")  === 'images/hero08.png') {
                        audio = new Audio('sounds/paladin.ogg');
                        audio.play();
                    } else if ($(first_card_clicked).find(".front").find("img").attr("src")  === 'images/hero09.png') {
                        audio = new Audio('sounds/rogue.ogg');
                        audio.play();
                    }
                    if (match_counter === total_possible_matches) {
                        function winnerDelay () {
                            $("#game-area").find(".card-container").fadeOut();
                            var winDiv = $("<div>").text("YOU WIN!").addClass("winner");
                            $("#game-area").append(winDiv);
                            victory2 = new Audio('sounds/victory2.ogg');
                            victory3 = new Audio('sounds/victory3.ogg');
                            victory4 = new Audio('sounds/victory4.ogg');
                            victory2.play();
                            victory3.play();
                            victory4.play();
                        }
                        setTimeout(winnerDelay, 900);
                    }
                    first_card_clicked = null;
                    second_card_clicked = null;
                } else {
                    hideIn1Seconds();
                }
            }

            function hideIn1Seconds() {
                setTimeout(function () {
                    $(first_card_clicked).find(".back").show();
                    $(second_card_clicked).find(".back").show();
                    preventClick = true;
                    first_card_clicked = null;
                    second_card_clicked = null;
                }, 1000);
            }
            if (attempts > 0) {
                accuracy = (parseFloat(match_counter / attempts) * 100).toFixed(2) + "%";
                $(".accuracy .value").text(accuracy);
            }
        } else {
            var error = new Audio("sounds/error.ogg");
            error.play();
        }

    }
    function resetGame () {
        $("#game-area").find(".card-container").remove();
        first_card_clicked = null;
        second_card_clicked = null;
        preventClick = true;
        attempts = 0;
        match_counter = 0;
        accuracy = 0;
        console.log(match_counter);
        accuracy = 0;
        games_played++;
        $(".attempts .value").text(attempts);
        $(".accuracy .value").text(accuracy);
        $(".attempts .value").text(attempts);
        $(".games-played .value").text(games_played);
        createCardElements();
        $(".card").click(card_clicked).mouseenter(card_hover);
        $("#game-area .winner").fadeOut();
    }
};
