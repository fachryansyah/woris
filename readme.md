# Worker Framework
This is framework for building background worker queue apps

# Manual
## 1. spawn.sh
spawn.sh itu file untuk hidupin worker langsung banyak tergantung dari jumlah yg di tentukan,  ini untuk dijalanin di server

## 2. start.bat
buat orang gblk yang masih pake windows, tinggal klik 2x

## 3. parallel.bat
sama kaya spawn.sh, bedanya untuk windows

## 4. routes/Queue.js
Disini tempat routing dari event - event yang lagi jalan di backend.

## 5. Folder models
Ini isinya file ORM untuk table di DB.

## 6. Folder handler
Tempat perintah si workernya, bikin 1 fungsi yg diexport terus di import ke routes/Queue.js
untuk parameter fungsinya itu payload tipenya Object, kalo lu ga tau isinya dari payload bisa di ```console.log``` nanti lu bisa pake data apa yg lu butuhkan

## 7. Folder database
Buat koneksi DB, jgn diutak-atik pokoknya

## 8. app/Engine.js
Nah ini mesinnya si worker, jgn diutak atik, kecuali mau nambahin AUTH di redis nya atau ganti property koneksi db / socket dll

## 9. cli.js
Fungsinya untuk ngetest handler lu tanpa perlu jalanin worker di background, jadi bisa langusng pake printah
```
$ node cli.js
```
nanti muncul help bisa diatur di cli.js nya dibagian program.command()