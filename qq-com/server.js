var http = require('http')
var fs = require('fs')
var url = require('url')
const { mainModule } = require('process')
var port = process.argv[2]

if (!port) {
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有个小可爱发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

  if (path === '/index.html') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    // let string = fs.readFileSync('public/index.html').toString()
    //  const page1 = fs.readFileSync('db/page1.json').toString()
    // const array = JSON.parse(page1)
    // const result = array.map(item=>`<li>${item.id}</li>`).join('')
    // string = string.replace('{{page1}}', `<ul id="xxx">${result}</ul>`)

    response.write(fs.readFileSync('./public/index.html'))
    response.end()
  } else if (path === '/qq.js') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    response.write(fs.readFileSync('public/qq.js'))
    response.end()
  } else if (path === '/friends.json') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json;charset=utf-8')
    response.setHeader('Access-Control-Allow-Origin', 'http://frank.com:9999')
    response.write(fs.readFileSync('public/friends.json'))
    response.end()
  } else if (path === '/friends.js') {
    response.statusCode = 200
    // console.log(query.functionName) 
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8');
    const string = `window['{{xxx}}']({{data}})`
    const data = fs.readFileSync('./public/friends.json').toString();
    const string2 = string.replace('{{data}}', data).replace('{{xxx}}', query.callback)
    response.write(string2)
    response.end()
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`hello world`)
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)