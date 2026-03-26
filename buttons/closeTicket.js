const discordTranscripts = require("discord-html-transcripts");

const staffRoleId = "1486541375221665963";
const LOG_CHANNEL_ID = "1486552026996408574";

module.exports = {
  customId: "close_ticket",

  async execute(interaction) {
const { PermissionFlagsBits } = require("discord.js");

if (
  !interaction.member.roles.cache.has(staffRoleId) &&
  !interaction.member.permissions.has(PermissionFlagsBits.Administrator)
) {
      return interaction.reply({
        content: "<:CC_xMark:1486569218789871626> You do **not** have **permission** to use this button.",
        ephemeral: true
      });
    }

    const channel = interaction.channel;

    if (!channel.topic || !channel.topic.startsWith("ticket-")) {
      return interaction.reply({
        content: "This is not a ticket channel.",
        ephemeral: true
      });
    }

    await interaction.reply({
      content: "<:CC_check:1486569243884650606> **Closing** ticket in 5 seconds..."
    });

    try {
      const transcript = await discordTranscripts.createTranscript(channel, {
        limit: -1,
        filename: "transcript.html"
      });

      const logChannel = interaction.guild.channels.cache.get(LOG_CHANNEL_ID);

      let openedBy = "Unknown";
      if (channel.topic?.startsWith("ticket-")) {
        const id = channel.topic.split("ticket-")[1];
        openedBy = `<@${id}>`;
      }

      const closedBy = interaction.user;

      if (logChannel) {
        await logChannel.send({
          flags: 32768,
          files: [transcript],
          components: [
            {
              type: 17,
              components: [
                { type: 10, content: "# Ticket Transcript" },
                { type: 14 },
                {
                  type: 10,
                  content: `Channel Name: ${channel.name}\nChannel ID: ${channel.id}`
                },
                { type: 14 },
                {
                  type: 10,
                  content: `Opened By: ${openedBy}\nClosed By: ${closedBy}`
                },
                { type: 14 },
                { type: 10, content: "**Transcript**" },
                {
                  type: 13,
                  file: { url: "attachment://transcript.html" }
                }
              ]
            }
          ]
        });
      }
    } catch (err) {
      console.error("Transcript error:", err);
    }

    setTimeout(async () => {
      await channel.delete().catch(() => {});
    }, 5000);
  }
};