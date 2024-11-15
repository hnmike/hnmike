 the `ls` command which is used list files and directories. However, they have some differences in functionality.

==Here's a breakdown of each commandtk==
1.`ls -l`: The `-l` option shows the long format output of the `ls` command. When used with `ls`, it displays detailed information about each ==file and directory==. The output includes permissions, number of links, owner, group, file size, date, and time of last modification, and the name of the file or directory.
    
2. `ls -lad`: The `-lad` options include `-l`, `-a`, and `-d`.
    
3. `-l` displays detailed information about each file and directory, just like in the `ls -l` command.
4. `-a` shows all files and directories, including hidden files that start with a dot.
5. `-d` lists only the directories themselves, not their contents.

When used together, `ls -lad` will display detailed information about a directory, including hidden directories, without listing the contents of those directories.

In summary, `ls -l` displays detailed information about each file and directory in long format, while `ls -lad` is used to display detailed information about a directory, including hidden directories, without listing the contents of those directories.
The command used to copy a file is the `cp` command. It has the following syntax: `cp [ORIGINAL-FILE] [NEW-FILE-NAME]`. If you're in `/app`, you should `cd` into `data/` first:
$ ln -s < path to the file to be linked > < the path of the link to be created >
