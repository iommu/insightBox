import React from 'react';
import { useQuery } from "urql";
import ReactWordcloud from 'react-wordcloud';

var end = new Date().toISOString();
var d = new Date();
// for some reason you have to set the date back an extra day if you want 14 days returned from graphql
d.setDate(d.getDate()-8); // ie: minus 15 days from today's date
var start = new Date(d).toISOString();


const callbacks = {
  getWordColor: word => word.value > 50 ? "black" : "black",
  onWordClick: console.log,
  onWordMouseOver: console.log,
  getWordTooltip: word => `${word.text} (${word.value})`,
}
const options = {
  determinstic: 1,
  fontFamily: "arial",
  fontSizes: [10, 40],
  rotations: 1,
  rotationAngles: [0],
};
const size = [50, 50];

export const WordCloud = (dates) => {
    // define query to use
    const [result] = useQuery({
        query:
        `query {
          data(start:"` + start + `", end:"` + end + `") {
                words{text, value},
            }
        }`
    });

    // get data
    const { fetching, error } = result;

    console.log("wordcloud data:", result);

    // return errors if something wrong happened
    if (fetching) return <p> Loading user data </p>;

    if (error) {
        return <p> Error getting user data </p>;
    }

    // create map to store values
    var wordMap = new Map();
    var rlen = result.data.data.length;

    // for every day
    var word, value, map, res;
    for (var i = 0; i < rlen; i++) {
        // get every text/value received
        var wordsLen = result.data.data[i].words.length;
        for (var j = 0; j < wordsLen; j++) {
            //setting data to make code cleaner
            word = result.data.data[i].words[j].text;
            value = result.data.data[i].words[j].value;

            //if word does not exist in map yet, set it
            if (!wordMap.has(word)) {
                wordMap.set(word, value);
            }
            else {
                wordMap.set(word, wordMap.get(word) + value);
            }
        }
    }

    console.log();

    // turn the map into an array
    var words = [];
    wordMap.forEach(function(val, key) {
        words.push({ text: key, value: val });
    });
 
    return (
        <ReactWordcloud 
        callbacks={callbacks}
        options={options}
        maxWords={30}
        minSize={size}
        words={words} />
    );
};
