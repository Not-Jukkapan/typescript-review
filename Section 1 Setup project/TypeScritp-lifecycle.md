## TS file มันทำงานยังไง

ต้องเริม่จาก JS มันทำงานยังไงก่อน 

Dev write -> JS -> EXECUTE -> NodeJS || Browser

แต่ TS มันจะมี Extra steps

Dev write -> TS -> Compile -> JS -> EXECUTE -> NodeJS || Browser


และยังมี Features ใหม่ๆ Add เข้ามา เนื่องจากมันเป็น Super set คือนอกจากจะใช้ ของ JS ได้ยังมีของเล่นใหม่ๆ ให้เล่น เช่น
- Type system - shape for data
- Generics
- Advacned classes
- Decorators
- Multiple targets - modern JS features, run on old runtimes.

## จะ Execute .TS ได้ยังไง
Step for run first TS project

1) Create maybe myFirstTS.ts
```
type WithName = { name: string };

function printName(arg: WithName) {
    console.log(arg.name);
}

printName({ name: "John" });
```

2) วิธีแรก ถ้าจะ run TS ตาม flow ข้างบน compile มันเป็น JS ก่อน แล้วเอาไป run เรา compile โดยคำสั่ง `tsc ชื่อไฟล์`
```
tsc myFirstTS.ts
```
จะได้ `myFirstTS.js` ออกมา 
3) เราไป run file นี้อีกที อาจจะ import ไปใช้ใน Web หรือ `node myFirstTS.js`
```
node myFirstTS.js
```
ต้องได้ `John`


อีกวิธีที่ใช้ Run ได้ ดีที่โลกใบนี้มีคนทำ `ts-node` ที่มันใช่ `execute .ts ได้เลย` โดย process compile มันจะไปแอบทำเบื้องหลัง
1) ติดตั้งก่อน 
```
sudo npm i -G ts-node
```
2) ลอง execute ดู ต้องได้ John
```
ts-node myFirstTS.ts
```

## TS Compiler
อย่างที่ทราบ .TS มันต้องการ Compiler มาแปลงมันเป็น .JS ก่อนแล้ว ค่อย Run ทีนี้ เรามาดูกันว่า เราตั้งค่าอะไรกับ Compiler ตัวนี้ได้บ้าง

#### หน้าที่หลัก ๆ
- จัดการว่าไอ Code TS ที่เราเขียนมาเนี่ย แบบไหนที่จะรับได้บ้าง เดียวลองไปก็จะรู้ มันจะมีแบบ อะๆ ให้ผ่านก็ได้ ผิดแค่นี้เอง หรือ ไม่ได้ ต้องตามกฏ ไม่ตรงตามกฏ = เตะ
- จัดการว่า Output ที่มัน Gen มาเป็น JS เนี่ย หน้าตามันจะเป็นยังไง อย่างที่เรารู้ๆกัน JS มีหลาย Standard มาก ละทีนี้ เราอยากให้ TS เราออกมาตาม Standard ไหนล่ะ ก็มาตั้งค่ากันที่นี่
- พวก Path ทั่วๆ ไปของ Projects

#### สร้าง config file และลองปรับๆ กัน
1) `tsc --init` จะได้ tsconfig.json
2) ลองเล่นกับ Classic อย่าง `rootDir` `outDir` ดู และใช้ `tsc` มันจะ compiles ละว่างๆ ลองอ่าน Document ดูเอา