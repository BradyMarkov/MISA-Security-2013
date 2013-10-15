
	//Identify the device whether android or ios

           // if (navigator.userAgent.toLowerCase().match(/android/)) {
            //    document.write('<script charset="utf-8" src="cordova-1.5.0-android.js"><\/script>');
           // } else if (navigator.userAgent.toLowerCase().match(/iphone/) || navigator.userAgent.toLowerCase().match(/ipad/)) {
            //    document.write('<script charset="utf-8" src="cordova-1.5.0.js"><\/script>');
            //}

		/*
		app.initialize(function() {
		
			$.mobile.defaultPageTransition  = 'slide';
			$("#menu").owlCarousel({
				 pagination : false,
				 autoPlay :true,
				 goToFirstSpeed : 1000,			
			});
			
			
	
		});
		*/
		
	/* jQuery.mobile init defaults */
	$(document).bind('mobileinit', function() {

		// allow external cross-domain pages
		$.mobile.allowCrossDomainPages = true;
		
		// check: $.support.cors (boolean)
		$.mobile.buttonMarkup.hoverDelay = 50;
		
		// Recommended for jQM/Phonegap setup
		$.mobile.pushStateEnabled = false;
		
		// modify default error message/theme
		$.mobile.pageLoadErrorMessage = "Sorry, there was an error loading the page!";
		$.mobile.pageLoadErrorMessageTheme = "a";
		
		// default page transition
		$.mobile.defaultPageTransition  = 'slide';
				
	});
	
	// disable collapse for disable-collapse
	$(function(){
		$('.disable-collapse h3 a').on('click', function() {
			return false;
			console.log('clicked');
			});
	});

	// Wait for device API libraries to load
    //
    function onLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
    }
    // device APIs are available
    //
    function onDeviceReady() {
        // Now safe to use device APIs
		
		// bind menu button (Android/BB)
		document.addEventListener("menubutton", function(){
				//console.log('menu button pressed');
				$('#panelmenu').panel( "toggle" );
			}, false);
    }
	
	$('#Page-Map').on("pageload", function(){
		console.log("loading gmaps...")
		//google.maps.event.addDomListener(window, 'load', initialize);
	});
	
	$(document).on("pageload", '#page-compass-test', function(){
		console.log("loading compass...")
		startWatch();
	});
	
	$(document).on('pageload', '#Page-Map', function(event){
		console.log("loading gmaps...");
		google.maps.event.addDomListener(window, 'load', initialize);
		initialize();
		console.log("done");
	});
	
	// Dynamically add common elements on page creation
	$(document).on('pagecreate', '[data-role="page"]', function(){
		
		// add panel menu
		$('<div>').attr({'id':'panelmenu','data-role':'panel','data-display':'overlay'}).load("inc/panelmenu.html", function(){
			$(this).trigger('create');
		}).appendTo($(this));
		
	});
	
	// Remove home active state (default) and 
	// add active class to currently active page
	// TODO: needs fix for direct linking to pages,
	// will work in native app
	$(document).on('pageshow', function() {
		$('.page-home').removeClass('ui-btn-active');
		$('#' + $.mobile.activePage.attr('id')).find('#panelmenu').find('a.' + $.mobile.activePage.attr('id')).addClass('ui-btn-active');
		
		// Background fade-in to fix "cover" glitch
		$('.ui-panel-content-wrap').fadeIn('slow');
		$('.ui-page').delay(500).fadeIn('slow').css('background-image','url(../img/beachbg.jpg)');
	});
	
	// Background hide before fade-in to fix "cover" glitch
	$(document).on('pageinit', function() {
		$('.ui-panel-content-wrap').hide();
		$('.ui-page').css('background-image', 'none');
	});
	
	
	$(document).delegate("#page-weather", "pagebeforeshow", function() {
		$.simpleWeather({
			woeid: '4078',
			unit: 'c',
			success: function(weather) {
				var html = '';
				//html += '<img class="full-responsive" src="img/weather/'+weather.code+'.png">';
				html += '<img class="weather-image" src="' + weather.image + '">';
				html += '<div class="weather-forecast">';
				html += '<h3>'+weather.city+', '+weather.region+'</h3>';
				html += '<p><span style="font-size:3em;">' + weather.temp + '&deg;' + weather.units.temp + '</span><br /><span style="font-size:1.5em;">' + weather.currently + '</span></p>';
				//html += '<a data-role="button" href="' + weather.link + '">View Forecast &raquo;</a>';
				html += '</div>';
				$('#weather-today').html(html);
				
				html = '';
				html += '<div class="ui-grid-b weather-extended">';
					html += '<div class="ui-block-a label">Low</div>';
					html += '<div class="ui-block-b label">High</div>';
					html += '<div class="ui-block-c label">Humidity</div>';
					html += '<div class="ui-block-a value">' + weather.low + '&deg;' + weather.units.temp + '</div>';
					html += '<div class="ui-block-b value">' + weather.high + '&deg;' + weather.units.temp + '</div>';
					html += '<div class="ui-block-c value">' + weather.humidity + '%</div>';
					html += '<div class="ui-block-a label">Sunrise</div>';
					html += '<div class="ui-block-b label">Sunset</div>';
					html += '<div class="ui-block-c label">Pressure</div>';
					html += '<div class="ui-block-a value">' + weather.sunrise + '</div>';
					html += '<div class="ui-block-b value">' + weather.sunset + '</div>';
					html += '<div class="ui-block-c value">' + ((weather.rising == 1) ? '<div class="ui-icon ui-icon-arrow-u"></div>' : '<div class="ui-icon ui-icon-arrow-d"></div>') + '</div>';
				html += '</div>';
				
				html += '<p><b>Last updated:</b> ' + weather.updated + '</p>';
				$('#weather-extended').html(html);
			},
			error: function(error) {
				$("#weather").html("<p>"+error+"</p>");
			}
		});
	});
				
	// Swipe right to open panel
	/*
	KK: disabled to improve performance on older devices
	$(document).on('pageinit', function() {
		$(document).on('swiperight', function( e ) {
			// check if panel is open, open panel
			if ( $.mobile.activePage.jqmData('panel') !== 'open' ) {
					$.mobile.activePage.find('#panelmenu').panel("open");
			}
		});
		
	});
	*/
	
	/* KK: not working on phone
	// Back button closes panel
	$(document).bind('keydown', function(event) {
		if (event.keyCode == 27) {
			// Prevent default (disable the back button behavior)
			event.preventDefault();

			// Your code to close panel or show another page or whatever...
			$( '#panelmenu' ).panel( "close" );
		}
	});
	*/
	

	$(document).delegate("#page-guide", "pagebeforeshow", function() {
		$('input[name="track"]').on('change', function() {
			hideAllTracks();
			switch ($(this).val()) {
				case "technical":
					$('.track2').delay(250).fadeIn();
					break;
				case "management":
					$('.track3').delay(250).fadeIn();
					break;
				default: // general
					$('.track1').delay(250).fadeIn();
			};
		});
		function hideAllTracks() {
			$('.track1').fadeOut(250);
			$('.track2').fadeOut(250);
			$('.track3').fadeOut(250);
			}
	});
	
	var floorscroll;
	$(document).delegate("#page-floorplan", "pageshow", function() {
		$(function(){
			floorscroll = new iScroll('floorplan',
				{ zoom:true, zoomMax: 4 });
			});
	});
	
	function gmap(address) {
		// KK: encodes address and opens in external browser window or native app
		window.open('http://maps.google.com/maps?q=' + encodeURIComponent(address), '_system');
		//trace:
		//console.log('http://maps.google.com/maps?q=' + encodeURIComponent(address));
		}
	
	// compass testing
	 // The watch id references the current `watchHeading`
	var watchID = null;

	// Start watching the compass
	//
	function startWatch() {

		// Update compass every 3 seconds
		var options = { frequency: 100 };

		watchID = navigator.compass.watchHeading(onSuccess, onError, options);
	}

	// Stop watching the compass
	//
	function stopWatch() {
		if (watchID) {
			navigator.compass.clearWatch(watchID);
			watchID = null;
		}
	}

	// onSuccess: Get the current heading
	//
	function onSuccess(heading) {
		//var element = $('#heading');
		//element.innerHTML = 'Heading: ' + heading.magneticHeading;
		//console.log(heading.magneticHeading);
		var rotation = 360 - Math.round(heading.magneticHeading),
		rotateDeg = 'rotate(' + rotation + 'deg)';
		// TODO: fix - this code only works on webkit browsers, not wp7
		$('#compass').css('-webkit-transform', rotateDeg);
	}

	// onError: Failed to get the heading
	//
	function onError(compassError) {
		alert('Compass error: ' + compassError.code);
	}