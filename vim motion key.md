J: Move down one line
K: Move up one line
H: Move left one character
L: Move right one character
Gg: Go to the top of the file
G: Go to the bottom of the file
Ctrl+d: Move down half a page
Ctrl+u: Move up half a page
{: Move to the beginning of the previous paragraph
}: Move to the beginning of the next paragraph
/: Search forward for a string
N: Go to the next match
N: Go to the previous match
?: Search backward for a string
:: Enter command mode
Q: Quit the current buffer
W: Save the current buffer
X: Save and close the current buffer
Wq: Save and quit the current buffer
Q!: Quit without saving
ZZ: Save and quit
X: Cut the current line
Dd: Delete the current line
Yy: Yank (copy) the current line
P: Paste the last yanked text
P: Paste the last yanked text before the cursor
U: Undo the last change
Ctrl+r: Redo the last undone change
R: Replace the character under the cursor
R: Enter replace mode
I: Enter insert mode before the cursor
A: Enter insert mode after the cursor
O: Open a new line below the current line and enter insert mode
O: Open a new line above the current line and enter insert mode
A: Append text to the end of the current line
I: Insert text at the beginning of the current line
V: Enter visual mode
V: Enter visual line mode
Ctrl+v: Enter visual block mode
D: Delete the selected text
Y: Yank (copy) the selected text
C: Change the selected text
X: Cut the selected text
: Indent the selected text
<: Unindent the selected text
=: Reindent the selected text
~: Toggle the case of the selected text
J: Join the current line with the next line
P: Paste the last yanked text before the cursor
P: Paste the last yanked text after the cursor
Ctrl+w: Switch to the next window
Ctrl+w ctrl+w: Switch to the next window
Ctrl+w h: Switch to the window on the left
Ctrl+w l: Switch to the window on the right
Ctrl+w j: Switch to the window below
Ctrl+w k: Switch to the window above
Ctrl+w s: Split the current window horizontally
Ctrl+w v: Split the current window vertically
Ctrl+w c: Close the current window
Ctrl+w _: Maximize the current window
Ctrl+w =: Make all windows the same size
Ctrl+w T: Move the current window to a new tab
Gt: Go to the next tab
GT: Go to the previous tab
:tabnew: Create a new tab
:tabclose: Close the current tab
:tabonly: Close all tabs except the current one
:qall: Quit all tabs
:wqall: Save all tabs and quit
:bn: Go to the next buffer
:bp: Go to the previous buffer
:ls: List all buffers
:b: Go to a specific buffer by number
:e: Edit a file
:r: Read a file into the current buffer
:w: Write the current buffer to a file
:wq: Write the current buffer to a file and quit
:q!: Quit without saving
:set: Set options
:help: Display help information
:map: Define a new mapping
:unmap: Unmap a mapping
:abbreviate: Define an abbreviation
:unabbreviate: Unmap an abbreviation
: syntax on: Enable syntax highlighting
: syntax off: Disable syntax highlighting
: set number: Show line numbers
: set nonumber: Hide line numbers
: set ruler: Show the cursor position
: set noreuler: Hide the cursor position
: set hlsearch: Highlight search matches
: set nohlsearch: Stop highlighting search matches
: set incsearch: Incremental search
: set noincsearch: Disable incremental search
: set ignorecase: Ignore case when searching
: set noignorecase: Do not ignore case when searching
: set smartcase: Only match case at the beginning of words
: set nosmartcase: Do not match case at the beginning of words
: set wrap: Wrap lines
: set nowrap: Do not wrap lines
: set tabstop=4: Set the tab stop size to 4 spaces
: set shiftwidth=4: Set the shiftwidth to 4 spaces
: set expandtab: Convert tabs to spaces
: set noexpandtab: Do not convert tabs to spaces
: set autoindent: Enable automatic indentation
: set noautoindent: Disable automatic indentation
: set smartindent: Enable smart indentation
: set nosmartindent: Disable smart indentation
: set cindent: Enable C-style indentation
: set nocindent: Disable C-style indentation
: set backspace=indent, eol, start: Allow backspace to delete indentation, end-of-line characters, and beginning-of-line characters
: set showmatch: Highlight matching parentheses
: set noshowmatch: Do not highlight matching parentheses
: set relativenumber: Show relative line numbers
: set norelativenumber: Hide relative line numbers
: set cursorline: Highlight the current line
: set nocursorline: Do not highlight the current line
: set cursorcolumn: Highlight the current column
: set nocursorcolumn: Do not highlight the current column
: set foldmethod=indent: Set the fold method to indent
: set foldlevel=10: Set the maximum fold level
: set foldenable: Enable folding
: set nofoldenable: Disable folding
Za: Toggle folding for the current line
ZM: Close all folds
ZR: Open all folds
Zr: Open the current fold
Zm: Close the current fold
Zo: Open the current fold
Zc: Close the current fold
Zf: Fold the current block
ZF: Unfold the current block
:so: Source a Vim script file
:script: Load a Vim script file
:plugin: Load a Vim plugin
:help: Display help information
:q: Quit the help window
:h: Display help information for a specific topic
:man: Display the manual page for a specific command
:version: Display Vim version information
:colorscheme: Set the color scheme
: set background=dark: Set the background color to dark
: set background=light: Set the background color to light
: set guioptions+=a: Enable mouse support
: set guioptions-=a: Disable mouse support
: set mouse=:a: Enable mouse support for all modes
: set mouse=n: Disable mouse support
: set mousemodel=extend: Extend mouse support to all modes
: set mousemodel=normal: Disable mouse support in normal mode
: set mousemodel=passthrough: Pass mouse events to the underlying window system
: set mousemodel=stop: Stop mouse events from reaching the underlying window system
: set mouse=a: Enable mouse support for all modes
: set mouse=n: Disable mouse support
: set mousemodel=extend: Extend mouse support to all modes
: set mousemodel=normal: Disable mouse support in normal mode '