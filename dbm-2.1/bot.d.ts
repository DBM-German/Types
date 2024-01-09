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
    DBMUserVariableString,
    DBMMemberVariableString,
    DBMServerVariableString,
    DBMMessageVariableString,
    DBMTextChannelVariableString,
    DBMVoiceChannelVariableString,
    DBMRoleVariableString,
    DBMEmojiVariableString,
    DBMVariableString,
    DBMActionResponseMode,
    DBMConvertableItem,
    DBMCommandID,
    DBMActionJSON,
    DBMActionBranchJSON,
    DBMActionMeta,
    DBMCommandJSON,
    DBMEventJSON
} from "./common.d.ts";
import type {
    OnceOrArray,
    TypeFromRecord,
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
    $button: Record<string, MessageButtonOptions>;
    /** Select interactions */
    $select: Record<string, MessageSelectMenuOptions>;
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
    applicationCommandData: ApplicationCommandData[];
    hasMemberIntents: boolean;
    hasMessageContentIntents: boolean;
    tagRegex: ReturnType<this["generateTagRegex"]>;

    readonly PRIVILEGED_INTENTS: number;
    readonly NON_PRIVILEGED_INTENTS: number;
    readonly ALL_INTENTS: number;

    init(): void;
    initBot(): void;
    makeClientOptions(): void;
    intents(): void;
    usePartials(): void;
    partials(): PartialTypes[];
    setupBot(): void;
    onRawData(packet: GatewayDispatchPayload): void;
    reformatData(): void;
    reformatCommands(): void;
    createApiJsonFromCommand(com: DBMCommandJSON, name: string): ApplicationCommandData;
    mergeSubCommandIntoCommandData(names: string[], data: ApplicationCommandSubCommandData): void;
    validateSlashCommandName(name: string): string[] | false;
    validateSlashCommandParameterName(name: string): Lowercase<string> | false;
    generateSlashCommandDescription(com: DBMCommandJSON): string;
    validateSlashCommandDescription(desc?: string): string;
    getNoDescriptionText(): string;
    validateSlashCommandParameters(parameters: ApplicationCommandOptionData[], commandName: string): ApplicationCommandOptionData[];
    reformatEvents(): void;
    prepareActions(actions: DBMActionJSON[]): void;
    registerButtonInteraction(interactionId: Snowflake, data: MessageButtonOptions): void;
    registerSelectMenuInteraction(interactionId: Snowflake, data: MessageSelectMenuOptions): void;
    checkForCommandErrors(): void;
    initEvents(): void;
    login(): void;
    onReady(): void;
    restoreVariables(): void;
    registerApplicationCommands(): void;
    onServerJoin(guild: Guild): void;
    initializeCommandsForNewServer(guild: Guild): void;
    shouldPrintAnyMissingAccessError(): boolean;
    clearUnspecifiedServerCommands(): boolean;
    setGlobalCommands(commands: ApplicationCommandData[]): void;
    setCommandsForServer(guild: Guild, commands: ApplicationCommandData[], printMissingAccessError: boolean): void;
    setAllServerCommands(commands: ApplicationCommandData[], printMissingAccessError: boolean): void;
    setCertainServerCommands(commands: ApplicationCommandData[], serverIdList: Snowflake[]): void;
    preformInitialization(): void;
    onMessage(msg: Message): void;
    checkCommand(msg: Message): boolean;
    escapeRegExp(text: string): string;
    generateTagRegex(tag: string, allowPrefixSpace: boolean): RegExp;
    populateTagRegex(): RegExp;
    checkTag(content: string): string | null;
    onAnyMessage(msg: Message): void;
    checkIncludes(msg: Message): void;
    checkRegExps(msg: Message): void;
    onInteraction(interaction: Interaction): void;
    onSlashCommandInteraction(interaction: CommandInteraction): void;
    onContextMenuInteraction(interaction: ContextMenuInteraction): void;
    onUserContextMenuInteraction(interaction: UserContextMenuInteraction): void;
    onMessageContextMenuInteraction(interaction: MessageContextMenuInteraction): void;
    onButtonInteraction(interaction: ButtonInteraction): void;
    onSelectMenuInteraction(interaction: SelectMenuInteraction): void;
}

/**
 * DBM.Actions
 *
 * This also contains all action functions, indexed by their action names.
 */
export interface DBMActions {
    actionsLocation: string;
    eventsLocation: string;
    extensionsLocation: string;
    server: Record<Snowflake, DBMVariables>;
    global: DBMVariables;
    timeStamps: Record<DBMCommandID, Record<Snowflake, number>>;

    _letterEmojis: [
        "🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬",
        "🇭", "🇮", "🇯", "🇰", "🇱", "🇲", "🇳",
        "🇴", "🇵", "🇶", "🇷", "🇸", "🇹", "🇺",
        "🇻", "🇼", "🇽", "🇾", "🇿"
    ];

    readonly ActionsCache: DBMActionsCache;

    exists(action: string): boolean;
    getLocalFile(url: string): string;
    getDBM(): DBM;
    callListFunc<Item, Args>(list: Item[], funcName: keyof Item & ((...args: Args[]) => unknown), args: Args[]): Promise<ReturnType<typeof funcName>>;
    getActionVariable<D>(name: string, defaultValue: D): RegularOrDefault<any, D>;
    getSlashParameter<D>(interaction: CommandInteraction, name: string, defaultValue: D): ReturnType<this["getParameterFromInteraction"]> | D;
    convertTextToEmojis(text: string, useRegional: boolean): string;
    getFlagEmoji(flagName: string): `${this["_letterEmojis"][number]}${this["_letterEmojis"][number]}`;
    getCustomEmoji(nameOrId: Snowflake): Emoji | undefined;
    eval(content: string, cache: DBMActionsCache, logError: boolean): any;
    evalMessage(content: string, cache: DBMActionsCache): string;
    evalIfPossible(content: string, cache: DBMActionsCache): any;
    initMods(): void;
    modDirectories(): string[];
    preformActionsFromMessage(msg: Message, cmd: DBMCommandJSON): void;
    preformActionsFromInteraction(interaction: Interaction, cmd: DBMCommandJSON, meta?: boolean, initialTempVars?: DBMVariables): void;
    preformActionsFromSelectInteraction(interaction: SelectMenuInteraction, select: DBMActionJSON, meta?: boolean, initialTempVars?: DBMVariables): void;
    checkConditions(guild: Guild, member: GuildMember, user: User, cmd: DBMCommandJSON): boolean;
    checkTimeRestriction(user: User, msgOrInteraction: Message | Interaction, cmd: DBMCommandJSON, returnTimeString: boolean): string;
    generateTimeString(milliseconds: number): string;
    checkPermissions(member: GuildMember, permissions: Permissions): boolean;
    invokeActions(msg: Message, actions: DBMActionJSON[], cmd?: DBMCommandJSON): void;
    invokeInteraction(interaction: Interaction, actions: DBMActionJSON[], initialTempVars?: DBMVariables, meta?: DBMActionMeta): void;
    invokeEvent(event: DBMEventJSON, server: Guild, temp: DBMVariables): void;
    callNextAction(cache: DBMActionsCache): void;
    endActions(cache: DBMActionsCache): void;
    getInvalidButtonResponseText(): string;
    getInvalidSelectResponseText(): string;
    getDefaultResponseText(): string;
    getInvalidPermissionsResponse(): string;
    getInvalidUserResponse(): string;
    getInvalidCooldownResponse(): string;
    getErrorString(data: DBMActionJSON, cache: DBMActionsCache): string;
    displayError(data: DBMActionJSON, cache: DBMActionsCache, err: Error): void;
    getParameterFromInteraction(interaction: CommandInteraction, name: string): ReturnType<this["getParameterFromParameterData"]> | null;
    getParameterFromParameterData(option: CommandInteractionOption): string | number | boolean | GuildMember | User | GuildBasedChannel | Role | MessageAttachment | null;
    findMemberOrUserFromName(name: string, server: Guild): Promise<GuildMember | User | null>;
    findMemberOrUserFromID(id: Snowflake, server?: Guild): Promise<GuildMember | User | null>;
    getTargetFromVariableOrParameter(varType: DBMInternalVarType, varName: string, cache: DBMActionsCache): typeof varType extends 3 ? ReturnType<this["getParameterFromInteraction"]> : any;
    getSendTargetFromData(typeData: string, varNameData: string, cache: DBMActionsCache): ReturnType<this["getSendTarget"]>;
    getSendTarget(type: DBMSendTargetType, varName: string, cache: DBMActionsCache): Promise<Channel | User | GuildMember | ReturnType<this["getTargetFromVariableOrParameter"]> | null>;
    getSendReplyTarget(type: DBMSendReplyTargetType, varName: string, cache: DBMActionsCache): Promise<Message | null> | ReturnType<this["getSendTarget"]>;
    getMemberFromData(typeData: string, varNameData: string, cache: DBMActionsCache): ReturnType<this["getMember"]>;
    getMember(type: DBMMemberType, varName: string, cache: DBMActionsCache): Promise<GuildMember | User | null>;
    getMessageFromData(typeData: string, varNameData: string, cache: DBMActionsCache): ReturnType<this["getMessage"]>;
    getMessage(type: DBMMessageType, varName: string, cache: DBMActionsCache): Promise<Message | null>;
    getServerFromData(typeData: string, varNameData: string, cache: DBMActionsCache): ReturnType<this["getServer"]>;
    getServer(type: DBMServerType, varName: string, cache: DBMActionsCache): Promise<Guild | null>;
    getRoleFromData(typeData: string, varNameData: string, cache: DBMActionsCache): ReturnType<this["getRole"]>;
    getRole(type: DBMRoleType, varName: string, cache: DBMActionsCache): Promise<Role | null>;
    getChannelFromData(typeData: string, varNameData: string, cache: DBMActionsCache): ReturnType<this["getChannel"]>;
    getChannel(type: DBMChannelType, varName: string, cache: DBMActionsCache): Promise<GuildBasedChannel | null>;
    getVoiceChannelFromData(typeData: string, varNameData: string, cache: DBMActionsCache): ReturnType<this["getVoiceChannel"]>;
    getVoiceChannel(type: DBMVoiceChannelType, varName: string, cache: DBMActionsCache): Promise<VoiceBasedChannel | null>;
    getAnyChannel(type: DBMAnyChannelType, varName: string, cache: DBMActionsCache): Promise<Channel | null>;
    getListFromData<T>(typeData: string, varNameData: string, cache: DBMActionsCache): Promise<T[] | null>;// Currently not possible to infer generic return type of "getList"
    getList<T>(type: DBMListType, varName: string, cache: DBMActionsCache): Promise<T[] | null>;
    getVariable(type: DBMVarType, varName: string, cache: DBMActionsCache): ReturnType<this["getTargetFromVariableOrParameter"]>;
    storeValue(value: unknown, type: DBMVarType, varName: string, cache: DBMActionsCache): void;
    executeResults(result: boolean, data: DBMActionBranchJSON, cache: DBMActionsCache): void;
    executeSubActionsThenNextAction(actions: DBMActionJSON[], cache: DBMActionsCache): void;
    executeSubActions(actions: DBMActionJSON[], cache: DBMActionsCache, callback?: () => void): void;
    generateSubCache(cache: DBMActionsCache, actions: DBMActionJSON[]): DBMActionsCache;
    generateButton(button: { id: string, name: string, type: string, url: string, emoji: string }, cache: DBMActionsCache): MessageButtonOptions;
    generateSelectMenu(select: { id: string, mode: DBMActionResponseMode, placeholder: string, min: string, max: string, options: { label: string, description: string, value: string }[] }, cache: DBMActionsCache): MessageSelectMenuOptions;
    generateTextInput(textInput: { id: string, mode: DBMActionResponseMode, name: string, placeholder: string, minLength: string, maxLength: string, style: string, required: string }, defaultCustomId: string, cache: DBMActionsCache): TextInputComponentOptions;
    addButtonToActionRowArray(array: BaseMessageComponentOptions[][], rowText: string, buttonData: MessageButtonOptions, cache: DBMActionsCache): void;
    addSelectToActionRowArray(array: BaseMessageComponentOptions[][], rowText: string, selectData: MessageSelectMenuOptions, cache: DBMActionsCache): void;
    addTextInputToActionRowArray(array: BaseMessageComponentOptions[][], rowText: string, textInput: TextInputComponentOptions, cache: DBMActionsCache): void;
    checkTemporaryInteractionResponses(interaction: Interaction): boolean;
    registerTemporaryInteraction(messageId: Snowflake, time: number, customId: string, userId: Snowflake, multi: boolean, interactionCallback: (interaction: Interaction) => void): void;
    removeTemporaryInteraction(messageId: Snowflake, uniqueOrCustomId: string | number): void;
    clearTemporaryInteraction(messageId: Snowflake, customId: string): void;
    clearAllTemporaryInteractions(messageId: Snowflake): void;
    registerModalSubmitResponses(interactionId: Snowflake, callback: (interaction: Interaction) => void): void;
    checkModalSubmitResponses(interaction: ModalSubmitInteraction): void;

    [x: string]: any;
}

/**
 * DBM.Actions.ActionsCache
 */
export class DBMActionsCache {
    constructor(actions: DBMActionJSON[], server: Guild, options?: { index?: number, temp?: DBMVariables, msg?: Message, interaction?: Interaction, isSubCache?: boolean, meta?: DBMActionMeta });

    actions: DBMActionJSON[];
    server: Guild;
    index: number;
    temp: DBMVariables;
    msg: Message;
    interaction: Interaction;
    isSubCache: boolean;
    meta: { isEvent: boolean, name: string };

    callback?(): void;
    onCompleted(): void;
    onMainCacheCompleted(): void;
    getUser(): User;
    getMessage(): Message | null;
    goToAnchor(anchorName: string): void;
    toString(): string;

    static extend(other: DBMActionsCache, actions: DBMActionJSON[]): DBMActionsCache;
}

/**
 * DBM.Events
 */
export interface DBMEvents {
    data: ReturnType<this["generateData"]>;

    generateData(): [keyof ClientEvents, DBMVarType, DBMVarType, DBMEventObjectType, boolean, ((arg1: unknown, arg2: unknown) => boolean) | null | undefined][];
    registerEvents(bot: Client): void;
    callEvents(id: `${number}`, temp1: DBMVarType, temp2: DBMVarType, server: DBMEventObjectType, mustServe: boolean, condition: ((arg1: unknown, arg2: unknown) => boolean) | null | undefined, arg1: unknown, arg2: unknown): void;
    getObject(id: DBMEventObjectType, arg1: unknown, arg2: unknown): TypeFromRecord<typeof id, { 1: unknown, 2: Guild, 3: unknown, 4: Guild, 100: Guild, 200: User }>;
    onInitialization(bot: Client): void;
    onInitializationOnce(bot: Client): void;
    setupIntervals(bot: Client): void;
    onReaction(id: `${number}`, reaction: MessageReaction, user: User): void;
    onTyping(id: `${number}`, channel: Channel, user: User): void;
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
    data: Record<this["dataFiles"][number], any>;
    writers: Record<this["dataFiles"][number], any>;
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
    saveData(file: this["dataFiles"][number], callback: () => unknown): void;
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
