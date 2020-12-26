import ytdl from 'ytdl-core'
import { InternalError } from '../error';

class TrackState {
	isPlaying: boolean = true;
	constructor(readonly name:string, readonly url:string){ 
		if(!ytdl.validateURL(url))
			throw new InternalError("Provided url is not valid youtube url")
	}
}

export default TrackState;