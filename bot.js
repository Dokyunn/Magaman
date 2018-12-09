const discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", async () => {
  console.log(`${client.user.username} is online!`);
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  
if(cmd === `${prefix}hello`) {
  return message.channel.send("Hello!");
}
  
bot.logn(process.env.BOT_TOKEN)

