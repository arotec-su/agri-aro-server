require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const { createServer } = require("http");

const { getServerIP } = require('./server_info');

const { HomeRoute } = require('./routes/home');
const { CreateUserRoute, LoginUserRoute, VerifyUserRoute, UserDataRoute, UserSetupRoute
} = require('./routes/users');
const { VerifyDeviceRoute, DeviceSendDataRoute, DeviceDataRoute, DataSensDeviceRoute } = require('./routes/devices');
const {initServerSocket} = require('./socket')


const MODE = process.env.MODE || 'PRODUCTION';
const PORT = process.env.PORT || 5999;

const corsConfig = {
  origin: MODE == 'DEV' ? '*' : ['https://agriaro.arotec.ao']
};

const app = express()
app.use(bodyParser.json())
app.use(cors(corsConfig))
const server = createServer(app, {
  cors: corsConfig
});

initServerSocket(server, corsConfig);



app.get('/', HomeRoute);
app.post('/users/verify', VerifyUserRoute);
app.post('/users', CreateUserRoute);
app.post('/login', LoginUserRoute);
app.post('/users/data', UserDataRoute);
app.post('/users/setup', UserSetupRoute);



app.get('/devices/verify/:id', VerifyDeviceRoute);
app.post('/devices/:id/data_sens', DataSensDeviceRoute);
app.post('/devices/send', DeviceSendDataRoute);
app.post('/devices/:id', DeviceDataRoute);



server.listen(PORT, async () => {
  const ip = await getServerIP();
  console.log(`Rodando na porta ${PORT}\nLink: http://${ip}:${PORT}`)
})