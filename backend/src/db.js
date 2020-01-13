const mongoose = require('mongoose');
const uri = `mongodb+srv://user:pass@url_bd/bd`;

export default callback => {
  // connect to a database
  const db = mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('Db Connected'))
    .catch(err => console.log(err));
  callback();
};
