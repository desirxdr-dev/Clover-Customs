const {
  ChannelType,
  PermissionFlagsBits
} = require("discord.js");

const HR_ROLE_ID = "1486541358398308485";

const ORDER_TYPES = {
  liveries: {
    categoryId: "1486624241548922890",
    staffRoleIds: ["1486623370639441990"],
    buttonId: "p_284217717286768643",
    label: "Liveries"
  }
};

module.exports = {
  customId: ORDER_TYPES.liveries.buttonId,

  async execute(interaction) {
    const config = ORDER_TYPES.liveries;
    const user = interaction.user;
    const guild = interaction.guild;

    const existing = guild.channels.cache.find(
      channel =>
        channel.parentId === config.categoryId &&
        channel.topic === `liveries-${user.id}`
    );

    if (existing) {
      return interaction.reply({
        content: `<:CC_xMark:1486569218789871626> You **already** have an **open** ticket: ${existing}`,
        flags: 64
      });
    }

    const ticketChannel = await guild.channels.create({
      name: `🔴-unclaimed-${user.username}`.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 24),
      type: ChannelType.GuildText,
      parent: config.categoryId,
      topic: `liveries-${user.id}`,
      permissionOverwrites: [
        {
          id: guild.roles.everyone.id,
          deny: [PermissionFlagsBits.ViewChannel]
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
          id: HR_ROLE_ID,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ReadMessageHistory,
            PermissionFlagsBits.ManageChannels
          ]
        },
        ...config.staffRoleIds.map(roleId => ({
          id: roleId,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ReadMessageHistory,
            PermissionFlagsBits.ManageChannels
          ]
        }))
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
                    "url": "https://media.discordapp.net/attachments/1486558722338852904/1486558884603625502/35.png?ex=69c5f159&is=69c49fd9&hm=69dc12db894ec1b6845b6512dfd1d9e3ba8c781ecdd9ba5f3ef7cbd4e5ea5849&=&format=webp&quality=lossless&width=1872&height=642"
                  }
                }
              ]
            },
            {
              "type": 14,
              "spacing": 2
            },
            {
              "type": 10,
              "content": `Thanks for ordering with **Clover Customs**. Ensure to fill out the **Order Screening** as soon as possible to avoid having your order closed.\n-# ${interaction.user} | <@&1486623365010559048>`
            },
            {
              "type": 14,
              "divider": false
            },
            {
              "type": 10,
              "content": "**Ticket Guidelines**\n- Do not ping designers, they've already been notified\n- Remain respectful within your ticket\n- Remain active within your ticket; it is expected you respond as soon as possible when prompted to\n- Violating any order guidelines listed here or in <#1486554799062384710> will result in your order being closed, and a refund will **not** be offered"
            },
            {
              "type": 1,
              "components": [
                {
                  "style": 2,
                  "type": 2,
                  "label": "Budget",
                  "flow": {
                    "actions": []
                  },
                  "custom_id": "p_284218576267644932"
                },
                {
                  "style": 2,
                  "type": 2,
                  "label": "Description",
                  "flow": {
                    "actions": []
                  },
                  "custom_id": "p_284218785248841737"
                },
                {
                  "style": 2,
                  "type": 2,
                  "label": "Quantity",
                  "flow": {
                    "actions": []
                  },
                  "custom_id": "p_284218830983532554"
                }
              ]
            },
            {
              "type": 1,
              "components": [
                {
                  "style": 3,
                  "type": 2,
                  "label": "Claim",
                  "flow": {
                    "actions": []
                  },
                  "custom_id": "order_claim"
                },
                {
                  "style": 4,
                  "type": 2,
                  "label": "Close",
                  "flow": {
                    "actions": []
                  },
                  "custom_id": "p_284218918657069067"
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
      content: `<:CC_check:1486569243884650606> **Successfully** created order ticket: ${ticketChannel}`,
      flags: 64
    });
  }
};