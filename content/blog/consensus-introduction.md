---
title: "共识算法简介"
date: "2020-01-31"
description: "我一直都不太懂共识算法这层面的东西，直到跟 Ted（Hotstuff 算法的一作，Libra 里面用的那个）一起出差了十几天，耳濡目染的我终于学会了点东西。"
---

我一直都不太懂共识算法这层面的东西，直到跟 [Ted](https://tedyin.com/)（Hotstuff 算法的一作，Libra 里面用的那个）一起出差了十几天，耳濡目染的我终于学会了点东西。

## 共识算法的起源

共识算法本身要解决的问题是

* 在一个分布式系统里面，会存在多个节点，每个节点都是一个状态机
* 所有节点都能够对状态变更操作的执行的顺序达成一致
* 并且当某个或多个节点突然出现故障时，其余的节点依然能够提供正常组成网络提供服务（即 Fault-Tolerane）

> 说白了就是得我知道某个值，我也得知道大家知道某个值，大家也得知道我知道大家知道这个值，即使是有人掉线了。

解决这个问题的方案很早之前就被提出了，比如著名的 Paxos，还有对 Paxos 进行改进的 Raft。这俩方案都已经在谷歌等大厂的底层系统里面运用了很多年了。

后来， Leslie Lamport 在 1982 的一篇叫 [The Byzantine Generals Problem](https://www.microsoft.com/en-us/research/uploads/prod/2016/12/The-Byzantine-Generals-Problem.pdf)  的论文里提出来了一个新的概念，叫 BFT（Byzantine Fault Tolerance），意思就是说在这个网络中，不止有节点会故障，还可能会故意的作恶，发送一些恶意的错误消息来试图破坏整个系统。

而能够在一个存在这种拜占庭节点的网络中，使整个系统同时保证安全性（所有节点都能针对一个状态变更的执行序列达成一致）和活性（所有节点最终一定会产生一个确定的输出值）的协议，就叫做 BFT 共识协议（BFT Consensus Algorithm）。

这么一来这个问题就比较有意思了。但之后就有很多人想要尝试解决这个问题，但最终都失败了。

更有意思的是后来有人直接证明了这个问题不可解，这个证明叫做 [FLP Impossibility](https://groups.csail.mit.edu/tds/papers/Lynch/jacm85.pdf) （published by Fischer, Lynch and Patterson, thus FLP）：

> In this paper, it is shown that every protocol for this problem has the possibility of non-termination, even with only one faulty process.
>
> 在这篇论文中我们证明了所有试图解决这个问题的协议都可能没有活性，即没有办法终止，即使是只有一个节点挂了。

但故事显然没这么容易就结束，人们找到了通过对网络条件进行假设来实现 BFT 共识协议的方法。

## BFT 共识协议的分类

既然是需要通过对网络条件进行假设来实现 BFT 共识协议，那一个最自然的分类方法就是按照网络条件来分类。

一般分为三类：

* 异步模型（Asynchronous Model） - 即网络中的消息延迟可以无限大
* 同步模型（Synchronous Model） - 即网络中的消息延迟小于某个确定的值
* 部分异步模型（Partial Asynchronous Model） - 即网络在“好的一天”是同步的，在“不好的一天”是异步的

### 异步模型

异步模型的代表作是 HoneyBadgerBFT，它理论上是 work 的，但理论上它的网络状态收敛时间是指数型，而且消息复杂度是 o(n^3)。

> 虽然协议不实用但是 HoneyBadger 这个动物很牛逼，这货号称地球上最无畏的动物，基本上见谁打谁，不管打不打得过，大多数动物园都不敢收。可以谷歌一下，很欢乐。

异步模型中没有 leader 这个角色，同时网络的收敛时间也不是一个定值，而是概率收敛的。

所以异步模型本身更偏向于理论一些，实战中基本很难应用。

### 同步模型

同步模型的代表是 [LSP](https://zoo.cs.yale.edu/classes/cs426/2014/bib/lamport83theweak.pdf)， 也是由 Lamport 大神提出的。

另外比特币里面的中本聪共识（Nakamoto Consensus）也算是同步共识算法。它通过挖矿机制来限制了网络状态变更的时间，保证了消息传递可用的时间。

同步模型对于网络吞吐率的限制还是比较大的，因为它每轮共识都需要同步，所以相当于每轮都需要等那么长的时间；另一方面如何确定网络的 timeout 也比较难。所以这个模型也不太实用。

但中本聪共识例外，毕竟是神作。仅对于全球支付结算系统这个特殊问题的而言，中本聪共识算是一副药效奇佳的偏方。

### 部分异步模型

部分异步模型是最实用的假设模型。大部分我们现在用的共识算法都是基于这个模型的，包括 PBFT，Tendermint，Hotstuff 等等。

部分异步模型的特点是它需要个 leader。而这个 leader 也成为了整个算法的性能瓶颈。另外算法本身也会比较复杂，包含一些微妙的逻辑。

也正是因为这些原因，市场上充斥的大部分共识算法其实都可以一眼就看出来是假的：它们要么没有严谨的数学证明，要么压根就没有解决共识算法该解决的问题。

除了按照网络条件分类，还有一种分类方法是按照选择区块顺序的方法来分：基于投票的（Quorum/Vote）的和基于挖矿的。按这种分类方法的话，基本上只有 Nakamoto Consensus 是基于挖矿的，其他所有的共识算法都是基于 Quorum 的。

## 共识算法排排坐

下面这个表格对各种经典共识算法进行了一个对比。（选自 Ted 的 slides）

| Protocol                       | Correct Leader   | Leader Failure   | f Leader Failures | Responsive         |
| ------------------------------ | ---------------- | ---------------- | ----------------- | ------------------ |
| DLS                            | O(n<sup>4</sup>) | O(n<sup>4</sup>) | O(n<sup>4</sup>)  |                    |
| PBFT                           | O(n<sup>2</sup>) | O(n<sup>3</sup>) | O(fn<sup>3</sup>) | ✔️|
| SBFT                           | O(n)             | O(n<sup>2</sup>) | O(fn<sup>2</sup>) | ✔️ |
| Tendermint/Casper              | O(n<sup>2</sup>) | O(n<sup>2</sup>) | O(fn<sup>2</sup>) |                    |
| Tendermint/Casper (加门限签名) | O(n)             | O(n)             | O(fn)             |                    |
| HotStuff                       | O(n)             | O(n)             | O(fn)             | ✔️|

其中 n 为节点个数，所示复杂度为消息复杂度，即在有 n 个节点的情况下整个网络中需要通信的次数。Correct Leader 表示当前 Leader 没有毛病，下一轮可以继续 propose；Leader Failure 表示当前 Leader 不行，需要进行换届（View Change）；f Leader Failures 则表示需要进行 f 轮换届；Responsive 响应度指的是不需要让每次共识的过程都等待至 timeout，从而沦落为一个同步网络假设的协议。

需要注意的是，我们这里讨论的所有共识算法，仅限于最核心的实现共识这一件事情的层面，其他的功能不在这个讨论范围之内。比如防女巫攻击，黑名单和换届的规则定义等等，都属于共识之外的功能。

### DLS

DLS（work、Lynch 和 Stockmeyer）这篇[论文](https://groups.csail.mit.edu/tds/papers/Lynch/jacm88.pdf)是第一个提出部分异步网络假设，并在该假设下提出共识算法的协议。

这个算法大致是这样工作的：

1. 每一轮都得有个 Leader，每一轮开始后，各个节点首先进行一轮通信，将自己认为正确的 value 发布出去。
2. 如果 Leader 收到了 n-f 个相同的 value，它就再把这个 value 给所有的节点广播一遍。
3. 这时当各个节点收到这个 value 以后，它要将这个值“锁定”，然后再给所有的其他节点广播一遍。
4. 当 Leader 收到了来自 f+1 个节点的锁定后的 value 后，它就会将这个 value 作为最终值。

从这个过程还是可以比较直观的看出它是如何满足安全性的条件的，即至少有 n-f 个节点可以对于一个最终值达成一致。

除此之外一个共识算法还需要满足活性，这里就需要用到网络假设了：即部分异步网络中存在一个最大时延（在好的一天），而如果某个节点在这个时延时间内没有回复，我们就可以算它是掉线了，而网络整体的活性得到了保证。

### PBFT

PBFT 这篇[文章](http://pmg.csail.mit.edu/papers/osdi99.pdf)认为之前的工作都过于理论而无法在实践中应用，所以提出了一种新的更实际的基于部分异步网络假设的算法。

PBFT 可以在最多 (n-1)/3 的节点为错误节点（包括拜占庭节点）的条件下同时实现安全性和活性。它大致上是这么工作的：

1. 首先也需要有一个 Leader，Leader 会收到来自客户端的一个值
2. Leader 将这个值广播到其他所有节点那里去
3. 每个节点收到后对这个值进行确认，然后将这个值广播给其他所有节点，并等待至少 2f 个其他节点的消息广播
4. 当收到至少 2f 个其他节点的消息时，对其中的值进行验证，然后再次广播，并再次等待至少 2f 个其他节点的消息广播
5. 如果再次收到了 2f 个其他节点的消息，并且其中的值无误，则确认该值为最终值

这个过程画成图的话大概是这样（Pic credit to Ted）：

![WX20200131-132842@2x](https://tva1.sinaimg.cn/large/006tNbRwly1gbfoo5w4jvj31eu0hujx9.jpg)

以上这个过程的消息复杂度是 O(n<sup>2</sup>)，但要注意这是在 Leader 没问题的情况下的复杂度

### SBFT

[SBFT](https://arxiv.org/pdf/1804.01626.pdf) 主要是在 PBFT 的基础上做出了一些优化：

> To achieve this performance improvement, SBFT uses a combination of four ingredients: using collectors and threshold signatures to reduce communication to linear, using an optimistic fast path, reducing client communication and utilizing redundant servers for the fast path.

在共识算法的层面上主要作出的优化是通过使用门限签名（Threshold Signatures）来减少了一层消息复杂度。具体实现方法和 trade-off 可以参考论文。

### Tendermint

Tendermint 是 Cosmos 提出的一个共识算法，它的特点，从上面的对比图中可以看出来，是它在 leader failure 的情况下依然是 O(n^2) 的消息复杂度。

这得益于 Tendermint 在普通情况下和换届的情况下，使用了完全一样的共识流程，所以复杂度也相同。

具体是做出了怎么样的优化我说实话还没看懂... 等我再仔细研究下论文再补充这块吧。

### Hotstuff

Hotstuff 是 Ted 作为一作而设计的一个最新共识，这份工作基本上把 BFT 共识算法这个研究领域推到了天花板了。

从上面的表格也可以看出来这个算法拥有最小的消息复杂度，同时还保有了响应度。与此同时该算法拥有完美理论证明的同时，还拥有一个非常简单的设计，使得其工程实现变得非常简单。它好到不仅我想吹爆它，Facebook 的 Libra 里也使用了 Hotstuff 作为共识算法。

Hotstuff 中使用了一个叫做 Quorum Certificate （QC）的概念，在某个区块拥有了足够数量的 QC 以后，该区块则可被判定为最终确定；同时算法规定了一个选择 QC 的逻辑，从而保证了算法的安全性；另外还设计了一个 Pacemaker 模块，保证了算法的活性。整个协议可以用几百行代码实现。

## 写在最后

除此之外还有许多其他的共识算法值得探究，比如 Algorand 在共识协议算法中首次引入了密码学方法等等。

这些就等我再学习一下，留在之后写成其他文章吧。

---

### References

* How Does Distributed Consensus Work?：  
https://medium.com/s/story/lets-take-a-crack-at-understanding-distributed-consensus-dad23d0dc95
* What is the difference between PBFT, Tendermint, SBFT and HotStuff?：  
https://decentralizedthoughts.github.io/2019-06-23-what-is-the-difference-between/

