class WordConfig {
	//We store the data for each leading word possibility (next nodes) here.
	//The way we store the data for the bias is by storing all countings and the counts for each leading node possibility.
	//Possiblity/Total_possibility = chance in decimal.
	chancesData = [];
	totalChances = 0;
	constructor(chances, totalChances) {
		this.chancesData = chances;
		this.totalChances = totalChances;
	}

	//Biased random choice of word.
	chooseWord() {
		let rand = Math.random() * this.totalChances;
		for (let i = 0; i < this.chancesData.length; i++) {
			{
				if ((rand -= this.chancesData[i].chance) < 0) {
					return this.chancesData[i].word;
				}
			}
		}
		return this.chancesData[0].word;
	}

	//Update word entry.
	updateWord(word) {
		let indexWord = this.findIndexChanceData('word', word);
		if (indexWord !== -1) {
			let tmp = this.chancesData[indexWord];
			tmp.chance += 1;
			this.chancesData[indexWord] = tmp;
			this.totalChances += 1;
		}
	}

	//Find the index for the specified key in chancesData.
	findIndexChanceData(checkKey, wantValue) {
		for (let i = 0; i < this.chancesData.length; i++) {
			if (this.chancesData[i][checkKey] == wantValue) {
				return i;
			}
		}
		return -1;
	}

	//Add new word entry.
	addWord(word) {
		this.chancesData.push({ word: word, chance: 1 });
		this.totalChances += 1;
	}
}

export class TextConfiguration {
	words = {};
	splitText = '';
	constructor(text) {
		this.splitText = text.split(' ');
		//Create the current text configuration.
		for (let i = 0; i < this.splitText.length; i++) {
			let currentWord = this.splitText[i];
			//Get next word node, check if is last word in text, if => next word is the first word.
			let nextWord;
			i == this.splitText.length - 1
				? (nextWord = this.splitText[0])
				: (nextWord = this.splitText[i + 1]);
			//If this node_word has never been seen before. => Create entry.
			if (this.words[currentWord] == undefined) {
				this.words[currentWord] = new WordConfig([{ word: nextWord, chance: 1 }], 1);
			} else {
				//If the next word is already populated in the current word entry.
				if (this.words[currentWord].findIndexChanceData('word', nextWord) !== -1) {
					this.words[currentWord].updateWord(nextWord);
				} else {
					//If it isn't.
					this.words[currentWord].addWord(nextWord);
				}
			}
		}
	}

	//Generate a text by traversing the current text graph configuration using a start node and it's chances.
	generateText(startWord, length) {
		let text = startWord;
		if (this.words[startWord] == undefined || this.splitText == '') {
			return 'Either word is not present in inputted text, or the training data has not been loaded.';
		} else {
			let currentWord = this.words[startWord].chooseWord();
			for (let i = 1; i < length; i++) {
				text += ' ' + currentWord;
				currentWord = this.words[currentWord].chooseWord();
			}
		}
		return text;
	}
}
