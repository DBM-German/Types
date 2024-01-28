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
    DBMInternalPermissionType,
    DBMInternalDataType,
    DBMActionJSON,
    DBMActionMetadata,
    DBMCommandJSON,
    DBMEventJSON
} from "./common.d.ts";
import type {
    FixIndecesArray
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
 * Preset lists and functions
 */
export interface DBMEditorPresetsInputNames {
    variables: FixIndecesArray<string, DBMVarType>;
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

export interface DBMEditorSharedWindow extends Window {
    /** Global object */
    readonly glob: DBMEditorSharedGlobalObject;
    /** Translation manager */
    readonly TranslationManager: DBMEditorTranslationManager;

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
    varLists: FixIndecesArray<[string, string][], DBMInternalVarType>;
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
    anyChannels: FixIndecesArray<string, DBMInternalDataType>;
    /** Channels */
    channels: FixIndecesArray<string, DBMInternalDataType>;
    /** Conditions */
    conditions: FixIndecesArray<string, 0>; // Only one item that contains both branches (true/false) and all possible behaviours
    /** Lists */
    lists: FixIndecesArray<string, DBMInternalDataType>;
    /** Members */
    members: FixIndecesArray<string, DBMInternalDataType>;
    /** Messages */
    messages: FixIndecesArray<string, DBMInternalDataType>;
    /** Permissions */
    permissions: FixIndecesArray<string, DBMInternalPermissionType>;
    /** Roles */
    roles: FixIndecesArray<string, DBMInternalDataType>;
    /** Send reply targets */
    sendReplyTargets: FixIndecesArray<string, DBMInternalDataType>;
    /** Send targets */
    sendTargets: FixIndecesArray<string, DBMInternalDataType>;
    /** Servers */
    servers: FixIndecesArray<string, DBMInternalDataType>;
    /** Thread channels */
    threadChannels: FixIndecesArray<string, DBMInternalDataType>;
    /** Variables */
    variables: FixIndecesArray<string, DBMInternalDataType>;
    /** Voice channels */
    voiceChannels: FixIndecesArray<string, DBMInternalDataType>;
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
