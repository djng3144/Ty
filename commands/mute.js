
module.exports = {
    // Put all the stuff you want in your help embed here, on every command
    name: "mute",
    description: "Mute a member.",

    async run(message, args, bot) {

        const Discord = require('discord.js');
        if (!message.member.roles.cache.get('770593998024081418')) {
          message.delete();
          message.reply('You do not have the permission to use this command!');
          return;
      };

let toMute = message.mentions.members.first();
	if(!toMute) return message.reply("Supply a user to be muted!");
	let reason = args.slice(1).join(" ");
	if(!reason) reason = "No reason given";
	let muteRole = message.guild.roles.cache.find(r => r.name === "Muted");
	if(!muteRole) {
		try {
			muteRole = await message.guild.roles.create({
				data: {
					name: "Muted",
					color: "#514f48",
					permissions: []
				}
			});
		} catch (e) {
			console.log(e.stack);
		}
	}
	message.guild.channels.cache.forEach((channel) => {
		channel.updateOverwrite(muteRole, {
			"SEND_MESSAGES": false,
			"ATTACH_FILES": false,
			"SEND_TTS_MESSAGES": false,
			"ADD_REACTIONS": false,
			"SPEAK": false,
			"STREAM": false
		});
	});
    
    const muteConfirm = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setDescription(`✅ ${toMute.user.username} has been successfully muted!\nReason: __${reason}__`);
	toMute.roles.add(muteRole.id).then(() => {
		message.delete()
		toMute.send(`You have been muted in **${message.guild.name}** for: **${reason}**`)
        message.channel.send(muteConfirm)
        
        const embed = new Discord.MessageEmbed()
        .setTitle('`Muted:`')
        .setDescription(`\`Reason:\` \`${reason}\``)
        .setAuthor(message.member.displayName)
        .setColor('YELLOW')
        .setThumbnail(toMute.user.avatarURL())
        .addFields({
            name: 'Member',
            value: toMute.toString(),
            inline: true
        }, {
            name: 'Member ID',
            value: toMute.id,
            inline: true
        })
        .setFooter('Rokoyo System developed by djng314')
        .setTimestamp();


    bot.channels.cache.get('764821688478859314').send(embed);
	});
    }
}