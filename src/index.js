const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const Keyv = require('keyv');
const { KeyvFile } = require('keyv-file');
const { MongoClient } = require('mongodb');

const client = new Client({ intents: [
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_INVITES,
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
],
});

//Storage handling
client.keyv = new Keyv({
	store: new KeyvFile({
		filename: './resources/quote-storage.json',
		encode: JSON.stringify,
		decode: JSON.parse,
	}),
});

async function main() {
	const uri = 'mongodb://localhost:27017';
	const dbClient = new MongoClient(uri);
	try {
		await dbClient.connect();
		await listDatabases(dbClient);
	}
	catch (e) {
		console.error(e);
	}
	finally {
		await dbClient.close();
	}
}

main().catch(console.error);

async function listDatabases(dbClient) {
	const databasesList = await dbClient.db().admin().listDatabases();

	console.log('Databases:');
	databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

// Command Handling
client.commands = new Collection();
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

// Event handling
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token);