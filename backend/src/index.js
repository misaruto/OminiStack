const expreess = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = expreess();

app.use(cors());
app.use(expreess.json());
app.use(routes);
app.listen(3333);