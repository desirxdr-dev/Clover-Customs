module.exports = {
  name: "order",

  async execute(message) {
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
                    "url": "https://media.discordapp.net/attachments/1486558722338852904/1486558908557295636/34.png?ex=69c5f15e&is=69c49fde&hm=f5fb39b1e45513fd7f58e9fa38a39f92d35c1611bb484443a8b3492f1a60d483&=&format=webp&quality=lossless&width=1872&height=642"
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
              "content": "If you are looking to order at **Clover Customs**, ensure to review our **Order Guidelines** prior to ordering. You can order using the button below."
            },
            {
              "type": 1,
              "components": [
                {
                  "style": 1,
                  "type": 2,
                  "label": "Graphics",
                  "flow": {
                    "actions": []
                  },
                  "custom_id": "p_284217574709792769"
                },
                {
                  "style": 1,
                  "type": 2,
                  "label": "Clothing",
                  "flow": {
                    "actions": []
                  },
                  "custom_id": "p_284217578547580930"
                },
                {
                  "style": 1,
                  "type": 2,
                  "label": "Liveries",
                  "flow": {
                    "actions": []
                  },
                  "custom_id": "p_284217717286768643"
                },
                {
                  "style": 1,
                  "type": 2,
                  "label": "Discord",
                  "flow": {
                    "actions": []
                  },
                  "custom_id": "p_284217720642211844"
                },
                {
                  "style": 1,
                  "type": 2,
                  "label": "Development",
                  "flow": {
                    "actions": []
                  },
                  "custom_id": "p_284217723913768965"
                }
              ]
            },
            {
              "type": 1,
              "components": [
                {
                  "style": 2,
                  "type": 2,
                  "label": "Order Guidelines",
                  "flow": {
                    "actions": []
                  },
                  "custom_id": "p_284217804868030470"
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
    });
  }
};