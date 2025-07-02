// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IVotex {
    event Transfer(address indexed from, address indexed to, uint256 amount);

    event Approve(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    function transfer(address to, uint256 amount) external returns (bool);

    function balanceOf(address account) external view returns (uint256);

    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function approveFrom(
        address account,
        address spender,
        uint256 amount
    ) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);

    function burn(uint256 amount) external returns (bool);

    function buy() external payable;

    function getConvarsionRate(
        uint256 ethAmount
    ) external view returns (uint256);

    function getEthBalance() external view returns (uint256);

    function externalETHWithdrawal(address caller) external;

    function buyFor(address account) external payable;

    function emitBurn(address from, uint256 amount) external;
}
