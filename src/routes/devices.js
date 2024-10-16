const { Timestamp } = require("firebase-admin/firestore");
const { verifyDevice, saveDataOfDevice, getUserData, getDevicesOfUser, hasUserById, getSensData } = require("../firebase");
const { verifyToken } = require("../jwt");
const { sockets } = require("../socket");
const { getTokenHeader } = require("../auth");
const { verifySensParms } = require("../services/alerts");


async function VerifyDeviceRoute(req, res) {

    const { id } = req.params;
    const device = await verifyDevice(id);

    if (device == null) {
        res.send({
            status: "failed",
            message: "Invalid Device"
        })
    }

    else {
        res.send({
            status: "success",
            message: "Valid Device",
            ...device
        })
    }

}

async function DeviceSendDataRoute(req, res) {
    const { T, UA, US, PH, NITROGENIO, POTASSIO, FOSFORO, DEVICE_ID } = req.body;

    console.log(req.body);


    if (T == undefined || UA == undefined  || US == undefined  || PH  == undefined || NITROGENIO== undefined  || POTASSIO== undefined  || FOSFORO== undefined  || DEVICE_ID== undefined ) {
        res.send({
            status: 'failed',
            message: 'Invalid request'
        })
        return;
    }
    const device = await verifyDevice(DEVICE_ID);

    if (device == null) {
        res.send({
            status: "failed",
            message: "Invalid Device"
        })
        return;
    }

    const data = {
        temperatura: T,
        umidade_ambiental: UA,
        umidade_solo: US,
        ph: PH,
        nitrogenio: NITROGENIO,
        fosforo: FOSFORO,
        potassio: POTASSIO,  
        moment: Timestamp.now()
    };

    await saveDataOfDevice(DEVICE_ID,
        data
    )
    //enviar via websocket
    if (DEVICE_ID in sockets) {

        for (const _socket of sockets[DEVICE_ID]) {
            _socket.socket.emit('send_data', JSON.stringify(
                 {
                    ...data, 
                 moment: data.moment.toDate().getTime()

                }
            ))
        }

    }

     verifySensParms(device.field_id, data);

    res.send({
        status: "success",
    })

}

async function DeviceDataRoute(req, res) {

    const token = getTokenHeader(req);

    //id do device
    const { id } = req.params;

    if (!token || id== undefined ) {
        res.send({
            status: 'failed',
            message: 'Invalid request'
        })
        return;
    }

    const data = verifyToken(token);

    if (data == null) {
        res.send({
            status: 'failed',
            message: 'Invalid token'
        })
        return;

    }

    const { uid } = data;


    if (hasUserById(uid)) {
        const device = await verifyDevice(id);

        if (device.user_id == uid) {
            res.send({
                status: 'success',
                device_data: {
                    ...device
                }

            })
        }

    }
    else {
        res.send({
            status: 'failed',
            message: 'Invalid token'
        })
    }

}


async function DataSensDeviceRoute(req, res) {
    const {  min_date, max_date } = req.query;
    const token = getTokenHeader(req);    

    //id do device
    const { id } = req.params;

    if (!token || id== undefined  || !min_date || !max_date) {
        res.send({
            status: 'failed',
            message: 'Invalid request'
        })
        return;
    }
    
    const data = verifyToken(token);


    const device = await verifyDevice(id);

    if (device == null) {
        res.send({
            status: "failed",
            message: "Invalid Device"
        })
        return;
    }
    else if (device.user_id !== data.uid) {
        res.send({
            status: "failed",
            message: "Invalid request"
        })
        return;
    }

    const sensData = await getSensData(id, min_date, max_date);
    res.send({
        status: "success",
        data: sensData.map((d)=>{
    
            return {
                ...d, 
                moment: d.moment.toDate().getTime()
            }

        })
    })



}
module.exports = {
    VerifyDeviceRoute,
    DeviceSendDataRoute,
    DeviceDataRoute,
    DataSensDeviceRoute
}