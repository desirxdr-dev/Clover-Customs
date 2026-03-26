module.exports = {
  customId: "order_quantity_modal",

  async execute(interaction) {
    const value = interaction.fields.getTextInputValue("quantity");

    const messages = await interaction.channel.messages.fetch({ limit: 10 });
    const panelMessage = messages.find(
      msg =>
        msg.author.id === interaction.client.user.id &&
        msg.components?.length
    );

    if (panelMessage) {
      const updated = JSON.parse(JSON.stringify(panelMessage.components));

      for (const component of updated[0].components) {
        if (component.type === 1 && Array.isArray(component.components)) {
          component.components = component.components.filter(
            btn => btn.custom_id !== "p_284218830983532554"
          );
        }
      }

      await panelMessage.edit({
        components: updated
      }).catch(() => {});
    }

    await interaction.reply({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": `**Quantity**: ${value}`
        }
      ]
    }
  ]
});
  }
};