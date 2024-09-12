const { verifyDevice, saveDataOfDevice, getUserData, getDevicesOfUser, hasUserById } = require("../firebase");
const { verifyToken } = require("../jwt");


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
    const { T, UA, US, DEVICE_ID } = req.body;


    if (!T || !UA || !US || !DEVICE_ID){
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

    console.log( {
        temperatura: T,
        umidade_ambiental: UA,
        umidade_solo: US
    });
    return;
    await saveDataOfDevice(DEVICE_ID,
        {
            temperatura: T,
            umidade_ambiental: UA,
            umidade_solo: US
        }
    )


    //enviar via websocket



    res.send({
        status: "success",
    })

}

async function DeviceDataRoute(req, res){

    const { token } = req.body;

    //id do device
    const {id } =req.params;

    if (!token || !id) {
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
        const device  = await verifyDevice(id);

        if (device.owner_id == uid){
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
module.exports = {
    VerifyDeviceRoute,
    DeviceSendDataRoute, 
    DeviceDataRoute
}