import { CreateBidrequestDto } from "src/bidrequest/dto/create-bidrequest.dto";

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


export const recordedBidRequest = {

    _id: '293084209348234082943',
    description: '',
    dateCreated: new Date(2022, 1, 20),
    author: 'test',
    priority: 'priority',
    category: 'category',
    comment: 'comment',
    statusBid: 'DRAFT',
    dateStatusBid: new Date(2022, 1, 20),
    lastAuthor: 'lastAuthor'

};



export const updateRecordBidRequestDto = {
    _id: '293084209348234082943',
    description: '',
    dateCreated: new Date(2022, 1, 20),
    author: 'test',
    priority: 'priority',
    category: 'category',
    comment: 'comment',
    statusBid: 'DRAFT',
    dateStatusBid: new Date(2022, 1, 20),
    lastAuthor: 'lastAuthor'

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