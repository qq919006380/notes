(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{343:function(s,a,t){"use strict";t.r(a);var n=t(4),e=Object(n.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("p",[s._v("日常开发中我们都是使用别人开发的 npm 包，我们如何自己也发布一个 npm 包呢，本文将从零开始从搭建-打包-发布一一讲解。")]),s._v(" "),a("h2",{attrs:{id:"一、初始化-npm-包"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#一、初始化-npm-包"}},[s._v("#")]),s._v(" 一、初始化 npm 包")]),s._v(" "),a("p",[a("code",[s._v("npm iniy -y")])]),s._v(" "),a("h2",{attrs:{id:"二、开发一个简单的插件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#二、开发一个简单的插件"}},[s._v("#")]),s._v(" 二、开发一个简单的插件")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// index.js")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" b")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" add "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),a("h2",{attrs:{id:"三、配置-package-json"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#三、配置-package-json"}},[s._v("#")]),s._v(" 三、配置 package.json")]),s._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"name"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"tools　"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"version"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"0.0.1"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"description"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"项目描述"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"main"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"index.js"')]),s._v("  \n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),a("h2",{attrs:{id:"四、发布"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#四、发布"}},[s._v("#")]),s._v(" 四、发布")]),s._v(" "),a("ul",[a("li",[s._v("检查名称是否被占用 "),a("code",[s._v("npm view <package-name>")]),s._v(" 如果404则是此名称可用")]),s._v(" "),a("li",[s._v("登录 "),a("code",[s._v("npm login")])]),s._v(" "),a("li",[s._v("登出 "),a("code",[s._v("npm logout")])]),s._v(" "),a("li",[s._v("查看当前账号 "),a("code",[s._v("npm whoami")])]),s._v(" "),a("li",[s._v("发布 "),a("code",[s._v("npm publish")])])]),s._v(" "),a("blockquote",[a("p",[s._v("是的，发布一个npm包只有一行命令，没有我们想象中的那么复杂。")])]),s._v(" "),a("h2",{attrs:{id:"参见错误"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参见错误"}},[s._v("#")]),s._v(" 参见错误")]),s._v(" "),a("p",[s._v("npm的镜像源没有指向npm"),a("br"),s._v("\n发布一个已经发布过的版本号"),a("br"),s._v("\n包名称被占用")])])}),[],!1,null,null,null);a.default=e.exports}}]);