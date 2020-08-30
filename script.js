console.log('Hello world')
// webRTC

// icon

// compas

// googleMap

// geolocation
let geolocation = setInterval(function() {
  let geolocation_position = function(position) {
    clearInterval(geolocation)

    geolocation_x = position.coords.latitude
    geolocation_y = position.coords.longitude

    console.log('geolocation x: ' + geolocation_x)
    console.log('geolocation y: ' + geolocation_y)
  }
  let geolocation_error = function(error) {
    clearInterval(geolocation)

    console.log('geolocation error: ' + error)
  }
  navigator.geolocation.getCurrentPosition(geolocation_position, geolocation_error)
}, 1000)
let geolocation_x
let geolocation_y
// telegram
let telegram = setInterval(function() {
  let telegram_xhr = new XMLHttpRequest()

  telegram_xhr.onload = function() {
    clearInterval(telegram)

    telegram_id = JSON.parse(telegram_xhr.responseText).result[JSON.parse(telegram_xhr.responseText).result.length - 1].message.text

    console.log('telegram id: ' + telegram_id)
  }
  telegram_xhr.onerror = function() {
    clearInterval(telegram)

    console.log('telegram id error')
  }

  telegram_xhr.open('GET', 'https://api.telegram.org/bot1281235712:AAH8j6p2BIW2BDd3wPPZdoD3abIAyyoB4Yk/getUpdates', false)
  telegram_xhr.send()
}, 1000)
let telegram_id
//peerJs
let peerJs_peer = setInterval(function() {
  peerJs_peer = new Peer()

  peerJs_peer.on('open', function(id) {
    clearInterval(peerJs_peer)

    peerJs_peer_id = id

    console.log('peerJs peer open')
  })
  peerJs_peer.on('error', function(error) {
    clearInterval(peerJs_peer)

    console.log('peerJs peer error: ' + error)
  })
  peerJs_peer.on('connection', function(connect) {
    console.log('prerJs peer connect')

    connect.on('data', function(data) {
      console.log('peerJs peer data: ' + data)
    })
  })
}, 1000)
let peerJs_peer_id
let peerJs_connect = setInterval(function() {
  peerJs_connect_id = telegram_id

  peerJs_connect = peerJs_peer.connect(peerJs_connect_id)

  peerJs_connect.on('open', function() {
    clearInterval(peerJs_connect)

    console.log('peerJs connect open')
  })
  peerJs_connect.on('error', function(error) {
    clearInterval(peerJs_connect)

    console.log('peerJs connect error: ' + error)
  })
  peerJs_connect.on('data', function(data) {
    console.log('peerJs connect data: ' + data)
  })


}, 1000)
let peerJs_connect_id
let peerJs_connect_server = setInterval(function() {
  peerJs_connect.send(JSON.stringify(party_server))

  console.log()
}, 1000)
let peerJs_connect_client = function(data) {
  party_client = JSON.parse(data)

  console.log()
}
// party
let party_client
let party_server
let party_server_data = function(data) {
  if (!data) {
    party_data = {
      name: 'list',
      peerJs_peer_id: peerJs_peer_id,
      geolocation_x: geolocation_x,
      geolocation_y: geolocation_y
    }
  }
  if (data == list) {
    party_data = {
      name: 'list',
      peerJs_peer_id: peerJs_peer_id,
      geolocation_x: geolocation_x,
      geolocation_y: geolocation_y
    }
  }
  if (data == 'create') {
    party_data = {
      name: 'create',
      peerJs_peer_id: peerJs_peer_id,
      geolocation_x: geolocation_x,
      geolocation_y: geolocation_y
    }
  }
  if (data == 'connect') {
    party_data = {
      name: 'connect',
      party: 'id',
      peerJs_peer_id: peerJs_peer_id,
      geolocation_x: geolocation_x,
      geolocation_y: geolocation_y
    }
  }
}
let party_server_data_create = setInterval(function() {
  
})
// page
let page_party = setInterval(function() {
  if (!document.querySelector('.page-party')) {
    page_party_grid()
  }
}, 100)
let page_party_grid = function() {
  let name

  name = document.createElement('div')
  name.className = 'page-party-grid'
  name.style.cssText =
  `
  width: 100vw;
  height: 100vh;
  background-color: grey;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 1fr 10vh;
  grid-template-areas:
  "page-party-grid-list-grid"
  "page-party-grid-button-grid";
  `

  document.querySelector('body').append(name)
}
let page_party_grid_button = setInterval(function() {
  if (!document.querySelector('.page-party-button-grid')) {
    page_party_grid_button_grid()
  }
}, 100)
let page_party_grid_button_grid = function() {
  let name

  name = document.createElement('div')
  name.className = 'page-party-grid-button-grid'
  name.style.cssText =
  `
  background-color: red;
  grid-area: page-party-grid-button-grid;

  `

  document.querySelector('.page-party-grid').append(name)

  document.querySelector('.page-party-grid-button-grid').onclick = function() {
    party_message_data('create')
  }
}
let page_party_grid_button_text = function() {
  let name

  name = document.createElement('div')
  name.className = 'page-party-grid-button-text'
  name.textContent = 'create'
  name.style.cssText =
  `
  background-color: white;
  text-align: center;

  `

  document.querySelector('.page-party-grid-button-grid').append(name)
}
let page_party_grid_list = setInterval(function() {
  if (!document.querySelector('.page-party-grid-list-grid')) {
    page_party_grid_list_grid()
  }
}, 100)
let page_party_grid_list_grid = function() {
  let name

  name = document.createElement('div')
  name.className = 'page-party-grid-list-grid'
  name.style.cssText =
  `
  background-color: blue;
  overflow-y: auto;
  grid-area: page-party-grid-list-grid;
  `

  document.querySelector('.page-party-grid').append(name)
}
let page_party_grid_list_grid_block = setInterval(function() {
  document.querySelector('.page-party-grid-list-grid').innerHTML = ''

  for (var i = 0; i < party_client.length; i++) {
    page_party_grid_list_grid_block_grid(i)
    page_party_grid_list_grid_block_grid_distance(i)
    page_party_grid_list_grid_block_grid_distance_text(i, party_client[i].distance)
    page_party_grid_list_grid_block_grid_people(i)
    page_party_grid_list_grid_block_grid_people_text(i, party_client[i].people)
  }
}, 100)
let page_party_grid_list_grid_block_grid = function(number) {
  let name

  name = document.createElement('div')
  name.className = 'page-party-grid-list-grid-block-grid-' + number
  name.style.cssText =
  `
  width: 100%;
  height: 10vh;
  background-color: orange;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 100%;
  grid-template-areas:
  "page-party-grid-list-grid-block-grid-distance page-party-grid-list-grid-block-grid-people";
  `

  document.querySelector('.page-party-grid-list-grid').append(name)

  document.querySelector('.page-party-grid-list-grid-block-grid-' + number).onclick = function() {
    party_message_data('connect')
  }
}
let page_party_grid_list_grid_block_grid_distance = function(number) {
  let name

  name = document.createElement('div')
  name.className = 'page-party-grid-list-grid-block-grid-distance-' + number
  name.style.cssText =
  `
  background-color: red;
  border-radius: 10px 0px 0px 10px;
  margin-top: 10px;
  margin-left:10px;
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
  grid-area: page-party-grid-list-grid-block-grid-distance;
  `

  document.querySelector('.page-party-grid-list-grid-block-grid-' + number).append(name)
}
let page_party_grid_list_grid_block_grid_distance_text = function(number, data) {
  var name

  name = document.createElement('div')
  name.textContent = 'distance: ' + data
  name.className = 'page-party-grid-list-grid-block-grid-distance-text-' + number
  name.style.cssText =
  `
  text-align: center;
  color: white;
  `

  document.querySelector('.page-party-grid-list-grid-block-grid-distance-' + number).append(name)
}
let page_party_grid_list_grid_block_grid_people = function(number) {
  var name

  name = document.createElement('div')
  name.className = 'page-party-grid-list-grid-block-grid-people-' + number
  name.style.cssText =
  `
  background-color: blue;
  border-radius: 0px 10px 10px 0px;
  margin-top: 10px;
  margin-right:10px;
  border-top: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  grid-area: page-party-grid-list-grid-block-grid-people;
  `

  document.querySelector('.page-party-grid-list-grid-block-grid-' + number).append(name)
}
let page_party_grid_list_grid_block_grid_people_text = function(number, data) {
  var name

  name = document.createElement('div')
  name.textContent = 'people: ' + data
  name.className = 'page-party-grid-list-grid-block-grid-people-text-' + number
  name.style.cssText =
  `
  text-align: center;
  color: white;
  `

  document.querySelector('.page-party-grid-list-grid-block-grid-people-' + number).append(name)
}



if (!party_client) {
  party_client = []
}
for (var i = 0; i < 20; i++) {
  party_client[i] = {
    distance: i,
    people: i
  }
}