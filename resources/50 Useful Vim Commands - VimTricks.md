---
title: "50 Useful Vim Commands - VimTricks"
summary: "50 useful Vim commands for all skill levels. Learn tips & tricks to improve your Vim workflow. Includes navigation, editing, and more."
source: "https://vimtricks.com/p/50-useful-vim-commands/"
author:
  - "[[@vim_tricks]]"
published:
created: 2025-03-25
description: "Here are 50 use Vim commands for Vim users of all proficiency levels. From beginner to advanced, everyone is sure to find a useful tip."
tags:
type :
---
>[!summary]+ This webpage provides a list of 50 useful Vim commands for users of all levels, designed to improve their Vim workflow. It includes commands for navigation, editing, and more.
4.8 ( 301 )

Here are 50 useful Vim commands that work in normal mode. Many of these can be combined and modified to produce dozens more. Use these as inspiration for your own repeatable workflows. In no particular order:

1. `gg` Move to the first line of the file
2. `G` Move to the last line
3. `gg=G` [Reindent the whole file](https://vimtricks.com/p/vimtrick-indenting-code/)
4. `gv` [Reselect the last visual selection](https://vimtricks.com/p/vimtrick-reselect-last-visual-selection/)
5. `` `< `` Jump to beginning of last visual selection
6. `` `> `` Jump to end of last visual selection
7. `^` Move to first non-blank character of the line
8. `g_` Move the last non-blank character of the line (but you [remove trailing whitespace](https://vimtricks.com/p/vim-remove-trailing-whitespace/), right)
9. `g_lD` Delete all the trailing whitespace on the line
10. `ea` Append to the end of the current word
11. `gf` Jump to the file name under the cursor
12. `xp` [Swap character forward](https://vimtricks.com/p/swap-two-characters-in-vim/)
13. `Xp` [Swap character backward](https://vimtricks.com/p/swap-two-characters-in-vim/)
14. `yyp` Duplicate the current line
15. `yapP` Duplicate the current paragraph
16. `dat` Delete around an HTML tag, including the tag
17. `dit` Delete inside an HTML tag, excluding the tag
18. `w` Move one word to the right
19. `b` Move one word to the left
20. `dd` Delete the current line
21. `zc` [Close current fold](https://vimtricks.com/p/vim-code-folding/)
22. `zo` [Open current fold](https://vimtricks.com/p/vim-code-folding/)
23. `za` [Toggle current fold](https://vimtricks.com/p/vim-code-folding/)
24. `zi` [Toggle folding entirely](https://vimtricks.com/p/vim-code-folding/)
25. `<<` Outdent current line
26. `>>` Indent current line
27. `z=` [Show spelling corrections](https://vimtricks.com/p/vim-spell-check/)
28. `zg` [Add to spelling dictionary](https://vimtricks.com/p/vim-spell-check/)
29. `zw` [Remove from spelling dictionary](https://vimtricks.com/p/vim-spell-check/)
30. `~` Toggle case of current character
31. `gUw` [Uppercase until end of word](https://vimtricks.com/p/change-character-case/) (u for lower, ~ to toggle)
32. `gUiw` [Uppercase entire word](https://vimtricks.com/p/change-character-case/) (u for lower, ~ to toggle)
33. `gUU` [Uppercase entire line](https://vimtricks.com/p/change-character-case/)
34. `gu$` [Lowercase until the end of the line](https://vimtricks.com/p/change-character-case/)
35. `da"` [Delete the next double-quoted string](https://vimtricks.com/p/vimtrick-efficient-changes/)
36. `+` Move to the first non-whitespace character of the next line
37. `S` Delete current line and go into insert mode
38. `I` insert at the beginning of the line
39. `ci"` [Change what’s inside the next double-quoted string](https://vimtricks.com/p/vimtrick-efficient-changes/)
40. `ca{` [Change inside the curly braces](https://vimtricks.com/p/vimtrick-efficient-changes/) (try \[, (, etc.)
41. `vaw` [Visually select word](https://vimtricks.com/p/vimtrick-efficient-changes/)
42. `dap` [Delete the whole paragraph](https://vimtricks.com/p/vimtrick-efficient-changes/)
43. `r` [Replace a character](https://vimtricks.com/p/normal-mode-replacement/)
44. `` `[ `` Jump to beginning of last yanked text
45. `` `] `` Jump to end of last yanked text
46. `g;`[Jump to the last change you made](https://vimtricks.com/p/vim-jump-to-last-change/)
47. `g,`[Jump back forward through the change list](https://vimtricks.com/p/vim-jump-to-last-change/)
48. `&` [Repeat last substitution on current line](https://vimtricks.com/p/vimtrick-repeat-the-last-substitution/)
49. `g&` Repeat last substitution on all lines
50. `ZZ` Save the current file and close it

How useful was this tip?

Average rating 4.8 / 5. Vote count: 301

No votes so far! Be the first to rate this tip.