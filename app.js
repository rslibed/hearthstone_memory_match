$(document).ready(initializeApp);
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;
function initializeApp () {
    $(".card").click(card_clicked);
    function card_clicked () {
        var firstImageSrc;
        var secondImageSrc;
        if (first_card_clicked === null) {
            first_card_clicked = this;
            $(first_card_clicked).find(".back").hide();
        } else {
            second_card_clicked = this;
            $(second_card_clicked).find(".back").hide();
            firstImageSrc = $(first_card_clicked).find(".front").find("img").attr("src");
            secondImageSrc = $(second_card_clicked).find(".front").find("img").attr("src");
            if (firstImageSrc === secondImageSrc) {
                match_counter++;
            } else {
                function hideIn2Seconds () {
                    $(first_card_clicked).find(".back").hide();
                    $(second_card_clicked).find(".back").hide();
                }
                setTimeout(hideIn2Seconds, 2000);
            }
            first_card_clicked = null;
            second_card_clicked = null;
            firstImageSrc = null;
            secondImageSrc = null;
        }
    }
};