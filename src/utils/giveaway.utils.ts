import { IGiveawaySteps } from '../interfaces/giveaway.interface';

export const giveawaySteps: IGiveawaySteps[] = [
  {
    key: 'prize',
    description: 'What would you be giving away?',
  },
  {
    key: 'numberOfWinners',
    description: 'How many winners would the giveaway have?',
    fields: [
      {
        name: '\u200b',
        value: 'Please enter a number!',
        inline: false,
      },
    ],
    validator: (val: string) => {
      // Must be integer
      try {
        parseInt(val);
        return true;
      } catch (e) {
        // TODO: Output error embed here (ephemeral maybe)
        console.log('Not Integer');
        return false;
      }
    }, // Check input whether it is valid or not
  },
  {
    key: 'channel',
    description: 'Which channel will the giveaway be hosted in?',
  },
  {
    key: 'period',
    description: 'How long will the giveaway last?',
  },
  {
    key: 'requirements',
    description: 'Would you like to place additional requirements?',
  },
];

export const requirementSteps: any[] = [{}];
