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
          "content": `<:CC_members:1486605179292749865> **Member Count**: ${totalMembers}\n<:CC_rocket:1486605204898971738> **Server Boosts**: ${boosts}`
        }
      ]
    }
  ]
});

  }
};