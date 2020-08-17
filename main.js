//console.log('Hello world');

// webRTC


// geolocation
var geolocation = []

geolocation.x = []
geolocation.y = []
geolocation.position = function(position) {
  geolocation.x = position.coords.latitude //.toFixed(7) * 10000000
  geolocation.y = position.coords.longitude //.toFixed(7) * 10000000
}
geolocation.error = function(error) {
  //alert('geolocation error: ' + error.message)
}

navigator.geolocation.getCurrentPosition(geolocation.position, geolocation.error)

// touchpad
document.addEventListener('touchstart', function(event) {
  //alert('geolocation x: ' + geolocation['x'] + '\n' + 'geolocatoion y: ' + geolocation['y'])
}, false)

// XMLHttpRequest
var net = new XMLHttpRequest()

net.onload = function() {
  peer.telegram.receive()
}

//peerJs
var peer = []

peer.client = new Peer()
peer.client.id = []
peer.client.on('open', function(id) {
  //document.getElementById('log').innerHTML += 'peer client id: ' + peer.client.id
})
peer.client.on('error', function(error) {
  //document.getElementById('log').innerHTML += 'peer client error: ' + error
})

peer.server = []
peer.server.id = []

peer.telegram = []

peer.telegram.send = function () {
   net.open('GET', 'https://api.telegram.org/bot1281235712:AAH8j6p2BIW2BDd3wPPZdoD3abIAyyoB4Yk/getUpdates', false)
   net.send()
}

peer.telegram.receive = function() {
  peer.server.id = JSON.parse(net.responseText).result[JSON.parse(net.responseText).result.length - 1].message.text
  //document.getElementById('log').innerHTML += 'peer server id: ' + peer.server.id
}

peer.connect = []
peer.connect.server = []
peer.connect.server = setInterval(function() {
  peer.connect = peer.client.connect(peer.server.id)

  peer.connect.on('open', function() {
    clearInterval(peer.connectServer)
    
    party.server.send.id()
    party.server.send.geolocation()
    //document.getElementById('log').innerHTML = 'open'
  })

  peer.connect.on('error', function(error) {
    clearInterval(peer.connectServer)
    //document.getElementById('log').innerHTML = 'connect error: ' + error
  })
}, 1000)

// party
var party = []

party.load = function() {
  party.page.load()
  peer.telegram.send()
}

party.server = []
party.server.send = []

party.server.send.party = setInterval(function() {
  peer.connect.send(JSON.stringify({party: {id: peer.client.id, geolocation: {x: geolocation.x, y: geolocation.y}}}))
}, 30000)

party.server.receive.party = []

party.page = []

party.page.load = function() {
  party.page.intro.load()
}

party.page.intro = []
party.page.intro.block = []
party.page.intro.image = []

party.page.intro.load = function() {
  party.page.intro.data()
}

party.page.intro.data = function() {
  party.page.intro.block = document.createElement('div')
  party.page.intro.block.className = 'block'
  party.page.intro.block.style.cssText =
  `
  width: 100vw;
  height: 100vh;
  `
  document.body.append(party.page.intro.block)
  
  document.querySelector('.block').onclick = function() {
    party.page.other.load()
  }

  party.page.intro.image = document.createElement('IMG')
  party.page.intro.image.src = 'intro.jpg'
  party.page.intro.image.style.cssText =
  `
  width: 100%;
  vertical-align: middle;
  `
  document.querySelector('.block').append(party.page.intro.image)
}

party.page.other = []
party.page.other.block = []
party.page.other.other = []
party.page.other.my = []

party.page.other.load = function() {
  document.body.innerHTML = ''
  
  party.page.other.data()
  
  for(var i=0; i<party.server.receive.party; i++) {
    party.page.other.list.data(i)
  }
}

party.page.other.data = function() {
  party.page.other.block = document.createElement('div')
  party.page.other.block.className = 'block'
  party.page.other.block.style.cssText =
    ` 
    width: 100vw;
    height: 100vh;
    background-color: lime;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 90% 10%;
    grid-template-areas:
    "other"
    "my";
    `
  document.body.append(party.page.other.block)
  
  party.page.other.other = document.createElement('div')
  party.page.other.other.className = 'other'
  party.page.other.other.style.cssText =
    `
    grid-area: other;
    background-color: green;
    overflow-y: scroll;
    `
  document.querySelector('.block').append(party.page.other.other)

  party.page.other.my = document.createElement('div')
  party.page.other.my.className = 'my'
  party.page.other.my.style.cssText =
    `
    grid-area: my;
    background-color: aqua;
    `
  document.querySelector('.block').append(party.page.other.my)
  
  document.querySelector('.my').onclick = function() {
    party.page.my.load()
  }
}

party.page.other.list = []
party.page.other.list.server = []
party.page.other.list.number = []
party.page.other.list.photo = []
party.page.other.list.distance = []

party.page.other.list.data = function(number) {
  party.page.other.number = document.createElement('div')
  party.page.other.number.className = 'number_' + number
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
  party.page.other.photo.className = 'photo_' + number
  party.page.other.photo.style.cssText =
    ` 
    grid-area: photo;
    background-color: blue;
    `
  document.querySelector('.number' + number).append(party.page.other.photo)

  party.page.other.distance = document.createElement('div')
  party.page.other.distance.className = 'distance_' + number
  party.page.other.distance.style.cssText =
    `
    grid-area: distance;
    background-color: yellow;
    `

  document.querySelector('.number' + number).append(party.page.other.distance)
}

party.page.my = []

party.page.my.load = function() {
  document.body.innerHTML = ''
  
  party.page.my.data()
}

party.page.my.data = function() {
  party.page.other.block = document.createElement('div')
  party.page.other.block.className = 'block'
  party.page.other.block.style.cssText =
    ` 
      width: 100vw;
      height: 100vh;
      background-color: lime;
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 90% 10%;
      grid-template-areas:
      "my"
      "other";
      `
  document.body.append(party.page.other.block)
  
  party.page.other.other = document.createElement('div')
  party.page.other.other.className = 'my'
  party.page.other.other.style.cssText =
    `
      grid-area: my;
      background-color: aqua;
      `
  document.querySelector('.block').append(party.page.other.other)
  
  party.page.other.my = document.createElement('div')
  party.page.other.my.className = 'other'
  party.page.other.my.style.cssText =
    `
      grid-area: other;
      background-color: green;
      `
  document.querySelector('.block').append(party.page.other.my)
  
  document.querySelector('.block').onclick = function() {
    party.page.other.load()
  }
}

party.page.signal = []
party.page.signal.interval = []
party.page.signal.color = []

party.page.signal.data = function() {
  document.body.innerHTML = ''
  
  if (party.page.signal.color.lenght == 0) {
    party.page.signal.color = 'black'
  }
  
  party.page.signal.interval = setInterval(function() {
    if (party.page.signal.color == 'white') {
      document.body.style.background = 'black'
      return
    }
    
    if (party.page.signal.color == 'black') {
      document.body.style.background = 'white'
      return
    }
  },1000/2)
}
*/
party.load()