import type { Client, Message } from "discord.js"
import discord from "discord.js"

import emojis from './emojis'
import ICommand from './class/ICommand'
import { InternalError, UserError } from './error'

import * as db from './database'

// Environment variables.
require("dotenv").config()


// Dynamic command import.
import { getCommands } from './utils'
const commands = new discord.Collection<string, ICommand>()
getCommands().forEach(command => commands.set(command.name, command))


const PREFIX = process.env.PREFIX!
// Deprecated.
const ADMIN_ID = "391999104764608514"

const client: Client = new discord.Client()


// Handlers.

async function handleReactions(msg:Message): Promise<void>{
	if(msg.content.toLowerCase().includes('e') )
		await msg.react(emojis.E)

	if(new RegExp('(da|да)$').test(msg.content.toLowerCase())){
		await msg.react(emojis.P)
		await msg.react(emojis.I)
		await msg.react(emojis.Z)
		await msg.react(emojis.D)
		await msg.react(emojis.A)
	}
}

async function handleCommand(msg:Message): Promise<void> {
	if(!msg.content.startsWith(PREFIX) || msg.content === PREFIX)
		return;
		
	const args:string[] = []
	const matches = msg.content.slice(PREFIX.length).trim().match(/(".+?"|[^\s]+)/gu)
	if(matches !== null)
		for(const match of matches)
			if( match.length > 0 && match[0] === '\"' && match[match.length-1] === '\"' )
				args.push(match.slice(1, match.length-1))
			else 
				args.push(match)
		

	const name:string = args.shift()!.toLowerCase()

	const command:ICommand|undefined = commands.get(name)
	if(command === undefined)
		throw new InternalError(`Команда !${name} не найдена`)

	await command.execute(msg, args)

}

// Bot events.
client.on("ready", () => {
	console.log(`Logged in as ${client.user!.tag}!`)
})

client.on("message", async (msg) => {
	if (msg.author.bot)
		return;

	console.log(`message from ${msg.author.username}`)

	handleReactions(msg)

	handleCommand(msg)
		.catch(error => {
			if(error instanceof UserError)
				msg.reply(error.message)
			else 
				console.error(error)
		})

	// Cum zone.
	if(msg.author.id !== ADMIN_ID)
		return;

})


client.on("guildCreate", async guild => {
	await db.guild.create(+guild.id)
})

client.on("guildDelete", async guild => {
	await db.guild.delete(+guild)
})

client.on("disconnect", async () => {
	await db.prisma.$disconnect()
})

client.login(process.env.DISCORD_TOKEN)

