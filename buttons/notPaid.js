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
        flags: 64
      });
    }

    const updated = JSON.parse(JSON.stringify(interaction.message.components));

    for (const component of updated) {
      if (!component.components) continue;

      for (const child of component.components) {
        if (
          child.type === 9 &&
          child.accessory &&
          child.accessory.type === 2 &&
          child.accessory.custom_id === "not_paid"
        ) {
          child.accessory.label = "Paid";
          child.accessory.style = 3;
          child.accessory.disabled = true;
        }
      }
    }

    await interaction.update({
      components: updated
    });
  }
};