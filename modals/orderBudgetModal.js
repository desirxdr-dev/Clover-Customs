module.exports = {
  customId: "order_budget_modal",

  async execute(interaction) {
    const value = interaction.fields.getTextInputValue("budget");

    const messages = await interaction.channel.messages.fetch({ limit: 10 });
    const panelMessage = messages.find(
      msg =>
        msg.author.id === interaction.client.user.id &&
        msg.components?.length
    );

    if (panelMessage) {
      const updated = JSON.parse(JSON.stringify(panelMessage.components));

      for (const component of updated[0].components) {
        // remove Budget button
        if (component.type === 1 && Array.isArray(component.components)) {
          component.components = component.components.filter(
            btn => btn.custom_id !== "p_284218576267644932"
          );
        }

        // update the info section
        if (component.type === 10 && component.content.includes("# Support Ticket")) {
          component.content += `\n\n**Budget**: ${value}`;
        }
      }

      await panelMessage.edit({
        components: updated
      }).catch(() => {});
    }

    await interaction.reply({
      content: `<:CC_check:1486569243884650606> **Successfully** submitted budget.`,
      flags: 64
    });
  }
};