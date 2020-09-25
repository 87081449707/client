/////////////////////////////////////////////////////////////////
// webRTC
// icon
let google = {
  map: function(geolocation) {
    window.open('https://www.google.com/maps/@' + geolocation.x + ',' + geolocation.y + ',12z')
  }
}
let geolocation = {
  x: undefined,
  y: undefined,
  interval: setInterval(function() {
    if (!geolocation.x && !geolocation.y) {
      navigator.geolocation.getCurrentPosition(navigator.geolocation.position, navigator.geolocation.error)
      
      navigator.geolocation.position = function(position) {
        geolocation.x = position.coords.latitude
        geolocation.y = position.coords.longitude

        console.log('geolocation.x: ' + navigator.geolocation.x)
        console.log('geolocation.y: ' + navigator.geolocation.y)

        clearInterval(geolocation.interval)
      }
      navigator.geolocation.error = function(error) {
        console.log('navigator.geolocation error: ' + error)

        clearInterval(geolocation.interval)
      }
    }
  }, 1000),
}
let telegram = {
  id: undefined,
  xhr: undefined,
  interval: setInterval(function() {
    telegram.xhr = new XMLHttpRequest()

    telegram.xhr.onload = function() {
      clearInterval(telegram.interval)

      telegram.id = JSON.parse(telegram.xhr.responseText).result[JSON.parse(telegram.xhr.responseText).result.length - 1].message.text

      console.log('telegram.id: ' + telegram.id)
    }
    telegram.xhr.onerror = function() {
      clearInterval(telegram.interval)

      console.log('telegram.id error')
    }

    telegram.xhr.open('GET', 'https://api.telegram.org/bot1281235712:AAH8j6p2BIW2BDd3wPPZdoD3abIAyyoB4Yk/getUpdates', false)
    telegram.xhr.send()
  }, 1000),
}
let peerJs = {
  peer: undefined,
  connect: undefined,
  interval: setInterval(function() {
    if (!peerJs.peer) {
      peerJs.peer = new Peer()

      peerJs.peer.on('open', function(id) {
        console.log('peerJs.peer open')
      })
      peerJs.peer.on('error', function(error) {
        console.log('peerJs.peer error: ' + error)
      })
      peerJs.peer.on('connection', function(connect) {
        console.log('prerJs.peer connect')

        connect.on('data', function(data) {
          console.log('peerJs.peer data: ' + data)
        })
      })
    }
    if (!peerJs.connect) {
      peerJs.connect = peerJs.peer.connect(telegram.id)

      peerJs.connect.on('open', function() {
        console.log('peerJs.connect open')
      })
      peerJs.connect.on('error', function(error) {
        console.log('peerJs.connect error: ' + error)
      })
      peerJs.connect.on('data', function(data) {
        console.log('peerJs.connect data: ' + data)
      })
    }
    if (peerJs.peer && peerJs.connect) {
      clearInterval(peerJs.interval)
    }
    //peerJs.connect.send(JSON.stringify(party.server))
  }, 1000),
}
let html = {
  party: {
    div: {
      grid: function() {
      let div

      div = document.createElement('div')
      div.className = 'html-party-grid'
      div.style.cssText =
      `
      width: 100vw;
      height: 100vh;
      background-color: grey;
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 1fr 10vh;
      grid-template-areas:
      "html-party-list-grid"
      "html-party-button-grid";
      `

      document.querySelector('body').append(div)
    },
      interval: setInterval(function() {
      if (!document.querySelector('.html-party-grid')) {
        html.party.grid()
      }
      if (!document.querySelector('.html-party-button-grid')) {
        html.party.button.grid()
      }
      if (!document.querySelector('.html-party-list-grid')) {
        html.party.list.grid()
      }

      document.querySelector('.html-party-list-grid').innerHTML = ""

      for (var i = 0; i < 3; i++) {
        html.party.list.block.grid(i)
        html.party.list.block.distance.grid(i)
        html.party.list.block.people.grid(i)
      }
    }, 1000),
    },
    button: {
      div: {
        grid: function() {
        let div

        div = document.createElement('div')
        div.className = 'html-party-button-grid'
        div.style.cssText =
        `
        background-color: black;
        grid-area: html-party-button-grid;

        `

        document.querySelector('.html-party-grid').append(div)
      },
        interval: setInterval(function() {
        
      }, 100),
      },
    },
    list: {
      div: {
      grid: function() {
        let div

        div = document.createElement('div')
        div.className = 'html-party-list-grid'
        div.style.cssText =
        `
        width: 100%;
        height: 100%;
        background-color: blue;
        grid-area: html-party-list-grid;
        `

        document.querySelector('.html-party-grid').append(div)
      },
      
      }
      block: {
        grid: function(data) {
          let div

          div = document.createElement('div')
          div.className = 'html-party-list-block-grid-' + data
          div.style.cssText =
          `
          width: 100%;
          height: 10vh;
          background-color: orange;
          display: grid;
          grid-template-columns: 50% 50%;
          grid-template-rows: 100%;
          grid-template-areas:
          "html-party-list-block-distance-grid html-party-list-block-people-grid";
          `

          document.querySelector('.html-party-list-grid').append(div)
        },
        distance: {
          grid: function(data) {
            let div

            div = document.createElement('div')
            div.className = 'html-party-list-block-distance-grid-' + data
            div.style.cssText =
            `
            background-color: green;
            grid-area: html-party-list-block-distance-grid;
            `

            document.querySelector('.html-party-list-block-grid-' + data).append(div)
          },
        },
        people: {
          grid: function(data) {
            let div

            div = document.createElement('div')
            div.className = 'html-party-list-block-people-grid-' + data
            div.style.cssText =
            `
            background-color: yellow;
            grid-area: html-party-list-block-people-grid;
            `

            document.querySelector('.html-party-list-block-grid-' + data).append(div)
          },
        },
      },
    },
  },
}
let party = {
  list: undefined,
  data: {
    name: undefined,
    id: undefined,
    geolocation: {
      x: undefined,
      y: undefined,
    },
    interval: setInterval(function() {
      party.data.id = peerJs.peer.id
      party.data.geolocation.x = geolocation.x
      party.data.geolocation.y = geolocation.y
    },
      1000),
  },
  action: function(data) {
    if (data == 'list') {
      party.data.name = 'list'
    }
    if (data == 'create') {
      party.data.name = 'create'
    }
    if (data == 'connect') {
      party.data.name = 'connect'
    }
  },
}