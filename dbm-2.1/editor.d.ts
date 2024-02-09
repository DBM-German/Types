import type {
    DBMVersion,
    DBMSimpleVersion,
    DBMVarType,
    DBMInternalVarType,
    DBMSendReplyTargetType,
    DBMMemberType,
    DBMMessageType,
    DBMServerType,
    DBMRoleType,
    DBMChannelType,
    DBMVoiceChannelType,
    DBMListType,
    DBMPermissionType,
    DBMPermissionStringType,
    DBMInternalPermissionType,
    DBMInternalDataType,
    DBMActionJSON,
    DBMActionMetadata,
    DBMCommandJSON,
    DBMEventJSON
} from "./common.d.ts";
import type {
    FixIndecesArray,
    TypedArray
} from "./internal.d.ts";
import type {
    DBMEditorPlaceholderTranslationElementID,
    DBMEditorTranslationElementID,
    DBMEditorTranslations
} from "./translations.d.ts";


/**
 * Alternative texts
 */
export type DBMAlternativeTexts = { defaultText: string, options: { button: string, select: string } };

/**
 * Preset type
 */
export type DBMEditorPresetType = string | DBMAlternativeTexts;

/**
 * Permissions configuration
 */
export interface DBMPermissionsConfig {
    /** Permission list (names and descriptions) */
    Permissions: FixIndecesArray<DBMPermissionType, TypedArray<[DBMPermissionStringType, string], [
        ["VIEW_CHANNEL", "View channels"],
        ["MANAGE_CHANNELS", "Manage channels"],
        ["MANAGE_ROLES", "Manage roles"],
        ["MANAGE_EMOJIS_AND_STICKERS", "Manage emojis and stickers"],
        ["VIEW_AUDIT_LOG", "View audit log"],
        ["VIEW_GUILD_INSIGHTS", "View Server Insights"],
        ["MANAGE_WEBHOOKS", "Manage webhooks"],
        ["MANAGE_GUILD", "Manage server"],
        ["CREATE_INSTANT_INVITE", "Create invite"],
        ["CHANGE_NICKNAME", "Change nickname"],
        ["MANAGE_NICKNAMES", "Manage nicknames"],
        ["KICK_MEMBERS", "Kick members"],
        ["BAN_MEMBERS", "Ban members"],
        ["MODERATE_MEMBERS", "Time out members"],
        ["SEND_MESSAGES", "Send messages"],
        ["SEND_MESSAGES_IN_THREADS", "Send messages in threads"],
        ["USE_PUBLIC_THREADS", "Create public threads"],
        ["USE_PRIVATE_THREADS", "Create private threads"],
        ["EMBED_LINKS", "Embed links"],
        ["ATTACH_FILES", "Attach files"],
        ["ADD_REACTIONS", "Add reactions"],
        ["USE_EXTERNAL_EMOJIS", "Use external emojis"],
        ["USE_EXTERNAL_STICKERS", "Use External Stickers"],
        ["MENTION_EVERYONE", "Mention @everyone, @here and all roles"],
        ["MANAGE_MESSAGES", "Manage messages"],
        ["READ_MESSAGE_HISTORY", "Read message history"],
        ["SEND_TTS_MESSAGES", "Send text-to-speech messages"],
        ["USE_APPLICATION_COMMANDS", "Use Application Commands"],
        ["CONNECT", "Connect"],
        ["SPEAK", "Speak"],
        ["STREAM", "Video"],
        ["USE_VAD", "Use Voice Activity Detection"],
        ["PRIORITY_SPEAKER", "Priority Speaker"],
        ["MUTE_MEMBERS", "Mute members"],
        ["DEAFEN_MEMBERS", "Defean members"],
        ["MOVE_MEMBERS", "Move members"],
        ["ADMINISTRATOR", "Administrator"],
        ["REQUEST_TO_SPEAK", "Request to speak"],
        ["MANAGE_THREADS", "Manage threads"],
        ["MANAGE_EVENTS", "Manage Events"]
    ]>>;
    /** Text channel permissions (ids) */
    TextChannelPermissions: TypedArray<DBMPermissionType, [ 0, 1, 6, 8, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 38, 25, 26, 27 ]>;
    /** Voice channel permissions (ids) */
    VoiceChannelPermissions: TypedArray<DBMPermissionType, [ 0, 1, 8, 28, 29, 30, 31, 32, 33, 34, 35, 39 ]>;
}

/**
 * Window options
 */
export interface DBMWindowOptions {
    height: number;
    width: number;
    icon: string;
    minimizable: boolean;
    modal: boolean;
    resizable: boolean;
    show: boolean;
    useContentSize: boolean;
    webPreferences: {
        allowRunningInsecureContent: boolean,
        contextIsolation: boolean,
        enableRemoteModule: boolean,
        nodeIntegration: boolean,
        spellcheck: boolean
    };
    parent: any;
}

export interface DBMDialogOptions extends DBMWindowOptions {
}

/**
 * Preset lists and functions
 */
export interface DBMEditorPresetsInputNames {
    variables: FixIndecesArray<DBMVarType, string[]>;
    sendTargets: DBMEditorPresetType[];
    sendReplyTargets: DBMEditorPresetType[];
    members: DBMEditorPresetType[];
    messages: DBMEditorPresetType[];
    servers: DBMEditorPresetType[];
    roles: DBMEditorPresetType[];
    channels: DBMEditorPresetType[];
    voiceChannels: DBMEditorPresetType[];
    anyChannels: DBMEditorPresetType[];
    lists: DBMEditorPresetType[];
    conditions: DBMEditorPresetType[];
    findMem: DBMEditorPresetType[];
    findServer: DBMEditorPresetType[];
    findRole: DBMEditorPresetType[];
    findChan: DBMEditorPresetType[];

    /**
     * Get variable text
     * @param type Variable type
     * @param varName Variable name
     * @returns Text
     */
    getVariableText(type: DBMVarType | string, varName: string): string;
    /**
     * Get send target text
     * @param type Send target type
     * @param varName Variable name
     * @returns Text
     */
    getSendTargetText(type: DBMSendReplyTargetType | string, varName: string): string;
    /**
     * Get send reply target text
     * @param type Send reply target type
     * @param varName Variable name
     * @returns Text
     */
    getSendReplyTargetText(type: DBMSendReplyTargetType | string, varName: string): string;
    /**
     * Get member text
     * @param type Member type
     * @param varName Variable name
     * @returns Text
     */
    getMemberText(type: DBMMemberType | string, varName: string): string;
    /**
     * Get message text
     * @param type Message type
     * @param varName Variable name
     * @returns Text
     */
    getMessageText(type: DBMMessageType | string, varName: string): string;
    /**
     * Get server text
     * @param type Server type
     * @param varName Variable name
     * @returns Text
     */
    getServerText(type: DBMServerType | string, varName: string): string;
    /**
     * Get role text
     * @param type Role type
     * @param varName Variable name
     * @returns Text
     */
    getRoleText(type: DBMRoleType | string, varName: string): string;
    /**
     * Get channel text
     * @param type Channel type
     * @param varName Variable name
     * @returns Text
     */
    getChannelText(type: DBMChannelType | string, varName: string): string;
    /**
     * Get voice channel text
     * @param type Voice channel type
     * @param varName Variable name
     * @returns Text
     */
    getVoiceChannelText(type: DBMVoiceChannelType | string, varName: string): string;
    /**
     * Get list text
     * @param type List type
     * @param varName Variable name
     * @returns Text
     */
    getListText(type: DBMListType | string, varName: string): string;
    /**
     * Get conditions text
     * @param data Action data
     * @returns Text
     */
    getConditionsText(data: DBMActionJSON): string;

    [x: string]: any;
}

/**
 * Helper functions
 */
export interface DBMEditorModHelpers {
    /**
     * Generate UUID
     * @example
     * helpers.generateUUID(); // cf65187c-fda7-43f0-9856-89cf5d12c86d
     */
    generateUUID(): `${string}-${string}-${string}-${string}-${string}`;

    [x: string]: any;
}

/**
 * Translation manager
 */
export interface DBMEditorTranslationManager {
    /** Translation file name */
    currTranslation: string;
    /** Translation keys and values */
    translations: DBMEditorTranslations;

    /**
     * Get preset input names
     * @returns Presets
     */
    getPresetInputNames(): DBMEditorPresetsInputNames;
    /**
     * Load translations
     */
    loadTranslations(): void;
    /**
     * Refresh about window
     */
    refreshAboutWindow(): Promise<void>;
    /**
     * Refresh actions window
     */
    refreshActionsWindow(): Promise<void>;
    /**
     * Refresh main window
     */
    refreshMainWindow(): Promise<void>;
    /**
     * Refresh menu
     */
    refreshMenu(): Promise<void>;
    /**
     * Refresh new project page
     */
    refreshNewProject(): Promise<void>;
    /**
     * Refresh raw window
     */
    refreshRawWindow(): Promise<void>;
    /**
     * Get translation for key
     * @param translationKey Translation key
     * @returns Translation
     */
    translate(translationKey: keyof DBMEditorTranslations): string;
    /**
     * Translate inner HTML
     * @param elementID Element id
     * @param translation Translation key
     */
    translateInnerHTML(elementID: DBMEditorTranslationElementID, translation: string): void;
    /**
     * Translate placeholder
     * @param elementID Element id
     * @param translation Translation key
     */
    translatePlaceholder(elementID: DBMEditorPlaceholderTranslationElementID, translation: string): void;
}

/**
 * Shared window
 */
export interface DBMEditorSharedWindow extends Window {
    /** Global object */
    readonly glob: DBMEditorSharedGlobalObject;
    /** Translation manager */
    readonly TranslationManager: DBMEditorTranslationManager;

    /**
     * Encrypt raw string
     * @param decrypted Decrypted string
     * @returns Encrypted string
     */
    globalRawEncrypt(decrypted: string): string;
    /**
     * Decrypt raw string
     * @param encrypted Encrypted string
     * @returns Decrypted string
     */
    globalRawDecrypt(encrypted: string): string;
    /**
     * Get permission configuration
     * @returns Permission config
     */
    globalGetPermissionsConfig(): DBMPermissionsConfig;
    /**
     * Display alert message
     * @param message Message
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/alert}
     */
    globalAlert(message: string): void;
    /**
     * Display confirmation message
     * @param message Message
     * @returns Whether the OK (`true`) or Cancel (`false`) was selected
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm}
     */
    globalConfirm(message: string): boolean;
    /**
     * Get clipboard content
     * @returns Content (empty string if clipboard is empty)
     */
    globalGetClipboard(): string;
    /**
     * Set clipboard content
     * @param content Content
     */
    globalSetClipboard(content: string): void;
    /**
     * Open a link in the default browser
     * @param url Link to open
     */
    globalOpenLink(url: string): void;
    /**
     * Open window
     * @param path Relative path
     * @param options Window options
     * @param context Window context
     */
    globalOpenWindow(path: string, options: DBMDialogOptions, context: unknown): void;
    /**
     * Open dialog
     * @param path Relative or path
     * @param options Dialog options
     * @param context Dialog context
     */
    globalOpenDialog(path: string, options: DBMDialogOptions, context: unknown): void;
    /**
     * Open context menu
     * @param menu Context menu element
     * @param clientX X-axis screen position
     * @param clientY Y-axis screen position
     */
    globalOpenMenu(menu: HTMLElement, clientX: number, clientY: number): void;
    /**
     * Display quit dialog
     */
    globalQuit(): void;
    /**
     * Get Electron remote
     * @returns Remote
     */
    globalGetRemote(): typeof import("@electron/remote");

    [x: string]: any;
}

/**
 * Shared global object
 */
export interface DBMEditorSharedGlobalObject {
    /**
     * Initialize custom elements in action
     */
    initActionCustomElements(): void;
    /**
     * Setup variable lists
     */
    setupVarLists(): void;
    /**
     * Setup custom action HTML elements
     */
    setupCustomActionHtmlElements(): void;
    /**
     * Setup global HTML data
     */
    setupGlobaHtmlData(): void;
    /**
     * Refresh variable list
     * @param window Action editor window
     */
    refreshVariableList(window: Window): void;
    /**
     * Emit send target change
     * @param element Selection element
     * @param varNameContainerID Variable name container id
     */
    sendTargetChange(element: HTMLElement, varNameContainerID: string): void;
    /**
     * Emit send reply target change
     * @param element Selection element
     * @param varNameContainerID Variable name container id
     */
    sendReplyTargetChange(element: HTMLElement, varNameContainerID: string): void;
    /**
     * Emit member change
     * @param element Selection element
     * @param varNameContainerID Variable name container id
     */
    memberChange(element: HTMLElement, varNameContainerID: string): void;
    /**
     * Emit role change
     * @param element Selection element
     * @param varNameContainerID Variable name container id
     */
    roleChange(element: HTMLElement, varNameContainerID: string): void;
    /**
     * Emit channel change
     * @param element Selection element
     * @param varNameContainerID Variable name container id
     */
    channelChange(element: HTMLElement, varNameContainerID: string): void;
    /**
     * Emit voice channel change
     * @param element Selection element
     * @param varNameContainerID Variable name container id
     */
    voiceChannelChange(element: HTMLElement, varNameContainerID: string): void;
    /**
     * Emit any channel change
     * @param element Selection element
     * @param varNameContainerID Variable name container id
     */
    anyChannelChange(element: HTMLElement, varNameContainerID: string): void;
    /**
     * Emit list change
     * @param element Selection element
     * @param varNameContainerID Variable name container id
     */
    listChange(element: HTMLElement, varNameContainerID: string): void;
    /**
     * Emit variable change
     * @param element Selection element
     * @param varNameContainerID Variable name container id
     */
    variableChange(element: HTMLElement, varNameContainerID: string): void;
    /**
     * Emit message change
     * @param element Selection element
     * @param varNameContainerID Variable name container id
     */
    messageChange(element: HTMLElement, varNameContainerID: string): void;
    /**
     * Emit server change
     * @param element Selection element
     * @param varNameContainerID Variable name container id
     */
    serverChange(element: HTMLElement, varNameContainerID: string): void;
    /**
     * Emit basic change
     * @param element Selection element
     * @param varNameContainerID Variable name container id
     */
    onChangeBasic(element: HTMLElement, varNameContainerID: string): void;
    /**
     * Emit `true`/`false` change
     * @param element Selection element
     * @param varNameContainerID Variable name container id
     */
    onChangeTrueFalse(element: HTMLElement, varNameContainerID: string): void;
    /**
     * Emit `true` change
     * @param element Selection element
     * @param varNameContainerID Variable name container id
     */
    onChangeTrue(element: HTMLElement, varNameContainerID: string): void;
    /**
     * Emit `false` change
     * @param element Selection element
     * @param varNameContainerID Variable name container id
     */
    onChangeFalse(element: HTMLElement, varNameContainerID: string): void;
    /**
     * Common custom handler for comparison changes
     * @param element Selection element
     */
    onComparisonChanged?(element: HTMLSelectElement): void;
}

/**
 * Action Editor: Window
 */
export interface DBMActionEditorWindow extends DBMEditorSharedWindow {
    /** Global object */
    readonly glob: DBMActionEditorGlobalObject;
    /** Data formatters */
    readonly builtinFormatters: DBMActionEditorFormatters;

    /** Preset lists and functions */
    readonly PresetsInputNames: new () => DBMEditorPresetsInputNames;

    /**
     * Get helper functions
     * @returns Helpers
     */
    globalGetModHelpers(): DBMEditorModHelpers;

    [x: string]: any;
}

/**
 * Action Editor: Global object
 */
export interface DBMActionEditorGlobalObject extends DBMEditorSharedGlobalObject {
    /** Commands */
    $cmds: [null, ...DBMCommandJSON[]];
    /** Events */
    $evts: [null, ...DBMEventJSON[]];

    /** Project actions path */
    actLoc: string;
    /** Project action file names */
    actions: Record<string, string>;
    /** Project action metadata */
    metaActions: Record<string, DBMActionMetadata>;
    /** Project action sections */
    sections: Record<string, string>;
    /** Project action display names */
    transNames: Record<string, string>;

    /** Whether the action is used in an event or not */
    isEvent: boolean;

    /** All available variables (name and storage type) */
    varLists: FixIndecesArray<DBMInternalVarType, [string, string][][]>;
    /** HTML data for variable type selections */
    htmlData: DBMActionEditorHTMLData;

    simpleVersion: DBMSimpleVersion;
    version: DBMVersion;

    /**
     * Get all temp variables as a HTML data list
     * @returns HTML data list
     */
    getVariableList(): HTMLDataListElement;

    [x: string]: any;
}

/**
 * Action Editor: HTML data
 */
export interface DBMActionEditorHTMLData {
    /** Any channels */
    anyChannels: FixIndecesArray<DBMInternalDataType, string[]>;
    /** Channels */
    channels: FixIndecesArray<DBMInternalDataType, string[]>;
    /** Conditions */
    conditions: FixIndecesArray<0, string[]>; // Only one item that contains both branches (true/false) and all possible behaviours
    /** Lists */
    lists: FixIndecesArray<DBMInternalDataType, string[]>;
    /** Members */
    members: FixIndecesArray<DBMInternalDataType, string[]>;
    /** Messages */
    messages: FixIndecesArray<DBMInternalDataType, string[]>;
    /** Permissions */
    permissions: FixIndecesArray<DBMInternalPermissionType, string[]>;
    /** Roles */
    roles: FixIndecesArray<DBMInternalDataType, string[]>;
    /** Send reply targets */
    sendReplyTargets: FixIndecesArray<DBMInternalDataType, string[]>;
    /** Send targets */
    sendTargets: FixIndecesArray<DBMInternalDataType, string[]>;
    /** Servers */
    servers: FixIndecesArray<DBMInternalDataType, string[]>;
    /** Thread channels */
    threadChannels: FixIndecesArray<DBMInternalDataType, string[]>;
    /** Variables */
    variables: FixIndecesArray<DBMInternalDataType, string[]>;
    /** Voice channels */
    voiceChannels: FixIndecesArray<DBMInternalDataType, string[]>;
}

/**
 * Action Editor: Data formatters
 */
export interface DBMActionEditorFormatters {
    compatibility_2_0_0_iftruefalse_to_branch(data: DBMActionJSON): DBMActionJSON;
    compatibility_2_0_3_loopevent_to_actions(data: DBMActionJSON): DBMActionJSON;
}

/**
 * Extension Editor: Window
 */
export interface DBMExtensionEditorWindow extends DBMEditorSharedWindow {
    /** Global object */
    readonly glob: DBMExtensionEditorGlobalObject;

    /** Preset lists and functions */
    readonly PresetsInputNames: new () => DBMEditorPresetsInputNames;

    /**
     * Get helper functions
     * @returns Helpers
     */
    globalGetModHelpers(): DBMEditorModHelpers;

    [x: string]: any;
}

/**
 * Extension Editor: Global object
 */
export interface DBMExtensionEditorGlobalObject extends DBMEditorSharedGlobalObject {
    [x: string]: any;
}
