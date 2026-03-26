const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("review")
    .setDescription("Review your recent order experience.")
    .addUserOption(option =>
      option
        .setName("designer")
        .setDescription("Select the designer who completed your order.")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("rating")
        .setDescription("Select the rating based off your experience.")
        .setRequired(true)
        .addChoices(
          { name: "⭐", value: "⭐" },
          { name: "⭐⭐", value: "⭐⭐" },
          { name: "⭐⭐⭐", value: "⭐⭐⭐" },
          { name: "⭐⭐⭐⭐", value: "⭐⭐⭐⭐" },
          { name: "⭐⭐⭐⭐⭐", value: "⭐⭐⭐⭐⭐" }
        )
    )
    .addStringOption(option =>
      option
        .setName("feedback")
        .setDescription("Input feedback for the designer.")
        .setRequired(true)
    ),

  async execute(interaction) {
    const REVIEW_CHANNEL_ID = "1486554838908010516";


    const designer = interaction.options.getUser("designer");
    const rating = interaction.options.getString("rating");
    const feedback = interaction.options.getString("feedback");

    const channel = interaction.guild.channels.cache.get(REVIEW_CHANNEL_ID);

    if (!channel) {
      return interaction.reply({
        content: "<:CC_xMark:1486569218789871626> Failed to **find** the review channel.",
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
          "content": "# New Review\n${designer}"
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": "${interaction.usre} is the client of this order."
        },
        {
          "type": 14,
          "divider": false
        },
        {
          "type": 10,
          "content": "**Rating:** ${rating}\n**Feedback:** ${feedback}"
        },
        {
          "type": 14,
          "divider": false
        },
        {
          "type": 10,
          "content": "Thank you for ordering with **Clover Customs**. We hope you enjoy your order experience with us."
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

    await designer.send("<:CC_arrow:1486608622669791372> A customer **review** has been **submitted** for an order you recently completed.")

    await interaction.reply({
      content: "<:CC_check:1486569243884650606> Successfully **sent** review.",
      ephemeral: true
    });
  }
};