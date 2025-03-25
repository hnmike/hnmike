---
source: "https://www.reddit.com/r/vim/comments/1ixyy73/share_your_tips_and_tricks_in_neovim/"
author:
subreddit: "r/vim"
published: ["2025-02-25T16:24:38.084Z","2025-02-25T11:10:34.476Z","2025-02-25T11:10:34.476Z","2025-02-27T01:08:12.639Z","2025-02-26T09:57:17.656Z","2025-02-26T14:11:53.226Z","2025-02-27T22:53:46.860Z","2025-02-27T10:20:33.631Z","2025-02-27T22:49:14.336Z","2025-02-26T20:49:47.669Z","2025-02-27T22:50:35.421Z","2025-02-28T15:09:27.846Z","2025-03-01T00:38:13.317Z","2025-03-01T07:47:12.152Z","2025-03-01T00:38:23.950Z","2025-02-27T14:21:37.325Z","2025-02-27T22:45:50.745Z","2025-02-27T13:47:02.870Z","2025-02-28T11:28:20.207Z","2025-02-27T23:49:40.193Z","2025-02-26T17:24:58.445Z","2025-02-26T17:29:52.401Z","2025-02-26T20:54:07.633Z","2025-02-26T21:34:42.116Z","2025-02-26T21:37:07.473Z","2025-02-26T23:12:29.456Z","2025-02-26T17:34:33.772Z","2025-02-26T21:22:28.340Z","2025-02-27T10:21:30.395Z","2025-02-27T00:47:05.626Z","2025-02-27T05:48:40.677Z","2025-02-28T14:52:58.523Z","2025-02-27T04:44:18.336Z","2025-02-27T10:11:44.196Z","2025-02-27T10:21:52.868Z","2025-02-27T15:12:15.804Z","2025-02-28T15:08:02.907Z","2008-04-04T20:50:08.303Z"]
created: 2025-03-25
image:
tags:
  - "reddit"
---
## Original Post
> [!note]- Original
> ![](https://www.reddit.com/r/vim/comments/1ixyy73/share_your_tips_and_tricks_in_neovim/)
>[!quote] Share your tips and tricks in (neo)vim!

> 

## Comments

> [!quote] ## Comments
> **cbartlett** • [9 points](https://reddit.com/r/vim/comments/1ixyy73/comment/mezpsdh/) • 2025-02-27
> 
> Here’s a list of 50 I wrote up a while back: [https://vimtricks.com/p/50-useful-vim-commands/](https://vimtricks.com/p/50-useful-vim-commands/)
> **jazei\_2021** • [3 points](https://reddit.com/r/vim/comments/1ixyy73/comment/mev0ujy/) • 2025-02-26
> 
> in vim I try to know all (that I can of course, my brain ram is tiny=memory poor) about **orders with g**: like gd; gm; gM; gt (for jumps in tabs) gj/gk; g0; g$; I use tw=0 so gm/gM gj g0 are useful for me.
> 
> > **okociskooko** • [3 points](https://reddit.com/r/vim/comments/1ixyy73/comment/mevype1/) • 2025-02-26
> > 
> > Could you elaborate on them and explain why you find those useful?
> > 
> > > **jazei\_2021** • [1 points](https://reddit.com/r/vim/comments/1ixyy73/comment/mf5ldcj/) • 2025-02-27
> > > 
> > > when you write with tw=0, 1 line can use 10 false-virtual-screen-lines.... how do you change a wrong word at the middle of this false "paragraph"of 1 line? the order gM jumps or goes there.
> 
> **shadow\_phoenix\_pt** • [3 points](https://reddit.com/r/vim/comments/1ixyy73/comment/mf1qfom/) • 2025-02-27
> 
> It's Vim. Don't rely on brain memory, rely on muscle memory :)
> 
> > **jazei\_2021** • [2 points](https://reddit.com/r/vim/comments/1ixyy73/comment/mf5ki0m/) • 2025-02-27
> > 
> > in my case cheat sheet memory!!! LOL some SOME KB my Vim's cheatsheet
> 
> **cainhurstcat** • [1 points](https://reddit.com/r/vim/comments/1ixyy73/comment/meyaclr/) • 2025-02-26
> 
> Can I enter these in normal mode or in execution mode?
> 
> > **jazei\_2021** • [2 points](https://reddit.com/r/vim/comments/1ixyy73/comment/mf5kra3/) • 2025-02-27
> > 
> > normal mode! always in normal mode, they aren't commands, they are orders not commands
> > 
> > > **cainhurstcat** • [2 points](https://reddit.com/r/vim/comments/1ixyy73/comment/mf9fi1l/) • 2025-02-28
> > > 
> > > I see. I still have issues in seeing if it's for normal or execution mode, so thank you for the clarification
> > > 
> > > > **jazei\_2021** • [2 points](https://reddit.com/r/vim/comments/1ixyy73/comment/mfco7n9/) • 2025-03-01
> > > > 
> > > > always anything starting with : is a command and you willwrite it in the last line of vim below.
> > > > 
> > > > when your "command" (my named it like order) haven't any : at starting it is an order.
> > > > 
> > > > :help g
> > > > 
> > > > this help will show you all orders with g
> > > > 
> > > > regards!
> > > > 
> > > > > **cainhurstcat** • [2 points](https://reddit.com/r/vim/comments/1ixyy73/comment/mfee127/) • 2025-03-01
> > > > > 
> > > > > Many thanks to you, fellow Vimthusiast!
> > > > > 
> > > > > **vim-help-bot** • [1 points](https://reddit.com/r/vim/comments/1ixyy73/comment/mfco8sn/) • 2025-03-01
> > > > > 
> > > > > Help pages for:
> > > > > 
> > > > > - [`g`](https://vimhelp.org/index.txt.html#g) in *index.txt*
> > > > > 
> > > > >

> [!quote] > > > > > 
> > > > > <sup>`:(h|help)&nbsp;&lt;query&gt;`&nbsp;|</sup> [<sup>about</sup>](https://github.com/heraldofsolace/VimHelpBot) <sup>|</sup> [<sup>mistake?</sup>](https://github.com/heraldofsolace/VimHelpBot/issues/new/choose) <sup>|</sup> [<sup>donate</sup>](https://liberapay.com/heraldofsolace/donate) <sup>|</sup> <sup>Reply&nbsp;'rescan'&nbsp;to&nbsp;check&nbsp;the&nbsp;comment&nbsp;again</sup> <sup>|</sup> <sup>Reply&nbsp;'stop'&nbsp;to&nbsp;stop&nbsp;getting&nbsp;replies&nbsp;to&nbsp;your&nbsp;comments</sup>
> 
> **ricocotam** • [1 points](https://reddit.com/r/vim/comments/1ixyy73/comment/mf2nd03/) • 2025-02-27
> 
> How does g commands work ? Never understood
> 
> > **jazei\_2021** • [1 points](https://reddit.com/r/vim/comments/1ixyy73/comment/mf5juqa/) • 2025-02-27
> > 
> > gd and other startng with g arenot commands like \*\*:\*\*spell
> > 
> > *they are orders* not commands insted **orders**, you shout not use : at begining
> > 
> > they are used in normal mode and not in command mode
> **vbd** • [3 points](https://reddit.com/r/vim/comments/1ixyy73/comment/mf2hdpj/) • 2025-02-27
> 
> I put some of my scattered notes together hope you can use it for something: [https://github.com/vbd/Fieldnotes/blob/main/vim.md#general](https://github.com/vbd/Fieldnotes/blob/main/vim.md#general)
> 
> > **cainhurstcat** • [2 points](https://reddit.com/r/vim/comments/1ixyy73/comment/mf5vmas/) • 2025-02-27
> > 
> > Wow, what an awesome library! Thank you so much for sharing!
> **\[deleted\]** • [\-2 points](https://reddit.com/r/vim/comments/1ixyy73/comment/mex1spd/) • 2025-02-26
> 
> While I prefer Vim over Neovim, I personally I find your comment rather unwelcoming and unappreciative
> 
> > **cainhurstcat** • [3 points](https://reddit.com/r/vim/comments/1ixyy73/comment/meybb2q/) • 2025-02-26
> > 
> > While I prefer Vim over Neovim, I personally I find your comment rather unwelcoming and unappreciative
> > 
> > > **\[deleted\]** • [\-1 points](https://reddit.com/r/vim/comments/1ixyy73/comment/meykazi/) • 2025-02-26
> > > 
> > > Why haven't you just asked OP about this?
> > > 
> > > > **cainhurstcat** • [1 points](https://reddit.com/r/vim/comments/1ixyy73/comment/meykuoz/) • 2025-02-26
> > > > 
> > > > Why haven't you just asked OP about this?
> 
> **vim-ModTeam** • [2 points](https://reddit.com/r/vim/comments/1ixyy73/comment/mez4gnl/) • 2025-02-26
> 
> Elitism is not tolerated! Our community thrives when we support each other. Treat newcomers with kindness, avoid elitism, and encourage inclusive, positive participation.
> **scottchiefbaker** • [0 points](https://reddit.com/r/vim/comments/1ixyy73/comment/mex3uue/) • 2025-02-26
> 
> You can use `:TOHtml` to convert your open buffer, including syntax highlighting, to HTML.
> **cainhurstcat** • [0 points](https://reddit.com/r/vim/comments/1ixyy73/comment/meyhjyh/) • 2025-02-26
> 
> If you want to add something to the end of every line, go visual block by `ctrl v`, highlight every line you want to edit by `j` or `k`, go to the end of line by `> [!quote], and press `shift a` - Add your input and apply by `esc`
> 
> Quickly navigate vertically by `ctrl y` or `ctrl e`
> 
> Edited a file which you can't save, since you forgot `sudo` (again)? Then `:w !sudo tee %` is your friend
> 
> How to copy from Vim to clipboard: Install `vim-gtk3` and then use `"+y` to copy stuff to the clipboard. This gave me a LOT of headaches when I was new, since most people don't tell the whole requirements to perform it
> **Overlord484** • [\-2 points](https://reddit.com/r/vim/comments/1ixyy73/comment/mezlvw8/) • 2025-02-27
> 
> Probably doesn't help the veterans, but if you're new, definitely add
> 
> nmap h <insert>
> nmap j <left>
> nmap k <down>
> nmap i <up>
> nmap <c-j> b
> nmap <c-k> <pagedown>
> nmap <c-l> w
> nmap <c-i> <pageup>
> 
> to ~/.vimrc. I find jikl to me much more intuitive for moving around than hjkl. 'h' then becomes insert before cursor
> 
> > **biscuittt** • [7 points](https://reddit.com/r/vim/comments/1ixyy73/comment/mf0yndu/) • 2025-02-27
> > 
> > you should post this on [r/unpopularopinion](https://www.reddit.com/r/unpopularopinion/)
> > 
> > > **Overlord484** • [1 points](https://reddit.com/r/vim/comments/1ixyy73/comment/mf9cdfk/) • 2025-02-28
> > > 
> > > [https://www.reddit.com/r/unpopularopinion/comments/1j09fo4/rebind\_your\_vim\_controls/](https://www.reddit.com/r/unpopularopinion/comments/1j09fo4/rebind_your_vim_controls/)
> 
> **lrvideckis** • [4 points](https://reddit.com/r/vim/comments/1ixyy73/comment/mf0q2xu/) • 2025-02-27
> 
> no
> 
> **cainhurstcat** • [1 points](https://reddit.com/r/vim/comments/1ixyy73/comment/mf1pk33/) • 2025-02-27
> 
> As a gamer, I totally feel you, and I would love to use `i` for up, and `k` for down. But the more I advance in Vim, the more I learned that remapping the default keys is all too often a bad idea. That's simply because the mapping is chained to so many other features, which in the long run lead to a crazy mess when remapping all of them.
> 
> Edit: deleted wrong info
> 
> Edit2:
> 
> Quickly navigate vertically by `ctrl y` or `ctrl e`
> 
> > **Overlord484** • [2 points](https://reddit.com/r/vim/comments/1ixyy73/comment/mf2wtq7/) • 2025-02-27
> > 
> > That seems to be the opinion around here, and I definitely understand the logic, but I'm pretty new to VIM (coming from nano) and not having to think about the basic movement keys has been huge for me. Maybe after I use it longer I'll change my mind.
> > 
> > > **cainhurstcat** • [1 points](https://reddit.com/r/vim/comments/1ixyy73/comment/mf9f887/) • 2025-02-28
> > > 
> > > Absolutely feel you, it is a pain to get used to it. The advantage of taking it is that you build muscle memory to the point from where you don't have to think about the keys and just type them - like typewriting. If you start learning it with your custom configuration, it will be even harder to change to the default. What helped me to playfully get used to it was Vim Adventures, a little browser based game to learn Vim.