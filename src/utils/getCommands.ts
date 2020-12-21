import fs from 'fs'
import path from 'path'
import ICommand from '../class/ICommand'

const commandsDir = path.resolve(__dirname, "../commands")

const commands:ICommand[] = 
fs.readdirSync( commandsDir )
	.map(filename => require( `${commandsDir}/${filename}` ).default)

export default () => commands