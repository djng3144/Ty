

module.exports = {
    // Put all the stuff you want in your help embed here, on every command
    name: "help",
    description: "Shows a help embed",

    async run(message, args, bot) {

        const Discord = require('discord.js');
        if (!args[1]) {

            
             const helpArray = bot.commands
             .map(value => `**Name:** \`${value.name}\`    **Description:** \`${value.description}\``)

 

            // Creating the embed
            const helpEmbed = new Discord.MessageEmbed()
                .setTitle(`${message.guild.name}: Help`)
                .setAuthor(message.member.displayName)
                .setColor('#E5BF74')
                .setThumbnail(message.author.avatarURL())
                .setTimestamp()
                .addField('Commands:', helpArray)
                .setFooter('Rokoyo System developed by djng314');

            // Sending the embed
            // If you also want to send this in DMs, do "message.author.send(helpEmbed)"
            message.author.send(helpEmbed);
            const sentEmbed1 = new Discord.MessageEmbed()
            .setTitle("Rokoyo System")
            .setDescription("✅ Help is sent to your DM! Check your DM for more information!")
            .setTimestamp()
            .setFooter('Rokoyo System developed by djng314');
            message.channel.send(sentEmbed1);

            // This is for !help <command>
        } else {

            // Making sure that what they enter is a command or one of its aliases
            if (!bot.commands.find(command => command.aliases.includes(args[1]))) return message.channel.send(`${args[1]} is not a command!`);

            // Storing the command file into a variable
            const helpIndividualCommand = bot.commands.find(command => command.aliases.includes(args[1]))

            // Creating the embed (change how you like)
            const helpIndividualEmbed = new Discord.MessageEmbed()
                .setTitle(`${message.guild.name}: Help`)
                .setAuthor(message.member.displayName)
                .setDescription(`Information on the ${helpIndividualCommand.name} command:`)
                .setColor('#E5BF74')
                .setThumbnail(message.author.avatarURL())
                .addFields(
                    // Add more or less of these fields for more or less things you have in your module.exports
                    { name: 'Name:', value: helpIndividualCommand.name, inline: true },
                    { name: 'Description:', value: helpIndividualCommand.description, inline: true }
                )
                .setTimestamp()
                .setFooter('Rokoyo System developed by djng314');
                
                // Sending the embed
                message.author.send(helpIndividualEmbed);
            const sentEmbed = new Discord.MessageEmbed()
                .setTitle("Rokoyo System")
                .setDescription("✅ Help is sent to your DM! Check your DM for more information!")
                .setTimestamp()
                .setFooter('Rokoyo System developed by djng314');
                message.channel.send(sentEmbed);
        }
    }
}