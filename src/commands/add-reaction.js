const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add-emote')
		.setDescription('Adds a new reaction to listen for!')
		.setDefaultPermission(false)
		.addIntegerOption(option => option
			.setName('emote')
			.setDescription('The id of the emote you want to listen for'))
		.addStringOption(option => option
			.setName('message')
			.setDescription('The message you want to send the user when they react')),
	async execute(interaction) {

		const emoteId = interaction.options.getInteger('emoteId');
		const message = interaction.options.getMessage('message');

		// Map to check if exists, this should be replaced
		const emoteMessageMap = new Map();

		if (emoteMessageMap.has(emoteId)) {
			// Logic should be run if message is to be replaced
			return interaction.reply('An emote with this Id already exists');
		}

		emoteMessageMap.set(emoteMessageMap, message);

		return interaction.reply('Pong!');
	},
};