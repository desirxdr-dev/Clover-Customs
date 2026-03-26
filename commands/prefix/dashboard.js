module.exports = {
    name: "dashboard",
    async execute (message, args, client) {
        const REQUIRED_ROLE_ID = "1486541355726671922";
        
    if (
      !message.member.roles.cache.has(REQUIRED_ROLE_ID) &&
      !message.member.permissions.has("Administrator")
    ) {
      return message.reply("<:CC_xMark:1486569218789871626> You do **not** have **permission** to use this command.");

    }
    await message.channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 12,
          "items": [
            {
              "media": {
                "url": "https://media.discordapp.net/attachments/1486558722338852904/1486559073095647242/26.png?ex=69c5f185&is=69c4a005&hm=cdacb21e66e18e09e7722b48afa407353f1a920da54719c2589ce65a427f4994&=&format=webp&quality=lossless&width=2512&height=861"
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
          "content": "Welcome to **Clover Customs** - your go-to design hub  for graphics, clothing, liveries, bots, and more. We provide fast, cheap, and high quality products to our customers. From our cheap prices to our design quality, we ensure customer satisfaction throughout each order. Order today to receive the highest quality products."
        },
        {
          "type": 1,
          "components": [
            {
              "style": 4,
              "type": 2,
              "label": "Help",
              "flow": {
                "actions": []
              },
              "custom_id": "help"
            },
            {
              "style": 2,
              "type": 2,
              "label": "Guidelines",
              "flow": {
                "actions": []
              },
              "custom_id": "guidelines"
            },
            {
              "style": 2,
              "type": 2,
              "label": "Server Info",
              "flow": {
                "actions": []
              },
              "custom_id": "server_info"
            },
            {
              "type": 2,
              "style": 5,
              "label": "Roblox Group",
              "url": "https://www.roblox.com/communities/868653117/Clover-Customs-I-Roblox-Group#!/about",
              "custom_id": "p_284165314248183818"
            }
          ]
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
})

    }
}