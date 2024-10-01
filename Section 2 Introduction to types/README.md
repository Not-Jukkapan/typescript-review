# Type introduction 

เราจะมาทวนพวก type พื้นฐานกัน ว่าเราจะเจออะไรบ้าง
1) ทวนพวก Primitive type - JS and TS
   ใน JS type มันจะ infer มาจาก values - ซึ่ง ถ้าเอาเมาส์ไปชี้ๆ TS มันจะ detect ได้แหละว่าเป็น type อะไร และ ถ้าเราไป manipulate มัน แล้ว Type ไม่ตรง TS มันจะเตะ.
   โดยนอกจาก type พื้นฐานของ JS แล้วเนี่ย TS มันจะมี Primitive เหล่านี้เพิ่มขึ้นมา ลองๆ นึกดูนะ 
   - any
   - unknown
   - never
   - arrays
   - tuples
   - Enums
### 2)  Arrays and Tuples
   
   ```ts
   // Array มันจะมี 2 ท่าใช้ประกาศ type ให้ Array
    const duties : string[] = ['write code']
    const duties2 : Array<string> = ['write code2'] // เรียกว่า generics
    // พอเราทีงี้ intelisense มันจะช่วย auto suggestion พวก method ของ array ให้เรามา dot ใช้ได้
    duties.push('xxx')
    duties2.map((x)=>console.log(x))

    // Tuples ไม่ค่อยได้ใช้หรอก ไปใช้ Object ดูดีกว่า มันจะ Fix ไว้เลยว่า Array นี้ มันจะ length งี้ หน้าตาเป็นงี้
    let employee:[string, number] = ['John', 5]
    // ข้อมูลที่จะ assign ไปต้องงี้เลย ถ้า range ไม่ตรง ตำแหน้่งไม่ตรง type ก็จะเตะ
    // แต่มันยังมีปัญหาคือ เรา push ค่ายัดไปได้

    employee.push('I'm the probles EiEi'); 
    // มันเลยไม่ควรใช้
   ```
### 3) Functions
   concept คือ กำหนด Type ของ Input และ Output ให้ Function หนักๆ แค่นั้นเลย input ถ้าไม่กำหนด มันจะ infer any ไป ซึ่ง TS compiler มันจะเตะ `แต่เราไป เลือก option ให้มันไม่เตะได้` ละ output ถ้าไม่ได้ return อะไร มันจะ infer เป็น void แต่ถ้ามีการ return มันก็จะ inter เป็น type ที่มัน return ไม่ต้องกำหนดก็ได้ ถ้า function มันเล้กๆ แต่ถ้างานเริ่มใหญ่ และทำงานก็บคนอื่นก็กำหนดไว้เถอะ มีแต่ข้อดี และอีกอย่าง มันจะมีอีกกรณีคือ พวก Function ที่เราไม่รู้มัน Return เป็นอะไร เช่นเวลาเราใช้งาน กับ 3rd party

   ```ts
    // ตัวอย่างนะ
    function hahaYo (haha:string) {
        return JSON.parse(haha)
    }
   ```
   ไอ้ตัวเนี้ย มันจะไม่บอกว่าจะ return เป็น type อะไร (สมมุติชีวิตจริง ลองไปใช้กับพวก services นอกดู) พวกจะ return type เป็น any ออกมา ความงานไส้คือ เราเอาไป dot ใช้ method ในนั้นไม่ได้แล้ว เวลา Dot ไปก็ไม่เตือนอะไร ทำเหมือน ไม่เคยเกิดขึ้น วิธีที่ควรทำคือ TS มันจะมี type unknown มาใช้กับพวก function นี้แหละ
   ```ts
    function hahaYo (haha:string):unknown {
        return JSON.parse(haha)
    }
   ```
   ทีนี้ เวลาเราไป dot TS มันจะเตะเราแล้ว และมัน make sense กว่า ไปใช้ any เพราะไม่รู้ก็บอกว่าไม่รู้ แล้วเราไปใช้เทคนิคที่เรียกว่า `type narrowing` ดีกว่า อารมณ์ตัด Choice
   ```ts
    function hahaYo (haha:string):unknown {
        return JSON.parse(haha)
    }
    let iam = hahaYo("haha")
    if(typeof iam === "number"){
        iam ++
    }
     if(typeof iam === "string"){
       iam.includes('$')
    }

    if(typeof iam === "number" || typeof iam === "string") {
        iam.valueOf();
    }
    // หรือ Check ไปงี้ก็ได้นะ 
    if (iam &&
        typeof iam === 'object' &&
        'histoy' in iam &&
        Array.isArray(iam.history)){
            im.history.push(999)
    }

   ```
   เราจะสามารถ dot เอา method ของ type นั้นๆ มาใช้ได้ โดยที่ TS Compiler ไม่เตะ

### 4 Type Alias
ก็คือการ เอา Values มาตั้งเป็น Type ได้นั้นแหละ เพื่อจำกัด values ที่จะรับมาของบางตัวแปร.

```ts
****type Position = 'programmer' | 'designer' | 'manager';

interface Person {
    name: string;
    position: Position;
    greetBack?: (name: string) => void;
}


const person: Person = {
    name: 'John',
    position: 'programmer',
    greetBack: (name: string) => console.log(`Hello ${name}, I'm ${person.name}`)
};  // OK

const person2:{
    name: string;
    position: Position;
    tasks: string[];
} = {
    name: 'John',
    position: 'programmer',
    tasks: ['write code', 'fix bugs']
};  


function greetCollege(person: Person) {
    console.log(`Hello ${person.name}`);
    if(person.greetBack) {
        person.greetBack('Jane');
    }
}

greetCollege(person);  // Hello John, Hello Jane, I'm John
greetCollege(person2);  // Hello John
```

จะเห็นว่า Person 2 Type ไม่ตรง แต่่มันก็ยังให้ผ่าน เพราะมันมีส่วนนึงที่ Cover ค่อยข้างหมด เอาจริงมันเขียนได้อีกแบบคือ

```ts
const person2: Person & {
    tasks: string[];
} = {
    name: 'John',
    position: 'programmer',
    tasks: ['write code', 'fix bugs']
};
```

### 5 Practice 
มาลองทำอะไรง่าย ๆ เล่นกัน
**Requirement**
- Create an Employee type
- Create emplyees with a function that assigness random ids
- Send all emplyees an email

**Steps:**
- node project init
- types install
- create and run files
- `generated d.ts files`