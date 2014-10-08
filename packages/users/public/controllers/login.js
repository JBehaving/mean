/**
 * Created by Cody on 10/7/2014.
 */
$(document).ready(function() {
    $('#olvidado').click(function(e) {
        e.preventDefault();
        $('div#form-olvidado').toggle('500');
    });
    $('#acceso').click(function(e) {
        e.preventDefault();
        $('div#form-olvidado').toggle('500');
    });
});