---
source: "https://www.reddit.com/r/neovim/comments/1ittshe/need_a_detailed_guide_for_vim_motions_and/"
author:
subreddit: "r/neovim"
published: ["2025-02-20T08:26:17.925Z","2025-02-20T09:54:04.557Z","2025-02-20T10:47:18.563Z","2025-02-24T12:57:58.241Z","2025-02-24T13:19:19.599Z","2025-02-24T13:20:35.475Z","2025-02-24T13:21:18.659Z","2025-02-24T13:22:12.058Z","2025-02-20T13:22:40.934Z","2025-02-20T15:24:18.983Z","2025-02-20T17:17:48.143Z","2025-02-20T08:37:42.486Z","2025-02-20T17:16:06.697Z","2025-02-20T17:17:20.009Z","2025-02-20T11:11:16.501Z","2025-02-20T12:18:10.462Z","2025-02-21T00:09:59.246Z","2025-02-20T13:52:11.380Z","2025-02-20T10:18:02.653Z","2025-02-20T10:46:42.169Z","2025-02-20T10:51:10.608Z","2025-02-20T11:05:51.350Z","2025-02-20T11:27:52.087Z","2025-02-20T12:21:13.903Z","2025-02-20T19:48:01.515Z","2025-02-20T21:43:24.675Z","2025-02-21T10:28:04.290Z","2025-03-09T01:14:59.313Z","2025-02-21T15:41:34.316Z","2025-02-21T15:43:25.180Z","2025-02-21T16:26:44.596Z","2025-02-21T21:18:11.959Z","2014-02-24T09:21:21.727Z"]
created: 2025-03-25
image:
tags:
  - "reddit"
---
## Original Post
> [!note]- Original
> ![](https://www.reddit.com/r/neovim/comments/1ittshe/need_a_detailed_guide_for_vim_motions_and/)
>[!quote] Need a detailed guide for vim motions and ergonomic navigation tips & guides

> 

## Comments

> [!quote] ## Comments
> **tris203** • [32 points](https://reddit.com/r/neovim/comments/1ittshe/comment/mds0etc/) • 2025-02-20
> 
> I would shamelessly recommend my plugin precognition, it will show a virtual line to remind you what motions are available.
> 
> ![Comment Image](https://preview.redd.it/need-a-detailed-guide-for-vim-motions-and-ergonomic-v0-zqntsm0vn9ke1.png?width=668&format=png&auto=webp&s=8496a46622f255967bfa32d320d3fdf8a4cfcdb3)
> 
> [https://github.com/tris203/precognition.nvim](https://github.com/tris203/precognition.nvim)
> 
> If you combine it with something like hardtime.nvim, it will make you learn fast.
> 
> > **siduck13** • [1 points](https://reddit.com/r/neovim/comments/1ittshe/comment/mds5sl1/) • 2025-02-20
> > 
> > wew
> > 
> > **Quan\_Saiyan** • [1 points](https://reddit.com/r/neovim/comments/1ittshe/comment/meie24r/) • 2025-02-24
> > 
> > hey, is it possible to add support / edit the locations for the virtual text based on changes in the base motions, or plugins that add motions like [https://github.com/chrisgrieser/nvim-spider](https://github.com/chrisgrieser/nvim-spider) for example?
> > 
> > > **tris203** • [2 points](https://reddit.com/r/neovim/comments/1ittshe/comment/meihbfv/) • 2025-02-24
> > > 
> > > At the moment no. In v2 yes. When will that be, don't know
> > > 
> > > > **Quan\_Saiyan** • [1 points](https://reddit.com/r/neovim/comments/1ittshe/comment/meihili/) • 2025-02-24
> > > > 
> > > > Ah, oh well. Still, sounds good. I am stoked atleast
> > > > 
> > > > > **tris203** • [2 points](https://reddit.com/r/neovim/comments/1ittshe/comment/meihmog/) • 2025-02-24
> > > > > 
> > > > > There is a v2 branch if you wanted to test it out
> > > > > 
> > > > > > **Quan\_Saiyan** • [1 points](https://reddit.com/r/neovim/comments/1ittshe/comment/meihrqt/) • 2025-02-24
> > > > > > 
> > > > > > Yeah sure! I'll take a look
> **Redox\_ahmii** • [7 points](https://reddit.com/r/neovim/comments/1ittshe/comment/mdspxd6/) • 2025-02-20
> 
> For vertical movements i tend to use relative jumps or the trusty old ctrl d and u. For horizontal i use w, e and b and occasionally f to find. Alot of / to find and then n. One last thing is using motions ci( and ci{ if that is available in the code and these are usually my first priority as they will jump the cursor inside those brackets as well. Imo these are enough to know and if you want something more you can use ctrl o and ctrl i to jump to last edited positions or marks and global marks for jumping between files quickly.
> **Mhalter3378** • [6 points](https://reddit.com/r/neovim/comments/1ittshe/comment/mdtcb0h/) • 2025-02-20
> 
> I'm a big fan of this blog post which really deconstructs and explains very well the vim grammar of operators/motions/objects which construct a vim command (similar to a verb + preposition + noun == sentence): [https://takac.github.io/2013/01/30/vim-grammar/](https://takac.github.io/2013/01/30/vim-grammar/)
> 
> Then for practice a huge one that I love is VimGolf: [https://www.vimgolf.com/](https://www.vimgolf.com/)
> 
> A great first step I took when I was learning vim was disabling h, j, k, l as a like "removing the training wheels" and forcing the use of other motions since very rarely do I really want to only move a single character at a time. Obviously not something I would leave disabled forever, but a really great learning exercise
> 
> > **siduck13** • [2 points](https://reddit.com/r/neovim/comments/1ittshe/comment/mdu0n5x/) • 2025-02-20
> > 
> > thanks
> **MindFullStream** • [3 points](https://reddit.com/r/neovim/comments/1ittshe/comment/mdrsvu1/) • 2025-02-20
> 
> My suggestions are about vim, not about improving your pain. You should take this serious and improve other conditions as well. Improving your vim workflow might help, but it might not.
> 
> Vimtutor has some solid starting points. Lists of build in operators/text objects can be found in the help section, with "help text-objects" and "help operators" respectively.
> 
> If you have worked through these, I have written a plugin to further train some of these: [https://github.com/Weyaaron/nvim-training](https://github.com/Weyaaron/nvim-training) Let me know if you need any help getting started with this.
> **serialized-kirin** • [3 points](https://reddit.com/r/neovim/comments/1ittshe/comment/mdu09x3/) • 2025-02-20
> 
> I’ve found that just getting used to using f, t, and /, Along with getting better with using textobjects (especially treesitter based textobjects) and the count parameter (ofc with `set rnu`) were really where I felt a significant improvement in movement ability and clarity.  The nice thing about textobjects is that if you aren’t inside the specified textobjects it will sometimes just jump to the nearest guy that fits the requirements and perform the action there, thus further reducing the amount of movements/typing you must do. 
> 
> Also just so my answer is not a copy of others— A convenient one is \]d and \[d which move by diagnostic. That might just be in nightly tho im not sure. 
> 
> > **serialized-kirin** • [1 points](https://reddit.com/r/neovim/comments/1ittshe/comment/mdu0jhe/) • 2025-02-20
> > 
> > Oh and btw im REALLY excited to see how this informs you very prolific plugin development :)
> **FlipperBumperKickout** • [2 points](https://reddit.com/r/neovim/comments/1ittshe/comment/mds8c74/) • 2025-02-20
> 
> vim tutor? google? :help?
> 
> > **siduck13** • [1 points](https://reddit.com/r/neovim/comments/1ittshe/comment/mdsgczs/) • 2025-02-20
> > 
> > i did vimtutor before
> > 
> > > **bogfoot94** • [2 points](https://reddit.com/r/neovim/comments/1ittshe/comment/mdwfqh9/) • 2025-02-21
> > > 
> > > It explains all the basic motions with examples. This is exactly what you're looking for.
> **ehansen** • [3 points](https://reddit.com/r/neovim/comments/1ittshe/comment/mdsuttf/) • 2025-02-20
> 
> The doc for mini.ai plugin is helpful to me to navigate via text objects.  it gives me a pre-execution visual.  but to get the full benefit you need the plugin.
> 
> As a general purpose I often ask what I'm trying to do and then search "how to (task) in neovim"  I learned about Y for yank line from cursor this way.  and also gg/G.
> 
> It's probably one of the slowest ways but for me it helps build muscle memory
> **winterpeach355** • [1 points](https://reddit.com/r/neovim/comments/1ittshe/comment/mds2u9e/) • 2025-02-20
> 
> You mean [https://vim.rtorr.com?](https://vim.rtorr.com/)
> 
> > **siduck13** • [1 points](https://reddit.com/r/neovim/comments/1ittshe/comment/mds5qe9/) • 2025-02-20
> > 
> > thanks this is helpful
> > 
> > > **winterpeach355** • [6 points](https://reddit.com/r/neovim/comments/1ittshe/comment/mds670e/) • 2025-02-20
> > > 
> > > Are you trolling? You're the author of NvChad.
> > > 
> > > > **siduck13** • [6 points](https://reddit.com/r/neovim/comments/1ittshe/comment/mds7r77/) • 2025-02-20
> > > > 
> > > > I'm not trolling, just because i can make config and some plugins in Lua, that doesnt make me good at vim motions, I never learned it. I might know few lua api functions and make beautiful plugins but im bad at using vim at its full potential
> > > > 
> > > > back when i had a touchscreen x240 i was using the touch instead of mouse lool
> > > > 
> > > > **BlitZ\_Senpai** • [3 points](https://reddit.com/r/neovim/comments/1ittshe/comment/mdsa6e5/) • 2025-02-20
> > > > 
> > > > Is he fr?
> **el\_sturlo** • [1 points](https://reddit.com/r/neovim/comments/1ittshe/comment/mdsgrvr/) • 2025-02-20
> 
> If you have an Android phone, look at the Vim Master app on Play Store
> **antonk52** • [1 points](https://reddit.com/r/neovim/comments/1ittshe/comment/mduxskt/) • 2025-02-20
> 
> Many good suggestions in the comments. Here’s a couple more that I didn’t see yet
> 
> - See docs for H M L, be aware that you combine them with numbers ie 5L go to 5th line at the bottom.
> - going to start and end of line with ^ and $ respectively. I find these quite awkward to reach so mapped them to leader an and leader e. See what works for you. I saw some people use gh and gl
> 
> For other navigation I either use regular search / or fuzzy in buffer lines search. As well as some spamming of hjklweb
> **CoreLight27** • [1 points](https://reddit.com/r/neovim/comments/1ittshe/comment/mdvmnv8/) • 2025-02-20
> 
> If you haven't already, check out ThePrimeagen and his guide. Also try to finish vim tutor fast. Learn f and t.
> **hrsh7th** • [1 points](https://reddit.com/r/neovim/comments/1ittshe/comment/mdyszzq/) • 2025-02-21
> 
> It's very important to be able to use % effectively.
> 
> I use H/J/K/L a lot for general movements, and /, f and % for fine movements.
> 
> vim.keymap.set({ 'n', 'x' }, 'H', '20h')  
> vim.keymap.set({ 'n', 'x' }, 'J', '10j')  
> vim.keymap.set({ 'n', 'x' }, 'K', '10k')  
> vim.keymap.set({ 'n', 'x' }, 'L', '20l')
> 
> (I know that H/J/K/L are not a very good solution.)
> 
> > **SpecificFly5486** • [1 points](https://reddit.com/r/neovim/comments/1ittshe/comment/mgs1utw/) • 2025-03-09
> > 
> > This is the way, much easier than relative numbers
> **gorilla-moe** • [1 points](https://reddit.com/r/neovim/comments/1ittshe/comment/me05dit/) • 2025-02-21
> 
> I'm not kidding and it seems counter-intuitive, but I had the exact same symptoms and I cured them by accident when switching out my mouse with a touch pad. I'm not affiliated to any of those companies and you're free to choose, but I went with [https://gorilla.moe/resources/uses/seenda-touchpad.jpg](https://gorilla.moe/resources/uses/seenda-touchpad.jpg) which is available on amazon: [https://amzn.to/3CZp0UK](https://amzn.to/3CZp0UK)
> 
> It's not very cheap and has some disadvantages compared to a regular mouse, but also some advantages that make up to those shortcomings.
> 
> I don't know why it cured my pain, but it did. I recently tried to switch back to a mouse because of the shortcomings that come with using soley a touchpad, but my pain came back and I immediately switched back to the touchpad and the pain is gone once again O\_o
> 
> I don't know how that relates to me typing a lot on a 60% keyboard in neovim, but it cures my pain, so I don't hesitate to make you at least think about that.
> 
> > **gorilla-moe** • [1 points](https://reddit.com/r/neovim/comments/1ittshe/comment/me05rl2/) • 2025-02-21
> > 
> > I have to add, that I'm using the mouse a lot when surfing the internets and lookin up documentation, so that might be somehow related. But I've never had issue when using just mouse based editors as you mentioned. So IDK, I'm just happy the pain is gone again.
> > 
> > **siduck13** • [1 points](https://reddit.com/r/neovim/comments/1ittshe/comment/me0exe9/) • 2025-02-21
> > 
> > that is way beyond my paygrade, i use a $1 mousepad haha , No cap! got 2 at $2
> > 
> > ![Comment Image](https://preview.redd.it/need-a-detailed-guide-for-vim-motions-and-ergonomic-v0-h7kky49zqike1.png?width=1453&format=png&auto=webp&s=7d26d72623e502a287d9f980ab9f07ad77c5500e)
> **bobifle** • [1 points](https://reddit.com/r/neovim/comments/1ittshe/comment/me24t3f/) • 2025-02-21
> 
> [the goat](https://youtube.com/playlist?list=PLm323Lc7iSW_wuxqmKx_xxNtJC_hJbQ7R&si=n1sBbhn9F4RjNtGD)