
$(document).ready(function(){

        $('#leftMenu').addClass('js');
        $('#corps').addClass('js');

        $('#portfolio, #stuff, #about, #contact').addClass('hide');

//fade d'une couleurs suivant le lien survolé


        $('#mainPortfolio, #leftPortfolio').hover(function(){
		$(this).stop().animate({color:'#FD3F92'}, 300);
		},function(){
		$(this).stop().not(".visited").animate({color:'#312c32'}, 500);
        });
        
        $('#mainStuff, #leftStuff').hover(function(){
		$(this).stop().animate({color :'#FD3F92'}, 300);
		},function(){
		$(this).stop().not(".visited").animate({color:'#312c32'}, 500);
        });
        $('#mainAbout, #leftAbout').hover(function(){
		$(this).stop().animate({color :'#FD3F92'}, 300);
		},function(){
		$(this).stop().not(".visited").animate({color:'#312c32'}, 500);
        });
        $('#mainContact, #leftContact').hover(function(){
		$(this).stop().animate({color :'#FD3F92'}, 300);
		},function(){
		$(this).stop().not(".visited").animate({color:'#312c32'}, 500);
        });


//apparition du contenu dans sa div au click sur le MAIN lien
        
        $('#mainMenu a').live('click', function(e){
            e.preventDefault();
            if($(this).is('#mainPortfolio')) {
                $('#leftPortfolio').addClass('visited');
                $('#portfolio').removeClass('hide');
            }else if ($(this).is('#mainStuff')){
                $('#leftStuff').addClass('visited');
                $('#stuff').removeClass('hide');
            }else if ($(this).is('#mainAbout')){
                $('#leftAbout').addClass('visited');
                $('#about').removeClass('hide');
            }else if ($(this).is('#mainContact')){
                $('#leftContact').addClass('visited');
                $('#contact').removeClass('hide');
            }
        });


//slide du content au click sur le main lien

        $('#mainMenu a').live('click', function(e){
            e.preventDefault();
            //document.getElementsByName(ths.hash).innerHTML = open;
            $('#mainMenu').stop().animate({
                'width': 0
            }, 800);
            

            $('#content').stop().animate({
                marginLeft:0
            }, 800, function() {
                 $('#mainMenu').hide();
                 $('#content').addClass('js')
                              .animate({marginLeft: 130}
                              , 400);
                 $('#leftMenu').stop().animate({'width':130}, 400);

                     $("#leftMenu .nav a").live('click', function (e) {
                        e.preventDefault();
                        //sauvegarde de la cible
                        var ths = this;

                        $('#leftMenu .nav a').removeClass('visited').stop().animate({color:'#312c32'}, 500);
                        $(ths).addClass('visited').stop().animate({color:'#FD3F92'}, 300);
                        
                      if ($(ths.hash).hasClass('hide')){
                        $('#content').stop().animate({
                                    "marginLeft": "958px"
                            }, function () {
                                $("#content>div").addClass('hide');
                                $(ths.hash).removeClass('hide');

                                $(ths.hash).stop().animate({
                                "marginLeft": "0"
                               }, 800, function() {
                                    
                               $('#content').stop().animate({marginLeft: 130}, 400);

                            });
                        });
                        }
                        
                    });
                 $('#leftMenu').css({'position':'fixed'});
                
                

            });
        });


//affichage du travail agrandi et slide

/*
        $('#portfolio .galleryRight').addClass('hide');
		$('#stuff .galleryRight').addClass('hide');
*/
        $('#portfolio a.agrandir').bind('click', function(){
                        
                    var url= $(this).attr('href');
                    $('#portfolio .preview').load(url, function(){
                        $('#portfolio .galleryRight').removeClass('hide');
                        $(this).hide().show('normal');
                        $('#portfolioWrap').animate({marginLeft: -780});
                        
                    });
                    return false;
        });

		 $('.galleryRight img, .galleryRight .back-btn').live('click', function(e){
		    e.preventDefault();
            $('#portfolioWrap').animate({marginLeft: 0});
            $('#portfolio .galleryRight').addClass('hide');
			$('#stuffWrap').animate({marginLeft: 0});
            $('#stuff .galleryRight').addClass('hide');
        });        

        $('#stuff a.agrandir').bind('click', function(){

                    var url= $(this).attr('href');
                    $('#stuff .preview').load(url, function(){
                        $('#stuff .galleryRight').removeClass('hide');
                        $(this).hide().show('normal');
                        $('#stuffWrap').animate({marginLeft: -780});
                        $('.galleyRight a').removeClass('hide');
                    });
                    return false;
        });
        
/*		$('.galleryRight img, .galleryRight .back-btn').live('click', function(e){
			e.preventDefault();
        });
*/
//contactform source - ALEXANDRE PLENNEVAUX WWW.PIXELINE.BE - Brent R. Matzelle

$(function() {
  $('.error').hide();
  var doneOnce = false;
  $(".button").click(function() {

    $('.error').hide();
      var name = $("#name").val();
        if (name == "Mister X") {
        $('#nameError').show().focus();
      return false;
    }
        var address = $("#address").val();
        if (address == "misterx@mail.com") {
        $('#addressError').show().focus();
      return false;
    }
        var message = $("#message").val();
        if (message == "Dear Raphaël, I love you so much but I don\'t know how to tell you.") {
        $('#messageError').show().focus();
      return false;
    }

	var dataString = 'name='+ name + '&address=' + address + '&message=' + message;
	//alert (dataString);return false;
	$.ajax({
	  type: "POST",
	  url: "contactForm.php",
	  data: dataString,
	  success: function() {
              $('#result').html("<p>Thank you! You will have a response very soon, I promise.</p>").fadeIn("slow");
	  }
	});
	return false;

  });
});

// Konami Code

        if(addEventListener){var kkeys=[],konami="38,38,40,40,37,39,37,39,66,65";
            addEventListener("keydown",function(e){kkeys.push(e.keyCode);
                if(kkeys.toString().indexOf(konami)>=0){
                    $('#konamicat').removeClass('hide');
                    }},true);
        }
        $('#konamicat').live('click', function(){
                    $('#konamicat').addClass('hide');
                    kkeys = 0;
        });

// Background selector

    repeat = 1;
    $(".bkgselector").bind('click',function (e) {
         e.preventDefault();
         images = ['url(img/bg4.gif) repeat-x', 'url(img/bg3.gif) repeat', 'url(img/bg2.gif) repeat',
             'url(img/bg1.gif) repeat', 'url(img/top1.gif) repeat-x'];
         randomNumber = Math.round(Math.random() * (images.length-1));
            
            if (randomNumber == repeat){
                if (randomNumber != 0){
                    randomNumber = repeat-1;
                }else {
                    randomNumber = repeat+1;
                }
            }
                repeat = randomNumber;
         $('body').removeClass('topline');
         $('body').css('background', images[randomNumber]);
    });
    
    
}); // end