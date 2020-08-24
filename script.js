console.log('Hello world')
// webRTC

// icon

// compas


// geolocation
var geolocation_x
var geolocation_y
var geolocation_position = function(position) {
	geolocation_x = position.coords.latitude //.toFixed(7) * 10000000
	geolocation_y = position.coords.longitude //.toFixed(7) * 10000000
}
var geolocation_error = function(error) {
	//console.log('geolocation error: ' + error.message)
}

navigator.geolocation.getCurrentPosition(geolocation_position, geolocation_error)
// touchpad
document.addEventListener('touchstart', function(event) {}, false)
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
		console.log('peerJs client error: ' + error)

		clearInterval(client_connect)
	})
	client.on('connection', function(connect) {
		console.log('prerJs server connect')

		connect.on('data', function(data) {
			console.log('peerJs client data') + data

		})
	})
}, 5000)

var server
var server_id
var server_connect = setInterval(function() {
	server = client.connect(server_id)

	server.on('open', function() {
		console.log('peerJs server open')

		clearInterval(server_connect)

		server.send('hi')
	})
	server.on('error', function(error) {
		console.log('peerJs server error: ' + error)

		clearInterval(server_connect)
	})
	server.on('data', function(data) {
		console.log('peerJs server data: ' + data)

		server_receive(data)
	})
}, 5000)
var server_send = setInterval(function() {
	if (document.querySelector('.find_block')) {
		server.send(JSON.stringify({
			party: 'party_find',
			client_id: client_id,
			geolocation_x: geolocation_x,
			geolocation_y: geolocation_y
		}))
	}
	if (document.querySelector('.create_block')) {
		server.send(JSON.stringify({
			party: 'party_create',
			client_id: client_id,
			geolocation_x: geolocation_x,
			geolocation_y: geolocation_y
		}))
	}
}, 5000)
var server_receive = function(data) {
	if (data.party == 'party_find') {
		for (var i = 0; i < data.length; i++) {
			party_find[i] = data[i]
		}
	}
	if (data.party == 'party_create') {
		for (var i = 0; i < data.length; i++) {
			party_create[i] = data[i]
		}
	}
}
// telegram
var telegram
var telegram_send = setInterval(function() {
	clearInterval(telegram_send)

	// xmlHTTPrequest
	var xml = new XMLHttpRequest()

	xml.open('GET', 'https://api.telegram.org/bot1281235712:AAH8j6p2BIW2BDd3wPPZdoD3abIAyyoB4Yk/getUpdates', false)
	xml.send()
	xml.onload = function() {
		telegram_receive(xml.responseText)
	}
	xml.onerror = function() {
		console.log('xml error')
	}
}, 100)
var telegram_receive = function(data) {
	console.log('peerJs server id: ' + JSON.parse(data).result[JSON.parse(data).result.length - 1].message.text)

	server_id = JSON.parse(data).result[JSON.parse(data).result.length - 1].message.text
}
// party
var party_find
var party_create
var party_connect
// page
var page_party = setInterval(function() {
	clearInterval(page_party)

	var party_block

	party_block = document.createElement('div')
	party_block.className = 'party_block'
	party_block.style.cssText =
	`
	width: 100vw;
	height: 100vh;
	background-color: black;
	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: 1fr 20vw;
	grid-template-areas:
	"party_page"
	"party_button";
	`

	document.body.append(party_block)

	var party_page

	party_page = document.createElement('div')
	party_page.className = 'party_page'
	party_page.style.cssText =
	`
	grid-area: party_page;
	background-color: grey;
	overflow-y: auto;
	`

	document.querySelector('.party_block').append(party_page)

	var party_button

	party_button = document.createElement('div')
	party_button.className = 'party_button'
	party_button.style.cssText =
	`
	grid-area: party_button;
	width: 100%;
	height: 100%;
	background-color: green;
	display: grid;
	grid-template-columns: 25% 25% 25% 25%;
	grid-template-rows: 100%;
	grid-template-areas:
	"party_button_find party_button_create party_button_signal party_button_help";
	`

	document.querySelector('.party_block').append(party_button)

	var party_button_find

	party_button_find = document.createElement('div')
	party_button_find.className = 'party_button_find'
	party_button_find.style.cssText =
	`
	grid-area: party_button_find;
	background-color: #A6A600;
	`

	document.querySelector('.party_button').append(party_button_find)

	document.querySelector('.party_button_find').onclick = function() {
		page_find()
	}

	var party_button_create

	party_button_create = document.createElement('div')
	party_button_create.className = 'party_button_create'
	party_button_create.style.cssText =
	`
	grid-area: party_button_create;
	background-color: #006363;
	`

	document.querySelector('.party_button').append(party_button_create)

	document.querySelector('.party_button_create').onclick = function() {
		page_create()
	}

	var party_button_signal

	party_button_signal = document.createElement('div')
	party_button_signal.className = 'party_button_signal'
	party_button_signal.style.cssText =
	`
	grid-area: party_button_signal;
	background-color: #A64B00;
	`

	document.querySelector('.party_button').append(party_button_signal)

	document.querySelector('.party_button_signal').onclick = function() {
		page_signal()
	}

	var party_button_help

	party_button_help = document.createElement('div')
	party_button_help.className = 'party_button_help'
	party_button_help.style.cssText =
	`
	grid-area: party_button_help;
	background-color: #48036F;
	`

	document.querySelector('.party_button').append(party_button_help)

	document.querySelector('.party_button_help').onclick = function() {
		page_help()
	}
}, 100)
var page_party_load = setInterval(function() {
	if (document.querySelector('.party_block')) {
		clearInterval(page_party_load)

		page_find()
	}
}, 100)
var page_find = function() {
	document.querySelector('.party_page').innerHTML = ''

	var find_block

	find_block = document.createElement('div')
	find_block.className = 'find_block'
	find_block.style.cssText =
	`
	width: 100%;
	height: 100%;
	background-color: black;
	`

	document.querySelector('.party_page').append(find_block)
}
var page_find_list = function(data, number) {
	var find_list_block

	find_list_block = document.createElement('div')
	find_list_block.className = 'find_list_block_' + number
	find_list_block.style.cssText =
	`
	width: 100%;
	height: 20vw;
	background-color: black;
	display: grid;
	grid-template-columns: 50% 50%;
	grid-template-rows: 100%;
	grid-template-areas:
	"find_list_distance find_list_people";
	`

	document.querySelector('.find_block').append(find_list_block)

	document.querySelector('.find_list_block_' + number).onclick = function () {
		//window.open('https://www.google.com/maps/@' + party[number].geolocation.x + ',' + party[number].geolocation.y)
		//window.open('https://www.google.com/maps/place/@52.0464544,76.9242894,16z')
	}

	var find_list_distance

	find_list_distance = document.createElement('div')
	find_list_distance.className = 'find_list_distance_' + number
	find_list_distance.style.cssText =
	`
	grid-area: find_list_distance;
	background-color: orange;
	`

	document.querySelector('.find_list_block_' + number).append(find_list_distance)

	var find_list_distance_text

	find_list_distance_text = document.createElement('div')
	find_list_distance_text.textContent = 'distance: ' + data.distance
	find_list_distance_text.className = 'find_list_distance_text_' + number
	find_list_distance_text.style.cssText =
	`
	text-align: center;
	color: white;
	`

	document.querySelector('.find_list_distance_' + number).append(find_list_distance_text)

	var find_list_people

	find_list_people = document.createElement('div')
	find_list_people.className = 'find_list_people_' + number
	find_list_people.style.cssText =
	`
	grid-area: find_list_people;
	background-color: orange;
	`

	document.querySelector('.find_list_block_' + number).append(find_list_people)

	var find_list_people_text

	find_list_people_text = document.createElement('div')
	find_list_people_text.textContent = 'people: ' + data.people
	find_list_people_text.className = 'find_list_people_text_' + number
	find_list_people_text.style.cssText =
	`
	text-align: center;
	color: white;
	`

	document.querySelector('.find_list_people_' + number).append(find_list_people_text)
}
var page_find_list_add = setInterval(function() {
	if (document.querySelector('.find_block')) {
		document.querySelector('.find_block').innerHTML = ''

		for (var i = 0; i < party_find.length; i++) {
			page_find_list(party_find[i], i)
		}
	}
}, 100)
var page_connect = function() {
  document.querySelector('.party_page').innerHTML = ''

	var connect_block

	connect_block = document.createElement('div')
	connect_block.className = 'connect_block'
	connect_block.style.cssText =
	`
	width: 100%;
	height: 100%;
	background-color: black;
	`

	document.querySelector('.party_page').append(connect_block)
}
var page_connect_list = function() {
  var block_find_list

	block_find_list = document.createElement('div')
	block_find_list.className = 'block_find_list_' + number
	block_find_list.style.cssText =
	`
	width: 100%;
	height: 20vw;
	background-color: black;
	display: grid;
	grid-template-columns: 50% 50%;
	grid-template-rows: 100%;
	grid-template-areas:
	"distance_find_list people_find_list";
	`

}
var page_connect_add = setInterval(function() {
	
}, 100)
var page_create = function() {
	document.querySelector('.party_page').innerHTML = ''

	var create_block

	create_block = document.createElement('div')
	create_block.className = 'create_block'
	create_block.style.cssText =
	`
	width: 100vw;
	height: 100vh;
	background-color: black;
	`

	document.querySelector('.party_page').append(create_block)
}
var page_create_list = function (data, number) {
	var create_list_block

	create_list_block = document.createElement('div')
	create_list_block.className = 'create_list_block_' + number
	create_list_block.style.cssText =
	`
	width: 100vw;
	height: 20vw;
	background-color: black;
	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: 100%;
	grid-template-areas:
	"create_list_distance";
	`

	document.querySelector('.create_block').append(create_list_block)

	var create_list_distance

	create_list_distance = document.createElement('div')
	create_list_distance.className = 'create_list_distance_' + number
	create_list_distance.style.cssText =
	`
	grid-area: create_list_distance;
	background-color: orange;
	`

	document.querySelector('.create_list_block_' + number).append(create_list_distance)

	var create_list_distance_text

	create_list_distance_text = document.createElement('div')
	create_list_distance_text.textContent = 'distance: ' + data.distance
	create_list_distance_text.className = 'create_list_distance_text_' + number
	create_list_distance_text.style.cssText =
	`
	text-align: center;
	color: white;
	`

	document.querySelector('.create_list_distance_' + number).append(create_list_distance_text)
}
var page_create_list_add = setInterval(function() {
	if (document.querySelector('.create_block')) {
		document.querySelector('.create_block').innerHTML = ''

		for (var i = 0; i < party_create.length; i++) {
			page_create_list(party_create[i], i)
		}
	}
}, 100)
var page_signal = function() {
	document.querySelector('.party_page').innerHTML = ''

	var color
	var play = setInterval(function() {
		if (!color) {
			color = 'white'
		}
		if (color == 'white') {
			document.querySelector('.party_page').style.background = 'white'
			color = 'black'
			return
		}

		if (color == 'black') {
			document.querySelector('.party_page').style.background = 'black'
			color = 'white'
			return
		}
	},
		1000 / 3)
}
var page_help = function() {
	document.querySelector('.party_page').innerHTML = ''

	var help_block

	help_block = document.createElement('div')
	help_block.className = 'help_block'
	help_block.style.cssText =
	`
	width: 100%;
	height: 100%;
	background-color: black;
	`

	document.querySelector('.party_page').append(help_block)

	document.querySelector('.help_block').onclick = function() {
		console.log(document.querySelector('.help_block').length)
	}
}
var page_help_image = function(number) {
	document.querySelector('.help_block').innerHTML = ''

	var help_image

	help_image = document.createElement('IMG')
	help_image.src = 'help_image_' + number + '.jpg'
	help_image.style.cssText =
	`
	width: 100%;
	height: 100%
	vertical-align: middle;
	horisontal-align: middle;
	`

	document.querySelector('.help_block').append(help_image)
}
var page_help_image_load = setInterval(function() {
	if (document.querySelector('.help_block')) {
		if (document.querySelector('.help_block').length == undefined) {
			page_help_image(0)
		}
	}
}, 100)

party_find = []
for (var i = 0; i < 10; i++) {
	party_find[i] = {
		distance: 10,
		people: 10
	}
}

party_create = []
for (var i = 0; i < 10; i++) {
	party_create[i] = {
		distance: 10,
	}
}