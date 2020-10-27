
module.exports = {
    // Put all the stuff you want in your help embed here, on every command
    name: "purge",
    description: "Purge some messages.",

    async run(message, args, bot) {

        const Discord = require('discord.js');
        if (!message.member.roles.cache.get('770593998024081418')) {
          message.delete();
          message.reply('You do not have the permission to use this command!');
          return;
      };

        if (!args[0]) return message.reply('You haven\'t given an amount of messages which should be deleted!');
        if (isNaN(args[0])) return message.reply("The amount parameter isn't a number!");
        if (args[0] > 100) return message.reply("You can't delete more than 100 messages at once!");
        if (args[0] < 1) return message.reply('You have to delete at least 1 message!');

        
        await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
			message.channel.bulkDelete(messages)
			
			const embed = new Discord.MessageEmbed()
        .setTitle('`Purge:`')
        .setDescription(`\`Amount:\` \`${args[0]}\``)
        .setAuthor(message.member.displayName)
        .setColor('GREEN')
        .setFooter('Rokoyo System developed by djng314')
        .setTimestamp();


    bot.channels.cache.get('764821688478859314').send(embed);
		});
		
    }
    
}