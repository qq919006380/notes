(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{370:function(t,s,a){"use strict";a.r(s);var n=a(4),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"基础"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#基础"}},[t._v("#")]),t._v(" 基础")]),t._v(" "),s("p",[t._v("options vue object——new Vue({})")]),t._v(" "),s("ul",[s("li",[t._v("el： dom元素对象\n"),s("ul",[s("li",[t._v('"#DomObj"')]),t._v(" "),s("li",[t._v("document.querySelector('#DomObj') //更为优化，避免了vue判断查询")])])]),t._v(" "),s("li",[t._v("data：数据\n"),s("ul",[s("li",[t._v('data:{key:"数据"}   //可选')]),t._v(" "),s("li",[t._v('data:function(){return{key:"数据"}} //可选')])])]),t._v(" "),s("li",[t._v("methods \t// 在 "),s("code",[t._v("methods")]),t._v(" 对象中定义方法")]),t._v(" "),s("li",[t._v("components:{}     //声明局部组件  components:{'templateName':template}")]),t._v(" "),s("li",[t._v("template：\t\t//模板或调用组件 {'templateName':template}")]),t._v(" "),s("li",[t._v("watch\t\t//监控数据,主要监控值的变化\n"),s("ul",[s("li",[t._v("深度监控,主要监控引用类型，对象，数组等\n"),s("ul",[s("li",[t._v("obj:{deep:true,handler:function(a){console.log(a.data)}}")])])])])]),t._v(" "),s("li",[t._v("cumputed 监事多个数据")])]),t._v(" "),s("h1",{attrs:{id:"指令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#指令"}},[t._v("#")]),t._v(" 指令")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("v-text    //innertext")])]),t._v(" "),s("li",[s("p",[t._v("v-html    //innerHtml")])]),t._v(" "),s("li",[s("p",[t._v("v-model\t//双向绑定（一般用在input[text] ）")])]),t._v(" "),s("li",[s("ul",[s("li",[t._v("v-bind 给元素的属性赋值 (单向绑定)\n"),s("ul",[s("li",[t._v('v-bind:\'atrr="value"')]),t._v(" "),s("li",[t._v('简写 :atrr="value"')])])])])]),t._v(" "),s("li",[s("p",[t._v("if-else 判断,以下三个指令必须是相邻的DOM，（删除DOM元素）")]),t._v(" "),s("ul",[s("li",[t._v("v-if")]),t._v(" "),s("li",[t._v("v-else-if")]),t._v(" "),s("li",[t._v("v-else")])])]),t._v(" "),s("li",[s("p",[t._v("v-show (隐藏DOM元素)")])]),t._v(" "),s("li",[s("p",[t._v("v-on 给元素添加事件")]),t._v(" "),s("ul",[s("li",[t._v("v-on:click='on'")]),t._v(" "),s("li",[t._v("简写 @click='on'")])])]),t._v(" "),s("li",[s("p",[t._v("v-for")]),t._v(" "),s("ul",[s("li",[t._v("数组(item,index) in item")]),t._v(" "),s("li",[t._v("对象(key,value,index) in items")])])])]),t._v(" "),s("h1",{attrs:{id:"组件-component"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#组件-component"}},[t._v("#")]),t._v(" 组件 component")]),t._v(" "),s("ul",[s("li",[t._v("父组件通过 props 向下传递数据给子组件\n"),s("ul",[s("li",[t._v("props的值可以是数组或是对象")]),t._v(" "),s("li",[t._v("如果是数组则是声明属性，如props:['属性1','属性2']")]),t._v(" "),s("li",[t._v("如果是对象则可以写默认值，如porps:{属性1:{},属性2:{type:String,default:'默认值'}}\n"),s("ul",[s("li",[t._v("validator 属性检查器（给属性添加可选值）")])])]),t._v(" "),s("li",[t._v("注意的是如果porps声明的属性是有大写的，dom节点则需要使用-表示，如helloWorld则需要dom标签的属性则需要写成hello-world")])])]),t._v(" "),s("li",[t._v("子组件通过 events 给父组件发送消息")])]),t._v(" "),s("h3",{attrs:{id:"全局组件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#全局组件"}},[t._v("#")]),t._v(" 全局组件")]),t._v(" "),s("p",[t._v("Vue.component('componentName',templateName)")]),t._v(" "),s("h3",{attrs:{id:"插槽slot"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#插槽slot"}},[t._v("#")]),t._v(" 插槽slot")]),t._v(" "),s("p",[t._v("vue提供的内置组件"),t._t("default"),t._v("用于占位给子组件传递DOM给父组件")],2),t._v(" "),s("h3",{attrs:{id:"具名插槽slot"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#具名插槽slot"}},[t._v("#")]),t._v(" 具名插槽slot")]),t._v(" "),s("p",[t._v("如果父组件有多个插槽可以用名字分类"),t._t("one"),t._v(" 调用的时候就")],2),s("div",{attrs:{slot:"one"},slot:"one"}),s("p"),t._v(" "),s("h1",{attrs:{id:"过滤器-管道"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#过滤器-管道"}},[t._v("#")]),t._v(" 过滤器（管道）")]),t._v(" "),s("div",{staticClass:"language-javascript line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("Vue"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("filter")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'dataReverse'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("data")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("split")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("reverse")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("join")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br")])]),s("h1",{attrs:{id:"生命周期-事件函数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#生命周期-事件函数"}},[t._v("#")]),t._v(" 生命周期(事件函数)")]),t._v(" "),s("h3",{attrs:{id:"组件加载触发"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#组件加载触发"}},[t._v("#")]),t._v(" 组件加载触发")]),t._v(" "),s("ul",[s("li",[t._v("beforeCreate——组件加载完成前触发")]),t._v(" "),s("li",[t._v("created————组件加载完成触发\n"),s("ul",[s("li",[t._v("应用场景：触发ajax请求")])])])]),t._v(" "),s("h3",{attrs:{id:"页面加载触发"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#页面加载触发"}},[t._v("#")]),t._v(" 页面加载触发")]),t._v(" "),s("ul",[s("li",[t._v("beforeMount——页面加载前触发")]),t._v(" "),s("li",[t._v("mounted————页面加载完成后触发(到这里后的是Vue完成组装好的DOM)\n"),s("ul",[s("li",[t._v("如果存在异步加载组件可以使用"),s("code",[t._v("this.$nextTick(function () { })")])])])])]),t._v(" "),s("h3",{attrs:{id:"页面数组更改时触发"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#页面数组更改时触发"}},[t._v("#")]),t._v(" 页面数组更改时触发")]),t._v(" "),s("ul",[s("li",[t._v("beforeUpdate——页面数据发生更改前触发")]),t._v(" "),s("li",[t._v("updated————页面数据发生更改后触发")])]),t._v(" "),s("h3",{attrs:{id:"组件销毁的时候触发-如-v-if"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#组件销毁的时候触发-如-v-if"}},[t._v("#")]),t._v(" 组件销毁的时候触发（如：v-if）")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("beforeDestroy——销毁前")])]),t._v(" "),s("li",[s("p",[t._v("destroyed————销毁后")])]),t._v(" "),s("li",[s("p",[t._v("创建前 / 后（beforeCreate / created）：在 beforeCreate 阶段，Vue 实例的挂载元素 el 和数据对象 data 都为 undefined，还未初始化。在 created 阶段，Vue 实例的数据对象 data 有了，el 还没有。")])]),t._v(" "),s("li",[s("p",[t._v("载入前 / 后（beforeMount / mounted）：在 beforeMount 阶段，Vue 实例的 $el 和 data 都初始化了，但还是挂载之前为虚拟的 DOM 节点，data 尚未替换。在 mounted 阶段，Vue 实例挂载完成，data 成功渲染。")])]),t._v(" "),s("li",[s("p",[t._v("更新前 / 后（beforeUpdate / updated）：当 data 变化时，会触发 beforeUpdate 和 updated 方法。这两个不常用，且不推荐使用。")])]),t._v(" "),s("li",[s("p",[t._v("销毁前 / 后（beforeDestroy / destroyed）：beforeDestroy 是在 Vue 实例销毁前触发，一般在这里要通过 removeEventListener 解除手动绑定的事件。实例销毁后，触发 destroyed。")])])]),t._v(" "),s("h1",{attrs:{id:"路由"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#路由"}},[t._v("#")]),t._v(" "),s("a",{attrs:{href:"https://router.vuejs.org/zh/",target:"_blank",rel:"noopener noreferrer"}},[t._v("路由"),s("OutboundLink")],1)]),t._v(" "),s("h3",{attrs:{id:"使用路由5步骤"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用路由5步骤"}},[t._v("#")]),t._v(" 使用路由5步骤")]),t._v(" "),s("ol",{attrs:{start:"0"}},[s("li",[t._v("如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)用于创建router-view和router-link组件")]),t._v(" "),s("li",[t._v("定义 (路由) 组件:{template:'"),s("div",[t._v("123")]),t._v("'}")]),t._v(" "),s("li",[t._v("定义路由配置:{ path: '/foo', component: { template: '"),s("div",[t._v("foo")]),t._v("' } }")]),t._v(" "),s("li",[t._v("创建 router 实例，然后传路由配置")])]),t._v(" "),s("blockquote",[s("p",[t._v("new VueRouter({routes // (缩写) 相当于 routes: routes})"),s("br"),t._v("\n注意  new VueRouter({routes:[path:'/xxx',component:xxx]})  建名字一定是routes.")])]),t._v(" "),s("ol",{attrs:{start:"4"}},[s("li",[t._v("创建和挂载根实例。记得要通过 router 实例参数注入路由")])]),t._v(" "),s("h2",{attrs:{id:"全局路由和渲染前事件-全局路由守卫"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#全局路由和渲染前事件-全局路由守卫"}},[t._v("#")]),t._v(" 全局路由和渲染前事件（全局路由守卫）")]),t._v(" "),s("p",[t._v("router.beforeEach可以做路由的权限转跳")]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" router "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("VueRouter")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nrouter"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("beforeEach")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("to"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" from"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" next")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("to"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//即将要进入的目标 路由对象")]),t._v("\n    console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("from"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//当前导航正要离开的路由")]),t._v("\n    next "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br")])]),s("h2",{attrs:{id:"全局配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#全局配置"}},[t._v("#")]),t._v(" 全局配置")]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("// 对writd-开头的标签不会报未注册组件的错误\nVue.config.ignoredElements = [\n  /^wired-/\n]\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br")])]),s("h2",{attrs:{id:"全局api"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#全局api"}},[t._v("#")]),t._v(" 全局API")]),t._v(" "),s("ul",[s("li",[t._v("Vue.extend")]),t._v(" "),s("li",[t._v("Vue.directive")]),t._v(" "),s("li",[t._v("Vue.filter")])]),t._v(" "),s("h2",{attrs:{id:"实例属性"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#实例属性"}},[t._v("#")]),t._v(" 实例属性")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://cn.vuejs.org/v2/api/#vm-data",target:"_blank",rel:"noopener noreferrer"}},[t._v("vm.$data"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://cn.vuejs.org/v2/api/#vm-props",target:"_blank",rel:"noopener noreferrer"}},[t._v("vm.$props"),s("OutboundLink")],1),t._v(" 获取props对象属性")]),t._v(" "),s("li",[s("a",{attrs:{href:"https://cn.vuejs.org/v2/api/#vm-el",target:"_blank",rel:"noopener noreferrer"}},[t._v("vm.$el"),s("OutboundLink")],1),t._v("\t获取当前组件的对象属性")]),t._v(" "),s("li",[s("a",{attrs:{href:"https://cn.vuejs.org/v2/api/#vm-options",target:"_blank",rel:"noopener noreferrer"}},[t._v("vm.$options"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://cn.vuejs.org/v2/api/#vm-parent",target:"_blank",rel:"noopener noreferrer"}},[t._v("vm.$parent"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://cn.vuejs.org/v2/api/#vm-root",target:"_blank",rel:"noopener noreferrer"}},[t._v("vm.$root"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://cn.vuejs.org/v2/api/#vm-children",target:"_blank",rel:"noopener noreferrer"}},[t._v("vm.$children"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://cn.vuejs.org/v2/api/#vm-slots",target:"_blank",rel:"noopener noreferrer"}},[t._v("vm.$slots"),s("OutboundLink")],1),t._v("  获取插槽对象属性")]),t._v(" "),s("li",[s("a",{attrs:{href:"https://cn.vuejs.org/v2/api/#vm-scopedSlots",target:"_blank",rel:"noopener noreferrer"}},[t._v("vm.$scopedSlots"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://cn.vuejs.org/v2/api/#vm-refs",target:"_blank",rel:"noopener noreferrer"}},[t._v("vm.$refs"),s("OutboundLink")],1),t._v("\t获取带ref标识的对象属性")]),t._v(" "),s("li",[s("a",{attrs:{href:"https://cn.vuejs.org/v2/api/#vm-isServer",target:"_blank",rel:"noopener noreferrer"}},[t._v("vm.$isServer"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://cn.vuejs.org/v2/api/#vm-attrs",target:"_blank",rel:"noopener noreferrer"}},[t._v("vm.$attrs"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://cn.vuejs.org/v2/api/#vm-listeners",target:"_blank",rel:"noopener noreferrer"}},[t._v("vm.$listeners"),s("OutboundLink")],1)])]),t._v(" "),s("h2",{attrs:{id:"computed、watch、methods的区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#computed、watch、methods的区别"}},[t._v("#")]),t._v(" computed、watch、methods的区别")]),t._v(" "),s("ul",[s("li",[t._v("理论上computed能做的watch也能做，watch能做的computed也能做，只是应用场景不同。")]),t._v(" "),s("li",[t._v("computed是watch、methods综合的优化版，只有渲染的变量变了才回执行。")])]),t._v(" "),s("p",[t._v("watch——监听\ncomputed——计算\nmethods——方法")]),t._v(" "),s("h2",{attrs:{id:"vue动画"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue动画"}},[t._v("#")]),t._v(" VUE动画")]),t._v(" "),s("ul",[s("li",[t._v("css\n"),s("ul",[s("li",[t._v("transition")])])])]),t._v(" "),s("h2",{attrs:{id:"vue-cli3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue-cli3"}},[t._v("#")]),t._v(" vue-cli3")]),t._v(" "),s("ul",[s("li",[t._v("安装\t\tnpm install -g @vue/cli")]),t._v(" "),s("li",[t._v("查看版本\t\tvue --version")]),t._v(" "),s("li",[t._v("创建项目\t\tvue create hello-world\n"),s("ul",[s("li",[t._v("window下交互提示符不起作用则需要使用\t\twinpty vue.cmd create hello-world")])])]),t._v(" "),s("li",[t._v("安装插件（从npm上安装并调用他的生成器）\n"),s("ul",[s("li",[t._v("vue add @vue/eslint")]),t._v(" "),s("li",[t._v("vue add router")]),t._v(" "),s("li",[t._v("vue add vuex")])])])]),t._v(" "),s("h2",{attrs:{id:"坑"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#坑"}},[t._v("#")]),t._v(" 坑")]),t._v(" "),s("p",[t._v("vue中要修改按引用传值的类型要用this.$set()，这样数据和视图才能同时刷新\n其中对象修改已存在的key的属性值可以不用set函数")]),t._v(" "),s("p",[t._v("我在组件里面用watch监控了data，但是在组件外面用v－if之后监控就失效了")]),t._v(" "),s("p",[t._v("如果一个组件内部监控watch了异步请求的props，外面加了v-if的话，组件内部的watch不会触发。")]),t._v(" "),s("div",{staticClass:"language-vue line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-vue"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("template")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    {{ data }}\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("template")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token script"}},[s("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("props")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"data"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("watch")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("data")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("handler")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("val")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n              console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("val"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("deep")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("style")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token style"}},[s("span",{pre:!0,attrs:{class:"token language-css"}},[t._v("\n")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("style")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br"),s("span",{staticClass:"line-number"},[t._v("17")]),s("br"),s("span",{staticClass:"line-number"},[t._v("18")]),s("br"),s("span",{staticClass:"line-number"},[t._v("19")]),s("br"),s("span",{staticClass:"line-number"},[t._v("20")]),s("br"),s("span",{staticClass:"line-number"},[t._v("21")]),s("br"),s("span",{staticClass:"line-number"},[t._v("22")]),s("br")])]),s("div",{staticClass:"language-vue line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-vue"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("template")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("cp")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("v-if")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("isVisibel"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(":data")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("arr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("cp")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("template")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token script"}},[s("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" cp "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./cp.vue"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("components")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" cp "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("data")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("arr")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("isVisibel")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("mounted")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("isVisibel "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//当v-if等于true的时候，组件内部还没渲染到watch就得到了this.obj的值，所以不会触发组件内部的watch。")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("$set")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("arr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"a"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"aaa"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//因此要给这行套上$nextTick等组件渲染完成了，watch才会触发。")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("300")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br"),s("span",{staticClass:"line-number"},[t._v("17")]),s("br"),s("span",{staticClass:"line-number"},[t._v("18")]),s("br"),s("span",{staticClass:"line-number"},[t._v("19")]),s("br"),s("span",{staticClass:"line-number"},[t._v("20")]),s("br"),s("span",{staticClass:"line-number"},[t._v("21")]),s("br"),s("span",{staticClass:"line-number"},[t._v("22")]),s("br"),s("span",{staticClass:"line-number"},[t._v("23")]),s("br"),s("span",{staticClass:"line-number"},[t._v("24")]),s("br"),s("span",{staticClass:"line-number"},[t._v("25")]),s("br")])])])}),[],!1,null,null,null);s.default=e.exports}}]);