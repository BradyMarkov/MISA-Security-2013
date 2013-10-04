
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

	$('#Page-Map').on("pageload", function(){
		console.log("loading gmaps...")
		//google.maps.event.addDomListener(window, 'load', initialize);
	});
	
	
	$(document).on('pageload', '#Page-Map', function(event){
		console.log("loading gmaps...");
		google.maps.event.addDomListener(window, 'load', initialize);
		initialize();
		console.log("done");
	});
			
	/* jQuery.mobile defaults */
	$(document).bind('mobileinit', function() {

		$.mobile.allowCrossDomainPages = true;
		// check: $.support.cors (boolean)
		$.mobile.buttonMarkup.hoverDelay = 50;
		// Recommended for jQM/Phonegap setup
		$.mobile.pushStateEnabled = false;
	});
	
	// Dynamically add common elements on page creation
	$(document).on('pagecreate', '[data-role="page"]', function(){
		
		// add panel menu
		$('<div>').attr({'id':'panel-menu','data-role':'panel','data-display':'push'}).load("inc/panel-menu.html", function(){
			$(this).trigger('create');
		}).appendTo($(this));
		
	});
	
	// Remove home active state (default) and 
	// add active class to currently active page
	// TODO: needs fix for direct linking to pages,
	// will work in native app
	$(document).on('pageshow', function() {
		$('.page-home').removeClass('ui-btn-active');
		$('#' + $.mobile.activePage.attr('id')).find('#panel-menu').find('a.' + $.mobile.activePage.attr('id')).addClass('ui-btn-active');
	});
	
				
	// Swipe right to open panel
	/*
	KK: disabled to improve performance on older devices
	$(document).on('pageinit', function() {
		$(document).on('swiperight', function( e ) {
			// check if panel is open, open panel
			if ( $.mobile.activePage.jqmData('panel') !== 'open' ) {
					$.mobile.activePage.find('#panel-menu').panel("open");
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
			$( '#panel-menu' ).panel( "close" );
		}
	});
	*/
	
	// Code for toggling table column with radio rather than checkbox
	$(document).on('pagebeforeshow', '.ui-page', function(){ 
		alterTablePopup('table-column-toggle', 0);
		alterTablePopup('table-alt',0);    
	});

	function alterTablePopup(tableID, showColumnID) {    
		if($.mobile.activePage.find('#'+tableID).length > 0) {
			// First unsellect everything, we must trigger click event so table look could change  
			cleanTableColumns(showColumnID, tableID);

			$(document).on('popupafteropen', '#' + tableID + '-popup',function(event, ui) {
				var popup = $(this);        

				//Hide old fieldset
				popup.find('fieldset').hide();
				$.mobile.activePage.find('#radio-fieldset').remove();

				$('<fieldset>').attr({'data-role':'controlgroup','id':'radio-fieldset'}).appendTo(popup);
				popup.find('input').each(function(i){            
					(i === showColumnID) ?   $('<input>').attr({'name': tableID+'-radio','id': tableID+'-radio-'+i,'type':'radio','value':'v'+i,'checked':'checked','class':tableID+'-radio'}).appendTo('#radio-fieldset') :  $('<input>').attr({'name':tableID+'-radio','id':tableID+'-radio-'+i,'type':'radio','value':'v'+i}).appendTo('#' + tableID + '-popup #radio-fieldset');           

					$('<label>').attr({'for':tableID+'-radio-'+i}).text($(this).prev().find('.ui-btn-text').text()).appendTo('#' + tableID + '-popup #radio-fieldset'); 
				}); 
				$('[type="radio"]').checkboxradio();
				$.mobile.activePage.trigger('create');
			}); 

			$(document).on('popupafterclose', '#' + tableID + '-popup',function(event, ui) {
				var popup = $(this);  

				$.mobile.activePage.find('#radio-fieldset').remove();
				popup.find('fieldset').show();        
			});

			$(document).on('vmouseup', '#' + tableID + '-popup #radio-fieldset .ui-controlgroup-controls .ui-radio', function(e){ 
				if(e.handled !== true) // This will prevent event triggering more then once
				{        
					var selectedRadio = $(this).find('[type="radio"]').attr('id').replace(tableID+"-radio-","");
					cleanTableColumns(selectedRadio, tableID);
					e.handled = true;
				}    
			});     
		}
	} 

	function cleanTableColumns(columnNo, tableID){
		$('#' + tableID + '-popup').find('.ui-checkbox label').each(function(i){
			($(this).hasClass('ui-checkbox-on')) ? $(this).trigger('vclick') : ''; // Unselect every selected field
			(i == columnNo) ? $(this).trigger('vclick') : ''; // select first for further use       
		});  
	}
	
	// /column toggle code