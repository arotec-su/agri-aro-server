const { dateToString, getDateExtensive } = require("../utils");

function generateReportEmail(nome, field_name, data) {

    return `<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AGRI-ARO</title>
    <style>
        body{
            font-family: sans-serif;
        }
        .d-flex{
            display: flex;
        }

        .items-center{
            align-items: center;
        }
        .gap{
            gap: 10px;
        }

        p{
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <div class="d-flex gap items-center">
        <img src="https://api-agriaro.arotec.ao/assets/seed_green.png" width="30" alt="">
       <strong> AGRI-ARO</strong>
    </div>

  <p><strong>Assunto:</strong> Relatório Disponível</p> 

   <p> Olá ${nome},</p>
    
    <p>
    Gostaríamos de informar que o relatório do campo ${field_name} referente ao dia ${getDateExtensive(data)} está agora disponível.
</p> 
<p>
    Para acessar o relatório, por favor, clique 
    <a href="https://agriaro.arotec.ao/app/report?date=${dateToString(data)}"> Aqui</a>
</p>
<p>
    Caso tenha alguma dúvida ou necessite de mais informações, estamos à disposição.
</p>
<br><br>
    Atenciosamente,  <br>
    <strong>AROTEC</strong>
</body>
</html>`;
}

module.exports = {
    generateReportEmail
}
