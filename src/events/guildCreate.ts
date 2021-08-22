import { Prisma } from '@prisma/client';
import { Guild } from 'discord.js';
import { IEvent } from '../interfaces/event.interface';

export const guildCreate: IEvent = {
  name: 'guildCreate',
  once: false,
  execute: async (client, guild: Guild) => {
    const guildCreate: Prisma.GuildCreateInput = {
      id: guild.id,
    };

    await client.prisma.guild.create({
      data: guildCreate,
    });
  },
};

export default guildCreate;
