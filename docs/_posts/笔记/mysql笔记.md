## 常用命令

### 增
 -  `insert into users (name)value('zhangsan')`   在users这张表中增加zhangsan字段

### 删除

- delete from users where username='lisi'	删除username为lisi的用户，这里是物理删除，如果是做逻辑删除添加一个字段用update更新字段即可

###  改

`update users set realname='小明' WHERE id='2'`  讲id为2的realname改成小明

### 查 

-  `select *` from users	查看users表中的所有字段

-  `select id,username from users`	查看users表中id和username字段

-  `select * from users where username='zhangsan'` 	查看users表中username为zhangsan的数据,后面可以接查询语句:
  
  - and realname=‘123’ 	与
  - or realname='123' 	或
  - realname like '%zh%'	模糊查询带zh的
  - order by id	根据id正序排序后面加desc则是倒序
  
  



##	注意

- sql语句不区分大小写，但是结尾要有分号

- 字段最好用小写加_的方式命名

- 关键字要es6的字符串模板括起来  ``passwor`\`

  