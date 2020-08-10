console.log('client');

//peer js
var peer = new Peer()

peer.on('open', function(id) {
  alert('peer js id: ' + id)
})

peer.on('error', function(error) {
  alert('peer js error: ' + error)
})

var conn = peer.connect('party')

conn.on('open', function() {
  conn.send('hi!')
})

// geolocation
var geolocation = []

geolocation['x'] = undefined
geolocation['y'] = undefined

navigator.geolocation.getCurrentPosition(geolocation_position, geolocation_error);

function geolocation_position (position) {
	geolocation['x'] = position.coords.latitude//.toFixed(7) * 10000000
	geolocation['y'] = position.coords.longitude//.toFixed(7) * 10000000
}

function geolocation_error (error) {
	alert('geolocation error: ' + error.message)
}

// touchpad
document.addEventListener('touchstart', function(event) {
  alert('geolocation x: ' + geolocation['x'] + '\n' + 'geolocatoion y: ' + geolocation['y'])
}, false)

// party
var party = []

party['all'] = []

party['i'] = []

