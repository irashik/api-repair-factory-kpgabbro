import { CreateBidrequestDto } from "@App/bidrequest/dto/create-bidrequest.dto";
import { queryResult, recordedBidRequest, updateRecordBidRequestDto } from "@App/__mocks__/mockBidRequestRepository";




export const mockBidRequestService = {

    create: jest.fn((createBidrequestDto: CreateBidrequestDto) => {
        if (createBidrequestDto) {
            return Promise.resolve(updateRecordBidRequestDto);
        } else {
            throw new Error('data create is null');
        }
    }),

    findAll: jest.fn((query) => {

        return Promise.resolve(queryResult);

    }),

    remove: jest.fn((id) => {
        return (id) ? Promise.resolve(updateRecordBidRequestDto) : Promise.reject('error');
    }),

    update: jest.fn((id, updateRecordDto) => {
        return (id && updateRecordDto) ? Promise.resolve(updateRecordBidRequestDto) : Promise.reject('error');

    }),

    findOne: jest.fn((id) => {
        return (id) ? Promise.resolve(updateRecordBidRequestDto) : Promise.reject('error');
    })


}





