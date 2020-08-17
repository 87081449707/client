//console.log('Hello world');

// XMLHttpRequest
var net = new XMLHttpRequest()

net.onload = function() {
  peerServerId()
}

//peerJs
var peer = []
peer.client = new Peer()
peer.server = []
peer.server.id = []
peer.connect = []
peer.connectServer = []

peer.client.on('open', function(id) {
  //document.getElementById('log').innerHTML += 'client id: ' + id
})

peer.client.on('error', function(error) {
  //document.getElementById('log').innerHTML += 'client error: ' + error
})

net.open('GET', 'https://api.telegram.org/bot1281235712:AAH8j6p2BIW2BDd3wPPZdoD3abIAyyoB4Yk/getUpdates', false)
net.send()

function peerServerId() {
  peer.server.id = JSON.parse(net.responseText).result[JSON.parse(net.responseText).result.length - 1].message.text
  //document.getElementById('log').innerHTML += 'peer server id: ' + peer.server.id
}

peer.connectServer = setInterval(function() {
  peer.connect = peer.client.connect(peer.server.id)

  peer.connect.on('open', function() {
    clearInterval(peer.connectServer)
    peer.connect.send(peer.client.id)
    //document.getElementById('log').innerHTML = 'open'
  })

  peer.connect.on('error', function(error) {
    clearInterval(peer.connectServer)
    //document.getElementById('log').innerHTML = 'connect error: ' + error
  })
}, 1000)

// geolocation
navigator.geolocation.getCurrentPosition(geolocation_position, geolocation_error)

var geolocation = []

geolocation['x'] = undefined
geolocation['y'] = undefined

function geolocation_position(position) {
  geolocation['x'] = position.coords.latitude //.toFixed(7) * 10000000
  geolocation['y'] = position.coords.longitude //.toFixed(7) * 10000000
}

function geolocation_error(error) {
  //alert('geolocation error: ' + error.message)
}

// touchpad
document.addEventListener('touchstart', function(event) {
  //alert('geolocation x: ' + geolocation['x'] + '\n' + 'geolocatoion y: ' + geolocation['y'])
}, false)

// party!
function partyOther () {
  alert('other')
}

function partyMy() {
  alert('my')
}

var party = []


party['other'] = []
party['other']['number'] = []
party['other']['photo'] = []
party['other']['distance'] = []

function partyOtherList () {
  party['other']['number'][0] = document.createElement('div')
  party['other']['number'][0].className = 'number_0'
  party['other']['number'][0].style.cssText = 
  ` width: 100vw;
    height: 110vw;
    background-color: orange;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 90% 10%;
    grid-template-areas:
    "photo photo"
    "people_number distance";`
  
  party['other']['photo'][0] = document.createElement('div')
  party['other']['photo'][0].className = 'photo_0'
  party['other']['photo'][0].style.cssText = 
  ` grid-area: photo;
    background-color: blue;`
  
  party['other']['distance'][0] = document.createElement('div')
  party['other']['distance'][0].className = 'distance_0'
  party['other']['distance'][0].style.cssText = 
  ` grid-area: distance;
    background-color: yellow;`
  
  document.querySelector('.party_other').append(party['other']['number'][0])
  document.querySelector('.number_0').append(party['other']['photo'][0])
  document.querySelector('.number_0').append(party['other']['distance'][0])
}

partyOtherList()



party['my'] = []