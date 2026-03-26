const { ActivityType } = require("discord.js");

module.exports = {
  name: "guildMemberRemove",

  async execute(client, member) {
    client.user.setActivity(`Watching ${member.guild.memberCount} Members`, {
      type: ActivityType.Watching
    });
  }
};