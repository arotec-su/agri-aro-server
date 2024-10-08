const { getTokenHeader } = require("../auth");
const { createUser, hasUser, loginUser, hasUserById, getDevicesOfUser, getUserData, verifyDevice, getFieldsOfUser, generateCustomTokenUser, verifyPassword, updatePassword } = require("../firebase");
const { generateToken, verifyToken } = require("../jwt");

//Create
async function CreateUserRoute(req, res) {
    var { email, telefone, nome, password } = req.body;


    if (!email || !telefone || !nome || !password) {
        res.send({
            status: 'failed',
            message: 'Invalid request'
        })
        return;
    }
    if (!telefone.startsWith('+')) {
        telefone = '+244' + telefone;
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
    catch (err) {
        console.log(err.message);
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
    const token = getTokenHeader(req);


    const data = verifyToken(token);

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


async function UserDataRoute(req, res) {

    const token = getTokenHeader(req);

    const data = verifyToken(token);
    const { uid } = data;

    const user_data = await getUserData(uid);
    const fields = await getFieldsOfUser(uid, user_data.email);

    res.send({
        status: 'success',
        user_data: {
            ...user_data
        },
        fields: fields
    })


}

// Gera um token personalizado

async function CustomTokenUserRoute (req, res){
    const token = getTokenHeader(req);

    const data = verifyToken(token);
    const { uid } = data;

    const customToken =await generateCustomTokenUser(uid);
    res.send({
        status: 'success',
        customToken
    })
    
}

async function UpdatePasswordRoute(req, res){

    const { token_id, new_password } = req.body;

    const token = getTokenHeader(req);

    if (!token || !token_id || !new_password ) {
        res.send({
            status: 'failed',
            message: 'Invalid request'
        })
        return;

    }

    const response = await updatePassword(token_id, new_password);
    
    if (response){
        res.send({
            status: 'success',
            message: 'Password updated'
        })
        return;
     
    }
    else{
        res.send({
            status: 'failed',
            message: 'Invalid token'
        })
        return;
    }


}

module.exports = {
    CreateUserRoute,
    LoginUserRoute,
    VerifyUserRoute,
    UserDataRoute,
    CustomTokenUserRoute, 
    UpdatePasswordRoute
}