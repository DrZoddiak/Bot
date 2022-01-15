const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mock')
		.setDescription('Mocks the message!')
		.addStringOption(option =>
			option.setName('message')
				.setDescription('The message you want to mock')
				.setRequired(true)),
	async execute(interaction) {
		const msg = interaction.options.getString('message');

		const mockMsg = msg.split('').map((v) =>
			Math.round(Math.random()) ? v.toUpperCase() : v.toLowerCase(),
		).join('');

		return interaction.reply(mockMsg);
	},
};