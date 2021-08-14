import { Message, MessageEmbedOptions } from 'discord.js';
import { ICommand } from '../interfaces/command.interface';

// const giveawaySteps: any[] = [
//   {
//     subtitle: 'Channel Setup',
//     description: 'Which channel will the giveaway be hosted in?',
//   },
//   {
//     subtitle: 'Channel Setup',
//     description: 'Which channel will the giveaway be hosted in?',
//   },
//   {
//     subtitle: 'Channel Setup',
//     description: 'Which channel will the giveaway be hosted in?',
//   },
// ];

let giveawaySetup: MessageEmbedOptions = {
  color: '#db7100',
  title: 'Giveaway Setup',
  description: '(1/3) Channel Setup',
  fields: [
    {
      name: 'Which channel will the giveaway be hosted in?',
      value: '\u200b',
      inline: false,
    },
  ],
  timestamp: new Date(),
};

export const giveaway: ICommand = {
  name: 'giveaway',
  description: 'Hold a giveaway',
  execute: async (message: Message) => {
    await message.channel.send({ embeds: [giveawaySetup] });

    const filter = (m: any) =>
      m.author.id === message.author.id && m.channel.id === message.channel.id;

    const collector = message.channel.createMessageCollector({
      filter,
      time: 15000,
    });

    collector.on('collect', (m: Message) => {
      console.log(m.content);

      if (m.content.toLowerCase() === 'cancel') {
        collector.stop();
      }
    });
  },
};

export default giveaway;
