const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const modalsPath = path.join(__dirname, "..", "modals");
  const modalFiles = fs.readdirSync(modalsPath).filter(file => file.endsWith(".js"));

  for (const file of modalFiles) {
    const modal = require(path.join(modalsPath, file));
    if (modal.customId) {
      client.modals.set(modal.customId, modal);
    }
  }

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isModalSubmit()) return;

    const modal = client.modals.get(interaction.customId);
    if (!modal) return;

    try {
      await modal.execute(interaction, client);
    } catch (error) {
      console.error(error);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while handling that modal.",
          ephemeral: true
        });
      } else {
        await interaction.reply({
          content: "There was an error while handling that modal.",
          ephemeral: true
        });
      }
    }
  });
};