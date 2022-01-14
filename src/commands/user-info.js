const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user-info')
		.setDescription('Display info about yourself.')
		.addUserOption(option => option.setName('target').setDescription('The user\'s info to show')),
	async execute(interaction) {
		const user = interaction.options.getUser('target');
		return interaction.reply(`Your username: ${user.username}\nYour ID: ${user.id}`);
	},
};