module.exports = {
  customId: "order_claim",

  async execute(interaction) {
    const channel = interaction.channel;

    const ORDER_CONFIGS = [
      {
        categoryId: "PUT_GRAPHICS_CATEGORY_ID_HERE",
        staffRoleIds: ["1486623365010559048"]
      },
      {
        categoryId: "PUT_CLOTHING_CATEGORY_ID_HERE",
        staffRoleIds: ["1486623367821004881"]
      },
      {
        categoryId: "PUT_LIVERIES_CATEGORY_ID_HERE",
        staffRoleIds: ["1486623370639441990"]
      },
      {
        categoryId: "PUT_DISCORD_CATEGORY_ID_HERE",
        staffRoleIds: ["1486623543574790235"]
      },
      {
        categoryId: "PUT_DEVELOPMENT_CATEGORY_ID_HERE",
        staffRoleIds: ["1486623381351698502"]
      }
    ];

    if (!channel.topic || !channel.topic.startsWith("ticket-")) {
  return interaction.reply({
    content: "<:CC_xMark:1486569218789871626> This is not a valid order ticket.",
    flags: 64
  });
}

    const hasStaffRole = match.staffRoleIds.some(roleId =>
      interaction.member.roles.cache.has(roleId)
    );

    if (!hasStaffRole) {
      return interaction.reply({
        content: "<:CC_xMark:1486569218789871626> You do **not** have **permission** to claim this order.",
        flags: 64
      });
    }

    const updated = JSON.parse(JSON.stringify(interaction.message.components));

    for (const row of updated[0].components) {
      if (row.type === 1 && Array.isArray(row.components)) {
        for (const button of row.components) {
          if (button.type === 2 && button.custom_id === "order_claim") {
            button.label = "Claimed";
            button.style = 3;
            button.disabled = true;
          }
        }
      }
    }

    await channel.setName(`🟢-${interaction.user.username}`).catch(() => {});

    await interaction.update({
      components: updated
    });

    await channel.send(`${interaction.user} has **claimed** this order.`);
  }
};