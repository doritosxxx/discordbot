import ICommand from '../../class/ICommand'
import type { Message } from 'discord.js'

class CommandPing implements ICommand {
	name:string = 'ping'
	description:string = 'Test ping command'
	
	async execute(message:Message, args: string[]): Promise<void>{
		await message.reply("Pong!")
	}
}

export default new CommandPing()