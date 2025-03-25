---
source: "https://www.reddit.com/r/neovim/comments/1abd2cq/what_are_your_favorite_tricks_using_neovim/"
author:
subreddit: "r/neovim"
published: ["2024-01-26T07:45:40.749Z","2024-01-26T09:15:26.049Z","2024-01-26T16:00:09.253Z","2024-01-26T16:23:55.602Z","2024-01-27T02:15:01.201Z","2024-01-26T09:28:47.608Z","2024-01-26T10:39:40.692Z","2024-01-26T10:45:12.725Z","2024-01-26T13:46:47.443Z","2024-01-26T13:46:59.463Z","2024-01-26T11:44:08.164Z","2024-01-27T01:12:37.145Z","2024-01-27T01:57:10.346Z","2024-01-27T03:07:44.272Z","2024-01-27T05:44:05.718Z","2024-01-27T07:32:11.605Z","2024-01-27T07:45:26.391Z","2024-01-26T10:34:20.630Z","2024-01-26T10:47:48.462Z","2024-01-27T04:16:50.859Z","2024-01-27T12:14:08.610Z","2024-01-26T11:29:38.177Z","2024-01-26T12:27:46.771Z","2024-01-26T12:29:18.006Z","2024-01-26T12:33:07.430Z","2024-01-26T21:06:50.229Z","2024-01-26T21:11:02.687Z","2024-01-27T01:02:21.486Z","2024-01-27T01:06:08.435Z","2024-01-27T01:55:00.293Z","2024-01-27T02:34:57.808Z","2024-01-27T11:53:02.557Z","2024-01-26T21:39:03.870Z","2024-01-26T08:12:54.421Z","2024-01-26T13:27:26.093Z","2024-01-26T16:49:21.372Z","2024-01-26T18:21:36.754Z","2024-01-26T22:39:06.638Z","2024-01-27T00:23:49.274Z","2024-01-28T09:07:32.314Z","2024-01-27T00:22:25.755Z","2024-01-27T08:52:57.100Z","2024-01-26T16:15:18.012Z","2024-01-26T09:22:32.201Z","2024-01-26T11:21:28.541Z","2024-01-26T11:30:27.546Z","2024-01-26T11:53:57.281Z","2024-01-26T13:44:29.855Z","2024-01-26T13:56:53.205Z","2024-01-26T23:45:39.916Z","2024-01-26T17:09:09.949Z","2024-01-26T22:07:20.398Z","2024-01-28T02:41:44.074Z","2024-01-27T04:25:09.834Z","2024-01-26T17:20:40.469Z","2024-01-26T18:58:38.973Z","2024-01-26T23:11:25.807Z","2024-01-27T01:22:07.325Z","2024-01-31T23:54:38.434Z","2024-01-26T17:48:41.371Z","2024-01-26T18:01:38.880Z","2024-01-26T18:25:50.083Z","2024-01-26T15:17:06.618Z","2024-01-27T06:39:34.504Z","2024-01-26T19:59:16.896Z","2024-01-26T20:04:14.305Z","2024-01-26T22:10:50.573Z","2024-01-27T02:53:45.616Z","2024-01-27T04:57:05.800Z","2024-01-30T22:11:07.665Z","2024-01-30T22:40:11.273Z","2024-01-26T09:46:37.467Z","2024-01-26T10:04:15.135Z","2024-01-26T11:26:41.656Z","2024-01-26T16:14:13.643Z","2024-01-27T10:45:08.285Z","2024-01-26T10:10:40.435Z","2024-01-26T11:12:55.741Z","2024-02-21T01:58:58.842Z","2024-01-27T12:38:47.181Z","2024-01-26T09:02:31.068Z","2024-01-26T16:35:45.086Z","2024-01-26T16:03:07.029Z","2024-01-26T21:43:11.141Z","2024-01-27T04:37:37.417Z","2024-01-27T04:41:54.810Z","2024-01-27T04:48:58.135Z","2024-01-26T22:09:24.566Z","2024-01-27T16:08:42.010Z","2024-01-26T14:03:59.742Z","2024-01-26T20:07:13.869Z","2024-01-26T22:19:57.909Z","2024-01-26T23:48:07.130Z","2024-01-26T22:39:15.011Z","2024-01-27T06:42:52.781Z","2024-01-27T15:16:10.184Z","2024-01-26T17:28:22.488Z","2024-01-27T03:43:21.230Z","2024-01-26T16:11:11.251Z","2024-01-26T16:15:48.620Z","2024-01-26T19:33:10.138Z","2024-01-27T02:08:26.562Z","2024-01-27T08:27:45.216Z","2024-01-28T08:37:14.137Z","2024-01-28T08:56:26.219Z","2024-01-28T15:37:21.686Z","2024-02-07T14:07:26.033Z","2014-02-24T09:21:21.727Z"]
created: 2025-03-25
image:
tags:
  - "reddit"
---
## Original Post
> [!note]- Original
> ![](https://www.reddit.com/r/neovim/comments/1abd2cq/what_are_your_favorite_tricks_using_neovim/)
>[!quote] What are your favorite tricks using Neovim?

> 

## Comments

> [!quote] ## Comments
> **Ludo\_Tech** • [73 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjmv9jz/) • 2024-01-26
> 
> I have this for years in my config, not much but I can't do without now:
> 
> \-- Jump to last edit position on opening file
> vim.cmd(\[\[
>   au BufReadPost \* if expand('%:p') !~# '\\m/\\.git/' && line("'\\"") > 1 && line("'\\"") <= line("$") | exe "normal! g'\\"" | endif
> \]\])
> 
> > **Rainy\_J** • [69 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjo7moz/) • 2024-01-26
> > 
> > You can also do
> > 
> > vim.api.nvim\_create\_autocmd('BufReadPost', {
> >   desc = 'Open file at the last position it was edited earlier',
> >   group = misc\_augroup,
> >   pattern = '\*',
> >   command = 'silent! normal! g\`"zv'
> > })
> > 
> > > **Ludo\_Tech** • [10 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjobs1p/) • 2024-01-26
> > > 
> > > That's very clean.
> > > 
> > > > **marcmerrillofficial** • [31 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjr28r8/) • 2024-01-27
> > > > 
> > > > Let's see Paul Allen's autocmd.
> 
> **16bitMustache** • [8 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjmwblc/) • 2024-01-26
> 
> That sounds super nice! I will definitely test this thing out, awesome work!
> 
> > **Ludo\_Tech** • [12 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjn20vs/) • 2024-01-26
> > 
> > I wish it was my work but the truth is that I shamelessly stole it ^^
> > 
> > EDIT: fortunately I can give credit where credit is due:  
> > [https://stackoverflow.com/questions/31449496/vim-ignore-specifc-file-in-autocommand](https://stackoverflow.com/questions/31449496/vim-ignore-specifc-file-in-autocommand)
> > 
> > > **eeeXun** • [19 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjnmjca/) • 2024-01-26
> > > 
> > > You can see this in vim help. `:h last-position-jump`.
> > > 
> > > Also, the lua version
> > > 
> > > vim.api.nvim\_create\_autocmd("BufReadPost", {
> > >     callback = function()
> > >         local mark = vim.api.nvim\_buf\_get\_mark(0, '"')
> > >         if mark\[1\] > 1 and mark\[1\] <= vim.api.nvim\_buf\_line\_count(0) then
> > >             vim.api.nvim\_win\_set\_cursor(0, mark)
> > >         end
> > >     end,
> > > })
> > > 
> > > > **vim-help-bot** • [4 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjnmkc2/) • 2024-01-26
> > > > 
> > > > Help pages for:
> > > > 
> > > > - [`last-position-jump`](https://neovim.io/doc/user/usr_05.html#last-position-jump) in *usr\_05.txt*
> > > > 
> > > >

> [!quote] > > > > 
> > > > <sup>`:(h|help)&nbsp;&lt;query&gt;`&nbsp;|</sup> [<sup>about</sup>](https://github.com/heraldofsolace/VimHelpBot) <sup>|</sup> [<sup>mistake?</sup>](https://github.com/heraldofsolace/VimHelpBot/issues/new/choose) <sup>|</sup> [<sup>donate</sup>](https://liberapay.com/heraldofsolace/donate) <sup>|</sup> <sup>Reply&nbsp;'rescan'&nbsp;to&nbsp;check&nbsp;the&nbsp;comment&nbsp;again</sup> <sup>|</sup> <sup>Reply&nbsp;'stop'&nbsp;to&nbsp;stop&nbsp;getting&nbsp;replies&nbsp;to&nbsp;your&nbsp;comments</sup>
> 
> **cyanghxst** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjn7w8r/) • 2024-01-26
> 
> thanks for the tip. this is gonna make my life easier!
> 
> **Normanras** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjqt59a/) • 2024-01-27
> 
> I have a stupid question unrelated to your function - when people comment on this sub with functions like yours, where are people organizing them all? Just added to your init.lua? A separate file full of custom functions? Something else?
> 
> > **kcx01** • [4 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjqznrt/) • 2024-01-27
> > 
> > For something like this, I have an autocommands.lua file that gets required in the init.lua file.
> > 
> > In fact my init.lua file is exclusively require statements. This helps break it up into more logical segments.
> > 
> > > **Normanras** • [1 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjr9r7g/) • 2024-01-27
> > > 
> > > Awesome, this is the road I’ve also been going down as well to separate my keymaps file and settings file, but haven’t dove too much into autocommands. Thanks!
> 
> **RictorScaleHNG** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjrsnty/) • 2024-01-27
> 
> Jesus christ that is cryptic
> 
> > **Ludo\_Tech** • [3 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjs2qyu/) • 2024-01-27
> > 
> > Yeah, I didn't even tried to understand it... Fortunately, there are lot cleaner versions in the comments.
> > 
> > **Equux** • [1 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjs3vns/) • 2024-01-27
> > 
> > Yeah I kinda wish it was a little more clear. Like does it just open at the last place, or is there a key bind?
> **blirdtext** • [66 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjn1kww/) • 2024-01-26
> 
> smart dd, only yank the line if it's not empty:
> 
> function M:Smart\_dd()
> 	if vim.api.nvim\_get\_current\_line():match("^%s\*$") then
> 		return '"\_dd'
> 	else
> 		return "dd"
> 	end
> end
> 
> . repeat or execute macro on all visually selected lines (eg. press A"<esc> on line one, select all others, press . and they all end in "):
> 
> keymap("x", ".", ":norm .<CR>", nosilent)
> keymap("x", "@", ":norm @q<CR>", nosilent)
> 
> leader xp -> paste registry to system clipboard
> 
> leader xc -> copy current path + line number to system clipboard
> 
> leader xo -> open current copied path with :e (+ [vim-fetch](https://github.com/wsdjeg/vim-fetch) to go to the line number)
> 
> keymap("n", "<Leader>xp", ":call setreg('+', getreg('@'))<CR>", opts)
> keymap("n", "<Leader>xc", ":call setreg('+', expand('%:.') .. ':' .. line('.'))<CR>", opts)
> keymap("n", "<Leader>xo", ":e <C-r>+<CR>", { noremap = true, desc = "Go to location in clipboard" })
> 
> leader rk-> make a [fighting kirby](https://youtu.be/N-X_zjU5INs?t=476) to replace stuff
> 
> leader re -> replace visually selected word, or word under cursor
> 
> keymap("x", "<leader>rk", ":s/\\\\(.\*\\\\)/\\\\1<left><left><left><left><left><left><left><left><left>", nosilent)
> keymap("n", "<leader>rk", ":s/\\\\(.\*\\\\)/\\\\1<left><left><left><left><left><left><left><left><left>", nosilent)
> keymap("v", "<leader>re", '"hy:%s/<C-r>h/<C-r>h/gc<left><left><left>', nosilent)
> keymap("n", "<leader>re", ":%s/<C-r><C-w>/<C-r><C-w>/gcI<Left><Left><Left><Left>", nosilent)
> 
> open tmux pane with path of current file:
> 
> keymap("n", "<leader>tm", ":let $VIM\_DIR=expand('%:p:h')<CR>:silent !tmux split-window -hc $VIM\_DIR<CR>", nosilent)
> 
> toggle quickfix:
> 
> function M:CToggle()
> 	local qf\_exists = false
> 	for \_, win in pairs(vim.fn.getwininfo()) do
> 		if win\["quickfix"\] == 1 then
> 			qf\_exists = true
> 		end
> 	end
> 	if qf\_exists == true then
> 		vim.cmd("cclose")
> 		return
> 	end
> 	if not vim.tbl\_isempty(vim.fn.getqflist()) then
> 		vim.cmd("copen")
> 	end
> end
> 
> > **AnythingApplied** • [4 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjriprp/) • 2024-01-27
> > 
> > One suggestion for your "<leader>re" keymap is to add `\<` and `\>` around the word so it'll only match on the full word (those symbols match the start and end of words). So you might like this instead:
> > 
> > `:%s/\\<<C-r><C-w>\\>/<C-r><C-w>/gcI<Left><Left><Left><Left>`
> > 
> > Thanks for your comment. Definitely put a couple of these into my config!
> > 
> > > **blirdtext** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjspqr5/) • 2024-01-27
> > > 
> > > Oh yeah, I learned about this once and forgot to put it in my config, thanks!
> 
> **16bitMustache** • [3 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjn6hpv/) • 2024-01-26
> 
> These are all so cool! I will definitely have to take the time to test these out! I especially love the tmux in the same path bind.
> 
> > **blirdtext** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjnch13/) • 2024-01-26
> > 
> > Thank you, these are found from other people's configs or just minor annoyances I try to fix myself.
> > 
> > The tmux one took me some time to figure out.  
> > I mostly use it to run tests in tmux, but possibilities are endless.
> > 
> > > **16bitMustache** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjncnap/) • 2024-01-26
> > > 
> > > Agreed. That's the beauty of Neovim.
> > > 
> > > > **blirdtext** • [4 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjnd2vc/) • 2024-01-26
> > > > 
> > > > Indeed, and I forgot this book: [practical vim](https://pragprog.com/titles/dnvim2/practical-vim-second-edition/) is a really nice read!  
> > > > That's where I found out about \`:norm .\`. Not everything in the book is still relevant (it was written before widespread LSP integration for example), but I still found it interesting.
> 
> **Elephant\_In\_Ze\_Room** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjppkix/) • 2024-01-26
> 
> > function M:Smart\_dd() if vim.api.nvim\_get\_current\_line():match("<sup>%s*$")</sup> then return '"\_dd' else return "dd" end end
> 
> I like this a lot. What would it look like in lua? This seems kind of close but not quite there. Well unless it is lua already? I haven't seen vimscript before and I don't understand the `M:` piece
> 
> function smart\_dd()
>     local current\_line = vim.api.nvim\_get\_current\_line()
> 
>     if current\_line:match("^%s\*$") then
>         return '"\_dd'
>     else
>         return "dd"
>     end
> end
> 
> vim.keymap.set("n", "dd", smart\_dd, { desc = "Only yank text with dd from non-empty lines" })
> 
> > **ynotvim** • [3 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjqrmy7/) • 2024-01-27
> > 
> > The [version you're asking about](https://www.reddit.com/r/neovim/comments/1abd2cq/what_are_your_favorite_tricks_using_neovim/kjn1kww) is Lua, but here's another version (taken from [this blog post](https://nanotipsforvim.prose.sh/keeping-your-register-clean-from-dd)).
> > 
> > keymap\_set("n", "dd", function()
> >     if fn.getline(".") == "" then
> >         return '"\_dd'
> >     end
> >     return "dd"
> > end, { expr = true })
> > 
> > Re the `M:` syntax, `M` is a conventional name for a table that stores the code in a Lua module (e.g., `local M = {}` at the top of a module). Everything gets stored in `M`, and then at the end of the module you `return M` to export the module's code. As for the colon, here's how [the official docs explain it](https://www.lua.org/manual/5.1/manual.html#2.5.9):
> > 
> > > The colon syntax is used for defining methods, that is, functions that have an implicit extra parameter self. Thus, the statement
> > > 
> > > function t.a.b.c:f (params) body end
> > > 
> > > is syntactic sugar for
> > > 
> > > t.a.b.c.f = function (self, params) body end
> > 
> > > **Elephant\_In\_Ze\_Room** • [1 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjqzck5/) • 2024-01-27
> > > 
> > > > keymap\_set("n", "dd", function() if fn.getline(".") == "" then return '"\_dd' end return "dd" end, { expr = true })
> > > 
> > > Amazing, thank you. Subscribed to that blog as well.
> > > 
> > > > **ynotvim** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjr54kw/) • 2024-01-27
> > > > 
> > > > > `:match("^%s*$")`
> > > > 
> > > > I liked this bit so much that I adapted the blog post.
> > > > 
> > > > keymap\_set("n", "dd", function()
> > > >     if fn.getline("."):match("^%s\*$") then
> > > >         return '"\_dd'
> > > >     end
> > > >     return "dd"
> > > > end, { expr = true })
> 
> **Alleyria** • [1 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjpv6bm/) • 2024-01-26
> 
> This is lua.
> **\_Krujo\_** • [23 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjmq7z1/) • 2024-01-26
> 
> `:g/searchterm/normal<commands>` and the same for `:v`
> **\[deleted\]** • [29 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjnjv8w/) • 2024-01-26
> 
> This is not only for Neovim, but swapping the Esc key with the CapsLock key was a life-changer for me.
> 
> > **Tred27** • [7 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjog9yu/) • 2024-01-26
> > 
> > And Ctrl when held
> > 
> > > **sublimesinister** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjown8f/) • 2024-01-26
> > > 
> > > Hyper when held!
> > > 
> > > **my\_mix\_still\_sucks** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjq5h0l/) • 2024-01-26
> > > 
> > > What how do you do that? So you're in normal mode just while you hold Ctrl? That's kinda cool
> > > 
> > > > **ExplodingStrawHat** • [3 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjqlu8d/) • 2024-01-27
> > > > 
> > > > You can either do it st the hardware level if your keyboard supports qmk or similar firmware. Otherwise you can do it at the software level using kanata and other similar programs. I personally avoid the caps lock key in the first place and simply set up homerow chords (i.e., I can press jk at the same time to leave insert mode)
> > > > 
> > > > **cyanghxst** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjxhci2/) • 2024-01-28
> > > > 
> > > > you can achieve this by using [karabiner elements](https://karabiner-elements.pqrs.org/) or [hyperkey](https://hyperkey.app/) (from the same guy who made [rectangle](https://rectangleapp.com/)). though i prefer the latter because it's easier to work with
> 
> **ExplodingStrawHat** • [1 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjqlmox/) • 2024-01-27
> 
> Even better is setting up a chord on the homerow. I can press jk at the same time to exit insert mode and ji to save. I like to decouple the esc key from leaving insert mode, as some plugins (I don't remember if telescope is one of them) open windows which auto close on esc, which is often the opposite of what you want.
> 
> > **qvantry** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjs9hky/) • 2024-01-27
> > 
> > I’d love to try this, but I’m using Colemak, so there arent really any homerow set of keys which are really infrequently written in sequence as it’s designed for rolling :S
> 
> **Ludo\_Tech** • [1 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjoa9cs/) • 2024-01-26
> 
> I agree!
> **javslvt** • [9 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjmvtyt/) • 2024-01-26
> 
> if it helps u, this is my [dotfiles](https://github.com/di4m0nds/dotfiles) config
> 
> > **16bitMustache** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjn5q27/) • 2024-01-26
> > 
> > Those screenshots look clean af! Thanks for sharing.
> > 
> > **no\_brains101** • [1 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjn6khy/) • 2024-01-26
> > 
> > how the actual heck does red become harder to see on that background than white does? I can read the white text fine but somehow the red is what dissapears into it?
> > 
> > > **javslvt** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjn8vtw/) • 2024-01-26
> > > 
> > > the color quirks.. but anyway, you can tweak the contrast with these settings in your [settings.json](https://github.com/di4m0nds/dotfiles/blob/b67ef74caf2b1e01d3082aa1776cbcf66ece4148/_windows-terminal-config/settings.json#L129):  
> > > `"useAcrylic": true,`  
> > > `"acrylicOpacity": 0.1`
> > > 
> > > > **no\_brains101** • [1 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjnm7r9/) • 2024-01-26
> > > > 
> > > > Oh dw Im on nixos I wasnt about to swap onto windows and use the config XD
> > > > 
> > > > [https://github.com/BirdeeHub/nixCats-nvim/tree/nixCats-5.0.0](https://github.com/BirdeeHub/nixCats-nvim/tree/nixCats-5.0.0)
> > > > 
> > > > This 5.0.0 branch is going live this week now that the PR I needed for a lazy wrapper has finally hit nixpkgs master XD This becomes the main branch the moment it hits nixpkgs-unstable in a day or 2
> > > > 
> > > > Its a kickstarter style thing for importing your neovim config as-is into nix, and then doing all sorts of crazy nix stuff with it without backing yourself into corners
> > > > 
> > > > > **javslvt** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjnnyg4/) • 2024-01-26
> > > > > 
> > > > > ah, gotcha! 🤙- looks rad! maybe I’ll give it a spin later
> 
> **SconeMc** • [1 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjqg1me/) • 2024-01-26
> 
> super clean. reminds me of my own [windows-based dots.](https://github.com/scottmckendry/windots)
> **scottf** • [9 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjojs2y/) • 2024-01-26
> 
> I keymap the following command:
> 
> :%s/<C-r><C-w>/
> 
> Using the keymap will take the word under the cursor and populate the beginning of a global search and replace command. I just add what I want to change it to and maybe add some flags and execute it.
> 
> I first started using OG vi so I am well versed in regex so this has been my go to way of search/replace for a very long time.
> 
> > **UnrealApex** • [3 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjq03xa/) • 2024-01-26
> > 
> > Lua version:
> > 
> > \-- handle unpack deprecation
> > table.unpack = table.unpack or unpack
> > function get\_visual()
> >   local \_, ls, cs = table.unpack(vim.fn.getpos("v"))
> >   local \_, le, ce = table.unpack(vim.fn.getpos("."))
> >   return vim.api.nvim\_buf\_get\_text(0, ls - 1, cs - 1, le - 1, ce, {})
> > end
> > 
> > vim.keymap.set("v", "<C-r>", function()
> >   local pattern = table.concat(get\_visual())
> >   -- escape regex and line endings
> >   pattern =
> >     vim.fn.substitute(vim.fn.escape(pattern, "^$.\*\\\\/~\[\]"), "\
", "\\\
", "g")
> >   -- send substitute command to vim command line
> >   vim.api.nvim\_input("<Esc>:%s/" .. pattern .. "//g<Left><Left>")
> > end)
> > 
> > **AnythingApplied** • [1 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjrjqci/) • 2024-01-27
> > 
> > I made this comment elsewhere in this thread, but you might like the addition of `\<` and `\>` which match word boundaries, that way you'd only match on complete word matches.
> > 
> > `vim.keymap.set("n", "<leader>re", ":%s/\\<<C-r><C-w>\\>/<C-r><C-w>/gcI<Left><Left><Left><Left>")`
> **\[deleted\]** • [9 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjoltby/) • 2024-01-26
> 
> Often when I'm in a large project, I go to definitions or declarations to have a better idea of what's going on. To get back my original place to where I was, I just use backspace. This works for multiple jumps as well
> 
> vim.keymap.set("n", "<BS>", "<C-o>")
> 
> And I like to use tab and shift-tab to cycle through my saved buffers in harpoon. (I use harpoon-core, but this will work with harpoon)
> 
> keys = {
>   -- stylua: ignore start
>   { "<Tab>", function () require('harpoon-core.ui').nav\_next() end },
>   { "<S-Tab>", function () require('harpoon-core.ui').nav\_prev() end },
>   -- stylua: ignore end
> },
> 
> When working with markdown, I really don't want `nowrap`, but I want to use `j` and `k` to work on the wrapped lines. In my `after/ftplugin/markdown.lua` file, I have
> 
> vim.keymap.set({ "n", "o", "x" }, "j", "gj", {})
> vim.keymap.set({ "n", "o", "x" }, "k", "gk", {})
> vim.cmd(\[\[set wrap\]\])
> 
> > **DrunkensteinsMonster** • [3 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjqaq11/) • 2024-01-26
> > 
> > For that first keymap I find it’s much better to just understand the jumplist and how to use it. ctrl-o just goes to the previous entry in the jumplist
> > 
> > > **\[deleted\]** • [1 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjquk0n/) • 2024-01-27
> > > 
> > > I’m not the biggest fan of the c-o keymap so I’d map that anyway. And I looked into jump list and I wasn’t compelled to change anything. Curious about how you’d use it?
> > > 
> > > > **DrunkensteinsMonster** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/koczh67/) • 2024-01-31
> > > > 
> > > > I guess it depends on how well you are utilizing the editor. E.g. you can search for something with / then ctrl-o back to your previous spot, then ctrl-i back to where you searched. Same goes for mark jumps, any jumps related to LSP, any jumps related to live grep, etc. it’s a global history of where you’ve been, it’s universally useful. It’s probably the most important feature of vim/neovim in terms of getting around outside of grep and /
> 
> **Doomtrain86** • [1 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjoqthg/) • 2024-01-26
> 
> And using backspace for this in normal mode has no unexpected side effects? I'm paranoid about taking something as basic as backside and changing it on case I such up something I didn't even knew (I know you can look this up but still, to me neovim is still this scary huge complex wonderful machine)
> 
> > **\[deleted\]** • [3 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjot59u/) • 2024-01-26
> > 
> > It doesn’t do anything I believe. I know it’s commonly mapped so it shouldn’t be a problem.
> > 
> > If you’re ever worried about a mapping, you could actually check it. Read this: [https://vi.stackexchange.com/questions/7722/how-to-debug-a-mapping](https://vi.stackexchange.com/questions/7722/how-to-debug-a-mapping)
> > 
> > > **Doomtrain86** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjoxe94/) • 2024-01-26
> > > 
> > > This is a very good guide thanks. I'll be remapping it to ctrl+^ , eg back and forth between current and last file
> **Nabeen0x01** • [6 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjo0ali/) • 2024-01-26
> 
> Here's my lil' function to toggle different line numbering states.
> 
> local cmds = { "nu!", "rnu!", "nonu!" }
> local current\_index = 1
> 
> function toggle\_numbering()
>   current\_index = current\_index % #cmds + 1
>   vim.cmd("set " .. cmds\[current\_index\])
>   local signcolumn\_setting = "auto"
>   if cmds\[current\_index\] == "nonu!" then
>     signcolumn\_setting = "yes:4"
>   end
>   vim.opt.signcolumn = signcolumn\_setting
> end
> 
> > **16bitMustache** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjry2sd/) • 2024-01-27
> > 
> > That's interesting. I like it!
> **funbike** • [4 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjpdqr2/) • 2024-01-26
> 
> State per project. Works with vim and neovim. This must be loaded before plugins.
> 
> " Check if started as: nvim +State
> if index(v:argv, '+State') >= 0
>   call mkdir('.vim', 'p')
>   " Tell git to ignore this directory.
>   if !filereadable('.vim/.gitignore')
>     call writefile(\['\*', ''\], '.vim/.gitignore', 'b')
>   endif
>   if !filereadable('.vim/Session.vim')
>     call writefile(\[''\], '.vim/Session.vim', 'b')
>   endif
>   set viminfofile=.vim/main.shada
> 
>   augroup startup | autocmd!
>     autocmd VimEnter           \* source     .vim/Session.vim
>     autocmd VimLeave,FocusLost \* mksession! .vim/Session.vim
>     autocmd FocusLost          \* wshada
>   augroup END
>   " no-op
>   command! -nargs=0 State execute ''
> endif
> **pysan3** • [4 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjq0phf/) • 2024-01-26
> 
> Recursive macros.
> 
> > **catphish\_** • [1 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjr7taa/) • 2024-01-27
> > 
> > What do you mean by that?
> > 
> > > **pysan3** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjrnhwo/) • 2024-01-27
> > > 
> > > If you type `@q` *while* recording a macro, running that macro calls the same macro recursively, making it a never ending loop.
> > > 
> > > Combining this technique with an error-able command (eg `n`: next search errors out when no more match is found), you can run the macro on all occurrences at once, and it automatically stops when done.
> > > 
> > > When you combine this with `lazyredraw`, the macro execution will be finished in a split second.
> **irregularprimes** • [4 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kkbpdy0/) • 2024-01-30
> 
> I make heavy use of [https://github.com/k0kubun/xremap](https://github.com/k0kubun/xremap)
> 
> > xremap is a key remapper for Linux. Unlike xmodmap, it supports app-specific remapping and Wayland.
> 
> It's crazy powerful, able to handle virtual modifiers, press/release, etc. So what I did was make CapsLock a virtual modifier, like a distinct CNTRL\_UP if that existed. I map Caps-hjkl to arrow keys in all windows, so I can scroll down a web page with Caps-j. In nvim I've bound alt-hjkl to arrow keys, so I can move in insert mode like in normal. i bound Caps-hjkl to changing windows, and in tmux to changing pane focus, and use a plugin that lets me move from nvim to tmux as if it was a nvim window. The reverse requires no plugin of course, just Caps-l and I'm in right nvim pane last focused window.
> 
> I've 50+ bindings on Caps-<some><some> combos.E.g., in nvim resizing windows is Caps-Alt-hjkl and same in tmux.I use tmux copy buffer copy/pasting via caps-y/p and selection paste is Caps-P.
> 
> I'm a terminal guy so I learned readline emacs before vim and that never changed. I use vim-rsi and my own mappings to use emacs movements and commands in nvim, in my browser, odt/docx editor, everywhere. It's just a matter of using xremap to bind to whatever sequence works in that particular application.
> 
> xremap also supports mark mode and much more. I run it as user systemd service since 3-4 years and will use it till AI conversational interfaces powered by LLMs replace users directly using commands r doing anything at all.
> 
> Instead we'll be describing intent and polite LLM does the work. I think keyboards are here to stay for a while, but products like that "mind reading" crazy Transformer head-band make me think "the neural interface" is going to be reality sooner than most expect. But until then, keyboards are still useful chat interfaces. Voice is faster for some, but not everyone likes talking.
> 
> Off topic by now but cooperative multi-agent RL and multi-LLM-agent systems will put programmers out of work by surprise. The rate of discovery and development is insane, Install AutoGenStudio 2 and ask your agent team for a few plots on arxiv paper publishing rates on these topics. Or do it easily with crewAI. No RL here, just LLMs.
> 
> LLMs can teach RL students about environment reducing exploration space, and RL students can give feedback on LLM's tokens, it's a symbiotic relationship where both parties benefit and keep getting better and better. Quite recent paper presented this approach and I just find it fascinating.
> 
> Apologies in advance ...
> **trcrtps** • [7 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjmxq7s/) • 2024-01-26
> 
> some basic stuff:
> 
> - `,` bound to `:noh`
> - `vim.o.cmdheight = 0` replace status line with command line when active
> - `keymap('n', '<leader>d', vim.diagnostic.open_float })` to me is less distracting than virtual\_text. I might change this to D so it matches K
> - `keymap('v', 'ma', ":<c-u>'<,'>%norm I\"jkxA\"jkxA,<CR>", {})` I use "jk" to escape insert, so helps make a string array out of a visual selection. pretty handy when people I work with send me lists of things to iterate over via email, which for me is constant, like this:
> "sdfsadf",
> "sdfasdfa",
> "sdfadfaewf",
> 
> Another one I use and can't figure out a better way to do with with conform, so maybe someone can provide a better solution. I use the recipe [here](https://github.com/stevearc/conform.nvim/blob/master/doc/recipes.md#command-to-toggle-format-on-save) to toggle format on save, and then bind it to a key like this in order to not format on every save:
> 
> `keymap('n', '<leader>fm', '<cmd>FormatEnable<CR><cmd>w<cr><cmd>FormatDisable<CR>')`
> 
> took me forever to think of that, there has to be something better.
> 
> > **16bitMustache** • [3 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjn67rd/) • 2024-01-26
> > 
> > Those sound awesome! I also like formatting being on a hotkey, makes it super nice.
> > 
> > I mostly use the built in LSP formatting in my projects, so I have the command like this:
> > 
> > keymap("n", "<C-f>", ":lua vim.lsp.buf.format()<CR>")
> > 
> > **11Night** • [3 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjoa2jw/) • 2024-01-26
> > 
> > can you elaborate more on `vim.o.cmdheight = 0`?
> > 
> > > **Zin42** • [1 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjsibje/) • 2024-01-27
> > > 
> > > cmdheight is just the reserved space at the bottom for :<whatever command>, at 0 it disappears completely and only appears if you go into ":" mode (great for working on a laptop where vertical space is premium)
> 
> **blirdtext** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjmzno0/) • 2024-01-26
> 
> The last one can be done like this, the second param in the format function is a callback:
> 
> function()
> 	require("conform").format({ timeout\_ms = 2000, lsp\_fallback = true }, function()
> 		vim.cmd(":w")
> 	end)
> end,
> 
> Is there a reason you are using `:<c-u>'<,'>`? pressing `:` in visual mode should already insert the marks right?
> 
> > **trcrtps** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjn4xct/) • 2024-01-26
> > 
> > I'll try that conform setup. My goal is to never format on save, and instead only do it by keymap.
> > 
> > And you're totally right, those are unnecessary
> 
> **arjunsahlot** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/krdywm5/) • 2024-02-21
> 
> I've actually rebinded my j, k, and <Esc> keys to remove search highlighting after they carry their standard usage. I can easily bring back the highlights by just pressing 'n' again.
> 
> vim.keymap.set("n", "j", \\\[\\\[j<Cmd>nohlsearch<CR><Cmd>lua require('hlslens').stop()<CR>\\\]\\\], { noremap = true, silent = true })
> vim.keymap.set("n", "k", \\\[\\\[k<Cmd>nohlsearch<CR><Cmd>lua require('hlslens').stop()<CR>\\\]\\\], { noremap = true, silent = true })
> vim.keymap.set("n", "<Esc>", \\\[\\\[<Esc><Cmd>nohlsearch<CR>\\\]\\\], { noremap = true, silent = true })
> **shuaimin** • [3 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjss39u/) • 2024-01-27
> 
> ## Keymaps
> 
> local map = vim.keymap.set
> 
>

> [!quote] More powerful \`\*\`
> map({ "n", "x" }, "<Leader>8", "<Cmd>Telescope grep\_string word\_match=-w<CR>", { desc = "Search word under cursor" })
> 
> map({ "n", "x" }, "0", "^")
> map({ "n", "x" }, "^", "0")
> map({ "n", "x" }, "'", "\`")
> map({ "n", "x" }, "\`", "'")
> 
> -- Don't use clipboard=unnamedplus
> map({ "n", "x" }, "sy", '"+y')
> map({ "n", "x" }, "sY", '"+y)
> map({ "n", "x" }, "sp", '"+p')
> map({ "n", "x" }, "sP", '"+P')
> 
> ## Auto-save
> 
> Save the buffer when I stop editing.
> 
> local autocmd = vim.api.nvim\_create\_autocmd
> local augroup = vim.api.nvim\_create\_augroup("my\_cfg", {})
> 
>

> [!quote]@type table<buffer, uv\_timer\_t>
> local timers = {}
> local timeout = 10000
> 
> local function save(buf)
>   vim.api.nvim\_buf\_call(buf, function() vim.cmd("noautocmd update") end)
> end
> 
> autocmd({ "InsertLeave", "TextChanged" }, {
>   group = augroup,
>   desc = "Schedule auto-saving",
>   callback = function(event)
>     local bo = vim.bo\[event.buf\]
>     if event.file == "" or bo.buftype ~= "" or bo.filetype == "gitcommit" or bo.readonly or not bo.modified then
>       return
>     end
> 
>     local timer = timers\[event.buf\]
>     if timer then
>       if timer:is\_active() then timer:stop() end
>     else
>       timer = vim.uv.new\_timer()
>       timers\[event.buf\] = timer
>     end
>     timer:start(timeout, 0, vim.schedule\_wrap(function() save(event.buf) end))
>   end,
> })
> 
> autocmd({ "FocusLost", "ExitPre", "TermEnter" }, {
>   group = augroup,
>   desc = "Save immediately",
>   callback = function(event)
>     for buf, timer in pairs(timers) do
>       if timer:is\_active() then
>         timer:stop()
>         save(buf)
>       end
>     end
>   end,
> })
> 
> autocmd({ "BufWritePost", "InsertEnter" }, {
>   group = augroup,
>   desc = "Cancel scheduled auto-saving",
>   callback = function(event)
>     local timer = timers\[event.buf\]
>     if timer and timer:is\_active() then timer:stop() end
>   end,
> })
> 
> autocmd({ "BufDelete" }, {
>   group = augroup,
>   desc = "Remove timer",
>   callback = function(event)
>     local timer = timers\[event.buf\]
>     if timer then
>       timers\[event.buf\] = nil
>       if timer:is\_active() then timer:stop() end
>       timer:close()
>     end
>   end,
> })
> **Jonah-Fang** • [7 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjmu8s1/) • 2024-01-26
> 
> - `LintaoAmons/cd-project.nvim` for project management.
> - `carbon-steel/detour.nvim` for popup first buffer switching.
> - `rebelot/heirline.nvim` and `b0o/incline.nvim` for one window with one buffer.
> - `folke/flash.nvim` to replace relative line number to jump.
> 
> > **Ludo\_Tech** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjoduzx/) • 2024-01-26
> > 
> > I didn't know about *cd-project* and *incline*. Very cool!
> **21HairyFingers** • [4 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjo84xt/) • 2024-01-26
> 
> vim.api.nvim\_create\_user\_command('W', 'w', { nargs = 0 })
> 
> vim.api.nvim\_create\_user\_command('Q', 'q', { nargs = 0 })
> 
> Stole it from this sub. I’m kind of mad I didn’t think of it before
> 
> > **Worming** • [1 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjpvw6x/) • 2024-01-26
> > 
> > So, :W is doing the same as :w ?
> > 
> > I am missing something ?
> > 
> > > **21HairyFingers** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjrl7ui/) • 2024-01-27
> > > 
> > > It’s a very common typo, since you’re already pressing shift from typing `:`
> > > 
> > > **AnythingApplied** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjrlq65/) • 2024-01-27
> > > 
> > > Yes, the idea is they may have held onto the shift key for a bit too long when pressing `:` so they occasional get `:W` (a bad command) when they almost certainly meant to type `:w` instead. By making `:W` work too it doesn't matter if they make that common typo when trying to type `:w`.
> > > 
> > > Personally, a better version of this change I've seen a few people do is just swap semi-colon and colon, that way there is no shift involved. Colon is way more used anyway so its pretty easy to justify that it probably belongs on the unshifted version.
> > > 
> > > But the general principle still applies... if there are common command typos you make, consider making the typo just do the functionality you want too.
> 
> **6694** • [1 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjq0gn0/) • 2024-01-26
> 
> What does this do?
> 
> **\[deleted\]** • [1 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjtj9gq/) • 2024-01-27
> 
> A better thing would be to use `cnoreabbrev`.
> 
> vim.cmd(\[\[
> cnoreabbrev W! w!
> cnoreabbrev W1 w!
> cnoreabbrev w1 w!
> cnoreabbrev Q! q!
> cnoreabbrev Q1 q!
> cnoreabbrev q1 q!
> cnoreabbrev Qa! qa!
> cnoreabbrev Qall! qall!
> cnoreabbrev Wa wa
> cnoreabbrev Wq wq
> cnoreabbrev wQ wq
> cnoreabbrev WQ wq
> cnoreabbrev wq1 wq!
> cnoreabbrev Wq1 wq!
> cnoreabbrev wQ1 wq!
> cnoreabbrev WQ1 wq!
> cnoreabbrev W w
> cnoreabbrev Q q
> cnoreabbrev Qa qa
> cnoreabbrev Qall qall
> \]\])
> **bienvenidosantibanez** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjnoz5d/) • 2024-01-26
> 
> my brain is hardwired to always use my remapped keys for: opening nvimTree, and file-saving
> **catphish\_** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjpf4oq/) • 2024-01-26
> 
> Toggle fixed line number on
> 
> `map("n", "<C-n>", function() Util.toggle("relativenumber") end, { desc = "Toggle Relative Line Numbers" }) map("i", "<C-n>", function() Util.toggle("relativenumber") end, { desc = "Toggle Relative Line Numbers" }) map("v", "<C-n>", function() Util.toggle("relativenumber") end, { desc = "Toggle Relative Line Numbers" })`
> 
> Auto switch back to relative when you switch modes
> 
> `vim.api.nvim_create_autocmd({ "BufLeave", "FocusLost", "InsertEnter", "CmdlineEnter", "WinLeave" }, { pattern = "*",`
> 
> Auto switch to normal mode when entering NeoTree
> 
> `vim.api.nvim_create_autocmd({ "WinEnter" }, { pattern = "neo-tree*", command = "stopinsert", })`
> 
> Disable any middle click input (accidental pasting with X11 and a track pad)
> 
> `map("n", "<MiddleMouse>", "<Nop>", { desc = "Disable Middle Click Paste" }) map("i", "<MiddleMouse>", "<Nop>", { desc = "Disable Middle Click Paste" }) map("v", "<MiddleMouse>", "<Nop>", { desc = "Disable Middle Click Paste" }) map("c", "<MiddleMouse>", "<Nop>", { desc = "Disable Middle Click Paste" }) map("n", "<2-MiddleMouse>", "<Nop>", { desc = "Disable Middle Click Paste" }) map("i", "<2-MiddleMouse>", "<Nop>", { desc = "Disable Middle Click Paste" }) map("v", "<2-MiddleMouse>", "<Nop>", { desc = "Disable Middle Click Paste" }) map("c", "<2-MiddleMouse>", "<Nop>", { desc = "Disable Middle Click Paste" })`
> **JowiMP** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjq28t6/) • 2024-01-26
> 
> [My compilation of random stuff](https://github.com/mrs4ndman/random.nvim)
> 
> > **Ludo\_Tech** • [1 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjqgf12/) • 2024-01-26
> > 
> > I will definitely stole your `put_at_end` function :)
> **Integralist** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjq5hu5/) • 2024-01-26
> 
> I've all sorts collected over the years [https://github.com/Integralist/nvim](https://github.com/Integralist/nvim)
> 
> > **16bitMustache** • [1 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjrydoj/) • 2024-01-27
> > 
> > This config looks so clean! I will definitely be taking notes.
> **bew78** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjtbbc3/) • 2024-01-27
> 
> Directional splits, to split current window in the direction I want using `<C-w><C-hjkl>`:
> 
> [https://github.com/bew/dotfiles/blob/df103bd13d5e326b8c606d3f6eccd9043bd5a56e/nvim-wip/lua/mycfg/mappings.lua#L424-L450](https://github.com/bew/dotfiles/blob/df103bd13d5e326b8c606d3f6eccd9043bd5a56e/nvim-wip/lua/mycfg/mappings.lua#L424-L450)
> 
> `Alt-s` to save current buffer.
> 
> Duplicate current window in a new tab or move current window in a new tab: [https://github.com/bew/dotfiles/blob/df103bd13d5e326b8c606d3f6eccd9043bd5a56e/nvim-wip/lua/mycfg/mappings.lua#L86-L89](https://github.com/bew/dotfiles/blob/df103bd13d5e326b8c606d3f6eccd9043bd5a56e/nvim-wip/lua/mycfg/mappings.lua#L86-L89)
> 
> `Ctrl-d` to duplicate current selection, `Ctrl-Alt-d` for the same action but re-select (to allow spamming): [https://github.com/bew/dotfiles/blob/df103bd13d5e326b8c606d3f6eccd9043bd5a56e/nvim-wip/lua/mycfg/mappings.lua#L145-L184](https://github.com/bew/dotfiles/blob/df103bd13d5e326b8c606d3f6eccd9043bd5a56e/nvim-wip/lua/mycfg/mappings.lua#L145-L184)
> 
> Allow short horizontal movement in insert mode to not break undo or insertion repetition (left/right arrows, `Alt-h`, `Alt-l`, `Alt-b`, `Alt-w`): [https://github.com/bew/dotfiles/blob/df103bd13d5e326b8c606d3f6eccd9043bd5a56e/nvim-wip/lua/mycfg/mappings.lua#L187-L200](https://github.com/bew/dotfiles/blob/df103bd13d5e326b8c606d3f6eccd9043bd5a56e/nvim-wip/lua/mycfg/mappings.lua#L187-L200)
> 
> Swap `p` & `P` to always preserve register while pasting in visual mode by default: [https://github.com/bew/dotfiles/blob/df103bd13d5e326b8c606d3f6eccd9043bd5a56e/nvim-wip/lua/mycfg/mappings.lua#L354-L358](https://github.com/bew/dotfiles/blob/df103bd13d5e326b8c606d3f6eccd9043bd5a56e/nvim-wip/lua/mycfg/mappings.lua#L354-L358)
> 
> Visually select last pasted region using `gV`: [https://github.com/bew/dotfiles/blob/df103bd13d5e326b8c606d3f6eccd9043bd5a56e/nvim-wip/lua/mycfg/mappings.lua#L304-L318](https://github.com/bew/dotfiles/blob/df103bd13d5e326b8c606d3f6eccd9043bd5a56e/nvim-wip/lua/mycfg/mappings.lua#L304-L318)
> 
> `Alt-,` to insert a comma after the cursor (very nice when inserting items in a list!): [https://github.com/bew/dotfiles/blob/df103bd13d5e326b8c606d3f6eccd9043bd5a56e/nvim-wip/lua/mycfg/mappings.lua#L403-L409](https://github.com/bew/dotfiles/blob/df103bd13d5e326b8c606d3f6eccd9043bd5a56e/nvim-wip/lua/mycfg/mappings.lua#L403-L409)
> 
> .... And many more in that file or my config (in various states of Lua rewrite)
> **\[deleted\]** • [2 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjon6uj/) • 2024-01-26
> 
> Getting paired angle brackets (`<>`) to work in C++ *properly* is actually really hard.This is partially because you can't depend on TreeSitter nodes in insert mode because neovim will think you're in the wrong node. So, you depend on regex. There's a lot of edge cases, but here's the magic to make it angle brackets work -- File: util/pair.lua -- Helper Function local get\_relative\_line = function(offset) local line = vim.api.nvim\_win\_get\_cursor(0)\[1\] local target = line + offset return vim.api.nvim\_buf\_get\_lines(0, target - 1, target, false)\[1\] end
> 
> local M = {}
> 
> function M.is\_template()
>   local unpack = table.unpack or unpack
> 
>   local line = vim.api.nvim\_get\_current\_line()
>   local r, c = unpack(vim.api.nvim\_win\_get\_cursor(0))
>   if not (vim.o.filetype == "cpp" or vim.o.filetype == "c") then
>     line = line:sub(1, c) .. "<" .. line:sub(c + 1)
>     vim.api.nvim\_set\_current\_line(line)
>     vim.api.nvim\_win\_set\_cursor(0, { r, c + 1 })
>     return
>   end
> 
>   if vim.fn.match({ line }, "template") == 0 then
>     -- c - 1 = 2 chars before the cursor
>     line = line:sub(1, c) .. "<>" .. line:sub(c + 1)
>     vim.api.nvim\_set\_current\_line(line)
>     vim.api.nvim\_win\_set\_cursor(0, { r, c + 1 })
>     return
>   end
> 
>   if vim.fn.match({ line }, "#include") == 0 then
>     line = line:sub(1, c) .. "<>" .. line:sub(c + 1)
>     if line:sub(c, c) ~= " " then
>       line = line:sub(1, c) .. " " .. line:sub(c + 1)
>       c = c + 1
>     end
>     vim.api.nvim\_set\_current\_line(line)
>     vim.api.nvim\_win\_set\_cursor(0, { r, c + 1 })
>     return
>   end
>   if vim.fn.match({ line:sub(0, c) }, "cast\\\\s\*$") == 0 then
>     -- c - 1 = 2 chars before the cursor
>     line = line:sub(1, c) .. "<>" .. line:sub(c + 1)
>     vim.api.nvim\_set\_current\_line(line)
>     vim.api.nvim\_win\_set\_cursor(0, { r, c + 1 })
>     return
>   end
> 
>   -- c is 1 before the cursor
>   line = line:sub(1, c) .. "<" .. line:sub(c + 1)
>   vim.api.nvim\_set\_current\_line(line)
>   vim.api.nvim\_win\_set\_cursor(0, { r, c + 1 })
>   vim.cmd("redraw") -- redraw to add the first <
>   -- since we added < the lsp can detect it
>   local old\_handler = vim.lsp.handlers\["textDocument/signatureHelp"\]
>   vim.lsp.handlers\["textDocument/signatureHelp"\] = function(\_, info)
>     if info and info.signatures and info.signatures\[1\] and info.signatures\[1\].label then
>       local functionsig = info.signatures\[1\].label
>       if vim.fn.match({ functionsig }, "^\\\\w\\\\+<") == 0 then
>         -- c + 1 is after including the openning pair very shady code lol
>         vim.api.nvim\_set\_current\_line(line:sub(0, c + 1) .. ">" .. line:sub(c + 2))
>       end
>     end
>   end
>   vim.lsp.buf.signature\_help()
>   vim.lsp.handlers\["textDocument/signatureHelp"\] = old\_handler
> end
> 
> function M.struct\_or\_class()
>   local line = get\_relative\_line(0)
>   local previous\_line = get\_relative\_line(-1)
> 
>   if vim.fn.match(line, "struct ") ~= -1 or vim.fn.match(line, "class ") ~= -1 then
>     return true
>   end
> 
>   if vim.fn.match(previous\_line, "struct ") ~= -1 or vim.fn.match(previous\_line, "class ") ~= -1 then
>     return true
>   end
> 
>   return false
> end
> 
> return M
> 
> -- file: autopairs.lua
> return {
>   {
>     "windwp/nvim-autopairs",
>     dependencies = {
>       { "hrsh7th/nvim-cmp" },
>     },
>     event = "InsertEnter",
>     opts = {},
>     config = function(\_, opts)
>       local npairs = require("nvim-autopairs")
>       local rule = require("nvim-autopairs.rule")
>       local cond = require("nvim-autopairs.conds")
> 
>       npairs.setup(opts)
> 
>       local is\_template = require("util.pair").is\_template
>       local struct\_or\_class = require("util.pair").struct\_or\_class
> 
>       npairs.add\_rules({
>         rule("<", ">"):with\_pair(cond.none()):with\_move(cond.done()):use\_key(">"),
>         rule("{", "};", { "cpp", "c" }):with\_pair(struct\_or\_class),
>       })
> 
>       vim.keymap.set("i", "<", is\_template)
>     end,
>   },
> }
> 
> Yea :/
> **\[deleted\]** • [1 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjrehf6/) • 2024-01-27
> 
> My remap file. I use all of these commands religiously
> 
> vim.g.mapleader = " "
> 
> --Be able to escape from terminal mode
> vim.keymap.set('t', '<Esc>', \[\[<C-\\><C-n>\]\])
> 
> --Move to any window using alt plus movement keys
> vim.keymap.set('t', '<A-h>', \[\[<C-\\><C-N><C-w>h\]\])
> vim.keymap.set('t', '<A-j>', \[\[<C-\\><C-N><C-w>j\]\])
> vim.keymap.set('t', '<A-k>', \[\[<C-\\><C-N><C-w>k\]\])
> vim.keymap.set('t', '<A-l>', \[\[<C-\\><C-N><C-w>l\]\])
> vim.keymap.set('i', '<A-h>', \[\[<C-\\><C-N><C-w>h\]\])
> vim.keymap.set('i', '<A-j>', \[\[<C-\\><C-N><C-w>j\]\])
> vim.keymap.set('i', '<A-k>', \[\[<C-\\><C-N><C-w>k\]\])
> vim.keymap.set('i', '<A-l>', \[\[<C-\\><C-N><C-w>l\]\])
> vim.keymap.set('n', '<A-h>', \[\[<C-w>h\]\])
> vim.keymap.set('n', '<A-j>', \[\[<C-w>j\]\])
> vim.keymap.set('n', '<A-k>', \[\[<C-w>k\]\])
> vim.keymap.set('n', '<A-l>', \[\[<C-w>l\]\])
> 
> --Space t to open terminal
> vim.keymap.set("n", "<leader>t", "<cmd>terminal<cr>")
> 
> --Resize based on splits
> vim.keymap.set("n", "<Insert>",\[\[<C-w>=\]\])
> 
> --Fill Screen vertically
> vim.keymap.set("n", "<Home>", \[\[<C-w>\_\]\])
> 
> --Fill Screen horizontally
> vim.keymap.set("n", "<End>", \[\[<C-w>|\]\])
> 
> --For vertical windows, resize windows horizontally using + and -
> vim.keymap.set("n", "+", "<cmd>vert res +5<cr>")
> vim.keymap.set("n", "-", "<cmd>vert res -5<cr>")
> 
> --For horizontal windows, resize windows vertically using PgUp and PgDn
> vim.keymap.set("n", "<PageUp>", "<cmd>res +5<cr>")
> vim.keymap.set("n", "<PageDown>", "<cmd>res -5<cr>")
> 
> --JSON Beautify
> vim.keymap.set("n", "<leader>jb", "<cmd>%!python -m json.tool<cr>")
> 
> --Move selected line / block of text in visual mode
> vim.keymap.set("v", "K", ":move '<-2<CR>gv=gv")
> vim.keymap.set("v", "J", ":move '>+1<CR>gv=gv")
> 
> --Keep cursor after joining lines
> vim.keymap.set("n", "J", "mzJ\`z")
> 
> --System clipboard
> vim.keymap.set("v", "<leader>y", \[\["+y\]\])
> vim.keymap.set("n", "<leader>y", \[\["+y\]\])
> vim.keymap.set("n", "<leader>Y", \[\["+Y\]\])
> vim.keymap.set("v", "<leader>p", \[\["+p\]\])
> vim.keymap.set("n", "<leader>p", \[\["+p\]\])
> vim.keymap.set("n", "<leader>P", \[\["+P\]\])
> 
> --CTRL + C to Escape
> vim.keymap.set("i", "<C-c>", "<Esc>")
> 
> --Replace word under cursor
> vim.keymap.set("n", "<leader>r", \[\[:%s/\\<<C-r><C-w>\\>/<C-r><C-w>/gI<Left><Left><Left>\]\])
> 
> --Make file executable
> vim.keymap.set("n", "<leader>x", "<cmd>!chmod +x %<CR>", { silent = true })
> 
> --Source file
> vim.keymap.set("n", "<leader><leader>", function()
>     vim.cmd("so")
> end)
> **fake-cat** • [1 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjo9jg1/) • 2024-01-26
> 
> Bunch of mappings to toggle some aspects of diagnostics appearance on the fly (severity, virtual text, signs, etc)
> 
> \-- Toggle diagnostic appearance
> 
> local virtual\_text = false
> local underline = true
> local signs = true
> local only\_errors = false
> 
> local diag\_option\_value = function(state)
> 	if not state then
> 		return false
> 	elseif only\_errors then
> 		return { severity = vim.diagnostic.severity.ERROR }
> 	else
> 		return true
> 	end
> end
> 
> local update\_diag\_conf = function()
> 	vim.diagnostic.config({
> 		virtual\_text = diag\_option\_value(virtual\_text),
> 		signs = diag\_option\_value(signs),
> 		underline = diag\_option\_value(underline),
> 	})
> end
> 
> -- toggle diag virtual
> vim.keymap.set("n", "<leader>tdv", function()
> 	virtual\_text = not virtual\_text
> 	update\_diag\_conf()
> end, { desc = "Toggle virtual text" })
> 
> -- toggle diag underline
> vim.keymap.set("n", "<leader>tdu", function()
> 	underline = not underline
> 	update\_diag\_conf()
> end, { desc = "Toggle underline" })
> 
> -- toggle diag signs
> vim.keymap.set("n", "<leader>tds", function()
> 	signs = not signs
> 	update\_diag\_conf()
> end, { desc = "Toggle signs" })
> 
> -- toggle diag level
> vim.keymap.set("n", "<leader>tdl", function()
> 	only\_errors = not only\_errors
> 	update\_diag\_conf()
> end, { desc = "Toggle diagnostics severity (all/error)" })
> 
> -- toggle diags
> vim.keymap.set("n", "<leader>tD", function()
> 	if vim.diagnostic.is\_disabled() then
> 		vim.diagnostic.enable()
> 	else
> 		vim.diagnostic.disable()
> 	end
> end, { desc = "Toggle diagnostics" })
> 
> update\_diag\_conf()
> **dtoebe** • [1 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjp96xz/) • 2024-01-26
> 
> :q
> **khne522** • [1 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjr1av6/) • 2024-01-27
> 
> nnoremap ZA :qa!<CR>
> **Papitz** • [1 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjs7frv/) • 2024-01-27
> 
> Mapping escape in normal mode to `:w` was a game changer for me.
> **Quick\_Bed\_8422** • [1 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjxeuif/) • 2024-01-28
> 
> \-- same behavior like alt + up/down in vscode
> -- the selected line will move one line up/down
> set("v", "J", ":m '>+1<CR>gv=gv")
> set("v", "K", ":m '<-2<CR>gv=gv")
> 
> -- pressing \`n/N\` for the next/prev matches in search mode, will make the matches line center
> set("n", "n", "nzzzv")
> set("n", "N", "Nzzzv")
> 
> > **Quick\_Bed\_8422** • [1 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjxgfot/) • 2024-01-28
> > 
> > if you are most using folding. you must like this auto command if you are not using session manager plugin
> > 
> > local function augroup(name)
> >     return vim.api.nvim\_create\_augroup(name, { clear = true })
> > end
> > 
> > -- remember folds
> > vim.cmd \[\[
> > augroup remember\_folds
> >   autocmd!
> >   autocmd BufWinLeave \*.\* mkview
> >   autocmd BufWinEnter \*.\* silent! loadview
> > augroup END
> > \]\]
> **PhilosophyHefty5419** • [1 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kjym8kg/) • 2024-01-28
> 
> I use search within selected block of code a lot  
> \`\`\`
> 
> map('x', '/', '<Esc>/\\\\%V')
> 
> \`\`\`
> **DebtLongjumping** • [1 points](https://reddit.com/r/neovim/comments/1abd2cq/comment/kpby4lp/) • 2024-02-07
> 
> yap)p