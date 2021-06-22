const request=new XMLHttpRequest()
request.open('Get','http://qq.com:8888/friends.json')
request.onreadystatechange=()=>{
    if(request.readyState===4){
        if(request.status>=200 && request.status<300){
            console.log(request.response)
        }else{
            alert('加载用户失败')
        }
    }
}
request.send()