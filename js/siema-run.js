(function() {
	
var siema = new Siema({
	 	loop: true,
	 	onChange: siemaChange
	 });

	 document.querySelector('.slider-nav__pev').addEventListener('click', siemaPrev);
	 document.querySelector('.slider-nav__next').addEventListener('click', siemaNext);

	 function siemaPrev(e) {
	 	siema.prev();
	 	var parent = this.parentNode;

	 	
	 		 }

	  function siemaNext(e) {
	 	siema.next();
	 	var parent = this.parentNode;

	 	 }
	 
	 	var dots = document.querySelectorAll('.main-slider .dot');

	 	[].forEach.call(dots, function(item) {
	 		item.addEventListener('click', siemaToSlide);
	 	});

	 	function siemaToSlide(e) {
	 		
	 	[].forEach.call(dots, function(item, i) {
	 		if(e.target == item){
	 			// alert(i);
	 			dotsControl(i);
	 			siema.goTo(i);
	 		}
	 	});
	 	}

	 setInterval(function() {
	 	siema.next();
	 }, 3000);

	 function siemaChange() {
	 		var	currentSlide = this.currentSlide;
	 		dotsControl(currentSlide);
		 		
 		}

 	function dotsControl(current) {
 			dots[current].classList.add('dot-active');

		 	[].forEach.call(dots, function(item, i) {
		 		
		 		if(i !== current){
		 			dots[i].classList.remove('dot-active');
		 		}
		 			
		 	});

 	}
})();