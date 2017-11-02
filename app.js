$(document).ready(initializeApp);
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var preventClick = true;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;

var audio;
var backgroundAudio = new Audio('sounds/background-music.ogg');
backgroundAudio.loop = true;
backgroundAudio.play();
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
                var backImage = $("<img>").addClass("legend").attr("src", "images/card-back-legend.jpg");
                back.append(backImage);
                card.append(front, back);
                cardArray.push(cardContainer);
            }
        }
        return cardArray;
    }
    console.log(createCardElements());

    $(".card").click(card_clicked);
    function card_clicked () {
        if (preventClick) {
            preventClick = false;

            if (first_card_clicked === null) {
                first_card_clicked = this;
                $(first_card_clicked).find(".back").hide();
                preventClick = true;
                if (preventClick) {
                    $(this).stopPropagation();
                }
            } else {
                second_card_clicked = this;
                $(second_card_clicked).find(".back").hide();
                attempts++;
                console.log("Attempts: " + attempts);
                if ($(first_card_clicked).find(".front").find("img").attr("src") === $(second_card_clicked).find(".front").find("img").attr("src")) {
                    match_counter++;
                    matches++;
                    console.log("Matches: " + matches);
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
                        $("#stats-container .game-info p").text("You win!");
                    }
                    first_card_clicked = null;
                    second_card_clicked = null;
                } else {
                    hideIn2Seconds();
                }
            }

            function hideIn2Seconds() {
                setTimeout(function () {
                    $(first_card_clicked).find(".back").show();
                    $(second_card_clicked).find(".back").show();
                    preventClick = true;
                    first_card_clicked = null;
                    second_card_clicked = null;
                }, 2000);
            }
        }

    }
};
