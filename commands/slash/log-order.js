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
    const LOG_CHANNEL_ID = "1486901039130087445";
    const REQUIRED_ROLE_ID = "1477768302058143935";

        if (
      !interaction.member.roles.cache.has(REQUIRED_ROLE_ID) &&
      !interaction.member.permissions.has(PermissionFlagsBits.Administrator)
    ) {
      return interaction.reply({
        content: "<:Sea_xMark:1486977010143199382> You do **not** have **permission** to run this command.",
        ephemeral: true
      });
    }


    const customer = interaction.options.getUser("customer");
    const amount = interaction.options.getNumber("amount");
    const type = interaction.options.getString("type");
    const quantity = interaction.options.getInteger("quantity");

    const convertedAmount = (amount * 0.63).toFixed(2);

    const channel = interaction.guild.channels.cache.get(LOG_CHANNEL_ID);

    if (!channel) {
      return interaction.reply({
        content: "<:Sea_xMark:1486977010143199382> **Failed** to **cache** the log channel.",
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
              "content": `**Customer**: ${customer}\n**Amount After Tax**: ${amount} Robux\n**Type**: ${type}\n**Quantity**: ${quantity}\n**Designer Earnings**: ${convertedAmount} Robux`
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
                "url": "https://media.discordapp.net/attachments/1486918779668529243/1486964125367275712/image.png?ex=69c76ac1&is=69c61941&hm=e217cbe1c7a65c48a2a7189259d90e304cfa279dd4d1e0d03f40a8f30f5e3107&=&format=webp&quality=lossless"
              }
            }
          ]
        }
      ]
    }
  ]
});

    await interaction.reply({
      content: "<:Sea_Check:1486976983555379330> **Successfully** logged order.",
      ephemeral: true
    });
  }
};