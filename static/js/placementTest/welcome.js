/**
 * Created by Simon on 2016/4/26.
 */

$(document).ready(function(){
   $("#btnStart a").click(startTest);

});

function startTest(){

    var testId = $("#testId").val();
    var interfaceLanguage = $("#interfaceLanguage").val();

    window.location = window.location.toString().replace('welcome', 'run');

}