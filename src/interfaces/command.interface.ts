// TODO: One command can have multiple names
export interface ICommand {
  name: string;
  description: string;
  execute: (...args: any[]) => Promise<void>;
}
