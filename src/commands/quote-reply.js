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

		//Undefined or Null
		if (typeof quote === 'undefined' && !quote) {
			return interaction.reply({
				content: 'Invalid usage of this command!', ephemeral: true,
			});
		}
		try {
			await keyv.set(keyword, quote);
		}
		catch
		(e) {
			return interaction.reply('silly goose');
		}

		await keyv.set(keyword, quote, message).then(
			success => {
				return interaction.reply(`${keyword} has been added!`);
			}, reason => {
				return message.reply(`${keyword} does not exist`);
			},
		).catch(
			reason => {
				return message.reply(`${reason} : reason`);
			},
		);
	},
};