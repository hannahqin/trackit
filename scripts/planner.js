$(document).ready(function() {
    $('.main-content').css('visibility', 'visible');

    $('#add-course-modal').on('click', '#plus-req-btn', function() {
        $(this).before('<input class="req-input body-input" type="text" size="8" name="req-1" placeholder="SS">');
    });

    $('#cancel-add-course-btn').click(resetReqInputsOnModal);
    $('#approve-add-course-btn').click(resetReqInputsOnModal);
});

function resetReqInputsOnModal() {
    $('#add-course-modal .reqs-section').empty();
    $('#add-course-modal .reqs-section').append('<input class="req-input body-input" type="text" size="8" name="req-1" placeholder="SS">');
    $('#add-course-modal .reqs-section').append('<span id="plus-req-btn" class="glyphicon glyphicon-plus"></span>');
}