const { createUser, hasUser, loginUser, hasUserById, getDevicesOfUser, getUserData } = require("../firebase");
const { generateToken, verifyToken } = require("../jwt");

//Create
async function CreateUserRoute(req, res) {
    const { email, telefone, nome, password } = req.body;


    if (!email || !telefone || !nome || !password) {
        res.send({
            status: 'failed',
            message: 'Invalid request'
        })
        return;
    }
    var uid = '';
    try {


        if (await hasUser(email)) {

            res.send({
                status: 'failed',
                message: 'User exists'
            })
            return;
        }

        uid = await createUser(email, nome, telefone, password);

    }
    catch {
        res.send({
            status: 'failed',
            message: 'Invalid request'
        })
        return;
    }

    const token = generateToken({
        uid: uid,
    })

    res.send({
        token,
        user_id: uid,
        status: 'success',
    })


}

//Login
async function LoginUserRoute(req, res) {
    const { token_id } = req.body;


    if (!token_id) {
        res.send({
            status: 'failed',
            message: 'Invalid request'
        })
        return;
    }


    const uid = await loginUser(token_id);

    if (uid == '') {

        res.send({
            status: 'failed',
            message: 'Incorrect Token ID'
        })
        return;

    }

    const token = generateToken({
        uid: uid,
    })

    res.send({
        token,
        status: 'success',
    })



}

// Verificar o login
async function VerifyUserRoute(req, res) {
    const { token } = req.body;

    if (!token) {
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
        res.send({
            status: 'success',
            message: 'Valid token'
        })
    }
    else {
        res.send({
            status: 'failed',
            message: 'Invalid token'
        })
    }



}


// Pegar dados do usuario logado


async function UserDataRoute(req, res){

    const { token } = req.body;

    if (!token) {
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
        const user_data = await getUserData(uid);
        const devices  = await getDevicesOfUser(uid);

        res.send({
            status: 'success',
            user_data: {
                ...user_data
            },
            device_data: devices.map((dev)=>{
                return {
                    device_id: dev.device_id, 
                    position: dev.position
                }
            })
        })
    }
    else {
        res.send({
            status: 'failed',
            message: 'Invalid token'
        })
    }

}
module.exports = {
    CreateUserRoute,
    LoginUserRoute,
    VerifyUserRoute, 
    UserDataRoute
}