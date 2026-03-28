const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField
} = require("discord.js");

module.exports = {
  name: "dm",

  async execute(message, args) {
    if (message.author.bot) return;

    const REQUIRED_ROLE_ID = "1466268852647235604";
const LOG_CHANNEL_ID = "1466314007714594856";

const isAdmin = message.member.permissions.has(PermissionsBitField.Flags.Administrator);
const hasRole = message.member.roles.cache.has(REQUIRED_ROLE_ID);
if (!isAdmin && !hasRole) {
  return message.reply("<:Sea_xMark:1486977010143199382> You do **not** have **permission** to use this command.");
}

const userId = args[0];
const text = args.slice(1).join(" ");

if (!userId || !text) {
  return message.reply("<:Sea_xMark:1486977010143199382> **Failed** to fetch a valid **user ID** or **message**.");
}

let user;
try {
  user = await message.client.users.fetch(userId);
} catch (err) {
  return message.reply("<:Sea_xMark:1486977010143199382> Failed to **fetch** a **valid** user ID.");
}

// optional ActionRow (not required if using your raw components)
const row = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
    .setCustomId("dm_reply")
    .setLabel("Reply")
    .setStyle(ButtonStyle.Secondary)
);

try {
  await user.send({
    flags: 32768,
    components: [
      {
        type: 17,
        components: [
          { type: 10, content: "# Direct Message" },
          { type: 14, spacing: 2 },
          {
            type: 10,
            content:
              "A message has been sent to you by our **Directive Team**. Ensure to reply as soon as possible if prompted to. Use the button below to reply."
          },
          { type: 14, divider: false },
          {
            type: 9,
            components: [
              {
                type: 10,
                content: `**Message**: \`${text}\``
              }
            ],
            accessory: {
              style: 2,
              type: 2,
              label: "Reply",
              custom_id: "dm_reply"
            }
          },
          { type: 14, spacing: 2 },
          {
            type: 12,
            items: [
              {
                media: {
                  url: "https://media.discordapp.net/attachments/1486918779668529243/1486964125367275712/image.png?ex=69c8bc41&is=69c76ac1&hm=db3ba6119aa9bb96efa9039a5a7179faf389434c4101e04a1155464e9600a87e&=&format=webp&quality=lossless"
                }
              }
            ]
          }
        ]
      }
    ]
  });

  const channel = message.guild.channels.cache.get(LOG_CHANNEL_ID);
  if (channel) {
    channel.send({
      flags: 32768,
      components: [
        {
          type: 17,
          components: [
            { type: 10, content: "# Message Log" },
            { type: 14, spacing: 2 },
            {
              type: 10,
              content: `A message has been sent by ${message.author} using the bot.\n\n**User**: ${user}\n**Message**: ${text}`
            },
            { type: 14, spacing: 2 },
            {
              type: 12,
              items: [
                {
                  media: {
                    url: "https://media.discordapp.net/attachments/1486918779668529243/1486964125367275712/image.png?ex=69c76ac1&is=69c61941&hm=e217cbe1c7a65c48a2a7189259d90e304cfa279dd4d1e0d03f40a8f30f5e3107&=&format=webp&quality=lossless"
                  }
                }
              ]
            }
          ]
        }
      ]
    }).catch(() => {});
  }

  return message.reply(`<:Sea_Check:1486976983555379330> **Successfully** sent message to <@${userId}>.`);
} catch (err) {
  console.error("DM command error:", err);
  return message.reply("<:Sea_xMark:1486977010143199382> **Failed** to **message** user.");
}

  }
}