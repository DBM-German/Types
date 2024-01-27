import type {
    DBMVarType,
    DBMActionJSON,
    DBMActionMetaData,
    DBMExtensionJSON,
    DBMCommandJSON,
    DBMEventJSON
} from "./common.d.ts";
import type {
    DBM,
    DBMBot,
    DBMActions,
    DBMActionsCache
} from "./bot.d.ts";
import type {
    DBMActionEditorWindow,
    DBMActionEditorHTMLData,
    DBMActionEditorFormatters,
    DBMEditorModHelpers,
    DBMEditorPresetsInputNames,
    DBMExtensionEditorGlobalObject
} from "./editor.d.ts";


/**
 * Base structure of all DBM module files
 */
export interface DBMModule {
    /**
     * Module Name
     *
     * This is the name of the module displayed in the editor and used for identification.
     */
    name: string;

    /**
     * Module Display Name
     *
     * Optional display name displayed instead of the regular name in the editor.
     */
    displayName?: string;
}

/**
 * Structure of DBM action files
 */
export interface DBMAction extends DBMModule {
    /**
     * Action Section
     *
     * This is the section the action will fall into.
     */
    readonly section: string;

    /**
     * Command Only
     *
     * If this is set to true, then this will only be available for commands.
     */
    readonly commandOnly?: boolean;

    /**
     * Requires Audio Libraries
     *
     * If set to true, this action requires audio libraries to run.
     */
    readonly requiresAudioLibraries?: boolean;

    /**
     * Action Meta Data
     *
     * Helps check for updates and provides info if a custom mod.
     * If this is a third-party mod, please set "author" and "authorUrl".
     *
     * It's highly recommended "preciseCheck" is set to false for third-party mods.
     * This will make it so the patch version (0.0.X) is not checked.
     */
    readonly meta: DBMActionMetaData;

    /**
     * Action Fields
     *
     * These are the fields for the action. These fields are customized
     * by creating elements with corresponding IDs in the HTML. These
     * are also the names of the fields stored in the action's JSON data.
     */
    readonly fields: string[];

    /**
     * Action Subtitle
     *
     * This function generates the subtitle displayed next to the name.
     *
     * @param data JSON data
     * @param presets DBM presets
     * @returns Subtitle
     */
    subtitle(data: DBMActionJSON, presets: DBMEditorPresetsInputNames): string;

    /**
     * Action Storage Function
     *
     * Stores the relevant variable info for the editor.
     *
     * @param data JSON data
     * @param varType DBM variable type
     * @returns Variable name and data type
     */
    variableStorage?(data: DBMActionJSON, varType: DBMVarType): [ string, string ];

    /**
     * Action HTML
     *
     * This function returns a string containing the HTML used for editing actions.
     *
     * The "isEvent" parameter will be true if this action is being used
     * for an event. Due to their nature, events lack certain information,
     * so edit the HTML to reflect this.
     *
     * @param isEvent Whether action is in an event or not
     * @param data HTML data
     * @returns HTML
     */
    html(isEvent: boolean, data: DBMActionEditorHTMLData): string;

    /**
     * Action Editor Pre-Init Code
     *
     * Before the fields from existing data in this action are applied
     * to the user interface, this function is called if it exists.
     * The existing data is provided, and a modified version can be
     * returned. The returned version will be used if provided.
     * This is to help provide compatibility with older versions of the action.
     *
     * The "formatters" argument contains built-in functions for formatting
     * the data required for official DBM action compatibility.
     *
     * @param data JSON data
     * @param formatters Built-in data formatters
     * @returns Modified JSON data
     */
    preInit?(data: DBMActionJSON, formatters: DBMActionEditorFormatters): DBMActionJSON;

    /**
     * Action Editor Init Code
     *
     * When the HTML is first applied to the action editor, this code
     * is also run. This helps add modifications or setup reactionary
     * functions for the DOM elements.
     *
     * @param this DBM action editor window
     */
    init(this: DBMActionEditorWindow): void;

    /**
     * Action Editor On Save
     *
     * When the data for the action is saved, this function is called.
     * It provides the ability to modify the final data associated with
     * the action by retrieving it as an argument and returning a modified
     * version through the return value. This can be used to verify the
     * data and fill required entries the user did not.
     *
     * Its inclusion within action mods is optional.
     *
     * @param data JSON data
     * @param helpers DBM helper functions
     * @returns Modified JSON data
     */
    onSave?(data: DBMActionJSON, helpers: DBMEditorModHelpers): DBMActionJSON;

    /**
     * Action Editor On Paste
     *
     * When the data for the action is pasted, this function is called.
     * It provides the ability to modify the final data associated with
     * the action by retrieving it as an argument and returning a modified
     * version through the return value.
     *
     * Its inclusion within action mods is optional.
     *
     * @param data JSON data
     * @param helpers DBM helper functions
     * @returns Modified JSON data
     */
    onPaste?(data: DBMActionJSON, helpers: DBMEditorModHelpers): DBMActionJSON;

    /**
     * Action Bot Function
     *
     * This is the function for the action within the Bot's Action class.
     * Keep in mind event calls won't have access to the "msg" parameter,
     * so be sure to provide checks for variable existence.
     *
     * @param this DBM actions context
     * @param cache DBM actions cache
     */
    action(this: DBMActions, cache: DBMActionsCache): Promise<void> | void;

    /**
     * Action Bot Mod Init
     *
     * An optional function for action mods. Upon the bot's initialization,
     * each command/event's actions are iterated through. This is to
     * initialize responses to interactions created within actions
     * (e.g. buttons and select menus for Send Message).
     *
     * If an action provides inputs for more actions within, be sure
     * to call the `this.prepareActions` function to ensure all actions are
     * recursively iterated through.
     *
     * @param this DBM bot context
     * @param data Command or event JSON data
     * @param customData Custom data for the action sequence that is currently prepared
     * @param index Action index (zero-based)
     */
    modInit?(this: DBMBot, data: DBMCommandJSON | DBMEventJSON, customData: Record<string, any>, index: number): void;

    /**
     * Action Bot Mod
     *
     * Upon initialization of the bot, this code is run. Using the bot's
     * DBM namespace, one can add/modify existing functions if necessary.
     * In order to reduce conflicts between mods, be sure to alias
     * functions you wish to overwrite.
     *
     * @param DBM DBM interface
     */
    mod?(DBM: DBM): void;

    [x: string]: any;
}

/**
 * Structure of DBM event files
 */
export interface DBMEvent extends DBMModule {
    /**
     * Is Event
     *
     * Must be true to appear in event trigger dropdown.
     */
    readonly isEvent: true;

    /**
     * Event Variable Fields
     *
     * These are the names of available variable fields.
     */
    readonly fields: string[];

    /**
     * Event Bot Mod
     *
     * Upon initialization of the bot, this code is run. Using the bot's
     * DBM namespace, one can add/modify existing functions if necessary.
     * In order to reduce conflicts between mods, be sure to alias
     * functions you wish to overwrite.
     *
     * @param DBM DBM interface
     */
    mod?(DBM: DBM): void;

    [x: string]: any;
}

/**
 * Structure of DBM extension files
 */
export interface DBMExtension extends DBMModule {
    /**
     * Is Command Extension
     *
     * Must be true to appear in the command context menu.
     * This means there will be separate data in each command.
     */
    readonly isCommandExtension: boolean;

    /**
     * Is Event Extension
     *
     * Must be true to appear in the event context menu.
     * This means there will be separate data in each event.
     */
    readonly isEventExtension: boolean;

    /**
     * Is Editor Extension
     *
     * Must be true to appear in the main editor context menu.
     * This means there will only be one copy of this data per project.
     */
    readonly isEditorExtension: boolean;

    /**
     * Save Button Text
     *
     * Customizes the text of the "Save Extension" at the bottom
     * of the extension window.
     */
    readonly saveButtonText: string;

    /**
     * Extension Fields
     *
     * These are the fields for the extension. These fields are customized
     * by creating elements with corresponding Ids in the HTML. These
     * are also the names of the fields stored in the command's/event's JSON data.
     */
    readonly fields: string[];

    /**
     * Default Fields
     *
     * The default values of the fields.
     */
    readonly defaultFields: DBMExtensionJSON;

    /**
     * Extension Dialog Size
     *
     * Returns the size of the extension dialog.
     *
     * @returns Width and height
     */
    size(): { width: number, height: number };

    /**
     * Extension HTML
     *
     * This function returns a string containing the HTML used for
     * the context menu dialog.
     *
     * @param data JSON data
     */
    html(data: DBMExtensionJSON): string;

    /**
     * Extension Dialog Init Code
     *
     * When the HTML is first applied to the extension dialog, this code
     * is also run. This helps add modifications or setup reactionary
     * functions for the DOM elements.
     *
     * @param document DBM extension editor document
     * @param globalObject DBM extension editor global object (mostly used for html event handling)
     */
    init(document: Document, globalObject: DBMExtensionEditorGlobalObject): void;

    /**
     * Extension Dialog Close Code
     *
     * When the dialog is closed, this is called. Use it to save the data.
     *
     * @param document DBM extension editor document
     * @param data JSON data
     * @param globalObject DBM extension editor global object (mostly used for html event handling)
     */
    close(document: Document, data: DBMExtensionJSON, globalObject: DBMExtensionEditorGlobalObject): void;

    /**
     * Editor Extension Bot Mod
     *
     * Upon initialization of the bot, this code is run. Using the bot's
     * DBM namespace, one can add/modify existing functions if necessary.
     * In order to reduce conflicts between mods, be sure to alias
     * functions you wish to overwrite.
     * This is absolutely necessary for editor extensions since it
     * allows us to setup modifications for the necessary functions
     * we want to change.
     * The client object can be retrieved from: `const bot = DBM.Bot.bot;`
     * Classes can be retrieved also using it: `const { Actions, Event } = DBM;`
     *
     * @param DBM DBM interface
     */
    mod?(DBM: DBM): void;

    [x: string]: any;
}
