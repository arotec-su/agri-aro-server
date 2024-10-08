const { getTokenHeader } = require("../auth");
const { verifyField, verifyDevice, associateUser, hasUser, getUserData, addField, updateField, deleteField } = require("../firebase");
const { verifyToken } = require("../jwt");

async function InviteFriendRoute(req, res) {
    const { friendEmail, field_id } = req.body;


    const token = getTokenHeader(req);

    if (!token || !friendEmail || !field_id) {
        res.send({
            status: 'failed',
            message: 'Invalid request'
        })
        return;
    }
    const data = verifyToken(token);
    const { uid } = data;

    const user_data = await getUserData(uid);
    const field = await verifyField(field_id);

    if (field == null) {
        res.send({
            status: "failed",
            message: "Invalid field"
        })
        return;
    }

    if (field.user_id !== uid) {
        res.send({
            status: "failed",
            message: "Invalid owner user"
        })
        return;
    }

    if (friendEmail == user_data.email) {
        res.send({
            status: "failed",
            message: "Already owns the field"
        })
        return;
    }

    if (!(await hasUser(friendEmail))) {

        res.send({
            status: 'failed',
            message: 'Friend not exists'
        })
        return;
    }

    const associados = field.associates ?? [];

    if (associados.length > 0) {

    }
    if (associados.findIndex((_as) => {
        if (_as.email == friendEmail) return true;
        return false;
    }) != -1) {
        res.send({
            status: "failed",
            message: "Already associated user"
        })
        return;
    }


    const user_associate = await associateUser(field.id, friendEmail);

    if (user_associate) {
        res.send({
            status: "success",
            data: {
                nome: user_associate.nome,
                email: user_associate.email
            },
            message: "User associated"
        })
    }
    else {
        res.send({
            status: "failed",
            message: "Unknown error"
        })
    }



}

/*
 if (field.user_id !== uid) {
        res.send({
            status: "failed",
            message: "Invalid owner user"
        })
        return;
    }
*/
// Setup Route

async function AddFieldRoute(req, res) {

    const { field_name, field_size, device_id,
        position, tipo_solo,
        tipo_cultura, address
    } = req.body;

    const token = getTokenHeader(req);


    if (!token || !field_name || !device_id
        || !position || !field_size || !tipo_solo || !tipo_cultura || !address
    ) {
        res.send({
            status: 'failed',
            message: 'Invalid request'
        })
        return;
    }

    if (!('latitude' in position && 'longitude' in position)) {
        res.send({
            status: 'failed',
            message: 'Invalid request'
        })
        return;
    }


    const data = verifyToken(token);

    const { uid } = data;


    const device = await verifyDevice(device_id);

    if (device == null) {
        res.send({
            status: 'failed',
            message: 'Device not exists'
        })
        return;
    }
    else if (device.user_id && device.field_id) {
        res.send({
            status: 'failed',
            message: 'Device is already being used'
        })
        return;
    }

    await addField(device_id, uid, {
        field_name,
        position,
        tipo_solo,
        tipo_cultura,
        address,
        field_size
    })
    res.send({
        status: 'success',
        message: 'Field created'
    })

}

async function GetFieldRoute(req, res) {

    const { id } = req.params;
    const field = await verifyField(id);

    if (field == null) {
        res.send({
            status: "failed",
            message: "Invalid Field"
        })
    }

    else {
        res.send({
            status: "success",
            message: "Valid Field",
            data: field
        })
    }


}


async function UpdateFieldRoute(req, res) {

    const { updates } = req.body;
    const { id } = req.params;


    const token = getTokenHeader(req);

    if (!token || !updates) {
        res.send({
            status: 'failed',
            message: 'Invalid request'
        })
        return;
    }

    if ('position' in updates) {
        if (!('latitude' in updates.position && 'longitude' in updates.position)) {
            res.send({
                status: 'failed',
                message: 'Invalid request'
            })
            return;
        }
    }

    const data = verifyToken(token);

    const { uid } = data;

    const field = await verifyField(id);

    if (field == null) {
        res.send({
            status: "failed",
            message: "Invalid field"
        })
        return;
    }

    if (field.user_id !== uid) {
        res.send({
            status: "failed",
            message: "Invalid owner user"
        })
        return;
    }


    if ('device_id' in updates) {
        if (!('device_id_last' in updates)) {
            res.send({
                status: 'failed',
                message: 'Invalid request'
            })
            return;

        }
        const device = await verifyDevice(updates.device_id);

        if (device == null) {
            res.send({
                status: 'failed',
                message: 'Device not exists'
            })
            return;
        }
        else if (device.user_id && device.field_id) {
            res.send({
                status: 'failed',
                message: 'Device is already being used'
            })
            return;
        }

    }

    await updateField(id, updates, uid)
    res.send({
        status: 'success',
        message: 'Field updated'
    })

}

async function DeleteFieldRoute(req, res){
    const { id } = req.params;


    const token = getTokenHeader(req);
    if (!token) {
        res.send({
            status: 'failed',
            message: 'Invalid request'
        })
        return;
    }

    const data = verifyToken(token);

    const { uid } = data;

    const field = await verifyField(id);

    if (field == null) {
        res.send({
            status: "failed",
            message: "Invalid field"
        })
        return;
    }

    if (field.user_id !== uid) {
        res.send({
            status: "failed",
            message: "Invalid owner user"
        })
        return;
    }

    await deleteField(id, field.device_id)
    res.send({
        status: 'success',
        message: 'Field deleted'
    })


}

module.exports = {
    InviteFriendRoute,
    GetFieldRoute,
    AddFieldRoute, UpdateFieldRoute, 
    DeleteFieldRoute
}
