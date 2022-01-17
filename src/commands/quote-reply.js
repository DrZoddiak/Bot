const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quote')
		.setDescription('saves this message as a quote')
		.addStringOption(option => option
			.setName('message')
			.setDescription('The message you\'re saving')
			.setRequired(true)),
	async execute(interaction) {
		const message = interaction.options.getString('message');
		const keyv = interaction.client.keyv;

		// Process quote
		const keyword = message.substr(0, message.indexOf(' '));
		const quote = message.replace(keyword, '');

		if (keyword.isEmpty || quote.isEmpty) {
			return interaction.reply({
				content: 'Invalid usage of this command!', ephemeral: true,
			});
		}

		await keyv.set(keyword, quote).then(
			success => {
				return interaction.reply(`${keyword} has been added!`);
			}, error => {
				return interaction.reply(`An error has occured. Reason: ${error}`);
			},
		);
	},
};