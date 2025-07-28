---
source: https://www.reddit.com/r/neovim/comments/1jdvvei/my_list_of_useful_keybinds_i_dont_see_mentioned/
author: null
subreddit: r/neovim
published:
- '2025-03-18T03:22:52.152Z'
- '2025-03-18T03:43:43.378Z'
- '2025-03-18T06:55:15.701Z'
- '2025-03-18T12:49:31.682Z'
- '2025-03-18T13:06:48.059Z'
- '2025-03-18T03:44:42.004Z'
- '2025-03-18T04:36:18.999Z'
- '2025-03-18T14:45:06.354Z'
- '2025-03-18T08:08:09.844Z'
- '2025-03-18T17:27:36.536Z'
- '2025-03-19T04:39:59.328Z'
- '2025-03-18T13:17:26.918Z'
- '2025-03-18T14:26:02.469Z'
- '2025-03-18T04:01:09.665Z'
- '2025-03-18T08:06:55.470Z'
- '2025-03-18T08:58:16.877Z'
- '2025-03-18T08:07:07.603Z'
- '2025-03-18T07:21:26.529Z'
- '2025-03-18T07:51:46.353Z'
- '2025-03-18T20:20:53.055Z'
- '2025-03-18T15:04:48.930Z'
- '2025-03-18T03:45:57.277Z'
- '2025-03-18T08:34:21.790Z'
- '2025-03-18T10:39:55.199Z'
- '2025-03-18T10:43:11.004Z'
- '2025-03-19T13:48:32.823Z'
- '2025-03-18T07:30:11.406Z'
- '2025-03-18T14:29:56.147Z'
- '2025-03-19T13:35:34.862Z'
- '2025-03-19T14:09:09.519Z'
- '2025-03-19T17:29:10.662Z'
- '2025-03-19T14:09:20.357Z'
- '2025-03-18T15:34:44.984Z'
- '2025-03-18T16:00:26.995Z'
- '2025-03-18T16:11:35.325Z'
- '2025-03-18T23:59:29.611Z'
- '2025-03-18T07:54:34.654Z'
- '2025-03-18T08:23:17.767Z'
- '2025-03-18T06:10:41.535Z'
- '2025-03-18T20:30:43.302Z'
- '2025-03-18T20:32:43.468Z'
- '2014-02-24T09:21:21.727Z'
created: 2025-03-25
image: null
tags:
- reddit
permalink: resources/reddit-my-list-of-useful-keybinds-i-dont-see-mentioned-that-often
---

## Original Post
> [!note]- Original
> ![](https://www.reddit.com/r/neovim/comments/1jdvvei/my_list_of_useful_keybinds_i_dont_see_mentioned/)
>[!quote] My List of useful keybinds I dont see mentioned that often

> 

## Comments

> [!quote] ## Comments
> **nvimmike** • [118 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/midr699/) • 2025-03-18
> 
> Y defaults to y$ in nvim, no need for remap
> 
> > **drillepind42** • [18 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/miecrsz/) • 2025-03-18
> > 
> > TIL
> > 
> > **infernoLP** • [3 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/miff84j/) • 2025-03-18
> > 
> > P also does the same thing as in leader p now too
> > 
> > > **arkie87** • [6 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/mifi0pq/) • 2025-03-18
> > > 
> > > only in visual mode. P in normal mode pastes above.
> **SeoCamo** • [31 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/midrb7w/) • 2025-03-18
> 
> gh as ^ goto first char of line and gl as $ last char of line
> 
> > **Biggybi** • [10 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/midy3y6/) • 2025-03-18
> > 
> > I used to have just this.
> > 
> > But now they're on `H` / `L` for me, cause I use `gh` is a sort of git keymaps leader.
> > 
> > > **pau1rw** • [6 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/miejdsu/) • 2025-03-18
> > > 
> > > I have H, L as buffer navigation.
> > > 
> > > **lturtsamuel** • [2 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/migy4d6/) • 2025-03-18
> > > 
> > > By default H and L are for jumping to first line/last line in sight. I find the default behaviour quite useful.
> > > 
> > > > **Biggybi** • [1 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/mikfr2z/) • 2025-03-19
> > > > 
> > > > I hardly use it, so I shamelessly bind them to `gH` and `gL`. Same for `gM`.
> > 
> > **arkie87** • [1 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/mifjt64/) • 2025-03-18
> > 
> > does that work with dL -> d$? I am trying it now on ideavim and its not working.
> > 
> > > **Intelligent-Speed487** • [2 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/mifwis4/) • 2025-03-18
> > > 
> > > Yes it does, you can also do vH, or vL to select text. It's pretty handy, but you can also just do 'D' for d$.  
> > > I like mapping L to g\_ better since that behaves like ^ compared to 0 but for the end of line, i.e. g\_ takes you to the last text, and $ to eol.
> 
> **GiantDad777** • [2 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/midtkph/) • 2025-03-18
> 
> I got used to that when trying Helix for a few months. Had to map it in Neovim
> **Riesling-Schorle** • [18 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/miej9t0/) • 2025-03-18
> 
> In case you were not aware, there are two default mapping that partially fulfill or conflict with
> 
>     nmap Q u/q  # Easy repeating of macro saved to q register    nmap Q @q  # Easy repeating of macro saved to q register
> 
> > Q Repeat the last recorded register \[count\] times. See |reg\_recorded()|.
> 
> `:h Q`
> 
> > @@ Repeat the previous @{0-9a-z":\*} \[count\] times.
> 
> `:h @@`
> 
> > **vim-help-bot** • [3 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/miejafj/) • 2025-03-18
> > 
> > Help pages for:
> > 
> > - [`Q`](https://neovim.io/doc/user/repeat.html#Q) in *repeat.txt*
> > - [`@@`](https://neovim.io/doc/user/repeat.html#%40%40) in *repeat.txt*
> > 
> >

> [!quote] > > 
> > <sup>`:(h|help)&nbsp;&lt;query&gt;`&nbsp;|</sup> [<sup>about</sup>](https://github.com/heraldofsolace/VimHelpBot) <sup>|</sup> [<sup>mistake?</sup>](https://github.com/heraldofsolace/VimHelpBot/issues/new/choose) <sup>|</sup> [<sup>donate</sup>](https://liberapay.com/heraldofsolace/donate) <sup>|</sup> <sup>Reply&nbsp;'rescan'&nbsp;to&nbsp;check&nbsp;the&nbsp;comment&nbsp;again</sup> <sup>|</sup> <sup>Reply&nbsp;'stop'&nbsp;to&nbsp;stop&nbsp;getting&nbsp;replies&nbsp;to&nbsp;your&nbsp;comments</sup>
> **Prestigious\_Rest8751** • [54 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/mief6bz/) • 2025-03-18
> 
> nnoremap <up> :!rm -rf \*<CR>
> nnoremap <down> :!rm -rf \*<CR>
> nnoremap <left> :!rm -rf \*<CR>
> nnoremap <right> :!rm -rf \*<CR>
> 
> > **Fragrant\_Shine3111** • [6 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/miehwi2/) • 2025-03-18
> > 
> > based
> > 
> > **metalrunner** • [4 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/mihzfh1/) • 2025-03-18
> > 
> > I see you refactor code.
> > 
> > **qbantek** • [3 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/mig4bie/) • 2025-03-18
> > 
> > 😳
> **ringbuffer\_\_** • [7 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/midrhii/) • 2025-03-18
> 
> U <C-r> I just use this.
> **hash0** • [6 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/mielq2v/) • 2025-03-18
> 
> nnoremap Y yg\_ # Yanks to end of line but without whitespaces
> **eastballz** • [4 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/miexvrr/) • 2025-03-18
> 
> Here's a couple I find very useful:
> 
> \-- text object to select entire buffer. 
> -- So you can do \`yie\` / \`die\` / \`vie\` to yank / delete /select the entire buffer
> vim.keymap.set("o", "ie", ":<c-u>normal! mzggVG<cr>\`z")
> vim.keymap.set("x", "ie", ":<c-u>normal! ggVG<cr>")
> 
> -- replace visual selection on all buffer. 
> -- Replaces a lot of the 'multicursor' features in other editors like vscode
> -- You can use \\0 when replacing to reference the selected text!
> vim.keymap.set("v", "R", '"hy:%s/<c-r>h//gc<left><left><left>')
> **ReaccionRaul** • [2 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/mim9hjw/) • 2025-03-19
> 
> I use spanish keyboard, so to make it more comfortable I have mapped
> 
> - ñ to ;
> - minus to /
> - plus to {
> - ç to }
> ![Comment Image](https://preview.redd.it/my-list-of-useful-keybinds-i-dont-see-mentioned-that-often-v0-4beawzininpe1.png?width=720&format=png&auto=webp&s=024ab4eaff5540012021b9301238f9c89176135a)
> 
> This lets me move very fast. I think + and ç would make also a good map for \] \[ , but I'm happy to have { } easily accesible, they have become my control-d , control-u replacement.
> 
> Other than that, ctrl-j and ctrl-k to zj\_ and zk\_ . With folds set as indent it gives me very powerful navigation as well to move between indent levels with no hassle. Those are the best. The rest are things like <leader>hj for hunks, <leader>qj for quickfix and similar patterns for diagnostics etc.
> **PieceAdventurous9467** • [3 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/miefym3/) • 2025-03-18
> 
> Keep same logic from \`y\`/\`c\`/\`d\` on \`v\` for selection
> 
> nnoremap V v$ -- Select until end of line  
> nnoremap vv V -- Enter visual linewise mode
> 
> > **Intelligent-Speed487** • [0 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/mifxasz/) • 2025-03-18
> > 
> > So does that mean you just use <esc> to exit visual?
> > 
> > > **arkie87** • [3 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/mim76lo/) • 2025-03-19
> > > 
> > > v will still exit visual mode
> > > 
> > > > **Intelligent-Speed487** • [1 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/mimd71f/) • 2025-03-19
> > > > 
> > > > Wouldn't this cause neovim to stutter for a bit since neovim would be waiting to see if there's a second key in the map (i.e. entering visual 'v' or waiting to see if you're entering 'vv' before it knows which visual mode to do)?
> > > > 
> > > > See  :h timeout   :h timeoutlen
> > > > 
> > > > > **arkie87** • [3 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/minhq9t/) • 2025-03-19
> > > > > 
> > > > > Not 100% sure. But it could enter visual mode and then if you hit another v, enter line visual mode.
> > > > > 
> > > > > Usually, when entering visual mode, you combine it with other keys anyway, so it will instantly know which mode you were intending.
> > > > > 
> > > > > Eg. vw or vaw vj etc
> > > > > 
> > > > > **vim-help-bot** • [1 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/mimd89h/) • 2025-03-19
> > > > > 
> > > > > Help pages for:
> > > > > 
> > > > > - [`timeoutlen`](https://neovim.io/doc/user/options.html#%27timeoutlen%27) in *options.txt*
> > > > > 
> > > > >

> [!quote] > > > > > 
> > > > > <sup>`:(h|help)&nbsp;&lt;query&gt;`&nbsp;|</sup> [<sup>about</sup>](https://github.com/heraldofsolace/VimHelpBot) <sup>|</sup> [<sup>mistake?</sup>](https://github.com/heraldofsolace/VimHelpBot/issues/new/choose) <sup>|</sup> [<sup>donate</sup>](https://liberapay.com/heraldofsolace/donate) <sup>|</sup> <sup>Reply&nbsp;'rescan'&nbsp;to&nbsp;check&nbsp;the&nbsp;comment&nbsp;again</sup> <sup>|</sup> <sup>Reply&nbsp;'stop'&nbsp;to&nbsp;stop&nbsp;getting&nbsp;replies&nbsp;to&nbsp;your&nbsp;comments</sup>
> > 
> > **PieceAdventurous9467** • [1 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/migafuh/) • 2025-03-18
> > 
> > yes or <c-\[>, that's the default way, right? these keymaps don't affect that
> > 
> > > **Intelligent-Speed487** • [1 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/migfrzm/) • 2025-03-18
> > > 
> > > Oh ok. Yes, the default way is <esc>, <c-\[> or 'v'. That's an interesting way to customize keybindings. I can see the appeal of it too.
> > > 
> > > > **PieceAdventurous9467** • [3 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/migi2r2/) • 2025-03-18
> > > > 
> > > > yy -- yanks the whole line  
> > > > cc -- deletes the whole line and enters insert mode  
> > > > dd -- delete whe whole line
> > > > 
> > > > Y -- yanks till end of line  
> > > > C -- deletes till end of line and enters insert mode  
> > > > D -- deletes till end of line
> > > > 
> > > > vv and V remapped like that, it's just continuing with the same logic
> > > > 
> > > > > **Intelligent-Speed487** • [1 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/mij6u1a/) • 2025-03-18
> > > > > 
> > > > > That's a good point. I hadn't realized that the default isn't consistent, sorta like cw vs caw, versus dw or yw or the others.
> **trcrtps** • [\-7 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/miei5iw/) • 2025-03-18
> 
> if I didn't know what these did, your comments would be useless. so maybe they could be explained better.
> 
> (this sounds like a dickhead comment but not intended to be!)
> **SpecificFly5486** • [0 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/mie8hrg/) • 2025-03-18
> 
> nmap c “\_c, so when you don’t want to cover unnamed register you use c..<esc> instead.
> 
> Also yanky.nvim solves the yank problem elegantly.
> **Fantastic\_Cow7272** • [1 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/mii1irm/) • 2025-03-18
> 
> Three mappings that I like a lot:
> 
> nnoremap <expr> S @\_<Esc>"{v:register}{v:count1 \* 2 - 1}ciw'
> nnoremap X daw
> nnoremap <bs> X
> 
> First one changes \[count\] words (the part before the `ciw` ignores and modifies the count given so that we actually select \[count\] words since `iw` counts whitespace around a word as a separate word), second one deletes \[count\] words and whitespace around it. The third one is just so that I have access to the original behavior of `X` (I don't need to make a mapping to `S` since `cc` already does the same thing).
> **NeonVoidx** • [1 points](https://reddit.com/r/neovim/comments/1jdvvei/comment/mii1xte/) • 2025-03-18
> 
> I actually have D and C as my black hole delete and change. works great