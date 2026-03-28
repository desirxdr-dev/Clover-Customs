const axios = require("axios");

module.exports = {
  name: "funds",

  async execute(message) {
    if (message.author.bot) return;

    // ============== CONFIG ==============
    const REQUIRED_ROLE_ID = "1466268852647235604";
    const GROUP_ID = process.env.ROBLOX_GROUP_ID;
    const ROBLOSECURITY = process.env.RBX_COOKIE;
    // ====================================

    // ===== PERMISSIONS (ADMIN OR ROLE) =====
    const isAdmin = message.member.permissions.has("Administrator");
    const hasRole = message.member.roles.cache.has(REQUIRED_ROLE_ID);

    if (!isAdmin && !hasRole) {
      return message.reply("<:Sea_xMark:1486977010143199382> You do **not** have **permission** to use this command.");
    }

    if (!ROBLOSECURITY || !GROUP_ID) {
      return message.reply("<:Sea_xMark:1486977010143199382> Bot is **not** configured correctly.");
    }

    const headers = {
      Cookie: `.ROBLOSECURITY=${ROBLOSECURITY}`
    };

    try {
      // ===== CURRENT FUNDS =====
      const currentFundsRes = await axios.get(
        `https://economy.roblox.com/v1/groups/${GROUP_ID}/currency`,
        { headers }
      );

      // ===== PENDING FUNDS =====
      const pendingFundsRes = await axios.get(
        `https://economy.roblox.com/v1/groups/${GROUP_ID}/revenue/summary/Day`,
        { headers }
      );

      const currentFunds = currentFundsRes.data.robux ?? 0;
      const pendingFunds = pendingFundsRes.data.pendingRobux ?? 0;
      const totalFunds = currentFunds + pendingFunds;

      // Optional: delete trigger

      await message.reply({
  "embeds": [
    {
      "author": {
        "name": "Group Funds"
      },
      "color": 2303016,
      "fields": [
        {
          "name": "Current Funds",
          "value": `**${currentFunds.toLocaleString()} ROBUX**`,
          "inline": true
        },
        {
          "name": "Incoming Funds",
          "value": `**${pendingFunds.toLocaleString()} ROBUX**`,
          "inline": true
        },
        {
          "name": "Total Funds",
          "value": `**${totalFunds.toLocaleString()} ROBUX**`,
          "inline": true
        }
      ],
      "image": {
        "url": "https://media.discordapp.net/attachments/1466313747315560727/1466323402574008420/Screenshot_2026-01-21_at_7.37.44CPM.png?ex=698393d6&is=69824256&hm=3471f33c4a318af09820c8bbfdec92e5cb12b8cfafb69a9a11a6f445c22306ce&=&format=webp&quality=lossless"
      }
    }
  ]
});

    } catch (error) {
      console.error("FUNDS ERROR:", error.response?.data || error);
      await message.channel.send("<:Sea_xMark:1486977010143199382> Failed to fetch **group** funds.");
    }
  }
};



