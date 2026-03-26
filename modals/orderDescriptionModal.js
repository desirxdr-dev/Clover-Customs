module.exports = {
  customId: "order_description_modal",

  async execute(interaction) {
    const value = interaction.fields.getTextInputValue("description");

    const messages = await interaction.channel.messages.fetch({ limit: 10 });
    const panelMessage = messages.find(
      msg =>
        msg.author.id === interaction.client.user.id &&
        msg.components?.length
    );

    if (panelMessage) {
      const updated = JSON.parse(JSON.stringify(panelMessage.components));

      for (const component of updated[0].components) {
        // remove Description button
        if (component.type === 1 && Array.isArray(component.components)) {
          component.components = component.components.filter(
            btn => btn.custom_id !== "p_284218785248841737"
          );
        }

        // update the info section
        if (component.type === 10 && component.content.includes("# Support Ticket")) {
          component.content += `\n\n**Description**: ${value}`;
        }
      }

      await panelMessage.edit({
        components: updated
      }).catch(() => {});
    }

    await interaction.reply({
      content: "<:CC_check:1486569243884650606> **Description** submitted.",
      flags: 64
    });
  }
};