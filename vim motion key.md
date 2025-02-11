j: Move down one line 
k: Move up one line
h: Move left one character 
l: Move right one character
gg: Go to the top of the file 
G: Go to the bottom of the file 
ctrl+d: Move down half a page
ctrl+u: Move up half a page 
{: Move to the beginning of the previous paragraph 
}: Move to the beginning of the next paragraph 
/: Search forward for a string
n: Go to the next match
N: Go to the previous match 
?: Search backward for a string 
:: Enter command mode 
q: Quit the current buffer 
w: Save the current buffer 
x: Save and close the current buffer
wq: Save and quit the current buffer
q!: Quit without saving
ZZ: Save and quit 
X: Cut the current line 
dd: Delete the current line 
yy: Yank (copy) the current line 
p: Paste the last yanked text
P: Paste the last yanked text before the cursor 
u: Undo the last change 
ctrl+r: Redo the last undone change 
r: Replace the character under the cursor 
R: Enter replace mode
i: Enter insert mode before the cursor 
a: Enter insert mode after the cursor 
o: Open a new line below the current line and enter insert mode 
O: Open a new line above the current line and enter insert mode 
A: Append text to the end of the current line
I: Insert text at the beginning of the current line 
v: Enter visual mode 
V: Enter visual line mode 
ctrl+v: Enter visual block mode 
d: Delete the selected text 
y: Yank (copy) the selected text 
c: Change the selected text 
x: Cut the selected text 
: Indent the selected text 
<: Unindent the selected text 
=: Reindent the selected text 
~: Toggle the case of the selected text 
J: Join the current line with the next line 
P: Paste the last yanked text before the cursor 
p: Paste the last yanked text after the cursor 
ctrl+w: Switch to the next window 
ctrl+w ctrl+w: Switch to the next window 
ctrl+w h: Switch to the window on the left 
ctrl+w l: Switch to the window on the right 
ctrl+w j: Switch to the window below 
ctrl+w k: Switch to the window above 
ctrl+w s: Split the current window horizontally 
ctrl+w v: Split the current window vertically 
ctrl+w c: Close the current window
ctrl+w _: Maximize the current window 
ctrl+w =: Make all windows the same size 
ctrl+w T: Move the current window to a new tab gt: Go to the next tab gT: Go to the previous tab :tabnew: Create a new tab :tabclose: Close the current tab :tabonly: Close all tabs except the current one :qall: Quit all tabs :wqall: Save all tabs and quit :bn: Go to the next buffer :bp: Go to the previous buffer :ls: List all buffers :b: Go to a specific buffer by number :e: Edit a file :r: Read a file into the current buffer :w: Write the current buffer to a file :wq: Write the current buffer to a file and quit :q!: Quit without saving :set: Set options :help: Display help information :map: Define a new mapping :unmap: Unmap a mapping :abbreviate: Define an abbreviation :unabbreviate: Unmap an abbreviation :syntax on: Enable syntax highlighting :syntax off: Disable syntax highlighting :set number: Show line numbers :set nonumber: Hide line numbers :set ruler: Show the cursor position :set noreuler: Hide the cursor position :set hlsearch: Highlight search matches :set nohlsearch: Stop highlighting search matches :set incsearch: Incremental search :set noincsearch: Disable incremental search :set ignorecase: Ignore case when searching :set noignorecase: Do not ignore case when searching :set smartcase: Only match case at the beginning of words :set nosmartcase: Do not match case at the beginning of words :set wrap: Wrap lines :set nowrap: Do not wrap lines :set tabstop=4: Set the tab stop size to 4 spaces :set shiftwidth=4: Set the shiftwidth to 4 spaces :set expandtab: Convert tabs to spaces :set noexpandtab: Do not convert tabs to spaces :set autoindent: Enable automatic indentation :set noautoindent: Disable automatic indentation :set smartindent: Enable smart indentation :set nosmartindent: Disable smart indentation :set cindent: Enable C-style indentation :set nocindent: Disable C-style indentation :set backspace=indent,eol,start: Allow backspace to delete indentation, end-of-line characters, and beginning-of-line characters :set showmatch: Highlight matching parentheses :set noshowmatch: Do not highlight matching parentheses :set relativenumber: Show relative line numbers :set norelativenumber: Hide relative line numbers :set cursorline: Highlight the current line :set nocursorline: Do not highlight the current line :set cursorcolumn: Highlight the current column :set nocursorcolumn: Do not highlight the current column :set foldmethod=indent: Set the fold method to indent :set foldlevel=10: Set the maximum fold level :set foldenable: Enable folding :set nofoldenable: Disable folding za: Toggle folding for the current line zM: Close all folds zR: Open all folds zr: Open the current fold zm: Close the current fold zo: Open the current fold zc: Close the current fold zf: Fold the current block zF: Unfold the current block :so: Source a Vim script file :script: Load a Vim script file :plugin: Load a Vim plugin :help: Display help information :q: Quit the help window :h: Display help information for a specific topic :man: Display the manual page for a specific command :version: Display Vim version information :colorscheme: Set the color scheme :set background=dark: Set the background color to dark :set background=light: Set the background color to light :set guioptions+=a: Enable mouse support :set guioptions-=a: Disable mouse support :set mouse=:a: Enable mouse support for all modes :set mouse=n: Disable mouse support :set mousemodel=extend: Extend mouse support to all modes :set mousemodel=normal: Disable mouse support in normal mode :set mousemodel=passthrough: Pass mouse events to the underlying window system :set mousemodel=stop: Stop mouse events from reaching the underlying window system :set mouse=a: Enable mouse support for all modes :set mouse=n: Disable mouse support :set mousemodel=extend: Extend mouse support to all modes :set mousemodel=normal: Disable mouse support in normal mode `:set mousemodel