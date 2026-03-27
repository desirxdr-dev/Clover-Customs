const { ActivityType } = require("discord.js");

module.exports = {
  name: "guildMemberAdd",

  async execute(client, member) {
    const welcomeChannelId = process.env.WELCOME_CHANNEL_ID;
    const channel = member.guild.channels.cache.get(welcomeChannelId);

    if (channel) {
      await channel.send({
  "content": `Welcome ${member} to **Sea Customs**  — your go-to ER:LC product provider. We offer various servers for you to order from. Order today to receive high-quality products for cheap prices.`,
  "components": [
    {
      "type": 1,
      "components": [
        {
          "style": 2,
          "type": 2,
          "label": `${member.guild.memberCount}`,
          "emoji": {
            "id": "1487233809614372945",
            "name": "person",
            "animated": false
          },
          "disabled": true,
          "flow": {
            "actions": []
          },
          "custom_id": "p_284830800938012674"
        },
        {
          "type": 2,
          "style": 5,
          "label": "Dashboard",
          "url": "https://discord.com/channels/1317959017888354467/1452801176851583048",
        }
      ]
    }
  ]
});
    }

    client.user.setActivity(`Watching ${member.guild.memberCount} Members`, {
      type: ActivityType.Watching
    });
  }
};