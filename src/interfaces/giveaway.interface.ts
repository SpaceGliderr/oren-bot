import { MessageEmbedOptions } from 'discord.js';

export interface IGiveawayRequirements {
  messageCount: number;
  flag: number;
  roles: string[];
}

export interface IGiveawaySteps extends MessageEmbedOptions {
  key: string;
  validator?: (...args: any[]) => any;
}
