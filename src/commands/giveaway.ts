import { Message, MessageEmbedOptions } from 'discord.js';
import { ICommand } from '../interfaces/command.interface';
import { giveawaySteps } from '../utils/giveaway.utils';

// To generate giveaway setup embed based on step number
const getSetupEmbed = (idx: number): MessageEmbedOptions => {
  return {
    ...giveawaySteps[idx],
    color: '#db7100',
    title: 'Giveaway Setup',
    timestamp: new Date(),
    footer: {
      text: `${idx + 1}/${giveawaySteps.length}`,
    },
  };
};

export const giveaway: ICommand = {
  name: 'giveaway',
  description: 'Hold a giveaway',
  execute: async (message: Message) => {
    // Send first embed
    let step: number = 0;
    await message.channel.send({ embeds: [getSetupEmbed(step)] });
    console.log(getSetupEmbed(step));

    // Giveaway create

    // Setup collector
    const filter = (m: any) =>
      m.author.id === message.author.id && m.channel.id === message.channel.id;

    const collector = message.channel.createMessageCollector({
      filter,
      time: 15000,
    });

    // On collect messages
    collector.on('collect', async (m: Message) => {
      console.log(m.content);

      // On cancel collector (ending giveaway setup)
      if (m.content.toLowerCase() === 'cancel') {
        collector.stop();
        await message.channel.send({
          embeds: [
            {
              color: '#db7100',
              description:
                'Giveaway setup cancelled, thank you for using the function :smile:',
              timestamp: new Date(),
            },
          ],
        });
        return;
      }

      // To validate user input
      // Input into create object

      step++;

      // When the steps are completed
      if (step === giveawaySteps.length) {
        collector.stop();
        await message.channel.send({
          embeds: [
            {
              color: '#db7100',
              description:
                "Giveaway setup successful, here's a recap of the giveaway details:",
              fields: [
                {
                  name: 'Giveaway prize',
                  value: 'Some prize here',
                },
                {
                  name: 'Giveaway is held at',
                  value: 'Some channel here',
                },
                {
                  name: 'Giveaway ends on',
                  value: 'Some date here',
                },
                {
                  name: 'Giveaway requirements are',
                  value: 'Some requirements here',
                },
              ],
              timestamp: new Date(),
            },
          ],
        });
        return;
      }

      // Send embed to channel
      await message.channel.send({ embeds: [getSetupEmbed(step)] });
    });
  },
};

export default giveaway;
