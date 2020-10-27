const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '?';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log('System is online!');
});
client.on('ready',() =>{
  
    client.user.setActivity('Rokoyo System | Prefix: ?', { type: 'WATCHING' });
    
  })
  
  client.on('messageDelete',message =>{
    const channel = client.channels.cache.get('764821688478859314');
    const ember = new Discord.MessageEmbed()
    .setColor('#FFFF66')
     .setTitle(`Deleted Message`)
    .setDescription(message)
    .setFooter('Author: ' + message.author.username)
    channel.send(ember)
    
  })

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').run(message, args);
    }; 
    if(command === 'ban'){
        client.commands.get('ban').run(message, args, client);
    };
    if(command === 'kick'){
        client.commands.get('kick').run(message, args, client);
    };

    if(command === 'mute'){
        client.commands.get('mute').run(message, args, client);
    };

    if(command === 'purge'){
        client.commands.get('purge').run(message, args,client);
    };
    
    if(command === 'unmute'){
        client.commands.get('unmute').run(message, args, client);
    };

    if(command === 'warn'){
        client.commands.get('warn').run(message, args, client);
    };

    if(command === 'warnings'){
        client.commands.get('warnings').run(message, args, client);
    };

    if(command === 'help'){
        client.commands.get('help').run(message, args, client);
    }

});

client.login(process.env.BOT_TOKEN);



