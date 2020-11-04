import React, { useState, MouseEvent } from 'react'
import ReactDOM from 'react-dom';
import Terminal, { ColorMode, LineType } from 'react-terminal-ui';

export const TerminalController = (props = {}) => {







    
    


  const [terminalLineData, setTerminalLineData] = useState([
    {type: LineType.Output, value: 'MariaDB [insightbox]> select * from words where id = "testinsightbox@gmail.com" limit 25;'},
    {type: LineType.Output, value: '+---------------------------+-------------------------+------------------------------------------------------------------+-------+'},
    {type: LineType.Output, value: '| id                        | date                    | text                                                             | value |'},
    {type: LineType.Output, value: '+---------------------------+-------------------------+------------------------------------------------------------------+-------+'},
    {type: LineType.Output, value: '| testinsightbox@gmail.com  | 2020-10-30 00:00:00.000 | ebc569f7e554b22dc05e05389ee3e7557e44389caa83a08a4de6ebd5602dc310 |     3 |'},
    {type: LineType.Output, value: '| testinsightbox@gmail.com  | 2020-10-30 00:00:00.000 | ebc569f7e554b22dc05e05389ee3e7557e44389caa83a08a4de6ebd5602dc310 |     1 |'},
    {type: LineType.Output, value: '| testinsightbox@gmail.com  | 2020-10-31 00:00:00.000 | 0135eca8aee1c767bf4de35ccc4db55cf9b90d6c1853b28a73a38462eef351c3 |     1 |'},
    {type: LineType.Output, value: '| testinsightbox@gmail.com  | 2020-10-31 00:00:00.000 | 01b6c54781d990c78b935699e754a008b9a27f1b1834a1f408b806c0613fe745 |     1 |'},
    {type: LineType.Output, value: '| testinsightbox@gmail.com  | 2020-10-31 00:00:00.000 | 04b90c79485c07230fe5e0326535219332d75cb3702ed51621a2aee6d18f95cd |     1 |'},
    {type: LineType.Output, value: '| testinsightbox@gmail.com  | 2020-10-31 00:00:00.000 | 0a19850025e73a651da35aef5f4823b3f88a27caf47fdf35f4d5c29ab8c77bf7 |     2 |'},
    {type: LineType.Output, value: '| testinsightbox@gmail.com  | 2020-10-31 00:00:00.000 | 182ad35b84effe0301f22167483cff2a6decbe2ac5451cca5b16b44df5655dd9 |     3 |'},
    {type: LineType.Output, value: '| testinsightbox@gmail.com  | 2020-10-31 00:00:00.000 | 183f74a430d3d9f27b9300d7ea3ee9a521bf29eab977845cba8c09aa8f1099f7 |     4 |'},
    {type: LineType.Output, value: '| testinsightbox@gmail.com  | 2020-10-31 00:00:00.000 | 204f8ae8d49a14c62763980fcc2d78ebb07afb953a3675db4237f45ff40fabdb |     8 |'},
    {type: LineType.Output, value: '| testinsightbox@gmail.com  | 2020-10-31 00:00:00.000 | 4025a1c9ff34d4b0e43397d64101c2b2026b0d27c86a2c63691dcce70813b70d |     1 |'},
    {type: LineType.Output, value: '| testinsightbox@gmail.com  | 2020-10-31 00:00:00.000 | 4761e3d229a0d1f64e8db8519f31737290df3b8916c19bf99d1dce2421cdd6b8 |     1 |'},
    {type: LineType.Output, value: '| testinsightbox@gmail.com  | 2020-10-31 00:00:00.000 | 4c6090036480c0a1f9959f622ef320a90f50c04f8b7c2028ae35365a6be06801 |     9 |'},
    {type: LineType.Output, value: '| testinsightbox@gmail.com  | 2020-10-31 00:00:00.000 | 4ece87a416db08f9165bf2764357806f2b3a2514d34ca8bfad1f808e0b3ee3c4 |     3 |'},
    {type: LineType.Output, value: '| testinsightbox@gmail.com  | 2020-10-31 00:00:00.000 | 744fec35d65b4032bde7ee4740565ce82cc41eaf761be103aa1c971b7454f7d8 |     2 |'},
    {type: LineType.Output, value: '| testinsightbox@gmail.com  | 2020-10-31 00:00:00.000 | 79f2a5ba2d8bf18121e8b45605492f9ab7c033eb52475452bc8b32c7a4a50668 |     1 |'},
    {type: LineType.Output, value: '| testinsightbox@gmail.com  | 2020-10-31 00:00:00.000 | c9a4de25c6c46b21a2c6c0964cea1fd36b2ebd7621933f28114c84fdeb826921 |     1 |'},
    {type: LineType.Output, value: '| testinsightbox@gmail.com  | 2020-10-31 00:00:00.000 | d950533d7348a75d3bf47f4eb722f05cb457edc156c1f7501c76d256501c1f99 |     1 |'},
    {type: LineType.Output, value: '| testinsightbox@gmail.com  | 2020-10-31 00:00:00.000 | da979552a576d554784f962a7f4c4d61169b4240974070327d4c53bd5adb3bdb |     1 |'},
    {type: LineType.Output, value: '| testinsightbox@gmail.com  | 2020-10-31 00:00:00.000 | deef533a5bd44d43285ecff4873e27372e28a6e18179e90fa351923c528ba86a |     1 |'},
    {type: LineType.Output, value: '| testinsightbox@gmail.com  | 2020-10-31 00:00:00.000 | f55485362a8c50512da3450c5d7f6ade3df7a06e736e2d85542a6c22b32b1188 |     1 |'},
    {type: LineType.Output, value: '| testinsightbox@gmail.com  | 2020-10-31 00:00:00.000 | fbf8b8f46f91916051efcb91854e904b5bd387a187a7ae76ce31bbbd85cbb468 |     1 |'},
    {type: LineType.Output, value: '| testinsightbox@gmail.com  | 2020-11-01 00:00:00.000 | 07ca0c52f3decf33acc42ef66dc14fbcab01e6b17638e594c6c1389f3a1aef56 |     4 |'},
    {type: LineType.Output, value: '| testinsightbox@gmail.com  | 2020-11-01 00:00:00.000 | 0b27db6e6cce023b0df1346e983a2f2f74de0f974eb9f7b06c80932a83ac2e7c |     1 |'},
    {type: LineType.Output, value: '| testinsightbox@gmail.com  | 2020-11-01 00:00:00.000 | 12a4c5eb2a32452ddff18d9284ce40968abf66bd2e2a6dd81d05ccaa935f6f7b |     3 |'},
    {type: LineType.Output, value: '| testinsightbox@gmail.com  | 2020-11-01 00:00:00.000 | ee3f1de61b5ab7aee646dc23a18ea4548210662734cd676fc77497a2ae610d6d |     1 |'},
    {type: LineType.Output, value: '+---------------------------+-------------------------+------------------------------------------------------------------+-------+'},
    {type: LineType.Output, value: '25 rows in set (0.002 sec)'},
    {type: LineType.Output, value: ''},

  ]);



  // Terminal has 100% width by default so it should usually be wrapped in a container div
  return (
    <div>
      <Terminal name='10.3.22-MariaDB-1ubuntu1 Ubuntu 20.04' prompt='MariaDB [insightbox]>' colorMode={ ColorMode.Dark }  lineData={ terminalLineData } onInput={ terminalInput => console.log(`New terminal input received: '${ terminalInput }'`) }/>
    </div>
  );

};