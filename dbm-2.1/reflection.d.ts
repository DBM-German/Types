import type {
    DBMUserVariableString,
    DBMMemberVariableString,
    DBMServerVariableString,
    DBMMessageVariableString,
    DBMTextChannelVariableString,
    DBMVoiceChannelVariableString,
    DBMRoleVariableString,
    DBMEmojiVariableString,
    DBMDataAccess,
    DBMConvertableItem
} from "./common.d.ts";


export type * as Discord from "discord.js-13";
export type * as DiscordAPI from "discord-api-types/v9";
export type * as DiscordVoice from "@discordjs/voice";
export type { default as Jimp } from "jimp-0.22";
export type { default as Ytdl } from "ytdl-core";
export type * as YouTubeDL from "youtube-dl-exec";
export type { default as Electron } from "electron";
export type * as ElectronRemote from "@electron/remote";


// Custom structures
declare module "discord.js-13" {
    export interface User extends DBMDataAccess, DBMConvertableItem {
        convertToString(): DBMUserVariableString;
    }

    export interface GuildMember extends DBMDataAccess, DBMConvertableItem {
        /**
         * Unban member
         * @param server Server
         * @param reason Reason
         */
        unban(server: Guild, reason: string): ReturnType<this["guild"]["bans"]["remove"]>;
        convertToString(): DBMMemberVariableString;
    }

    export interface Guild extends DBMDataAccess, DBMConvertableItem {
        /**
         * Get default channel
         * @returns Channel
         */
        getDefaultChannel(): Channel | undefined;
        /**
         * Get default voice channel
         * @returns Voice channel
         */
        getDefaultVoiceChannel(): VoiceChannel | undefined;
        convertToString(): DBMServerVariableString;
    }

    export interface Message extends DBMDataAccess, DBMConvertableItem {
        convertToString(): DBMMessageVariableString;
    }

    export interface TextChannel extends DBMConvertableItem {
        /**
         * Start thread
         * @returns Thread channel
         */
        startThread(): ReturnType<this["threads"]["create"]>;
        convertToString(): DBMTextChannelVariableString;
    }

    export interface VoiceChannel extends DBMConvertableItem {
        convertToString(): DBMVoiceChannelVariableString;
    }

    export interface Role extends DBMConvertableItem {
        convertToString(): DBMRoleVariableString;
    }

    export interface Emoji extends DBMConvertableItem {
        convertToString(): DBMEmojiVariableString;
    }
}
