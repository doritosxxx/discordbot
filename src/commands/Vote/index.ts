import path from 'path'
import ICommand from '../../class/ICommand'
import type { Message, VoiceConnection, StreamDispatcher } from 'discord.js'
import { ArgumentError } from '../../error'
import Emojis from '../../emojis'

const prefix:string = process.env.PREFIX!

class CommandVote implements ICommand {
	name:string = 'vote'
	description:string = 'Голосование'
	help:string = `${prefix}vote <choice1> <choice2?> ... <choice10?> - Начать голосование`
	
	async execute(message:Message, args: string[]): Promise<void>{
		if(args.length === 0)
			throw new ArgumentError("Не указаны варианты голосования")
		if(args.length > 10)
			throw new ArgumentError("Максимальное количество вариантов - 10")

		const candidates:string[] = args.map((candidate, i) => `${Emojis.number(i+1)}    ${candidate}`)

		const sentMessage = await message.channel.send(`Голосование:\n${candidates.join("\n")}`)

		if(message.member?.voice.channel){
			const connection:VoiceConnection = await message.member.voice.channel.join()
			const dispatcher: StreamDispatcher = connection.play(path.resolve(__dirname, "../../../static/audio/voting_start.mp3"))
		}

		for(let i=0; i<candidates.length; i++)
			await sentMessage.react(Emojis.number(i+1))
	}
}

export default new CommandVote()