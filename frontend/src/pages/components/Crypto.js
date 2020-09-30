
import { SHA3 } from 'sha3';
import secureRandom from 'secure-random';

// constants
const paramsPolyBytes = 384;
const paramsSymBytes = 32;
const paramsPolyvecBytesK768 = 3 * paramsPolyBytes;

// Kyber768SKBytes is a constant representing the byte length of private keys in Kyber-768.
const Kyber768SKBytes = paramsPolyvecBytesK768 + ((paramsPolyvecBytesK768 + paramsSymBytes) + 2*paramsSymBytes);
// Kyber768PKBytes is a constant representing the byte length of public keys in Kyber-768.
const Kyber768PKBytes = paramsPolyvecBytesK768 + paramsSymBytes;

export function KemKeypair768(){
    /*
    const paramsK int = 3
	var privateKeyFixedLength [Kyber768SKBytes]byte
	var publicKeyFixedLength [Kyber768PKBytes]byte
	indcpaPrivateKey, indcpaPublicKey, err := indcpaKeypair(paramsK)
	if err != nil {
		return privateKeyFixedLength, publicKeyFixedLength, err
	}
	pkh := sha3.Sum256(indcpaPublicKey)
	rnd := make([]byte, paramsSymBytes)
	_, err = rand.Read(rnd)
	if err != nil {
		return privateKeyFixedLength, publicKeyFixedLength, err
	}
	privateKey := append(indcpaPrivateKey, indcpaPublicKey...)
	privateKey = append(privateKey, pkh[:]...)
	privateKey = append(privateKey, rnd...)
	copy(privateKeyFixedLength[:], privateKey)
	copy(publicKeyFixedLength[:], indcpaPublicKey)
	return privateKeyFixedLength, publicKeyFixedLength, nil
    */

    // number of function parameters
    const paramsK = 3;
    // privateKeyFixedLength is an array of bytes Kyber768SKBytes long
    var privateKeyFixedLength = new Uint8Array(Kyber768SKBytes);
    // publicKeyFixedLength is an array of bytes Kyber768PKBytes long
    var publicKeyFixedLength = new Uint8Array(Kyber768PKBytes);

    // indcpaKeypair(paramsK);





    // return publicKey, privateKey;
}

// indcpaKeypair generates public and private keys for the CPA-secure
// public-key encryption scheme underlying Kyber.
/*
func indcpaKeypair(paramsK int) ([]byte, []byte, error) {
	skpv := polyvecNew(paramsK)
	pkpv := polyvecNew(paramsK)
	e := polyvecNew(paramsK)
	buf := make([]byte, 2*paramsSymBytes)
    h := sha3.New512()
    
	_, err := rand.Read(buf[:paramsSymBytes])
	if err != nil {
		return []byte{}, []byte{}, err
    }
    
	_, err = h.Write(buf[:paramsSymBytes])
	if err != nil {
		return []byte{}, []byte{}, err
	}
	buf = buf[:0]
	buf = h.Sum(buf)
	publicSeed, noiseSeed := buf[:paramsSymBytes], buf[paramsSymBytes:]
	a, err := indcpaGenMatrix(publicSeed, false, paramsK)
	if err != nil {
		return []byte{}, []byte{}, err
	}
	var nonce byte
	for i := 0; i < paramsK; i++ {
		skpv[i] = polyGetNoise(noiseSeed, nonce)
		nonce = nonce + 1
	}
	for i := 0; i < paramsK; i++ {
		e[i] = polyGetNoise(noiseSeed, nonce)
		nonce = nonce + 1
	}
	polyvecNtt(skpv, paramsK)
	polyvecReduce(skpv, paramsK)
	polyvecNtt(e, paramsK)
	for i := 0; i < paramsK; i++ {
		pkpv[i] = polyToMont(polyvecPointWiseAccMontgomery(a[i], skpv, paramsK))
	}
	polyvecAdd(pkpv, e, paramsK)
	polyvecReduce(pkpv, paramsK)
	return indcpaPackPrivateKey(skpv, paramsK), indcpaPackPublicKey(pkpv, publicSeed, paramsK), nil
}
*/

// type poly [384]int16
// type polyvec []poly

export function indcpaKeypair(paramsK){

    // skpv := polyvecNew(paramsK)
    var skpv;

    // pkpv := polyvecNew(paramsK)
    var pkpv;

    // e := polyvecNew(paramsK)
    var e;

    // buf := make([]byte, 2*paramsSymBytes)
    var buf = []; // array of bytes, 2*32=64 long (64 bytes long)

    // h := sha3.New512()
    // New512 creates a new SHA3-512 hash.
    const hash = new SHA3(512);

    /*
    hash.update('hello'); // hash of hello
    var h = hash.digest('hex'); // hex encoded
    console.log("h");
    console.log(h);
    console.log(h[0]);
    */

    var bytes = secureRandom(paramsSymBytes);

    // _, err := rand.Read(buf[:paramsSymBytes])
    // fill first half of buf array with pseudorandom numbers
    for(var i=0; i<paramsSymBytes; i++){
        buf[i] = bytes[i];
    }
    console.log("random numbers:")
    console.log(buf);
    const buffer = Buffer.from(buf);

    // _, err = h.Write(buf[:paramsSymBytes])
    // write buf array into the hash (32 bytes)
    // append to hash
    console.log("update hash:");
    hash.update(buffer);
    console.log(hash);



    // buf = buf[:0] 
    // clear the buffer


	// buf = h.Sum(buf)
    
    /*

    
    

    */

}