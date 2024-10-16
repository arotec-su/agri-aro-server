require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const { createServer } = require("http");

const { getServerIP, getClientIP } = require('./server_info');

const { HomeRoute } = require('./routes/home');
const { CreateUserRoute, LoginUserRoute, VerifyUserRoute, UserDataRoute, CustomTokenUserRoute, UpdatePasswordRoute
} = require('./routes/users');
const { VerifyDeviceRoute, DeviceSendDataRoute, DeviceDataRoute, DataSensDeviceRoute } = require('./routes/devices');
const {initServerSocket} = require('./socket');
const { authMiddleware } = require('./middleware');
const { InviteFriendRoute, AddFieldRoute, GetFieldRoute, UpdateFieldRoute, DeleteFieldRoute, DeleteInviteRoute } = require('./routes/fields');
const { initJob } = require('./services/jobs');


const MODE = process.env.MODE || 'PRODUCTION';
const PORT = process.env.PORT || 5999;

const corsConfig = {
  origin: MODE == 'DEV' ? '*' : ['https://agriaro.arotec.ao']
};

const app = express()
app.use(bodyParser.json())
app.use(cors(corsConfig))

//Show request data
app.use( function(req, res, next){
  const ip =getClientIP(req);
  console.log(`\x1b[42m ${req.method} \x1b[0m ${ip == '1' ? '' : ip}  ${req.url}`)
  next();
})

app.use(express.static('public'))

const server = createServer(app, {
  cors: corsConfig
});

initServerSocket(server, corsConfig);
initJob();


app.get('/', HomeRoute);
app.get('/users/verify', authMiddleware,  VerifyUserRoute);
app.post('/users', CreateUserRoute);
app.post('/login', LoginUserRoute);
app.get('/users/data',authMiddleware,  UserDataRoute);
app.get('/users/custom-token',authMiddleware, CustomTokenUserRoute);
app.post('/users/update/password',authMiddleware, UpdatePasswordRoute);

app.post('/fields/:field_id/invites', authMiddleware, InviteFriendRoute);
app.delete('/fields/:field_id/invites/:email', authMiddleware, DeleteInviteRoute);
app.post('/fields',authMiddleware, AddFieldRoute);
app.get('/fields/:id',authMiddleware, GetFieldRoute);
app.put('/fields/:id',authMiddleware, UpdateFieldRoute);
app.delete('/fields/:id',authMiddleware, DeleteFieldRoute);


app.get('/devices/verify/:id', VerifyDeviceRoute);
app.get('/devices/:id/data_sens', authMiddleware,  DataSensDeviceRoute);
app.post('/devices/send', DeviceSendDataRoute);
app.get('/devices/:id', DeviceDataRoute);



server.listen(PORT, async () => {
  const ip = await getServerIP();
  console.log(`\x1b[32mRunning in port ${PORT}\x1b[0m\n Address: ${ip}:${PORT}\n`)
})