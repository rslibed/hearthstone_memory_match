$(document).ready(initializeApp);
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var preventClick = true;
function initializeApp () {
    $(".card").click(card_clicked);
    function card_clicked () {
        if (preventClick) {
            preventClick = false;

            if (first_card_clicked === null) {
                first_card_clicked = this;
                $(first_card_clicked).find(".back").hide();
                preventClick = true;
            } else {
                second_card_clicked = this;
                $(second_card_clicked).find(".back").hide();
                if ($(first_card_clicked).find(".front").find("img").attr("src") === $(second_card_clicked).find(".front").find("img").attr("src")) {
                    match_counter++;
                    preventClick = true;
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