type Position = 'programmer' | 'designer' | 'manager';

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