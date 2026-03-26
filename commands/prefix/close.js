const discordTranscripts = require("discord-html-transcripts");

module.exports = {
  name: "close",

  async execute(message) {

    const STAFF_ROLE_ID = "1486541375221665963";
    const LOG_CHANNEL_ID = "1486552026996408574";

    // only allow in ticket channels

// only allow in ticket channels
if (!message.channel.topic || !message.channel.topic.startsWith("ticket-")) {
  return message.reply("<:CC_xMark:1486569218789871626> This channel is **not** a **ticket**.");
}

// get ticket owner
let openedBy = "Unknown";
if (message.channel.topic?.startsWith("ticket-")) {
  const id = message.channel.topic.replace("ticket-", "");
  openedBy = `<@${id}>`;
}
    // permission check
    if (
      !message.member.roles.cache.has(STAFF_ROLE_ID) &&
      !message.member.permissions.has("Administrator")
    ) {
      return message.reply(`<:CC_xMark:1486569218789871626> You do **not** have permission to **close** this ticket.`);
    }

    const logChannel = message.guild.channels.cache.get(LOG_CHANNEL_ID);

    await message.reply(`<:CC_check:1486569243884650606> **Closing** ticket in 5 seconds...`);

    setTimeout(async () => {

      try {

        // generate transcript
        const transcript = await discordTranscripts.createTranscript(message.channel, {
          limit: -1,
          filename: "transcript.html"
        });

        // ticket info
        const channelName = message.channel.name;
        const channelId = message.channel.id;
        const closedBy = message.author;

        // get ticket owner from topic


        // send log
        if (logChannel) {
          await logChannel.send({
            files: [transcript],
            flags: 32768,
            components: [
              {
                type: 17,
                components: [
                  {
                    type: 10,
                    content: "# Ticket Transcript"
                  },
                  {
                    type: 14
                  },
                  {
                    type: 10,
                    content: `Channel Name: ${channelName}\nChannel ID: ${channelId}`
                  },
                  {
                    type: 14
                  },
                  {
                    type: 10,
                    content: `Opened By: ${openedBy}\nClosed By: ${closedBy}`
                  },
                  {
                    type: 14
                  },
                  {
                    type: 10,
                    content: "**Transcript**"
                  },
                  {
                    type: 13,
                    file: {
                      url: "attachment://transcript.html"
                    }
                  },
                  {
                    type: 14,
                    spacing: 2
                  },
                  {
                    type: 12,
                    items: [
                      {
                        media: {
                          url: "https://media.discordapp.net/attachments/1486558722338852904/1486559089571139685/25.png?ex=69c5f189&is=69c4a009&hm=b96edcbdf8c58933c9e7f3664b8ce51248e891e5614b56fc01241cc12f19610b&=&format=webp&quality=lossless"
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          });
        }

      } catch (err) {
        console.error("Transcript error:", err);
      }

      // delete ticket
      message.channel.delete().catch(() => {});

    }, 5000);

  }
};