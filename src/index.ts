import { SuperClient as Client } from './client';

(async () => {
  const client = new Client();

  await client.login(process.env['BOT_TOKEN']);
})();
