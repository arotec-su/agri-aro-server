const { verifyDevice, saveDataOfDevice } = require("../firebase");


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

module.exports = {
    VerifyDeviceRoute,
    DeviceSendDataRoute
}