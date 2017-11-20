$(document).ready(function() {
    // open file picker when you click the input button
    $('#browse-button').click(function(){
        $("#file-input").click();
    });

    $('#file-input').change(function() {
        $('#selected-file').text($('#file-input')[0].files[0].name);
    });
});
