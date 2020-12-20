import ICommand from '../../class/ICommand'
import type { Message } from 'discord.js'

class CommandTest implements ICommand {
	name:string = 'args'
	description:string = 'pee pee poo poo check'
	
	async execute(message:Message, args: string[]): Promise<void>{
		await message.reply(`args: [${args.join(", ")}]`)
	}
}

export default new CommandTest()