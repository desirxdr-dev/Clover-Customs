const { ActivityType } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,

  async execute(client) {
    console.log(`${client.user.tag} is online.`);

    const updateStatus = async () => {
      const guild = client.guilds.cache.get(process.env.GUILD_ID);
      if (!guild) return;

      await guild.members.fetch();

      client.user.setActivity(`${guild.memberCount} members`, {
        type: ActivityType.Watching
      });
    };

    await updateStatus();
  }
};