$(document).ready(initializeApp);
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;
function initializeApp () {
    $(".card").click(card_clicked);

    function card_clicked () {
        if (first_card_clicked === null) {
            first_card_clicked = this;
            $(first_card_clicked).find(".back").hide();
        } else {
            second_card_clicked = this;
            $(second_card_clicked).find(".back").hide();
            if ($(first_card_clicked).find(".front").find("img").attr("src") === $(second_card_clicked).find(".front").find("img").attr("src")) {
                match_counter++;
            } else {
                function hideIn2Seconds () {
                    $(first_card_clicked).find(".back").show();
                    $(second_card_clicked).find(".back").show();
                    first_card_clicked = null;
                    second_card_clicked = null;
                }
                setTimeout(hideIn2Seconds, 2000);
            }
        }
    }
};