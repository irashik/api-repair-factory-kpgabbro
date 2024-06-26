import { CreateBidrequestDto } from "@App/bidrequest/dto/create-bidrequest.dto";
import { BidRequest, BidRequestDocument } from "@App/bidrequest/schema/bidRequest.schema";
import { ObjectId } from "mongodb";
import { recordUser } from "./mockUserRepository";

export const mockBidRequestRepository = {

    findOne: jest.fn((id) => {
        return (id) ? Promise.resolve(updateRecordBidRequestDto) : Promise.reject('error');
    }),


    find: jest.fn((query) => {

        return Promise.resolve(queryResult);

    }),
    
    create: jest.fn((createBidrequestDto: CreateBidrequestDto) => {
        return Promise.resolve(recordedBidRequest);
    }),
    

    findAndModify: jest.fn((id, updateRecordDto) => {
        return (id && updateRecordDto) ? Promise.resolve(updateRecordBidRequestDto) : Promise.reject('error');

    }),

    remove: jest.fn((id) => {
        return (id) ? Promise.resolve(recordedBidRequest) : Promise.reject('error');
    }),

};



let  {_id, ...recordUserWhitoutId } = recordUser;


export const recordedBidRequest: CreateBidrequestDto = {
    description: '',
    dateCreated: new Date(2022, 1, 20),
    author: recordUserWhitoutId,
    priority: 'priority',
    category: 'category',
    comment: 'comment',
    statusBid: 'DRAFT',
    dateStatusBid: new Date(2022, 1, 20),
    lastAuthor: recordUserWhitoutId
};


//_id: new ObjectId('293084209348234082943'),
const id = new ObjectId('61a315cff7d4cb4074fbbb76');

export const updateRecordBidRequestDto = {
    _id: new ObjectId('61a315cff7d4cb4074fbbb76'),
    description: '',
    dateCreated: new Date(2022, 1, 20),
    author: recordUserWhitoutId,
    priority: 'priority',
    category: 'category',
    comment: 'comment',
    statusBid: 'DRAFT',
    dateStatusBid: new Date(2022, 1, 20),
    lastAuthor: recordUserWhitoutId

};

export const queryResult = [
        {
            "_id" : "61a315cff7d4cb4074fbbb76",
            "dateCreated" : "2021-11-28T05:38:23.650Z",
            "description" : "test postman",
            "priority" : "rolik change",
            "author" : "Irashin Dima",
            "__v" : 0
        },
        {
            "_id" : "61a315daf7d4cb4074fbbb77",
            "dateCreated" : "2021-11-28T05:38:34.480Z",
            "description" : "sdfedfdsffg",
            "statusBid" : "DRAFT",
            "priority" : "",
            "author" : "60b3374fee1912c9909b9f59",
            "category" : "",
            "comment" : "",
            "__v" : 0
        },
        {
            "_id" : "61a316253423dd42dd5015bd",
            "dateCreated" : "2021-11-28T05:39:49.311Z",
            "description" : "test postman",
            "priority" : "rolik change",
            "author" : "Irashin Dima",
            "__v" : 0
        },
        {
            "_id" : "61a3162d3423dd42dd5015be",
            "dateCreated" : "2021-11-28T05:39:57.054Z",
            "description" : "dfsd",
            "statusBid" : "DRAFT",
            "priority" : "",
            "author" : "60b3374fee1912c9909b9f59",
            "category" : "",
            "comment" : "",
            "__v" : 0
        }
];