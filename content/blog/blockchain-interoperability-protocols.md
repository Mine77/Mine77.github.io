---
title: "Blockchain Interoperability Protocols"
date: "2018-12-17"
---

Blockchains are self-contained systems. They generally do not have any kind of connections with each other, like isolated islands in the ocean. It's not controversial that making different kinds of blockchain systems can interact with each other could introduce many benefits. The next question we might ask is how to find the right protocol design to achieve the expected interoperability applications, and I hope this post can help you to find the answer to it. 

This post will introduce different protocols for realizing interoperability as well as some problems that needs to be considered when utilizing them. The discussion here only considers the interaction between two blockchain systems. Interactions with other type of systems are not included in this post, as they should be discussed case by case. Also, the discussion will only be carried on a protocol level. Higher level topics, such as user experience, price discovery and order matching are not covered in this post.

## What Exactly is Interoperability?

To answer this question, we can start by looking at several potential blockchain interoperability applications, and try to find the shared problems that need to be solved:

* **Asset Transfer / Portable Asset:** Alice transfers some of her coin from chainA to chainB
* **Asset Exchanges / Atomic Swaps:** Alice uses coinA on chainA in exchange for Bob's coinB on chainB
* **Cross-Chain Contract:** Alice deposits some coinA into a contract on ChainA and get some coinB on chainB

Above describes some applications from a user's perspective, while the actual operations take place in the blockchain systems could be something like:

* **Asset Transfer / Portable Asset:**
    Event X: Alice sends some coins to a black-hole address on chainA (to destroy or burn the coins)
    Event Y: some coins are created (minted) and sent to Alice's address on chainB
* **Asset Exchanges / Atomic Swaps:**
    Event X: Alice transfers coinA to Bob on chainA
    Event Y: Bob transfers coinB to Alice on chainB
* **Cross-Chain Contract:**
    Event X: Alice transfers some coins to a contract on chainA
    Event Y: some coins are created and sent to Alice on chainB
* **To generalize the applications above:**
    Event X: a transaction happens on chainA
    Event Y: a transaction happens on chainB. 

All the event X and Y mentioned above should happen simultaneously or not happen at all (or one of them can be reverted or canceled when the other one do not happen according to a preliminary agreement). For convenience, the notion chainA, chainB, event X, event Y are used all the way through this post. Please consider them as representing the same meaning as shown above by default.

By examining the generalized form of interoperability operation (the last set of event in the list above), hopefully we can arrive at the following conclusion: the essence of realizing interoperability is to design a protocol that can make sure when event X happens on chainA, chainB is able to know and verify this fact, and an event Y on chainB is enforced. To be more accurate, the word “happens” here should be replaced by the word “finalize”, which means a transaction has been agreed on blockchain by most of the validators or operators (51% or 2/3, depending on the consensus mechanism), and it has reached a state that there is a very low probability that this transaction can be altered.

It should be noticed that this generalized form of interoperation is only the most basic atomic elements, and more complex protocols and applications can be built on top of it.

## Notary

One intuitive method is to let a third-party notary serve as a “connector” between two chains. Here we introduce a typical procedure of a notary based interoperation scheme:

* On chainB, event Y is registered along with a trigger that can be pulled by the notary
* On chainA, event X is finalized and the notary witnessed and verified this fact
* The notary trigger the event Y on chainB

The trigger mentioned above could be instantiated in different forms. On a turing-complete blockchain, this can be implemented via a smart contract that verifies the signature of the proof. In the case that the smart contract on chainB can interpret proofs from chainA directly, the smart contract can also be triggered by the proof of event X directly, without the need of notary. This type of contract is called a relay contract, and the details are discussed in the next section. Alternatively, the registration and trigger can also be created [using an escrow account](https://interledger.org/interledger.pdf). (e.g. the coin are transferred into an escrow account and transferred out later when triggered) The escrow account can be controlled by the notary, or controlled by a fourth-party that would conduct the transaction when the notary tells them to do so or when some sort of proofs are presented. 

The notary here can be one entity or a set of entities (a federation) that is trusted by the parties involved in this specific interoperation. In the case of federation-as-notary, different entities can also be united using a blockchain system (in the practice, it should be one that is based on PBFT, in order to reach instant-finality). Furthermore, the trust towards the notary can be derived from some existing trusted systems, such as a bank, or a highly secured and decentralized public blockchain, by designing a staking and slashing mechanism. (For example, to be a notary, one needs to stake a certain amount of coins on a public blockchain, along with a contract that describes a set of rules for being a notary. In the case of this notary acting maliciously, some “fisherman” can submit proof of this notary's malicious activities to this contract, and get this notary punished by a penalizing their staked coins. These fishermen in turn get rewarded from these penalty. In this way, the “fisherman” is incentivized to oversee the notaries, and the notaries are incentivized to be benevolent.)

Upon the registration of event Y, there should be an implementation of some sort of “cancel” or “abort” method, which can revert the registration process (e.g. send the coins back to the user from escrow account). This is a way of protecting against the case when the subsequent procedures are not conducted properly. In Additional, a timeout should also be enforced, in case the user are not available to manually call the  cancel method. Detail specifications should be designed according to the particular application concerned.

There is also the option of letting user or some other third-party server to get a signature from notary, and send this signature to chainB to trigger the event Y, instead of having the notary to send the proof to chainB directly. A later section discusses The question that who the person to relay the message should be.

## Relay Contract

The term “relay contract” here refers to a contract deployed on chainB that can verify the proof about a transaction's finality on chainA, where the proof is generated on chainA directly. This can be seen as a special case of notary scheme where the operator/miner/validator of chainA plays the role as notary. Their original duty is to verify each of the transaction's validity so that the blockchain system is maintained. The trick here is that there are some kinds of proofs generated from these blockchain-keepers' routine verification works, and these proofs can be verified by the relay contract directly, so that the interoperation can be achieved without any intermediaries. Here's a typical procedure of a relay contract based interoperation scheme:

* On chainB, the relay contract is deployed 
* On chainA, event X is finalized and a proof is sent to and verified by the relay contract
* The event Y is triggered by the relay contract on chainB


The most commonly used proof and verification process for relay contract is the SPV (Simple Payment Verification) introduced in Bitcoin, where SPV is used to enable light client node to verify transactions without having the full history of transaction data and UTXO set as does a full node. The basic idea is to let light client node only store the header of each of the blocks on chain, and when there's a need to verify a transaction, a light client node would request a Merkle Proof from a full node. Essentially a Merkle proof is a Merkle Path whereby combining with block header, one can verify if a specific transaction is included in this block. ([See](https://github.com/bitcoinbook/bitcoinbook/blob/develop/ch09.asciidoc#merkle-trees)[here](https://github.com/bitcoinbook/bitcoinbook/blob/develop/ch09.asciidoc#merkle-trees) for Merkle Trees) 

In the case that chainA has a relatively long time-to-finality period (e.g. bitcoin needs 6 blocks for transaction finality), one thing should be noticed is that chainB will need the information about whether the block that packed this transaction has a big enough depth. (Block depth refers to the height difference between this block and the latest block) This will require the relay contract to have data about these extra block headers (6 block headers in bitcoin's case and around 100 in Ethereum's case). One of the potential problems here is that processing the data of 100 block headers signature may exceeds the capability of a contract (i.e. exceeding the block gas limits). So sometimes chainB would need to synchronize all the block headers from the genesis block, and verify each of the block along with the blockchain growing. In this case, it is often said that chainB is a “sidechain” to chainA. 

In addition, another potential weakness is the market volatility problem. In the case when Alice wants to trade some ETH for BTC from Bob, during the period of time when Alice is waiting for her transaction to be finalized (around one hour in Bitcoin's case), there might have been a drastic change in terms of the exchange rate on the open trading market. This market volatility might influence Alice's (or Bob's) willingness to conduct this trade and eventually keep the trade from happening.

It also should be noticed that this approach only works on a turing-complete blockchain, in order to implement precautions against some cheat or attack patterns. One example is the “race condition attack”: in the use case of atomic swap of BTC and ETH between Bob and Alice, Bob would first deploy a relay contract on Ethereum that says whoever send 1 BTC to my address on Bitcoin can claim 1 ETH from this contract, then he could ask Alice to send 1 BTC to his address and at the same time, he send himself 1 BTC as well, then he can use the proof of his transaction to claim the 1 ETH from the relay contract. In some cases he would succeed and leave Alice with nothing and himself with 1 extra BTC. This kind of attack could be prevented by appending a script to Bob's address on Bitcoin that says all the transactions will be ignored except only the first one. However, with Bitcoin's existing script mechanism, it is not feasible to implement this on Bitcoin in anyway, while a mechanism like this can be easily implemented on a turing-complete blockchain.

Even with turing-completeness, there's still a chance that two turing-complete blockchain can not have interoperability with each other. This happens when two blockchains have different selections on their signature functions, serialization algorithms and hash functions. For example, an EVM based blockchain system may only have a fixed set of cryptographic functions available. When chainA and chainB have two different sets of cryptographic functions, it may cost an unacceptable amount of gas for chainA's EVM to interpret the proof from chainB. This problem could be solved by a blockchain with a powerful enough VM on which all kinds of cryptographic primitive functions can run, such as the [RISC-V based CKB-VM](https://medium.com/nervosnetwork/an-introduction-to-ckb-vm-9d95678a7757) used in Nervos CKB.

[Hash-Locking Diagrams]

## Hash-Locking

Hash-locking is an ad-hoc technique for conducting atomic swap, which also works in a cross-chain scenario. Here's a typical procedure for a hash-locking based interoperation scheme:

* Alice generates a key and a lock, and sends the lock to Bob.
* Alice deploy a contract and lock it on chainA says whoever successfully unlocks this contract can claim 1 coinA.
* Bob deploy a contract and lock it on chainB says whoever successfully unlocks this contract can claim 1 coinB.
    (now we have two contracts on two chains with the same lock, whose key is known by Alice but not Bob)
* Alice claim the coinB from Bob's contract on chainB. This process reveals the key to Bob.
* Bob claim the coinA from Alice's contract on chainA.

Here, the key and lock is usually implemented using a hash function: lock = hash (key). 

In this scheme, one thing that has to be noticed is the timeout setting for these two contracts. Normally timeout setting is for preventing coins from being locked in a contract forever, as stated in an earlier section. However in the hash-locking case, it is Alice that has the key at first, and this gives her some privileges that potentially she can make use of the network latency or some other environment parameters to cheat Bob. That is why when setting timeout parameters for the contract, Bob's contract should have a longer period than Alice's contract, so that he will have enough time to handle all kinds of situations. Bob's contract timeout period usually should be double of Alice's (i.e. Alice's contract has x seconds to claim and Bob's has 2x seconds to claim). On the other hand, due to this time-out setting, hash-locking scheme based interoperation could also be influenced by the market volatility problem mentioned above.

## Additional Considerations

One of the issues that is overlooked by above discussions is that who should make the effort to pass messages (proofs) from chainA to chainB. Options include Users, Notary, Chain Miners/Validators/Operators or a Third-Party. However the thing is that the proof we are talking about here are all cryptographically signed by the proof creator. So it is sufficient to argue that the role of message relayer is not relevant to the safety of the protocol. In another aspect, the choice of this role could have significant implications on the UX and system implementation. (e.g. message relayer might charge a fee for relaying messages) 

Once the interoperability is achieved between two blockchain systems, there might be an emerging challenge that the difficulty level for security analysis is largely increased. First of all, the security model of both blockchain systems should be analyzed respectively. This may include trust assumptions like the liveness of blockchain or the Byzantine fault tolerance of the blockchain. Moreover, since the interoperation link is established, an attack towards chainA would very likely impact chainB, and an incident on chainB could also affect chainA. This would require a security model to be formed by considering the two blockchain systems as an integrated system, instead of two separated systems, and thus creates more challenge.

[Multichain Diagrams, two topologies]

## Multi-Chain Interoperability

So far this article has discussed the interoperability between two blockchains, while in the multi-chain scenarios, additional issues might arise as well. One of the major problem is how we should choose the network topology. Another one is how we identify the blockchains.

One of the options to form a network of multiple blockchains for interoperation is to let every two of them connect with each other. This will indeed require a lot of connections to be established and thus seems not effective. However, in the case that all involved blockchains have the identical constructs and implementations (e.g. consortium blockchains deployed for different industries), they all can share the same set of protocol to interact with each other, and thus all of them can read messages from one another. Also the security model would be relatively easier to form. As in the scenario that has many blockchains with different constructs, multiple set of protocols would be needed to exist, and it's nearly impossible to successfully implement them on each of the blockchains, due to the complexity and the amount of effort needed.

Another option is to have a hub-and-spoke network. This has been adopted by [Cosmos](https://cosmos.network/docs/resources/whitepaper.html#inter-blockchain-communication-ibc) and [Polkadot](https://polkadot.network/), both of which have an independent blockchain as a centralized hub or bridge (Comos Hub / Relay Chain). When users on two blockchains in this network want to transfer assets, they will need to first transfer their assets to the hub chain from its origin chain, and then transfer it from the hub chain to the target chain. In the design of Cosmos and Polkadot, they use relay contract based mechanism for interoperability between the hub and their own designed application chains (Zones / Parachains). For the other blockchains, they make use of a set of proxy chains as notary for their interoperation with the hub. In this topology, it is obvious that the security of the hub chain is crucial for the whole security model, and thus deserve extra considerations in the overall protocol design.

The second problem mentioned above is how to identify the blockchains. This is needed because when a blockchain receives a proof, it needs to verify the match between the proof and the blockchain identity claimed in the proof. This is usually achieved by a `chainID` attributes that comes with the proof. The problem is how  the registry of `chainID` is done. In a local hub-and-spoke network with only one hub, it could be registered on the hub chain for it should be most secured blockchain in this network. However in a bigger public network, a secured and decentralized public blockchain would be the first choice to do the registry. As a large scale interoperable blockchain network is yet to come, this topic has not been not widely discussed so far. 

## Conclusion

As there are still many new blockchain systems popping up, and each of them may have very different designs, it would be very difficult to have a generic protocol that can “rule them all”, in terms of enabling interoperability between these blockchain systems. Therefore it is reasonable to make the argument that enabling interoperability for blockchains should be an application-driven process. Different approaches may be suitable for different applications in different scenarios. Once the actual use case is settled, I hope this post can help designers who are seeking interoperability to find the protocol that matches their needs the best. The discussion here does not hope to cover the full spectrum of blockchain interoperability. Comments are more than welcomed in order to make this post more comprehensive.

