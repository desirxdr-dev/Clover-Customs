const discordTranscripts = require("discord-html-transcripts");

module.exports = {
  name: "close",

  async execute(message) {

    const STAFF_ROLE_ID = "1486541375221665963";
    const LOG_CHANNEL_ID = "1486552026996408574";

    // only allow in ticket channels


    // permission check
    if (
      !message.member.roles.cache.has(STAFF_ROLE_ID) &&
      !message.member.permissions.has("Administrator")
    ) {
      return message.reply(`${config.EMOJIS.x} You do **not** have permission to **close** this ticket.`);
    }

    const logChannel = message.guild.channels.cache.get(LOG_CHANNEL_ID);

    await message.reply(`${config.EMOJIS.check} *Closing ticket...*`);

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
        let openedBy = "Unknown";

        if (message.channel.topic?.startsWith("ticket-owner:")) {
          const id = message.channel.topic.split(":")[1];
          openedBy = `<@${id}>`;
        }

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