console.log('Hello World!');

//peer js
var peer = new Peer()

peer.on('open', function(id) {
  alert('id')
  console.log('id: ' + id)
})

peer.on('error', function(error) {
  alert(error)
  console.log('error peer js: ' + error)
})

// geolocation
var geolocation = new Array()

geolocation['x'] = 0
geolocation['y'] = 0

navigator.geolocation.getCurrentPosition(geolocation_position, geolocation_error);

function geolocation_position (position) {
	geolocation['x'] = position.coords.latitude.toFixed(7) * 10000000;
	geolocation['y'] = position.coords.longitude.toFixed(7) * 10000000;
}

function geolocation_error (error) {
	alert('error geolocation: ' + error.message);
}

// touchpad
/*
document.body.onmousedown = function(event) {
  alert('ok')
  //alert(geolocation)
}
*/

document.addEventListener('touchstart', function(event) {
  alert('ok')
}, false)