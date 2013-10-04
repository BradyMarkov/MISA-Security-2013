

function initialize() { 
	 Lat = $.getParamValue('lat');
	 Lng = $.getParamValue('lng');
	 title= $.getParamValue('title');
	 zoom = $.getParamValue('zoom');
	 zoom=parseInt(zoom);
	 
	if (Lat == '' || Lat== '' || title=='' || zoom=='' ){
		Lat = 42.405207;
		Lng = -82.188721;
		title= "Chatham, Chatham-Kent ON";
		zoom = 8;
	}

	 
	var myLatlng = new google.maps.LatLng( Lat,Lng);
	
       var mapOptions = {          
		center: myLatlng, 
		zoom: zoom, 
		mapTypeId: google.maps.MapTypeId.ROADMAP
	   };       
	   var map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
	   
	var marker = new google.maps.Marker({      position: myLatlng,      map: map,      title: title  });
	$("#header").html(title);
	
	}      
	   google.maps.event.addDomListener(window, 'load', initialize);
	   
	   
	     