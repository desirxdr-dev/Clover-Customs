module.exports = {
  customId: "p_284218918657069067",

  async execute(interaction) {
    const HR_ROLE_ID = "1486541358398308485";

    const ORDER_CONFIGS = [
      {
        categoryId: "1486624103581352036",
        staffRoleIds: ["1486623365010559048"]
      },
      {
        categoryId: "1486624190583799949",
        staffRoleIds: ["1486623367821004881"]
      },
      {
        categoryId: "1486624241548922890",
        staffRoleIds: ["1486623370639441990"]
      },
      {
        categoryId: "1486624299149168651",
        staffRoleIds: ["1486623543574790235"]
      },
      {
        categoryId: "1486624372834828350",
        staffRoleIds: ["1486623543574790235"]
      }
    ];

    const channel = interaction.channel;

    if (!channel.topic || !channel.topic.startsWith("ticket-")) {
      return interaction.reply({
        content: "<:CC_xMark:1486569218789871626> This is not a valid order ticket.",
        flags: 64
      });
    }

    const match = ORDER_CONFIGS.find(cfg => channel.parentId === cfg.categoryId);

    if (!match) {
      return interaction.reply({
        content: "<:CC_xMark:1486569218789871626> This is not a valid order ticket.",
        flags: 64
      });
    }

    const hasStaffRole = match.staffRoleIds.some(roleId =>
      interaction.member.roles.cache.has(roleId)
    );

    const hasHrRole = interaction.member.roles.cache.has(HR_ROLE_ID);

    if (!hasStaffRole && !hasHrRole) {
      return interaction.reply({
        content: "<:CC_xMark:1486569218789871626> You do **not** have **permission** to close this order.",
        flags: 64
      });
    }

    await interaction.reply({
      content: "<:CC_check:1486569243884650606> **Closing** ticket in 5 seconds...",
      flags: 64
    });

    setTimeout(async () => {
      await channel.delete().catch(() => {});
    }, 5000);
  }
};