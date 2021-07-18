let express = require('express');

let app = express();

app.get('/user', (req, res) => {
  console.log(req);
  res.json({name: 'Oops'})
})
app.listen(3000, () => {
  console.log('listen on 3000 ~~~~');
})