console.log('Hello World!');

console.log('ok')

//peer js
var peer = new Peer()

peer.on('open', function(id) {
  alert('id')
  console.log('id: ' + id)
});

peer.on('error', function(error) {
  alert(error)
  console.log('error: ' + error)
});