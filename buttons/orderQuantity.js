const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder
} = require("discord.js");

module.exports = {
  customId: "p_284218830983532554",

  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId("order_quantity_modal")
      .setTitle("Quantity");

    const input = new TextInputBuilder()
      .setCustomId("quantity")
      .setLabel("What is the amount of products you need?")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    modal.addComponents(
      new ActionRowBuilder().addComponents(input)
    );

    await interaction.showModal(modal);
  }
};