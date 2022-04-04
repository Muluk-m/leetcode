# Git操作
## git cherry-pick
对于多分支的代码库，将代码从一个分支转移到另一个分支是常见需求。

这时分两种情况。一种情况是，你需要另一个分支的所有代码变动，那么就采用合并（git merge）。另一种情况是，你只需要部分代码变动（某几个提交），这时可以采用 Cherry pick。
[阮一峰教程](http://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html)

### 基本用法
```bash git cherry-pick <commitHash>```

### 配置项
|配置|作用|简写|
|:--|:--|:--|
|-e|打开外部编辑器，编辑提交信息|--edit|
|-n|只更新工作区和暂存区，不产生新的提交|--no-commit|
|-x|在提交信息的末尾追加一行``(cherry picked from commit ...)``，方便以后查到这个提交是如何产生的|-|
|-s|在提交信息的末尾追加一行操作者的签名，表示是谁进行了这个操作。|--signoff|

