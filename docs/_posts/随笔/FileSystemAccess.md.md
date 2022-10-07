-  showOpenFilePicker() 获取文件句柄
-  showSaveFilePicker() 保存文件句柄
-  getFile() //获取文件内容

```js
let study = async () => {
    let fileHandle;
    [fileHandle] = await window.showOpenFilePicker()
    const fileBlob = await fileHandle.getFile()
	console.log(await fileBlob.text())

    // createWritable()创建一个可写流对象WritableStream
    const writable = await fileHandle.createWritable();
    // 通过管道将数据传输到文件,write支持流的
    await writable.write('contents');
    // 管道使用完毕后需要关闭
    await writable.close();
}
```

```js
let study = async () => {
    const options = {
        types: [
            {
                description: "Hello File Access Api",
                accept: {
                    'text/plain': ['.txt'],
                },
            },
        ],
    };

    return await window.showSaveFilePicker(options);


}
```

## 参考
- [file-system-access文档](https://web.dev/file-system-access/#creating-or-accessing-files-and-folders-in-a-directory)
- [封装库browser-fs-access](https://github.com/GoogleChromeLabs/browser-fs-access)
- [不错的文章](https://juejin.cn/post/6991277058278047751#heading-2)


