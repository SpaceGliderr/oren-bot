import { Prisma } from '@prisma/client';
import { Message } from 'discord.js';
import { IEvent } from '../interfaces/event.interface';

export const messageCreate: IEvent = {
  name: 'messageCreate',
  once: false,
  execute: async (client, message: Message) => {
    if (message.author.bot) return;

    const { author, guild } = message;

    let userCreate: Prisma.UserCreateInput = {
      id: author.id,
      username: author.username,
      discriminator: author.discriminator,
      defaultAvatarURL: author.avatar,
    };

    const userUpdate: Prisma.UserUpdateInput = {
      username: author.username,
      discriminator: author.discriminator,
      defaultAvatarURL: author.avatar,
    };

    if (guild) {
      await client.prisma.guild.upsert({
        where: {
          id: guild.id,
        },
        update: {},
        create: {
          id: guild.id,
        },
      });

      userCreate.guildMembers = {
        create: [
          {
            guild: {
              connect: {
                id: guild?.id,
              },
            },
          },
        ],
      };
    }

    await client.prisma.user.upsert({
      where: {
        id: author.id,
      },
      update: userUpdate,
      create: userCreate,
    });

    const prefix = '.';
    if (!message.content.startsWith(prefix)) return;

    // Extract command name only
    const commandName = message.content.includes(' ')
      ? message.content
          .substr(prefix.length, message.content.indexOf(' ') - 1)
          .toLowerCase()
      : message.content.substr(prefix.length).toLowerCase();

    await client.commands.get(commandName)?.execute(message);
  },
};

export default messageCreate;
