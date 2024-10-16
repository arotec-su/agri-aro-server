const culturasParams =
[
    {
      title: 'Feijão',
      id: 1,
      temperatura: { min: 20, max: 25 },
      umidade_solo: { min: 50, max: 70 },
      umidade_ambiental: { min: 60, max: 80 },
      ph: { min: 6, max: 6.5 },
      nitrogenio: { min: 30, max: 40 },
      fosforo: { min: 20, max: 30 },
      potassio: { min: 200, max: 300 }
    },
    {
      title: 'Ginguba',
      id: 2,
      temperatura: { min: 25, max: 30 },
      umidade_solo: { min: 50, max: 60 },
      umidade_ambiental: { min: 55, max: 65 },
      ph: { min: 5.5, max: 6.5 },
      nitrogenio: { min: 20, max: 30 },
      fosforo: { min: 15, max: 25 },
      potassio: { min: 150, max: 200 }
    },
    {
      title: 'Mandioca',
      id: 3,
      temperatura: { min: 25, max: 30 },
      umidade_solo: { min: 60, max: 70 },
      umidade_ambiental: { min: 60, max: 80 },
      ph: { min: 5.5, max: 6.5 },
      nitrogenio: { min: 15, max: 25 },
      fosforo: { min: 10, max: 20 },
      potassio: { min: 100, max: 150 }
    },
    {
      title: 'Batata-doce',
      id: 4,
      temperatura: { min: 20, max: 26 },
      umidade_solo: { min: 60, max: 80 },
      umidade_ambiental: { min: 60, max: 70 },
      ph: { min: 5.5, max: 6 },
      nitrogenio: { min: 25, max: 35 },
      fosforo: { min: 20, max: 30 },
      potassio: { min: 200, max: 250 }
    },
    {
      title: 'Batata-rena',
      id: 5,
      temperatura: { min: 16, max: 22 },
      umidade_solo: { min: 65, max: 80 },
      umidade_ambiental: { min: 70, max: 80 },
      ph: { min: 5, max: 6 },
      nitrogenio: { min: 30, max: 40 },
      fosforo: { min: 25, max: 35 },
      potassio: { min: 200, max: 300 }
    },
    {
      title: 'Abóbora',
      id: 6,
      temperatura: { min: 20, max: 30 },
      umidade_solo: { min: 50, max: 70 },
      umidade_ambiental: { min: 60, max: 70 },
      ph: { min: 6, max: 6.8 },
      nitrogenio: { min: 25, max: 35 },
      fosforo: { min: 15, max: 25 },
      potassio: { min: 150, max: 250 }
    },
    {
      title: 'Quiabo',
      id: 7,
      temperatura: { min: 24, max: 30 },
      umidade_solo: { min: 60, max: 80 },
      umidade_ambiental: { min: 70, max: 80 },
      ph: { min: 6, max: 6.8 },
      nitrogenio: { min: 25, max: 35 },
      fosforo: { min: 20, max: 30 },
      potassio: { min: 200, max: 250 }
    },
    {
      title: 'Couve',
      id: 8,
      temperatura: { min: 15, max: 20 },
      umidade_solo: { min: 70, max: 85 },
      umidade_ambiental: { min: 70, max: 80 },
      ph: { min: 6, max: 7 },
      nitrogenio: { min: 20, max: 30 },
      fosforo: { min: 20, max: 30 },
      potassio: { min: 250, max: 350 }
    },
    {
      title: 'Ervilha',
      id: 9,
      temperatura: { min: 13, max: 18 },
      umidade_solo: { min: 65, max: 80 },
      umidade_ambiental: { min: 60, max: 70 },
      ph: { min: 6, max: 7 },
      nitrogenio: { min: 20, max: 30 },
      fosforo: { min: 20, max: 30 },
      potassio: { min: 150, max: 250 }
    },
    {
      title: 'Cebola',
      id: 10,
      temperatura: { min: 15, max: 25 },
      umidade_solo: { min: 55, max: 75 },
      umidade_ambiental: { min: 60, max: 70 },
      ph: { min: 6, max: 6.8 },
      nitrogenio: { min: 20, max: 30 },
      fosforo: { min: 20, max: 30 },
      potassio: { min: 150, max: 250 }
    },
    {
      title: 'Alho',
      id: 11,
      temperatura: { min: 13, max: 24 },
      umidade_solo: { min: 60, max: 70 },
      umidade_ambiental: { min: 60, max: 70 },
      ph: { min: 6, max: 7 },
      nitrogenio: { min: 20, max: 30 },
      fosforo: { min: 15, max: 25 },
      potassio: { min: 100, max: 200 }
    },
    {
      title: 'Cenoura',
      id: 12,
      temperatura: { min: 16, max: 21 },
      umidade_solo: { min: 60, max: 70 },
      umidade_ambiental: { min: 60, max: 80 },
      ph: { min: 6, max: 6.5 },
      nitrogenio: { min: 25, max: 35 },
      fosforo: { min: 20, max: 30 },
      potassio: { min: 150, max: 250 }
    },
    {
      title: 'Tomate',
      id: 13,
      temperatura: { min: 20, max: 25 },
      umidade_solo: { min: 60, max: 80 },
      umidade_ambiental: { min: 60, max: 70 },
      ph: { min: 6, max: 6.8 },
      nitrogenio: { min: 30, max: 40 },
      fosforo: { min: 20, max: 30 },
      potassio: { min: 250, max: 350 }
    },
    {
      title: 'Jindungo',
      id: 14,
      temperatura: { min: 20, max: 28 },
      umidade_solo: { min: 60, max: 70 },
      umidade_ambiental: { min: 60, max: 80 },
      ph: { min: 6, max: 7 },
      nitrogenio: { min: 25, max: 35 },
      fosforo: { min: 15, max: 25 },
      potassio: { min: 200, max: 300 }
    }
  ]

  const solos = [
    {
        id: 1,
        title:'Arenoso', 
        culturas_ideal: [
            2,3, 10, 12
        ]
    }, {
        id: 2,

        title: 'Argiloso', 
        culturas_ideal: [
            1, 4, 5, 6, 7, 8, 
            13
        ]
    }, 
    {
        id: 3,

        title: 'Laterítico', 
        culturas_ideal: [
            1, 3, 13
        ]
    }, {
        id: 4,

        title: 'Aluvial', 
        culturas_ideal: [
            1, 5, 8, 9, 12, 
            13
        ]
    }, {
        id: 5,

        title: 'Calcário', 
        culturas_ideal: [
            2, 7, 10, 11, 
            13, 14
        ]
    },{
        id: 6,

        title: 'Podzólico', 
        culturas_ideal: [
            1, 6, 8, 9
        ]
    }
]


  module.exports ={
    culturasParams, 
    solos
  };