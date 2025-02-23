(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{349:function(s,a,e){"use strict";e.r(a);var t=e(4),n=Object(t.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("p",[a("a",{attrs:{href:"http://javascript.ruanyifeng.com//",target:"_blank",rel:"noopener noreferrer"}},[s._v("阮一峰-javascript"),a("OutboundLink")],1),s._v(" "),a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/JavaScript",target:"_blank",rel:"noopener noreferrer"}},[s._v("MDN-javascript"),a("OutboundLink")],1)]),s._v(" "),a("h1",{attrs:{id:"语法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#语法"}},[s._v("#")]),s._v(" 语法")]),s._v(" "),a("h4",{attrs:{id:"表达式-expression"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#表达式-expression"}},[s._v("#")]),s._v(" 表达式（expression）")]),s._v(" "),a("p",[s._v("指一个为了得到返回值的计算式，一定会返回一个值。凡是 JavaScript 语言中预期为值的地方，都可以使用表达式。比如，赋值语句的等号右边，预期是一个值，因此可以放置各种表达式。")]),s._v(" "),a("h4",{attrs:{id:"语句"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#语句"}},[s._v("#")]),s._v(" 语句")]),s._v(" "),a("p",[s._v("为了进行某种操作，一般情况下不需要返回值,语句以分号结尾，一个分号就表示一个语句结束。多个语句可以写在一行内。")]),s._v(" "),a("h4",{attrs:{id:"运算符"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#运算符"}},[s._v("#")]),s._v(" 运算符")]),s._v(" "),a("p",[s._v("主要用于连接简单的表达式、组成一个复杂的表达式"),a("br"),s._v(" "),a("strong",[s._v("加法运算符(+)")]),s._v(" "),a("strong",[s._v("有拼接、连接的意思")]),a("br"),s._v("\n加法运算符是在运行时决定，到底是执行相加，还是执行连接。也就是说，运算子的不同，导致了不同的语法行为，这种现象称为“重载”（overload）。由于加法运算符存在重载，可能执行两种运算，使用的时候必须很小心。")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('"10"+5=15 //  拼接（特殊）\ntrue + true // 2 允许非数值的相加，布尔值都会自动转成数值，然后再相加。\ntrue + true // 2 允许非数值的相加\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[a("strong",[s._v("其他算数运算符(-)")]),a("br"),s._v("\n其他算术运算符（比如减法、除法和乘法）都不会发生重载。它们的规则是：所有运算子一律转为数值，再进行相应的数学运算。")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("1 - '2' // -1\n1 * '2' // 2\n1 / '2' // 0.5\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[a("strong",[s._v("自增和自减运算符")]),a("br"),s._v("\n自增和自减运算符有一个需要注意的地方，就是放在变量之后，会先返回变量操作前的值，再进行自增/自减操作；放在变量之前，会先进行自增/自减操作，再返回变量操作后的值。")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("var x = 1;\nvar y = 1;\nx++ // 1\nconsole.log(x) // 2\n++y // 2\nconsole.log(y) //2\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),a("p",[a("strong",[s._v("布尔运算符")]),s._v("\n布尔运算符用于将表达式转为布尔值，一共包含四个运算符。("),a("em",[s._v("注意：不完全转换为布尔值")]),s._v(")")]),s._v(" "),a("ul",[a("li",[s._v("&& (与)：如果第一个运算子的布尔值为 true，则返回第二个运算子的值（注意是值，不是布尔值）；如果第一个运算子的布尔值为 false，则直接返回第一个运算子的值，且不再对第二个运算子求值。可以取代 if 结构\n"),a("ul",[a("li",[s._v("可以用于检测或判断是否满足条件 "),a("code",[s._v('"判断"&&alert("触发")')])]),s._v(" "),a("li",[s._v("// ...")])])]),s._v(" "),a("li",[s._v("|| (或)：如果第一个运算子的布尔值为 true，则返回第一个运算子的值，且不再对第二个运算子求值；如果第一个运算子的布尔值为 false，则返回第二个运算子的值。\n"),a("ul",[a("li",[s._v("可以用于初始化值，"),a("code",[s._v("var a;a=a||100 //如果a没有赋值的话则会被初始化值为100")])]),s._v(" "),a("li",[s._v("待添加")])])]),s._v(" "),a("li",[s._v("!(非)：也叫取反运算符，将布尔值变为相反值，不管什么类型的值取反运算后，都变成了布尔值。\n"),a("ul",[a("li",[s._v('如果对一个值连续做两次取反运算，等于将其转为对应的布尔值 ==!!"将此转换为 true 布尔值"==')]),s._v(" "),a("li",[s._v("待添加")])])]),s._v(" "),a("li",[s._v("?:(三元运算符)")])]),s._v(" "),a("h3",{attrs:{id:"相等运算-符判断规则"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#相等运算-符判断规则"}},[s._v("#")]),s._v(" 相等运算(==)符判断规则")]),s._v(" "),a("ul",[a("li",[s._v("如果两个值类型相同，则执行严格相等的运算")]),s._v(" "),a("li",[s._v("如果两个值的类型不同\n"),a("ol",[a("li",[s._v("如果一个是 null，一个是 undefined，那么相等")]),s._v(" "),a("li",[s._v("如果一个是数字，一个是字符串，先将字符串转为数字，然后比较")]),s._v(" "),a("li",[s._v("如果一个值是 true/false 则将其转为 1/0 比较")]),s._v(" "),a("li",[s._v("如果一个值是对象，一个是数字或字符串，则尝试使用 valueOf 和 toString 转换后比较")]),s._v(" "),a("li",[s._v("其它就不相等了")])])])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('null==undefined //true\nNaN==NaN    //false\n"1"==true   //true\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("h3",{attrs:{id:"操控语句"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#操控语句"}},[s._v("#")]),s._v(" 操控语句")]),s._v(" "),a("p",[a("strong",[s._v("switch")])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('var a="s"\nswitch(true){   //判断\n  case a>80:    //判断\n    console.log("优秀") //执行\n    break;  //跳出循环\n  case a>60:\n    console.log("及格")\n    break;\n  case a<60:\n    console.log("不及格")\n    break;\n  default:  //其他\n    console.log("异常")\n}\n注意：\ncase结尾有：分号\nbreak;  //跳出循环\ndefault:  //以上case条件都不满足则执行\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br")])]),a("p",[a("strong",[s._v("while 永久循环")])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("var i=0;\nwhile(i<10){ //括号里的表达式为true的话则永久执行大括号\n  console.log(i);\n  i++;\n}\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("p",[a("strong",[s._v("while 先执行再循环")])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("var i=0;\ndo{\n  i++;\n  console.log(i)\n}while(i<10)\n}\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),a("p",[a("strong",[s._v("条件执行 for 语句")])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("for(var i=0;i<10;i++){console.log(i)}\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[a("strong",[s._v("break 跳出循环，后面不再做循环")]),a("br"),s._v(" "),a("strong",[s._v("continue 跳过本次循环")])]),s._v(" "),a("h1",{attrs:{id:"函数"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#函数"}},[s._v("#")]),s._v(" 函数")]),s._v(" "),a("ul",[a("li",[s._v("函数声明 function a(){}")]),s._v(" "),a("li",[s._v("函数表达式 var a=function(){}")]),s._v(" "),a("li",[s._v("立刻执行的函数表达式 (function(){})()")]),s._v(" "),a("li",[s._v("匿名函数(没有名字的函数) function(){}")]),s._v(" "),a("li",[s._v("回调函数 function1(function2){} //一般异步任务会用到")]),s._v(" "),a("li",[s._v("函数节流 //用 setTimeout 来实现，具体谷歌")])]),s._v(" "),a("h1",{attrs:{id:"定时器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#定时器"}},[s._v("#")]),s._v(" 定时器")]),s._v(" "),a("h3",{attrs:{id:"settimeout"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#settimeout"}},[s._v("#")]),s._v(" setTimeout")]),s._v(" "),a("p",[s._v("延迟 x 秒执行")]),s._v(" "),a("h3",{attrs:{id:"setinterval"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#setinterval"}},[s._v("#")]),s._v(" setInterval")]),s._v(" "),a("p",[s._v("每 x 秒执行一次")]),s._v(" "),a("h1",{attrs:{id:"对象"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#对象"}},[s._v("#")]),s._v(" 对象")]),s._v(" "),a("p",[s._v("delete obj.name //delete 命令用于删除对象的属性，删除成功后返回 true。\nObject.keys(obj); //查看所有属性(并非属性的值)")]),s._v(" "),a("h1",{attrs:{id:"json"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#json"}},[s._v("#")]),s._v(" JSON")]),s._v(" "),a("p",[s._v("JSON.parse(obj) //方法用于将 JSON 字符串转化成对象。\nJSON.stringify(obj) //方法用于将对象转为字符串。该字符串符合 JSON 格式，并且可以被 JSON.parse 方法还原。")]),s._v(" "),a("h1",{attrs:{id:"数组"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#数组"}},[s._v("#")]),s._v(" 数组")]),s._v(" "),a("ul",[a("li",[s._v('arr.push("") //方法将一个或多个元素添加到数组的末尾，并返回新数组的长度。')]),s._v(" "),a("li",[s._v("arr.pop() //方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。")]),s._v(" "),a("li",[s._v('arr.unshift("") //方法将一个或多个元素添加到数组的开头，并返回新数组的长度。')]),s._v(" "),a("li",[s._v("shift() 方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。")]),s._v(" "),a("li",[s._v("arr.splice(索引，个数(0 为添加)，数组元素)方法通过删除现有元素和/或添加新元素来更改一个数组的内容。返回值为删除元素的数组，没删除则返回空数组")]),s._v(" "),a("li",[s._v("arr.slice()")]),s._v(" "),a("li",[s._v('arr.join("") //方法将一个数组的所有元素连接成一个字符串并返回这个字符串。')]),s._v(" "),a("li",[s._v("arr.reverse() //数组倒序")]),s._v(" "),a("li",[s._v("arr.sort() //数组排序，默认排序顺序是根据字符串 Unicode 码点。")])]),s._v(" "),a("h1",{attrs:{id:"es5-数组拓展"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#es5-数组拓展"}},[s._v("#")]),s._v(" "),a("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/34138332?group_id=952578046214070272",target:"_blank",rel:"noopener noreferrer"}},[s._v("ES5 数组拓展"),a("OutboundLink")],1)]),s._v(" "),a("ul",[a("li",[s._v("Array.isArray(obj) //判断函数是不是一个数组，返回布尔值")]),s._v(" "),a("li",[s._v(".indexOf(element) //数组中从左到右查询指定元素，返回该元素索引，没找到返回-1")]),s._v(" "),a("li",[s._v(".lastIndexOf(elemrnt) 数组中从右到左查询指定元素，返回该元素索引，没找到返回-1")]),s._v(" "),a("li",[s._v(".forEach() //遍历数组，参数为一个回调函数，回调函数的三个参数：1.当前元素 2.当前元素索引值 3.整个数组，无返回值")]),s._v(" "),a("li",[s._v(".map() //与 forEach 类似，区别在返回值，回调函数返回值组成一个新数组返回，新数组索引结构和原数组一致，原数组不变")]),s._v(" "),a("li",[s._v(".every() //参数为回调函数，回调函数返回布尔值，每个回调函数都返回 true 的时候才是 true，当遇到 false 终止执行并返回 false")]),s._v(" "),a("li",[s._v(".some() //参数为回调函数，回调函数返回布尔值，有一个回调函数都返回 true 的时候终止执行并返回 true。")]),s._v(" "),a("li",[s._v(".filter() //返回数组的一个子集，回调函数用于逻辑判断是否返回，返回 true 则把当前元素加入到返回数组中，false 则不加新数组只包含返回 true 的值，索引缺失的不包括，原数组保持不变.")]),s._v(" "),a("li",[s._v(".reduce() //遍历数组，调用回调函数，将数组元素组合成一个值，reduce 从索引最小值开始，reduceRight 反向，方法有两个参数\n"),a("ul",[a("li",[s._v("回调函数：把两个值合为一个，返回结果")]),s._v(" "),a("li",[s._v("value，一个初始值,可选")])])])]),s._v(" "),a("h1",{attrs:{id:"函数节流-throttle-和-debounce"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#函数节流-throttle-和-debounce"}},[s._v("#")]),s._v(" 函数节流 （throttle 和 "),a("a",{attrs:{href:"http://js.jirengu.com/tacohunahe/1/edit?js,output",target:"_blank",rel:"noopener noreferrer"}},[s._v("debounce"),a("OutboundLink")],1),s._v("）")]),s._v(" "),a("h1",{attrs:{id:"string"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#string"}},[s._v("#")]),s._v(" String")]),s._v(" "),a("ul",[a("li",[s._v(".charAt(0) //获取第一个字符串")]),s._v(" "),a("li",[s._v(".charCodeAt(0) //获取第一个字符串的 Unicode 编码")]),s._v(" "),a("li",[s._v(".substr(1,2) //截取字符串，第一个是初始位置，第二个是长度")]),s._v(" "),a("li",[s._v(".substring(1,5)//截取字符串，第一个是初始位置，第二个是结束位置")]),s._v(" "),a("li",[s._v(".slice(1,5) //与.substring 一样，允许负数")]),s._v(" "),a("li",[s._v(".split() 方法使用指定的分隔符字符串将一个 String 对象分割成字符串数组\n查找")]),s._v(" "),a("li",[s._v(".search('') 返回索引，找不到为-1")]),s._v(" "),a("li",[s._v('replace("要替换的元素"，"替换成") 修改元素')])]),s._v(" "),a("h1",{attrs:{id:"math"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#math"}},[s._v("#")]),s._v(" Math")]),s._v(" "),a("ul",[a("li",[s._v("Math.round() //返回参数的四舍五入")]),s._v(" "),a("li",[s._v("Math.abs() //返回参数的绝对值")]),s._v(" "),a("li",[s._v("Math.max() / Math.min()")]),s._v(" "),a("li",[s._v("Math.floor//方法返回小于参数值的最大整数(向下取整)")]),s._v(" "),a("li",[s._v("Math.ceil() //方法返回大于参数值的最小整数(向上取整)")]),s._v(" "),a("li",[s._v("Math.pow() //方法返回以第一个参数为底数、第二个参数为幂的指数值")]),s._v(" "),a("li",[s._v("Math.sqrt() //返回参数的平方根")]),s._v(" "),a("li",[s._v("Math.random() //该方法返回 0 到 1 之间的一个伪随机数，可能等于 0，但是一定小于 1")])]),s._v(" "),a("h1",{attrs:{id:"date"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#date"}},[s._v("#")]),s._v(" Date")]),s._v(" "),a("ul",[a("li",[s._v("Date.now() //方法返回当前距离 1970 年 1 月 1 日 的毫秒数")]),s._v(" "),a("li",[s._v("Date.parse() //方法用来解析，返回距离 YYYY-MM-DDTHH:mm:ss.sssZ(Z 代表时区，可选)的毫秒数")])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('var d=new Date()\nconsole.log(""+d.getFullYear()+ //年\n            "-"+(d.getMonth()+1)+ //月\n            "-"+d.getDate()+ //日\n            ":"+d.getHours()+ //时\n            ":"+d.getMinutes()+ //分\n            ":"+d.getSeconds()+ //秒\n            ":"+d.getMilliseconds() //毫秒\n           )\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br")])]),a("h1",{attrs:{id:"this-call-apply-bind"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#this-call-apply-bind"}},[s._v("#")]),s._v(" this call&apply&bind")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("var name='one'\nvar obj={\n    name:'two'\n}\nfunction fn(a,b){\n    console.log(a+b)\n    conosle.log(this.name)\n}\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("ul",[a("li",[s._v("fn().call(obj,1,2) 执行函数遇到 this 就指向 obj")]),s._v(" "),a("li",[s._v("fn().apply(obj,[1,2]) 执行函数遇到 this 就指向 obj,与上面写法一样，传递参数方式不同")]),s._v(" "),a("li",[s._v("fn().bind(obj) 不执行函数，返回函数，this 指向 obj")])])])}),[],!1,null,null,null);a.default=n.exports}}]);