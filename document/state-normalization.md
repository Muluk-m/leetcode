# State范式化

范式化（Normalization）是数据库设计中的一系列原理和技术，以减少数据库中数据冗余，增进数据的一致性。

大部分程序处理的数据都是嵌套或互相关联的。例如，一个博客中有多篇文章，每篇文章有多条评论，所有的文章和评论又都是由用户产生的。这种类型应用的数据看上去可能是这样的：
```js
const blogPosts = [
    {
        id : "post1",
        author : {username : "user1", name : "User 1"},
        body : "......",
        comments : [
            {
                id : "comment1",
                author : {username : "user2", name : "User 2"},
                comment : ".....",
            },
            {
                id : "comment2",
                author : {username : "user3", name : "User 3"},
                comment : ".....",
            }
        ]    
    },
    {
        id : "post2",
        author : {username : "user2", name : "User 2"},
        body : "......",
        comments : [
            {
                id : "comment3",
                author : {username : "user3", name : "User 3"},
                comment : ".....",
            },
            {
                id : "comment4",
                author : {username : "user1", name : "User 1"},
                comment : ".....",
            },
            {
                id : "comment5",
                author : {username : "user3", name : "User 3"},
                comment : ".....",
            }
        ]    
    }
    // and repeat many times
]
```
上面的数据结构比较复杂，并且有部分数据是重复的。这里还存在一些让人关心的问题：

当数据在多处冗余后，需要更新时，很难保证所有的数据都进行更新。
嵌套的数据意味着 reducer 逻辑嵌套更多、复杂度更高。尤其是在打算更新深层嵌套数据时。
不可变的数据在更新时需要状态树的祖先数据进行复制和更新，并且新的对象引用会导致与之 connect 的所有 UI 组件都重复 render。尽管要显示的数据没有发生任何改变，对深层嵌套的数据对象进行更新也会强制完全无关的 UI 组件重复 render
正因为如此，在 Redux Store 中管理关系数据或嵌套数据的推荐做法是将这一部分视为数据库，并且将数据按范式化存储。

设计范式化的 State
范式化的数据包含下面几个概念：

任何类型的数据在 state 中都有自己的 “表”。
任何 “数据表” 应将各个项目存储在对象中，其中每个项目的 ID 作为 key，项目本身作为 value。
任何对单个项目的引用都应该根据存储项目的 ID 来完成。
ID 数组应该用于排序。
上面博客示例中的 state 结构范式化之后可能如下：
```js
{
    posts : {
        byId : {
            "post1" : {
                id : "post1",
                author : "user1",
                body : "......",
                comments : ["comment1", "comment2"]    
            },
            "post2" : {
                id : "post2",
                author : "user2",
                body : "......",
                comments : ["comment3", "comment4", "comment5"]    
            }
        }
        allIds : ["post1", "post2"]
    },
    comments : {
        byId : {
            "comment1" : {
                id : "comment1",
                author : "user2",
                comment : ".....",
            },
            "comment2" : {
                id : "comment2",
                author : "user3",
                comment : ".....",
            },
            "comment3" : {
                id : "comment3",
                author : "user3",
                comment : ".....",
            },
            "comment4" : {
                id : "comment4",
                author : "user1",
                comment : ".....",
            },
            "comment5" : {
                id : "comment5",
                author : "user3",
                comment : ".....",
            },
        },
        allIds : ["comment1", "comment2", "comment3", "commment4", "comment5"]
    },
    users : {
        byId : {
            "user1" : {
                username : "user1",
                name : "User 1",
            }
            "user2" : {
                username : "user2",
                name : "User 2",
            }
            "user3" : {
                username : "user3",
                name : "User 3",
            }
        },
        allIds : ["user1", "user2", "user3"]
    }
}
```
这种 state 在结构上更加扁平。与原始的嵌套形式相比，有下面几个地方的改进：

每个数据项只在一个地方定义，如果数据项需要更新的话不用在多处改变
reducer 逻辑不用处理深层次的嵌套，因此看上去可能会更加简单
检索或者更新给定数据项的逻辑变得简单与一致。给定一个数据项的 type 和 ID，不必挖掘其他对象而是通过几个简单的步骤就能查找到它。
每个数据类型都是唯一的，像改评论这样的更新仅仅需要状态树中 “comment > byId > comment” 这部分的复制。这也就意味着在 UI 中只有数据发生变化的一部分才会发生更新。与之前的不同的是，之前嵌套形式的结构需要更新整个 comment 对象，post 对象的父级，以及整个 post 对象的数组。这样就会让所有的 Post 组件和 Comment 组件都再次渲染。
需要注意的是，范式化的 state 意味更多的组件被 connect，每个组件负责查找自己的数据，这和小部分的组件被 connect，然后查找大部分的数据再进行向下传递数据是恰恰相反的。事实证明，connect 父组件只需要将数据项的 Id 传递给 connect 的子对象是在 Redux 应用中优化 UI 性能的良好模式，因此保持范式化的 state 在提高性能方面起着关键作用。
