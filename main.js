console.log('Hello world')

// webRTC

// geolocation
var geolocation_x
var geolocation_y

geolocation_position = function(position) {
  geolocation_x = position.coords.latitude //.toFixed(7) * 10000000
  geolocation_y = position.coords.longitude //.toFixed(7) * 10000000
}
geolocation_error = function(error) {
  //alert('geolocation error: ' + error.message)
}

navigator.geolocation.getCurrentPosition(geolocation_position, geolocation_error)

// touchpad
document.addEventListener('touchstart', function(event) {
  //alert('geolocation x: ' + geolocation['x'] + '\n' + 'geolocatoion y: ' + geolocation['y'])
}, false)

//peerJs
var client
var client_id

client_connect = setInterval(function (){
  client = new Peer()
  
  client.on('open', function(id) {
    client_id = id
    
    clearInterval(client_connect)
    
    //document.getElementById('log').innerHTML += 'peer client id: ' + peer.client.id
  })
  client.on('error', function(error) {
    //document.getElementById('log').innerHTML += 'peer client error: ' + error
  })
}, 1000)

var server
var server_id

server_connect = setInterval(function(){
  server = client.connect(server_id)

  server.on('open', function(){
    clearInterval(server_connect)
    
    //document.getElementById('log').innerHTML = 'open'
  })

  server.on('error', function(error){
    //document.getElementById('log').innerHTML = 'connect error: ' + error
  })
}, 1000)

// xmlHTTPrequest
var xml = new XMLHttpRequest()

xml.onload = function() {
  telegram_receive()
}

// telegram
var telegram

telegram_send = function () {
   xml.open('GET', 'https://api.telegram.org/bot1281235712:AAH8j6p2BIW2BDd3wPPZdoD3abIAyyoB4Yk/getUpdates', false)
   xml.send()
}
telegram_receive = function() {
  server_id = JSON.parse(net.responseText).result[JSON.parse(net.responseText).result.length - 1].message.text
  
  //document.getElementById('log').innerHTML += 'peer server id: ' + peer.server.id
}

// party
party_send = setInterval(function() {
  net_send(JSON.stringify({party: {id: peer.client.id, geolocation: {x: geolocation.x, y: geolocation.y}}}))
}, 30000)
party_receive = function () {
  
}

// page
page_intro = function(){
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
}
page_other = function(){
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
page_other_list = function(){
  var block
  
  block_list = document.createElement('div')
  block_list.className = 'block'
  block_list.style.cssText =
    ` 
    width: 100vw;
    height: 110vw;
    background-color: orange;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 90% 10%;
    grid-template-areas:
    "photo"
    "distance";
    `
    
  document.querySelector('.other').append(block)

  var photo
  
  photo = document.createElement('div')
  photo.className = 'photo'
  photo.style.cssText =
    ` 
    grid-area: photo;
    background-color: blue;
    `
    
  document.querySelector('.block').append(photo)

  var distance
  
  distance = document.createElement('div')
  distance.className = 'distance'
  distance.style.cssText =
    `
    grid-area: distance;
    background-color: yellow;
    `
  
  document.querySelector('.block').append(distance)
}
page_my = function(){
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
page_signal= function(){
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
  },1000/3)
}
