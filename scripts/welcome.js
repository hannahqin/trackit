$(document).ready(function() {
<<<<<<< HEAD
    $('#down-arrow').click(function() {
        window.smoothScroll(1000, 1000);
    })

=======
    // File Picker
>>>>>>> 89aef29d7c47be99259b173776b0616bedfbd0b2
    // open file picker when you click the input button
    $('#browse-button').click(function() {
        $("#file-input").click();
    });
    $('#file-input').change(function() {
        $('#selected-file').text($('#file-input')[0].files[0].name);
    });

    // Generate My Report Button
    $('.generate-button').click(function() {
        window.location.href = './overview.html';
    });
});
