
var admin = require("firebase-admin");

var serviceAccount = require("../agri-aro-key-firebase.json");
const { Timestamp } = require("firebase-admin/firestore");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



async function saveDataOfDevice(device_id, data){
    await admin.firestore().collection(`dados_${device_id}`).doc().
    create({
        moment: Timestamp.now(), 
        ...data
    });

}

//verify device

async function verifyDevice(device_id){
    const _query = await admin.firestore().collection('devices').where(
        'device_id', '==',device_id
    ).get();

    if (_query.size == 0){
        return null;
    }  
   return _query.docs[0].data();
}


async function hasUserById(id){
    try{
        const user = await admin.auth().getUser(id);
        if (user.uid){
            return true;
        }
        return false;

    }catch{

        return false;
    }
}
async function hasUser(email){

    try{
        const user = await admin.auth().getUserByEmail(email);
        if (user.uid){
            return true;
        }
        return false;

    }catch{

        return false;
    }

}

async function createUser(email, nome,telefone,password){
    const user  = await admin.auth().createUser({
        emailVerified: false,
        email: email, 
        displayName: nome, 
        phoneNumber: telefone, 
        password: password, 
        disabled:false
    });

    await admin.firestore().collection('users').doc(user.uid).create({
        id: user.uid, 
        nome: nome, 
        email: email, 
        telefone: telefone,
        dataCadastro: Timestamp.now()
    });

    return user.uid;
}

async function loginUser(token_id){

    try{
      const decodedToken = await admin.auth()
      .verifyIdToken(token_id);

      return decodedToken.uid;

        
    }
    catch{
        return '';
    }

}

module.exports ={
createUser, 
hasUser, 
loginUser, 
verifyDevice, 
saveDataOfDevice, 
hasUserById
}