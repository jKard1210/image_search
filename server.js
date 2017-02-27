var express = require('express')
var app = express()
var Bing = require('node-bing-api')({ accKey: "7f4de2cd822c4b499a65743e9adf70f9 " });
var compHistory = [];





app.get ('/', function(req, res) {
  res.send("<h1>Image Search</h1> ")
})

app.get('/:id', function (req, res) {
var id = req.params.id;
var ans = "hello";
var offset = req.query.offset || 10;
if (id !== 'favicon.ico') {
var history = {
      "term": id,
      "when": new Date().toLocaleString()
    };
compHistory.unshift(history);

}
Bing.images(id, {
  top: offset,   // Number of results (max 50) 
  }, function(error, ram, body){
   res.send( body.value.map(makeList));
  });
  })
  
  
app.get('/search/history', function(req, res) {
     res.send(compHistory.map(function(arg) {
        // Displays only the field we need to show.
        return {
          term: arg.term,
          when: arg.when
        };
      }));
})
    

  function makeList(img) {
    // Construct object from the json result
    return {
      "snippet": img.name,
      "url": img.contentUrl,
      "thumbnail": img.thumbnailUrl,
    };
  }



  


app.listen(8080, function () {
  console.log('Example app listening on port 3000!')
})
