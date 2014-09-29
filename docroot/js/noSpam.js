$(function(){

  $('.mail-link').each(function(i){

    var protectedEmail = $(this).html();
    protectedEmail = protectedEmail.replace(" [at] ","@");
    protectedEmail = protectedEmail.replace(" [dot] ",".");

    $(this)
      .html(protectedEmail)
      .replaceWith("<a href=\"mailto:"+$(this).text()+"\">"+$(this).text()+"</a>");

  });

});