const express = require('express')
const bodyParser =require('body-parser');
require('dotenv').config();

const { getServerIP } = require('./server_info');

const { HomeRoute } = require('./routes/home');
const { CreateUserRoute, LoginUserRoute, VerifyUserRoute
 } = require('./routes/users');
const { VerifyDeviceRoute, DeviceSendDataRoute } = require('./routes/devices');


const app = express()
app.use(bodyParser.json())
const port = process.env.PORT || 5999;

app.get('/', HomeRoute);
app.post('/users/verify', VerifyUserRoute);
app.post('/users', CreateUserRoute);
app.post('/login', LoginUserRoute);


app.get('/devices/verify/:id', VerifyDeviceRoute);
app.post('/devices/send', DeviceSendDataRoute);


app.listen(port, async () => {
   const ip =  await getServerIP();
  console.log(`Rodando na porta ${port}\nLink: http://${ip}:${port}`)
})