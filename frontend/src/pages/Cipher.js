import React from "react";
import { useQuery } from "urql";
import { Graphtest } from "./components/Graphtest";
import { GenerateKEM } from "./components/Crypto";

export const Cipher = () => {
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
    const [result] = useQuery({
        query:
            `
            query {
              getCipher(cTmp:"` +
            hexStr +
            `")
            }`,
    });
    const { fetching, error } = result;
    // TODO add error handling
    // result.data.getCipher
    return <p>ehhhhh</p>;
};

function bytesToHexStr(c) {
    return c.reduce(
        (output, elem) => output + ("0" + elem.toString(16)).slice(-2),
        ""
    );
}
