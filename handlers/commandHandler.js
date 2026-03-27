const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  // ========== PREFIX COMMANDS ==========
  const prefixPath = path.join(__dirname, "..", "commands", "prefix");
  const prefixFiles = fs.readdirSync(prefixPath).filter(file => file.endsWith(".js"));

  for (const file of prefixFiles) {
    const command = require(path.join(prefixPath, file));
    if (command.name) {
      client.prefixCommands.set(command.name, command);
    }
  }

  // ========== SLASH COMMANDS ==========
  const slashPath = path.join(__dirname, "..", "commands", "slash");
  const slashFiles = fs.readdirSync(slashPath).filter(file => file.endsWith(".js"));

  for (const file of slashFiles) {
    const command = require(path.join(slashPath, file));
    if (command.data && command.data.name) {
      client.slashCommands.set(command.data.name, command);
    }
  }

  // ========== PREFIX MESSAGE LISTENER ==========
  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(client.prefix)) return;

    const args = message.content.slice(client.prefix.length).trim().split(/\s+/);
    const commandName = args.shift()?.toLowerCase();

    if (!commandName) return;

    const command = client.prefixCommands.get(commandName);
    if (!command) return;

    try {
      await command.execute(message, args, client);
    } catch (error) {
      console.error(error);
      await message.reply("<:xMark:1486977010143199382> An **error** occured.");
    }
  });

  // ========== SLASH COMMAND LISTENER ==========
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.slashCommands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.error(error);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "<:xMark:1486977010143199382> An **error** occured.",
          ephemeral: true
        });
      } else {
        await interaction.reply({
          content: "<:xMark:1486977010143199382> An **error** occured.",
          ephemeral: true
        });
      }
    }
  });
};