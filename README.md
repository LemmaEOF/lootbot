# LootBot

Lootboxes sans bullshit!

## Features

**LootBot** lets you simulate the random fun of lootboxes without having to sell your soul to capitalism. It's fully customizable through JSON files.

In development:
- [ ] Drop rarities
- *fake-money cost for loot boxes will likely never be added*, because it would be too easy for someone to turn into actually having to pay real money for lootboxes. If it does get added, it will only be obtainable through the bot itself; server admins can't give it out.

## Setup

Install like any NodeJS project: clone or download the repository then run `npm install`.

Next, duplicate `config_default.json` and rename it `config.json`, then put your Discord API key (from an application created from https://discordapp.com/developers/applications **making sure it's a bot user**) into the place of `"put_your_api_key_here"`.

Run the bot with `node bot.js`.

## Configuration

The bot is fully configurable, both globally and per-server. Each server will have its own file named `<server ID>.json` in the `server_config` directory. Servers can have their own boxes that are usable only in the server they're for.

Global config is loaded first, then server config is loaded, meaning that any box in the server config that has the same name as a box in the global config will override the global config.

### Configuration files

The base `config.json` might look something like this (warning: subject to change):

```js
{
  "apikey": "your_apikey",
  "moduleConfig": {
    "loot": {
        "boxes": {
            "Box 1": {
                "drops": ["drop 1", "drop 2", "drop 3"]
            },
            "Box 2": {
                "drops": ["drop 1", "drop 2", "drop 3", "drop 4", "drop 5"]
            }
        }
    }
  }
}
```

A server config may be something like this:

```js
{
  "id": "1234567890",
  "lastKnownName": "magic RPG server",
  "moduleConfig": {
    "loot": {
        "boxes": {
            "Box 1": {
                "drops": ["drop 4", "drop 5", "drop 6"]
            },
            "Magic Box": {
                "drops": ["magic item 1", "magic item 2", "magic item 3"]
            }
        }
    }
  }
}
```

The `Box 1` in the server config overrides the `Box 1` in the global config, so for the magic RPG server, they will only be able to get drops 4, 5, and 6 from `Box 1`. `Magic Box` will only be openable in the magic RPG server.

Server configs will also contain the server's `id` and `lastKnownName`, so the server can be better identified. `lastKnownName` will be updated as the server's name is updated, so you can tell what server it is without having to remember the server ID.
