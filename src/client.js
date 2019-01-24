import { Client } from 'discord.js'
import { token } from './secrets.js'

const client = new Client();

client.login(token);

export { client }