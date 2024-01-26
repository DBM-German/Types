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
 * Object that can be converted to a special string representation
 */
export interface DBMConvertableItem {
    convertToString(): DBMVariableString;
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
 * DBM action metainfo
 */
export interface DBMActionMeta {
    isEvent: boolean;
    name: string;
}

/**
 * DBM action metadata
 */
export interface DBMActionMetaData {
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
    permissions: string;
    permissions2: string;
    restriction: number;
    actions: DBMActionJSON[];
    comType: number;
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
    "event-type": number;
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
    slashType: string;
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
