import { InMemoryDbService } from 'angular-in-memory-web-api';

/**
 * This is a simulated web-server response.
 * It will cut the http requests from webpage and send a simulated data back
 * Once the real server connection is done,
 * replace it with data transmission from Oracle
 */

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const customer_feched = [
        {
            id: 'tom1',
            password: 'abc',
            name: 'Tom',
            email: 'tom1@gmail.com',
            review_num: 5,
            cool_num: 2,
            funny_num: 1,
            useful_num: 1
        }
    ];
    return {customer_feched};
  }
}