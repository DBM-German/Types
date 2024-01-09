import type {
    DBMUserVariableString,
    DBMMemberVariableString,
    DBMServerVariableString,
    DBMMessageVariableString,
    DBMTextChannelVariableString,
    DBMVoiceChannelVariableString,
    DBMRoleVariableString,
    DBMEmojiVariableString,
    DBMConvertableItem
} from "./common.d.ts";
import type {
    RegularOrDefault
} from "./internal.d.ts";


export type * as Discord from "discord.js-13";
export type * as DiscordAPI from "discord-api-types/v9";
export type * as DiscordVoice from "@discordjs/voice";
export type { default as Jimp } from "jimp-0.22";
export type { default as Ytdl } from "ytdl-core";
export type * as YouTubeDL from "youtube-dl-exec";


// Custom structures
declare module "discord.js-13" {
    interface DBMDataAccess {
        data<D>(name: string, defaultValue?: D): RegularOrDefault<any, D>;
        setData(name: string, value: unknown): void;
        addData(name: string, value: unknown): void;
        clearData(name: string): void;
    }

    export interface User extends DBMDataAccess, DBMConvertableItem {
        convertToString(): DBMUserVariableString;
    }

    export interface GuildMember extends DBMDataAccess, DBMConvertableItem {
        unban(server: Guild, reason: string): ReturnType<this["guild"]["bans"]["remove"]>;
        convertToString(): DBMMemberVariableString;
    }

    export interface Guild extends DBMDataAccess, DBMConvertableItem {
        getDefaultChannel(): Channel | undefined;
        getDefaultVoiceChannel(): VoiceChannel | undefined;
        convertToString(): DBMServerVariableString;
    }

    export interface Message extends DBMDataAccess, DBMConvertableItem {
        convertToString(): DBMMessageVariableString;
    }

    export interface TextChannel extends DBMConvertableItem {
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
