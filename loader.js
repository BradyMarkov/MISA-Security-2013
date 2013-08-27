/*
* Copyright 2012 Research In Motion Limited.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

function onSuccess() {
    //document.getElementById("log").innerHTML += "<p>Invocation sucessful</p>";
}

function onError(error) {
    //document.getElementById("log").innerHTML += "<p>Invocation error: " + error + "</p>";
}

function Launch(opts) {
	blackberry.invoke.invoke(opts, onSuccess, onError);
}

function LaunchEmail(opts) {
    blackberry.invoke.card.invokeEmailComposer(opts, function(success) { }, function (cancel) { },function (error) { } );
}



//Check Online XML file version
//Update Local Copy of XML

//Download XML file


//function loadXML(url, handler) {
//$('#Results').bind('pageinit', function() {
//  $('ul').listview('refresh');
//});

if (window.XMLHttpRequest) {
		  xmlhttp = new XMLHttpRequest();
		  xmlhttp.onreadystatechange = LoadItems;
		  if (xmlhttp.overrideMimeType){
			xmlhttp.overrideMimeType('text/xml')}
		
		  xmlhttp.open("GET", "http://intranet.chatham-kent.ca/links.xml", true);
		  //xmlhttp.open("GET", "links.xml", true);
		  xmlhttp.send(null);
		  //function () {handler(xmlhttp);};
		  //alert(xmlhttp.responseXML);
	}

 
//}

function ListItems(link,parentLI) {
	if (link.nodeType==1){
		var ul=CreateUL(link,parentLI);
		var x=link.childNodes;
		for (var i=0;i<x.length;i++)
			{ 
				if (x[i].nodeType==1){//Process only element nodes (type 1) 
					LinkItems(x[i],ul);
				} 
			}
			
	}
}

function LinkItems(link, parentLI) {
	if (link.nodeType==1){
		//CreateLI(link,parentLI);
		
		if (link.hasChildNodes()) {
			CreateDIV(link,parentLI);
			ListItems(link,parentLI.lastChild);
			
		}else{
			CreateLI(link,parentLI);
		}
	}
}

function CreateLI(link,parentLI){
		var title= link.getAttribute("title");
		
		var uri= link.getAttribute("uri");
		var action= link.getAttribute("action");
		var data= link.getAttribute("data");
		var target = link.getAttribute("target");
		var onclick = link.getAttribute("onclick");
		var clss = link.getAttribute("class");
		var id = link.getAttribute("id");
		var img = link.getAttribute("img");
		
		oLi = document.createElement("li");
		//oLi.setAttribute("uri",uri);
		//oLi.setAttribute("action",action);
		//oLi.setAttribute("data",data);
		//oLi.setAttribute("target",target);
		
		
		
		oLi.setAttribute("onclick",onclick);
		oLi.setAttribute("class",clss);
		oLi.setAttribute("id",id);
		
		oTx =document.createTextNode(title);
		
		
			oAn = document.createElement("a");
			oAn.setAttribute("id",id + "_A");
			//oAn.setAttribute("onclick",onclick);
			//oAn.setAttribute("data-role","button");
			oAn.setAttribute("data-iconpos","right");
			//if (clss=="sub"){
			oAn.setAttribute("data-icon","arrow-r");
			//}else{
			//oAn.setAttribute("data-icon","arrow-d");
			//}
			if (img!=null){
				oIm = document.createElement("img");
				oIm.setAttribute("src",img + "?timestamp=" +new Date().getTime() );
				oIm.setAttribute("class","ui-li-icon");
				oIm.setAttribute("alt",title);					
				oAn.appendChild(oIm);
				
			}
			oAn.appendChild(oTx);
			oLi.appendChild(oAn);
		
			
		
		
		parentLI.appendChild(oLi);
		//return parentLI.lastChild;
}

function CreateDIV(link,parentLI){
		var clss = link.getAttribute("class");
		var id = link.getAttribute("id");
		var title= link.getAttribute("title");
		
		oTx =document.createTextNode(title)
		oH2=document.createElement("h2");
		oDv=document.createElement("Div");
		oDv.setAttribute("data-role","collapsible");
		
		oDv.setAttribute("data-theme","b");
		oDv.setAttribute("data-content-theme","d"); 
		oDv.setAttribute("data-inset","false");
		oDv.setAttribute("data-collapsed-icon","arrow-d");
		oDv.setAttribute("data-expanded-icon","arrow-u");
		
		oDv.setAttribute("id","coll");
		oH2.appendChild(oTx);
		oDv.appendChild(oH2);
		parentLI.appendChild(oDv);
		
		return oDv;
}

function CreateUL(link,parentLI){
		var clss = link.getAttribute("class");
		var id = link.getAttribute("id");
		
		
		
		oLi = document.createElement("ul");
		oLi.setAttribute("data-role","listview");
		oLi.setAttribute("data-inset","false");
	
		
		//oLi.setAttribute("style","display:none");
		oLi.setAttribute("id", id + "_UL");
		
		parentLI.appendChild(oLi);
		$("ul").listview();
		return oLi;
}

function LoadItems() {

    if ((xmlhttp.readyState == 4) && (xmlhttp.status == 200) ){
		 //if (xmlhttp.readyState == 4) {
		var xml=xmlhttp.responseXML;
		//alert(xmlhttp.responseText);
		
		//http://www.w3schools.com/dom/tryit.asp?filename=try_dom_loop
		
		//From root
		/*x=xml.getElementsByTagName("linkList")[0].childNodes[0];
		while (x.nodeType!=1)
		{
			LinkItems(x,document.getElementById("DataList"));
			x=x.nextSibling;
			
		}
		
 
		*/
		//xx=xml.documentElement.;
		//for (ii=0;i<xx.length;ii++)
		//{ 
			//if (xx.nodeType==1){//Process only element nodes (type 1) 
			//	LinkItems(xx,document.getElementById("DataList"));
			//} 
		//}
		
		 xx=xml.documentElement.childNodes;
		for ( ii=0;ii<xx.length;ii++)
		{ 
			if (xx[ii].nodeType==1){//Process only element nodes (type 1) 
				LinkItems(xx[ii],document.getElementById("DataList"));
			} 
		}
		
		
	
		$('ul').listview('refresh');
		
		$('#coll').find('div[data-role=collapsible]').collapsible({refresh:true}); 
		$('#DataList').find('div[data-role=collapsible]').bind('expand', function () {$(this).children().slideDown();}).bind('collapse', function () {$(this).children().next().slideUp();});
		$('[data-role="content"]').trigger('create');
		$('[data-role="content"]').trigger('pagecreate');
		$('ul').listview('refresh');
		//$('#DataList:visible').listview('refresh');
		//$('#APPS_UL:visible').listview('refresh');
		
		/*-------------------------------------------
		 Link(Root)
		
		Function List(ParentNode)
			Create List Item
			call link(ParentNode)
		
		Function Link(ParentNode)
			loop thhough all children
				Create Links
				for each link that has children
				call Function List(Node)
		
		
		
		var root = document.getElementById("DataList");
		
		//oLi = document.createElement("li");
		//oTx =document.createTextNode("test2");
		//oLi.appendChild(oTx);
		//root.appendChild(oLi);

		var links= xml.getElementsByTagName("link");
		//var links = linklist.getElementsByTagName("link");
		
		

		// Loop through these employee elements
		for(var i = 0; i < links.length; i++) {
			// For each employee, get name, job, and salary data using standard DOM
			// methods.  The name comes from an attribute.  The other values are
			// in Text nodes within <job> and <salary> tags.
			//var l = linklist.childNodes[i];
			//var name = l.getAttribute("name");
			var link = links[i];
		
			var title=link.attributes.getNamedItem("title").nodeValue;
			var uri= link.attributes.getNamedItem("uri").nodeValue;
			var action= link.attributes.getNamedItem("action").nodeValue;
			var data= link.attributes.getNamedItem("data").nodeValue;
			var target = link.attributes.getNamedItem("target").nodeValue;
			var onclick = link.attributes.getNamedItem("onclick").nodeValue;
			var clss = link.attributes.getNamedItem("class").nodeValue;
			var id = link.attributes.getNamedItem("id").nodeValue;
			
			
			
			//var salary = l.getElementsByTagName("salary")[0].firstChild.data;

			// Now that we have the employee data, use methods of the table to
			// create a new row and then use the methods of the row to create
			// new cells containing the data as text nodes.
			oLi = document.createElement("li");
			/*Li.setAttribute("uri",uri);
			oLi.setAttribute("action",action);
			oLi.setAttribute("data",data);
			oLi.setAttribute("target",target);8
			oLi.setAttribute("onclick",onclick);
			oLi.setAttribute("class",clss);
			oLi.setAttribute("id",id);
			
			root = document.getElementById("DataList");
			oTx =document.createTextNode(title);
			oLi.appendChild(oTx);
			root.appendChild(oLi);
			
			//var row = table.insertRow(i+1);
			//row.insertCell(0).appendChild(document.createTextNode(title));
			//row.insertCell(1).appendChild(document.createTextNode(job));
			//row.insertCell(2).appendChild(document.createTextNode(salary));
			----------------------------------*/
		}
    
	
}







//Read XML
/*
function readFile() {
  //blackberry.io.file.readFile("file:///store/home/us​er/sample.xml",handleOpenedFile);
}
  

function handleOpenedFile(fullPath, blobData)
{
  var xmlString = blackberry.utils.blobToString(blobData, null);
  var parser = new DOMParser();
  var doc = parser.parseFromString(xmlString, "text/xml");

  var itemDescription = doc.getElementsByTagName('NomeOperatore')[0].first​Child.data;
}

var xmldoc=new ActiveXObject("MSXML2.DOMDocument.3.0");
  xmldoc.load("mydvd.xml");

//Create Unordered List elements for each XML Item

*/