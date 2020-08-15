//console.log('Hello world');

// XMLHttpRequest
var net = new XMLHttpRequest()

net.onload = function() {
  connectServer()
}

//peerJs
var client = new Peer()
var server = []
var connect = []

client.on('open', function(id) {
  document.getElementById('log').innerHTML += 'client id: ' + id
})

client.on('error', function(error) {
  document.getElementById('log').innerHTML += 'client error: ' + error
})

net.open('GET', 'https://api.telegram.org/bot1281235712:AAH8j6p2BIW2BDd3wPPZdoD3abIAyyoB4Yk/getUpdates', false)
net.send()

function connectServer() {
  server.id = JSON.parse(net.responseText).result[JSON.parse(net.responseText).result.length - 1].message.text
  document.getElementById('log').innerHTML += 'server id: ' + server.id
  connect = client.connect(server.id)
}

connect.on('open', function() {
  document.getElementById('log').innerHTML = 'open'
})

connect.on('error', function(error) {
  document.getElementById('log').innerHTML = 'connect error: ' + error
})

function peerIdConnect() {
  document.getElementById('log').innerHTML += 'connect button'
  if (server.lenght == 0) {
    connect = client.connect(document.getElementById('peer_id').value)
  }
  
  connect.send('hi')
}

// geolocation
navigator.geolocation.ge==tCurrentPosition(geolocation_position, geolocation_error)

var geolocation = []

geolocation['x'] =[]
geolocation['y'] = []

function geolocation_position (position) {
	geolocation['x'] = position.coords.latitude//.toFixed(7) * 10000000
	geolocation['y'] = position.coords.longitude//.toFixed(7) * 10000000
}

function geolocation_error (error) {
	//alert('geolocation error: ' + error.message)
}

// touchpad
document.addEventListener('touchstart', function(event) {
  //alert('geolocation x: ' + geolocation['x'] + '\n' + 'geolocatoion y: ' + geolocation['y'])
}, false)

// party
var party = []

party['other'] = []

party['my'] = []
