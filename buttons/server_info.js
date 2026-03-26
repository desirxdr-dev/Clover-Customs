module.exports = {
    customId: "server_info",

    async execute(interaction) {
        await interaction.reply({
  "flags": 32768,
  "ephemeral": true,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 12,
          "items": [
            {
              "media": {
                "url": "https://media.discordapp.net/attachments/1486558722338852904/1486559030351761499/28.png?ex=69c5f17b&is=69c49ffb&hm=95f35df4b841adc733a64bc5c2e3d6ca7086d0090110553f1bd90d504c184a42&=&format=webp&quality=lossless&width=2512&height=861"
              }
            }
          ]
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": "Welcome to **Clover Customs**. We offer ER:LC services, from graphics to bots, we construct products fast and cheap."
        },
        {
          "type": 14,
          "divider": false
        },
        {
          "type": 10,
          "content": "**Services**\n- Graphics (Logos & Banners)\n- Clothing\n- Liveries\n- Discord (Servers & Embeds)\n- Development"
        },
        {
          "type": 14,
          "divider": false
        },
        {
          "type": 10,
          "content": "**Employee Information**\n- Allowed up to **2** LOAs per month (14 days maximum)\n- 90% payout for each order\n- Must complete 1 order per week (depending on amount of orders, quantity of order)\n- Customer Support: Must handle 2+ tickets per week (depending on amount of tickets opened)"
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
                "url": "https://media.discordapp.net/attachments/1486558722338852904/1486559089571139685/25.png?ex=69c5f189&is=69c4a009&hm=b96edcbdf8c58933c9e7f3664b8ce51248e891e5614b56fc01241cc12f19610b&=&format=webp&quality=lossless"
              }
            }
          ]
        }
      ]
    }
  ]
});
    }
};