$.fn.weatherCarousel = function() {
	var container = $(this);
	container.find('.first').click(function(){
		container.find('.navigator').children().removeClass('active');
		container.find('#weatherTable').animate({left: '0'}, 500);
		container.find('.first').addClass('active');
    });
    container.find('.second').click(function(){
    	container.find('.navigator').children().removeClass('active');
		container.find('#weatherTable').animate({left: '-99.9%'}, 500);
		container.find('.second').addClass('active');
    });
    container.find('.third').click(function(){
    	container.find('.navigator').children().removeClass('active');
		container.find('#weatherTable').animate({left: '-200%'}, 500);
		container.find('.third').addClass('active');
    });
};