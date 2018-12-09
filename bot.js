const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("UwU")
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}Kick`) {

    //!Kick @user 

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find user!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That user can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
      .setDescription("~Kick~")
      .setColor("#60a8f8")
      .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
      .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Time", message.createdAt)
      .addField("Reason", kReason);

      let kickChannel = message.guild.channels.find(`name`, "modlog");
      if(!kickChannel) return message.channel.send("Couldn't find modlog channel.");

      message.guild.member(kUser).kick(kReason);
      kickChannel.send(kickEmbed);

    return;
  }

  if(cmd === `${prefix}serverinfo`) {
    let sicon = message.guild.displayAvatarURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#f50202")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created on", message.guild.createdAt)
    .addField("Joined on", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount)

    return message.channel.send(serverembed);

  }

if(cmd === `${prefix}hello`) {
  return message.channel.send("Hello!");
}

})

bot.login(process.env.BOT_TOKEN);
