(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{388:function(t,a,s){"use strict";s.r(a);var n=s(4),e=Object(n.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"原则"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#原则"}},[t._v("#")]),t._v(" 原则")]),t._v(" "),a("ul",[a("li",[t._v("（对内）分层原则：正交原则\n"),a("ul",[a("li",[t._v("html 结构层分离  css  样式层分离   js 行为层分离")]),t._v(" "),a("li",[t._v("例如：使用$div.addClass,不使用$div.show")])])]),t._v(" "),a("li",[t._v("（对外）封装原则：面向接口原则\n"),a("ul",[a("li",[t._v("用户如何调用？\n"),a("ul",[a("li",[t._v("先想好输入，输出，在写中间逻辑")]),t._v(" "),a("li",[t._v("能不用接口最好不用接口")])])])])])]),t._v(" "),a("h3",{attrs:{id:"步骤"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#步骤"}},[t._v("#")]),t._v(" 步骤")]),t._v(" "),a("p",[t._v("需求,UI,代码,测试")]),t._v(" "),a("h3",{attrs:{id:"思路"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#思路"}},[t._v("#")]),t._v(" 思路")]),t._v(" "),a("p",[t._v("如果需要渲染不知道长度的东西，可以考虑"),a("strong",[t._v("递归")]),t._v("。")]),t._v(" "),a("h2",{attrs:{id:"vue组件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue组件"}},[t._v("#")]),t._v(" VUE组件")]),t._v(" "),a("p",[t._v("vue组件主要由prop、event、slot着三部分构成其中")]),t._v(" "),a("ul",[a("li",[t._v("prop 定义了这个组件有哪些可配置的属性,prop最好使用对象的写法\n"),a("ul",[a("li",[t._v("default 组件的默认值")]),t._v(" "),a("li",[t._v("validator函数 对值进行自定义验证")])])]),t._v(" "),a("li",[t._v("slot，它可以分发组件的内容\n"),a("ul",[a("li",[t._v("当需要多个插槽时，会用到具名 slot")])])]),t._v(" "),a("li",[t._v("自定义事件 event")])]),t._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("methods")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("handleClick")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("event")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("$emit")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'on-click'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" event"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br")])]),a("p",[t._v("通过 $emit，就可以触发自定义的事件 on-click ，在父级通过 @on-click 来监听：")]),t._v(" "),a("div",{staticClass:"language-html line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("i-button")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@on-click")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("handleClick"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("i-button")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("也可以直接在父级声明，但为了区分原生事件和自定义事件，要用到事件修饰符 .native，所以上面的示例也可以这样写：")]),t._v(" "),a("div",{staticClass:"language-html line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("i-button")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@click.native")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("handleClick"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("i-button")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("h2",{attrs:{id:"vue组件之间的通讯"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue组件之间的通讯"}},[t._v("#")]),t._v(" Vue组件之间的通讯")]),t._v(" "),a("ul",[a("li",[t._v("ref：给元素或组件注册引用信息；")]),t._v(" "),a("li",[t._v("$parent / $children：访问父 / 子实例。")]),t._v(" "),a("li",[t._v("Vuex")]),t._v(" "),a("li",[a("a",{attrs:{href:"https://juejin.im/post/5a4353766fb9a044fb080927",target:"_blank",rel:"noopener noreferrer"}},[t._v("Bus"),a("OutboundLink")],1),t._v(" "),a("ul",[a("li",[t._v("bus的本体就是一个单独的Vue实例，然后用$emit， $on， $off 分别来分发、监听、取消监听事件")])])]),t._v(" "),a("li",[t._v("依赖注入 跨级组件间的通信")]),t._v(" "),a("li",[t._v("$dispatch 和 $broadcast 方法 (2.x已经被弃用 官方给出的代替方案是"),a("a",{attrs:{href:"https://cn.vuejs.org/v2/guide/migration.html#dispatch-%E5%92%8C-broadcast-%E6%9B%BF%E6%8D%A2",target:"_blank",rel:"noopener noreferrer"}},[t._v("Bus"),a("OutboundLink")],1),t._v("或者自己实现一个)")]),t._v(" "),a("li",[a("a",{attrs:{href:"https://github.com/qq919006380/Vue-component-communication",target:"_blank",rel:"noopener noreferrer"}},[t._v("详细使用"),a("OutboundLink")],1)])]),t._v(" "),a("h3",{attrs:{id:"注意"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#注意"}},[t._v("#")]),t._v(" 注意：")]),t._v(" "),a("ul",[a("li",[t._v("vue组件的事件不会冒泡")]),t._v(" "),a("li",[t._v('属性不能以"data-"开头')])])])}),[],!1,null,null,null);a.default=e.exports}}]);