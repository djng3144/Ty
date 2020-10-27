module.exports = {
    name: 'ping',
    description: "this is a ping command!",
    async run(message, args){
        message.channel.send("Pinging...").then(m =>{
            // The math thingy to calculate the user's ping
              var ping = m.createdTimestamp - message.createdTimestamp;
              const Discord = require('discord.js');
            // Basic embed
              var embed = new Discord.MessageEmbed()
              .setTitle('PONGGGGGGG! 🏓')
              .addFields(
                { name: 'Your ping', value: `${ping} ms.` }
            )
              .setColor('#E5BF74')
              .setTimestamp()
              .setFooter('Rokoyo System developed by djng314')
              
              // Then It Edits the message with the ping variable embed that you created
              m.edit(embed)
        });
    }
}