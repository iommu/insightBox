import React, { useReducer } from "react";
import { useQuery, useClient } from "urql";
import { Graphtest } from "./components/Graphtest";
import { GenerateKEM } from "./components/Crypto";
// import { aesjs } from 'aes-js';

var aesjs = require('aes-js');

export const Cipher = () => {
    const client = useClient();
    if (localStorage.getItem("ss") == null) {
        // generate a (c, ss) pair
        var output = new Array(2);
        output = GenerateKEM();
        
        // convert to hex string
        var hexStrC = bytesToHexStr(output[0]);
        var hexStrSS = bytesToHexStr(output[1]);

        // save in localStorage as hex strings
        localStorage.c_tmp = hexStrC;
        localStorage.ss_tmp = hexStrSS;

        // send hex string c to server and get cipher back
        client
            .query(
                `
            query {
              getCipher(cTmp:"` +
                    hexStrC +
                    `")
            }`
            )
            .toPromise()
            .then((result) => {
                // get back encrypted symmetric key from server
                console.log("res: ", result.data.getCipher);
                // convert to byte array
                var cipher = aesjs.utils.hex.toBytes(result.data.getCipher);
                // decrypt cipher with ss_tmp (output[1]) to get original user symmetric key
                var aesCtr = new aesjs.ModeOfOperation.ctr(output[1], new aesjs.Counter(5));
                // 32 byte symmetric key
                var ss = aesCtr.decrypt(cipher);
                // convert to hex string and store
                localStorage.ss = bytesToHexStr(ss);
                console.log("ss from aes", ss);
                console.log("ss in local storage", localStorage.ss);
            });
        // TODO add error handling
        // result.data.getCipher
    }
    return (null);
};
 
function bytesToHexStr(c) {
    return c.reduce(
        (output, elem) => output + ("0" + elem.toString(16)).slice(-2),
        ""
    );
}