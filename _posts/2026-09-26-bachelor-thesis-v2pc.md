---
layout: post
title: "My Bachelor's thesis: visual cryptography and secure computation"
date: 2026-09-26 10:00:00
description: What V2PC is, why computing with transparencies is surprisingly fun, and what I learned implementing it in Python.
tags: university cryptography
toc:
  sidebar: left
---

On September 25, 2026 I defended my Bachelor's thesis in Computer Science at the [University of Salerno](https://www.unisa.it/), supervised by Prof. Roberto De Prisco. The title is _"Crittografia visuale e calcolo sicuro: implementazione in Python del protocollo V2PC"_ — in English, _Visual cryptography and secure computation: a Python implementation of the V2PC protocol_.

The code is open source: **[gennarocarmine/bachelor-thesis-tozza](https://github.com/gennarocarmine/bachelor-thesis-tozza)**.

In this post I try to explain, without too much formalism, what the thesis is about.

## Visual cryptography in one picture

Visual cryptography was introduced by Naor and Shamir in 1994. The idea is simple and elegant: a secret image is split into two _shares_, printed on transparencies. Each share, taken alone, looks like random noise and reveals nothing about the secret. But if you stack the two transparencies on top of each other, the secret appears — and your **eyes** do the decryption. No computer is needed.

In the simplest (2,2) scheme, every pixel of the secret is expanded into two sub-pixels, one black and one white, in random order:

- for a **white** pixel, the two shares receive the _same_ pattern, so stacking them gives one black and one white sub-pixel (it looks grey);
- for a **black** pixel, the two shares receive _complementary_ patterns, so stacking them gives two black sub-pixels (it looks fully black).

Stacking transparencies behaves like a Boolean OR, and the contrast between "grey" and "black" is enough for the human visual system to read the secret.

## From sharing secrets to computing on them

Secret sharing is only the beginning. In _secure two-party computation_, two parties — say Alice and Bob — want to compute a function $$f(x, y)$$ of their private inputs $$x$$ and $$y$$, learning the result but nothing else about each other's input. Classic protocols (such as Yao's garbled circuits) do this with a lot of computation.

**V2PC** (Visual Two-Party Computation), proposed by Paolo D'Arco and Roberto De Prisco, asks a more radical question: _can we do secure computation without computers at all_? Their answer is yes, for Boolean circuits, using transparencies:

1. **Construction** — one party prepares, for every gate of the circuit, visual shares for _all_ possible input combinations, without knowing the actual inputs yet;
2. **Distribution** — the other party obtains only the shares that correspond to its own input, through an _oblivious transfer_, so the first party does not learn which ones were chosen;
3. **Reconstruction** — the selected transparencies are physically superimposed, and the result of the function becomes visible.

The protocol is secure in the _semi-honest_ model (both parties follow the rules but try to learn more than they should). Its main practical limit is size: the shares grow quickly with the depth of the circuit, so it works best with shallow formulas.

## What I built

The core of the thesis is a Python implementation of the whole protocol:

- a **command-line tool** that parses Boolean formulas written with standard operators and turns them into circuits;
- the three phases of V2PC (construction, distribution, reconstruction), with a **simulated oblivious transfer** between the two parties;
- a **web demo** that asks for the parties' inputs, visualizes the circuit and shows the shares and their superposition;
- **print-ready output**, with cutting and alignment instructions, so the transparencies can actually be printed and overlaid by hand.

Installation instructions and usage examples are in the [README of the repository](https://github.com/gennarocarmine/bachelor-thesis-tozza).

## What I learned

Implementing a protocol is a very different exercise from reading about it. A few things stood out:

- **Details matter.** Things that look harmless on paper — a default random seed, a hidden field in a web form, the way a pointer bit is encoded — can leak information in a real implementation. Several of these issues came up during testing and review, and fixing them taught me more about security than any exam.
- **Experiments can question the theory.** Measuring the empirical error rate of the reconstruction on many circuits, I noticed that it was better explained by the _total number of gates_ in the circuit than by its _depth_ alone. Discussing and formalizing this observation was one of the most interesting parts of the work.
- **Visual intuition helps.** Being able to _see_ a computation happen by stacking two sheets of plastic is a great way to explain what secure computation is to people who have never heard of it.

## What's next

With the Bachelor's degree completed, I have started the **Master's Degree in Computer Science** at the University of Salerno. Cryptography and theoretical computer science remain the areas I want to explore more deeply.

I would like to thank Prof. De Prisco for his guidance throughout this work. If you are curious, feel free to try the code, open an issue, or get in touch!

## References

- M. Naor, A. Shamir, _Visual Cryptography_, EUROCRYPT 1994.
- P. D'Arco, R. De Prisco, _Secure computation without computers_, Theoretical Computer Science 651 (2016).
