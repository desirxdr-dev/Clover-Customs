const { ActivityType } = require("discord.js");

module.exports = {
  name: "guildMemberRemove",

  async execute(client, member) {
    client.user.setActivity(`${member.guild.memberCount} members`, {
      type: ActivityType.Watching
    });
  }
};