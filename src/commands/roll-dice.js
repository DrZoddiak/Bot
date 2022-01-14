const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Roll your dice!')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('The dice you want to roll')
				.setRequired(true)),
	async execute(interaction) {
		const roll = interaction.options.getString('input');

		const split = roll.split('d');

		const diceRolled = split[0] / 1;
		const diceSides = split[1] / 1;

		if (diceRolled === 0 || diceSides === 0) { return interaction.reply('You rolled 0!');}
		const rollResults = [];
		for (let i = 0; i < diceRolled; i++) {
			rollResults.push(Math.floor(Math.random() * diceSides) + 1);
		}
		const diceSum = rollResults.reduce((a, b) => a + b);

		return interaction.reply(`You Rolled ${roll}: ${diceSum}`);
	},
};