// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Utils.sol";
import "./Ownable.sol";
import "./ReentrancyGuard.sol";

contract Votex is Ownable, ReentrancyGuard {
    string public name = "Votex";
    string public symbol = "VTX";
    string public standard = "votex v.0.1";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    uint256 public circulatingSupply;

    uint256 constant initialSupply = 1000_000_000 * 1 ether;

    address[] holderToken;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Burn(address indexed from, uint256 amount);

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _amount
    );

    event TokenBought(address indexed buyer, uint256 amount, uint256 ethAmount);

    mapping(address => TokenHolderInfo) public tokenHoldersInfo;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    uint256 tokenPrice = 0.0001 ether;
    uint256 totalTokenSold;
    // uint256 maxEthPurchase = 10;
    uint256 maxEthPurchase = 100000;

    struct TokenHolderInfo {
        uint256 _tokenId;
        address _from;
        address _to;
        uint256 _totalToken;
        bool _tokenHolder;
    }

    constructor() {
        totalSupply = initialSupply;
        balanceOf[address(this)] = initialSupply;
    }

    function transfer(
        address _to,
        uint256 _amount
    ) public returns (bool success) {
        require(
            balanceOf[msg.sender] >= _convertToWei(_amount),
            "Transfer: insufficient balance"
        );
        require(_to != address(0), "Recipient address must not be zero.");

        _transfer(_to, _amount);

        return true;
    }

    function burn(uint256 amount) external returns (bool success) {
        require(
            balanceOf[msg.sender] >= _convertToWei(amount),
            "Burn: insufficient balance"
        );
        _transfer(address(0), amount);
        circulatingSupply -= _convertToWei(amount);

        return true;
    }

    function approve(
        address _spender,
        uint256 _amount
    ) public returns (bool success) {
        require(
            balanceOf[msg.sender] >= _convertToWei(_amount),
            "Approve: Insufficient VTX for approval"
        );

        allowance[msg.sender][_spender] = _convertToWei(_amount);

        emit Approval(msg.sender, _spender, _amount);

        return true;
    }

    function approveFrom(
        address _account,
        address _spender,
        uint256 _amount
    ) external returns (bool) {
        require(
            balanceOf[_account] >= _convertToWei(_amount),
            "Approve: Insufficient VTX for approval"
        );

        allowance[_account][_spender] = _convertToWei(_amount);

        emit Approval(_account, _spender, _amount);

        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _amount
    ) public nonReentrant returns (bool success) {
        require(
            _from != address(0),
            "TransferFrom: _from address must not be the zero address."
        );
        require(
            _convertToWei(_amount) <= balanceOf[_from],
            "TransferFrom: Insufficient balance"
        );
        require(
            _amount <= allowance[_from][msg.sender],
            "TransferFrom: Insufficient allowance"
        );

        allowance[_from][msg.sender] -= _convertToWei(_amount);

        _updateBalances(_from, _to, _amount);

        _updateCirculatingSupply(_amount, _from);

        emit Transfer(_from, _to, _amount);

        return true;
    }

    function emitBurn(address from, uint256 amount) external {
        emit Burn(from, amount);
    }

    function getTokenHolderData(
        address account
    ) public view returns (uint256, address, address, uint256, bool) {
        return (
            tokenHoldersInfo[account]._tokenId,
            tokenHoldersInfo[account]._to,
            tokenHoldersInfo[account]._from,
            tokenHoldersInfo[account]._totalToken,
            tokenHoldersInfo[account]._tokenHolder
        );
    }

    function getTokenHolders() public view returns (address[] memory) {
        return holderToken;
    }

    function _transfer(address _to, uint256 _amount) internal {
        _updateBalances(msg.sender, _to, _amount);

        _updateCirculatingSupply(_amount, msg.sender);

        TokenHolderInfo storage tokenHolderInfo = tokenHoldersInfo[_to];

        tokenHolderInfo._from = msg.sender;
        tokenHolderInfo._to = _to;
        tokenHolderInfo._totalToken = balanceOf[_to];
        tokenHolderInfo._tokenHolder = true;

        holderToken.push(_to);

        emit Transfer(msg.sender, _to, _amount);
    }

    function _transferFromContract(address _to, uint256 _amount) internal {
        require(
            balanceOf[address(this)] >= _convertToWei(_amount),
            "Transfer from contract: Insufficient contract balance"
        );
        _updateBalances(address(this), _to, _amount);

        _updateCirculatingSupply(_amount, address(0));

        TokenHolderInfo storage tokenHolderInfo = tokenHoldersInfo[_to];

        tokenHolderInfo._from = address(this);
        tokenHolderInfo._to = _to;
        tokenHolderInfo._totalToken = balanceOf[_to];
        tokenHolderInfo._tokenHolder = true;

        holderToken.push(_to);

        emit Transfer(address(this), _to, _amount);
    }

    function increasePurchasePower(
        uint256 _newLimit
    ) public nonReentrant onlyOwner {
        maxEthPurchase = _newLimit;
    }

    function buy() external payable nonReentrant {
        require(
            msg.value <= _convertToWei(maxEthPurchase),
            "Maximum purchase power exceeded"
        );

        require(msg.value >= 0.001 ether, "Minimum ETH amount '0.001' not met");

        uint256 tokensToBuy = msg.value / tokenPrice;

        require(tokensToBuy > 0, "Token Evaluation resulted to 0");

        require(
            balanceOf[address(this)] >= tokensToBuy,
            "Not enough tokens in contract"
        );

        // Increase token price by 5%
        tokenPrice = (tokenPrice * 105) / 100;

        _transferFromContract(msg.sender, tokensToBuy);

        emit TokenBought(msg.sender, tokensToBuy, msg.value);
    }

    function buyFor(address account) external payable nonReentrant {
        require(
            msg.value <= _convertToWei(maxEthPurchase),
            "Maximum purchase power exceeded"
        );

        require(msg.value >= 0.001 ether, "Minimum ETH amount '0.001' not met");

        uint256 tokensToBuy = msg.value / tokenPrice;

        require(tokensToBuy > 0, "Token Evaluation resulted to 0");

        require(
            balanceOf[address(this)] >= tokensToBuy,
            "Not enough tokens in contract"
        );

        tokenPrice = (tokenPrice * 105) / 100;

        _transferFromContract(account, tokensToBuy);

        emit TokenBought(account, tokensToBuy, msg.value);
    }

    function withdrawEth() public onlyOwner nonReentrant {
        uint256 amount = address(this).balance;
        address _owner = owner();
        (bool success, ) = payable(_owner).call{value: amount}("");
        require(success, "ETH Withdrawal failed");
    }

    function internalTransfer(
        address to,
        uint256 amount
    ) public nonReentrant onlyOwner {
        _transferFromContract(to, amount);
    }

    function _updateCirculatingSupply(uint256 amount, address sender) internal {
        uint256 balance = balanceOf[sender];
        if (_convertToWei(amount) > balance) {
            circulatingSupply += _convertToWei(amount) - balance;
        }
    }

    function _updateBalances(
        address from,
        address to,
        uint256 amount
    ) internal {
        uint256 amountInWei = _convertToWei(amount);
        balanceOf[from] -= amountInWei;
        balanceOf[to] += amountInWei;
    }

    function getConvarsionRate(
        uint256 ethAmount
    ) external view returns (uint256) {
        return (ethAmount * 1e18) / tokenPrice;
    }

    function getEthBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function externalETHWithdrawal(address caller) external nonReentrant {
        require(
            caller == owner(),
            "External ETH Withdrawal: Caller must be the owner"
        );
        uint256 amount = address(this).balance;
        (bool success, ) = payable(caller).call{value: amount}("");
        require(success, "ETH Withdrawal failed");
    }
}
