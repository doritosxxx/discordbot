import ICommand from '../class/ICommand'
import Discord from 'discord.js'
import type { Message, EmbedFieldData } from 'discord.js'
import { getCommands } from '../utils'
const prefix:string = process.env.PREFIX!

class CommandHelp implements ICommand {
	name:string = 'help'
	description:string = 'Displays help to the command'
	help:string = [
		`${prefix}help - Список всех команд`,
		`${prefix}help <command> - Справка по указанной команде`
	].join("\n")
	
	async execute(message:Message, args: string[]): Promise<void> {
		
		// Show help to specified command.
		if(args.length >= 1){
			
			const commandName:string = args[0].startsWith(prefix) ? args[0].slice(prefix.length) : args[0]
			for(const command of getCommands())
				if(command.name === commandName){
					message.channel.send(command.help)
					return;
				}
			

			message.reply(`Команда ${prefix}${commandName} не найдена`)
			return;
		}

		// Show list of all commands.
		const commands:EmbedFieldData[] = 
		getCommands().map(command => ({
				name: "!"+command.name,
				value: command.description,
			}))
		
		// TODO: beautify this if block
		if(commands.length > 25){
			console.error("Reached maximun amount of commands to send embed message with them")
			message.channel.send("Справка по командам"+commands.map(c=>c.name+" - "+c.value))
			return;
		}

		const embed = new Discord.MessageEmbed()
			.setTitle("Справка по командам")
			.addFields(...commands)
			.setColor('#0099ff')
		message.channel.send(embed)
	}
}

export default new CommandHelp()