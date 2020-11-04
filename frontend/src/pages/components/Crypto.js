import { SHA3, SHAKE } from 'sha3';


const publicKey = [156, 160, 171, 15, 57, 196, 212, 88, 12, 201, 156, 69, 122, 58, 153, 61, 106, 154, 219, 51, 150, 178, 6, 37, 97, 133, 62, 29,
    232, 23, 56, 132, 93, 197, 20, 123, 188, 217, 13, 53, 103, 150, 99, 120, 14, 238, 65, 52, 69, 85, 38, 221, 165, 19, 217, 181, 207,
    62, 9, 183, 53, 53, 129, 165, 229, 68, 213, 108, 8, 200, 150, 0, 118, 198, 96, 112, 123, 5, 37, 85, 56, 94, 226, 128, 17, 18, 50,
    117, 92, 207, 213, 154, 115, 67, 220, 70, 154, 49, 79, 101, 146, 37, 206, 187, 173, 77, 226, 38, 82, 152, 55, 79, 67, 27, 217, 247,
    138, 218, 91, 157, 139, 104, 112, 253, 243, 75, 247, 105, 172, 27, 23, 95, 214, 101, 200, 203, 192, 154, 224, 5, 135, 220, 105, 2,
    38, 199, 103, 17, 248, 17, 204, 241, 10, 181, 108, 175, 165, 135, 14, 3, 163, 127, 152, 196, 97, 109, 196, 92, 241, 5, 123, 87, 82,
    101, 250, 86, 145, 20, 41, 169, 103, 72, 37, 78, 199, 2, 167, 227, 8, 35, 20, 145, 4, 148, 74, 125, 41, 55, 61, 195, 83, 76, 161,
    195, 107, 133, 92, 27, 115, 17, 32, 218, 175, 126, 90, 151, 83, 124, 143, 112, 136, 76, 67, 55, 4, 167, 133, 75, 237, 228, 85, 253,
    185, 57, 93, 134, 58, 112, 91, 183, 159, 134, 14, 36, 119, 44, 139, 224, 80, 44, 131, 11, 216, 242, 176, 43, 28, 153, 81, 171, 169,
    8, 165, 170, 244, 102, 183, 161, 162, 199, 230, 70, 63, 76, 48, 0, 125, 203, 12, 174, 22, 45, 192, 98, 155, 133, 252, 172, 107, 164,
    47, 27, 208, 58, 238, 231, 16, 28, 129, 39, 253, 155, 153, 171, 136, 143, 29, 5, 38, 104, 209, 118, 170, 7, 35, 244, 210, 106, 238,
    153, 88, 222, 4, 21, 210, 105, 7, 132, 60, 87, 251, 228, 78, 22, 234, 82, 232, 100, 113, 168, 66, 196, 112, 168, 22, 131, 65, 170,
    40, 187, 191, 230, 116, 36, 162, 71, 63, 89, 252, 28, 203, 176, 195, 194, 55, 187, 62, 33, 34, 119, 19, 174, 68, 252, 97, 22, 227,
    38, 36, 134, 125, 95, 113, 82, 170, 60, 143, 75, 80, 206, 147, 152, 29, 55, 219, 175, 199, 51, 104, 200, 232, 110, 195, 234, 203,
    142, 171, 118, 65, 150, 29, 87, 116, 148, 207, 214, 129, 253, 248, 144, 126, 194, 142, 36, 73, 134, 121, 76, 196, 155, 103, 65, 243,
    83, 65, 254, 249, 170, 219, 218, 147, 84, 3, 32, 199, 180, 80, 255, 244, 181, 124, 107, 87, 9, 250, 162, 69, 150, 103, 50, 235, 103,
    116, 56, 123, 253, 218, 102, 65, 136, 79, 124, 12, 80, 147, 74, 128, 68, 134, 155, 148, 129, 33, 49, 73, 13, 170, 76, 191, 51, 243,
    180, 7, 58, 80, 28, 209, 125, 227, 164, 159, 3, 65, 3, 6, 70, 51, 62, 104, 195, 176, 59, 17, 149, 1, 104, 211, 104, 37, 140, 112,
    204, 83, 52, 103, 27, 16, 161, 116, 200, 148, 3, 129, 183, 164, 36, 108, 106, 0, 165, 111, 218, 132, 157, 57, 55, 103, 35, 136, 166,
    3, 180, 9, 42, 58, 150, 18, 81, 31, 152, 123, 117, 177, 26, 77, 236, 46, 25, 9, 142, 253, 140, 106, 103, 97, 0, 172, 114, 89, 4, 228,
    21, 121, 168, 18, 58, 155, 136, 60, 80, 159, 44, 212, 32, 199, 102, 21, 237, 193, 71, 12, 55, 144, 130, 67, 7, 38, 24, 88, 37, 137,
    52, 194, 177, 152, 186, 160, 108, 247, 151, 151, 125, 146, 28, 195, 252, 180, 162, 41, 16, 116, 99, 162, 223, 153, 11, 168, 114, 130,
    206, 75, 110, 19, 2, 76, 183, 59, 200, 81, 155, 192, 136, 193, 33, 103, 6, 132, 222, 75, 134, 214, 43, 201, 200, 164, 129, 185, 242,
    49, 60, 140, 171, 49, 115, 166, 180, 128, 164, 92, 49, 86, 5, 204, 177, 255, 9, 69, 29, 68, 90, 30, 73, 168, 216, 230, 112, 27, 84,
    46, 223, 68, 72, 48, 88, 86, 132, 210, 101, 178, 208, 194, 65, 243, 203, 45, 69, 103, 177, 133, 78, 217, 188, 101, 226, 64, 152, 186,
    1, 194, 243, 120, 82, 197, 80, 46, 184, 57, 160, 245, 234, 111, 211, 164, 88, 179, 197, 85, 25, 53, 195, 243, 19, 33, 92, 180, 38, 93,
    117, 20, 116, 230, 76, 120, 121, 206, 166, 244, 135, 168, 130, 171, 3, 73, 93, 167, 27, 182, 52, 130, 9, 124, 89, 109, 192, 218, 81,
    13, 160, 193, 220, 251, 97, 202, 136, 156, 27, 129, 15, 34, 7, 94, 48, 90, 172, 106, 26, 139, 204, 176, 140, 112, 128, 145, 226, 5,
    135, 221, 235, 142, 148, 140, 205, 78, 133, 8, 136, 65, 206, 250, 124, 45, 7, 64, 165, 174, 209, 144, 226, 150, 149, 188, 153, 124, 71,
    42, 193, 193, 50, 52, 150, 91, 5, 77, 23, 131, 230, 252, 89, 209, 252, 185, 56, 106, 71, 235, 149, 167, 199, 9, 83, 243, 166, 41, 94,
    36, 74, 229, 233, 60, 177, 113, 34, 42, 116, 137, 7, 187, 92, 185, 98, 127, 49, 178, 145, 33, 136, 60, 32, 84, 12, 90, 204, 85, 242, 8,
    99, 239, 138, 175, 185, 199, 156, 172, 193, 199, 97, 220, 116, 140, 179, 49, 173, 144, 195, 215, 249, 108, 149, 195, 40, 149, 230, 94,
    143, 200, 107, 81, 104, 202, 10, 170, 134, 44, 170, 196, 105, 112, 78, 34, 103, 105, 218, 56, 53, 198, 132, 148, 77, 37, 170, 135, 112,
    66, 159, 16, 160, 35, 148, 52, 101, 41, 149, 16, 107, 75, 128, 106, 74, 4, 87, 180, 25, 196, 119, 246, 28, 188, 87, 219, 24, 66, 25,
    189, 242, 247, 159, 58, 153, 12, 195, 195, 3, 69, 249, 143, 126, 214, 55, 155, 48, 99, 106, 162, 177, 123, 162, 27, 85, 234, 55, 170,
    198, 32, 202, 121, 61, 121, 19, 13, 175, 199, 177, 235, 226, 64, 68, 118, 159, 127, 243, 89, 23, 100, 169, 143, 170, 96, 112, 129,
    112, 95, 214, 32, 213, 145, 189, 70, 219, 127, 215, 183, 202, 125, 182, 125, 229, 128, 121, 204, 220, 118, 198, 104, 47, 151, 0, 130,
    180, 154, 71, 142, 185, 164, 199, 36, 157, 4, 245, 119, 223, 25, 85, 24, 200, 50, 114, 25, 181, 195, 213, 89, 6, 183, 126, 40, 233,
    59, 229, 240, 110, 65, 242, 81, 201, 122, 97, 55, 198, 187, 144, 40, 79, 193, 41, 40, 176, 154, 81, 175, 234, 149, 151, 145, 168, 49,
    183, 90, 187, 59, 153, 106, 85, 157, 222, 147, 84, 175, 201, 24, 175, 50, 39, 20, 166, 155, 58, 191, 89, 175, 80, 67, 16, 221, 51, 210,
    123, 126, 199, 122, 47, 145, 64, 58, 25, 89, 176, 153, 170, 195, 210, 118, 29, 70, 75];

const nttZetas = [
    2285, 2571, 2970, 1812, 1493, 1422, 287, 202, 3158, 622, 1577, 182, 962,
    2127, 1855, 1468, 573, 2004, 264, 383, 2500, 1458, 1727, 3199, 2648, 1017,
    732, 608, 1787, 411, 3124, 1758, 1223, 652, 2777, 1015, 2036, 1491, 3047,
    1785, 516, 3321, 3009, 2663, 1711, 2167, 126, 1469, 2476, 3239, 3058, 830,
    107, 1908, 3082, 2378, 2931, 961, 1821, 2604, 448, 2264, 677, 2054, 2226,
    430, 555, 843, 2078, 871, 1550, 105, 422, 587, 177, 3094, 3038, 2869, 1574,
    1653, 3083, 778, 1159, 3182, 2552, 1483, 2727, 1119, 1739, 644, 2457, 349,
    418, 329, 3173, 3254, 817, 1097, 603, 610, 1322, 2044, 1864, 384, 2114, 3193,
    1218, 1994, 2455, 220, 2142, 1670, 2144, 1799, 2051, 794, 1819, 2475, 2459,
    478, 3221, 3021, 996, 991, 958, 1869, 1522, 1628];

const nttZetasInv = [
    1701, 1807, 1460, 2371, 2338, 2333, 308, 108, 2851, 870, 854, 1510, 2535,
    1278, 1530, 1185, 1659, 1187, 3109, 874, 1335, 2111, 136, 1215, 2945, 1465,
    1285, 2007, 2719, 2726, 2232, 2512, 75, 156, 3000, 2911, 2980, 872, 2685,
    1590, 2210, 602, 1846, 777, 147, 2170, 2551, 246, 1676, 1755, 460, 291, 235,
    3152, 2742, 2907, 3224, 1779, 2458, 1251, 2486, 2774, 2899, 1103, 1275, 2652,
    1065, 2881, 725, 1508, 2368, 398, 951, 247, 1421, 3222, 2499, 271, 90, 853,
    1860, 3203, 1162, 1618, 666, 320, 8, 2813, 1544, 282, 1838, 1293, 2314, 552,
    2677, 2106, 1571, 205, 2918, 1542, 2721, 2597, 2312, 681, 130, 1602, 1871,
    829, 2946, 3065, 1325, 2756, 1861, 1474, 1202, 2367, 3147, 1752, 2707, 171,
    3127, 3042, 1907, 1836, 1517, 359, 758, 1441];


// ----------------------------------------------------------------------------------------------
// From http://baagoe.com/en/RandomMusings/javascript/
// Johannes Baagøe <baagoe@baagoe.com>, 2010
// ----------------------------------------------------------------------------------------------
function Mash() {
var n = 0xefc8249d;

var mash = function (data) {
    data = data.toString();
    for (var i = 0; i < data.length; i++) {
    n += data.charCodeAt(i);
    var h = 0.02519603282416938 * n;
    n = h >>> 0;
    h -= n;
    h *= n;
    n = h >>> 0;
    h -= n;
    n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
};
mash.version = "Mash 0.9";
return mash;
}
function Alea() {
return (function (args) {
    var s0 = 0;
    var s1 = 0;
    var s2 = 0;
    var c = 1;

    if (args.length === 0) {
    args = [+new Date()];
    }
    var mash = Mash();
    s0 = mash(" ");
    s1 = mash(" ");
    s2 = mash(" ");

    for (var i = 0; i < args.length; i++) {
    s0 -= mash(args[i]);
    if (s0 < 0) {
        s0 += 1;
    }
    s1 -= mash(args[i]);
    if (s1 < 0) {
        s1 += 1;
    }
    s2 -= mash(args[i]);
    if (s2 < 0) {
        s2 += 1;
    }
    }
    mash = null;

    var random = function () {
    var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
    s0 = s1;
    s1 = s2;
    return (s2 = t - (c = t | 0));
    };
    random.uint32 = function () {
    return random() * 0x100000000; // 2^32
    };
    random.fract53 = function () {
    return random() + ((random() * 0x200000) | 0) * 1.1102230246251565e-16; // 2^-53
    };
    random.version = "Alea 0.9";
    random.args = args;
    return random;
})(Array.prototype.slice.call(arguments));
}

//prng
var random = Alea();
var seed = random.args;
random = Alea(seed);

// ----------------------------------------------------------------------------------------------
// From: https://github.com/FuKyuToTo/lattice-based-cryptography
// ----------------------------------------------------------------------------------------------
//Returns the next pseudorandom, uniformly distributed integer between 0(inclusive) and q-1(inclusive)
function nextInt(n) {
    return Math.floor(random() * n); //prng.js -> random()
}

function hexToDec(hexString){
    return parseInt(hexString, 16);
}

// ----------------------------------------------------------------------------------------------
// Translated parts of code to javascript: https://github.com/symbolicsoft/kyber-k2so
// ----------------------------------------------------------------------------------------------
export function GenerateKEM(){
    // generate (c, ss) from pk
    // send c to server

    const paramsK = 3;

    // make 32 byte array
    var sharedSecret = new Array(32);

    // make a 64 byte buffer array
    var buf = new Array(64);

    // read 32 random values (0-255) into the 64 byte array
    for (var i=0; i<32; i++){
        buf[i] = nextInt(256);
    }

    // buf_tmp = buf[:32]
    var buf_tmp = buf.slice(0,32);
    const buffer1 = Buffer.from(buf_tmp);

    // buf1 = sha3.sum256 of buf1
    const hash1 = new SHA3(256);
    hash1.update(buffer1);
    buf_tmp = hash1.digest('hex');
    // convert hex string to array
    var buf1 = new Array(32);
    for (i=0; i<32; i++){
        buf1[i] = hexToDec(buf_tmp[2*i] + buf_tmp[2*i+1]);
    }

    // buf2 = sha3.sum256 of publicKey[0:1184]
    const buffer2 = Buffer.from(publicKey);
    const hash2 = new SHA3(256);
    hash2.update(buffer2);
    buf_tmp = hash2.digest('hex');
    // convert hex string to array
    var buf2 = new Array(32);
    for (i=0; i<32; i++){
        buf2[i] = hexToDec(buf_tmp[2*i] + buf_tmp[2*i+1]);
    }

    // kr = sha3.sum512 of (buf1 + buf2) concatenate
    const buffer3 = Buffer.from(buf1);
    const buffer4 = Buffer.from(buf2);
    const hash3 = new SHA3(512);
    hash3.update(buffer3).update(buffer4);
    var kr_str = hash3.digest('hex');
    // convert hex string to array
    var kr = new Array(32);
    for (i=0; i<64; i++){
        kr[i] = hexToDec(kr_str[2*i] + kr_str[2*i+1]);
    }
    var kr1 = kr.slice(0,32);
    var kr2 = kr.slice(32,64);

    // c = indcpaEncrypt(buf1, publicKey, kr[32:], paramsK)
    var ciphertext = new Array(1088);
    ciphertext = indcpaEncrypt(buf1, publicKey, kr2, paramsK);

    // krc = sha3.Sum256(ciphertext)
    const buffer5 = Buffer.from(ciphertext);
    var krc = new Array(32);
    const hash4 = new SHA3(256);
    hash4.update(buffer5);
    var krc_str = hash4.digest('hex');
    // convert hex string to array
    for (i=0; i<32; i++){
        krc[i] = hexToDec(krc_str[2*i] + krc_str[2*i+1]);
    }

    // sha3.ShakeSum256(sharedSecret, append(kr[:paramsSymBytes], krc[:]...))
    const buffer6 = Buffer.from(kr1);
    const buffer7 = Buffer.from(krc);
    const hash5 = new SHAKE(256);
    hash5.update(buffer6).update(buffer7);
    var ss_str = hash5.digest('hex');
    // convert hex string to array
    for (i=0; i<32; i++){
        sharedSecret[i] = hexToDec(ss_str[2*i] + ss_str[2*i+1]);
    }

    var result = new Array(2);
    result[0] = ciphertext;
    result[1] = sharedSecret;

    return result;
}

function indcpaEncrypt(m, publicKey, coins, paramsK){

    var ciphertext = new Array(1088);

    var sp = polyvecNew(paramsK);
    var ep = polyvecNew(paramsK);
    var bp = polyvecNew(paramsK);

    var result = indcpaUnpackPublicKey(publicKey, paramsK);

    var publicKeyPolyvec = result[0];
    var seed = result[1];

    var k = polyFromMsg(m);

    var at = indcpaGenMatrix(seed, true, paramsK);

    for (var i=0; i<paramsK; i++) {
		sp[i] = polyGetNoise(coins, i);
		ep[i] = polyGetNoise(coins, i+paramsK);
	}

    var epp = polyGetNoise(coins, paramsK*2);

    sp = polyvecNtt(sp, paramsK);
    
    sp = polyvecReduce(sp, paramsK);
    

	for (i = 0; i < paramsK; i++) {
		bp[i] = polyvecPointWiseAccMontgomery(at[i], sp, paramsK);
    }
    
    var v = polyvecPointWiseAccMontgomery(publicKeyPolyvec, sp, paramsK);
    
    bp = polyvecInvNttToMont(bp, paramsK);
    
    v = polyInvNttToMont(v);
    
    var bp1 = polyvecAdd(bp, ep, paramsK);
    
    v = polyAdd(polyAdd(v, epp), k);
    
    var bp3 = polyvecReduce(bp1, paramsK);
    
	ciphertext = indcpaPackCiphertext(bp3, polyReduce(v), paramsK);
    return ciphertext;
}

// polyvecNew instantiates a new vector of polynomials.
function polyvecNew(paramsK) {
    // make array containing 3 elements of type poly
    var pv = new Array(paramsK);
    for(var i=0; i<paramsK; i++){
        pv[i] =  new Array(384);
    }
	return pv;
}

// indcpaUnpackPublicKey de-serializes the public key from a byte array
// and represents the approximate inverse of indcpaPackPublicKey.
function indcpaUnpackPublicKey(packedPublicKey, paramsK){
    var publicKeyPolyvec = polyvecFromBytes(packedPublicKey, paramsK);
    var seed = packedPublicKey.slice(1152, 1184);

    // return values
    var result = new Array(2);
    result[0] = publicKeyPolyvec;
    result[1] = seed;
    return result;
}
const paramsPolyBytes = 384;

// polyvecFromBytes deserializes a vector of polynomials.
function polyvecFromBytes(a, paramsK){
    var r = polyvecNew(paramsK);
    var start;
    var end;
    for(var i=0; i<paramsK; i++){
        start = (i * paramsPolyBytes);
        end = (i+1) * paramsPolyBytes;
        r[i] = polyFromBytes(a.slice(start,end));
    }
    return r;
}

const paramsN = 256;
// polyFromBytes de-serialises an array of bytes into a polynomial,
// and represents the inverse of polyToBytes.
function polyFromBytes(a){
	var r = new Array(384).fill(0); // each element is int16 (0-65535)
	for (var i=0; i<paramsN/2; i++) {
		r[2*i] = int16(((uint16(a[3*i+0]) >> 0) | (uint16(a[3*i+1]) << 8)) & 0xFFF);
		r[2*i+1] = int16(((uint16(a[3*i+1]) >> 4) | (uint16(a[3*i+2]) << 4)) & 0xFFF);
	}
	return r;
}

const paramsQ = 3329;
// polyFromMsg converts a 32-byte message to a polynomial.
function polyFromMsg(msg){
	var r = new Array(384).fill(0); // each element is int16 (0-65535)
	var mask; // int16
	for (var i=0; i<paramsN/8; i++) {
		for (var j=0; j<8; j++) {
			mask = -1*int16((msg[i] >> j) & 1);
			r[8*i+j] = mask & int16((paramsQ+1)/2);
		}
	}
	return r;
}

// indcpaGenMatrix deterministically generates a matrix `A` (or the transpose of `A`)
// from a seed. Entries of the matrix are polynomials that look uniformly random.
// Performs rejection sampling on the output of an extendable-output function (XOF).
function indcpaGenMatrix(seed, transposed, paramsK){
    var r = new Array(3);
    var buf = new Array(4*168);
    const xof = new SHAKE(128);
	var ctr = 0;
	for (var i=0; i<paramsK; i++) {

        r[i] = polyvecNew(paramsK);
        var transposon = new Array(2);

		for (var j=0; j<paramsK; j++) {
            transposon[0] = j;
            transposon[1] = i;
			if (transposed) {
				transposon[0] = i;
                transposon[1] = j;
			}
            xof.reset();
            const buffer1 = Buffer.from(seed);
            const buffer2 = Buffer.from(transposon);
            xof.update(buffer1).update(buffer2);
            var buf_str = xof.digest({ buffer: Buffer.alloc(672), format: 'hex' });
            // convert hex string to array
            for (var n=0; n<672; n++){
                buf[n] = hexToDec(buf_str[2*n] + buf_str[2*n+1]);
            }

            var result = new Array(2);
            result = indcpaRejUniform(buf, buf.length);
            r[i][j] = result[0];
            ctr = result[1];
            
			while (ctr < paramsN) {
                var bufn = buf.slice(0,168);
                var result1 = new Array(2);
                result1 = indcpaRejUniform(bufn, 168);
                var missing = result1[0];
                var ctrn = result1[1];

				for (var k=ctr; k<paramsN-ctr; k++) {
					r[i][j][k] = missing[paramsN-ctr+k];
				}
				ctr = ctr + ctrn;
            }
		}
	}
	return r;
}

// indcpaRejUniform runs rejection sampling on uniform random bytes
// to generate uniform random integers modulo `Q`.
function indcpaRejUniform(buf, bufl){
	var r = new Array(384).fill(0); // each element is int16 (0-65535)
	var val;
	var ctr = 0;
	var pos = 0;
	while (ctr < paramsN && pos+2 <= bufl) {
		val = uint16(buf[pos]) | (uint16(buf[pos+1]) << 8);
		pos = pos + 2;
		if (val < uint16(19*paramsQ)) {
			val = val - ((val >> 12) * paramsQ);
			r[ctr] = int16(val);
			ctr = ctr + 1;
		}
    }

    var result = new Array(2);
    result[0] = r;
    result[1] = ctr;
    return result;
}

const paramsETA = 2;
// polyGetNoise samples a polynomial deterministically from a seed
// and nonce, with the output polynomial being close to a centered
// binomial distribution with parameter paramsETA = 2.
function polyGetNoise(seed, nonce) {
	var l = paramsETA * paramsN / 4;
	var p = indcpaPrf(l, seed, nonce);
	return byteopsCbd(p);
}

// indcpaPrf provides a pseudo-random function (PRF) which returns
// a byte array of length `l`, using the provided key and nonce
// to instantiate the PRF's underlying hash function.
function indcpaPrf(l, key, nonce) {
    var buf = new Array(l);
    var nonce_arr = new Array(1);
    nonce_arr[0] = nonce;
    const hash = new SHAKE(256);
    hash.reset();
    const buffer1 = Buffer.from(key);
    const buffer2 = Buffer.from(nonce_arr);
    hash.update(buffer1).update(buffer2);
    var hash_str = hash.digest({ buffer: Buffer.alloc(l), format: 'hex' });
    // convert hex string to array
    for (var n=0; n<l; n++){
        buf[n] = hexToDec(hash_str[2*n] + hash_str[2*n+1]);
    }
	return buf;
}

// byteopsCbd computes a polynomial with coefficients distributed
// according to a centered binomial distribution with parameter paramsETA,
// given an array of uniformly random bytes.
function byteopsCbd(buf) {
	var t, d;
	var a, b;
	var r = new Array(384).fill(0); // each element is int16 (0-65535)
	for (var i = 0; i < paramsN/8; i++) {
        t = (byteopsLoad32(buf.slice(4*i,buf.length)) >>> 0);
		d = ((t & 0x55555555) >>> 0);
		d = (d + ((((t >> 1) >>> 0) & 0x55555555) >>> 0) >>> 0);
		for (var j = 0; j < 8; j++){
			a = int16((((d >> (4*j + 0)) >>> 0) & 0x3) >>> 0);
			b = int16((((d >> (4*j + paramsETA)) >>> 0) & 0x3) >>> 0);
			r[8*i+j] = a - b;
		}
	}
	return r;
}

// byteopsLoad32 returns a 32-bit unsigned integer loaded from byte x.
function byteopsLoad32(x) {
	var r;
    r = uint32(x[0]);
    r = (((r | (uint32(x[1]) << 8)) >>> 0) >>> 0);
	r = (((r | (uint32(x[2]) << 16)) >>> 0) >>> 0);
	r = (((r | (uint32(x[3]) << 24)) >>> 0) >>> 0);
	return uint32(r);
}

// polyvecNtt applies forward number-theoretic transforms (NTT)
// to all elements of a vector of polynomials.
function polyvecNtt(r, paramsK) {
	for (var i = 0; i < paramsK; i++){
		r[i] = polyNtt(r[i]);
    }
    return r;
}

// polyNtt computes a negacyclic number-theoretic transform (NTT) of
// a polynomial in-place; the input is assumed to be in normal order,
// while the output is in bit-reversed order.
function polyNtt(r) {
	return ntt(r);
}

// ntt performs an inplace number-theoretic transform (NTT) in `Rq`.
// The input is in standard order, the output is in bit-reversed order.
function ntt(r){
    var r3 =  new Array(384);
    r3 = r;
	var j = 0;
    var k = 1;
    var zeta;
    var t;
	for ( var l = 128; l >= 2; l >>= 1) {
		for (var start = 0; start < 256; start = j + l){
			zeta = nttZetas[k];
			k = k + 1;
			for (j = start; j < start+l; j++) {
				t = nttFqMul(zeta, r3[j+l]);
				r3[j+l] = r3[j] - t;
				r3[j] = r3[j] + t;
			}
		}
    }
    var r1 = new Array(384);
    r1 = r3;
	return r1;
}

// nttFqMul performs multiplication followed by Montgomery reduction
// and returns a 16-bit integer congruent to `a*b*R^{-1} mod Q`.
function nttFqMul(a, b) {
	return byteopsMontgomeryReduce(a * b);
}

const paramsQinv = 62209;
// byteopsMontgomeryReduce computes a Montgomery reduction; given
// a 32-bit integer `a`, returns `a * R^-1 mod Q` where `R=2^16`.
function byteopsMontgomeryReduce(a) {
	var u = int16(int32(a) * paramsQinv);
	var t = u * paramsQ;
	t = a - t;
	t >>= 16;
	return int16(t);
}

// polyvecReduce applies Barrett reduction to each coefficient of each element
// of a vector of polynomials.
function polyvecReduce(r, paramsK) {
	for (var i = 0; i < paramsK; i++){
		r[i] = polyReduce(r[i]);
    }
    return r;
}

// polyReduce applies Barrett reduction to all coefficients of a polynomial.
function polyReduce(r){
	for (var i = 0; i < paramsN; i++) {
		r[i] = byteopsBarrettReduce(r[i]);
	}
	return r;
}

// byteopsBarrettReduce computes a Barrett reduction; given
// a 16-bit integer `a`, returns a 16-bit integer congruent to
// `a mod Q` in {0,...,Q}.
function byteopsBarrettReduce(a){
	var t;
	var v = int16(((1 << 26) + paramsQ/2) / paramsQ);
	t = int16(int32(v) * int32(a) >> 26);
	t = t * paramsQ;
	return a - t;
}

// polyvecPointWiseAccMontgomery pointwise-multiplies elements of polynomial-vectors
// `a` and `b`, accumulates the results into `r`, and then multiplies by `2^-16`.
function polyvecPointWiseAccMontgomery(a, b, paramsK){
    var r = polyBaseMulMontgomery(a[0], b[0]);
    var t;
	for (var i=1; i<paramsK; i++) {
		t = polyBaseMulMontgomery(a[i], b[i]);
		r = polyAdd(r, t);
	}
	return polyReduce(r);
}

// polyBaseMulMontgomery performs the multiplication of two polynomials
// in the number-theoretic transform (NTT) domain.
function polyBaseMulMontgomery(a, b) {
    var rx, ry;
	for (var i = 0; i < paramsN/4; i++) {
		rx = nttBaseMul(
			a[4*i+0], a[4*i+1],
			b[4*i+0], b[4*i+1],
			nttZetas[64+i]
		);
		ry = nttBaseMul(
			a[4*i+2], a[4*i+3],
			b[4*i+2], b[4*i+3],
			-nttZetas[64+i]
		);
		a[4*i+0] = rx[0];
		a[4*i+1] = rx[1];
		a[4*i+2] = ry[0];
		a[4*i+3] = ry[1];
	}
	return a;
}

// nttBaseMul performs the multiplication of polynomials
// in `Zq[X]/(X^2-zeta)`. Used for multiplication of elements
// in `Rq` in the number-theoretic transformation domain.
function nttBaseMul(a0, a1, b0, b1, zeta) {
	var r = new Array(2);
	r[0] = nttFqMul(a1, b1);
	r[0] = nttFqMul(r[0], zeta);
	r[0] = r[0] + nttFqMul(a0, b0);
	r[1] = nttFqMul(a0, b1);
	r[1] = r[1] + nttFqMul(a1, b0);
	return r;
}

// polyAdd adds two polynomials.
function polyAdd(a, b) {
    var c = new Array(384);
	for (var i = 0; i < paramsN; i++) {
		c[i] = a[i] + b[i];
    }
	return c;
}

// polyvecInvNttToMont applies the inverse number-theoretic transform (NTT)
// to all elements of a vector of polynomials and multiplies by Montgomery
// factor `2^16`.
function polyvecInvNttToMont(r, paramsK) {
	for (var i = 0; i < paramsK; i++) {
		r[i] = polyInvNttToMont(r[i]);
    }
    return r;
}

// polyInvNttToMont computes the inverse of a negacyclic number-theoretic
// transform (NTT) of a polynomial in-place; the input is assumed to be in
// bit-reversed order, while the output is in normal order.
function polyInvNttToMont(r) {
	return nttInv(r);
}

// nttInv performs an inplace inverse number-theoretic transform (NTT)
// in `Rq` and multiplication by Montgomery factor 2^16.
// The input is in bit-reversed order, the output is in standard order.
function nttInv(r) {
	var j = 0;
    var k = 0;
    var zeta;
    var t;
	for (var l = 2; l <= 128; l <<= 1) {
		for (var start = 0; start < 256; start = j + l) {
			zeta = nttZetasInv[k];
			k = k + 1;
			for (j = start; j < start+l; j++) {
				t = r[j];
				r[j] = byteopsBarrettReduce(t + r[j+l]);
				r[j+l] = t - r[j+l];
				r[j+l] = nttFqMul(zeta, r[j+l]);
			}
		}
	}
	for (j = 0; j < 256; j++) {
		r[j] = nttFqMul(r[j], nttZetasInv[127]);
	}
	return r;
}

// polyvecAdd adds two vectors of polynomials.
function polyvecAdd(a, b, paramsK) {
    var c = new Array(3);
	for (var i = 0; i < paramsK; i++) {
		c[i] = polyAdd(a[i], b[i]);
    }
    return c;
}

// indcpaPackCiphertext serializes the ciphertext as a concatenation of
// the compressed and serialized vector of polynomials `b` and the
// compressed and serialized polynomial `v`.
function indcpaPackCiphertext(b, v, paramsK) {
    var arr1 = polyvecCompress(b, paramsK);
    var arr2 = polyCompress(v, paramsK);
    return arr1.concat(arr2);
}

const paramsPolyCompressedBytesK768 = 128;
const paramsPolyvecCompressedBytesK768 = 3 * 320;
// polyvecCompress lossily compresses and serializes a vector of polynomials.
function polyvecCompress(a, paramsK) {
    
    a = polyvecCSubQ(a, paramsK);
    
    var rr = 0;
    
    var r = new Array(paramsPolyvecCompressedBytesK768);
    
	var t = new Array(4);
    for (var i = 0; i < paramsK; i++) {
        for (var j = 0; j < paramsN/4; j++) {
            for (var k = 0; k < 4; k++) {
                t[k] = uint16((((a[i][4*j+k] << 10) + paramsQ/2) / paramsQ) & 0x3ff);
            }
            r[rr+0] = byte(t[0] >> 0);
            r[rr+1] = byte((t[0] >> 8) | (t[1] << 2));
            r[rr+2] = byte((t[1] >> 6) | (t[2] << 4));
            r[rr+3] = byte((t[2] >> 4) | (t[3] << 6));
            r[rr+4] = byte((t[3] >> 2));
            rr = rr + 5;
        }
    }
    return r;
}

// polyvecCSubQ applies the conditional subtraction of `Q` to each coefficient
// of each element of a vector of polynomials.
function polyvecCSubQ(r, paramsK) {
	for (var i = 0; i < paramsK; i++) {
		r[i] = polyCSubQ(r[i]);
    }
    return r;
}

// polyCSubQ applies the conditional subtraction of `Q` to each coefficient
// of a polynomial.
function polyCSubQ(r) {
	for (var i = 0; i < paramsN; i++) {
		r[i] = byteopsCSubQ(r[i]);
	}
	return r;
}

// polyCompress lossily compresses and subsequently serializes a polynomial.
function polyCompress(a, paramsK) {
	var t = new Array(8);
	a = polyCSubQ(a);
    var rr = 0;
    var r = new Array(paramsPolyCompressedBytesK768);
    for (var i = 0; i < paramsN/8; i++) {
        for (var j = 0; j < 8; j++) {
            t[j] = byte(((a[8*i+j]<<4)+paramsQ/2)/paramsQ) & 15;
        }
        r[rr+0] = t[0] | (t[1] << 4);
        r[rr+1] = t[2] | (t[3] << 4);
        r[rr+2] = t[4] | (t[5] << 4);
        r[rr+3] = t[6] | (t[7] << 4);
        rr = rr + 4;
    }
    return r;
}

// byteopsCSubQ conditionally subtracts Q from a.
function byteopsCSubQ(a) {
	a = a - int16(paramsQ);
	a = a + ((a >> 15) & int16(paramsQ));
	return a;
}

function byte(n){
    n = n%256;
    return n;
}

/*
function int8(n){
    var end = -128;
    var start = 127;
    
    if( n >= end && n <= start){
        return n;
    }
    if( n < end){
        n = n+129;
        n = n%256;
        n = start + n;
        return n;
    }
    if( n > start){
        n = n-128;
        n = n%256;
        n = end + n;
        return n;
    }
}


function uint8(n){
    n = n%256;
    return n;
}
*/

function int16(n){
    var end = -32768;
    var start = 32767;
    
    if( n >= end && n <= start){
        return n;
    }
    if( n < end){
        n = n+32769;
        n = n%65536;
        n = start + n;
        return n;
    }
    if( n > start){
        n = n-32768;
        n = n%65536;
        n = end + n;
        return n;
    }
}

function uint16(n){
    n = n%65536;
    return n;
}


function int32(n){
    var end = -2147483648;
    var start = 2147483647;
    
    if( n >= end && n <= start){
        return n;
    }
    if( n < end){
        n = n+2147483649;
        n = n%4294967296;
        n = start + n;
        return n;
    }
    if( n > start){
        n = n-2147483648;
        n = n%4294967296;
        n = end + n;
        return n;
    }
}

// any bit operations to be done in uint32 must have >>> 0
// javascript calculates bitwise in SIGNED 32 bit so you need to convert
function uint32(n){
    n = n%4294967296;
    return n;
}