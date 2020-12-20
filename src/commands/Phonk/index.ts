import ICommand from '../../class/ICommand'
import type { Message, StreamDispatcher, VoiceChannel, VoiceConnection } from 'discord.js'
import { ConditionError } from '../../error'

import path from 'path'

class CommandPhonk implements ICommand {
	name:string = 'phonk'
	description:string = 'Чиста навилить пхонка'
	
	async execute(message:Message, args: string[]): Promise<void>{
		
		if(!message.member?.voice.channel)
		throw new ConditionError("Чтобы навалить пхонка нужно находиться в голосовом канале")
		
		const connection:VoiceConnection = await message.member.voice.channel.join()
		
		const dispatcher: StreamDispatcher = connection.play(path.resolve(__dirname, "../../../static/audio/Velasko - 1.mp3"))
		await message.reply("Ща навалю")
		
		//TODO
	}
}

export default new CommandPhonk()