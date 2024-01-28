# DBM Types

Type definitions for [Discord Bot Maker] by the DBM German community.

## Supported versions

| DBM version | Types       | JSDoc      |
|-------------|-------------|------------|
| 2.1         | ✅ Done    | ✅ Done    |
| 1.6         | ❌ Missing | ❌ Missing |
| 1.5         | ❌ Missing | ❌ Missing |
| 1.4         | ❌ Missing | ❌ Missing |

## How to use

In order to access the type definitions, one of the supported versions has to be appended to the import path.
Here are some examples:

```ts
// CommonJS
const { DBMVarType } = require("dbm-types/dbm-2.1");
// ES Module
import { DBMVarType } from "dbm-types/dbm-2.1";

let storage: DBMVarType;
let varName: string;
```

In addition to the core DBM types it also bundles the correct version of the following pre-installed node modules:

- [discord.js]
- [@discordjs/voice][discordjs-voice]
- [discord-api-types]
- [jimp]
- [ytdl-core]
- [youtube-dl-exec]

Each can be accessed via its designated namespace.

```ts
// CommonJS
const { Discord, DiscordAPI } = require("dbm-types/dbm-2.1");
// ES Module
import { Discord, DiscordAPI } from "dbm-types/dbm-2.1";

let id: Discord.Snowflake;
let rawGuild: DiscordAPI.APIGuild;
```

Optionally you can also use these definitions in pure JavaScript instead of TypeScript via JSDoc.
Here is an example of a custom action that is bound to the action definition:

```js
/** @typedef {import("dbm-types/dbm-2.1").DBMAction} DBMAction */

/** @type {DBMAction} */
module.exports = {
    name: "My action",
    ...
}
```

## How to contribute

The internal structure of the `bot.js` and DBM itself is really huge and complex.
If you are an advanced user / web developer you could try reverse engineering DBM and updating the types yourself.
Otherwise please feel free to open an issue or pull request if anything is missing or not the way it should be.
Every contribution is appreciated.

## Copyright notice

This module does not provide the actual source code of classes, functions, etc.
Only types and interfaces for creating modifications with optional documentation are available.
Copyright of the originating source code belongs to Robert Borghese.
A copy of [Discord Bot Maker] is required to be able to use them sensibly.

[discord.js]: https://discordjs.dev
[discordjs-voice]: https://discordjs.dev/docs/packages/voice/main
[discord-api-types]: https://discord-api-types.dev
[jimp]: https://github.com/jimp-dev/jimp#readme
[ytdl-core]: https://github.com/fent/node-ytdl-core#readme
[youtube-dl-exec]: https://github.com/microlinkhq/youtube-dl-exec#readme
[Discord Bot Maker]: https://store.steampowered.com/app/682130/Discord_Bot_Maker
