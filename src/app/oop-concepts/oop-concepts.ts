import { Component } from '@angular/core';

@Component({
  selector: 'app-oop-concepts',
  templateUrl: './oop-concepts.html',
  styleUrls: ['./oop-concepts.css']
})
export class OopConceptsComponent {
  // 1. Encapsulation Example
  encapsulationExample = `
class PersonEncapsulation {
  private name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public getName(): string {
    return this.name;
  }

  public getAge(): number {
    return this.age;
  }

  public celebrateBirthday(): void {
    this.age++;
    console.log(\`Happy Birthday \${this.name}! You are now \${this.age}.\`);
  }
}

const personEnc = new PersonEncapsulation("Alice", 30);
console.log(personEnc.getName()); // Alice
// console.log(personEnc.name); // Error: Property 'name' is private
personEnc.celebrateBirthday(); // Happy Birthday Alice! You are now 31.
  `;

  // 2. Abstraction Example
  abstractionExample = `
abstract class Shape {
  abstract getArea(): number; // Abstract method
  display(): void {
    console.log("This is a shape.");
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

const circleAbs = new Circle(5);
circleAbs.display(); // This is a shape.
console.log(\`Area: \${circleAbs.getArea()}\`); // Area: 78.539...
  `;

  // 3. Inheritance Example
  inheritanceExample = `
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  makeSound(): void {
    console.log("Generic animal sound");
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name); // Call base class constructor
  }
  makeSound(): void { // Override base class method
    console.log("Woof! Woof!");
  }
  fetch(): void {
    console.log(\`\${this.name} is fetching.\`);
  }
}

const myDog = new Dog("Buddy");
myDog.makeSound(); // Woof! Woof!
myDog.fetch(); // Buddy is fetching.
  `;

  // 4. Polymorphism (Method Overriding) Example
  polymorphismExample = `
class ShapePoly {
  draw(): void {
    console.log("Drawing a generic shape");
  }
}

class CirclePoly extends ShapePoly {
  draw(): void { // Overriding
    console.log("Drawing a circle");
  }
}

class SquarePoly extends ShapePoly {
  draw(): void { // Overriding
    console.log("Drawing a square");
  }
}

function drawShape(shape: ShapePoly) {
  shape.draw(); // Calls the appropriate 'draw' method based on the object's actual type
}

const genericShape: ShapePoly = new ShapePoly();
const circlePoly: ShapePoly = new CirclePoly();
const squarePoly: ShapePoly = new SquarePoly();

drawShape(genericShape); // Drawing a generic shape
drawShape(circlePoly);   // Drawing a circle
drawShape(squarePoly);   // Drawing a square
  `;

  // 5. Class vs. Object Example
  classObjectExample = `
class Car {
  brand: string;
  model: string;
  year: number;

  constructor(brand: string, model: string, year: number) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  displayInfo(): void {
    console.log(\`\${this.year} \${this.brand} \${this.model}\`);
  }
}

// Car is a class (blueprint)
const myCar = new Car("Toyota", "Camry", 2021); // myCar is an object (instance)
const anotherCar = new Car("Honda", "Civic", 2022); // anotherCar is an object

myCar.displayInfo(); // 2021 Toyota Camry
anotherCar.displayInfo(); // 2022 Honda Civic
  `;

  // 6. Constructor Example
  constructorExample = `
class PersonWithConstructor {
  name: string;
  age: number;

  // Constructor
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    console.log(\`Person object created for \${this.name}, age \${this.age}\`);
  }

  greet(): void {
    console.log(\`Hello, my name is \${this.name}.\`);
  }
}

const person1 = new PersonWithConstructor("Bob", 25); // Constructor is called here
person1.greet();
  `;

  // 7. 'this' Keyword Example
  thisKeywordExample = `
class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    // 'this' refers to the instance of Greeter
    return \`Hello, \${this.greeting}\`;
  }
}

const greeterInstance = new Greeter("world");
console.log(greeterInstance.greet()); // Hello, world

// 'this' can be tricky with callbacks if not careful
class TestThis {
  value = 42;
  getValueRegular() {
    setTimeout(function() {
      // console.log(this.value); // 'this' is undefined or window in non-strict/strict mode
    }, 100);
  }
  getValueArrow() {
    setTimeout(() => {
      console.log(this.value); // 'this' is lexically bound, refers to TestThis instance (42)
    }, 100);
  }
}
new TestThis().getValueRegular();
new TestThis().getValueArrow(); // Logs 42
  `;

  // 8. Method Overriding Example (Polymorphism section already covers this)
  // Re-iterating for clarity if needed, but polymorphismExample is more comprehensive.
  methodOverridingExample = `
class AnimalOverride {
  makeSound(): void {
    console.log("Generic animal sound");
  }
}

class CatOverride extends AnimalOverride {
  makeSound(): void { // Overriding the method
    console.log("Meow");
  }
}

const cat = new CatOverride();
cat.makeSound(); // Meow
  `;

  // 9. Abstract Class vs. Interface Example
  abstractInterfaceExample = `
// Interface: Defines a contract for a shape's properties and methods
interface Drawable {
  draw(): void;
  getColor(): string;
}

// Abstract Class: Can provide some implementation details and abstract members
abstract class BaseShape implements Drawable {
  constructor(protected color: string) {}

  getColor(): string {
    return this.color;
  }

  abstract draw(): void; // Must be implemented by subclasses
  abstract getPerimeter(): number;
}

class Rectangle extends BaseShape {
  constructor(color: string, private width: number, private height: number) {
    super(color);
  }

  draw(): void {
    console.log(\`Drawing a \${this.color} rectangle of width \${this.width} and height \${this.height}\`);
  }

  getPerimeter(): number {
    return 2 * (this.width + this.height);
  }
}

const rect = new Rectangle("blue", 10, 5);
rect.draw();
console.log(\`Perimeter: \${rect.getPerimeter()}, Color: \${rect.getColor()}\`);
  `;

  // 10. Composition vs. Inheritance Example
  compositionExample = `
// Inheritance approach (can lead to rigid hierarchies)
class CanFly { fly() { console.log("Flying"); } }
class CanSwim { swim() { console.log("Swimming"); } }
// class Duck extends CanFly { /* ... */ } // What if a duck can also swim? Multiple inheritance issues.

// Composition approach
class Flyer { fly() { console.log("Is now flying!"); } }
class Swimmer { swim() { console.log("Is now swimming!"); } }

class Duck {
  private flyer: Flyer;
  private swimmer: Swimmer;

  constructor() {
    this.flyer = new Flyer(); // Duck has-a Flyer capability
    this.swimmer = new Swimmer(); // Duck has-a Swimmer capability
  }

  performFly() { this.flyer.fly(); }
  performSwim() { this.swimmer.swim(); }
}

class Airplane {
  private flyer: Flyer;
  constructor() { this.flyer = new Flyer(); }
  takeOff() { this.flyer.fly(); }
}

const donald = new Duck();
donald.performFly(); // Is now flying!
donald.performSwim(); // Is now swimming!

const boeing747 = new Airplane();
boeing747.takeOff(); // Is now flying!
  `;

  // 11. Static Members Example
  staticMembersExample = `
class MathHelper {
  static readonly PI = 3.14159; // Static property

  static calculateCircumference(radius: number): number { // Static method
    return 2 * MathHelper.PI * radius;
  }
}

console.log(MathHelper.PI); // Access static property directly on the class
const circumference = MathHelper.calculateCircumference(10);
console.log(\`Circumference: \${circumference}\`); // Circumference: 62.8318
  `;

  // 12. Method Chaining Example
  methodChainingExample = `
class StringManipulator {
  private str: string;

  constructor(initialString: string = "") {
    this.str = initialString;
  }

  append(text: string): this {
    this.str += text;
    return this; // Return the instance for chaining
  }

  prepend(text: string): this {
    this.str = text + this.str;
    return this;
  }

  toUpperCase(): this {
    this.str = this.str.toUpperCase();
    return this;
  }

  getValue(): string {
    return this.str;
  }
}

const manipulator = new StringManipulator();
const result = manipulator
  .append("Hello")
  .append(" ")
  .prepend("Says: ")
  .append("World!")
  .toUpperCase()
  .getValue();

console.log(result); // SAYS: HELLO WORLD!
  `;

  // 13. Design Pattern (Singleton) Example
  singletonExample = `
class SettingsManager {
  private static instance: SettingsManager;
  private settings: Map<string, any>;

  private constructor() {
    // Private constructor to prevent direct instantiation
    this.settings = new Map();
    this.settings.set("theme", "dark");
    this.settings.set("fontSize", 14);
    console.log("SettingsManager instance created.");
  }

  public static getInstance(): SettingsManager {
    if (!SettingsManager.instance) {
      SettingsManager.instance = new SettingsManager();
    }
    return SettingsManager.instance;
  }

  public getSetting(key: string): any {
    return this.settings.get(key);
  }

  public setSetting(key: string, value: any): void {
    this.settings.set(key, value);
  }
}

// Usage:
const settings1 = SettingsManager.getInstance();
const settings2 = SettingsManager.getInstance();

console.log(settings1 === settings2); // true (both point to the same instance)

console.log(settings1.getSetting("theme")); // dark
settings2.setSetting("theme", "light");
console.log(settings1.getSetting("theme")); // light (changes reflect in all references)
  `;

  constructor() { }
}
