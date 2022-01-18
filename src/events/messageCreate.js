module.exports = {
	name: 'messageCreate',
	async execute(message) {
		if (message.author.bot) return;

		const content = message.content;

		if (!content.startsWith('!')) return;
		//Check for quote
		const keyword = content.substr(1);

		try {
			message.client.keyv.get(keyword).then(
				quote => {
					return message.reply(quote);
				},
			).catch(
				reason => {
					return message.reply(reason);
				},
			);
		}
		catch (e) {
			return message.reply(`Error: ${e.message}`);
		}
	},
};