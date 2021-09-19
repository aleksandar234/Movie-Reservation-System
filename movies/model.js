const mongoose = require('mongoose')

const MovieModel = new mongoose.Schema({
    title: {
        type: String,
        required : true,
    },
    mainActor: {
        type: String,
        required : false,
    },
    rating: {
        type: Number,
        default : 6,
    },
    projectionTimeOne: {
        type: String,
        required: true
    },
    projectionTimeTwo: {
        type: String,
        required: true
    },
    projectionTimeThree: {
        type: String,
        required: true
    },
    // u sklopu filma mora da ima vreme rezervacije i vremem
    // pa onda samo u vue-u da izvucem te podatke i da ih prikazem
    // a u rezervaciji moram da imam samo jedno polje za vreme gledanja filma koje mora da mi bude required
    // koje izvlacim kad cekujem onaj checkBox u vue-u
    // i kad kliknem reservisi odem u bazu podataka za rezervacije gde cu da imam 
    // ko mi je rezervisao, koji film, u koje vreme i za koliko osobo,
    // i moram da imam opciju da ponistim rezervaciju ako hocu

})


module.exports = mongoose.model('Movie',MovieModel)