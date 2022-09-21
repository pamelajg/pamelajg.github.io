function initMap(query){
	const map = new google.maps.Map(document.getElementById('map'),{zoom: 12, center: {lat: 10.3156992, lng:123.88543660000005}});
	const service = new google.maps.places.PlacesService(map);
	
	service.textSearch(query, output);
	
	function output(results, status) {
		const restaurants = [];
		const placeName = [];
		const placeList = document.getElementById("places");
		placeList.innerHTML ='';
	
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			for (var i = 0; i < results.length; i++) {
				
				new google.maps.Marker(
				{
					map: map,
					title: results[i].name,
					position: results[i].geometry.location
				}
				);
				const newDiv = document.createElement("div");
				newDiv.setAttribute("class", "places-class");
				newDiv.setAttribute("id", "places-id-"+i);
				newDiv.setAttribute("onclick", "getDirection(\"places-id-"+i+"\")");
				newDiv.innerHTML = "<h3 id=\"place-name\">" + results[i].name + "</h3><p id=\"address\">" + results[i].formatted_address + "</p>" ;
				document.getElementById("places").appendChild(newDiv);					
			}

		}
				
	}
}

function getDirection(element_id){
	const geocoder = new google.maps.Geocoder();
	const map = new google.maps.Map(document.getElementById('map'),{zoom: 12, center: {lat: 14.6507, lng:121.1029}});
	
	//Geocoder handler
	var getAddress = document.getElementById(element_id);
	var address = getAddress.querySelector("p").innerHTML;
	
	geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
    
	//Direction handler
	const directionsService = new google.maps.DirectionsService();
  	const directionsRenderer = new google.maps.DirectionsRenderer();
  	var mactan = new google.maps.LatLng(10.2990, 123.9639);
  	
  	//Current position handler
	var navigate = navigator.geolocation;
	navigate.getCurrentPosition(success, failure);
	function success(position)
	{
		var curLat = position.coords.latitude;
		var curLng = position.coords.longitude;
		var currentLatLng = new google.maps.LatLng(curLat,curLng);
		
		calcRoute(currentLatLng);		
	}
	
	function failure(){}

  
	directionsRenderer.setMap(map);

	function calcRoute(curLocation) {
  		
  		var request = {
      		origin: curLocation,
      		destination: address,
      		travelMode: google.maps.TravelMode.DRIVING
   		};
  		directionsService.route(request, function(response, status) {
    		if (status == 'OK') {
      			directionsRenderer.setDirections(response);
    		}
  		});
	}			
}

function displayCafe(){
	
			var query = {query:'Cafe in Cebu'};
			initMap(query);
}


function displayFineDine(){
	var query = {query:'Fine Dining in Cebu'};
			initMap(query);
}

function displayBuffet(){
	var query = {query:'Buffet in Cebu'};
			initMap(query);
}

function displayCasualDine(){
	var query = {query:'Casual Dining in Cebu'};
			initMap(query);
}

