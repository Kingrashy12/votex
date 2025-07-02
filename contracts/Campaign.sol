// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IVotex.sol";

contract VTXCampaign {
    struct Campaign {
        uint256 id;
        string name;
        string description;
        string[] options;
        uint256 totalVoters;
        address[] voters;
        uint256 startDate;
        uint256 endDate;
        bool paused;
        bool active;
        _Vote[] votes;
    }

    struct _Vote {
        uint256 campaignId;
        string option;
        address voter;
    }

    uint256 _minimumTokenRequired;

    bool _isVotingPaused;

    address private _tokenAddress;

    mapping(address => bool) _admins;

    mapping(address => Campaign[]) _usersVotes;
    mapping(uint256 => Campaign) campaignMap;
    mapping(address => string) public profiles;

    Campaign[] campaigns;
    _Vote[] public votes;

    address[] admins;

    address _owner;

    event NewCampaign(uint256 id, address indexed creator, string name);
    event Voted(address indexed user, uint256 id);

    constructor(address tokenAddress) {
        _minimumTokenRequired = 1;
        _owner = msg.sender;
        _admins[msg.sender] = true;
        _tokenAddress = tokenAddress;
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Caller is not the owner");
        _;
    }

    modifier onlyAdmins() {
        require(
            _admins[msg.sender] == true,
            "Only admins and contract owner can perform this action"
        );
        _;
    }

    modifier _canVote() {
        require(
            IVotex(_tokenAddress).balanceOf(msg.sender) >=
                _minimumTokenRequired,
            "A minimum amount of 1 VTX is required for participation"
        );
        _;
    }

    modifier validCampaign(uint256 _id) {
        Campaign memory campaign = campaignMap[_id];

        require(campaign.id >= 1, "Campaign not found");
        _;
    }

    function addAdmin(address newAdmin) public onlyOwner {
        _admins[newAdmin] = true;
        admins.push(newAdmin);
    }

    function removeAdmin(address account) public onlyOwner {
        _admins[account] = false;
    }

    function createCampaign(
        string memory _name,
        string memory _description,
        string[] memory _options,
        uint256 _startDate,
        uint256 _endDate
    ) public onlyOwner onlyAdmins {
        require(_endDate > _startDate, "Invalid campaign date");
        uint256 newId = campaigns.length + 1;
        Campaign storage newCampaign = campaignMap[newId];

        newCampaign.active = true;
        newCampaign.name = _name;
        newCampaign.description = _description;
        newCampaign.startDate = _startDate;
        newCampaign.endDate = _endDate;
        newCampaign.options = _options;
        newCampaign.totalVoters = 0;
        newCampaign.id = newId;

        campaigns.push(newCampaign);

        emit NewCampaign(newId, msg.sender, _name);
    }

    function approve() public {
        IVotex(_tokenAddress).approveFrom(
            msg.sender,
            address(this),
            _minimumTokenRequired
        );
    }

    function vote(
        uint256 _campaignId,
        string memory option
    ) public validCampaign(_campaignId) _canVote {
        Campaign storage campaign = campaignMap[_campaignId];
        require(campaign.paused == false, "Campaign is currently paused");
        require(campaign.active, "Campaign has ended");

        IVotex(_tokenAddress).transferFrom(
            msg.sender,
            address(0),
            _minimumTokenRequired
        );

        IVotex(_tokenAddress).emitBurn(msg.sender, _minimumTokenRequired);

        campaign.totalVoters + 1;
        campaign.voters.push(msg.sender);

        _Vote memory newVote = _Vote({
            campaignId: _campaignId,
            voter: msg.sender,
            option: option
        });

        campaign.votes.push(newVote);
        votes.push(newVote);
        _usersVotes[msg.sender].push(campaign);

        for (uint256 i = 0; i < campaigns.length; i++) {
            if (campaigns[i].id == _campaignId) {
                campaigns[i].votes.push(newVote);
                break;
            }
        }

        emit Voted(msg.sender, campaign.id);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        return campaigns;
    }

    function getCampaign(
        uint256 _campaignId
    ) public view validCampaign(_campaignId) returns (Campaign memory) {
        return campaignMap[_campaignId];
    }

    function getUserCampaign(
        address user
    ) public view returns (Campaign[] memory) {
        return _usersVotes[user];
    }

    function updateProfile(string memory _profile) external {
        profiles[msg.sender] = _profile;
    }

    function getAdmin(address user) public view returns (bool) {
        return _admins[user];
    }

    function getAdmins() public view returns (address[] memory) {
        return admins;
    }

    function updateTokenAddress(address contractAddress) public onlyOwner {
        _tokenAddress = contractAddress;
    }

    function buy() public payable {
        IVotex(_tokenAddress).buyFor{value: msg.value}(msg.sender);
    }

    function getConvarsionRate(
        uint256 ethAmount
    ) public view returns (uint256) {
        return IVotex(_tokenAddress).getConvarsionRate(ethAmount);
    }

    function getEthBalance() public view returns (uint256) {
        return IVotex(_tokenAddress).getEthBalance();
    }

    function getUserBalance(address account) public view returns (uint256) {
        return IVotex(_tokenAddress).balanceOf(account);
    }

    function withdrawETH() public onlyOwner {
        IVotex(_tokenAddress).externalETHWithdrawal(msg.sender);
    }
}
