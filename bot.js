const Discord = require('discord.js');
const client = new Discord.Client();

const serverConfig = require('./server_config.js');

// Modules

let modules = {};


modules.rationals = require('./bot_modules/loot.js');

//not sure if I'm going to have help or not
//let help = "lootbot v1.0\n";
//help += "\n";

let commandHandlers = {};

for (let module in modules) {

  /*if (modules[module].help) {

    help += modules[module].help;

}*/

  if (modules[module].commandHandlers) {

    Object.assign(commandHandlers, modules[module].commandHandlers);

  }

};

// Config file

let botConfig = require('./config.json');

// Debug message for on ready
client.on('ready', () => {

  // Print startup console header

  console.log('You get nothing! You LOSE! GOOD DAY, SIR!');

  // Create or update configuration files for each server the bot is present in.

  client.guilds.forEach (function (guild) {

    serverConfig.initialiseServerConfig(guild);

  });

  // Print server connection status

  console.log("Connected to " + client.guilds.size + " server(s).");

  // Set game status

  client.user.setGame("$open <box> | $boxes");

});

// On message, process commands
client.on('message', message => {

  if (message.content) {

    let command = message.content.match(/^\$\w+/);

    if (command && message.author.bot == false) {

      //** Process command text and arguments

      // commandText is the command without the !
      let commandText = command[0].substr(1);

      let commandArgs = message.content.replace(command[0], '');

      // Remove leading space from arguments
      if (commandArgs) {
        commandArgs = commandArgs.substr(1);
      }

      //** Pass commands onwards

      for (let commandHandlerName in commandHandlers) {

        if (commandText === commandHandlerName) {

          commandHandlers[commandHandlerName](message, commandArgs);

        }

      }

      /*if (commandText === "help") {

        message.channel.send(help);

      }*/

    }

  };

});

client.login(botConfig.apikey);
