const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
  const perms = await client.checkPerms({
    flags: [Discord.Permissions.FLAGS.KICK_MEMBERS],
    perms: ["KICK_MEMBERS"]
  }, interaction)

  if (perms == false) return;

  const member = await interaction.guild.members.fetch(interaction.options.getUser('user').id);
  const reason = interaction.options.getString('reason') || 'Not given';

  if (member.permissions.has(Discord.Permissions.FLAGS.KICK_MEMBERS) || member.permissions.has(Discord.Permissions.FLAGS.KICK_MEMBERS)) return client.errNormal({
    error: "You can't kick a moderator",
    type: 'editreply'
  }, interaction);

  client.embed({
    title: `🔨・Kick`,
    desc: `You've been kicked in **${interaction.guild.name}**`,
    fields: [
      {
        name: "👤┆Kicked by",
        value: interaction.user.tag,
        inline: true
      },
      {
        name: "💬┆Reason",
        value: reason,
        inline: true
      }
    ]
  }, member).then(function () {
    member.kick(reason)
    client.succNormal({
      text: "The specified user has been successfully kicked and successfully received a notification!",
      fields: [
        {
          name: "👤┆Kicked user",
          value: member.user.tag,
          inline: true
        },
        {
          name: "💬┆Reason",
          value: reason,
          inline: true
        }
      ],
      type: 'editreply'
    }, interaction);
  }).catch(function () {
    member.kick(reason)
    client.succNormal({
      text: "The given user has been successfully kicked, but has not received a notification!",
      type: 'editreply'
    }, interaction);
  });
}

// © Dotwood Media | All rights reserved