const { mongoose } = require('mongoose');
const mongo = require('..//mongo')
const warnSchema = require('..//schema/warn-schema')

module.exports = {

    name: "warn",
    description: "Warns a member.",

    async run(message, args, bot) {
        const Discord = require('discord.js');
      if (!message.member.roles.cache.get('770593998024081418')) {
        message.delete();
        message.reply('You do not have the permission to use this command!');
        return;
    };

    let person = message.guild.member(message.mentions.users.first());
     
      if (!person) return message.channel.send('You did not provide a member!');
    
    
    
    const guildId = message.guild.id
    const userId = person.id
    const reason = args.slice(1).join(" ");
      if(!reason) return message.channel.send('You did not provide a reason!');

      const playerembed = new Discord.MessageEmbed()
         .setTitle("Warning ⚠️")
         .setDescription(`\`Reason:\` \`${reason}\``)
          .addFields({
            name: 'Member',
            value: person,
            inline: true
        },
        {
            name: 'User Id',
            value: userId,
            inline: true
        },
        {
            name: 'Moderator',
            value: message.member.displayName,
            inline: true
        },
        )
          .setColor('RED')
          .setFooter('Rokoyo System developed by djng314')
          .setTimestamp();

          message.channel.send(playerembed)
      const warning = {
        author: message.member.user.tag,
        timestamp: new Date().getTime(),
        reason
      }
    
      await mongo().then(async mongoose=>{
        try{
            await warnSchema.findOneAndUpdate({
                guildId,
                userId
            }, {
                guildId,
                userId,
                $push: {warnings: warning
                }

            }, {
                upsert: true

            })
        }finally{
            mongoose.connection.close()
        }


      })

    },
    

}