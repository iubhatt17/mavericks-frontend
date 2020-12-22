/* ============= Navwhite =========*/

$(window).scroll(function () {
	var scroll = $(window).scrollTop();
	if (scroll > '20') {
		$('.navbar-light').addClass('nav-white');
	} else if (scroll < '20') {
		$('.navbar-light').removeClass('nav-white');
	}
});
$(document).ready(function () {
	var scroll = $(window).scrollTop();
	if (scroll > '20') {
		$('.navbar-light').addClass('nav-white');
	} else if (scroll < '20') {
		$('.navbar-light').removeClass('nav-white');
	}
});
/* ============= Page ScrollSpy =========*/
$(document).ready(function () {
	'use strict';
	$(window).on('load', function () {
		$('body').scrollspy({
			target: '#nav-main',
			offset: 70
		});
	});
	$('.page-scroll').on('click', function (event) {
		var $anchor = $(this);
		if ($(window).width() > 768) {
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top - 65
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		} else {

			if ($(window).width() < 768) {
				$(".navbar-toggler").on('click');
				$('html, body').stop().animate({
					scrollTop: $($anchor.attr('href')).offset().top - 50
				}, 1500, 'easeInOutExpo');

				event.preventDefault();
			}
		}

	});

});

/*============== slider ==================*/
$(document).ready(function () {
	$('.slider').slick('slickGoTo', 0);
});
$(".team-slider-one").click(function () {
	if ($(this).attr("data-slick-index") < -1) {
		$(this).parents(".slider").slick('slickGoTo', $(".team-slider").slick("getSlick").slideCount - Math.abs($(this).attr("data-slick-index")));
	} else {
		$(this).parents(".slider").slick('slickGoTo', $(this).attr("data-slick-index"));
	}
});
$('.slider').on('afterChange', function (event, slick, currentSlide, direction) {
	$(this).parents(".team-container").find('.team-data').find('.active').removeClass('active');
	var i = (currentSlide ? currentSlide : 0) + 1;
	$($(this).parents(".team-container").find('.team-data li:nth-child(' + i + ')').addClass('active')).animate({
		opacity: 0
	}, 0, function () {
		$(this).animate({
			opacity: 1
		}, 2000, function () {
			// Animation complete.
		});
	});
});
$('.team-slider').slick({
	dots: false,
	infinite: true,
	speed: 1000,
	slidesToShow: 1.5,
	prevArrow: $(".slick-arrow-left"),
	nextArrow: $(".slick-arrow-right"),
	centerMode: false,
	centerPadding: '0px',

	responsive: [{
			breakpoint: 1500,
			settings: {
				slidesToShow: 1.5
			}
		},
		{
			breakpoint: 1025,
			settings: {
				slidesToShow: 1
			}
		},

	]
});
/*============LightBox Effect===========*/
$(document).ready(function () {
	'use strict';
	$('.lightgallery').lightGallery({
		pager: true,
		download: false,
		actualSize: false,
		share: false
	});
});

/**================= AJAX API Calls =============== */
$(document).ready(function() {
	var settings = {
		"url": "https://maverick-laravel.herokuapp.com/gallery",
		"method": "GET",
		headers: {
        },
		crossDomain: true
	};

	$.ajax(settings).done(function (response) {
		console.log(response);
	});

})