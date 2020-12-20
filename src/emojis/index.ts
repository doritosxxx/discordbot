import { InternalError } from "../error"

class Emojis {
	private constructor(){}

	static A = '🇦'
	static B = '🇧'
	static C = '🇨'
	static D = '🇩'
	static E = '🇪'
	static I = '🇮'
	static P = '🇵'
	static Z = '🇿'

	static zero  = '0️⃣'
	static one   = '1️⃣'
	static two   = '2️⃣'
	static three = '3️⃣'
	static four  = '4️⃣'
	static five  = '5️⃣'
	static six   = '6️⃣'
	static seven = '7️⃣'
	static eight = '8️⃣'
	static nine  = '9️⃣'
	static ten   = '🔟'

	static number = function(index:number):string {
		if(index < 0 || index > 10)
			throw new InternalError("index must be between 0 and 10 inclusive")

		const emojis:string[] = [
			Emojis.zero,
			Emojis.one,
			Emojis.two,
			Emojis.three,
			Emojis.four,
			Emojis.five,
			Emojis.six,
			Emojis.seven,
			Emojis.eight,
			Emojis.nine,
			Emojis.ten,
		]

		return emojis[index];
	}
}


export default Emojis