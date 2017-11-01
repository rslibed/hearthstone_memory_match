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
            return;
        } else {
            second_card_clicked = this;
            // if () {
            //
            // }
            return;
        }
    }
};