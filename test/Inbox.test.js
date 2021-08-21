const assert = require('assert')
const ganache = require('ganache-cli')
const  Web3 = require('web3')
const web3 = new Web3(ganache.provider())
const { interface, bytecode } = require('../compile')
let accounts;
let inbox;

beforeEach(async () => {
   accounts =await web3.eth.getAccounts()
   inbox =  await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data :bytecode, arguments : ['Merhaba Dünya ']})
      .send({from:accounts[0], gas: '1000000'})
})

describe('Inbox', () => {
    it('should deploys a contract', function () {
        //console.log(inbox)
    });
    it('should default message',  async () => {
            const message =await inbox.methods.message().call();
            assert.equal(message, 'Merhaba Dünya ')
    });
    it('should change the message', async function () {
        await inbox.methods.setMessage('bye').send({from :accounts[0]})
        const message =  await inbox.methods.message().call();
        assert.equal(message, 'bye')
    });
})













/*
class Car {
    park() {
        return 'stopped'
    }
    drive() {
        return 'vroom'
    }
}
*/






/*
describe('Car', () => {
    it('should car park', function () {
        const  car = new Car();
        assert.equal(car.park(), 'stopped')
    });

    it('should car drive', function () {
        const car = new Car();
        assert.equal(car.drive(), 'vroomd')
    });
})*/
