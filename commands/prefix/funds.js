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
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "# Current Funds"
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `**Current Funds**\n${currentFunds.toLocaleString()} ROBUX\n\n**Pending Funds**\n${pendingFunds.toLocaleString()} ROBUX\n\n**Total Funds**\n${totalFunds.toLocaleString()} ROBUX`
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 12,
          "items": [
            {
              "media": {
                "url": "https://media.discordapp.net/attachments/1486918779668529243/1486964125367275712/image.png?ex=69c8bc41&is=69c76ac1&hm=db3ba6119aa9bb96efa9039a5a7179faf389434c4101e04a1155464e9600a87e&=&format=webp&quality=lossless"
              }
            }
          ]
        }
      ]
    }
  ]
});

    } catch (error) {
      console.error("FUNDS ERROR:", error.response?.data || error);
      await message.channel.send("<:Sea_xMark:1486977010143199382> Failed to fetch **group** funds.");
    }
  }
};



