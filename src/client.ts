import { Client, Collection, Intents } from 'discord.js';
import { ICommand } from './interfaces/command.interface';
import * as fs from 'fs';
import { forEach } from 'lodash';
import path from 'path/posix';
import { IEvent } from './interfaces/event.interface';
import { PrismaClient } from '@prisma/client';

class SuperClient extends Client {
  public commands: Collection<unknown, ICommand> = new Collection();
  public prisma: PrismaClient = new PrismaClient({});

  constructor() {
    super({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });

    // Commands
    const commandPath = path.join(__dirname, 'commands');

    const commandFiles = fs
      .readdirSync(commandPath)
      .filter(f => f.endsWith('.js'));

    forEach(commandFiles, async f => {
      const filePath = `${commandPath}/${f}`;
      console.log('FILE PATH >>> ', filePath);

      const { default: command }: { default: ICommand } = await import(
        filePath
      );
      this.commands.set(command.name, command);
    });

    // Events
    const eventPath = path.join(__dirname, 'events');

    const eventFiles = fs.readdirSync(eventPath).filter(f => f.endsWith('.js'));

    forEach(eventFiles, async f => {
      const filePath = `${eventPath}/${f}`;
      console.log('FILE PATH >>> ', filePath);

      const { default: event }: { default: IEvent } = await import(filePath);
      if (event.once) {
        this.once(event.name, (...args) => event.execute(this, ...args));
      } else {
        this.on(event.name, (...args) => event.execute(this, ...args));
      }
    });
  }
}

export { SuperClient };
