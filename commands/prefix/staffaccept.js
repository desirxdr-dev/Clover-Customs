const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField
} = require("discord.js");

module.exports = {
  name: "staffaccept",

  async execute(message, args) {
    if (message.author.bot) return;

    const REQUIRED_ROLE_ID = "1466269101260411013";
const LOG_CHANNEL_ID = "1487544231617630209";

const isAdmin = message.member.permissions.has(PermissionsBitField.Flags.Administrator);
const hasRole = message.member.roles.cache.has(REQUIRED_ROLE_ID);
if (!isAdmin && !hasRole) {
  return message.reply("<:Sea_xMark:1486977010143199382> You do **not** have **permission** to use this command.");
}

const userId = args[0];
const feedback = args.slice(1).join(" ");

if (!userId || !feedback) {
  return message.reply("<:Sea_xMark:1486977010143199382> **Failed** to fetch a valid **user ID** or **feedback**.");
}

let user;
try {
  user = await message.client.users.fetch(userId);
} catch (err) {
  return message.reply("<:Sea_xMark:1486977010143199382> Failed to **fetch** a **valid** user ID.");
}

// optional ActionRow (not required if using your raw components)


try {
  await user.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "<:Sea_Arrow:1487544861199564870> **Congratulations!** You have been **accepted** as an employee at **Sea Customs**."
        }
      ]
    }
  ]
});

  const channel = message.guild.channels.cache.get(LOG_CHANNEL_ID);
  if (channel) {
    channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": `<:Sea_Arrow:1487544861199564870> ${user} has been accepted onto the team by ${interaction.user}.\n-# Feedback: ${feedback}`
        }
      ]
    }
  ]
}).catch(() => {});
  }

  return message.reply(`<:Sea_Check:1486976983555379330> **Successfully** accepted <@${userId}> onto the **Staff Team**.`);
} catch (err) {
  console.error("DM command error:", err);
  return message.reply("<:Sea_xMark:1486977010143199382> **Failed** to **message** user.");
}

  }
}