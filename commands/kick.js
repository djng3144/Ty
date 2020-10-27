module.exports = {
  name: "kick",
  description: "Kicks a member",
  async run(message, args, bot) {
      
      const Discord = require('discord.js');
      if (!message.member.roles.cache.get('770593998024081418')) {
        message.delete();
        message.reply('You do not have the permission to use this command!');
        return;
    };

     
      let person = message.guild.member(message.mentions.users.first());
     
      if (!person) return message.channel.send('You did not provide a GuildMember!');

      if (!person.kickable) return message.channel.send('I cannot kick this person.');
 
      if (person.id === message.author.id) return message.channel.send('You cannot kick yourself!');


      let reason = args.slice(1).join(" ");
	    if(!reason) reason = "No reason given";

      if (args[2]) reason = args.splice(2).join(" ");
     

      if (!person.user.bot) {
        const playerembed = new Discord.MessageEmbed()
         .setTitle("You have been kicked!")
         .setDescription(`\`Reason:\` \`${reason}\``)
          .setAuthor(message.member.displayName)
          .setColor('RED')
          .setFooter('Rokoyo System developed by djng314')
          .setTimestamp();

          person.send(playerembed);
      }

      person.kick({
          reason: reason
      });



      const embed = new Discord.MessageEmbed()
          .setTitle('`Kick:`')
          .setDescription(`\`Reason:\` \`${reason}\``)
          .setAuthor(message.member.displayName)
          .setColor('RED')
          .setThumbnail(person.user.avatarURL())
          .addFields({
              name: 'Member',
              value: person.toString(),
              inline: true
          }, {
              name: 'Member ID',
              value: person.id,
              inline: true
          })
          .setFooter('Rokoyo System developed by djng314')
          .setTimestamp();


      bot.channels.cache.get('764821688478859314').send(embed);

  
  }
}