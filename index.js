require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { Client, GatewayIntentBits, Collection } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.prefix = process.env.PREFIX || "-";

client.prefixCommands = new Collection();
client.slashCommands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();

// ================= HANDLERS =================
const handlersPath = path.join(__dirname, "handlers");
const handlerFiles = fs.readdirSync(handlersPath).filter(file => file.endsWith(".js"));

for (const file of handlerFiles) {
  const handler = require(path.join(handlersPath, file));
  handler(client);
}

// ================= EVENTS =================
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(path.join(eventsPath, file));

  if (event.once) {
    client.once(event.name, (...args) => event.execute(client, ...args));
  } else {
    client.on(event.name, (...args) => event.execute(client, ...args));
  }
}

client.login(process.env.TOKEN);