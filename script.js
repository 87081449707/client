console.log('Hello world')

// webRTC

// geolocation
var geolocation_x
var geolocation_y
var geolocation_position = function(position) {
  geolocation_x = position.coords.latitude //.toFixed(7) * 10000000
  geolocation_y = position.coords.longitude //.toFixed(7) * 10000000
}
var geolocation_error = function(error) {
  //alert('geolocation error: ' + error.message)
}

navigator.geolocation.getCurrentPosition(geolocation_position, geolocation_error)

// touchpad
document.addEventListener('touchstart', function(event) {
  //alert('geolocation x: ' + geolocation['x'] + '\n' + 'geolocatoion y: ' + geolocation['y'])
  //console.log(server_id)
  //server.send('hi')
  //server_send()
  server.send(JSON.stringify({
    party: '', id: client_id, geolocation: {
      x: geolocation_x, y: geolocation_y
    }, number: 5
  }))
}, false)

//peerJs
var client
var client_id
var client_connect = setInterval(function() {
  client = new Peer()

  client.on('open', function(id) {
    console.log('peerJs client open')

    client_id = id

    clearInterval(client_connect)
  })

  client.on('error', function(error) {
    alert('peerJs client error: ' + error)
  })

  client.on('connection', function(connect) {
    alert('prerJs server connect')

    connect.on('data', function(data) {
      alert('peerJs client data') + data

    })
  })
}, 2000)

var server
var server_id
var server_connect = setInterval(function() {
  server = client.connect(server_id)

  server.on('open', function() {
    alert('peerJs server open')

    clearInterval(server_connect)

    server.send('hi')
  })

  server.on('data', function(data) {
    alert('peerJs server data: ' + data)

    server_receive(data)
  })

  server.on('error', function(error) {
    alert('peerJs server error: ' + error)

    clearInterval(server_connect)
  })
}, 2000)
var server_send = setInterval(function() {
  //server.send(JSON.stringify({ party: '', id: client_id, geolocation: { x: geolocation_x, y: geolocation_y }, number: 5}))
}, 5000)
var server_receive = function(data) {
  alert(data)
}
// telegram
var telegram
var telegram_send = setInterval(function() {
  clearInterval(telegram_send)

  // xmlHTTPrequest
  var xml = new XMLHttpRequest()

  xml.onload = function() {
    telegram_receive(xml.responseText)
  }

  xml.open('GET', 'https://api.telegram.org/bot1281235712:AAH8j6p2BIW2BDd3wPPZdoD3abIAyyoB4Yk/getUpdates', false)
  xml.send()
}, 1000)
var telegram_receive = function(data) {
  alert('peerJs server id: ' + JSON.parse(data).result[JSON.parse(data).result.length - 1].message.text)

  server_id = JSON.parse(data).result[JSON.parse(data).result.length - 1].message.text
}

// page
var page_number = function () {
  
}
var page_intro = setInterval(function() {
  clearInterval(page_intro)

  document.body.innerHTML = ''

  var block

  block = document.createElement('div')
  block.className = 'block'
  block.style.cssText =
  `
  width: 100vw;
  height: 100vh;
  `
  
  document.body.append(block)

  document.querySelector('.block').onclick = function() {
    page_other()
  }

  var image

  image = document.createElement('IMG')
  image.src = 'intro.jpg'
  image.style.cssText =
  `
  width: 100%;
  vertical-align: middle;
  `

  document.querySelector('.block').append(image)
}, 1000)
var page_other = function() {
  document.body.innerHTML = ''

  var block

  block = document.createElement('div')
  block.className = 'block'
  block.style.cssText =
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

  document.body.append(block)

  var other

  other = document.createElement('div')
  other.className = 'other'
  other.style.cssText =
  `
  grid-area: other;
  background-color: green;
  overflow-y: scroll;
  `

  document.querySelector('.block').append(other)

  var my

  my = document.createElement('div')
  my.className = 'my'
  my.style.cssText =
  `
  grid-area: my;
  background-color: aqua;
  `

  document.querySelector('.block').append(my)

  document.querySelector('.my').onclick = function() {
    page_my()
  }
}
var page_other_list = function() {
  //document.body.innerHTML = ''
  
  var block

  block = document.createElement('div')
  block.className = 'block'
  block.style.cssText =
  `
  width: 100vw;
  height: 50vw;
  background-color: orange;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 100%;
  grid-template-areas:
  "distance people";
  `

  document.querySelector('.other').append(block)

  var distance

  distance = document.createElement('div')
  distance.className = 'distance'
  distance.style.cssText =
  `
  grid-area: distance;
  background-color: yellow;
  `

  document.querySelector('.block').append(distance)

  var people

  photo = document.createElement('div')
  photo.className = 'people'
  photo.style.cssText =
  `
  grid-area: people;
  background-color: blue;
  `

  document.querySelector('.block').append(people)

}
var page_my = function() {
  document.body.innerHTML = ''

  var block

  block = document.createElement('div')
  block.className = 'block'
  block.style.cssText =
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

  document.body.append(block)

  var my

  my = document.createElement('div')
  my.className = 'my'
  my.style.cssText =
  `
  grid-area: my;
  background-color: green;
  `

  document.querySelector('.block').append(my)

  var other

  other = document.createElement('div')
  other.className = 'other'
  other.style.cssText =
  `
  grid-area: other;
  background-color: aqua;
  `

  document.querySelector('.block').append(other)

  document.querySelector('.other').onclick = function() {
    page_other()
  }
}
var page_signal = function() {
  document.body.innerHTML = ''

  var color = 'black'

  var play = setInterval(function() {
    if (color == 'white') {
      document.body.style.background = 'black'
      return
    }

    if (color == 'black') {
      document.body.style.background = 'white'
      return
    }
  },
    1000 / 3)
}