package processing

//ignoreWords is a map of words to ignore in word counting
var ignoreWords map[string]bool

/*
//checks if a word is inside IgnoreWords
func filterWord(word string) bool {
	//check if word is inside IgnoreWords, return true if it exists
	_, initialized := ignoreWords[word]
	if initialized {
		return true
	}
	return false
}

// cleans a string to be ready for processing
func cleanString(str string) string {
	// change all letters to lower case
	cleanString := strings.ToLower(str)

	// remove symbols
	re, err := regexp.Compile(`[^\w]`)
	if err != nil {
		log.Fatalf("%s Error parsing regex for removing symbols : %v", consts.Error, err)
	}
	// replace all the symbols with white space
	cleanString = re.ReplaceAllString(cleanString, " ")

	return cleanString
}

//CountWords count the number of words in the title of an email title
func countWords(wordMap map[string]int, title string) {

	// clean the string to be ready for processing
	str := cleanString(title)

	// break up the title into words delimited by space
	wordList := strings.Fields(str)

	// count words
	for _, word := range wordList {

		//if word is inside IgnoreWords, skip
		if filterWord(word) {
			continue
		}

		//check if the word has been initialized in the map
		_, initialized := wordMap[word]
		if initialized {
			//word already exists in map, add 1
			wordMap[word]++
		} else {
			//word is new, initialize it to 1
			wordMap[word] = 1
		}
	}
}

// InitIgnoreWords creates the word map for words to ignore, and populates it based on
// the loaded text file
func InitIgnoreWords() {
	// load word file
	file, err := os.Open("stop-word-list.csv")
	if err != nil {
		log.Printf("Could not open stopwords file: %v", err)
	}
	// initialize the map
	ignoreWords = make(map[string]bool)

	// parsing the file
	r := csv.NewReader(file)

	for {
		// read the next line in file
		record, err := r.Read()
		// break when we hit the end of the file
		if err == io.EOF {
			break
		}

		if err != nil {
			log.Printf("Could not read file %v", err)
		}

		// add every word to the map
		for _, word := range record {
			ignoreWords[word] = true
		}

	}

	// close file when we are done
	err = file.Close()
	if err != nil {
		log.Printf("Could not close stopwords file: %v", err)
	}
}
*/
