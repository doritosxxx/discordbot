import fs from 'fs'
import path from 'path'
import type { Client, Message } from "discord.js"
import discord from "discord.js"

import emojis from './emojis'
import ICommand from './class/ICommand'
import { UserError } from './error'

// Environment variables.
require("dotenv").config()

// Dynamic command import.
const commandsDir = path.resolve(__dirname, './commands')
const commands = new discord.Collection<string, ICommand>()
fs.readdirSync( commandsDir )
	.forEach(filename => {
		const command:ICommand = require( `${commandsDir}/${filename}` ).default;
		commands.set(command.name, command)
	})


const PREFIX = process.env.PREFIX!
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

	const args = msg.content.slice(PREFIX.length).trim().split(new RegExp(" +"))
	const name:string = args.shift()!

	const command:ICommand|undefined = commands.get(name)
	if(command === undefined)
		throw new UserError(`Команда !${name} не найдена`)

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
	
	// Cum zone.
	if(msg.author.id !== ADMIN_ID)
		return;

	handleCommand(msg)
	.catch(error => {
		if(error instanceof UserError)
			msg.reply(error.message)
		else 
			console.error(error)
	})

	

})


client.login(process.env.DISCORD_TOKEN)

