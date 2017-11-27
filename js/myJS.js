function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {lat: 51.509582, lng: -0.098198} // London.
  });

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer({
    map: map,
    panel: document.getElementById('right-panel')
  });

  directionsDisplay.addListener('directions_changed', function() {
    computeTotalDistance(directionsDisplay.getDirections());
  });

  displayRoute('London SE1 0NQ, UK', 'London SE1 0NQ, UK', directionsService,
      directionsDisplay);
}

function displayRoute(origin, destination, service, display) {
  service.route({
    origin: origin,
    destination: destination,
    waypoints: [{location: 'Southwark Bridge A300'}, {location: '100 victoria embankment'}, {location: 'Blackfriars Bridge'},
                {location: 'London SE1 9NY, UK'}, {location: 'London SE1, UK'}, {location: 'London SE1 0NQ, UK'}],
    travelMode: google.maps.TravelMode.DRIVING,
    avoidTolls: true
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      display.setDirections(response);
    } else {
      alert('Could not display directions due to: ' + status);
    }
  });
}

function computeTotalDistance(result) {
  var total = 0;
  var myroute = result.routes[0];
  for (var i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = total / 1000;
  document.getElementById('total').innerHTML = total + ' km';
}