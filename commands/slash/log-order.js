const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("log-order")
    .setDescription("Log an order.")
    .addUserOption(option =>
      option
        .setName("customer")
        .setDescription("Select the customer of this order.")
        .setRequired(true)
    )
    .addNumberOption(option =>
      option
        .setName("amount")
        .setDescription("Input the amount the customer paid.")
        .setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName("type")
        .setDescription("Select the type of service.")
        .setRequired(true)
        .addChoices(
            { name: "Graphics", value: "Graphics" },
            { name: "Clothing", value: "Clothing" },
            { name: "Liveries", value: "Liveries" },
            { name: "Discord", value: "Discord" },
            { name: "Development", value: "Development" }
        )
    )
    .addIntegerOption(option =>
      option
        .setName("quantity")
        .setDescription("Input the quantity of the product you created.")
        .setRequired(true)
    ),

  async execute(interaction) {
    const LOG_CHANNEL_ID = "1486557408607207506";

    const customer = interaction.options.getUser("customer");
    const amount = interaction.options.getNumber("amount");
    const type = interaction.options.getString("type");
    const quantity = interaction.options.getInteger("quantity");

    const convertedAmount = (amount * 0.63).toFixed(2);

    const channel = interaction.guild.channels.cache.get(LOG_CHANNEL_ID);

    if (!channel) {
      return interaction.reply({
        content: "<:CC_xMark:1486569218789871626> **Failed** to **cache** the log channel.",
        ephemeral: true
      });
    }

    await channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "# Order Log"
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `${interaction.user} is the designer of this order.`
        },
        {
          "type": 14,
          "divider": false
        },
        {
          "type": 9,
          "components": [
            {
              "type": 10,
              "content": `**Customer**: ${customer}\n**Amount After Tax**: ${amount}\n**Type**: ${type}\n**Quantity**: ${quantity}\n**Designer Earnings**: ${convertedAmount}`
            }
          ],
          "accessory": {
            "style": 4,
            "type": 2,
            "label": "Not Paid",
            "flow": {
              "actions": []
            },
            "custom_id": "not_paid"
          }
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
      content: "<:CC_check:1486569243884650606> **Successfully** logged order.",
      ephemeral: true
    });
  }
};