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
git stash   # 缓存
git stash save 'message'  # 推荐使用这个 可以根据存取的message识别缓存
git stash list  # 缓存列表
git stash pop   # 读取缓存的最后一个并从list中删除该缓存
git stash apply stash@{n} # 读取指定缓存 不会自动删除 stash@{n} 为list中 你所要读取的缓存的序号
git stash drop  stash@{n} # 手动删除指定缓存
# 查看缓存的时间
git stash list --date=relative
git stash list --date=short
git stash list --date=local
```


## git rebase -i --autosquash + git commit --fixup [hash]

## git log

```shell
git log --stat # 日志中生成文件差异
git log --full-history # 默认模式是会简化文件历史的。 --full-history 这个参数，去掉这个简化的功能。
git log --simplify-merges # --simplify-merges 可以增强 --full-history 的能力，因为 --full-history 会把一些无用的合并 commit 也输出出来（可以看 2.2.3 中的 commit 信息，有一些是 Merge branch xxx），增加 --simplify-merges 参数可以去除这些无用的 commit 信息。

git log --stat --full-history --simplify-merges -- <path> # 查看文件变更记录
```
## git cherry-pick
需要其他分支部分代码变动（某几个提交），采用 Cherry pick
[git cherry-pick 教程](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html)

### Usage
```shell
git cherry-pick <commitHash> # 将指定的提交（commit）应用于其他分支
git cherry-pick <HashA> <HashB> # 转移多个提交
```
### 配置项
git cherry-pick命令的常用配置项如下。

（1）-e，--edit

打开外部编辑器，编辑提交信息。

（2）-n，--no-commit

只更新工作区和暂存区，不产生新的提交。

（3）-x

在提交信息的末尾追加一行(cherry picked from commit ...)，方便以后查到这个提交是如何产生的。

（4）-s，--signoff

在提交信息的末尾追加一行操作者的签名，表示是谁进行了这个操作。

（5）-m parent-number，--mainline parent-number

如果原始提交是一个合并节点，来自于两个分支的合并，那么 Cherry pick 默认将失败，因为它不知道应该采用哪个分支的代码变动。
