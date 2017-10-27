'use strict'

const R = require('ramda')
const fs = require('fs')
const http = require('http')
const url  = require('url')
const path = require('path')
const os = require('os')

const compose = R.compose
const curry = R.curry
// const curriedJoinPath = curry((x, y) => path.join(x, y))

// 从命令行参数获取root目录，默认是当前目录
const root = path.resolve(process.argv[2] || '.')

console.log('Static root dir: ', root)

const respondFile = (filepath, request, response) => {
    console.log('200 ' + request.url)
    response.writeHead(200)
    fs.createReadStream(filepath).pipe(response)
}

const respond404 = response => {
    response.writeHead(404)
    response.end('404 NOT Found')
}

const handleFsStat = (filepath, request, response) => {
    fs.stat(filepath, (err, stats) => {
        if (!err && stats.isFile()) {
            respondFile(filepath, request, response)
        } else {
            console.log('404 ' + request.url)
            respond404(response)
        }
    })
} 

const getIPv4 = () => {
    const interfaces = os.networkInterfaces()
    let ipv4 = []
    Object.keys(interfaces).forEach(key => {
        interfaces[key].forEach(x => {
            if ('IPv4' !== x.family || x.internal !== false)
                return
            ipv4.push(x.address)
            console.log(key + '--' + x.address)
        })
    })
    return ipv4[0]
}

// 创建服务器
const server = http.createServer((request, response) => {
    const pathname = url.parse(request.url).pathname
    console.log('pathname: ', pathname)
    let filepath = path.join(root, pathname)
    if (pathname.endsWith('/')) {
        try {
            filepath = path.join(root, pathname, 'index.html')
            if (fs.statSync(filepath).isFile) {
                respondFile(filepath, request, response)
            } else {
                filepath = path.join(root, pathname, 'default.html')
                if (fs.statSync(filepath).isFile) {
                    respondFile(filepath, request, response)
                } else {
                    respond404(response)
                }
            }
        } catch (err) {
            console.log(err)
            respond404(response)
        }
    } else {
        handleFsStat(filepath, request, response)
    }
    // filepath = path.join(root, pathname)
})

// server.listen(8080, '0.0.0.0')
server.listen(8080, getIPv4())

// 解析当前目录：
// const workDir = path.resolve('.')

// 组合完整的文件路径：当前目录+'pub'+'index.html':
// const filePath = path.join(workDir, 'pub', 'index.html')

// console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'))

console.log('Server is running at ' + getIPv4() + ':8080')