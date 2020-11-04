import { useClient } from "urql";
import { GenerateKEM } from "./components/Crypto";

var aesjs = require('aes-js');
var pkcs7 = require('pkcs7-padding');

export const Cipher = () => {
    const client = useClient();
        // get key again from server securely
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

                if (result.data.getCipher.length < 48){
                    console.log("Error: Key from server isn't correct. Check database.")
                    return (null);
                }

                var cipher = aesjs.utils.hex.toBytes(result.data.getCipher);

                var iv = cipher.slice(0,16);
                if (iv.length !== 16){
                    
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
    
    return (null);
};
 
function bytesToHexStr(c) {
    return c.reduce(
        (output, elem) => output + ("0" + elem.toString(16)).slice(-2),
        ""
    );
}

// decrypts data on frontend
export function DecryptData(input){

    if(input.length === 0){
        console.log("Error: No encrypted data received from database. Check Words table in database.");
        return "";
    }

    // input is a hex string
    // convert to byte array
    var cipher = aesjs.utils.hex.toBytes(input);

    // get the iv
    var iv = cipher.slice(0,16);

    // decrypt the cipher
    if (iv.length !== 16){
        var output = "IV error";
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

    // remove padding from decrypted string (PKCS7 padding scheme)
    var text = pkcs7.unpad(output);

    // convert bytes to plaintext
    var textUnpadded = aesjs.utils.utf8.fromBytes(text)

    return textUnpadded;
}