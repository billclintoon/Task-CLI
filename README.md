# Task-CLI
Apikasi terminal untuk membuat Task dengan fitur 
-membuat Task 
-mengupdate status Task
-menghapus Task
-menampilkan list Task
-dilengkapi fitur Waktu dan Tanggal
-ditampilkan ke Json

Cara penggunaan 
-untuk menambahkan Task 
node index.js add "nama-task"
contoh:
node index.js add "Task-1"

-update nama Task
node index.js update id "nama task yang baru"
contoh:
node index.js update 1 "Update-task"

-untuk mengupdate Status Task 
node index.js update id status (to-do, in-progress, done)
contoh:
node index.js update 1 in-progress

-untuk menghapus task 
node index.js delete id
contoh:
node index.js delete 1

