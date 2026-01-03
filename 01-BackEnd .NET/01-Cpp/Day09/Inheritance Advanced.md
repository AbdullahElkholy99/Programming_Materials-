## Table of Contents

- [01- Inheritance Basics]
- [02- Early vs Late Binding]
- [03- Virtual Functions]
- [04- Abstract Classes & Pure Virtual Functions]
- [05- Templates (Generics)]
- [06- Operator Overloading]
- [07- Important Notes]
- [08- Summery]
- [09- Practice]
- [10- Additional Resources]

---

## 01- Inheritance Basics

### Concept

Inheritance allows a child class (derived class) to inherit properties and methods from a parent class (base class).

### Syntax

```cpp
class Derived : public Base {
    // Derived class members
};
```

### Memory Diagram - Basic Inheritance

```
Base Object in Memory:
┌─────────────┐
│   x (int)   │  ← Base member
└─────────────┘

Derived Object in Memory:
┌─────────────┐
│   x (int)   │  ← Inherited from Base
├─────────────┤
│   y (int)   │  ← Derived member
└─────────────┘
```

### Key Principle: "IS-A" Relationship

- Car **is a** Vehicle
- Bus **is a** Vehicle
- Derived **is a** Base

**Important Rule:** A parent pointer can reference a child object

```cpp
Base* bPtr = new Derived(3, 4);  // Valid!
```

---

## 02- Early vs Late Binding

### Early Binding (Static Binding) - Compile Time

**Definition:** When a parent pointer references a child object and calls an overridden method, the compiler retrieves the function based on the **pointer type** (not object type) at **compile time**.

#### Example

```cpp
class Base {
public:
    void Show() { cout << "I'm BASE"; }
};

class Derived : public Base {
public:
   /*override*/ void Show() { cout << "I'm Derived"; }
};

int main() {
    Base* bPtr = new Derived(3, 4);
    bPtr->Show();  // Output: "I'm BASE" ❌
    // Compiler uses pointer data type (Base)
}
```

#### Memory Diagram - Early Binding

```
Memory Layout:
┌──────────────────┐
│   bPtr (Base*)   │ ────→ ┌─────────────────┐
└──────────────────┘       │ Derived Object  │
                           │  x = 3          │
Pointer Type: Base         │  y = 4          │
                           └─────────────────┘

Function Call Resolution:
bPtr->Show() → Compiler looks at pointer type (Base*) 
            → Calls Base::Show() ❌ Wrong!
```

#### Disadvantages of Early Binding

- **Loss of Polymorphism:** Cannot utilize(*يستفيد من*) the actual object's behavior
- **Inflexibility:** Defeats(يكسر) the purpose of inheritance
- **Code Duplication:** Need separate functions for each type
- **Violates(*انتهاك*) Open-Close Principle:** Must modify code for new types

---
### Late Binding (Dynamic Binding) - Runtime

**Definition:** When a parent pointer references a child object and calls an overridden method, the compiler retrieves the function based on the **object type** (not pointer type) at **runtime**.

#### Requirements for Late Binding

1. Function in parent class must be declared as `virtual`
2. Child class must use `public` inheritance
3. Overridden function in child must be `public`
4. Use parent pointer to reference child objects

#### Example

```cpp
class Base {
public:
    virtual void Show() { cout << "I'm BASE"; }  // ← virtual keyword
};

class Derived : public Base {
public:
    /*virtual*/ void Show() override  // ← override keyword
    { cout << "I'm Derived"; } 
};

int main() {
    Base* bPtr = new Derived(3, 4);
    bPtr->Show();  // Output: "I'm Derived" ✅
    // Compiler uses object data type (Derived)
}
```

#### Memory Diagram - Late Binding (Virtual Functions)

```
Memory Layout with Virtual Table:
┌──────────────────┐
│   bPtr (Base*)   │ ────→ ┌─────────────────────┐
└──────────────────┘       │  Derived Object     │
                           ├─────────────────────┤
Pointer Type: Base         │  vptr (vtable ptr)  │──┐
Object Type: Derived       │  x = 3              │  │
                           │  y = 4              │  │
                           └─────────────────────┘  │
                                                     │
                                                     ▼
                           ┌──────────────────────────┐
                           │   Virtual Table (vtable) │
                           ├──────────────────────────┤
                           │ Show() → Derived::Show() │
                           │ Area() → Derived::Area() │
                           └──────────────────────────┘

Function Call Resolution:
bPtr->Show() → Follow vptr to vtable
            → Call Derived::Show() ✅ Correct!
```

#### Advantages of Late Binding

- **True Polymorphism:** Objects behave according to their actual type
- **Flexibility:** Can add new derived classes without changing existing code
- **Code Reusability:** Single function works with all derived types
- **Follows Open-Close Principle:** Open for extension, closed for modification

#### Disadvantages of Late Binding

- **Performance Overhead:** Extra memory for vtable, extra indirection at runtime
- **Memory Cost:** Each object needs a vptr (usually 4-8 bytes)
- **Slightly(بشكل طفيف) Slower:** vtable lookup takes extra time

---
## 03- Virtual Functions

### What is a Virtual Function?

A function declared with the `virtual` keyword that enables **runtime polymorphism**.

### Syntax

```cpp
class Base {
public:
    virtual void FunctionName() {
        // Implementation
    }
};

class Derived : public Base {
public:
    void FunctionName() override {  // override is optional but recommended
        // New implementation
    }
};
```

### When to Use Virtual Functions:

- When you need **polymorphic behavior**
- When different derived classes need **different implementations**
- When working with **collections of base pointers** pointing to derived objects
- When designing **frameworks or APIs** that will be extended

### When NOT to Use Virtual Functions:

- When performance is **critical** and polymorphism isn't needed
- For **constructors** (constructors cannot be virtual)
- For **static functions** (static functions cannot be virtual)
- When the class will **never be inherited**

---

## 04- Abstract Classes & Pure Virtual Functions

### Pure Virtual Function

A virtual function with **no implementation** in the base class, marked with `= 0`.

```cpp
class Geoshape {
public:
    virtual double Area() = 0;  // Pure virtual function
};
```

### Abstract Class

A class containing **at least one pure virtual function**. You **cannot create objects** from an abstract class.

#### Example - Geoshape Hierarchy

```cpp
class Geoshape {  // Abstract class
protected:
    double dim1, dim2;
public:
    virtual double Area() = 0;  // Pure virtual - MUST be overridden
    virtual ~Geoshape() {}       // Virtual destructor
};

class Rect : public Geoshape {
public:
    double Area() override {
        return dim1 * dim2;
    }
};

class Circle : public Geoshape {
public:
    double Area() override {
        return 3.14 * dim1 * dim2;  // dim1 = radius
    }
};
```

#### Memory Diagram - Abstract Class Hierarchy

```
Cannot Create:
Geoshape g;  // ❌ Compile Error! Abstract class

Can Create:
Rect r(3, 4);
Circle c(7);

Memory:
┌──────────────────┐
│ Geoshape* gPtr   │ ────→ ┌─────────────────┐
└──────────────────┘       │  Rect Object    │
                           ├─────────────────┤
                           │  vptr           │──→ vtable: Area() →            
                           │  dim1 = 3       │                Rect::Area()
                           │  dim2 = 4       │
                           └─────────────────┘

gPtr->Area()  // Calls Rect::Area() ✅
```

### Rules for Abstract Classes

1. **Cannot instantiate(يُجسّد)** abstract classes directly
2. **Can have pointers/references** to abstract classes
3. Pure virtual functions **must be overridden** in derived classes , If not overridden, the derived class **also becomes abstract**

### Practical Example - Sum of Areas (Open-Close Principle)

#### Bad Approach - Violates Open-Close Principle

```cpp
///Break O/C Principle 
double SumOfAreasV1(Rect* rPtr, int rSize, 
                    Square* sPtr, int sSize, 
                    Circle* cPtr, int cSize) {
    double sum = 0;
    for (int i = 0; i < rSize; i++) sum += rPtr[i].Area();
    for (int i = 0; i < sSize; i++) sum += sPtr[i].Area();
    for (int i = 0; i < cSize; i++) sum += cPtr[i].Area();
    return sum;
}
// Problem: Need to modify function for every new shape! ❌
```

#### Good Approach - Follows Open-Close Principle

```cpp
/// Follow O/C Principle
double SumOfAreasV2(Geoshape** gPtrArr, int gSize) {
    double sum = 0;
    for (int i = 0; i < gSize; i++) {
        sum += gPtrArr[i]->Area();  // Polymorphism!
    }
    return sum;
}

// Usage:
Rect r1(3, 4), r2(2, 5);
Circle c1(7), c2(8);
Triangle t1(3, 4);

Geoshape* gPtrArr[] = {&r1, &r2, &c1, &c2, &t1};
cout << SumOfAreasV2(gPtrArr, 5);  // Works for ANY shape! ✅
```

#### Memory Diagram - Polymorphic Array

```
gPtrArr (Array of Geoshape pointers):
┌─────┬─────┬─────┬─────┬─────┐
│ [0] │ [1] │ [2] │ [3] │ [4] │
└──│──┴──│──┴──│──┴──│──┴──│──┘
   │     │     │     │     │
   ▼     ▼     ▼     ▼     ▼
 Rect  Rect Circle Circle Triangle
(3,4) (2,5)  (7)    (8)   (3,4)

Each pointer's vtable points to correct Area() implementation!
```

### Advantages of Abstract Classes

- **Enforces Contract:** Derived classes MUST implement required methods
- **Prevents Invalid Objects:** Can't create incomplete objects
- **Clear Interface:** Defines what derived classes should do
- **Polymorphism:** Work with base pointers effectively

### Disadvantages of Abstract Classes

- **Cannot Instantiate:** Cannot create objects directly
- **Forced Implementation:** Must override all pure virtual functions
- **Inheritance Chain Complexity:** If forgotten, child becomes abstract too

---

## 05- Templates (Generics)

### What are Templates?

Templates allow you to write **type-independent** code that works with any data type.
in #C-Sharp is Generic<>

### Syntax

```cpp
template<class T>  // or template<typename T>
class Stack {
private:
    T* arr;
    int size, tos;
public:
    void Push(T value) { /* ... */ }
    T Pop() { /* ... */ }
};

// Usage:
Stack<int> intStack;
Stack<char> charStack;
Stack<double> doubleStack;
```

### Memory Diagram - Template Stack

```
Stack<int> s1(5):
┌─────────────┐
│ arr (int*)  │──→ [ 10 | 20 | 30 |  |  ]
│ size = 5    │
│ tos = 3     │
└─────────────┘

Stack<char> s2(3):
┌─────────────┐
│ arr (char*) │──→ [ 'A' | 'B' | 'C' ]
│ size = 3    │
│ tos = 3     │
└─────────────┘

Same class code, different data types!
```

### Advantages of Templates

- **Type Safety:** Compile-time type checking
- **Code Reusability:** Write once, use with any type
- **Performance:** No runtime overhead (resolved at compile time)
- **No Casting:** No need for type casting

### Disadvantages of Templates

- **Code Bloat:** Compiler generates separate code for each type
- **Compilation Time:** Longer compilation time
- **Error Messages:** Complex and hard-to-read error messages
- **Header Files:** Must be defined in headers (cannot separate declaration/definition)

### When to Use Templates

- Data structures (Stack, Queue, List, Tree)
- Algorithms that work with multiple types
- Generic utility functions
- When you need type safety without runtime cost

---

## 06- Operator Overloading

### Conversion Operator Example

```cpp
class Complex {
private:
    int real, img;
public:
    // Conversion operator: Complex → int
    operator int() {
        return this->real;
    }
};

int main() {
    Complex c1(3, 4);
    int real = c1;           // Implicit conversion
    int real2 = (int)c1;     // Explicit conversion
    cout << real;            // Output: 3
}
```

### Memory Diagram - Conversion

```
Before Conversion:
c1 (Complex Object):
┌──────────┐
│ real = 3 │
│ img = 4  │
└──────────┘

After Conversion:
real (int):
┌──────────┐
│    3     │  ← Only real part extracted
└──────────┘
```

---

## 07- Important Notes

### Virtual Destructor

**Always make the destructor virtual in base classes!**

```cpp
class Base {
public:
    virtual ~Base() {}  // Virtual destructor
};

class Derived : public Base {
private:
    int* data;
public:
    ~Derived() { delete data; }  // Will be called correctly
};

int main() {
    Base* ptr = new Derived();
    delete ptr; // Without virtual ~Base(), only Base destructor is called! ❌
}
```

### Static Members & Inheritance

- Static members **are inherited** but **cannot be overridden**
- They belong to the class, not objects

### Java vs C++ Polymorphism

- **Java:** All methods are implicitly virtual (except `final`)
- **C++:** Must explicitly use `virtual` keyword

---

## 08- Summary Comparison Table

|Feature|Early Binding|Late Binding|
|---|---|---|
|**Resolution Time**|Compile Time|Runtime|
|**Based On**|Pointer Type|Object Type|
|**Keyword**|None|`virtual`|
|**Performance**|Faster|Slightly Slower|
|**Memory**|Less|More (vtable)|
|**Flexibility**|Low|High|
|**Polymorphism**|No|Yes|

---

## 09- Practice Problems

1. Explain the difference between early and late binding with Derived2 example
2. Implement Geoshape hierarchy with abstract class
3. Create SumOfAreasV1() and SumOfAreasV2() and explain Open-Close Principle
4. Draw memory diagrams for virtual function calls
5. Research: Virtual destructors - why are they important?

---

## 10- Additional Resources

- HackerRank (practice OOP problems)
- LeetCode (algorithm practice with OOP)
- C++ Documentation on Virtual Functions
- Design Patterns (Factory Pattern mentioned in code)
