## Short URL Service

### 安装 

* clone 项目到本地
* 执行 npm install
* 进入 lib 目录
* cp config.sample.js config.js
* 编辑 config.js 文件，可以设置 MongoDB 链接，并修改要在短链接 key 中出现的字符（不能有重复字符）
    * 设置 X 位字符，就会生成 X 进制的数字
    * 比如刚好设置 10 位字符 abcdefghij
    * 数字 0 对应 a，数字 9 对应 j，数字13，对应 bd
    * 数字 <=> 字符 算法参考 lib/smartNumber.js
    * 默认设置了数字+大小写字母共 62 个字符（若不想生成的 key 是连续规律的，采用字符乱序是个不错的选择）
    * 62 个字符当全部采用 5 位字符作为 key，可以保存 9亿+ 个记录
* 调试运行 node short.js
* 后台运行 npm start

### create your short url

```
http://your.domain/_?url=xxx
```

**result**

```json
{"url": "http://your.service.domain/{{key}}"}
```

### visit your short url

```
http://your.service.domain/{{key}}
```
