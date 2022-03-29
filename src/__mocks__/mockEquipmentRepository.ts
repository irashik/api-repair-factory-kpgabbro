import { CreateRepairDto } from '@App/repairs/dto/create-equipment.dto';
import { UnitEquipment } from '@App/unit-equipment/schema/unitEquipment.schema';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { unitEquipmentRecord } from './mockUnitEquipmentRepository';

import { recordUser } from '@App/__mocks__/mockUserRepository';

export const mockEquipmentRepository = {

    create: jest.fn((record:any) => {
        if(record) {
            return Promise.resolve(recordEquipment);
        }

    }),

    findOne: jest.fn(() => {

    }),

    findAll: jest.fn((find) => {
        
        return Promise.resolve(dbQuery);
    }),

    findAndModify: jest.fn(() => {

    }),

    remove: jest.fn(() => {

    }),

}



let { _id, ...recordUserWhitoutId} = recordUser;


export const recordEquipment: CreateRepairDto = {
        
    dateRepairStart: new Date(2022, 1, 21),
    dateRepairEnd: new Date(2022, 1, 21),
    equipment: unitEquipmentRecord,
    repair: [
        { 
            description: 'test description',
            type: 'CHORES'
        }
    ],
    author: recordUserWhitoutId,
    material: [
        {
            name: 'testNameMat',
            value: 1,
            description: 'testDescriptionMat'
        }
    ],
}




export const dbQuery = [
{ "_id" : "61c01129e3b928e545d95d5d", "dateRepairStart" : "2021-12-20T05:14:17.230Z", "dateRepairEnd" : "2021-12-20T05:14:17.230Z", "equipment" : "test", 
    "repair" : [
     { "_id" : "61c01129e3b928e545d95d5e", "description" : "test repair", "type" : "CHORES" },
     { "_id" : "61c01129e3b928e545d95d5f", "description" : "test2", "type" : "CHORES" }
     ],
     "author" : "testing", "material" : [ ], "__v" : 0 },
{ "_id" : "61c0330ee3b928e545d95d64", "dateRepairStart" : "2021-12-20T07:00:00Z", "dateRepairEnd" : "2021-12-20T07:00:00Z", "equipment" : "6129bf3fce9e4ac80ae1e319", 
    "repair" : [ ], 
    "author" : "60b3374fee1912c9909b9f59", 
    "material" : [
         { "_id" : "61c0330ee3b928e545d95d65", "name" : "rolik", "value" : 23 }
        ],
        "spendingJob" : 2, "__v" : 0 },
{ "_id" : "61c03367e3b928e545d95d66", "dateRepairStart" : "2021-12-20T07:00:00Z", "dateRepairEnd" : "2021-12-20T07:00:00Z", "equipment" : "",
     "repair" : [
         { "_id" : "61c03367e3b928e545d95d67", "description" : "xcv", "type" : "CHORES" },
         { "_id" : "61c03367e3b928e545d95d68", "description" : "xcvxv", "type" : "SERVICE" }
        ],
        "author" : "60b3374fee1912c9909b9f59", "material" : [ ], "spendingJob" : null, "__v" : 0 }
]; 