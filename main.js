console.log('Hello World!');

console.log('ok')

//peer js
var peer = new Peer()

peer.on('open', function(id) {
  document.write('<td>')
  console.log('id: ' + id)
});
