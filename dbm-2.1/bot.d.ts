import type {
    DBMVersion,
    DBMVarType,
    DBMInternalVarType,
    DBMSendTargetType,
    DBMSendReplyTargetType,
    DBMMemberType,
    DBMMessageType,
    DBMServerType,
    DBMRoleType,
    DBMChannelType,
    DBMVoiceChannelType,
    DBMAnyChannelType,
    DBMListType,
    DBMEventObjectType,
    DBMEventType,
    DBMSlashCommandCreationMode,
    DBMUserVariableString,
    DBMMemberVariableString,
    DBMServerVariableString,
    DBMMessageVariableString,
    DBMTextChannelVariableString,
    DBMVoiceChannelVariableString,
    DBMRoleVariableString,
    DBMEmojiVariableString,
    DBMVariableString,
    DBMDataFileTypes,
    DBMConvertableItem,
    DBMButtonData,
    DBMSelectData,
    DBMTextInputData,
    DBMCommandID,
    DBMActionJSON,
    DBMActionBranchJSON,
    DBMActionsCacheMetadata,
    DBMCommandJSON,
    DBMEventJSON,
    DBMSettingsJSON
} from "./common.d.ts";
import type {
    DBMAction, // eslint-disable-line @typescript-eslint/no-unused-vars
    DBMEvent, // eslint-disable-line @typescript-eslint/no-unused-vars
    DBMExtension // eslint-disable-line @typescript-eslint/no-unused-vars
} from "./modules.d.ts";
import type {
    UnionObject,
    TypeFromRecord,
    OnceOrArray,
    RegularOrDefault
} from "./internal.d.ts";
import type {
    ApplicationCommandData,
    ApplicationCommandOptionData,
    ApplicationCommandSubCommandData,
    BaseMessageComponentOptions,
    ButtonInteraction,
    Channel,
    Client,
    ClientEvents,
    CommandInteraction,
    CommandInteractionOption,
    ContextMenuInteraction,
    Emoji,
    Guild,
    GuildBasedChannel,
    GuildMember,
    Interaction,
    Message,
    MessageAttachment,
    MessageButtonOptions,
    MessageContextMenuInteraction,
    MessageReaction,
    MessageSelectMenuOptions,
    ModalSubmitInteraction,
    PartialTypes,
    Permissions,
    Role,
    SelectMenuInteraction,
    Snowflake,
    TextInputComponentOptions,
    User,
    UserContextMenuInteraction,
    VoiceBasedChannel,
} from "discord.js-13";
import type {
    AudioPlayer,
    AudioResource,
    PlayerSubscription,
    VoiceConnection
} from "@discordjs/voice";
import type {
    GatewayDispatchPayload
} from "discord-api-types/v9";
import type Jimp from "jimp-0.22";


/**
 * DBM variable storage container
 */
export type DBMVariables = Record<string, any>;

/**
 * DBM audio type
 *
 * | ID   | Name       |
 * |------|------------|
 * | file | File path  |
 * | url  | Stream URL |
 * | yt   | YouTube    |
 */
export type DBMAudioType = "file" | "url" | "yt";

/**
 * DBM audio info
 *
 * | Index | Value         |
 * |-------|---------------|
 * | 0     | Audio type    |
 * | 1     | Audio options |
 * | 2     | Audio source  |
 */
export type DBMAudioInfo = [ DBMAudioType, { volume?: number, bitrate?: number }, string ];

/**
 * DBM
 */
export interface DBM {
    version: DBMVersion;

    readonly DiscordJS: typeof import("discord.js-13");
    readonly Bot: DBMBot;
    readonly Actions: DBMActions;
    readonly Events: DBMEvents;
    readonly Images: DBMImages;
    readonly Files: DBMFiles;
    readonly Audio: DBMAudio;
}

/**
 * DBM.Bot
 */
export interface DBMBot {
    /** Slash commands */
    $slash: Record<string, DBMCommandJSON>;
    /** User commands */
    $user: Record<string, DBMCommandJSON>;
    /** Message commands */
    $msge: Record<string, DBMCommandJSON>;
    /** Button interactions */
    $button: Record<string, DBMButtonData>;
    /** Select interactions */
    $select: Record<string, DBMSelectData>;
    /** Normal commands */
    $cmds: Record<string, DBMCommandJSON>;
    /** Includes word commands */
    $icds: Record<string, DBMCommandJSON>;
    /** Regular Expression commands */
    $regx: Record<string, DBMCommandJSON>;
    /** Any message commands */
    $anym: Record<string, DBMCommandJSON>;
    /** Manual commands */
    $other: Record<string, DBMCommandJSON>;
    /** Events */
    $evts: Record<string, DBMEventJSON>;

    /** Discord client */
    bot: Client;
    /** Application commands that get registered */
    applicationCommandData: ApplicationCommandData[];
    /** Whether the bot has the GUILD_MEMBERS intent */
    hasMemberIntents: boolean;
    /** Whether the bot has the MESSAGE_CONTENT intent */
    hasMessageContentIntents: boolean;
    /** Regex for the tag / prefix of the bot */
    tagRegex: ReturnType<this["generateTagRegex"]>;

    /** Slash command creation mode */
    _slashCommandCreateType: DBMSlashCommandCreationMode;
    /** Slash command server list */
    _slashCommandServerList: Snowflake[];

    /** Privileged Discord intents */
    readonly PRIVILEGED_INTENTS: number;
    /** Non-privileged Discord intents */
    readonly NON_PRIVILEGED_INTENTS: number;
    /** All Discord intents */
    readonly ALL_INTENTS: number;

    /**
     * Initialize everything and login to Discord
     */
    init(): void;
    /**
     * Initialize discord.js client
     */
    initBot(): void;
    /**
     * Create discord.js client options (can be overwritten by modules to set custom options)
     */
    makeClientOptions(): void;
    /**
     * Get Discord intents (can be overwritten by modules to set custom intents)
     */
    intents(): void;
    /**
     * Check whether to use partials or not (can be overwritten by modules to change settings)
     */
    usePartials(): void;
    /**
     * Get Discord partials (can be overwritten by modules to set custom partials)
     */
    partials(): PartialTypes[];
    /**
     * Setup internal event handling
     * @see {@link onRawData}
     */
    setupBot(): void;
    /**
     * Handle raw data from the Discord API
     * @param packet Socket packet
     */
    onRawData(packet: GatewayDispatchPayload): void;
    /**
     * Setup commands and events based on their respective data file contents
     * @see {@link reformatCommands}
     * @see {@link reformatEvents}
     */
    reformatData(): void;
    /**
     * Setup commands based on their data file content
     */
    reformatCommands(): void;
    /**
     * Convert DBM command to application command
     * @param com Command
     * @param name Command name
     * @returns Application command
     * @see {@link generateSlashCommandDescription}
     * @see {@link validateSlashCommandParameters}
     */
    createApiJsonFromCommand(com: DBMCommandJSON, name: string): ApplicationCommandData;
    /**
     * Create sub commands for application command
     * @param names Sub command names
     * @param data Application command data
     * @see {@link getNoDescriptionText}
     */
    mergeSubCommandIntoCommandData(names: string[], data: ApplicationCommandSubCommandData): void;
    /**
     * Check whether the slash command name is valid
     * @param name Command name
     * @returns Command name parts (splitted by one or more spaces) or `false` if invalid
     * @see {@link validateSlashCommandParameterName}
     */
    validateSlashCommandName(name: string): string[] | false;
    /**
     * Check whether the slash command parameter name is valid
     * @param name Command parameter name
     * @returns Truncated lowercase parameter name or `false` if invalid
     */
    validateSlashCommandParameterName(name: string): Lowercase<string> | false;
    /**
     * Generate description for slash command
     * @param com Command
     * @returns Command description
     * @see {@link validateSlashCommandDescription}
     */
    generateSlashCommandDescription(com: DBMCommandJSON): string;
    /**
     * Check whether the slash command description is valid
     * @param desc Command description
     * @returns Truncated description or default description if not present
     * @see {@link getNoDescriptionText}
     */
    validateSlashCommandDescription(desc?: string): string;
    /**
     * Get configured command default description
     * @returns Text from settings
     */
    getNoDescriptionText(): string;
    /**
     * Check whether the slash command parameters are valid
     * @param parameters Command parameters
     * @param commandName Command name
     * @returns Filtered and sorted command parameters
     * @see {@link validateSlashCommandParameterName}
     * @see {@link validateSlashCommandDescription}
     */
    validateSlashCommandParameters(parameters: ApplicationCommandOptionData[], commandName: string): ApplicationCommandOptionData[];
    /**
     * Setup events based on their data file content
     */
    reformatEvents(): void;
    /**
     * Prepare action sequence by calling the `modInit` function for each action in the sequence
     * @param actions Action sequence
     */
    prepareActions(actions: DBMActionJSON[]): void;
    /**
     * Register button interaction
     * @param interactionId Interaction id
     * @param data Button data
     */
    registerButtonInteraction(interactionId: Snowflake, data: DBMButtonData): void;
    /**
     * Register select menu interaction
     * @param interactionId Interaction id
     * @param data Select data
     */
    registerSelectMenuInteraction(interactionId: Snowflake, data: DBMSelectData): void;
    /**
     * Check whether the bot is configured appropriately to run its commands (outputs errors to the console if not)
     */
    checkForCommandErrors(): void;
    /**
     * Setup event handlers
     * @see {@link onReady}
     * @see {@link onServerJoin}
     * @see {@link onMessage}
     * @see {@link onInteraction}
     * @see {@link DBMEvents.registerEvents}
     */
    initEvents(): void;
    /**
     * Login to Discord
     */
    login(): void;
    /**
     * Handle the `ready` event
     * @see {@link restoreVariables}
     * @see {@link registerApplicationCommands}
     * @see {@link preformInitialization}
     */
    onReady(): void;
    /**
     * Restore saved server and global variables
     * @see {@link DBMFiles.restoreServerVariables}
     * @see {@link DBMFiles.restoreGlobalVariables}
     */
    restoreVariables(): void;
    /**
     * Register application commands based on the configured mode in the settings
     * @see {@link setAllServerCommands}
     * @see {@link setGlobalCommands}
     * @see {@link setCertainServerCommands}
     * @see {@link _slashCommandCreateType}
     * @see {@link _slashCommandServerList}
     */
    registerApplicationCommands(): void;
    /**
     * Handle the `guildCreate` event
     * @param guild Server
     * @see {@link initializeCommandsForNewServer}
     */
    onServerJoin(guild: Guild): void;
    /**
     * Initialize slash commands for new server
     * @param guild Server
     * @see {@link setCommandsForServer}
     * @see {@link _slashCommandCreateType}
     * @see {@link _slashCommandServerList}
     */
    initializeCommandsForNewServer(guild: Guild): void;
    /**
     * Check whether command scope errors are enabled in the settings
     * @returns Configured state
     */
    shouldPrintAnyMissingAccessError(): boolean;
    /**
     * Check whether command removal for unlisted servers are enabled in the settings
     * @returns Configured state
     */
    clearUnspecifiedServerCommands(): boolean;
    /**
     * Set global application commands
     * @param commands Application commands
     */
    setGlobalCommands(commands: ApplicationCommandData[]): void;
    /**
     * Set server application commands
     * @param guild Server
     * @param commands Application commands
     * @param printMissingAccessError Whether to output missing access errors to the console
     */
    setCommandsForServer(guild: Guild, commands: ApplicationCommandData[], printMissingAccessError: boolean): void;
    /**
     * Set server application commands for all servers individually
     * @param commands Application commands
     * @param printMissingAccessError Whether to output missing access errors to the console (default: `true`)
     * @see {@link setCommandsForServer}
     */
    setAllServerCommands(commands: ApplicationCommandData[], printMissingAccessError?: boolean): void;
    /**
     * Set server application commands for the specified servers
     * @param commands Application commands
     * @param serverIdList Server ids
     * @see {@link clearUnspecifiedServerCommands}
     * @see {@link setCommandsForServer}
     */
    setCertainServerCommands(commands: ApplicationCommandData[], serverIdList: Snowflake[]): void;
    /**
     * Trigger initialization events and setup intervals
     * - Bot Per-Server Initialization
     * - Bot One-Time Initialization
     * - On Interval
     * @see {@link DBMEvents.onInitialization}
     * @see {@link DBMEvents.onInitializationOnce}
     * @see {@link DBMEvents.setupIntervals}
     */
    preformInitialization(): void;
    /**
     * Handle the `messageCreate` event
     * @param msg Message
     * @see {@link checkCommand}
     * @see {@link onAnyMessage}
     */
    onMessage(msg: Message): void;
    /**
     * Check whether the message is a text command and invoke its action sequence if so
     * @param msg Message
     * @return Whether the message is a text command
     * @see {@link checkTag}
     * @see {@link DBMActions.preformActionsFromMessage}
     */
    checkCommand(msg: Message): boolean;
    /**
     * Escape regex characters
     * @param text Text to escape
     * @return Escaped text
     */
    escapeRegExp(text: string): string;
    /**
     * Generate a regex for the tag / prefix of the bot
     * @param tag Prefix
     * @param allowPrefixSpace Allow spaces between the prefix and command name
     * @see {@link escapeRegExp}
     */
    generateTagRegex(tag: string, allowPrefixSpace: boolean): RegExp;
    /**
     * Populate the `tagRegex` property with a regex if not done already
     * @returns Regex if freshly populated
     * @see {@link generateTagRegex}
     * @see {@link tagRegex}
     */
    populateTagRegex(): ReturnType<this["generateTagRegex"]> | void;
    /**
     * Check whether the message starts with the tag / prefix of the bot
     * @param content Message content
     * @returns Command name if the message matches the configured criteria
     * @see {@link populateTagRegex}
     */
    checkTag(content: string): string | null;
    /**
     * Check whether the message is an "Includes Word" or "Regular Expression" command and invoke their actions if so,
     * plus the "Any Message" commands (and deprecated events) always
     * @param msg Message
     * @see {@link checkIncludes}
     * @see {@link checkRegExps}
     * @see {@link DBMEvents.callEvents}
     * @see {@link DBMActions.preformActionsFromMessage}
     */
    onAnyMessage(msg: Message): void;
    /**
     * Check whether the message is an "Includes Word" command and invoke its action sequence if so
     * @param msg Message
     * @see {@link DBMActions.preformActionsFromMessage}
     */
    checkIncludes(msg: Message): void;
    /**
     * Check whether the message is an "Regular Expression" command and invoke its action sequence if so
     * @param msg Message
     * @see {@link DBMActions.preformActionsFromMessage}
     */
    checkRegExps(msg: Message): void;
    /**
     * Handle the `interactionCreate` event
     * @param interaction Interaction
     * @see {@link onSlashCommandInteraction}
     * @see {@link onContextMenuInteraction}
     * @see {@link onButtonInteraction}
     * @see {@link onSelectMenuInteraction}
     * @see {@link DBMActions.checkModalSubmitResponses}
     * @see {@link DBMActions.checkTemporaryInteractionResponses}
     */
    onInteraction(interaction: Interaction): void;
    /**
     * Handle slash commands
     * @param interaction Command interaction
     * @see {@link preformActionsFromInteraction}
     */
    onSlashCommandInteraction(interaction: CommandInteraction): void;
    /**
     * Handle context menu commands
     * @param interaction Context menu interaction
     * @see {@link onUserContextMenuInteraction}
     * @see {@link onMessageContextMenuInteraction}
     */
    onContextMenuInteraction(interaction: ContextMenuInteraction): void;
    /**
     * Handle user context menu commands
     * @param interaction User context menu interaction
     * @see {@link DBMActions.preformActionsFromInteraction}
     */
    onUserContextMenuInteraction(interaction: UserContextMenuInteraction): void;
    /**
     * Handle message context menu commands
     * @param interaction Message context menu interaction
     * @see {@link DBMActions.preformActionsFromInteraction}
     */
    onMessageContextMenuInteraction(interaction: MessageContextMenuInteraction): void;
    /**
     * Handle button
     * @param interaction Button interaction
     * @see {@link DBMActions.preformActionsFromInteraction}
     * @see {@link DBMActions.getInvalidButtonResponseText}
     */
    onButtonInteraction(interaction: ButtonInteraction): void;
    /**
     * Handle select menu
     * @param interaction Select menu interaction
     * @see {@link DBMActions.preformActionsFromInteraction}
     * @see {@link DBMActions.getInvalidSelectResponseText}
     */
    onSelectMenuInteraction(interaction: SelectMenuInteraction): void;
}

/**
 * DBM.Actions
 *
 * This also contains all action functions, indexed by their action names.
 */
export interface DBMActions {
    /** Project actions directory path */
    actionsLocation: `${string}/actions`;
    /** Project events directory path */
    eventsLocation: `${string}/events`;
    /** Project extensions directory path */
    extensionsLocation: `${string}/extensions`;
    /** Server variables */
    server: Record<Snowflake, DBMVariables>;
    /** Global variables */
    global: DBMVariables;
    /** Timestamps for command time restrictions */
    timeStamps: Record<DBMCommandID, Record<Snowflake, number>>;
    /** Letter emojis for text convertion and flag emojis */
    _letterEmojis: [
        "🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬",
        "🇭", "🇮", "🇯", "🇰", "🇱", "🇲", "🇳",
        "🇴", "🇵", "🇶", "🇷", "🇸", "🇹", "🇺",
        "🇻", "🇼", "🇽", "🇾", "🇿"
    ];

    /** Actions cache class */
    readonly ActionsCache: DBMActionsCache;

    /**
     * Check if an action with a matching name exists
     * @param action Action name
     * @returns Whether a matching action exists
     */
    exists(action: string): boolean;
    /**
     * Resolve path relative to the current working directory
     * @param url Relative path
     * @returns Absolute path
     */
    getLocalFile(url: string): string;
    /**
     * Get the main DBM interface (usually used by actions)
     * @returns DBM interface
     * @see {@link DBM}
     */
    getDBM(): DBM;
    /**
     * Call function for each item in the given list
     * @param list Items that provide the specified function
     * @param funcName Name of the function to call
     * @param args Parameters for the function call
     * @returns Values returned by the called functions
     * @example
     * const members = [...server.members.cache.values()];
     * this.callListFunc(member, "setNickname", ["nickname", "reason"]).then(() => {
     *     this.callNextAction(cache);
     * });
     */
    callListFunc<Item, Args>(list: Item[], funcName: keyof Item & ((...args: Args[]) => unknown), args: Args[]): Promise<ReturnType<typeof funcName>>;
    /**
     * Template function for `tempVars`, `serverVars` and `globalVars`
     * @param this The `this` context is expected to be a variable container
     * @param name Variable name
     * @param defaultValue Default value
     * @returns Variable value
     * @example
     * const tempVars = this.getActionVariable.bind(cache.temp);
     * const serverVars = this.getActionVariable.bind(this.server[cache.server.id]);
     * const globalVars = this.getActionVariable.bind(this.global);
     */
    getActionVariable<D>(this: DBMVariables, name: string, defaultValue: D): RegularOrDefault<any, D>;
    /**
     * Template function for `slashParams`
     * @param interaction Command interaction
     * @param name Parameter name
     * @param defaultValue Default value
     * @returns Interaction parameter value
     * @example
     * const slashParams = this.getSlashParameter.bind(this, cache.interaction);
     */
    getSlashParameter<D>(interaction: CommandInteraction, name: string, defaultValue: D): ReturnType<this["getParameterFromInteraction"]> | D;
    /**
     * Convert text to character emojis
     * @param text Text to convert (non-ascii characters get preserved)
     * @param useRegional Use regional indicator
     * @returns Emoji text
     * @see {@link _letterEmojis}
     */
    convertTextToEmojis(text: string, useRegional: boolean): typeof useRegional extends true ? `:regional_indicator_${Lowercase<typeof text>}:` : string;
    /**
     * Convert flag name to unicode emoji
     * @param flagName Flag name
     * @returns Unicode emoji
     * @see {@link _letterEmojis}
     */
    getFlagEmoji(flagName: string): `${this["_letterEmojis"][number]}${this["_letterEmojis"][number]}`;
    /**
     * Template function for `customEmoji`
     * @param nameOrId Custom emoji name or id
     * @returns Custom emoji
     * @example
     * const customEmoji = this.getCustomEmoji.bind(this);
     */
    getCustomEmoji(nameOrId: Snowflake): Emoji | undefined;
    /**
     * Evaluate JavaScript code with some default values and functions (e.g. `msg`, `interaction`, `tempVars`, `slashParams`, ...)
     * @param content Content to evaluate
     * @param cache Actions cache
     * @param logError Whether to output errors to the console (default: true)
     * @returns Evaluation result or `false` if an error occurred
     * @example
     * this.eval("bot.username", cache);
     */
    eval(content: string, cache: DBMActionsCache, logError?: boolean): any;
    /**
     * Wraps the provided content into a template string and then evaluates it if necessary
     * @param content Content to evaluate as template
     * @param cache Actions cache
     * @returns Evaluation result
     * @see {@link eval}
     * this.evalMessage("${bot.username}");
     */
    evalMessage(content: string, cache: DBMActionsCache): string;
    /**
     * Attempts to evaluate the content via {@link eval}, using {@link evalMessage} as a fallback or returning the original content if both fail
     * @param content Content to evaluate
     * @param cache Actions cache
     * @returns Evaluation result or `false` if an error in both cases occurred
     */
    evalIfPossible(content: string, cache: DBMActionsCache): any;
    /**
     * Initialize modules
     * - Store `action` functions
     * - Store `modInit` references
     * - Execute `mod` functions
     * @see {@link DBMAction.action}
     * @see {@link DBMAction.mod}
     * @see {@link DBMAction.modInit}
     * @see {@link DBMEvent.mod}
     * @see {@link DBMExtension.mod}
     */
    initMods(): void;
    /**
     * Check which module directories exist and returns a list of them accordingly
     * @returns Directory list
     * @see {@link actionsLocation}
     * @see {@link eventsLocation}
     * @see {@link extensionsLocation}
     */
    modDirectories(): string[];
    /**
     * Check command conditions as well as time restrictions and invoke command actions if permitted
     * @param msg Command message
     * @param cmd Command
     */
    preformActionsFromMessage(msg: Message, cmd: DBMCommandJSON): void;
    /**
     * Check command conditions as well as time restrictions and invoke command actions if permitted
     * @param interaction Command interaction
     * @param cmd Command
     * @param meta Whether to set actions cache `meta`
     * @param initialTempVars Initial temp variables
     */
    preformActionsFromInteraction(interaction: Interaction, cmd: DBMCommandJSON, meta?: boolean, initialTempVars?: DBMVariables): void;
    /**
     * Invoke select command actions
     * @param interaction Command interaction
     * @param select Select command
     * @param meta Whether to set actions cache `meta`
     * @param initialTempVars Initial temp variables
     */
    preformActionsFromSelectInteraction(interaction: SelectMenuInteraction, select: DBMSelectData, meta?: boolean, initialTempVars?: DBMVariables): void;
    /**
     * Check command conditions
     * @param guild Server
     * @param member Server member
     * @param user Global user
     * @param cmd Command
     * @returns Whether the conditions are met
     */
    checkConditions(guild: Guild, member: GuildMember, user: User, cmd: DBMCommandJSON): boolean;
    /**
     * Check command time restriction
     * @param user Global user
     * @param msgOrInteraction Command message or interaction
     * @param cmd Command
     * @param returnTimeString Whether to return a time string or `false` if the user still needs to wait
     * @returns Whether enough time has passed since the last call or not, in which case it can be a string depending on the `returnTimeString` parameter
     */
    checkTimeRestriction(user: User, msgOrInteraction: Message | Interaction, cmd: DBMCommandJSON, returnTimeString?: boolean): typeof returnTimeString extends true ? true | string : boolean;
    /**
     * Convert a duration to readable text
     * @param seconds Duration in seconds (min: 1)
     * @returns Time string
     * @see {@link checkTimeRestriction}
     * @example
     * generateTimeString(0); // Invalid
     * generateTimeString(1); // "1 second"
     * generateTimeString(30); // "30 seconds"
     * generateTimeString(300); // "5 minutes"
     * generateTimeString(555); // "9 minutes and 15 seconds"
     * generateTimeString(5555); // "1 hour, 32 minutes, and 35 seconds"
     * generateTimeString(99999); // "1 day, 3 hours, 46 minutes, and 39 seconds"
     */
    generateTimeString(seconds: number): string;
    /**
     * Check member permissions
     * @param member Server member
     * @param permissions Required permissions
     * @returns Whether the member has the required permissions
     */
    checkPermissions(member: GuildMember, permissions: Permissions): boolean;
    /**
     * Start a text command action sequence
     * @param msg Command message
     * @param actions Action sequence
     * @param cmd Command for `meta` properties in actions cache
     */
    invokeActions(msg: Message, actions: DBMActionJSON[], cmd?: DBMCommandJSON): void;
    /**
     * Start an interaction command action sequence
     * @param interaction Command interaction
     * @param actions Action sequence
     * @param initialTempVars Initial temp variables
     * @param meta Command for `meta` properties in actions cache
     */
    invokeInteraction(interaction: Interaction, actions: DBMActionJSON[], initialTempVars?: DBMVariables, meta?: DBMActionsCacheMetadata): void;
    /**
     * Start an event action sequence
     * @param event Event for action sequence and `meta` properties in actions cache
     * @param server Initial server
     * @param temp Initial temp variables
     */
    invokeEvent(event: DBMEventJSON, server: Guild, temp: DBMVariables): void;
    /**
     * Call the next action in the action sequence or end the sequence if no actions are left
     * @param cache Actions cache
     * @see {@link endActions}
     */
    callNextAction(cache: DBMActionsCache): void;
    /**
     * End the action sequence by executing set callbacks in the actions cache
     * @param cache Actions cache
     * @see {@link DBMActionsCache.callback}
     * @see {@link DBMActionsCache.onCompleted}
     */
    endActions(cache: DBMActionsCache): void;
    /**
     * Get configured invalid button response text
     * @returns Text from settings
     * @see {@link DBMFiles.data}
     */
    getInvalidButtonResponseText(): string;
    /**
     * Get configured invalid select response text
     * @returns Text from settings
     * @see {@link DBMFiles.data}
     */
    getInvalidSelectResponseText(): string;
    /**
     * Get configured default response text (no response from any action)
     * @returns Text from settings
     * @see {@link DBMFiles.data}
     */
    getDefaultResponseText(): string;
    /**
     * Get configured invalid permissions response
     * @returns Text from settings
     * @see {@link DBMFiles.data}
     */
    getInvalidPermissionsResponse(): string;
    /**
     * Get configured invalid user response (user does not meet the conditions)
     * @returns Text from settings
     * @see {@link DBMFiles.data}
     */
    getInvalidUserResponse(): string;
    /**
     * Get configured invalid cooldown response (user still needs to wait)
     * @returns Text from settings
     * @see {@link DBMFiles.data}
     */
    getInvalidCooldownResponse(): string;
    /**
     * Generates an error string based on the actions cache
     * @param data Current action
     * @param cache Actions cache
     * @returns Error string
     */
    getErrorString(data: DBMActionJSON, cache: DBMActionsCache): string;
    /**
     * Outputs an error to the console
     * @param data Current action
     * @param cache Actions cache
     * @param err Error
     * @see {@link getErrorString}
     */
    displayError(data: DBMActionJSON, cache: DBMActionsCache, err: Error): void;
    /**
     * Get value from command interaction parameter
     * @param interaction Command interaction
     * @param name Parameter name
     * @returns Parameter value
     */
    getParameterFromInteraction(interaction: CommandInteraction, name: string): ReturnType<this["getParameterFromParameterData"]> | null;
    /**
     * Get parameter value from interaction option data
     * @param option Interaction option data
     * @returns Parameter value
     */
    getParameterFromParameterData(option: CommandInteractionOption): string | number | boolean | GuildMember | User | GuildBasedChannel | Role | MessageAttachment | null;
    /**
     * Find server member or global by their name
     * @param name Username
     * @param server Current server
     * @returns Member / user if found
     */
    findMemberOrUserFromName(name: string, server: Guild): Promise<GuildMember | User | null>;
    /**
     * Find server member or global by their id
     * @param id ID
     * @param server Current server
     * @returns Member / user if found
     */
    findMemberOrUserFromID(id: Snowflake, server?: Guild): Promise<GuildMember | User | null>;
    /**
     * Get target value from variable or interaction
     * @param varType Variable type
     * @param varName Variable / parameter name
     * @param cache Actions cache
     * @returns Variable / parameter value if present
     * @see {@link getParameterFromInteraction}
     */
    getTargetFromVariableOrParameter(varType: DBMInternalVarType, varName: string, cache: DBMActionsCache): typeof varType extends 3 ? ReturnType<this["getParameterFromInteraction"]> : any;
    /**
     * Get send target from raw action data
     * @param typeData Raw send target type
     * @param varNameData Raw variable / parameter name or search value
     * @param cache Actions cache
     * @returns Send target if present
     * @see {@link getSendTarget}
     */
    getSendTargetFromData(typeData: string, varNameData: string, cache: DBMActionsCache): ReturnType<this["getSendTarget"]>;
    /**
     * Get send target
     * @param type Send target type
     * @param varName Variable / parameter name or search value
     * @param cache Actions cache
     * @returns Send target if present
     * @see {@link getTargetFromVariableOrParameter}
     */
    getSendTarget(type: DBMSendTargetType, varName: string, cache: DBMActionsCache): Promise<Channel | User | GuildMember | ReturnType<this["getTargetFromVariableOrParameter"]> | null>;
    /**
     * Get send reply target
     * @param type Send reply target type
     * @param varName Variable / parameter name or search value
     * @param cache Actions cache
     * @returns Send reply target if present
     * @see {@link getSendTarget}
     */
    getSendReplyTarget(type: DBMSendReplyTargetType, varName: string, cache: DBMActionsCache): Promise<Message | null> | ReturnType<this["getSendTarget"]>;
    /**
     * Get member from raw action data
     * @param typeData Raw member type
     * @param varNameData Raw variable / parameter name or search value
     * @param cache Actions cache
     * @returns Member if present
     * @see {@link getMember}
     */
    getMemberFromData(typeData: string, varNameData: string, cache: DBMActionsCache): ReturnType<this["getMember"]>;
    /**
     * Get member
     * @param type Member type
     * @param varName Variable / parameter name or search value
     * @param cache Actions cache
     * @returns Member if present
     * @see {@link getTargetFromVariableOrParameter}
     */
    getMember(type: DBMMemberType, varName: string, cache: DBMActionsCache): Promise<GuildMember | User | null>;
    /**
     * Get message from raw action data
     * @param typeData Raw message type
     * @param varNameData Raw variable / parameter name
     * @param cache Actions cache
     * @returns Message if present
     * @see {@link getMessage}
     */
    getMessageFromData(typeData: string, varNameData: string, cache: DBMActionsCache): ReturnType<this["getMessage"]>;
    /**
     * Get message
     * @param type Message type
     * @param varName Variable / parameter name
     * @param cache Actions cache
     * @returns Message if present
     * @see {@link getTargetFromVariableOrParameter}
     */
    getMessage(type: DBMMessageType, varName: string, cache: DBMActionsCache): Promise<Message | null>;
    /**
     * Get server from raw action data
     * @param typeData Raw server type
     * @param varNameData Raw variable / parameter name or search value
     * @param cache Actions cache
     * @returns Server if present
     * @see {@link getServer}
     */
    getServerFromData(typeData: string, varNameData: string, cache: DBMActionsCache): ReturnType<this["getServer"]>;
    /**
     * Get server
     * @param type Server type
     * @param varName Variable / parameter name or search value
     * @param cache Actions cache
     * @returns Server if present
     * @see {@link getTargetFromVariableOrParameter}
     */
    getServer(type: DBMServerType, varName: string, cache: DBMActionsCache): Promise<Guild | null>;
    /**
     * Get role from raw action data
     * @param typeData Raw role type
     * @param varNameData Raw variable / parameter name or search value
     * @param cache Actions cache
     * @returns Role if present
     * @see {@link getRole}
     */
    getRoleFromData(typeData: string, varNameData: string, cache: DBMActionsCache): ReturnType<this["getRole"]>;
    /**
     * Get role
     * @param type Role type
     * @param varName Variable / parameter name or search value
     * @param cache Actions cache
     * @returns Role if present
     * @see {@link getTargetFromVariableOrParameter}
     */
    getRole(type: DBMRoleType, varName: string, cache: DBMActionsCache): Promise<Role | null>;
    /**
     * Get channel from raw action data
     * @param typeData Raw channel type
     * @param varNameData Raw variable / parameter name or search value
     * @param cache Actions cache
     * @returns Channel if present
     * @see {@link getChannel}
     */
    getChannelFromData(typeData: string, varNameData: string, cache: DBMActionsCache): ReturnType<this["getChannel"]>;
    /**
     * Get channel
     * @param type Channel type
     * @param varName Variable / parameter name or search value
     * @param cache Actions cache
     * @returns Channel if present
     * @see {@link getTargetFromVariableOrParameter}
     */
    getChannel(type: DBMChannelType, varName: string, cache: DBMActionsCache): Promise<GuildBasedChannel | null>;
    /**
     * Get voice channel from raw action data
     * @param typeData Raw voice channel type
     * @param varNameData Raw variable / parameter name or search value
     * @param cache Actions cache
     * @returns Voice channel if present
     * @see {@link getVoiceChannel}
     */
    getVoiceChannelFromData(typeData: string, varNameData: string, cache: DBMActionsCache): ReturnType<this["getVoiceChannel"]>;
    /**
     * Get voice channel
     * @param type Voice channel type
     * @param varName Variable / parameter name or search value
     * @param cache Actions cache
     * @returns Voice channel if present
     * @see {@link getTargetFromVariableOrParameter}
     */
    getVoiceChannel(type: DBMVoiceChannelType, varName: string, cache: DBMActionsCache): Promise<VoiceBasedChannel | null>;
    /**
     * Get any channel
     * @param type Any channel type
     * @param varName Variable / parameter name or search value
     * @param cache Actions cache
     * @returns Any channel if present
     * @see {@link getChannel}
     * @see {@link getVoiceChannel}
     */
    getAnyChannel(type: DBMAnyChannelType, varName: string, cache: DBMActionsCache): Promise<Channel | null>;
    /**
     * Get list from raw action data
     * @param typeData Raw list type
     * @param varNameData Raw variable / parameter name or search value
     * @param cache Actions cache
     * @returns List if present
     * @see {@link getList}
     */
    getListFromData<T>(typeData: string, varNameData: string, cache: DBMActionsCache): Promise<T[] | null>;// Currently not possible to infer generic return type of "getList"
    /**
     * Get list
     * @param type List type
     * @param varName Variable / parameter name or search value
     * @param cache Actions cache
     * @returns List if present
     * @see {@link getTargetFromVariableOrParameter}
     */
    getList<T>(type: DBMListType, varName: string, cache: DBMActionsCache): Promise<T[] | null>;
    /**
     * Get variable value
     * @param type Variable type
     * @param varName Variable name
     * @param cache Actions cache
     * @returns Variable value
     * @see {@link getTargetFromVariableOrParameter}
     */
    getVariable(type: DBMVarType, varName: string, cache: DBMActionsCache): ReturnType<this["getTargetFromVariableOrParameter"]>;
    /**
     * Store variable value
     * @param value Variable value
     * @param type Variable type
     * @param varName Variable name
     * @param cache Actions cache
     */
    storeValue(value: unknown, type: DBMVarType, varName: string, cache: DBMActionsCache): void;
    /**
     * Execute based on conditional result and configured conditional branch (provided by the `conditional-input` HTML element)
     * @param result Conditional result
     * @param data Conditional branch
     * @param cache Actions cache
     */
    executeResults(result: boolean, data: DBMActionBranchJSON, cache: DBMActionsCache): void;
    /**
     * Execute a sub action sequence and then the next one in the current sequence
     * @param actions Sub action sequence
     * @param cache Actions cache (use {@link generateSubCache} if variable changes from within the sub sequence should not apply to the current one)
     * @see {@link executeSubActions}
     */
    executeSubActionsThenNextAction(actions: DBMActionJSON[], cache: DBMActionsCache): void;
    /**
     * Execute a sub action sequence and then the callback if provided
     * @param actions Sub action sequence
     * @param cache Actions cache (use {@link generateSubCache} if variable changes from within the sub sequence should not apply to the current one)
     * @param callback Optional callback
     */
    executeSubActions(actions: DBMActionJSON[], cache: DBMActionsCache, callback?: (...args: unknown[]) => unknown): void;
    /**
     * Generate a new actions cache with some values applied from the parent actions cache
     * @param cache Parent actions cache
     * @param actions Sub action sequence
     * @returns Sub actions cache
     * @see {@link DBMActionsCache.extend}
     */
    generateSubCache(cache: DBMActionsCache, actions: DBMActionJSON[]): DBMActionsCache;
    /**
     * Generate message button options from button data
     * @param button Button data
     * @param cache Actions cache
     * @returns Message button options
     */
    generateButton(button: DBMButtonData, cache: DBMActionsCache): MessageButtonOptions;
    /**
     * Generate message select menu options from select data
     * @param select Button data
     * @param cache Actions cache
     * @returns Message select menu options
     */
    generateSelectMenu(select: DBMSelectData, cache: DBMActionsCache): MessageSelectMenuOptions;
    /**
     * Generate text input component options from text input data
     * @param textInput Text input data
     * @param defaultCustomId Default custom id
     * @param cache Text input component options
     */
    generateTextInput(textInput: DBMTextInputData, defaultCustomId: string, cache: DBMActionsCache): TextInputComponentOptions;
    /**
     * Add message button options to action row array
     * @param array Action rows
     * @param rowText Raw row number
     * @param buttonData Message button options
     * @param cache Actions cache
     */
    addButtonToActionRowArray(array: BaseMessageComponentOptions[][], rowText: string, buttonData: MessageButtonOptions, cache: DBMActionsCache): void;
    /**
     * Add message select menu options to action row array
     * @param array Action rows
     * @param rowText Raw row number
     * @param selectData Message select menu options
     * @param cache Actions cache
     */
    addSelectToActionRowArray(array: BaseMessageComponentOptions[][], rowText: string, selectData: MessageSelectMenuOptions, cache: DBMActionsCache): void;
    /**
     * Add text input component options to action row array
     * @param array Action rows
     * @param rowText Raw row number
     * @param textInput Text input component options
     * @param cache Actions cache
     */
    addTextInputToActionRowArray(array: BaseMessageComponentOptions[][], rowText: string, textInput: TextInputComponentOptions, cache: DBMActionsCache): void;
    /**
     * Check whether the custom id of the interaction is still valid and reply automatically if not
     * @param interaction Button / select menu interaction
     * @returns Whether the custom id is valid
     */
    checkTemporaryInteractionResponses(interaction: Interaction): boolean;
    /**
     * Register a temporary interaction
     * @param messageId Message id
     * @param time Valid duration in milliseconds
     * @param customId Custom id
     * @param userId User id
     * @param multi Whether multiple calls are allowed
     * @param interactionCallback Callback for when the interaction gets called
     */
    registerTemporaryInteraction(messageId: Snowflake, time: number, customId: string, userId: Snowflake, multi: boolean, interactionCallback: (interaction: Interaction, ...args: unknown[]) => unknown): void;
    /**
     * Invalidate a temporary interaction
     * @param messageId Message id
     * @param uniqueOrCustomId Custom id or unique id (used internally)
     */
    removeTemporaryInteraction(messageId: Snowflake, uniqueOrCustomId: string | number): void;
    /**
     * Invalidate a temporary interaction
     * @param messageId Message id
     * @param customId Custom id
     * @see {@link removeTemporaryInteraction}
     */
    clearTemporaryInteraction(messageId: Snowflake, customId: string): void;
    /**
     * Invalidate all temporary interactions for a specific message
     * @param messageId Message id
     */
    clearAllTemporaryInteractions(messageId: Snowflake): void;
    /**
     * Register a temporary modal interaction
     * @param interactionId Interaction id
     * @param callback Callback for when the modal gets submitted
     */
    registerModalSubmitResponses(interactionId: Snowflake, callback: (interaction: Interaction, ...args: unknown[]) => unknown): void;
    /**
     * Trigger temporary modal interaction if available 
     * @param interaction Modal interaction
     */
    checkModalSubmitResponses(interaction: ModalSubmitInteraction): void;

    [x: string]: any;
}

/**
 * DBM.Actions.ActionsCache
 */
export class DBMActionsCache {
    constructor(actions: DBMActionJSON[], server: Guild, options?: { index?: number, temp?: DBMVariables, msg?: Message, interaction?: Interaction, isSubCache?: boolean, meta?: DBMActionsCacheMetadata });

    /** Action sequence */
    actions: DBMActionJSON[];
    /** Current server */
    server: Guild;
    /** Action index */
    index: number;
    /** Temp variables */
    temp: DBMVariables;
    /** Command message */
    msg: Message;
    /** Interaction */
    interaction: Interaction;
    /** Sub actions cache indicator */
    isSubCache: boolean;
    /** Actions cache meta */
    meta: DBMActionsCacheMetadata;

    /**
     * Callback from sub action sequence to parent action sequence
     */
    callback?(): void;
    /**
     * Callback for main action sequence
     * @see {@link onMainCacheCompleted}
     */
    onCompleted?(): void;
    /**
     * Handle action sequence end
     * @see {@link DBMActions.getDefaultResponseText}
     */
    onMainCacheCompleted(): void;
    /**
     * Get command user
     */
    getUser(): User;
    /**
     * Get command message
     */
    getMessage(): Message | null;
    /**
     * Go to action anchor
     * @param anchorName Anchor name
     * @see {@link DBMActions.callNextAction}
     */
    goToAnchor(anchorName: string): void;
    /**
     * Convert to string
     * @returns Info about the command or event
     */
    toString(): string;

    /**
     * Create sub actions cache with some values applied from the parent actions cache
     * @param other Parent actions cache
     * @param actions Sub action sequence
     * @returns Sub actions cache
     */
    static extend(other: DBMActionsCache, actions: DBMActionJSON[]): DBMActionsCache;
}

/**
 * DBM.Events
 */
export interface DBMEvents {
    data: ReturnType<this["generateData"]>;

    generateData(): [keyof ClientEvents, DBMVarType, DBMVarType, DBMEventObjectType, boolean, ((arg1: unknown, arg2: unknown) => boolean) | null | undefined][];
    registerEvents(bot: Client): void;
    callEvents(id: `${DBMEventType}`, temp1: DBMVarType, temp2: DBMVarType, server: DBMEventObjectType, mustServe: boolean, condition: ((arg1: unknown, arg2: unknown) => boolean) | null | undefined, arg1: unknown, arg2: unknown): void;
    getObject(id: DBMEventObjectType, arg1: unknown, arg2: unknown): TypeFromRecord<typeof id, UnionObject<DBMEventObjectType, { 1: any, 2: Guild, 3: any, 4: Guild, 100: Guild, 200: User }>>;
    onInitialization(bot: Client): void;
    onInitializationOnce(bot: Client): void;
    setupIntervals(bot: Client): void;
    onReaction(id: `${28 | 29}`, reaction: MessageReaction, user: User): void;
    onTyping(id: `${34}`, channel: Channel, user: User): void;
    onError(text: string, text2: string, cache: DBMActionsCache): void;
}

/**
 * DBM.Images
 */
export interface DBMImages {
    readonly JIMP: Jimp;

    getImage(url: string): ReturnType<typeof Jimp.read>;
    getFont(url: string): ReturnType<typeof Jimp.loadFont>;
    isImage(obj: unknown): obj is Jimp;
    createBuffer(image: Jimp): ArrayBuffer;
    drawImageOnImage(img1: Jimp, img2: Jimp, x: number, y: number): void;
}

/**
 * DBM.Files
 */
export interface DBMFiles {
    data: UnionObject<DBMDataFileTypes, {
        commands: [null, ...DBMCommandJSON[]],
        events: [null, ...DBMEventJSON[]],
        settings: DBMSettingsJSON,
        players: Record<Snowflake, any>,
        servers: Record<Snowflake, any>,
        messages: Record<Snowflake, any>,
        serverVars: any,
        globalVars: any
    }>;
    writers: Record<DBMDataFileTypes, any>;
    password: string;

    readonly crypto: typeof import("node:crypto");
    readonly dataFiles: [
        "commands.json",
        "events.json",
        "settings.json",
        "players.json",
        "servers.json",
        "messages.json",
        "serverVars.json",
        "globalVars.json",
    ];

    startBot(): void;
    verifyDirectory(dir: string): boolean;
    readData(callback: () => unknown): void;
    saveData(file: DBMDataFileTypes, callback: () => unknown): void;
    initEncryption(): void;
    encrypt(text: string): string;
    decrypt(text: string): string;
    convertItem(item: DBMConvertableItem | object | boolean | number | bigint | string | symbol): string | null;
    saveServerVariable(serverId: Snowflake, varName: string, item: Parameters<this["convertItem"]>[0]): void;
    restoreServerVariables(): void;
    saveGlobalVariable(varName: string, item: Parameters<this["convertItem"]>[0]): void;
    restoreGlobalVariables(): void;
    restoreVariable(value: Parameters<this["restoreValue"]>[0], type: DBMVarType, varName: string, serverId: Snowflake): void;
    restoreValue<T extends OnceOrArray<unknown>>(value: T, bot: Client): Promise<OnceOrArray<T extends OnceOrArray<DBMVariableString> ? GuildMember | Message | Channel | Role | Guild | Emoji | User | null : boolean | number | bigint | string | symbol | null>>;
    restoreMember(value: DBMMemberVariableString, bot: Client): GuildMember | null;
    restoreMessage(value: DBMMessageVariableString, bot: Client): Promise<Message> | null;
    restoreTextChannel(value: DBMTextChannelVariableString, bot: Client): Channel | null;
    restoreVoiceChannel(value: DBMVoiceChannelVariableString, bot: Client): Channel | null;
    restoreRole(value: DBMRoleVariableString, bot: Client): Role | null;
    restoreServer(value: DBMServerVariableString, bot: Client): Guild | null;
    restoreEmoji(value: DBMEmojiVariableString, bot: Client): Emoji | null;
    restoreUser(value: DBMUserVariableString, bot: Client): User | null;
}

/**
 * DBM.Audio
 */
export interface DBMAudio {
    ytdl: typeof import("ytdl-core");
    voice: typeof import("@discordjs/voice");
    rawYtdl: typeof import("youtube-dl-exec");
    subscriptions: Record<string, DBMAudioSubscription>;

    readonly Subscription: DBMAudioSubscription;
    readonly Track: DBMAudioTrack;
    readonly BasicTrack: DBMAudioBasicTrack;

    checkIfHasDependency(key: string): boolean;
    connectToVoice(voiceChannel: VoiceBasedChannel): DBMAudioSubscription | undefined;
    getSubscription(guild: Guild): DBMAudioSubscription;
    disconnectFromVoice(guild: Guild): void;
    setVolume(volume: number, guild: Guild): void;
    addAudio(info: DBMAudioInfo, guild: Guild, isQueue: boolean): Promise<void>;
    addToQueue(info: DBMAudioInfo, guild: Guild): Promise<void>;
    playImmediately(info: DBMAudioInfo, guild: Guild): Promise<void>;
    clearQueue(cache: DBMActionsCache): void;
    getTrack(url: string, type: DBMAudioType): DBMAudioTrack | DBMAudioBasicTrack;
}

/**
 * DBM.Audio.Subscription
 */
export class DBMAudioSubscription extends PlayerSubscription {
    voiceConnection: VoiceConnection;
    audioPlayer: AudioPlayer;
    queue: DBMAudioTrack[];
    volume: number;
    bitrate: number;

    constructor(voiceConnection: VoiceConnection);
    enqueue(track: DBMAudioTrack, beginning: boolean): void;
    stop(): void;
    processQueue(): Promise<void>;
}

/**
 * DBM.Audio.Track
 */
export class DBMAudioTrack {
    urL: string;
    title: string;

    constructor(data: { url: string, title: string });
    createAudioResource(): Promise<AudioResource>;

    static from(url: string): Promise<DBMAudioTrack>;
}

/**
 * DBM.Audio.BasicTrack
 */
export class DBMAudioBasicTrack {
    urL: string;

    constructor(data: { url: string });
    createAudioResource(): AudioResource;
}
