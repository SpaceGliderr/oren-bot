import { Message } from 'discord.js';
import { IEvent } from '../interfaces/event.interface';

export const onMessage: IEvent = {
  name: 'messageCreate',
  execute: async (client, message: Message) => {
    if (message.author.bot) return;

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

export default onMessage;
