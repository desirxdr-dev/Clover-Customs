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
      .setName("product")
      .setDescription("Select the product you ordered.")
      .setRequired(true)
      .addChoices(
        { name: "Graphics", value: "Graphics" },
        { name: "Liveries", value: "Liveries" },
        { name: "Clothing", value: "Clothing" },
        { name: "Discord", value: "Discord"},
        { name: "Development", value: "Development"},
        { name: "Course", value: "Course" }
      )
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
    const REVIEW_CHANNEL_ID = "1486902875056767218";
    const REQUIRED_ROLE_ID = "1486978079766089848";

        if (
      !interaction.member.roles.cache.has(REQUIRED_ROLE_ID) &&
      !interaction.member.permissions.has(PermissionFlagsBits.Administrator)
    ) {
      return interaction.reply({
        content: "<:xMark:1486977010143199382> You must be a **customer** to be able to **use** this command.",
        ephemeral: true
      });
    }


    const designer = interaction.options.getUser("designer");
    const product = interaction.options.getString("product");
    const rating = interaction.options.getString("rating");
    const feedback = interaction.options.getString("feedback");

    const channel = interaction.guild.channels.cache.get(REVIEW_CHANNEL_ID);

    if (!channel) {
      return interaction.reply({
        content: "<:xMark:1486977010143199382> Failed to **find** the review channel.",
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
          "content":`# New Review\n${designer}`
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `${interaction.user} is the client of this order.`
        },
        {
          "type": 14,
          "divider": false
        },
        {
          "type": 10,
          "content": `**Product:** ${product}\n**Rating:** ${rating}\n**Feedback:** ${feedback}`
        },
        {
          "type": 14,
          "divider": false
        },
        {
          "type": 10,
          "content": "Thank you for leaving a review at **Sea Customs**. We hope you enjoyed your experience with us."
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

    await designer.send("<:CC_arrow:1486608622669791372> A customer **review** has been **submitted** for an order you recently completed.")

    await interaction.reply({
      content: "<:check:1486976983555379330> **Successfully** sent review.",
      ephemeral: true
    });
  }
};