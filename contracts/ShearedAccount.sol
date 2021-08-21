pragma solidity ^0.4.18;

contract SharedAccount {
    struct AccountBalance {
        address addr;
        uint balance;
        bool isActive;
    }


    uint maxAccountCount;
    uint public numberOfAccouts;
    event AccountCreated(address AccountOwner);
    modifier  isAccountExistsModifier {
        require(!isAccountExists(msg.sender));
        _;
    }
    modifier numberOfAccoutsModifier {
        require(numberOfAccouts < maxAccountCount);
        _;
    }
    mapping(address => AccountBalance) accounts;

    function SharedAccount(uint _maxAccountCount) public {

        if(_maxAccountCount != 0) {
            maxAccountCount = _maxAccountCount;
        } else {
            maxAccountCount = 128;
        }
    }
    function openAccount() isAccountExistsModifier numberOfAccoutsModifier payable public {

        accounts[msg.sender] = AccountBalance(msg.sender, msg.value, true);
        numberOfAccouts++;

        AccountCreated(msg.sender);
    }
    function isAccountExists(address accontOwner) private view returns (bool){

        return accounts[accontOwner].addr != address(0) && accounts[accontOwner].isActive;
    }

    function withdarwMoney(uint amount) isAccountExistsModifier payable public {

        require(accounts[msg.sender].balance >= amount);

        msg.sender.transfer(amount);
        accounts[msg.sender].balance -= msg.value;
    }
    function depositMoney() payable public {
        require(isAccountExists(msg.sender));

        accounts[msg.sender].balance +=msg.value;

    }

}