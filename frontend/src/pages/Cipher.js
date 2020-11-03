import React, { useReducer } from "react";
import { useQuery, useClient } from "urql";
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
                // convert to byte array
                var cipher = aesjs.utils.hex.toBytes(result.data.getCipher);

                var iv = cipher.slice(0,16);
                if (iv.length != 16){
                    
                }
                else{
                    var encryptedBytes = cipher.slice(16,48);
                    // decrypt cipher using output[1]
                    var aesCbc = new aesjs.ModeOfOperation.cbc(output[1], iv);
                    var ss = aesCbc.decrypt(encryptedBytes);

                    // convert to hex string and store
                    localStorage.ss = bytesToHexStr(ss);
                }
            });
    }
    return (null);
};
 
function bytesToHexStr(c) {
    return c.reduce(
        (output, elem) => output + ("0" + elem.toString(16)).slice(-2),
        ""
    );
}

// decrypts data on frontend
export function decryptData(input){
    // input is a hex string
    // convert to byte array
    var cipher = aesjs.utils.hex.toBytes(input);

    // get the iv
    var iv = cipher.slice(0,16);

    // decrypt the cipher
    if (iv.length != 16){
        output = "IV error";
    }
    else{
        var encryptedBytes = cipher.slice(16,cipher.length);

        // decrypt cipher using user's stored symmetric key
        var ssHex = localStorage.ss;

        // convert ss from hex string to byte array
        var ss = aesjs.utils.hex.toBytes(ssHex);

        var aesCbc = new aesjs.ModeOfOperation.cbc(ss, iv);
        var output = aesCbc.decrypt(encryptedBytes);
    }
    return output;
}