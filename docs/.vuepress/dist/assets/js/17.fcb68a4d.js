(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{154:function(a,t,r){"use strict";r.r(t);var e=r(0),n=Object(e.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var a=this,t=a.$createElement,r=a._self._c||t;return r("div",{staticClass:"content"},[r("h1",{attrs:{id:"安装"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#安装","aria-hidden":"true"}},[a._v("#")]),a._v(" 安装")]),a._v(" "),r("ul",[r("li",[a._v("npm install typescript@2.9.2 -g   ————安装ts")]),a._v(" "),r("li",[a._v("npm install ts-node@7.0.0 -g      ————让nodejs支持ts")])]),a._v(" "),r("h1",{attrs:{id:"类型"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#类型","aria-hidden":"true"}},[a._v("#")]),a._v(" 类型")]),a._v(" "),r("ul",[r("li",[a._v("参数类型\n"),r("ul",[r("li",[a._v("在参数名称后面后面使用冒号来指定参数的类型")])])]),a._v(" "),r("li",[a._v("默认参数\n"),r("ul",[r("li",[a._v("在参数声明后面用等号来指定参数的默认值")])])]),a._v(" "),r("li",[a._v("可选参数\n"),r("ul",[r("li",[a._v("在方法的参数声明后面用问号来标明此参数为可选参数")])])])]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v('参数类型\nvar a:any //任何类型\nvar b:number //数字类型\nvar c:boolean // 布尔类型\nfunction test():void{} //不能用任何返回值\n\n在哪声明类型\nvar a:string //在变量中声明类型\nfunction a():string //在方法（函数）中声明返回值类型\nfunction a(name:string) 在参数中声明类型 调用的时候用a("字符串调用")\n')])])]),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("默认参数\nfunction test(a:string, b, c:string=\"asd\") { //默认参数一定要放在最后面\n    console.log(a)\n    console.log(b)\n    console.log(c)\n}\ntest('aaa', 'bbb', 'ccc')\ntest('aaa', 'bbb')\n")])])]),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("可选参数\nfunction test(a:string, b?:string, c:string=\"asd\") { //可选参数一定要放在最后面\n    console.log(a)\n    console.log(b)\n    console.log(c)\n}\ntest('aaa')\n")])])]),r("ul",[r("li",[r("h3",{attrs:{id:"推断机制"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#推断机制","aria-hidden":"true"}},[a._v("#")]),a._v(" 推断机制")])])]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("var a=123 // 第一次推断a为数字类型\na='abc' //错误，\n")])])]),r("h1",{attrs:{id:"类型转换"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#类型转换","aria-hidden":"true"}},[a._v("#")]),a._v(" 类型转换")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("//数值转字符串\nlet num: number = 123123\nlet str: string = num.toString()\nconsole.log(typeof str, str)\n//字符串转数值\nlet str2: string = '123321'\nlet num2: number = parseInt(str2)\nconsole.log(typeof num2, num2)\n// 对象转字符串\nlet obj:object={'name':'jey','age':'16','id':13212}\nlet str3:string=JSON.stringify(obj)\nconsole.log(typeof str,str3)\n// 字符串转对象\nvar obj2:object=JSON.parse(str3)\nconsole.log(typeof obj2,obj2)\n")])])]),r("h1",{attrs:{id:"函数新特性"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#函数新特性","aria-hidden":"true"}},[a._v("#")]),a._v(" 函数新特性")]),a._v(" "),r("ul",[r("li",[r("h3",{attrs:{id:"rest-and-spread-操作符-args"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#rest-and-spread-操作符-args","aria-hidden":"true"}},[a._v("#")]),a._v(" Rest and Spread 操作符 (...args)")]),a._v(" "),r("ul",[r("li",[a._v("用来声明任意数量的方法参数")]),a._v(" "),r("li",[a._v("主要用于：把任意长度的数组转化成一个固定数量参数方法的调用")])])])]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("function test(...arg) {\n    console.log(arg)\n}\ntest(1,2,3)\n")])])]),r("ul",[r("li",[r("h3",{attrs:{id:"generator-函数"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#generator-函数","aria-hidden":"true"}},[a._v("#")]),a._v(" generator 函数")]),a._v(" "),r("ul",[r("li",[a._v("控制函数的执行过程，手工暂停和恢复代码执行")]),a._v(" "),r("li",[a._v("使用.next()方法调用执行下一个yield")]),a._v(" "),r("li",[a._v("每个.next()将执行函数内部yield断点")])])])]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("function* doSomething() {\n    console.log('start')\n    yield\n    console.log('finish')\n}\nvar func1 = doSomething()\n\ndocument.querySelector('html').onclick = function () {\n    func1.next()\n}\n")])])]),r("ul",[r("li",[r("h3",{attrs:{id:"destructuring-析构表达式"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#destructuring-析构表达式","aria-hidden":"true"}},[a._v("#")]),a._v(" destructuring 析构表达式")]),a._v(" "),r("ul",[r("li",[a._v("通过表达式将对象或数组拆解成任意数量的变量")])])])]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("把对象里的值才出来放到本地变量里\nfunction test(){\n    return {\n        a: 111,\n        b: 'abc',\n        c: {\n            c1: 'c1c1c1',\n            c2: 'c2c2c2'\n        }\n    }\n}\nvar { a, b, c: { c2 } } = test()\nconsole.log(a,b,c2)\n\n把数组里的值拆分成变量放到本地\nvar arr = [1, 2, 3, 4, 5, 6, 7]\nvar [num1, ,num2, ...other] = arr\nconsole.log(num1,num2,other)\n")])])]),r("h1",{attrs:{id:"表达式和循环"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#表达式和循环","aria-hidden":"true"}},[a._v("#")]),a._v(" 表达式和循环")]),a._v(" "),r("ul",[r("li",[r("h3",{attrs:{id:"箭头函数"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#箭头函数","aria-hidden":"true"}},[a._v("#")]),a._v(" 箭头函数")]),a._v(" "),r("ul",[r("li",[a._v("用来声明匿名函数，消除传统匿名函数的this指针问题")])])])]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("var sum = (arg1, arg2) => arg1 + arg2 //方法里面只有一行是不用写大括号和return关键字\nvar sum= arg1 => console.log(arg1) //只有一个参数的话不需要括号\nvar sum= () => console.log('没有尝试不') //不需要参数用（）表示\n\nvar arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]\nconsole.log(arr.filter(value=>value%2==0)) //最常见的用法\n")])])]),r("ul",[r("li",[r("h3",{attrs:{id:"for-of"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#for-of","aria-hidden":"true"}},[a._v("#")]),a._v(" for of")])])]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9,'test']\narr.attribute = '我是属性'\nfor (var n of arr) {\n    if (n>3) break //与for in区别在于循环可以中断\n    console.log(n)\n}\n\n\n还可以用在字符串上\nfor (n of '你好呀，jey') {\n    console.log(n)\n}\n\n")])])]),r("h1",{attrs:{id:"面向对象"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#面向对象","aria-hidden":"true"}},[a._v("#")]),a._v(" 面向对象")]),a._v(" "),r("ul",[r("li",[r("h3",{attrs:{id:"控制符"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#控制符","aria-hidden":"true"}},[a._v("#")]),a._v(" 控制符")]),a._v(" "),r("ul",[r("li",[a._v("public 公有（默认）")]),a._v(" "),r("li",[a._v("private 私有，只能在类的内部访问")]),a._v(" "),r("li",[a._v("protectes 受保护，可以在类的内部和子类访问")])])]),a._v(" "),r("li",[r("h3",{attrs:{id:"接口————interface-低配版的类，这是做一个约束"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#接口————interface-低配版的类，这是做一个约束","aria-hidden":"true"}},[a._v("#")]),a._v(" 接口————interface  //低配版的类，这是做一个约束")])]),a._v(" "),r("li",[r("h3",{attrs:{id:"声明类的静态属性————static"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#声明类的静态属性————static","aria-hidden":"true"}},[a._v("#")]),a._v(" 声明类的静态属性————static")])]),a._v(" "),r("li",[r("h3",{attrs:{id:"类"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#类","aria-hidden":"true"}},[a._v("#")]),a._v(" 类")]),a._v(" "),r("ul",[r("li",[a._v("把类当做接口使用，类是高配版的接口")]),a._v(" "),r("li")])]),a._v(" "),r("li",[r("h3",{attrs:{id:"constructor方法"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#constructor方法","aria-hidden":"true"}},[a._v("#")]),a._v(" constructor方法")]),a._v(" "),r("ul",[r("li",[a._v("只有new实例化的时候类里面的constructor方法才会被调用，没实例化一次则调用一次")]),a._v(" "),r("li",[a._v("子类构造函数必须调用父类构造函数，用super来调用")]),a._v(" "),r("li",[a._v("可以在参数加public声明属性，用this调用")])])])]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("class person{\n    constructor(public name) { } //可以这样写声明一个name属性\n    say() { console.log(this.name) }\n}\nvar a=new person('jey')\n")])])]),r("ul",[r("li",[r("h3",{attrs:{id:"继承extends"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#继承extends","aria-hidden":"true"}},[a._v("#")]),a._v(" 继承extends")]),a._v(" "),r("ul",[r("li",[a._v("要求：继承一个类的时候必须在constructor方法里面加super()")]),a._v(" "),r("li")])])]),a._v(" "),r("h1",{attrs:{id:"模块"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#模块","aria-hidden":"true"}},[a._v("#")]),a._v(" 模块")]),a._v(" "),r("p",[a._v("export 暴露属性，方法，类\nimport 引入属性，方法，类")])])}],!1,null,null,null);n.options.__file="typescript.md";t.default=n.exports}}]);