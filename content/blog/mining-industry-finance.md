---
title: "矿业小金融"
date: "2019-10-16"
description: "从期货到期权，再到云算力"
---

做金融产品有一句话是绝对不会错的：**风险只会转移，不会消失**。一个金融产品的任务就是，让风险偏好者与风险厌恶者之间，对某个资产以及其附带的风险和收益进行交易，从而同时满足两方的需求。

作为一名矿工，其挖矿收益的风险来源有三部分：币价波动，挖矿难度的变化和其他一些不可预知的风险（e.g. 矿场断电了，发洪水了，政府上门送温暖了等等）。

有风险就会有想要规避风险的人。风险厌恶且精明的矿工们一般会选择使用套期保值的方法来对冲币价波动，从而保障自己的挖矿收益。

## 期货

使用期货来套保是一个比较普遍的做法。具体的操作方法是：（1）预估一段时间后（周或月或季度）通过挖矿产出的比特币的数量（2）在期货合约市场买入相应数量的做空合约，并按杠杆倍数抵押保证金（3）注意币价波动，随时补充保证金，防止爆仓（4）在合约到期后，在现货市场上卖出挖矿收益的比特币，并同时平仓合约。

这么一波操作下来，在现货市场上的损失（或盈利）就可以与期货合约市场上的盈利（或损失）想抵，从而实现旱涝保收。

## 期权

然而，上面的过程里依然存在着风险，即第（3）步中的爆仓问题。

由于比特币行情波动较大，在矿工不注意的情况下很可能会突然爆仓，造成损失。爆仓风险也是风险，自然也就有人愿意为你承担这部分风险。期权产品就是为此而生的。

与期货合约不同的是，期权合约的买方没有义务抵押保证金，而是由合约发行方来缴纳；同时还享有权利，即买方可以在到期后选择行权或不行权，中途也不用担心爆仓的问题。

但是相应的，买方需要一次性付清合约价格，这也算是为转移风险而付出的成本，并且无论我行权与否，买方都需要付出这部分合约的费用。由于期权合约可以在市场中进行交易，所以其价格由市场定价。对于比特币这种价格波动较大的资产来说，合约费用可能会在总成本中占相当大的比重。

使用期权来进行套期保值的方法是：（1）预估一段时间后（周或月或季度）挖矿可以产出的比特币的数量（2）在期权合约市场上买入合约（即看跌期权），并缴纳合约费用（3）合约到期后，行权买入比特币，并同时在现货市场上卖出挖矿收益和行权买入的比特币。

这一波操作下来，虽然付出了合约费用，但现货市场上卖出的比特币的平均成本将与买入期权是的成本相抵，从而保证了法币本位的挖矿收益。

## 云算力

然而，这个过程里依然存在着风险。

那就是第（1）步里的比特币产出数量的风险。虽然接入一个像 F2Pool 这样稳定可靠的矿池就已经可以为矿工们规避绝大部分风险，但是全网算力的增长而引起的挖矿难度的增长，依然会成为影响矿工收益的风险点。而云算力产品就能解决这个问题。

云算力产品本质上是对矿工们的算力做了一个分销。矿工作为算力供应商，可以选择将一段时间之内的一定算力打包出售给云算力平台。无论币价和挖矿难度怎么变动，矿工都可以为其提供的算力来获取稳定的收益。

这样一波操作下来，虽然肯定要付给云算力平台一些手续费，但是矿工将可以实现把币价波动和挖矿难度增长这两者带来的风险同时转送给算力合约的购买方。简直美滋滋。

但是，它会有些问题：

首先，难度增长是一个非常好预期的东西。一方面比特币的难度调整周期为两周，已经算比较长了，同时期权和期货合约也有以周为单位的。另一方面由于目前全网算力已经很高了，算力和难度的增长都非常稳定，所以基本提前好几天就可以估算出下一个 epoch 的难度，矿工就可以提前调整合约仓位。所以挖矿难度增长带来的风险，其实并没有那么明显。所以我比较怀疑有多少矿工兄弟会为了规避这部分的风险而缴纳一些费用。

其次，与期权或期货合约不同，算力合约的市场交易量非常惨淡（实际上 ViaBTC 曾上线过算力合约交易服务，但几个月前又下架了），即个人投资者们对算力合约的需求并没有那么大。这里面有几点原因：

* 首先是挖矿难度的风险较小所带来的反身效应：风险小也就代表其引起的价格波动会非常小，价格波动小的话就无法从交易中获取可观的收益，交易的性价比就比较低，大家也就更不愿意交易。
* 同时，由于没有办法通过保证金来保证算力的交割，所以也就没有办法形成杠杆，进一步限制了算力合约的价格波动。
* 另外从 Market-Fit 的角度讲，算力合约要进入的其实是个人数字货币理财这个细分市场。在这个市场里已经有不少使用量化交易策略来提供一定收益率的产品。这类产品往往保本保息，并且收益率不低，购买门槛也不高。在这个市场里面，算力合约可能并没有什么竞争力可言。

## 总结一下

期货和期权还是矿工套保的首选方案；云算力产品感觉不是特别 make sense，至少，像我上面所说的，它在个人数字货币理财这个细分市场中并没有办法创造需求，也就很难卖出去。

另外，不同的平台提供的期货和期权产品可能都会有所不同，这部分差异可能也会带来损失，需要仔细确认。币圈还是很乱的，但混乱中透露着希望。

**一个小 idea**：我觉得可以在矿池软件端给矿工兄弟们做个简单易用的套保服务。矿工在软件中导入 BitMex 的 API Key，由矿池软件根据其算力，挖矿难度，自己设定的风险敞口比例等信息，自动开一个合约仓位，一键完成套保服务。