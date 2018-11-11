# 基础
options vue object——new Vue({})
- el： dom元素对象
    - "#DomObj"
    - document.querySelector('#DomObj') //更为优化，避免了vue判断查询
- template：模板或调用组件
- data：数据
    - data:{key:"数据"}   //可选
    - data:function(){return{key:"数据"}} //可选
- methods 	// 在 `methods` 对象中定义方法
- components:{}     //声明组件
- watch		//监控数据
	- 深度监控
	- obj:{deep:true,handler:function(a){console.log(a.data)}}
- cumputed 监事多个数据
# 指令
- v-text    //innertext
- v-html    //innerHtml
- v-model	//双向绑定（一般用在input[text] ）
- - v-bind 给元素的属性赋值 (单向绑定)
    - v-bind:'atrr="value"
    - 简写 :atrr="value"
- if-else 判断,以下三个指令必须是相邻的DOM，（删除DOM元素）
    - v-if
    - v-else-if
    - v-else
- v-show (隐藏DOM元素)

- v-on 给元素添加事件
    - v-on:click='on'
    - 简写 @click='on'
- 'v-for
    - 数组(item,index) in item
    - 对象(key,value,index) in items
# 组件 component
-   父组件通过 props 向下传递数据给子组件
- 子组件通过 events 给父组件发送消息

### 全局组件
Vue.component('componentName',templateName)
### 插槽slot
vue提供的内置组件<slot></slot>用于占位给子组件传递DOM给父组件
### 具名插槽slot
如果父组件有多个插槽可以用名字分类<slot name='one'></slot> 调用的时候就<div slot='one'></div>

# 过滤器（管道）
```javascript
Vue.filter('dataReverse',(data)=>{
    return data.split('').reverse().join('')
})
```

# 生命周期(事件函数)
### 组件加载触发
- beforeCreate——组件加载完成前触发
- created————组件加载完成触发
	- 应用场景：触发ajax请求
### 页面加载触发
- beforeMount——页面加载前触发
- mounted————页面加载完成后触发
### 页面数组更改时触发
- beforeUpdate——页面数据发生更改前触发
- updated————页面数据发生更改后触发
### 组件销毁的时候触发（v-if）
- beforeDestroy——销毁前
- destroyed————销毁后
