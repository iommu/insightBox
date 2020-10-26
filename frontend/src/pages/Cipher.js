import React, { useReducer } from "react";
import { useQuery, useClient } from "urql";
import { Graphtest } from "./components/Graphtest";
import { GenerateKEM } from "./components/Crypto";

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
        console.log(hexStr);
        // send hex string to server: setC()
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
                console.log(result);
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
