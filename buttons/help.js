const {
  ChannelType,
  PermissionFlagsBits,
  EmbedBuilder
} = require("discord.js");

module.exports = {
  customId: "help",

  async execute(interaction) {
    const guild = interaction.guild;
    const user = interaction.user;

    const staffRoleIds = ["1486541364798685313", "1486541358398308485", "1486541355726671922"]
    const categoryId = "1486575107244822650";

    const existingChannel = guild.channels.cache.find(
      (channel) =>
        channel.parentId === categoryId &&
        channel.topic === `ticket-${user.id}`
    );

    if (existingChannel) {
      return interaction.reply({
        content: `<:CC_xMark:1486569218789871626> You **already** have an **open** ticket: ${existingChannel}`,
        ephemeral: true
      });
    }

    const channelName = `help-${user.username}`.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 20);

    const ticketChannel = await guild.channels.create({
      name: channelName,
      type: ChannelType.GuildText,
      parent: categoryId,
      topic: `ticket-${user.username}`,
      permissionOverwrites: [
        {
          id: guild.roles.everyone.id,
          deny: [
            PermissionFlagsBits.ViewChannel
          ]
        },
        {
          id: user.id,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ReadMessageHistory
          ]
        },
        {
          id: staffRoleId,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ReadMessageHistory,
            PermissionFlagsBits.ManageChannels
          ]
        }
      ]
    });


    await ticketChannel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 12,
          "items": [
            {
              "media": {
                "url": "https://media.discordapp.net/attachments/1486558722338852904/1486558919152373953/33.png?ex=69c5f161&is=69c49fe1&hm=acd338303aefe2e4c021d2b98a73bf5f6082b070cb82f1cc0dce8eb9bce1696a&=&format=webp&quality=lossless&width=2512&height=861"
              }
            }
          ]
        },
        {
          "type": 10,
          "content": `@everyone | ${interaction.user}`
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": "# Support Ticket\nYour ticket has been successfully created. Ensure to explain what you need help with to avoid your ticket being closed.\n\n**Ticket Guidelines**\n- Do not ping staff, they've already been notified\n- Remain respectful within your ticket\n- Remain active within your ticket\n- Our staff may close your ticket for any reason deemed fit"
        },
        {
          "type": 1,
          "components": [
            {
              "style": 4,
              "type": 2,
              "label": "Close",
              "flow": {
                "actions": []
              },
              "custom_id": "close_ticket"
            }
          ]
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 12,
          "items": [
            {
              "media": {
                "url": "https://media.discordapp.net/attachments/1486558722338852904/1486559089571139685/25.png?ex=69c5f189&is=69c4a009&hm=b96edcbdf8c58933c9e7f3664b8ce51248e891e5614b56fc01241cc12f19610b&=&format=webp&quality=lossless"
              }
            }
          ]
        }
      ]
    }
  ]
});

    await interaction.reply({
      content: `<:CC_check:1486569243884650606> **Successfully** created ticket: ${ticketChannel}`,
      ephemeral: true
    });
  }
};