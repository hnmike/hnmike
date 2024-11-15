---
created-date: 2024-09-18 20:07
url:
related:
alias:
tags:
summary:
---
review buoi 4: multi process/thread
	multi process chạy parallel 
	 i/o cho multi thread 
	 ![[IMG-20240918203806348.png]]
	 hàm async.io chạy một process với một thread 
	 giải pháp dùng concurrent futures in py 
		 [concurrent.futures — Launching parallel tasks — Python 3.12.6 documentation](https://docs.python.org/3/library/concurrent.futures.html)
	 background task trên API
	 Question : cách chạy asyncio
	 - Theo minh thi main() chay dau tien trong Event Loop. Trong main(), minh create_task va append task download_1st_data_func va download_2nd_data_func trong Event Loop. main() se ket thuc dau tien trong EventLoop, sau do asyncio se look into Event Loop de tim cac pending Tasks. -Vi du EventLoop chon download_1st_data de execute. Khi gap await, task do se bi suspended. Khi task bi suspended, asyncio se tiep tuc tim pending task trong EventLoop va se gap task2 cua download_2nd_data
	 - khi chạy line 24 & 25 2 task được schedule gần như cùng lúc. Muốn chắc chắn line 5 print ra trước thì cần có 1 cái await khác trước line 25. Còn ko thì ko chắc chắn line 5 luôn luôn ra trước
	 - khi thuc hien task2 (download_2nd_datset), asyncio tiep tuc gap await va se tiep tuc tim pending task trong EventLoop. Bay gio neu task1 da co ket qua thi EventLoop se thuc hien Task1 va ket thuc Task1. Sau khi ket thuc Task1 thi se tiep tuc thuc hien pending task la Task2


## Bash script

A basic script 
	 #!/bin/bash to interpret trong file bashscript.sh
     $ để khai báo giá trị của biến
     echo để print 
 syntax 
	 devhint
	 ${str%.} xóa từ phải sang trái
	 ${str##"} xóa từ trái sang phải
	 <<< lưu giá trị vào một nơi nào đó 
	 >> append
	 > overwrite
	 
	 USE condition MUST include fi at the end.
	 SHEBAN
	 cronjob
	 CRONTAB.GURU WEBSITE



