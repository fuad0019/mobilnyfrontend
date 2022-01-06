const express = require('express');
const { dirname } = require('path');
const fetch = require('cross-fetch');
const app = express()
const path = require('path');
const port = process.env.PORT || 3000

app.set('view engine', 'ejs');

app.get('/', (req, res) => {

  (async () => {
    try {
      let data = await fetch('http://mobilnybackend:3000/phones');
      
      if (data.status >= 400) {
        throw new Error("Bad response from server");
      }
      
      let phones = await data.json();
    
      res.render('index',{phones: phones })
    } catch (err) {
      console.error(err);
    }
  })();
})


app.get('/:phone/models', (req, res) => {
  (async () => {
    try {
      let data = await fetch('http://mobilnybackend:3000/phones/'+req.params.phone + '/models');
      
      if (data.status >= 400) {
        throw new Error("Bad response from server");
      }
      
      let models = await data.json();
    
      res.render('Vaelg-Model',{models: models })
    } catch (err) {
      console.error(err);
    }
  })();
})


app.get('/:phone/models/:model', (req, res) => {
  (async () => {
    try {
      let data = await fetch('http://mobilnybackend:3000/phones/'+req.params.phone+ '/models/'+ req.params.model);
      
      if (data.status >= 400) {
        throw new Error("Bad response from server");
      }

      
      let model = await data.json();

    
      res.render('Produkt',{model: model })
    } catch (err) {
      console.error(err);
    }
  })();
})


app.get('/kontakt', (req, res) => {
  res.render('Kontakt')
})

app.get('/om', (req, res) => {
  res.render('om')
})


app.use(express.static(__dirname + '/public'))

app.listen(process.env.PORT || port, () => {
  console.log(`app listening at Port: ${port}`)
})

