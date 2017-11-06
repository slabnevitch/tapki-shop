$(function() {


	$(".toggle-mnu").click(function() {
		$(this).toggleClass("on");
		$('.header__top-inner nav').toggleClass('nav-visible');
		return false;
	});

	$('.product-menu__label').click(function() {
		$('.products-menu__inner nav').fadeToggle();
		// $('.header__top-inner nav').fadeToggle();
	});

	 

 	// Accordeon-----------------------------------
		$('.acordeon-link').click(function(e) {
			e.preventDefault();
			var $currentItem = $(this).closest('.acordeon-item');
			if($currentItem.hasClass('acordeon-item-with-sublist')){

				$currentItem.find('.acordeon-sublist')
				.stop(true, true)
				.slideToggle();
				// $currentItem.siblings()
				// .find('.acordeon-sublist')
				// .stop(true, true)
				// .slideUp();
				
				$currentItem.toggleClass('acordeon-item-active');

			}else{
				return;
			}
		});
// end Accordeon-----------------------------------

	$('.sort-list').dropdown({
				toggleText: 'Новинки', //текст в главном поле, по умолчанию
				autoToggle: true,
				autoToggleHTML: true,
				margin: 0,
				autoResize: 0,
				titleText: '',
				collision: false,
				maxSelect: 10
			});

// noUiSlider
	var format = wNumb({
		thousand: ' '
	});
	
	if($('.price-slider').length > 0){

		var skipSlider = document.querySelector('.price-slider');
		
			noUiSlider.create(skipSlider, {
			 start: [500, 5200],//стартовые позиции ползунков, в зависимости от их количества
		    connect: true, //участки шкалы, окрашенные и неокрашенные пользовательскими цветами
		    range: {
		    	'min': 500,

		    	'max': 10000
		    }
		    // snap: true, //разрешаем несколько ползунков
		    
		});

		skipSlider.noUiSlider.on('update', function(){
			var lowField = document.querySelector('.price-values__min'),
			hightField = document.querySelector('.price-values__max'),
			minVal = Math.floor(skipSlider.noUiSlider.get()[0]),
			maxVal = Math.floor(skipSlider.noUiSlider.get()[1]),
			minValBit = format.to(minVal),
			maxValBit = format.to(maxVal);

			lowField.value = minValBit;
			hightField.value = maxValBit;
		});
	
		function noUISliderHandlers(){

			var inputValues = [skipSlider.noUiSlider.get()[0], skipSlider.noUiSlider.get()[1]],
				__self = this;

			this.init = function() {

				this.listeners();
			},

			this.listeners = function() {
				// $('.price-values input').on('keydown', this.focus);
				$('.price-values input').on('change', this.changer);
			},

			this.changer = function() {
				var $th = $(this);

				
				console.log($th.val());
				if($th.attr('class') == 'price-values__min'){
					inputValues[0] = $th.val();
					console.log(inputValues);
				}
				if($th.attr('class') == 'price-values__max'){
					inputValues[1] = $th.val();
					console.log(inputValues);
				}

				__self.uiSliderTranslate(inputValues);
			},

			this.valuesTranslate = function(valuesBefore) {
				var valuesAfter = [];
				valuesBefore.forEach(function(item, i) {

					valuesAfter.push(format.to(Math.floor(item)));
				});
				
				this.uiSliderTranslate(valuesAfter);
			},

			this.uiSliderTranslate = function(valuesAfter) {
				
				skipSlider.noUiSlider.set([valuesAfter[0], valuesAfter[1]]);
			}
		}

		var sliderInputsControl = new noUISliderHandlers;
		sliderInputsControl.init();
	}

	 function Filter() {

		var inputs = document.querySelectorAll('.price-values input'),
			__self = this;
		this.init = function() {
			console.log(inputs.length);
			this.regListeners();
		},
		this.regListeners = function() {

			$('aside input[type="checkbox"]').on('change', this.checkControl);
			$('.select-results .select-results__item .select-results__item-close').on('click', this.resultDeleter);
			$('aside .filter__color-wrap').on('click', this.colorsSelection);
			$('.filter-clear').on('click', this.clearFilters);
		},
		this.checkControl =function(e) {
			var $th = $(this),
					innerText = $th.closest('label').find('.check-text').text();

			console.log($(this));
			if($(e.target).is(':checked')){
				__self.checkboxResultsRender(innerText);
			}else{
				__self.selectResultsDeleter(innerText);
			}
		},

		this.checkboxResultsRender = function(text) {

			var $newResultElem = $('<span>', {
				text: text,
				class: 'select-results__item',
				append: $('<img>', {
					src: 'img/icons/del.png',
					class: 'select-results__item-close',
					alt: 'alt',
					on: {
						click: this.resultDeleter
					}
				})
			});

			this.filterResultsRender($newResultElem);
		},

		this.filterResultsRender = function(itemToAppend) {
			
			$('.select-results').append(itemToAppend);
		}

		this.selectResultsDeleter = function(text) {
			var $contResults = $('.select-results'),
					$results = $('.select-results__item');

			$results.each(function(i, item) {
				var $elem = $(item);

				if(text == $elem.text()){
					$elem.remove();
				}
			});
		},

		this.resultDeleter = function(e) {
			var $selectedItem = $(e.target).parent(),
				 identifier = $selectedItem.text();
	
			$(e.target).parent().remove();

			__self.checkboxReseter(identifier);

			if($selectedItem.hasClass("select-results__item-color")){
				var colorClass = $selectedItem.find('.filter__color-wrap span').attr('class');

				__self.colorsReseter(colorClass);
			}
		},

		this.checkboxReseter = function(currentCheckbox) {
			$('aside input[type="checkbox"]').each(function(i, elem) {
				var $item = $(elem);

				if($item.parent().find('.check-text').text() == currentCheckbox){
					$item.prop('checked', false);
				}
			});
		},

		this.colorsReseter = function(currentClass) {
			var $colors = $('.filter__color-wrap span');

			$colors.each(function(i, elem) {
				if($(elem).attr('class') == currentClass){
					$(elem).parent().removeClass('filter__color-wrap--active');
				}
			});
		}

		this.colorsSelection = function(e) {
			var $colorTarget = $(e.target),
					colorName = $colorTarget.attr('class');
			// console.log(colorName);
			if($('.select-results__item .filter__color-wrap span').filter('.' + colorName).length > 0){
				console.log('bigger then null');
				return;
			}
			$colorTarget.parent().toggleClass('filter__color-wrap--active');

			__self.colorsResultsRender(colorName);
		},

		this.colorsResultsRender = function(colorName) {
			// alert($('.select-results__item .filter__color-wrap span').filter('.' + colorName).length);
			
			var $newColorElem = $('<span>', {
				class:'select-results__item select-results__item-color',
				append: $('<span>', {
					
					class: 'filter__color-wrap',
					append: $('<span>', {
					
					class: colorName,

					})
				}).add('<img>', {
					src: 'img/icons/del.png',
					class: 'select-results__item-close',
					alt: 'alt',
					on: {
						click: this.resultDeleter
					}
				})
			});

			this.filterResultsRender($newColorElem);
		},

		this.clearFilters = function() {
			$('aside input[type="checkbox"]').prop('checked', false);
			$('.filter__color-wrap').removeClass('filter__color-wrap--active');
			$('.select-results__item').remove();
		}

	}

	var inputControls = new Filter;
	inputControls.init();

	// 
// end of noUiSlider
 	var prodGammaSlider = document.querySelectorAll('.new-product .gamma-siema'),
 			salesGammaSlider = document.querySelectorAll('.prod-siema-sales .gamma-siema');

 	var $newProd = $('.new-product');
 	if($newProd.length > 0){
	 	var prodTop = $newProd.offset().top,
				lastScrollTop = 0;
 		
 	}
 	
			
		$(window).scroll(function() {
			var scrollTop = $(document).scrollTop();

			if(scrollTop > lastScrollTop){
				
				if(scrollTop > prodTop - 500){

					var $prodSlider = $('.prod-siema').owlCarousel({
						items: 1,
						loop: true,
						nav: true,
						navText: [],
						mouseDrag: false,
						responsiveClass: true,
						// autoplay: true,
						autoplayHoverPause: true
						// lazyLoad: true
					});
					
					$('.prod-siema-nav .prod-siema-prev').click(function() {
						$prodSlider.trigger('prev.owl.carousel');
					});

					$('.prod-siema-nav .prod-siema-next').click(function() {
						$prodSlider.trigger('next.owl.carousel');
					});

					var	salesTop = $('.sales').offset().top;
						gammaSliderCreate(prodGammaSlider);
				}

				if(scrollTop > salesTop - 500){

					var $salesSlider = $('.prod-siema-sales').owlCarousel({
						items: 1,
						loop: true,
						nav: true,
						navText: [],
						mouseDrag: false,
						responsiveClass: true,
						autoplay: true,
						autoplayHoverPause: true,
						// lazyLoad: true
					});

					$('.prod-siema-nav--sales .prod-siema-prev').click(function() {
						$salesSlider.trigger('prev.owl.carousel');
					});

					$('.prod-siema-nav--sales .prod-siema-next').click(function() {
						$salesSlider.trigger('next.owl.carousel');
					});

					gammaSliderCreate(salesGammaSlider);
				}
				
			}else if(scrollTop < lastScrollTop){
				
			}
			lastScrollTop = scrollTop;
		});

 
	 function gammaSliderCreate(selector) {

	 	setTimeout(function() {
			
		 for(var i=0; i<selector.length; i++){
		 	var gammaCar = $(selector[i]).owlCarousel({
				items: 7,
				loop: true,
				nav: true,
				navText: [],
				responsiveClass: true,
				lazyLoad: true,
				onInitialized: cycleOwlInited,
				responsive:{
					0:{
						// items:1,
						nav:true,
						
					},
					480:{
						items:7,
						nav:true
						
					},
					560:{
						items:4,
						nav:true
						
					},
					700:{
						// items:5,
						nav:true
					},

					800:{
						items:7,
						nav:true
					},
					992:{
						// items:5,
						nav:true,
						
					},
					1140:{
						// items:6,
						nav:true,
						
					}
				}
			});


		 }

					}, 500);
	 }

	 function cycleOwlInited(event) {
	 	var $preloader = $(event.target).parent().find('.gamma-preloader');
	 	$preloader.fadeOut(function() {
	 		$(event.target).fadeIn();
	 	});

	 }
	 
	 // Owl
		var $logoSlider = $('.logo-slider').owlCarousel({
			items: 8,
			loop: true,
			nav: true,
			navText: [],
			autoPlay: true,
			responsiveClass: true,
			responsive:{
				0:{
					items:1,
					nav:true,
					
				},
				480:{
					items:3,
					nav:true
					
				},
				768:{
					items:4,
					nav:true
				},

				800:{
					items:4,
					nav:true
				},
				992:{
					items:6,
					nav:true
					
				},
				1170:{
					items:8,
					nav:true
					
				}
			}
		});

		$('.logotypes__prev').click(function() {
			$logoSlider.trigger('prev.owl.carousel');
		});

		$('.logotypes__next').click(function() {
			$logoSlider.trigger('next.owl.carousel');
		});


		var $slick = $('.slick'),
				$slickThumbs = $('.slick-nav'),
				$sliderStorage = $('.slider-storage'),
				$sliderNavStorage = $('.slider-nav-storage'),
				$cover = $('.details-popup__cover');

		$slick.append($sliderStorage.find('.product-gray').clone());

		$slickThumbs.append($sliderNavStorage.find('.product-gray').clone());
	
		var slickOptions = {
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			infinite: true
		};

		var slickNavOptions = {
			slidesToShow: 4,
					slidesToScroll: 1,
					arrows: true,
					fade: false,
					centerMode: true,
					centerPadding: '0px',
					infinite: true,
					asNavFor: '.slick-slider',
					focusOnSelect: true,
					responsive: [
					{
						breakpoint: 922,
						settings: {
							slidesToShow: 3
						}
					},

					{
						breakpoint: 728,
						settings: {
							slidesToShow: 4
						}
					},

					{
						breakpoint: 480,
						settings: {
							slidesToShow: 3
						}
					},

					{
						breakpoint: 360,
						settings: {
							slidesToShow: 2
						}
					}
					]
		};
		var $slickSlider = $('.slick').slick();

		var $slickNav = $('.slick-nav').slick();

	  $slickSlider.slick('unslick');
 		$slickNav.slick('unslick');

 		$('.popup__color').on('click', popupColorClick);

 		function popupColorClick(e) {
 			e.preventDefault();
 			if(e.target.parentNode.classList.contains('active')) return;

 			var colorClass = e.target.parentNode.getAttribute('data-color');
 			// alert(e.target.parentNode.className);
 			$cover.fadeIn(function() {

	 			$slickSlider.slick('unslick');
				$slickNav.slick('unslick');

	 			$slick.empty();			
				$slickThumbs.empty();

				$slick.append($sliderStorage.find('.' + colorClass).clone());
				$slickThumbs.append($sliderNavStorage.find('.' + colorClass).clone());

		  		$(e.target).parent().addClass('active').siblings().removeClass('active');

		  		$slickSlider.slick(slickOptions);

				$slickNav.slick(slickNavOptions);

				$cover.fadeOut();
 			});
			
 		}

	  $('.quick-look').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#name',
		mainClass: 'mfp-fade',
		// When elemened is focused, some mobile browsers in some cases zoom in
		// It looks not nice, so we disable it:
		callbacks: {
			beforeOpen: function() {
				$slick.empty();			
				$slickThumbs.empty();

				$slick.append($sliderStorage.find('.product-gray').clone());

				$slickThumbs.append($sliderNavStorage.find('.product-gray').clone());
				
			},
			open: function() {
				
				$slickSlider.slick(slickOptions);

				$slickNav.slick(slickNavOptions);

			},
			close: function() {
      	$slickSlider.slick('unslick');
 				$slickNav.slick('unslick');
    	}
		}
	});

	$('.call-button').magnificPopup({
		type: 'inline',
		preloader: true,
		mainClass: 'mfp-fade',
		// When elemened is focused, some mobile browsers in some cases zoom in
		// It looks not nice, so we disable it:

		zoom: {
		    enabled: true, // By default it's false, so don't forget to enable it

		    duration: 300, // duration of the effect, in milliseconds
		    easing: 'ease-in-out'// CSS transition easing function
		}
	});

	$('.write-us').magnificPopup({
		type: 'inline',
		preloader: true,
		mainClass: 'mfp-fade'
	
	});
	
	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	
});

$(window).load(function() {

	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");

});
