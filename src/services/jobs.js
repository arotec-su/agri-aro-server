
const cron = require('node-cron');
const { getFields, getUserData } = require('../firebase');
const { sendMail } = require('./emails');
const { generateReportEmail } = require('../templates/emails');

function initJob(){

    cron.schedule('0 9 * * *', async () => {
    
        const date = new Date(new Date().getTime() - (1000 * 60 * 60 * 24));
        const fields = await getFields();
        console.log(fields.length);
    

        for (const field of fields){

            const user =  await getUserData(field.user_id);
           const emailContent= generateReportEmail(user.nome, field.field_name, date);
           await sendMail(user.email, 'Relatório Diário AGRI-ARO', emailContent);
        }
    });
}


module.exports ={
    initJob
}