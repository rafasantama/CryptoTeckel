pragma solidity >=0.5.0 <0.6.0;

contract SalchiFactory {

    // declare our event here

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;

    struct Salchi {
        string name;
        uint dna;
    }

    Salchi[] public salchis;

    function _createSalchi(string memory _name, uint _dna) private {
        salchis.push(Salchi(_name, _dna));
        // and fire it here
    }

    function _generateRandomDna(string memory _str) private view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    function createRandomSalchi(string memory _name) public {
        uint randDna = _generateRandomDna(_name);
        _createSalchi(_name, randDna);
    }

}
