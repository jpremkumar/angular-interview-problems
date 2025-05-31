import { Component } from '@angular/core';

@Component({
  selector: 'app-typescript-concepts',
  templateUrl: './typescript-concepts.html',
  styleUrls: ['./typescript-concepts.css']
})
export class TypescriptConceptsComponent {

  // Basic Types Example
  basicTypesExample = `
let isDone: boolean = false;
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let color: string = "blue";
color = 'red';

let fullName: string = \`Bob Bobbington\`;
let age: number = 37;
let sentence: string = \`Hello, my name is \${fullName}.

I'll be \${age + 1} years old next month.\`;

let list: number[] = [1, 2, 3];
let listGeneric: Array<number> = [1, 2, 3];

// Tuple
let x: [string, number];
x = ["hello", 10]; // OK
// x = [10, "hello"]; // Error

console.log(x[0].substring(1)); // OK
// console.log(x[1].substring(1)); // Error, 'number' does not have 'substring'

// Enum
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;
let colorName: string = Color[2]; // Green

// Any
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

// Void
function warnUser(): void {
    console.log("This is my warning message");
}
let unusable: void = undefined; // OK if --strictNullChecks not specified

// Null and Undefined
let u: undefined = undefined;
let n: null = null;

// Never
function error(message: string): never {
    throw new Error(message);
}
function infiniteLoop(): never {
    while (true) {}
}

// Unknown
let unknownValue: unknown = 4;
unknownValue = "string";
if (typeof unknownValue === 'string') {
  console.log(unknownValue.toUpperCase()); // OK, type is narrowed to string
}
// let strLength: number = unknownValue.length; // Error: Object is of type 'unknown'.

// Object
declare function create(o: object | null): void;
create({ prop: 0 }); // OK
create(null); // OK
// create(42); // Error
// create("string"); // Error
  `;

  // Interfaces vs. Types Example
  interfacesTypesExample = `
// Interface
interface PersonInterface {
  name: string;
  age: number;
  greet(): void;
}

const person1: PersonInterface = {
  name: "Alice",
  age: 30,
  greet() {
    console.log(\`Hello, my name is \${this.name}\`);
  }
};
person1.greet();

// Type Alias
type PointType = {
  x: number;
  y: number;
};

const p1: PointType = { x: 10, y: 20 };

// Differences:
// 1. Declaration Merging (Interfaces can be merged, Types cannot)
interface Box { height: number; width: number; }
interface Box { scale: number; }
let box: Box = { height: 5, width: 6, scale: 10 };

// type Window { title: string; }
// type Window { ts: TypeScriptAPI; } // Error: Duplicate identifier 'Window'.

// 2. Extending
interface AnimalInterface { name: string; }
interface DogInterface extends AnimalInterface { breed: string; }

type AnimalType = { name: string; };
type DogType = AnimalType & { breed: string; }; // Using intersection for similar effect

// Interface can extend Type
type ShapeType = { id: string };
interface CircleInterface extends ShapeType { radius: number; }

// Type can use Interface with intersection
interface ColorInterface { color: string; }
type ColoredCircleType = ColorInterface & { radius: number; };
  `;

  // Enums Example
  enumsExample = `
// Numeric Enum
enum DirectionNumeric {
  Up = 1,
  Down, // 2
  Left, // 3
  Right, // 4
}
let dirNum: DirectionNumeric = DirectionNumeric.Left; // 3
console.log(DirectionNumeric[3]); // "Left"

// String Enum
enum DirectionString {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
let dirStr: DirectionString = DirectionString.Up; // "UP"

// Const Enum (inlined at compile time)
const enum HttpStatus {
  Ok = 200,
  NotFound = 404,
}
let statusNum: HttpStatus = HttpStatus.Ok; // Compiled to: let statusNum = 200;
// console.log(HttpStatus[200]); // Error: A const enum member can only be accessed using a string literal.
  `;

  // Generics Example
  genericsExample = `
// Generic Function
function identity<T>(arg: T): T {
  return arg;
}
let output1 = identity<string>("myString"); // type of output1 will be 'string'
let output2 = identity(100); // type of output2 will be 'number' (type inference)

// Generic Interface
interface GenericIdentityFn<T> {
  (arg: T): T;
}
let myIdentity: GenericIdentityFn<number> = identity;

// Generic Class
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;

  constructor(zero: T, addFn: (x: T, y: T) => T) {
    this.zeroValue = zero;
    this.add = addFn;
  }
}

let myGenericNumber = new GenericNumber<number>(0, (x, y) => x + y);
console.log(myGenericNumber.add(5, 10)); // 15

let myGenericString = new GenericNumber<string>("", (x, y) => x + y);
console.log(myGenericString.add("hello ", "world")); // "hello world"
  `;

  // Union & Intersection Types Example
  unionIntersectionExample = `
// Union Type
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(\`Expected string or number, got '\${padding}'.\`);
}
console.log(padLeft("Hello world", 4));    // "    Hello world"
console.log(padLeft("Hello world", "---")); // "---Hello world"

type NetworkState =
  | { state: "pending" }
  | { state: "success"; response: { body: string } }
  | { state: "failed"; code: number };

function logState(state: NetworkState): void {
  switch (state.state) {
    case "pending": console.log("Loading..."); break;
    case "success": console.log(\`Success: \${state.response.body}\`); break;
    case "failed": console.log(\`Failed with code: \${state.code}\`); break;
  }
}

// Intersection Type
interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}
interface ArtworksData {
  artworks: { title: string }[];
}
interface ArtistsData {
  artists: { name: string }[];
}

type ArtworksResponse = ArtworksData & ErrorHandling;
type ArtistsResponse = ArtistsData & ErrorHandling;

const artwork: ArtworksResponse = {
  success: true,
  artworks: [{ title: "Mona Lisa" }]
};
const artist: ArtistsResponse = {
  success: false,
  error: { message: "API Error" },
  artists: []
};
  `;

  // Type Guards & Narrowing Example
  typeGuardsExample = `
function isNumber(x: any): x is number {
  return typeof x === "number";
}

function isString(x: any): x is string {
  return typeof x === "string";
}

function processInput(input: string | number) {
  if (isNumber(input)) {
    console.log(\`Processing number: \${input.toFixed(2)}\`); // input is number here
  } else if (isString(input)) {
    console.log(\`Processing string: \${input.toUpperCase()}\`); // input is string here
  }
}
processInput(123.456);
processInput("hello");

class Bird {
  fly() { console.log("Bird is flying"); }
  layEggs() { console.log("Bird is laying eggs"); }
}
class Fish {
  swim() { console.log("Fish is swimming"); }
  layEggs() { console.log("Fish is laying eggs"); }
}
function getPet(): Bird | Fish {
  return Math.random() > 0.5 ? new Bird() : new Fish();
}
let pet = getPet();

if (pet instanceof Bird) {
  pet.fly(); // pet is Bird here
} else {
  pet.swim(); // pet is Fish here
}

interface Admin {
  name: string;
  privileges: string[];
}
interface Employee {
  name: string;
  startDate: Date;
}
type UnknownEmployee = Admin | Employee;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  if ("privileges" in emp) { // 'in' operator type guard
    console.log("Privileges: " + emp.privileges); // emp is Admin here
  }
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate); // emp is Employee here
  }
}
  `;

  // keyof and Lookup Types Example
  keyofLookupExample = `
interface PersonKeyOf {
  name: string;
  age: number;
  location: string;
}

type PersonKeys = keyof PersonKeyOf; // "name" | "age" | "location"

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

let personObj: PersonKeyOf = { name: "Alice", age: 30, location: "Wonderland" };
let personName = getProperty(personObj, "name"); // string
let personAge = getProperty(personObj, "age");   // number
// let personInvalid = getProperty(personObj, "phone"); // Error: Argument of type '"phone"' is not assignable to parameter of type 'keyof PersonKeyOf'.

type PersonNameType = PersonKeyOf["name"]; // string
  `;

  // Mapped Types Example
  mappedTypesExample = `
interface OriginalInterface {
  name: string;
  age: number;
}

// Make all properties optional
type PartialInterface = Partial<OriginalInterface>;
// type PartialInterface = {
//   name?: string;
//   age?: number;
// }

// Make all properties readonly
type ReadonlyInterface = Readonly<OriginalInterface>;
// type ReadonlyInterface = {
//   readonly name: string;
//   readonly age: number;
// }

// Custom Mapped Type: Convert all property types to boolean
type PropertiesToBoolean<T> = {
  [P in keyof T]: boolean;
};
type BooleanVersion = PropertiesToBoolean<OriginalInterface>;
// type BooleanVersion = {
//   name: boolean;
//   age: boolean;
// }

const partialObj: PartialInterface = { name: "Optional" };
const readonlyObj: ReadonlyInterface = { name: "Fixed", age: 100 };
// readonlyObj.name = "Cannot change"; // Error

const booleanized: BooleanVersion = { name: true, age: false };
  `;

  // Conditional Types Example
  conditionalTypesExample = `
type IsString<T> = T extends string ? "yes" : "no";
type A = IsString<string>; // "yes"
type B = IsString<number>; // "no"

// Example with 'infer'
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

function getString(): string { return "hello"; }
function getNumber(): number { return 42; }

type StringReturn = GetReturnType<typeof getString>; // string
type NumberReturn = GetReturnType<typeof getNumber>; // number
type NotAFunctionReturn = GetReturnType<string>;    // any

// Flatten array type
type Flatten<T> = T extends Array<infer Item> ? Item : T;
type Str = Flatten<string[]>; // string
type Num = Flatten<number>;   // number
  `;

  // Decorators Example (Conceptual - requires enabling experimentalDecorators)
  decoratorsExample = `
// To use decorators, enable "experimentalDecorators" in tsconfig.json

// Class Decorator
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
  console.log(\`Class \${constructor.name} has been sealed.\`);
}

@sealed
class GreeterDecorated {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}
// const g = new GreeterDecorated("world");
// GreeterDecorated.prototype.newMethod = () => {}; // Error if sealed

// Method Decorator
function enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value;
    console.log(\`Method \${propertyKey} enumerable set to \${value}\`);
  };
}

class PersonDecorated {
  name: string;
  constructor(name: string) { this.name = name; }

  @enumerable(false)
  getName() { return this.name; }
}
// const p = new PersonDecorated("John");
// for (let key in p) { console.log(key); } // getName won't show if enumerable is false
  `;

  // Utility Types Example
  utilityTypesExample = `
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

// Partial<Todo>: Makes all properties optional
type PartialTodo = Partial<Todo>;
const todo1: PartialTodo = { title: "Learn TypeScript" };

// Required<Todo>: Makes all properties required (if some were optional)
type RequiredTodo = Required<PartialTodo>; // All properties of PartialTodo become required
const todo2: RequiredTodo = { title: "Master Generics", description: "Deep dive", completed: false, createdAt: Date.now() };

// Readonly<Todo>: Makes all properties readonly
type ReadonlyTodo = Readonly<Todo>;
const todo3: ReadonlyTodo = { title: "Read Docs", description: "Official TS docs", completed: true, createdAt: Date.now() };
// todo3.title = "New Title"; // Error

// Pick<Todo, 'title' | 'completed'>: Constructs a type by picking a set of properties
type TodoPreview = Pick<Todo, 'title' | 'completed'>;
const todo4: TodoPreview = { title: "Quick Task", completed: false };

// Omit<Todo, 'description' | 'createdAt'>: Constructs a type by picking all properties and then removing a set
type TodoInfo = Omit<Todo, 'description' | 'createdAt'>;
const todo5: TodoInfo = { title: "Important", completed: true };

// Record<Keys, Type>: Constructs an object type whose property keys are Keys and property values are Type.
type PageInfo = { title: string; visited: boolean; };
type Pages = 'home' | 'about' | 'contact';
const navLinks: Record<Pages, PageInfo> = {
  home: { title: 'Home', visited: true },
  about: { title: 'About', visited: false },
  contact: { title: 'Contact', visited: false },
};

// Exclude<UnionType, ExcludedMembers>
type T0 = Exclude<"a" | "b" | "c", "a">;  // "b" | "c"

// Extract<Type, Union>: Extracts from Type those types that are assignable to Union.
type T1 = Extract<"a" | "b" | "c", "a" | "f">;  // "a"

// NonNullable<Type>: Excludes null and undefined from Type.
type T2 = NonNullable<string | number | undefined | null>;  // string | number

// ReturnType<Type>: Obtains the return type of a function type.
type T3 = ReturnType<() => string>;  // string

// Parameters<Type>: Obtains the parameters of a function type in a tuple.
type T4 = Parameters<(s: string, n: number) => void>;  // [s: string, n: number]
  `;

  constructor() { }
}
