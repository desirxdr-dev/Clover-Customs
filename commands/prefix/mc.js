module.exports = {
  name: "mc",
  description: "Shows server statistics.",

  async execute(message, args, client) {

    try {
      await message.delete();
    } catch (err) {
    }

    const guild = message.guild;

    const totalMembers = guild.memberCount.toLocaleString();

    const onlineMembers = guild.members.cache.filter(member =>
      member.presence && member.presence.status !== "offline"
    ).size.toLocaleString();

    const boosts = guild.premiumSubscriptionCount.toLocaleString();

    message.channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": `<:members:1486975554543685773> **Member Count**: ${totalMembers}\n<:rocket:1486975593810628758>  **Server Boosts**: ${boosts}`
        }
      ]
    }
  ]
});

  }
};