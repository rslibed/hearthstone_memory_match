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
var backgroundAudio = new Audio('sounds/' + backgroundMusic[randomSong] + '.ogg');
backgroundAudio.loop = true;
backgroundAudio.play();
var backgroundAudioPlaying = true;
var victory2;
var victory3;
var victory4;
function initializeApp() {
    function createCardElements() {
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
                var back = $("<div>").addClass("back").addClass("hoverEffect").addClass("backface").addClass("hidden");
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
    function settingsModal() {
        var modalDiv = $("<div>").addClass("modal fade").attr({
            id: "settingsModal",
            tabindex: "-1",
            role: "dialog",
            "aria-labelledby": "settingsModalLabel",
            "aria-hidden": "true"
        });
        var modalDialog = $("<div>").addClass("modal-dialog").attr("role", "document");
        var modalContent = $("<div>").addClass("modal-content").addClass("settings-content");
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
            type: "checkbox",
            name: "animation",
            checked: "true"
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
    function winModal () {
        var winDiv = $("<div>").addClass("modal fade").attr({
            id: "winModal",
            tabindex: "-1",
            role: "dialog",
            "aria-labelledby": "winModalLabel",
            "aria-hidden": "true"
        });
        var winDialog = $("<div>").addClass("modal-dialog").attr("role", "document");
        var winContent = $("<div>").addClass("modal-content").addClass("win-content");
        var winHeader = $("<div>").addClass("modal-header").addClass("win-header");
        var winTitle = $("<h5>").addClass("modal-title").attr("id", "winModalLabel").text("Winner!");
        var winButton = $("<button>").addClass("close");
        var winBody = $("<div>").addClass("modal-body");
        var winningStats = $("<div>").addClass("winningStats");
        var winAttempts = $("<div>").addClass("win-attempts");
        var winAttemptsLabel = $("<h5>").text("Attempts");
        var winAttemptsValue = $("<div>").addClass("win-attempts-value");
        var winAccuracy = $("<div>").addClass("win-accuracy");
        var winAccuracyLabel = $("<h5>").text("Accuracy");
        var winAccuracyValue = $("<div>").addClass("win-accuracy-value");
        var playAgain = $("<button>").addClass("play-reset").addClass("hoverEffect").attr({
                type: "button",
                "data-dismiss": "modal",
                "aria-label": "Close"
        }).text("Play Again");
        winDiv.append(winDialog);
        winDialog.append(winContent);
        winContent.append(winHeader);
        winHeader.append(winTitle);
        winHeader.append(winButton);
        winContent.append(winBody);
        winAttempts.append(winAttemptsLabel);
        winAttempts.append(winAttemptsValue);
        winAccuracy.append(winAccuracyLabel);
        winAccuracy.append(winAccuracyValue);
        winningStats.append(winAttempts);
        winningStats.append(winAccuracy);
        winBody.append(winningStats);
        winBody.append(playAgain);
        $("#game-area").after(winDiv);
        $(".play-reset").click(resetGame);
    }
    function toggleSound() {
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
    function card_clicked() {
        if ($(this).find(".front").attr("clicked")) {
            return;
        }
        if (preventClick) {
            var cardFlipSound = new Audio("sounds/card-flip.ogg");
            cardFlipSound.play();
            preventClick = false;
            if (first_card_clicked === null) {
                first_card_clicked = this;
                $(first_card_clicked).addClass("flip");
                $(first_card_clicked).find(".front").attr("clicked", "true");
                preventClick = true;
            } else {
                second_card_clicked = this;
                $(second_card_clicked).addClass("flip");
                attempts++;
                $(".attempts .value").text(attempts);
                $(".win-attempts-value").text(attempts);
                if ($(first_card_clicked).find(".front").find("img").attr("src") === $(second_card_clicked).find(".front").find("img").attr("src")) {
                    match_counter++;
                    preventClick = false;
                    if ($(first_card_clicked).find(".front").find("img").attr("src") === 'images/hero01.png') {
                        audio = new Audio('sounds/priest.ogg');
                        audio.play();
                    } else if ($(first_card_clicked).find(".front").find("img").attr("src") === 'images/hero02.png') {
                        audio = new Audio('sounds/warrior.ogg');
                        audio.play();
                    } else if ($(first_card_clicked).find(".front").find("img").attr("src") === 'images/hero03.png') {
                        audio = new Audio('sounds/warlock.ogg');
                        audio.play();
                    } else if ($(first_card_clicked).find(".front").find("img").attr("src") === 'images/hero04.png') {
                        audio = new Audio('sounds/mage.ogg');
                        audio.play();
                    } else if ($(first_card_clicked).find(".front").find("img").attr("src") === 'images/hero05.png') {
                        audio = new Audio('sounds/druid.ogg');
                        audio.play();
                    } else if ($(first_card_clicked).find(".front").find("img").attr("src") === 'images/hero06.png') {
                        audio = new Audio('sounds/hunter.ogg');
                        audio.play();
                    } else if ($(first_card_clicked).find(".front").find("img").attr("src") === 'images/hero07.png') {
                        audio = new Audio('sounds/shaman.ogg');
                        audio.play();
                    } else if ($(first_card_clicked).find(".front").find("img").attr("src") === 'images/hero08.png') {
                        audio = new Audio('sounds/paladin.ogg');
                        audio.play();
                    } else if ($(first_card_clicked).find(".front").find("img").attr("src") === 'images/hero09.png') {
                        audio = new Audio('sounds/rogue.ogg');
                        audio.play();
                    }
                    if (match_counter === total_possible_matches) {
                        function winnerDelay() {
                            $("#game-area").find(".card-container").fadeOut();
                            $("#winModal").modal("toggle");
                            victory2 = new Audio('sounds/victory2.ogg');
                            victory3 = new Audio('sounds/victory3.ogg');
                            victory4 = new Audio('sounds/victory4.ogg');
                            victory2.play();
                            victory3.play();
                            victory4.play();
                        }

                        setTimeout(winnerDelay, 1500);
                    }
                    setTimeout(function cardsMatched () {
                        $(first_card_clicked).find(".back").hide();
                        $(second_card_clicked).find(".back").hide();
                        $(first_card_clicked).find(".front").fadeOut("slow");
                        $(second_card_clicked).find(".front").fadeOut("slow");
                        preventClick = true;
                        first_card_clicked = null;
                        second_card_clicked = null;
                    }, 1000);
                } else {
                    hideIn1Seconds();
                }
            }

            function hideIn1Seconds() {
                setTimeout(function () {
                    // $(first_card_clicked).find(".back").removeClass("hidden");
                    // $(second_card_clicked).find(".back").removeClass("hidden");
                    $(first_card_clicked).removeClass("flip");
                    $(second_card_clicked).removeClass("flip");
                    preventClick = true;
                    $(first_card_clicked).find(".front").removeAttr("clicked");
                    first_card_clicked = null;
                    second_card_clicked = null;
                }, 1000);
            }

            if (attempts > 0) {
                accuracy = (parseFloat(match_counter / attempts) * 100).toFixed(2) + "%";
                $(".accuracy .value").text(accuracy);
                $(".win-accuracy-value").text(accuracy);
            }
        } else {
            var error = new Audio("sounds/error.ogg");
            error.play();
        }

    }
    function resetGame() {
        $("#game-area").find(".card-container").remove();
        first_card_clicked = null;
        second_card_clicked = null;
        preventClick = true;
        attempts = 0;
        match_counter = 0;
        accuracy = 0;
        accuracy = 0;
        games_played++;
        $(".accuracy .value").text(accuracy);
        $(".attempts .value").text(attempts);
        $(".games-played .value").text(games_played);
        createCardElements();

        $(".front").removeClass("backface");
        setTimeout(function () {
            $(".back").removeClass("hidden");
            $(".front").addClass("backface").css("transform", "rotateY(180deg)");
        }, 1000);
        $(".card").click(card_clicked);
        $("#game-area .winner").fadeOut();
        var reset = new Audio("sounds/reset.ogg");
        reset.play();
    }
    createCardElements();
    settingsModal();
    winModal();
    setTimeout(function () {
        $(".back").removeClass("hidden");
        $(".front").addClass("backface").css("transform", "rotateY(180deg)");
    }, 1000);
    $(".sound").click(toggleSound);
    $(".animation").click(function () {
        if ($(".animation").val() === "on") {
            $(".animation").val("off");
            $(".back").removeClass("hoverEffect");
            $(".reset").removeClass("hoverEffect");
            $(".play-reset").removeClass("hoverEffect");
        } else {
            $(".animation").val("on");
            $(".back").addClass("hoverEffect");
            $(".reset").addClass("hoverEffect");
            $(".play-reset").addClass("hoverEffect");
        }
    });
    $(".card").click(card_clicked);
    $(".reset").click(resetGame);
};
