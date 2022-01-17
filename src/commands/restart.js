const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('restart')
		.setDescription('Restarts the bot'),
	async execute(interaction) {
		interaction.reply('Shutting down...');

		return interaction.client.destroy();
	},
};