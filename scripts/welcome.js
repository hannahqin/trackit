// Referenced https://marcbruederlin.github.io/particles.js/

$(document).ready(function() {
    Particles.init({
        selector: '.background',
        connectParticles: true,
        maxParticles: 50,
        minDistance: 170,
        color: '#e0e0e0'
    });

    $('#down-arrow').click(function() {
        window.smoothScroll(1000, 1000);
    })

    // File Picker
    // open file picker when you click the input button
    $('#browse-button').click(function() {
        $("#file-input").click();
    });
    $('#file-input').change(function() {
        $('#selected-file').text($('#file-input')[0].files[0].name);
    });
});
