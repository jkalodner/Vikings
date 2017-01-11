jQuery(document).ready(function($){
	var secondaryNav = $('.cd-secondary-nav'),
		secondaryNavTopPosition = secondaryNav.offset().top,
		taglineOffesetTop = $('#cd-intro-tagline').offset().top + $('#cd-intro-tagline').height() + parseInt($('#cd-intro-tagline').css('paddingTop').replace('px', '')),
		contentSections = $('.cd-section');
		windowWidth = $(window).width();
		parents = document.getElementsByClassName('imgspan');
		children = document.getElementsByTagName('img');
		sub = [];
		for(var i=0; i<5; i++){
			sub.push(children[i]);
		}
		if(windowWidth<768){
			for(var i=0; i<5; i++){
				parents[i].removeChild(sub[i]);
			}
		}
	$(window).on('resize',function(){
		var newWindowWidth = $(window).width();
		if(newWindowWidth>768 && windowWidth<768){
			for(var i=0; i<5; i++){
				$(parents[i]).append(sub[i]);
			}
		}
		if(newWindowWidth<768 && windowWidth>768){
			for(var i=0; i<5; i++){
				parents[i].removeChild(sub[i]);
			}
		}
		windowWidth = newWindowWidth;
	});
	$(window).on('scroll', function(){		
		if($(window).scrollTop() > secondaryNavTopPosition ) {
			secondaryNav.addClass('is-fixed');
			$('.cd-main-content').addClass('has-top-margin');	
			setTimeout(function() {
	            secondaryNav.addClass('animate-children');
	        }, 50);
		} else {
			secondaryNav.removeClass('is-fixed');
			$('.cd-main-content').removeClass('has-top-margin');
			setTimeout(function() {
	            secondaryNav.removeClass('animate-children');
	        }, 50);
		}
		updateSecondaryNavigation();
	});

	function updateSecondaryNavigation() {
		contentSections.each(function(){
			var actual = $(this),
				actualHeight = actual.height() + parseInt(actual.css('paddingTop').replace('px', '')) + parseInt(actual.css('paddingBottom').replace('px', '')),
				actualAnchor = secondaryNav.find('a[href="#'+actual.attr('id')+'"]');
			if ( ( actual.offset().top - secondaryNav.height() <= $(window).scrollTop() ) && ( actual.offset().top +  actualHeight - secondaryNav.height() > $(window).scrollTop() ) ) {
				actualAnchor.addClass('active');
			}else {
				actualAnchor.removeClass('active');
			}
		});
	}

	$('.cd-secondary-nav-trigger').on('click', function(event){
		event.preventDefault();
		$(this).toggleClass('menu-is-open');
		secondaryNav.find('ul').toggleClass('is-visible');
	});

	secondaryNav.find('ul a').on('click', function(event){
        event.preventDefault();
        var target= $(this.hash);
        $('body,html').animate({
        	'scrollTop': target.offset().top - secondaryNav.height() + 1
        	}, 400
        ); 
        $('.cd-secondary-nav-trigger').removeClass('menu-is-open');
        secondaryNav.find('ul').removeClass('is-visible');
    });

});