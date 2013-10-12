MISA Security 2013
==================

This app is the portable MISA Security Conference 2013 program Guide and Map.


http://MisaSecurity2013.chatham-kent.ca

Using Sparkle http://sparkleshare.org/ the git repo is sync with the Web Site, all commits will upload to the server.
Have not tested the time it take it seem pretty quick.

I rearranged the page content into separate pages so that we can easily have another person update the content portions.
For example we can setup a simple Content Management which allows another person to update the program.


##TODO##

Do not use "–" or "_" in file names, do not start a filename with "."
it will not compile on Phonegap build




New Page: Transportation
	Bus Schedule 
	Taxi

New Pages: Bio’s
	Need pages with Bio’s
	Page that lists all Bios and links to them?
	-Mayor, CAO, Helen, and all Speakers
	Possibly speakers bio’s could double as the event description in the program guide (below)

Update Pages: Program Guide
	-needs better formatting to see more clearly days and events it's hard to see
	-needs formated location info and event description on each event, possibly on new lines?
		provide easy way to see location 
	-needs links to Bios pages possibly links to the event/bio of the event
	-add separators rows, or colour rows maybe days, breaks dinner etc
	-maybe colour cordinate the track rows green blue orange?
	-Table does not fit 100% width of the screen
	Spelling of management is wrong at 9:30 on wend
	Missing all 3:30- 4:30 events on Wendnesday
	need to confirm event from updated content

Update Pages: about
	Need MISA Logo
	Web Link to http://www.misa-asim.ca/
	Need Chatham-Kent Logo
	Need Chatham-Kent description
	Need Chatham-Kenb Link

Bugs:
	Zoom on Map does not work on android
	Header is not fixed to the top of the page in everypage but scrolls away, this produces issues in some devices for navigation
	Misa Security 2013 title doesnot fit on most devices can we shorten it

	
	
Other
	~~Update phone number to new DID~~ (226) 312-2065
	Update Email to MISA email address Misa2013@chatham-kent.ca
	changing the page effect to slide or something else - got comments/ feedback sayin it's awkward
	

Spell Check
		Teri will Spellcheck website on Tuesday

Cleanup
		Remove all non needed Files and JS to make it faster...
		
		

### Cleanup ###
- ~~config.xml~~
- ~~folder structure~~
- ~~update moved library references~~
- ~~localize references~~

### Multi-platform Graphics ###
- ~~icons~~
- ~~icons: rounded border for black bg contrast~~
- ~~splash screens~~
    * ~~retina + xhdpi filesizes are fairly large- will require testing~~
    * ~~BB splash behavior unknown- strange proportions~~
	* ~~(removed splash screens due to package size- see issues)~~

### UI-Functionality ###
- ~~panel menu~~
- ~~panel menu dynamic active state~~
- ~~program guide track selection~~
- ~~weather page~~
- ~~pinch-zoom floor plan~~
- ~~google maps app integration~~
- localstorage to store page-specfic history

### UI-Graphics ###
- ~~responsive bg image~~
- ~~panel texture~~
- compass graphic
- pirate-themed basemap?

### Content ###
- ~~program schedule~~
- ~~help~~
- ~~about~~
- ~~places to eat~~
- ~~floor plan~~
- ~~about MISA~~
- ~~help~~
- speaker BIO's
- sponsor links/listing
- additional news feeds
- treasure map POIs

### Release ###
- Android
	* ~~signing key~~
	* ~~dev account ($25)~~
	* ~~app store submission~~
- BlackBerry
	* ~~signing key~~
	* ~~dev account~~
	* ~~app store submission~~
- Apple
	* ~~signing key (~$100?)~~
	* ~~dev account~~
	* ~~app store submission~~
