

	
	
function onSuccess() {
    //document.getElementById("log").innerHTML += "<p>Invocation sucessful</p>";
}

function onError(error) {
    //document.getElementById("log").innerHTML += "<p>Invocation error: " + error + "</p>";
}


var xmlhttp,url;
	
	
function loadXML(url) {

if (window.XMLHttpRequest) {
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = LoadItems;
	if (xmlhttp.overrideMimeType){	
		xmlhttp.overrideMimeType('text/xml')
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}
}


function LoadItems() {

    if ((xmlhttp.readyState == 4) && (xmlhttp.status == 200) ){
		var xml=xmlhttp.responseXML;
		
		//switch (type) {
			//case "News": 
			LoadNews('#RSS1',xml); //break;
			//case "": LoadOther(); break;
			//default: ; break
		//}
		
		
     
	
	}
}


function LoadNews(item, xml){
		xx=xml.documentElement.childNodes;
		for ( ii=0;ii<xx.length;ii++)
		{ 
			if (xx[ii].nodeType==1){//Process only element nodes (type 1) 
				var title= xx[ii].getAttribute("title");
				url= xx[ii].getAttribute("url");
					Next(item, 0);

			} 
		}
}


function Next(item, offset){
	$(item).rssfeed(url, {
		 limit: 5,
		 snippet: false,
		 offset: offset
	});
}


 
