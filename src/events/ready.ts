import { IEvent } from '../interfaces/event.interface';

export const ready: IEvent = {
  name: 'ready',
  once: true,
  execute: async client => {
    console.log(`Connected to Discord\nLogged in as ${client.user?.tag}`);
  },
};

export default ready;
