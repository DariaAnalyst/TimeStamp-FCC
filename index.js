// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => res.sendFile(__dirname + '/views/index.html'));

// handle returning a timestamp
app.get('/api/timestamp/:date?', (req, res) => {
  let date = new Date();
  if (req.param.date) {
    let unixDate = +req.param.date;
    date = isNan(unixDate) ? new Date(req.params.date) : new Date(unixDate);
    if (date.toString() === 'Invalid Date') {
      res.json({error: date.toString()});
    }
    return res.json({unix: date.getTime(), utc: date.toUTCString()});
}});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => console.log('Your app is listening on port ' + listener.address().port));
