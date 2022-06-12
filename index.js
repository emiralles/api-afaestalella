const app = require('./src/api');
const config = require('./config');

app.listen(config.port,()=> console.log(`App is listening on url http://localhost:${config.port}`))