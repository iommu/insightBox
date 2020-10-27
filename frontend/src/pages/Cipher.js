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
        // save in localStorage
        localStorage.c_tmp = output[0];
        localStorage.ss_tmp = output[1];
        // convert c to hex string
        var hexStr = bytesToHexStr(output[0]);
        // send hex string to server and get cipher back
        client
            .query(
                `
            query {
              getCipher(cTmp:"` +
                    hexStr +
                    `")
            }`
            )
            .toPromise()
            .then((result) => {
                // convert result to byte array
                var cipher = aesjs.utils.utf8.toBytes(result);
                // decrypt cipher to get ss
                var aesCtr = new aesjs.ModeOfOperation.ctr(localStorage.ss_tmp, new aesjs.Counter(5));
                var ss = aesCtr.decrypt(cipher);
                localStorage.ss = ss;
                console.log("ss", ss);
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
