import { SuperClient as Client } from '../client';

export interface IEvent {
  name: string;
  once: boolean;
  execute: (client: Client, ...args: any[]) => Promise<void>;
}
