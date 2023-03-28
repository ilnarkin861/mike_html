$(document).ready(function(){

	const mobileMenu = document.getElementById('mobile-menu');

	document.getElementById('mobile-menu-button')
		.addEventListener('click', function(){
			document.body.classList.add('hidden');
			mobileMenu.classList.add('visible');
		});

	document.getElementById('menu-close-button')
		.addEventListener('click', function(){
			mobileMenu.classList.remove('visible');
			setTimeout(function(){ document.body.classList.remove('hidden') }, 300);
		});


	$(window).load(function(){ 
		progressOfSkills();
		stylizeServiceSlide();
	});

	$(window).scroll(function(){ 
		progressOfSkills();
	});	

	$('#services-carousel').slick({
        slidesToShow: 5,
		slideToScroll: 1,
		nextArrow: document.getElementById('services-carousel-next'),
        prevArrow: document.getElementById('services-carousel-prev'),
		centerMode: true,
		centerPadding: '0',
		speed: 100,
		asNavFor: '#service-details-slider',

		responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });


	$('#services-carousel').on('afterChange', function(event, slick, currentSlide){
		
		stylizeServiceSlide();
		
		let slides = $('#services-carousel .slide');
		let activeSlide = slides.parents('#services-carousel').find('.slick-center');
		slides.removeClass('active');
		activeSlide.addClass('active');	
	});

	$('#service-details-slider').slick({
		nextArrow: '',
        prevArrow: '',
		asNavFor: '#services-carousel',
		adaptiveHeight: true,
		fade: true,
  		cssEase: 'linear',
    });

	$('#review-slider').slick({
		nextArrow: document.getElementById('reviews-slider-next'),
        prevArrow: document.getElementById('reviews-slider-prev'),
	});


	let $grid = $('#recent-projects').isotope({
		itemSelector: '.project',
	});

	$('#works .filter-sort ul li a').on('click', function (e){
		e.preventDefault();
		let filterData = $(this).data('filter');
		$(this).parents('li').parents('ul').find('a').removeClass('active');
		$(this).addClass('active');
		$grid.isotope({ filter: filterData });	
	});


	new WOW().init();


	let progressCompleted = false;

	function progressOfSkills(){
		
		if(!progressCompleted){

			let skillsSection = $('#skills-progress');
			
			if(skillsSection.offset().top - 200 <= $(window).scrollTop()){
				
				let skills = skillsSection.find('.skill');

				skills.each(function (){
					let width = $(this).data('width');
					let percent = $(this).data('percent');
					let inner = $(this).find('.inner');

					inner.animate({
						width: width + '%',
						
					}, 1000, function (){
						$(this).addClass('completed');
						$(this).find('.percent').text(percent + "%");
					});
				});

				progressCompleted = true;
			}
		}
	}

	function stylizeServiceSlide(){
		let slides = $('#services-carousel .slide');
		let activeSlide = slides.parents('#services-carousel').find('.slick-center');
		slides.removeClass('sibling');
		activeSlide.prev().addClass('sibling').addClass('left');
		activeSlide.next().addClass('sibling').addClass('right');
	}
});