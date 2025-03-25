---
source: "https://www.reddit.com/r/neovim/comments/1jdjcol/send_full_project_search_to_qflist_without/"
author:
subreddit: "r/neovim"
published: ["2025-03-17T18:07:24.620Z","2025-03-17T18:23:35.617Z","2025-03-17T18:34:44.008Z","2025-03-17T18:46:27.980Z","2025-03-17T18:56:40.949Z","2025-03-17T20:58:09.314Z","2025-03-17T21:25:00.029Z","2025-03-17T21:21:48.331Z","2025-03-17T20:30:32.464Z","2025-03-17T21:12:00.148Z","2025-03-18T13:35:49.004Z","2025-03-18T19:10:47.265Z","2025-03-18T21:08:49.699Z","2025-03-18T21:12:28.363Z","2025-03-18T23:52:14.579Z","2025-03-18T22:01:58.863Z","2025-03-19T00:00:20.434Z","2025-03-17T18:26:33.956Z","2025-03-17T18:43:57.824Z","2025-03-17T22:29:01.389Z","2025-03-17T18:49:28.306Z","2025-03-17T19:08:54.940Z","2025-03-18T19:07:43.195Z","2025-03-19T05:47:28.165Z","2014-02-24T09:21:21.727Z"]
created: 2025-03-25
image:
tags:
  - "reddit"
---
## Original Post
> [!note]- Original
> ![](https://www.reddit.com/r/neovim/comments/1jdjcol/send_full_project_search_to_qflist_without/)
>[!quote] Send full project search to qflist without plugins (required ripgrep)

> 

## Comments

> [!quote] ## Comments
> **Prestigious\_Rest8751** • [14 points](https://reddit.com/r/neovim/comments/1jdjcol/comment/miav11x/) • 2025-03-17
> 
> 1. you can set `grepprg` to whatever you want. By default it's `grep` but neovim sets it to `ripgrep` if installed.
> 2. you can omit \*\* if you use `ripgrep` and for `grep` i recommend to changing `grepprg` to add the -R flag (among the other ones).
> 3. just so you know `cwindow` exists, which opens the quickfix only if there are valid entries. This is immensely useful when combined with `:make`
> 
> To wrap it up, you can automatically open the quickfix window after a grep search with this simple autocommand:
> 
> autocmd QuickFixCmdPost grep cwindow
> 
> > **frodo\_swaggins233** • [1 points](https://reddit.com/r/neovim/comments/1jdjcol/comment/miaxd04/) • 2025-03-17
> > 
> > 1. Ya I understand that I just thought it was cool it picks it up by default
> > 2. You're right, I was looking at the vimgrep command for that. Removed. Am I missing something on the -R flag though? I can't find that flag in a search of rg's man page
> > 3. Didn't know about this command. Thanks! Great idea on the autocmd as well
> > 
> > > **Prestigious\_Rest8751** • [3 points](https://reddit.com/r/neovim/comments/1jdjcol/comment/mib1y4w/) • 2025-03-17
> > > 
> > > the -R flag is meant for standard `grep`, otherwise it wouldn't recurse directories and it would be a whole lot more stuff to type.
> > > 
> > > > **frodo\_swaggins233** • [1 points](https://reddit.com/r/neovim/comments/1jdjcol/comment/mibrfff/) • 2025-03-17
> > > > 
> > > > Oh I misread your comment. You said that right there. Thanks
> > > > 
> > > > I think the `**` is actually bad because if I'm not mistaken, it runs ripgrep itself recursively in every directory? Instead of letting rg run once and handle its own recursion. All I know was it was not respecting the default `--ignore-vcs` option in `rg` when run with `**`, and I assume that was why.
> > > > 
> > > > > **Prestigious\_Rest8751** • [3 points](https://reddit.com/r/neovim/comments/1jdjcol/comment/mibw7xr/) • 2025-03-17
> > > > > 
> > > > > i think it's just redudant. `**` just expands to the directories in your current folder: try `:echo **`.
> > > > > 
> > > > > it may be harmful (or not) depending on how ripgrep handles multiple searches.
> **ballagarba** • [6 points](https://reddit.com/r/neovim/comments/1jdjcol/comment/mibln5u/) • 2025-03-17
> 
> This gist by romainl is relevant: [https://gist.github.com/romainl/56f0c28ef953ffc157f36cc495947ab3](https://gist.github.com/romainl/56f0c28ef953ffc157f36cc495947ab3)
> 
> > **frodo\_swaggins233** • [1 points](https://reddit.com/r/neovim/comments/1jdjcol/comment/mibu8l6/) • 2025-03-17
> > 
> > Very cool. Looks like this has been explored by many people in a lot of depth before me, haha. I will check this out
> **Danny\_el\_619** • [4 points](https://reddit.com/r/neovim/comments/1jdjcol/comment/mifn10g/) • 2025-03-18
> 
> I have this map to search the word under the cursor which is a very common use case for me.
> 
> nnoremap <leader>q <cmd>exec 'silent grep ' . expand('<cword>')<cr>
> 
> > **kaddkaka** • [3 points](https://reddit.com/r/neovim/comments/1jdjcol/comment/mihkkvs/) • 2025-03-18
> > 
> > Similarly I have this which I use ALL the time:
> > 
> > nnoremap <leader>g :Ggrep -q <c-r><c-w>
> > 
> > (powered by fugitive)
> > 
> > > **frodo\_swaggins233** • [1 points](https://reddit.com/r/neovim/comments/1jdjcol/comment/mii9jv7/) • 2025-03-18
> > > 
> > > this is my first time seeing `git-grep`. What's the benefit of it over `rg` if `rg` already ignores gitignored files?
> > > 
> > > edit: holy, this looks amazing. i was misunderstanding what it did. you can grep over git logs and any git tree. this looks extremely useful. thank you!
> > > 
> > > > **Danny\_el\_619** • [2 points](https://reddit.com/r/neovim/comments/1jdjcol/comment/mij5i06/) • 2025-03-18
> > > > 
> > > > If you want to search in logs and patches, take a look to `git log --grep` and `git log -G`.
> > > > 
> > > > **kaddkaka** • [1 points](https://reddit.com/r/neovim/comments/1jdjcol/comment/miikds0/) • 2025-03-18
> > > > 
> > > > The is also `git jump [grep|diff|... ]`, see contrib folder in git
> > 
> > **Danny\_el\_619** • [1 points](https://reddit.com/r/neovim/comments/1jdjcol/comment/mij6zhk/) • 2025-03-19
> > 
> > ~~That's a nice one but isn't~~ `-q` ~~to silence the output of git grep? or does fugitive do something special about it?~~
> > 
> > Edit: Never mind, I just checked that's special for fugitive to open in the quickfix. Nice!
> **BrianHuster** • [3 points](https://reddit.com/r/neovim/comments/1jdjcol/comment/miavnfb/) • 2025-03-17
> 
> Regarding ripgrep in Neovim, I think it's worth seeing this issue [https://github.com/BurntSushi/ripgrep/issues/2505](https://github.com/BurntSushi/ripgrep/issues/2505)
> 
> > **frodo\_swaggins233** • [1 points](https://reddit.com/r/neovim/comments/1jdjcol/comment/miaza1x/) • 2025-03-17
> > 
> > Oh that's interesting. So basically:
> > 
> > - Don't use this with a short pattern or if you expect a ton of entries or it will lead to outrageous outputs
> > - if you run `:cdo` on this you shouldn't run it with the \`g\` flag because there's already an entry for each match on the line
> > 
> > > **BrianHuster** • [3 points](https://reddit.com/r/neovim/comments/1jdjcol/comment/mib0fln/) • 2025-03-17
> > > 
> > > Also just don't let the command run in too long time.
> > > 
> > > But I think the safer way is to add a `-j1` flag or limit `--max-columns` (to 200, for example)
> **kaddkaka** • [1 points](https://reddit.com/r/neovim/comments/1jdjcol/comment/mihjxzs/) • 2025-03-18
> 
> I use `git-jump grep` a lot (part of git contrib folder). It greps in all tracked files (so it's fast and correct) and opens vim with quickfix list loaded. 👌
> 
> 1. `git grep banana`
> 2. "oh, nice bananas!"
> 3. `git jump grep banana`