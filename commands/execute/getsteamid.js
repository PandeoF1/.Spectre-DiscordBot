const Config = require('../../config/index.js');
const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder, CommandInteraction } = require('discord.js');

/**
 * @param {import('discord.js').CommandInteraction} interaction
 * @param {import('discord.js').Client} client
 */

async function getSteamID(interaction) {
	// Get all messages from the channel '1015214367064723506'
	const steamID64List = [];
	await (await interaction.guild.channels.cache.get('1015214367064723506')).messages.fetch({ limit: 100 }).then(messages => {
		// For every message search for all steamID64 in the message
		for (const message of messages.values()) {
			const steamID64 = message.content.match(/(7656119[0-9]{10})/g);
			if (steamID64) {
				// If a steamID64 is found, send all steamID64 found in the message to the variable steamID64
				for (const steamID of steamID64) {
					steamID64List.push(`https://steamcommunity.com/profiles/${steamID}`);
				}
			}
		}

	});
	if (steamID64List.length > 0) {
		// Create an embed
		const responseEmbed = new EmbedBuilder()
			.setTitle('SteamID64')
			.setDescription(steamID64List.join('\n'))
			.setColor(0x0099FF);

		interaction.reply({ embeds: [responseEmbed], ephemeral: true });
	}
	else {
		interaction.reply({ content: 'No steamID64 found', ephemeral: true });
	}
};

module.exports = { getSteamID };