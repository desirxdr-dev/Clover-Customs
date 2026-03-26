const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  customId: "not_paid",

  async execute(interaction) {
    const REQUIRED_ROLE_ID = "1486541355726671922";

    if (
      !interaction.member.roles.cache.has(REQUIRED_ROLE_ID) &&
      !interaction.member.permissions.has(PermissionFlagsBits.Administrator)
    ) {
      return interaction.reply({
        content: "<:CC_xMark:1486569218789871626> You do **not** have **permission** to use this button.",
        ephemeral: true
      });
    }

    // get original message components
    const original = interaction.message.components;

    // clone and modify button
    const updated = JSON.parse(JSON.stringify(original));

    const button = updated[0].components.find(c => c.type === 2);

    if (button) {
      button.label = "Paid";
      button.style = 3; // green
      button.disabled = true;
    }

    await interaction.update({
      components: updated
    });
  }
};