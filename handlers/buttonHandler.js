const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const buttonsPath = path.join(__dirname, "..", "buttons");
  const buttonFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith(".js"));

  for (const file of buttonFiles) {
    const button = require(path.join(buttonsPath, file));
    if (button.customId) {
      client.buttons.set(button.customId, button);
    }
  }

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return;

    const button = client.buttons.get(interaction.customId);
    if (!button) return;

    try {
      await button.execute(interaction, client);
    } catch (error) {
      console.error(error);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while handling that button.",
          ephemeral: true
        });
      } else {
        await interaction.reply({
          content: "There was an error while handling that button.",
          ephemeral: true
        });
      }
    }
  });
};