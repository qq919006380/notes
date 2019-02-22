# Promise

### ajax
```javascript
$.ajax({
    url:'./data.json',
    method:'get',
}).then((success)=>{
    console.log(success)
},(fail)=>{
    console.log(fail)
})
```
## axios
```javascript
axios.get('/data.json')
.then((response)=> {
    console.log(response);
},(error)=>{
    console.log(error)
})
```
- 第一个then的第一个回调函数是成功，第二个回调函数是失败
- 第二个then的第一个回调函数是第一个then的成功回调函数的return，第二个回调是第一个then的失败回调函数的return
- 

# async

- test
- 