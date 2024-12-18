const SkillVerification = artifacts.require("SkillVerification");

module.exports = function (deployer) {
  deployer.deploy(SkillVerification);
};
