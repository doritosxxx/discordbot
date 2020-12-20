import ArgumentError from './ArgumentError'

class ArgumentOutOfRangeError extends ArgumentError {
	constructor(message?:string){
		super(message)
		this.name = "ArgumentOutOfRangeError"
	}
}

export default ArgumentOutOfRangeError