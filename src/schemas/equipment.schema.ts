
import * as mongoose from 'mongoose';

/* каждая еденица оборудования будет коллекция, и каждая коллекция сохраняется по этой схеме
впрочем кроме коллекции списка оборудования и коллекции прочие работы.
*/


export const EquipmentSchema = new mongoose.Schema({
    
    Daterepair: {
        type: Date,
        required: true,
        
    },
    Repair: [{
        type: String,
        
    }],
    Material: [{
        NameMaterial: {
            type: String,
        },
        ValueMaterial: {
            type: Number,
        }
    }],
    RepairPlan: [{
        Desctiption: {
            type: String
        },
        Finish: {
            type: Boolean
        },
        DateFinish: {
            type: Date
        }

    }],
    MaterialPlan: [{
        NameMaterial: {
            type: String,
        },
        ValueMaterial: {
            type: Number,
        },
        Finish: Boolean,
        DateFinish: Date
    }],

    Author: {
        type: String
    },
    



})