
module.exports = {
    // Put all the stuff you want in your help embed here, on every command
    name: "unmute",
    description: "Unmute a member.",

    async run(message, args, bot) {

        const Discord = require('discord.js');
        if (!message.member.roles.cache.get('770593998024081418')) {
          message.delete();
          message.reply('You do not have the permission to use this command!');
          return;
      };

	  let toUnmute = message.mentions.members.first();
	  if(!toUnmute) return message.reply("Supply a user to be unmuted");
	  let muteRole = message.guild.roles.cache.find(r => r.name === "Muted");
	  const unmuteConfirm = new Discord.MessageEmbed()
	  .setColor('#0099ff')
	  .setDescription(`✅ ${toUnmute.user.username} has been successfully unmuted!`);
	  toUnmute.roles.remove(muteRole.id).then(() => {
		  message.delete()
		  toUnmute.send(`You have been unmuted in **${message.guild.name}**`)
		  message.channel.send(unmuteConfirm)
        
        const embed = new Discord.MessageEmbed()
        .setTitle('`Unmuted:`')
        .setAuthor(message.member.displayName)
        .setColor('YELLOW')
        .setThumbnail(toUnmute.user.avatarURL())
        .addFields({
            name: 'Member',
            value: toUnmute.toString(),
            inline: true
        }, {
            name: 'Member ID',
            value: toUnmute.id,
            inline: true
        })
        .setFooter('Rokoyo System developed by djng314')
        .setTimestamp();


    bot.channels.cache.get('764821688478859314').send(embed);
	});
    }
}