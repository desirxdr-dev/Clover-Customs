const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder
} = require("discord.js");

module.exports = {
  customId: "p_284218785248841737",

  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId("order_description_modal")
      .setTitle("Description");

    const input = new TextInputBuilder()
      .setCustomId("description")
      .setLabel("What do you want to order?")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    modal.addComponents(
      new ActionRowBuilder().addComponents(input)
    );

    await interaction.showModal(modal);
  }
};