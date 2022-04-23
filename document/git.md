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

## git stash
将本地内容移到缓存区 

## 使用场景
在A分支工作时，突然来了个紧急需求，需要切到B分支作业。但并不想提交A的代码该如何处理呢？
可以把代码暂时提到缓存区，切换到B分支进行编写，完成需求提交代码后，切回A分支读取缓存即可
### Usage
```shell
git stash   // 缓存
git stash save 'message'  // 推荐使用这个 可以根据存取的message识别缓存
git stash list  // 缓存列表
git stash pop   // 读取缓存的最后一个并从list中删除该缓存
git stash apply stash@{n} // 读取指定缓存 不会自动删除 stash@{n} 为list中 你所要读取的缓存的序号
git stash drop  stash@{n} // 手动删除指定缓存
// 查看缓存的时间
git stash list --date=relative
git stash list --date=short
git stash list --date=local
```


## git rebase -i --autosquash + git commit --fixup [hash]
