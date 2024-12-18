
pragma solidity ^0.8.0;

contract SkillVerification {
    struct Skill {
        string name;
        string description;
        string certificateHash;
        uint256 dateIssued;
    }

    mapping(address => Skill[]) public userSkills;

    event SkillVerified(address indexed user, string skillName, string certificateHash, uint256 dateIssued);

    function addSkill(string memory _name, string memory _description, string memory _certificateHash) public {
        Skill memory newSkill = Skill({
            name: _name,
            description: _description,
            certificateHash: _certificateHash,
            dateIssued: block.timestamp
        });
        userSkills[msg.sender].push(newSkill);
        emit SkillVerified(msg.sender, _name, _certificateHash, block.timestamp);
    }

    function getSkills(address user) public view returns (Skill[] memory) {
        return userSkills[user];
    }
}
