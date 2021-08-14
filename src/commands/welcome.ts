import { Message, MessageEmbed } from 'discord.js';
import { ICommand } from '../interfaces/command.interface';

export const welcome: ICommand = {
  name: 'welcome',
  description: 'Welcome command',
  execute: async (message: Message) => {
    const { author, channel, content } = message;
    const text = content.substr(content.indexOf(' ') + 1);
    const embed = new MessageEmbed();
    embed.setTitle('Welcome!');
    embed.setDescription(text);
    embed.setAuthor(
      author.username + '#' + author.discriminator,
      author.displayAvatarURL(),
    );
    embed.addField('Channel', channel.toString());

    await channel.send({ embeds: [embed] });
  },
};

export default welcome;
