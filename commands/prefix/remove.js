module.exports = {
  name: "remove",

  async execute(message, args) {

    if (message.author.bot) return;

    // 🔹 REQUIRED ROLE
    const REQUIRED_ROLE_ID = "1471741614463520868";

    // 🔹 STAFF ROLES TO REMOVE
    const STAFF_ROLE_IDS = [
      "1466268744585056469",
      "1466268852647235604",
      "1476425198508052500",
      "1466269101260411013",
      "1486911438458196039",
      "1486911435610128484",
      "1466310897969397945",
      "1477768302058143935",
      "1477768788882620539",
      "1477768739897479259",
      "1477768761212797159",
      "1466269045253738628",
      "1466310900121337856",
      "1466310900679049226",
      "1466310909172383944",
      "1466310901203468361",
      "1478500833434931262",
      "1478505490060279809",
      "1478500977840492575",
      "1478500907829166231",
      "1478500932064116980",
      "1477769068466405657",
      "1466310909797335164",
      "1466311129855950989",
      "1466311131948908637",
      "1466311130342232157",
      "1466311131428688047",
      "1466311392918372403",
      "1468413293042466897",
      "1468413212020969543",
      "1466311471821750538",
      "1466311593666281690",
      "1466311581158740115",
      "1466311594316398755"

    ];

    // 🔹 LOG CHANNEL
    const LOG_CHANNEL_ID = "1487544231617630209";

    const isAdmin = message.member.permissions.has("Administrator");
    const hasRole = message.member.roles.cache.has(REQUIRED_ROLE_ID);

    if (!isAdmin && !hasRole) {
      return message.reply({
        content: "<:Sea_xMark:1486977010143199382> You do **not** have **permission** to use this command.",
        allowedMentions: { repliedUser: false }
      });
    }

    const userId = args[0];

    if (!userId) {
      return message.reply({
        content: "**<:Sea_xMark:1486977010143199382> Failed** to detect a valid **user ID**.",
        allowedMentions: { repliedUser: false }
      });
    }

    const target = message.guild.members.cache.get(userId);

    if (!target) {
      return message.reply({
        content: "<:Sea_xMark:1486977010143199382> **Failed** to cache user.",
        allowedMentions: { repliedUser: false }
      });
    }

    // 🔥 roles to remove
    const rolesToRemove = STAFF_ROLE_IDS.filter(roleId =>
      target.roles.cache.has(roleId)
    );

    if (!rolesToRemove.length) {
      return message.reply({
        content: "<:Sea_xMark:1486977010143199382> User is **not** a **staff** member.",
        allowedMentions: { repliedUser: false }
      });
    }

    try {

      await target.roles.remove(rolesToRemove);

      // optional nickname reset
      try {
        await target.setNickname(null);
      } catch {}

      // 🔹 LOG CHANNEL
      const logChannel = message.guild.channels.cache.get(LOG_CHANNEL_ID);

      if (logChannel) {
        await logChannel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": `${target} (\`${target.id}\`) has been **removed** as an employee at **Sea Customs**.`
        }
      ]
    }
  ]
});
      }

      // 🧹 delete command
      try {
        await message.delete();
      } catch {}

      target.send("<:Sea_Arrow:1487544861199564870> You have been **removed** from the **Staff Team**.")
      // ✅ confirmation
      await message.channel.send(
        `<:Sea_Check:1486976983555379330> **Successfully** removed ${target} from the staff team.`
      );

    } catch (err) {
      console.error(err);

      message.reply({
        content: "<:Sea_xMark:1486977010143199382> An **error** occured while attempting to remove the user's roles.",
        allowedMentions: { repliedUser: false }
      });
    }

  }
};