const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  customId: "not_paid",

  async execute(interaction) {
    const REQUIRED_ROLE_ID = "1466268742546751694";

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

    for (const container of updated) {
      if (!container.components) continue;

      for (const comp of container.components) {
        // THIS is where your button lives (type 9 accessory)
        if (
          comp.type === 9 &&
          comp.accessory &&
          comp.accessory.type === 2 &&
          comp.accessory.custom_id === "not_paid"
        ) {
          comp.accessory.label = "Paid";
          comp.accessory.style = 3; // green
          comp.accessory.disabled = true;
        }
      }
    }

    await interaction.update({
      components: updated
    });
  }
};