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
var backgroundMusic = ['background-music', 'background-music2', 'background-music3', 'background-music4'];
var randomSong = Math.floor(Math.random() * backgroundMusic.length);
var backgroundAudio = new Audio ('sounds/' + backgroundMusic[randomSong] + '.ogg');
backgroundAudio.loop = true;
backgroundAudio.play();
var backgroundAudioPlaying = true;
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
                var frontImage = $("<img>").addClass("hero").attr({
                    "src": "images/hero0" + i + ".png",
                    "draggable": "false"
                });
                front.append(frontImage);
                var back = $("<div>").addClass("back").addClass("hoverEffect").addClass("hidden");
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
    function createModal () {
        var modalDiv = $("<div>").addClass("modal fade").attr({
            id: "settingsModal",
            tabindex: "-1",
            role: "dialog",
            "aria-labelledby": "settingsModalLabel",
            "aria-hidden": "true"
        });
        var modalDialog = $("<div>").addClass("modal-dialog").attr("role", "document");
        var modalContent = $("<div>").addClass("modal-content");
        var modalHeader = $("<div>").addClass("modal-header");
        var modalTitle = $("<h5>").addClass("modal-title").attr("id", "settingsModalLabel").text("Settings");
        var modalButton = $("<button>").addClass("close").attr({
           type: "button",
           "data-dismiss": "modal",
           "aria-label": "Close"
        });
        var closeButton = $("<span>").attr("aria-hidden", "true").text("x");
        var modalBody = $("<div>").addClass("modal-body");
        var optionContainer = $("<div>").addClass("optionContainer");
        var volumeOption = $("<div>").addClass("option");
        var volumeTitle = $("<span>").text("Toggle music:");
        var volume = $("<i>").addClass("fa fa-volume-up sound").attr("aria-hidden", "true");
        var animationOption = $("<div>").addClass("option");
        var animationTitle = $("<span>").text("Toggle animations:");
        var animation = $("<input>").addClass("animation").attr({
            "type": "checkbox",
            name: "animation",
            "checked": "true"
        });
        modalDiv.append(modalDialog);
        modalDialog.append(modalContent);
        modalContent.append(modalHeader);
        modalHeader.append(modalTitle);
        modalHeader.append(modalButton);
        modalButton.append(closeButton);
        modalContent.append(modalBody);
        modalBody.append(optionContainer);
        volumeOption.append(volumeTitle);
        volumeOption.append(volume);
        animationOption.append(animationTitle);
        animationOption.append(animation);
        optionContainer.append(volumeOption);
        optionContainer.append(animationOption);
        $("#game-area").after(modalDiv);
    }
    createCardElements();
    createModal();
    $(".sound").click(toggleSound);
    function toggleSound () {
        if (backgroundAudioPlaying) {
            backgroundAudio.pause();
            backgroundAudioPlaying = false;
            $(".sound").removeClass("fa-volume-up").addClass("fa-volume-off");
        } else {
            backgroundAudio.play();
            backgroundAudioPlaying = true;
            $(".sound").removeClass("fa-volume-off").addClass("fa-volume-up");
        }
    }
    $(".animation").click(function() {
        if ($(".animation").val() === "on") {
            $(".animation").val("off");
            $(".back").removeClass("hoverEffect");
            $(".reset").removeClass("hoverEffect");
        } else {
            $(".animation").val("on");
            $(".back").addClass("hoverEffect");
            $(".reset").addClass("hoverEffect");
        }
    });
    setTimeout(function() {
        $(".back").removeClass("hidden");
    }, 1000);
    $(".card").click(card_clicked);
    $(".reset").click(resetGame);
    function card_clicked () {
        if($(this).find(".front").attr("clicked")) {
            return;
        }
        if (preventClick) {
            var cardFlipSound = new Audio("sounds/card-flip.ogg");
            cardFlipSound.play();
            preventClick = false;
            if (first_card_clicked === null) {
                first_card_clicked = this;
                $(first_card_clicked).find(".back").addClass("hidden");
                $(first_card_clicked).find(".front").attr("clicked", "true");
                preventClick = true;
            } else {
                second_card_clicked = this;
                $(second_card_clicked).find(".back").addClass("hidden");
                attempts++;
                $(".attempts .value").text(attempts);
                if ($(first_card_clicked).find(".front").find("img").attr("src") === $(second_card_clicked).find(".front").find("img").attr("src")) {
                    match_counter++;
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
                        setTimeout(winnerDelay, 1500);
                    }
                    $(first_card_clicked).fadeOut("slow");
                    $(second_card_clicked).fadeOut("slow");
                    first_card_clicked = null;
                    second_card_clicked = null;
                } else {
                    hideIn1Seconds();
                }
            }
            function hideIn1Seconds() {
                setTimeout(function () {
                    $(first_card_clicked).find(".back").removeClass("hidden");
                    $(second_card_clicked).find(".back").removeClass("hidden");
                    preventClick = true;
                    $(first_card_clicked).find(".front").removeAttr("clicked");
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
        accuracy = 0;
        games_played++;
        $(".attempts .value").text(attempts);
        $(".accuracy .value").text(accuracy);
        $(".attempts .value").text(attempts);
        $(".games-played .value").text(games_played);
        createCardElements();
        setTimeout(function() {
            $(".back").removeClass("hidden");
        }, 1000);
        $(".card").click(card_clicked);
        $("#game-area .winner").fadeOut();
        var reset = new Audio("sounds/reset.ogg");
        reset.play();
    }
};
