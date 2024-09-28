
var admin = require("firebase-admin");

var serviceAccount = require("../agri-aro-key-firebase.json");
const { Timestamp } = require("firebase-admin/firestore");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


async function getDevicesOfUser(user_id) {
    const _query = await admin.firestore().collection('devices').where(
        'user_id', '==', user_id
    ).get();

    if (_query.size == 0) {
        return [];
    }
    return _query.docs.map((doc) => {
        return doc.data();
    });
}

async function getFieldsOfUser(user_id) {
    const _query = await admin.firestore().collection('fields').where(
        'user_id', '==', user_id
    ).get();

    if (_query.size == 0) {
        return [];
    }
    return _query.docs.map((doc) => {
        return {
            ...doc.data(), 
            id: doc.id
        
        };
    });
}


async function saveDataOfDevice(device_id, data) {
    await admin.firestore().collection(`dados_${device_id}`).doc().
        create({
            ...data
        });
}

async function getUserData(uid) {
    return (await admin.firestore().collection('users').doc(uid).get()).data();

}

//verify device

async function verifyDevice(device_id) {
    const _query = await admin.firestore().collection('devices').where(
        'device_id', '==', device_id
    ).get();

    if (_query.size == 0) {
        return null;
    }
    return _query.docs[0].data();
}


async function hasUserById(id) {
    try {
        const user = await admin.auth().getUser(id);
        if (user.uid) {
            return true;
        }
        return false;

    } catch (err) {
        console.log(err.message);

        return false;
    }
}
async function hasUser(email) {

    try {
        const user = await admin.auth().getUserByEmail(email);
        if (user.uid) {
            return true;
        }
        return false;

    } catch (err) {
        console.log(err.message);


        return false;
    }

}

async function createUser(email, nome, telefone, password) {
    const user = await admin.auth().createUser({
        emailVerified: false,
        email: email,
        displayName: nome,
        password: password,
        disabled: false
    });

    await admin.firestore().collection('users').doc(user.uid).create({
        id: user.uid,
        nome: nome,
        email: email,
        telefone: telefone,
        dataCadastro: Timestamp.now(),
        actived: false
    });

    return user.uid;
}

async function loginUser(token_id) {

    try {
        const decodedToken = await admin.auth()
            .verifyIdToken(token_id);

        return decodedToken.uid;


    }
    catch (err) {
        console.log(err.message);

        return '';
    }

}

async function setupUser(device_id, uid, data) {
    const { nome_propriedade, latitude,
        longitude,
        tipo_solo,
        tipo_cultura } = data;
    const _field = await admin.firestore().collection('fields').add({
        dataCriaca: Timestamp.now(),
        field_name: nome_propriedade,
        user_id: uid,
        device_id: device_id,
        position: {
            latitude,
            longitude
        },
        tipo_solo,
        tipo_cultura
    });


    await admin.firestore().collection('devices').doc(device_id).update({
        field_id: _field.id,
        user_id: uid
    });

    await admin.firestore().collection('users').doc(uid).update({
        actived: true
    })
}

async function getSensData(device_id, min, max) {
    const _query = await admin.firestore().collection(`dados_${device_id}`)
        .where("moment", ">", Timestamp.fromDate(new Date(min))).where("moment", "<", Timestamp.fromDate(new Date(max)))
        .get();

    return _query.docs.map((doc) => {
        return doc.data();
    })

}

module.exports = {
    createUser,
    hasUser,
    loginUser,
    verifyDevice,
    saveDataOfDevice,
    hasUserById,
    getUserData,
    getDevicesOfUser,
    getFieldsOfUser,
    setupUser,
    getSensData
}