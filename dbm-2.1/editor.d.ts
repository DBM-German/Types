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
    DBMActionMetaData,
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
 * Preset type
 */
export type DBMEditorPresetType = string | { defaultText: string, options: { button: string, select: string } };

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

    getVariableText(type: DBMVarType | string, varName: string): string;
    getSendTargetText(type: DBMSendReplyTargetType | string, varName: string): string;
    getSendReplyTargetText(type: DBMSendReplyTargetType | string, varName: string): string;
    getMemberText(type: DBMMemberType | string, varName: string): string;
    getMessageText(type: DBMMessageType | string, varName: string): string;
    getServerText(type: DBMServerType | string, varName: string): string;
    getRoleText(type: DBMRoleType | string, varName: string): string;
    getChannelText(type: DBMChannelType | string, varName: string): string;
    getVoiceChannelText(type: DBMVoiceChannelType | string, varName: string): string;
    getListText(type: DBMListType | string, varName: string): string;
    getConditionsText(data: DBMActionJSON): string;

    [x: string]: any;
}

/**
 * Helper functions
 */
export interface DBMEditorModHelpers {
    generateUUID(): string;

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

    getPresetInputNames(): DBMEditorPresetsInputNames;
    loadTranslations(): void;
    refreshAboutWindow(): Promise<void>;
    refreshActionsWindow(): Promise<void>;
    refreshMainWindow(): Promise<void>;
    refreshMenu(): Promise<void>;
    refreshNewProject(): Promise<void>;
    refreshRawWindow(): Promise<void>;
    translate(translationKey: keyof DBMEditorTranslations): string;
    translateInnerHTML(elementID: DBMEditorTranslationElementID, translation: string): void;
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
    initActionCustomElements(): void;
    setupVarLists(): void;
    setupCustomActionHtmlElements(): void;
    setupGlobaHtmlData(): void;
    refreshVariableList(window: Window): void;
    sendTargetChange(element: HTMLElement, varNameContainerID: string): void;
    sendReplyTargetChange(element: HTMLElement, varNameContainerID: string): void;
    memberChange(element: HTMLElement, varNameContainerID: string): void;
    roleChange(element: HTMLElement, varNameContainerID: string): void;
    channelChange(element: HTMLElement, varNameContainerID: string): void;
    voiceChannelChange(element: HTMLElement, varNameContainerID: string): void;
    anyChannelChange(element: HTMLElement, varNameContainerID: string): void;
    listChange(element: HTMLElement, varNameContainerID: string): void;
    variableChange(element: HTMLElement, varNameContainerID: string): void;
    messageChange(element: HTMLElement, varNameContainerID: string): void;
    serverChange(element: HTMLElement, varNameContainerID: string): void;
    onChangeBasic(element: HTMLElement, varNameContainerID: string): void;
    onChangeTrueFalse(element: HTMLElement, varNameContainerID: string): void;
    onChangeTrue(element: HTMLElement, varNameContainerID: string): void;
    onChangeFalse(element: HTMLElement, varNameContainerID: string): void;
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

    /** Helper functions */
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
    metaActions: Record<string, DBMActionMetaData>;
    /** Project action sections */
    sections: Record<string, string>;
    /** Project action display names */
    transNames: Record<string, string>;

    /** Whether the action is used in an event or not */
    isEvent: boolean;

    /** All available variables (name and storage type) */
    varLists: FixIndecesArray<[ string, string ][], DBMInternalVarType>;
    htmlData: DBMActionEditorHTMLData;

    simpleVersion: DBMSimpleVersion;
    version: DBMVersion;

    getVariableList(): HTMLDataListElement;

    [x: string]: any;
}

/**
 * Action Editor: HTML data
 */
export interface DBMActionEditorHTMLData {
    anyChannels: FixIndecesArray<string, DBMInternalDataType>;
    channels: FixIndecesArray<string, DBMInternalDataType>;
    conditions: FixIndecesArray<string, 0>;
    lists: FixIndecesArray<string, DBMInternalDataType>;
    members: FixIndecesArray<string, DBMInternalDataType>;
    messages: FixIndecesArray<string, DBMInternalDataType>;
    permissions: FixIndecesArray<string, DBMInternalPermissionType>;
    roles: FixIndecesArray<string, DBMInternalDataType>;
    sendReplyTargets: FixIndecesArray<string, DBMInternalDataType>;
    sendTargets: FixIndecesArray<string, DBMInternalDataType>;
    servers: FixIndecesArray<string, DBMInternalDataType>;
    threadChannels: FixIndecesArray<string, DBMInternalDataType>;
    variables: FixIndecesArray<string, DBMInternalDataType>;
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

    /** Helper functions */
    globalGetModHelpers(): DBMEditorModHelpers;

    [x: string]: any;
}

/**
 * Extension Editor: Global object
 */
export interface DBMExtensionEditorGlobalObject extends DBMEditorSharedGlobalObject {
    [x: string]: any;
}
