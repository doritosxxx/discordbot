import type { Message } from "discord.js";

interface ICommand {
	readonly name: string
	readonly description: string
	readonly execute: (message:Message, args: string[]) => Promise<void>
}

export default ICommand