import type {
    RegularOrDefault
} from "./internal.d.ts";
import type {
    Snowflake
} from "discord.js-13";
import type {
    Package
} from "normalize-package-data";


/**
 * Full DBM version
 */
export type DBMVersion = "2.1.7";

/**
 * Simple DBM version (with patch level being zero)
 */
export type DBMSimpleVersion = "2.1.0";

/**
 * Variable type
 *
 * | ID | Name                  |
 * |----|-----------------------|
 * | 1  | Temp Variable         |
 * | 2  | Server Variable       |
 * | 3  | Global Variable       |
 * | 4  | Interaction Parameter |
 *
 * @see {@link DBMInternalVarType} Internal variant
 */
export type DBMVarType = 1 | 2 | 3 | 4;

/**
 * Internal variable type
 *
 * | ID | Name                  |
 * |----|-----------------------|
 * | 0  | Temp Variable         |
 * | 1  | Server Variable       |
 * | 2  | Global Variable       |
 * | 3  | Interaction Parameter |
 *
 * @see {@link DBMVarType} External variant
 */
export type DBMInternalVarType = 0 | 1 | 2 | 3;

/**
 * Send target type
 *
 * | ID  | Name                   | Category            |
 * |-----|------------------------|---------------------|
 * | 0   | Same Channel           | Command Attributes  |
 * | 1   | Command User           | Command Attributes  |
 * | 2   | Mentioned User         | Command Attributes  |
 * | 3   | Mentioned Channel      | Command Attributes  |
 * | 4   | Default channel        | Server Attributes   |
 * | 5   | Temp Variable          | Variables           |
 * | 6   | Server Variable        | Variables           |
 * | 7   | Global Variable        | Variables           |
 * | 8   | Interaction Parameter  | Command Attributes  |
 * | 9   | Interaction User       | Command Attributes  |
 * | 10  | Public Updates Channel | Server Attributes   |
 * | 11  | Rules Channel          | Server Attributes   |
 * | 12  | System Channel         | Server Attributes   |
 * | 100 | Member Name            | Find Message Target |
 * | 101 | Member ID              | Find Message Target |
 * | 102 | Channel Name           | Find Message Target |
 * | 103 | Channel ID             | Find Message Target |
 */
export type DBMSendTargetType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 100 | 101 | 102 | 103;

/**
 * Send reply target type
 *
 * | ID  | Name                   | Category            |
 * |-----|------------------------|---------------------|
 * | 0   | Same Channel           | Command Attributes  |
 * | 1   | Command User           | Command Attributes  |
 * | 2   | Mentioned User         | Command Attributes  |
 * | 3   | Mentioned Channel      | Command Attributes  |
 * | 4   | Default channel        | Server Attributes   |
 * | 5   | Temp Variable          | Variables           |
 * | 6   | Server Variable        | Variables           |
 * | 7   | Global Variable        | Variables           |
 * | 8   | Interaction Parameter  | Command Attributes  |
 * | 9   | Interaction User       | Command Attributes  |
 * | 10  | Public Updates Channel | Server Attributes   |
 * | 11  | Rules Channel          | Server Attributes   |
 * | 12  | System Channel         | Server Attributes   |
 * | 13  | Command Message        | Command Attributes  |
 * | 100 | Member Name            | Find Message Target |
 * | 101 | Member ID              | Find Message Target |
 * | 102 | Channel Name           | Find Message Target |
 * | 103 | Channel ID             | Find Message Target |
 */
export type DBMSendReplyTargetType = DBMSendTargetType | 13;

/**
 * Member type
 *
 * | ID  | Name                  | Category           |
 * |-----|-----------------------|--------------------|
 * | 0   | Mentioned User        | Command Attributes |
 * | 1   | Command User          | Command Attributes |
 * | 2   | Temp Variable         | Variables          |
 * | 3   | Server Variable       | Variables          |
 * | 4   | Global Variable       | Variables          |
 * | 5   | Interaction Parameter | Command Attributes |
 * | 6   | Interaction User      | Command Attributes |
 * | 100 | Member Name           | Find User          |
 * | 101 | Member ID             | Find User          |
 */
export type DBMMemberType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 100 | 101;

/**
 * Message type
 *
 * | ID | Name                  |
 * |----|-----------------------|
 * | 0  | Command Message       |
 * | 1  | Temp Variable         |
 * | 2  | Server Variable       |
 * | 3  | Global Variable       |
 * | 4  | Interaction Parameter |
 */
export type DBMMessageType = 0 | 1 | 2 | 3 | 4;

/**
 * Server type
 *
 * | ID  | Name                    | Category             |
 * |-----|-------------------------|----------------------|
 * | 0   | Current Server          | Servers              |
 * | 1   | Temp Variable           | Variables            |
 * | 2   | Server Variable         | Variables            |
 * | 3   | Global Variable         | Variables            |
 * | *4* | *Interaction Parameter* | *Command Attributes* |
 * | 100 | Server Name             | Find Server          |
 * | 101 | Server ID               | Find Server          |
 *
 * Note: Interaction Parameter is technically possible but currently not available in the editor.
 */
export type DBMServerType = 0 | 1 | 2 | 3 | 4 | 100 | 101;

/**
 * Role type
 *
 * | ID  | Name                  | Category           |
 * |-----|-----------------------|--------------------|
 * | 0   | Mentioned Role        | Command Attributes |
 * | 1   | First User Role       | Command Attributes |
 * | 2   | First Server Role     | Server Attributes  |
 * | 3   | Temp Variable         | Variables          |
 * | 4   | Server Variable       | Variables          |
 * | 5   | Global Variable       | Variables          |
 * | 6   | Interaction Parameter | Command Attributes |
 * | 100 | Role Name             | Find Role          |
 * | 101 | Role ID               | Find Role          |
 */
export type DBMRoleType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 100 | 101;

/**
 * Channel type
 *
 * | ID  | Name                   | Category           | Available for threads |
 * |-----|------------------------|--------------------|-----------------------|
 * | 0   | Same Channel           | Command Attributes | Yes                   |
 * | 1   | Mentioned Channel      | Command Attributes | Yes                   |
 * | 2   | Default Channel        | Server Attributes  | No                    |
 * | 3   | Temp Variable          | Variables          | Yes                   |
 * | 4   | Server Variable        | Variables          | Yes                   |
 * | 5   | Global Variable        | Variables          | Yes                   |
 * | 6   | Interaction Parameter  | Command Attributes | Yes                   |
 * | 7   | Public Updates Channel | Server Attributes  | No                    |
 * | 8   | Rules Channel          | Server Attributes  | No                    |
 * | 9   | System Channel         | Server Attributes  | No                    |
 * | 100 | Channel Name           | Find Channel       | Yes                   |
 * | 101 | Channel ID             | Find Channel       | Yes                   |
 */
export type DBMChannelType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 100 | 101;

/**
 * Voice channel type
 *
 * | ID  | Name                           | Category           |
 * |-----|--------------------------------|--------------------|
 * | 0   | Command User's Voice Channel   | Command Attributes |
 * | 1   | Mentioned User's Voice Channel | Command Attributes |
 * | 2   | Default Voice Channel          | Server Attributes  |
 * | 3   | Temp Variable                  | Variables          |
 * | 4   | Server Variable                | Variables          |
 * | 5   | Global Variable                | Variables          |
 * | 6   | Interaction Parameter          | Command Attributes |
 * | 7   | AFK Voice Channel              | Server Attributes  |
 * | 100 | Voice Channel Name             | Find Voice Channel |
 * | 101 | Voice Channel ID               | Find Voice Channel |
 */
export type DBMVoiceChannelType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 100 | 101;

/**
 * Any channel type
 *
 * | ID  | Name                           | Category           |
 * |-----|--------------------------------|--------------------|
 * | 0   | Same Channel                   | Command Attributes |
 * | 1   | Mentioned Channel              | Command Attributes |
 * | 2   | Default Channel                | Server Attributes  |
 * | 3   | Temp Variable                  | Variables          |
 * | 4   | Server Variable                | Variables          |
 * | 5   | Global Variable                | Variables          |
 * | 6   | Interaction Parameter          | Command Attributes |
 * | 7   | Public Updates Channel         | Server Attributes  |
 * | 8   | Rules Channel                  | Server Attributes  |
 * | 9   | System Channel                 | Server Attributes  |
 * | 10  | Command User's Voice Channel   | Command Attributes |
 * | 11  | Mentioned User's Voice Channel | Command Attributes |
 * | 12  | AFK Voice Channel              | Server Attributes  |
 * | 13  | Default Voice Channel          | Server Attributes  |
 * | 100 | Channel Name                   | Find Channel       |
 * | 101 | Channel ID                     | Find Channel       |
 */
export type DBMAnyChannelType = DBMChannelType | 10 | 11 | 12 | 13;

/**
 * List type
 *
 * | ID   | Name                    | Category             |
 * |------|-------------------------|----------------------|
 * | 0    | Server Members          | Server Attributes    |
 * | 1    | Server Channels         | Server Attributes    |
 * | 2    | Server Roles            | Server Attributes    |
 * | 3    | Server Emojis           | Server Attributes    |
 * | 4    | All Bot Servers         | Bot Attributes       |
 * | 5    | Mentioned User Roles    | Command Attributes   |
 * | 6    | Command User Roles      | Command Attributes   |
 * | 7    | Temp Variable           | Variables            |
 * | 8    | Server Variable         | Variables            |
 * | 9    | Global Variable         | Variables            |
 * | *10* | *Interaction Parameter* | *Command Attributes* |
 *
 * Note: Interaction Parameter is technically possible but currently not available in the editor.
 */
export type DBMListType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

/**
 * Conditional result type
 *
 * | ID | Name                |
 * |----|---------------------|
 * | 0  | Call Next Action    |
 * | 1  | End Action Sequence |
 * | 2  | Jump to Action      |
 * | 3  | Skip Actions        |
 * | 4  | Jump to Anchor      |
 * | 99 | Run Extra Actions   |
 */
export type DBMConditionType = 0 | 1 | 2 | 3 | 4 | 99;

/**
 * Event object type
 *
 * | ID  | Name                   |
 * |-----|------------------------|
 * | 1   | arg1                   |
 * | 2   | arg1.guild             |
 * | 3   | arg2                   |
 * | 4   | arg2.guild             |
 * | 100 | arg1.guildMember.guild |
 * | 200 | arg1.user              |
 */
export type DBMEventObjectType = 1 | 2 | 3 | 4 | 100 | 200;

/**
 * Command type
 *
 * | ID  | Name                 |
 * |-----|----------------------|
 * | 0   | Text Command         |
 * | 1   | Includes Word        |
 * | 2   | Regular Expression   |
 * | 3   | Any Message          |
 * | 4   | Slash Command        |
 * | 5   | User Menu Command    |
 * | 6   | Message Menu Command |
 */
export type DBMCommandType = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Event type
 *
 * | ID | Name                          |
 * |----|-------------------------------|
 * | 0  | None                          |
 * | 1  | Bot Per-Server Initialization |
 * | 2  | Any Message (Deprecated)      |
 * | 3  | On Interval                   |
 * | 4  | Bot Join Server               |
 * | 5  | Bot Leave Server              |
 * | 6  | Member Join Server            |
 * | 7  | Member Leave Server           |
 * | 8  | Channel Create                |
 * | 9  | Channel Delete                |
 * | 10 | Role Create                   |
 * | 11 | Role Delete                   |
 * | 12 | Member Banned                 |
 * | 13 | Member Unbanned               |
 * | 14 | Voice Channel Create          |
 * | 15 | Voice Channel Delete          |
 * | 16 | Emoji Create                  |
 * | 17 | Emoji Delete                  |
 * | 18 | Message Deleted               |
 * | 19 | Server Update                 |
 * | 20 | Member Update                 |
 * | 21 | Presence Update               |
 * | 22 | Member Voice Update           |
 * | 23 | Channel Update                |
 * | 24 | Channel Pins Update           |
 * | 25 | Role Update                   |
 * | 26 | Message Update                |
 * | 27 | Emoji Update                  |
 * | 28 | Message Reaction Added        |
 * | 29 | Message Reaction Removed      |
 * | 30 | All Message Reactions Removed |
 * | 31 | Member Becomes Available      |
 * | 32 | Member Chunk Received         |
 * | 33 | Member Starts/Stops Speaking  |
 * | 34 | User Typing Starts            |
 * | 35 | User Typing Stops             |
 * | 36 | Server Becomes Unavailable    |
 * | 37 | On Bot Error                  |
 * | 38 | On Time Restricted Command    |
 * | 39 | Special Channel Create        |
 * | 40 | Special Channel Delete        |
 * | 41 | Sticker Create                |
 * | 42 | Sticker Delete                |
 * | 43 | Thread Create                 |
 * | 44 | Thread Delete                 |
 * | 45 | Sticker Update                |
 * | 46 | Thread Update                 |
 * | 47 | Thread Member Update          |
 * | 48 | Bot One-Time Initialization   |
 * | 49 | Invite Created                |
 * | 50 | Invite Delete                 |
 */
export type DBMEventType =
    | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
    | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19
    | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29
    | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39
    | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49
    | 50;
// Could be optimized via a possible future numeric range type, see https://github.com/microsoft/TypeScript/issues/54925

/**
 * Permission type
 *
 * | ID | Name                       | Description                              |
 * |----|----------------------------|------------------------------------------|
 * | -1 | NONE                       | No permission                            |
 * | 0  | VIEW_CHANNEL               | View channels                            |
 * | 1  | MANAGE_CHANNELS            | Manage channels                          |
 * | 2  | MANAGE_ROLES               | Manage roles                             |
 * | 3  | MANAGE_EMOJIS_AND_STICKERS | Manage emojis and stickers               |
 * | 4  | VIEW_AUDIT_LOG             | View audit log                           |
 * | 5  | VIEW_GUILD_INSIGHTS        | View Server Insights                     |
 * | 6  | MANAGE_WEBHOOKS            | Manage webhooks                          |
 * | 7  | MANAGE_GUILD               | Manage server                            |
 * | 8  | CREATE_INSTANT_INVITE      | Create invite                            |
 * | 9  | CHANGE_NICKNAME            | Change nickname                          |
 * | 10 | MANAGE_NICKNAMES           | Manage nicknames                         |
 * | 11 | KICK_MEMBERS               | Kick members                             |
 * | 12 | BAN_MEMBERS                | Ban members                              |
 * | 13 | MODERATE_MEMBERS           | Time out members                         |
 * | 14 | SEND_MESSAGES              | Send messages                            |
 * | 15 | SEND_MESSAGES_IN_THREADS   | Send messages in threads                 |
 * | 16 | USE_PUBLIC_THREADS         | Create public threads                    |
 * | 17 | USE_PRIVATE_THREADS        | Create private threads                   |
 * | 18 | EMBED_LINKS                | Embed links                              |
 * | 19 | ATTACH_FILES               | Attach files                             |
 * | 20 | ADD_REACTIONS              | Add reactions                            |
 * | 21 | USE_EXTERNAL_EMOJIS        | Use external emojis                      |
 * | 22 | USE_EXTERNAL_STICKERS      | Use External Stickers                    |
 * | 23 | MENTION_EVERYONE           | Mention \@everyone, \@here and all roles |
 * | 24 | MANAGE_MESSAGES            | Manage messages                          |
 * | 25 | READ_MESSAGE_HISTORY       | Read message history                     |
 * | 26 | SEND_TTS_MESSAGES          | Send text-to-speech messages             |
 * | 27 | USE_APPLICATION_COMMANDS   | Use Application Commands                 |
 * | 28 | CONNECT                    | Connect                                  |
 * | 29 | SPEAK                      | Speak                                    |
 * | 30 | STREAM                     | Video                                    |
 * | 31 | USE_VAD                    | Use Voice Activity Detection             |
 * | 32 | PRIORITY_SPEAKER           | Priority Speaker                         |
 * | 33 | MUTE_MEMBERS               | Mute members                             |
 * | 34 | DEAFEN_MEMBERS             | Defean members                           |
 * | 35 | MOVE_MEMBERS               | Move members                             |
 * | 36 | ADMINISTRATOR              | Administrator                            |
 * | 37 | REQUEST_TO_SPEAK           | Request to speak                         |
 * | 38 | MANAGE_THREADS             | Manage threads                           |
 * | 39 | MANAGE_EVENTS              | Manage Events                            |
 */
export type DBMPermissionType =
    | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
    | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19
    | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29
    | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39;
// Could be optimized via a possible future numeric range type, see https://github.com/microsoft/TypeScript/issues/54925

/**
 * Permission string type
 *
 * | ID                         | Name                                     |
 * |----------------------------|------------------------------------------|
 * | NONE                       | No permission                            |
 * | VIEW_CHANNEL               | View channels                            |
 * | MANAGE_CHANNELS            | Manage channels                          |
 * | MANAGE_ROLES               | Manage roles                             |
 * | MANAGE_EMOJIS_AND_STICKERS | Manage emojis and stickers               |
 * | VIEW_AUDIT_LOG             | View audit log                           |
 * | VIEW_GUILD_INSIGHTS        | View Server Insights                     |
 * | MANAGE_WEBHOOKS            | Manage webhooks                          |
 * | MANAGE_GUILD               | Manage server                            |
 * | CREATE_INSTANT_INVITE      | Create invite                            |
 * | CHANGE_NICKNAME            | Change nickname                          |
 * | MANAGE_NICKNAMES           | Manage nicknames                         |
 * | KICK_MEMBERS               | Kick members                             |
 * | BAN_MEMBERS                | Ban members                              |
 * | MODERATE_MEMBERS           | Time out members                         |
 * | SEND_MESSAGES              | Send messages                            |
 * | SEND_MESSAGES_IN_THREADS   | Send messages in threads                 |
 * | USE_PUBLIC_THREADS         | Create public threads                    |
 * | USE_PRIVATE_THREADS        | Create private threads                   |
 * | EMBED_LINKS                | Embed links                              |
 * | ATTACH_FILES               | Attach files                             |
 * | ADD_REACTIONS              | Add reactions                            |
 * | USE_EXTERNAL_EMOJIS        | Use external emojis                      |
 * | USE_EXTERNAL_STICKERS      | Use External Stickers                    |
 * | MENTION_EVERYONE           | Mention \@everyone, \@here and all roles |
 * | MANAGE_MESSAGES            | Manage messages                          |
 * | READ_MESSAGE_HISTORY       | Read message history                     |
 * | SEND_TTS_MESSAGES          | Send text-to-speech messages             |
 * | USE_APPLICATION_COMMANDS   | Use Application Commands                 |
 * | CONNECT                    | Connect                                  |
 * | SPEAK                      | Speak                                    |
 * | STREAM                     | Video                                    |
 * | USE_VAD                    | Use Voice Activity Detection             |
 * | PRIORITY_SPEAKER           | Priority Speaker                         |
 * | MUTE_MEMBERS               | Mute members                             |
 * | DEAFEN_MEMBERS             | Defean members                           |
 * | MOVE_MEMBERS               | Move members                             |
 * | ADMINISTRATOR              | Administrator                            |
 * | REQUEST_TO_SPEAK           | Request to speak                         |
 * | MANAGE_THREADS             | Manage threads                           |
 * | MANAGE_EVENTS              | Manage Events                            |
 */
export type DBMPermissionStringType =
    | "NONE"
    | "VIEW_CHANNEL"
    | "MANAGE_CHANNELS"
    | "MANAGE_ROLES"
    | "MANAGE_EMOJIS_AND_STICKERS"
    | "VIEW_AUDIT_LOG"
    | "VIEW_GUILD_INSIGHTS"
    | "MANAGE_WEBHOOKS"
    | "MANAGE_GUILD"
    | "CREATE_INSTANT_INVITE"
    | "CHANGE_NICKNAME"
    | "MANAGE_NICKNAMES"
    | "KICK_MEMBERS"
    | "BAN_MEMBERS"
    | "MODERATE_MEMBERS"
    | "SEND_MESSAGES"
    | "SEND_MESSAGES_IN_THREADS"
    | "USE_PUBLIC_THREADS"
    | "USE_PRIVATE_THREADS"
    | "EMBED_LINKS"
    | "ATTACH_FILES"
    | "ADD_REACTIONS"
    | "USE_EXTERNAL_EMOJIS"
    | "USE_EXTERNAL_STICKERS"
    | "MENTION_EVERYONE"
    | "MANAGE_MESSAGES"
    | "READ_MESSAGE_HISTORY"
    | "SEND_TTS_MESSAGES"
    | "USE_APPLICATION_COMMANDS"
    | "CONNECT"
    | "SPEAK"
    | "STREAM"
    | "USE_VAD"
    | "PRIORITY_SPEAKER"
    | "MUTE_MEMBERS"
    | "DEAFEN_MEMBERS"
    | "MOVE_MEMBERS"
    | "ADMINISTRATOR"
    | "REQUEST_TO_SPEAK"
    | "MANAGE_THREADS"
    | "MANAGE_EVENTS"

/**
 * Internal permission type
 *
 * | ID | Name                      |
 * |----|---------------------------|
 * | 0  | Channel permissions       |
 * | 1  | Voice channel permissions |
 * | 2  | Any channel permissions   |
 */
export type DBMInternalPermissionType = 0 | 1 | 2;

/**
 * Response mode for interactions
 *
 * | ID            | Name                     |
 * |---------------|--------------------------|
 * | PERSONAL      | Once, Command User Only  |
 * | PUBLIC        | Once, Anyone Can Use     |
 * | MULTIPERSONAL | Multi, Command User Only |
 * | MULTI         | Multi, Anyone Can Use    |
 * | PERSISTENT    | Persistent               |
 */
export type DBMActionResponseMode =
    | "PERSONAL"
    | "PUBLIC"
    | "MULTIPERSONAL"
    | "MULTI"
    | "PERSISTENT"

/**
 * Creation mode for slash commands
 */
export type DBMSlashCommandCreationMode =
    | "all"
    | "global"
    | "manual"
    | "manualglobal";

/**
 * String representation of an user variable value (saved variable)
 */
export type DBMUserVariableString = `usr-${Snowflake}`;

/**
 * String representation of a member variable value (saved variable)
 */
export type DBMMemberVariableString = `mem-${Snowflake}_${DBMServerVariableString}`;

/**
 * String representation of a server variable value (saved variable)
 */
export type DBMServerVariableString = `s-${Snowflake}`;

/**
 * String representation of a message variable value (saved variable)
 */
export type DBMMessageVariableString = `msg-${Snowflake}_c-${Snowflake}`;

/**
 * String representation of a text channel variable value (saved variable)
 */
export type DBMTextChannelVariableString = `tc-${Snowflake}`;

/**
 * String representation of a voice channel variable value (saved variable)
 */
export type DBMVoiceChannelVariableString = `vc-${Snowflake}`;

/**
 * String representation of a role variable value (saved variable)
 */
export type DBMRoleVariableString = `r-${Snowflake}_${DBMServerVariableString}`;

/**
 * String representation of an emoji variable value (saved variable)
 */
export type DBMEmojiVariableString = `e-${Snowflake}`;

/**
 * String representation of a variable value (saved variable)
 */
export type DBMVariableString =
    | DBMUserVariableString
    | DBMMemberVariableString
    | DBMServerVariableString
    | DBMMessageVariableString
    | DBMTextChannelVariableString
    | DBMVoiceChannelVariableString
    | DBMRoleVariableString
    | DBMEmojiVariableString;

/**
 * Data file type "commands" (commands.json)
 */
export type DBMDataFileTypeCommands = "commands";
/**
 * Data file type "events" (events.json)
 */
export type DBMDataFileTypeEvents = "events";
/**
 * Data file type "settings" (settings.json)
 */
export type DBMDataFileTypeSettings = "settings";
/**
 * Data file type "players" (players.json)
 */
export type DBMDataFileTypePlayers = "players";
/**
 * Data file type "servers" (servers.json)
 */
export type DBMDataFileTypeServers = "servers";
/**
 * Data file type "messages" (messages.json)
 */
export type DBMDataFileTypeMessages = "messages";
/**
 * Data file type "serverVars" (serverVars.json)
 */
export type DBMDataFileTypeServerVars = "serverVars";
/**
 * Data file type "globalVars" (globalVars.json)
 */
export type DBMDataFileTypeGlobalVars = "globalVars";

/**
 * Data file types
 */
export type DBMDataFileTypes =
    | DBMDataFileTypeCommands
    | DBMDataFileTypeEvents
    | DBMDataFileTypeSettings
    | DBMDataFileTypePlayers
    | DBMDataFileTypeServers
    | DBMDataFileTypeMessages
    | DBMDataFileTypeServerVars
    | DBMDataFileTypeGlobalVars;

/**
 * Internal data type
 *
 * | ID | Name    |
 * |----|---------|
 * | 0  | Command |
 * | 1  | Event   |
 */
export type DBMInternalDataType = 0 | 1;

/**
 * Objects that have data associated to them
 */
export interface DBMDataAccess {
    /**
     * Get data
     * @param name Data name
     * @param defaultValue Default value
     * @returns Data value
     */
    data<D>(name: string, defaultValue?: D): RegularOrDefault<any, D>;
    /**
     * Set data
     * @param name Data name
     * @param value Data value
     */
    setData(name: string, value: unknown): void;
    /**
     * Add data
     * @param name Data name
     * @param value Data value
     */
    addData(name: string, value: unknown): void;
    /**
     * Clear data
     * @param name Data name
     */
    clearData(name: string): void;
}

/**
 * Object that can be converted to a special string representation
 */
export interface DBMConvertableItem {
    /**
     * Convert to variable string
     * @returns Variable string
     */
    convertToString(): DBMVariableString;
}

/**
 * Button data
 */
export interface DBMButtonData {
    id: string;
    name: string;
    type: string;
    url: string;
    emoji: string;
}

/**
 * Select data
 */
export interface DBMSelectData {
    id: string;
    mode: DBMActionResponseMode;
    placeholder: string;
    min: string;
    max: string;
    options: {
        label: string,
        description: string,
        value: string
    }[];
}

/**
 * Text input data
 */
export interface DBMTextInputData {
    id: string;
    mode: DBMActionResponseMode;
    name: string;
    placeholder: string;
    minLength: string;
    maxLength: string;
    style: string;
    required: string;
}

/**
 * ID for commands consisting of five characters from A-Z, uppercase and lowercase
 */
export type DBMCommandID = string;

/**
 * ID for events consisting of five characters from A-Z, uppercase and lowercase
 */
export type DBMEventID = string;

/**
 * DBM action JSON structure (contains almost always additional custom data)
 */
export interface DBMActionJSON {
    actions?: DBMActionJSON[];
    branch?: DBMActionBranchJSON;

    [x: string]: any;
}

/**
 * DBM action branch JSON structure
 */
export interface DBMActionBranchJSON {
    iftrue: DBMConditionType;
    iftrueVal?: any;
    iffalse: DBMConditionType;
    iffalseVal?: any;
    iftrueActions?: DBMActionJSON[];
    iffalseActions?: DBMActionJSON[];
}

/**
 * DBM actions cache metadata
 */
export interface DBMActionsCacheMetadata {
    isEvent: boolean;
    name: string;
}

/**
 * DBM action metadata
 */
export interface DBMActionMetadata {
    version: string;
    preciseCheck: boolean;
    author?: string;
    authorUrl?: string;
    downloadUrl?: string;
}

/**
 * DBM extension JSON structure (contains almost always additional custom data)
 */
export interface DBMExtensionJSON {
    [x: string]: any;
}

/**
 * DBM command JSON structure
 */
export interface DBMCommandJSON {
    _id: DBMCommandID;
    name: string;
    permissions: DBMPermissionStringType;
    permissions2: DBMPermissionStringType;
    restriction: number;
    actions: DBMActionJSON[];
    comType: DBMCommandType;
    description: string;

    [x: string]: any;
}

/**
 * DBM event JSON structure
 */
export interface DBMEventJSON {
    _id: DBMEventID;
    name: string;
    temp?: string;
    temp2?: string;
    "event-type": DBMEventType;
    actions: DBMActionJSON[];

    [x: string]: any;
}

/**
 * DBM settings JSON structure
 */
export interface DBMSettingsJSON {
    token: string;
    client: Snowflake;
    tag: string;
    case: boolean | `${boolean}`;
    separator: string;
    commandsOrder: string[];
    eventsOrder: string[];
    modules: {[dependency: string]: [string, boolean]};
    ownerId: string;
    invalidUserText: string;
    invalidSelectText: string;
    invalidButtonText: string;
    leaveVoiceTimeout: number;
    slashType: DBMSlashCommandCreationMode;
    slashServers: string;
    autoResponseText: string;
    invalidPermissionsText: string;
    invalidCooldownText: string;
    noDescriptionText: string;

    [x: string]: any;
}

/**
 * DBM package JSON structure
 */
export interface DBMPackageJSON extends Package {
    main: "bot.js";
    version: DBMVersion;
}
