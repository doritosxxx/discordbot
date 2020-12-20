from mutagen.id3 import ID3, TIT2, TPE1
import os


dir = os.scandir("phonk")

for entry in dir:
	filename = "phonk/"+entry.name
	try:
		# Getting title and author from filename.
		chunks = entry.name.replace(".mp3", "").replace("[6SIX]", "").split("-")
		chunks = list(map(lambda chunk: chunk.strip(), chunks))
		[author, title] = chunks[:2]

		# Editing audio metadata.
		audio = ID3(filename)
		audio.add(TIT2(encoding=3, text=title))
		audio.add(TPE1(encoding=3, text=author))
		audio.save()
	except:
		print("fuck "+ filename)
