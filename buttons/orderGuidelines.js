module.exports = {
  customId: "p_284217804868030470",

  async execute(interaction) {
    await interaction.reply({
      "flags": 32768 | 64,
      "components": [
        {
          "type": 17,
          "components": [
            {
              "type": 12,
              "items": [
                {
                  "media": {
                    "url": "https://media.discordapp.net/attachments/1486558722338852904/1486559044016537701/27.png?ex=69c5f17f&is=69c49fff&hm=65425905736a034bbb1eb83d87e22b42bf6d4e4eaa015ad95c7c121ee6219066&=&format=webp&quality=lossless&width=1872&height=642"
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
              "content": "` #1 ` **Payment Methods**\n- Robux payment is accepted.\n- We do not offer USD payment methods yet."
            },
            {
              "type": 14,
              "divider": false
            },
            {
              "type": 10,
              "content": "` #2 ` **Payment Before Start**\n- You will be required to pay before your designer starts working on your order.\n- There are no exceptions; 100% payment is expected."
            },
            {
              "type": 14,
              "divider": false
            },
            {
              "type": 10,
              "content": "` #3 ` **Queue**\n- There may be a queue when ordering. It is based on a first come first serve bias.\n- You can pay extra to bypass the queue."
            },
            {
              "type": 14,
              "divider": false
            },
            {
              "type": 10,
              "content": "` #4 ` **Common Sense**\n- Use your common sense when ordering.\n- Your ticket may be closed for any reason deemed fit.\n- You will **not** be offered a refund if you violate Order Terms and your ticket is closed."
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