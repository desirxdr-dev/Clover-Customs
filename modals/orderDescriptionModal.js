module.exports = {
  customId: "order_description_modal",

  async execute(interaction) {
    const value = interaction.fields.getTextInputValue("description");

    const messages = await interaction.channel.messages.fetch({ limit: 10 });
    const panelMessage = messages.find(msg =>
      msg.author.id === interaction.client.user.id &&
      msg.components?.length
    );

    if (panelMessage) {
      const updated = JSON.parse(JSON.stringify(panelMessage.components));

      for (const row of updated[0].components) {
        if (row.type === 1 && Array.isArray(row.components)) {
          row.components = row.components.filter(btn => btn.custom_id !== "p_284218785248841737");
        }
      }

      await panelMessage.edit({
        components: updated
      }).catch(() => {});
    }

    await interaction.reply({
      content: `**Description**: ${value}`,
      flags: 64
    });
  }
};