//console.log('Hello world');

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

// XMLHttpRequest
var net = new XMLHttpRequest()

net.onload = function() {
  peerServerId()
}

//peerJs
var peer = []
peer.client = new Peer()
peer.client.id = []
peer.server = []
peer.server.id = []
peer.connect = []
peer.connect.server = []

peer.client.on('open', function(id) {
  //document.getElementById('log').innerHTML += 'peer client id: ' + peer.client.id
})

peer.client.on('error', function(error) {
  //document.getElementById('log').innerHTML += 'peer client error: ' + error
})

net.open('GET', 'https://api.telegram.org/bot1281235712:AAH8j6p2BIW2BDd3wPPZdoD3abIAyyoB4Yk/getUpdates', false)
net.send()

function peerServerId() {
  peer.server.id = JSON.parse(net.responseText).result[JSON.parse(net.responseText).result.length - 1].message.text
  //document.getElementById('log').innerHTML += 'peer server id: ' + peer.server.id
}

peer.connect.server = setInterval(function() {
  peer.connect = peer.client.connect(peer.server.id)

  peer.connect.on('open', function() {
    clearInterval(peer.connectServer)
    //document.getElementById('log').innerHTML = 'open'
  })

  peer.connect.on('error', function(error) {
    clearInterval(peer.connectServer)
    //document.getElementById('log').innerHTML = 'connect error: ' + error
  })
}, 1000)

// party
var party = []
party.server = []
party.server.connect = []
party.server.id = function() {
  peer.connect.send({ id: peer.client.id })
}
party.server.geolocation = function() {
  peer.connect.send({ geolocation: { x: geolocation.x, y: geolocation.y } })
}
party.page = []
party.page.connect = []
party.page.intro = []
party.page.intro.image = []
party.page.intro.load = function() {
  party.page.intro.image = document.createElement('IMG')
  party.page.intro.image.src = 'intro.jpg'
  document.body.append(party.page.intro.image)
}
party.page.other = []
party.page.other.block = []
party.page.other.other = []
party.page.other.my = []
party.page.other.number = []
party.page.other.photo = []
party.page.other.distance = []
party.page.other.load = function() {
  party.page.other.block = document.createElement('div')
  party.page.other.block.className = 'block'
  party.page.other.block.cssText =
    ` 
    width: 100vw;
    height: 100vh;
    background-color: lime;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 90% 10% ;
    grid-template-areas:
    "other"
    "my";
    `
  document.body.append(party.page.other.block)
  
  party.page.other.other = document.createElement('div')
  party.page.other.other.className = 'other'
  party.page.other.other.cssText =
    `
    grid-area: other;
    background-color: green;
    overflow-y: scroll;
    `
  document.querySelector('.block').append(party.page.other.other)

  party.page.other.my = document.createElement('div')
  party.page.other.my.className = 'my'
  party.page.other.my.cssText =
    `
    grid-area: my;
    background-color: aqua;
    `
  document.querySelector('.block').append(party.page.other.my)
}
party.page.other.list = function() {
  party.page.other.number = document.createElement('div')
  party.page.other.number.className = 'number_0'
  party.page.other.number.style.cssText =
    ` 
    width: 100vw;
    height: 110vw;
    background-color: orange;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 90% 10%;
    grid-template-areas:
    "photo photo"
    "people_number distance";
    `
  document.querySelector('.other').append(party.page.other.number)

  party.page.other.photo = document.createElement('div')
  party.page.other.photo.className = 'photo_0'
  party.page.other.photo.style.cssText =
    ` 
    grid-area: photo;
    background-color: blue;
    `
  document.querySelector('.number').append(party.page.other.photo)

  party.page.other.distance = document.createElement('div')
  party.page.other.distance.className = 'distance_0'
  party.page.other.distance.style.cssText =
    ` 
    grid-area: distance;
    background-color: yellow;
    `

  document.querySelector('.number').append(party.page.other.distance)
}
party.page.my = function() {

}
party.page.signal = function() {
  
}
party.page.other.load()