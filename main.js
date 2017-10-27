'use strict'

const R = require('ramda')
const fs = require('fs')
// const greet = require('./hello')

// const s = 'Michael'

// greet(s)

// process.nextTick(() => {
//     console.log('nextTick callback!')
// })

// console.log('nextTick was set!')

// process.on('exit', (code = '001') => {
//     console.log('about to exit with code: ' + code)
// })

// if (typeof(window) === 'undefined') {
//     console.log('node.js')
// } else {
//     console.log('browser')
// }

// fs.readFile('./sample.txt', 'utf-8', (err, data) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('fs1: ', data)
//     }
// })

// fs.readFile('./sample.txt', (err, data) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('fs2: ', data)
//         console.log('data.length: ' + data.length + ' bytes')
//         const text = data.toString('utf-8')
//         console.log('text', text)
//         const buf = Buffer.from(text, 'utf-8')
//         console.log('buf', buf)
//     }
// })

// try {
//     const readFileSync = R.curry(fs.readFileSync)
//     const readUtf8File = readFileSync(R.__, 'utf-8')
//     const logFs3 = R.compose(console.log, R.concat('fs3: '), readUtf8File)
//     logFs3('./sample.txt')
    
// } catch (err) {
//     console.log('readFileSync error')
// }

// try {
//     const data = 'Hello, Node.js!!!!!!!!!!!!!!!'

//     const curriedWriteFile = R.curry(fs.writeFile)(R.__, R.__, null, err => {
//         if (err) {
//             console.log('err: ', err)
//         } else {
//             console.log('WRITE ok!!!!!')
//             fs.stat('./sample.txt', (err, stat) => {
//                 if (err) {
//                     console.log(err)
//                 } else {
//                     console.log('isFile: ' + stat.isFile())
//                     console.log('isDirectory: ' + stat.isDirectory())
//                     if (stat.isFile()) {
//                         console.log('size: ' + stat.size)
//                         console.log('birth time: ' + stat.birthtime)
//                         console.log('modified time' + stat.mtime)
//                     }
//                 }
//             })
//         }
//     })
//     curriedWriteFile('./sample.txt', data)
    // fs.writeFile('./sample.txt', data, (err) => {
    //     if (err) {
    //         console.log('WRITE failed!!!!!')
    //     } else {
    //         console.log('WRITE ok!!!!!')
    //     }
    // })
    // const writeFile = func(R.__, R.__, (err) => {
    //     if (err) {
    //         console.log('write failed!!!!!')
    //     } else {
    //         console.log('write ok!!!!!')
    //     }
    // })('./sample.txt', data)
    // const writeToSampleFile = writeFile('./sample.txt')
    // writeToSampleFile(data)
// } catch (err) {
//     console.log('write file failed, err: ', err)
// }

const rs = fs.createReadStream('./sample.txt', 'utf-8')
rs.on('data', chunk => {
    console.log('DATA: ', chunk);
})
rs.on('end', () => {
    console.log('END');
})
rs.on('error', err => {
    console.log('ERROR: ', err);
})

// const ws1 = fs.createWriteStream('./output1.txt', 'utf-8')
// ws1.write('使用Stream写入文本数据...\n')
// ws1.write('END.')
// ws1.end()

// const ws2 = fs.createWriteStream('./output2.txt')
// ws2.write(new Buffer('使用Stream写入文本数据...\n', 'utf-8'))
// ws2.write(new Buffer('NED.', 'utf-8'))
// ws2.end()

const ws = fs.createWriteStream('./copied.txt')

rs.pipe(ws)