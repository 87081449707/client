//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

      navigator.geolocation.getCurrentPosition(navigator.geolocation.position, navigator.geolocation.error)
    }
  },
    1000),
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
  },
    1000),
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
  },
    1000),
}
let webcam = {
  webcam: undefined,
  interval: setInterval(function() {
    //console.log(document.querySelector('.html-viewport-create-video'))
    if (document.querySelector('.html-viewport-create-video')) {
      clearInterval(webcam.interval)
      
      navigator.mediaDevices.getUserMedia({video: true, audio: false})
      .then(function(stream) {
        console.log('video')
        document.querySelector('.html-viewport-create-video').srcObject = stream
        document.querySelector('.html-viewport-create-video').play()
      })
      .catch(function(err) {
        console.log("An error occurred: " + err);
      });
    }
  },
    100),
}
let iconJs = {
  
}
let html = {
  interval: setInterval(function() {
    clearInterval(html.interval)

    html.div()
    html.viewport.div()
    html.button.div()
    html.button.find.div()
    html.button.create.div()
  },
    100),
  div: function() {
    let div

    div = document.createElement('div')
    div.className = 'html'
    div.style.cssText =
    `
    width: 100vw;
    height: 100vh;
    background-color: grey;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 1fr 50px;
    grid-template-areas:
    "html-viewport"
    "html-button";
    `

    document.querySelector('body').append(div)
  },
  viewport: {
    div: function() {
      let div

      div = document.createElement('div')
      div.className = 'html-viewport'
      div.style.cssText =
      `
      overflow-y: auto;
      background-color: blue;
      grid-area: html-viewport;
      `

      document.querySelector('.html').append(div)
    },
    find: {
      list: {
        /*
        interval: setInterval(function() {
        if (document.querySelector('.html-viewport')) {
          document.querySelector('.html-viewport').innerHTML = ""

          for (var i = 0; i < 100; i++) {
            html.viewport.find.list.block.div(i)
            html.viewport.find.list.block.distance.div(i)
            html.viewport.find.list.block.people.div(i)
          }
        }
      },
      100),
      */
        block: {
          div: function(data) {
            let div

            div = document.createElement('div')
            div.className = 'html-viewport-find-block-' + data
            div.style.cssText =
            `
            width: 1fr;
            height: 50px;
            background-color: orange;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr;
            grid-template-areas:
            "html-viewport-find-block-distance html-viewport-find-block-people";
            `

            document.querySelector('.html-viewport').append(div)
          },
          distance: {
            div: function(data) {
              let div

              div = document.createElement('div')
              div.className = 'html-viewport-find-block-distance-' + data
              div.style.cssText =
              `
              background-color: green;
              grid-area: html-viewport-find-block-distance;
              `

              document.querySelector('.html-viewport-find-block-' + data).append(div)
            },
          },
          people: {
            div: function(data) {
              let div

              div = document.createElement('div')
              div.className = 'html-viewport-find-block-people-' + data
              div.style.cssText =
              `
              background-color: white;
              grid-area: html-viewport-find-block-people;
              `

              document.querySelector('.html-viewport-find-block-' + data).append(div)
            },
          },
        },
      },
    },
    create: {
      interval: setInterval(function() {
        if (document.querySelector('.html-viewport')) {
          clearInterval(html.viewport.create.interval)

          html.viewport.create.video()
          
          html.viewport.create.canvas()

        }
      },
        100),
      video: function() {
        let video

        video = document.createElement('VIDEO')
        video.className = 'html-viewport-create-video'

        video.style.cssText =
        `
        width: 350px;
        height: 350px;
        background-color: green;
        `

        document.querySelector('.html-viewport').append(video)
          //console.log(document.querySelector('.html-viewport-create-video'))
      },
      canvas: function() {
        let canvas

        canvas = document.createElement('CANVAS')
        canvas.className = 'html-viewport-create-canvas'
        canvas.width = 399
        canvas.height = 499

        canvas.style.cssText =
        `
        width: 350px;
        height: 350px;
        background-color: green;
        border: 2px solid black;
        `

        document.querySelector('.html-viewport').append(canvas)
      },
      list: {
        interval: setInterval(function() {},
          100),
        block: {
          div: function(data) {
            let div

            div = document.createElement('div')
            div.className = 'html-viewport-create-list-block-' + data
            div.style.cssText =
            `
            width: 1fr;
            height: 50px;
            background-color: green;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
            grid-template-areas:
            "html-viewport-create-list-block-distance";
            `

            document.querySelector('.html-viewport').append(div)
          },
          distance: {
            div: function(data) {
              let div

              div = document.createElement('div')
              div.className = 'html-viewport-create-list-block-distance-' + data
              div.style.cssText =
              `
              background-color: orange;
              grid-area: html-viewport-create-list-block-distance;
              `

              document.querySelector('.html-viewport-create-list-block-' + data).append(div)
            },
          },
        },
      },
    },
  },
  button: {
    div: function() {
      let div

      div = document.createElement('div')
      div.className = 'html-button'
      div.style.cssText =
      `
      background-color: black;
      grid-area: html-button;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
      grid-template-areas:
      "html-button-find html-button-create";
      `

      document.querySelector('.html').append(div)
    },
    find: {
      div: function() {
        let div

        div = document.createElement('div')
        div.className = 'html-button-find'
        div.style.cssText =
        `
        background-color: red;
        grid-area: html-button-find;
        `

        document.querySelector('.html-button').append(div)
      },
    },
    create: {
      div: function() {
        let div

        div = document.createElement('div')
        div.className = 'html-button-create'
        div.style.cssText =
        `
        background-color: yellow;
        grid-area: html-button-create;
        `

        document.querySelector('.html-button').append(div)
        
        document.querySelector('.html-button').onclick = function() {
          document.querySelector('.html-viewport-create-canvas').getContext('2d').drawImage(document.querySelector('.html-viewport-create-video'), 0, 0, 300, 300)
        }
      },
    },
  },
}
/*
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
  */