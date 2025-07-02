// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Context.sol";

abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    constructor() {
        _transferOwnerShip(_msgSender());
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }

    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    function _transferOwnerShip(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;

        emit OwnershipTransferred(oldOwner, newOwner);
    }

    function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }

    function renounceOwnerShip() public virtual onlyOwner {
        _transferOwnerShip(address(0));
    }

    function transferOwnerShip(address newOwner) public virtual onlyOwner {
        require(
            newOwner != address(0),
            "Ownable: new owner can't be zero address"
        );
        _transferOwnerShip(newOwner);
    }
}
