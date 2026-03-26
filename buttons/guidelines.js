module.exports = {
  customId: "guidelines",

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
                "url": "https://media.discordapp.net/attachments/1486558722338852904/1486559044016537701/27.png?ex=69c5f17f&is=69c49fff&hm=65425905736a034bbb1eb83d87e22b42bf6d4e4eaa015ad95c7c121ee6219066&=&format=webp&quality=lossless&width=2512&height=861"
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
          "content": "` #1 ` **Discord ToS & Community Guidelines**\n- You are required to follow all guidelines listed within [Discord ToS](https://discord.com/terms) & [Discord Community Guidelines](https://discord.com/guidelines). \n- Failure to do so will result in a non-appealable ban from our server & a report to Discord."
        },
        {
          "type": 14,
          "divider": false
        },
        {
          "type": 10,
          "content": "` #2 ` **Respect**\n- Disrespect, hateful speech, or discrimination is prohibited.\n- Racism is strictly prohibited."
        },
        {
          "type": 14,
          "divider": false
        },
        {
          "type": 10,
          "content": "` #3 ` **Disruptions & Channel Usage**\n- Disruptions, drama, & pings should be kept to a minimum.\n- Mentioning Management+ without a valid reason will result in moderation.\n- Ensure to use the correct channel for the correct usage."
        },
        {
          "type": 14,
          "divider": false
        },
        {
          "type": 10,
          "content": "` #4 ` **Common Sense**\n- Use your common sense at all times.\n- You may be moderated for reasons that are not listed here."
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