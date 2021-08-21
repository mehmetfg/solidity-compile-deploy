const  HDWallletProvider = require('truffle-hdwallet-provider')
const Web3 =require('web3')
const { interface, bytecode } = require('./compile')

const  provider =new HDWallletProvider(
    'polar burst blanket add soccer unveil naive cup crash path marine torch',
    'https://rinkeby.infura.io/v3/fda5f88479184a5d8954519168cc565c'
)
const  web3 =new Web3(provider)

const  deploy = async () => {
    const accounts = await  web3.eth.getAccounts()
    console.log('attameting to deploy ', accounts[0])
  const  result =  await  new web3.eth.Contract(JSON.parse(interface))
        .deploy({data:bytecode, arguments: ['Hi there !']})
        .send({gas:'1000000', from: accounts[0]})
    console.log('contract deployed to', result.options.address)

}
deploy();
