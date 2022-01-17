module.exports = {
	name: 'messageCreate',
	execute(message) {
		if (message.author.bot) {
			return;
		}

		const content = message.content;

		console.log(content);

		if (!content.startsWith('!')) {
			return;
		}

		console.log('Made it here');

		const keyword = content.substr(1);

		console.log(`keyword: ${keyword}`);

		message.client.keyv.get(keyword).then(
			quote => {
				return message.reply(quote);
			},
		).catch(
			reason => {
				return message.reply(`${keyword} does not exist`);
			},
		);
	},
};