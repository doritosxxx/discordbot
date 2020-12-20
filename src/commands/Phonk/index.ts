import ICommand from '../../class/ICommand'
import type { Message, StreamDispatcher, VoiceChannel, VoiceConnection } from 'discord.js'
import { ConditionError } from '../../error'

import path from 'path'

class CommandPhonk implements ICommand {
	name:string = 'phonk'
	description:string = 'Чиста навилить пхонка'
	
	async execute(message:Message, args: string[]): Promise<void>{
		//await message.reply("Ща навалю")

		if(!message.member?.voice.channel)
			throw new ConditionError("Чтобы навалить пхонка нужно находиться в голосовом канале")
			
		const connection:VoiceConnection = await message.member.voice.channel.join()

		const p = path.resolve(__dirname, "http://listen5.myradio24.com:9000/doritosxxx.m3u")

		const dispatcher: StreamDispatcher = connection.play(p)
		
		
	}
}

export default new CommandPhonk()