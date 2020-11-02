import React from 'react';
import { useQuery } from "urql";
import ReactWordcloud from 'react-wordcloud';

export const WordCloud = (dates) => {
    // define query to use
    const [result] = useQuery({
        query:
        `query {
            data(
                start:"` + dates.sDate + `",
                end:"` + dates.eDate + `"
            )
            {
                date,
                received
            }
        }`
    });

    // get data
    const { fetching, error } = result;

    // return errors if something wrong happened
    if (fetching) return <p> Loading user data </p>;

    if (error) {
        return <p> Error getting user data </p>;
    }

    // create map to store values
    var wordMap = new Map();
    var rlen = result.data.data.length;

    // for every day
    for (var i = 0; i < rlen; i++) {
        // get every text/value received
        var wordsLen = result.data.data[i].length;
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

    // turn the map into an array
    var words = [];
    map.forEach(function(val, key) {
        res.push({ text: key, value: val });
    });
 
    return (
        <ReactWordcloud words={words} />
    );
};
