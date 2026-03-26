const { ActivityType } = require("discord.js");

module.exports = {
  name: "guildMemberAdd",

  async execute(client, member) {
    const welcomeChannelId = process.env.WELCOME_CHANNEL_ID;
    const channel = member.guild.channels.cache.get(welcomeChannelId);

    if (channel) {
      await channel.send(
        `Welcome ${member} to **${member.guild.name}**!`
      );
    }

    client.user.setActivity(`Watching ${member.guild.memberCount} Members`, {
      type: ActivityType.Watching
    });
  }
};