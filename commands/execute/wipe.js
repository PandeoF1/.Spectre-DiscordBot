const Config = require('../../config/index.js');
const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder, CommandInteraction } = require('discord.js');

/**
 * @param {import('discord.js').CommandInteraction} interaction
 * @param {import('discord.js').Client} client
 */

async function wipe(interaction) {
	if (!Config.discord.owners.includes(interaction.user.id)) {
		await interaction.reply({ content: 'You are not authorized to use this command.', ephemeral: true });
		return;
	}

	// Get all options
	const serverName = interaction.options.getString('servername');
	const serverIP = interaction.options.getString('serverip');
	const date = interaction.options.getString('date');
	const sondage = interaction.options.getBoolean('sondage');
	const mention = interaction.options.getRole('mention');

	// Create an embed
	const responseEmbed = new EmbedBuilder()
		.setTitle('Wipe')
		.setDescription(`**Server Name:** ${serverName}\n**Server IP:** ${serverIP}\n**Date:** ${date}`)
		.setColor(0x0099FF);

	// Clear all messages from the channel '1022260147126550598'
	await (await interaction.guild.channels.cache.get('1022260147126550598')).messages.fetch({ limit: 100 }).then(messages => {
		for (const message of messages.values()) {
			message.delete();
		}
	});

	await interaction.guild.channels.cache.get('1022260147126550598').send({ embeds: [responseEmbed] });

	if (sondage === true) {
		let role;
		if (mention)
			role = mention.toString();
		else
			role = '';
		const message = await (await interaction.guild.channels.cache.get('958788808537694258')).send({ content: `${role} Réagissez si vous serez présent au start ${date} sur ${serverName} avec ✅ ou plus tard avec 💤` });
		message.react('✅');
		message.react('💤');
		message.react('❌');
	}
	if (mention)
		await interaction.guild.channels.cache.get('1022260147126550598').send({ content: `${mention.toString()}` })

	await interaction.reply({ content: 'Done.', ephemeral: true });

}

module.exports = { wipe }