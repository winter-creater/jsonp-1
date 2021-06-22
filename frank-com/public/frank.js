// window.xxx=(data)=>{
//     console.log(data)
// }
// window.xxx回调函数，friends.js调用
// 优化
// const random='frankJSONPCallbackName'+Math.random()
// console.log(random)
// window[random]=(data)=>{
//     console.log(data)
// }
// const script=document.createElement('script')
// script.src=`http://qq.com:8888/friends.js?functionName=${random}`
// script.onload=()=>{
//     script.remove()
// }
// document.body.appendChild(script)
// 封装
function jsonp(url) {
    return new Promise((resolve, reject) => {
        const random = 'frankJSONPCallbackName' + Math.random()
        console.log(random)
        window[random] = (data) => {
            resolve(data)
        }
        const script = document.createElement('script')
        script.src = `${url}?callback=${random}`//callback是jsonp的functionName叫法
        script.onload = () => {
            script.remove()
        }
        script.onerror = () => {
            reject()
        }
        document.body.appendChild(script)
    })
}

jsonp('http://qq.com:8888/friends.js')
    .then((data) => {
        console.log(data)
    })