/**
 * LOOT - Open or check loot boxes.
 */

let botConfig = require("../config.json");
let serverConfig = require("../server_config.js");

/*let help = "**Boxes**\n";
help += "Open or check loot boxes.\n";
help += "*$open <box>*, *$boxes*.\n";*/

//** Command handlers

let commandHandlers = {};

commandHandlers.open = function (message, args) {

  if (!message.guild) {

    message.channel.send("This command must be run in a server.");

    return false;

  }

  getBoxes(message.guild.id, function (boxes) {

    if (Object.keys(boxes).indexOf(args) !== -1) {

      let box = boxes[args];

      var drop = box[Math.floor(Math.random()*box.drops.length)];

      for (i=0; i<box.dropCount; i++) {
          message.channel.send(drop);
      }

    } else {

      message.channel.send("Couldn't find that box!");

    };

  });

};

commandHandlers.boxes = function (message, args) {

  if (!message.guild) {

    message.channel.send("This command must be run in a server.")

    return false;

  }

  getBoxes(message.guild.id, function (boxes) {

    if (typeof boxes === "object" && Object.keys(boxes).length > 0) {

      message.channel.send("```" + Object.keys(boxes) + "```");

    } else {

      message.channel.send("There aren't any boxes for this server. Sorry!");

    }

  });

};

let getBoxes = function (guildId, callback) {

  serverConfig.getServerConfig(guildId, function (config) {

    if (config.moduleConfig && config.moduleConfig.loot && config.moduleConfig.loot.boxes) {

      callback(config.moduleConfig.loot.boxes);
      callback(config.moduleConfig.loot);

    } else {

      callback([]);

    }

  });

};

//** Module Exports

module.exports = {
  //"help": help,
  "commandHandlers": commandHandlers
};
