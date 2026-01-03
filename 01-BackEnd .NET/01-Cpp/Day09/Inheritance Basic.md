## Table of Contents

- [What is Inheritance?]
- [Basic Concepts]
- [Access Specifiers]
- [Types of Inheritance]
- [Constructor and Destructor Chain]
- [Method Overriding]
- [Pros and Cons]
- [When to Use]
- [Memory Diagrams]
- [Constructors are NOT inherited]
- [Best Practices]
- [Common Pitfalls]
- [Summary] 

---
## 01- What is Inheritance?

**Inheritance** is a mechanism where a new class (derived/child class) receives methods and fields from an existing class (base/parent class).

### Key Idea

Instead of duplicating code, we create a base class with common features and extend it.

**Example Problem:**

```
TypeA: x, y, funOne(), funTwo()
TypeB: y, z, funTwo(), funThree()
```

**Solution using Inheritance:**

```
Base: y, funTwo()
TypeA : public Base: x, funOne()
TypeB : public Base: z, funThree()
```

---

## 02- Basic Concepts

### 1. Simple Inheritance Example

```cpp
class Parent {
private:
    int x;
    int y;
public:
    void SetX(int _x) { x = _x; }
    void SetY(int _y) { y = _y; }
    int GetX() const { return x; }
    int GetY() const { return y; }
    
    Parent() {
        x = y = 0;
        cout << "Parent default constructor\n";
    }
    
    Parent(int _x, int _y) {
        x = _x;
        y = _y;
        cout << "Parent 2-param constructor\n";
    }
    
    ~Parent() { cout << "Parent destructor\n"; }
    
    int SumXY() { return x + y; }
};

class Child : public Parent {
private:
    int z;
public:
    void SetZ(int _z) { z = _z; }
    int GetZ() { return z; }
    
    Child() {
        z = 0;
        cout << "Child default constructor\n";
    }
    
    Child(int _x, int _y, int _z) : Parent(_x, _y) {
        z = _z;
        cout << "Child 3-param constructor\n";
    }
    
    ~Child() { cout << "Child destructor\n"; }
    
    int SumXYZ() {
        return z + SumXY();
        // OR: return z + GetX() + GetY();
        // NOT: return x + y + z; // Error: x, y are private
    }
};
```

### Important Rules

1. **Child inherits EVERYTHING** from parent (including private members)
2. **Private members** cannot be accessed directly in child class
3. **Public members** can be accessed inside and outside(in main) the class
4. **Constructors and static members** are NOT inherited

---
## 03- Access Specifiers: 

### Protected: The "Smart Private"

**Protected** members can be accessed:

- Inside the class itself
- Inside derived classes (inheritance chain)
- **NOT** outside the class

```cpp
class Parent {
protected:
    int x;  // Accessible in Child class
    int y;
public:
    int Sum() { return x + y; }
};

class Child : public Parent {
protected:
    int z;
public:
    int Sum() {
        return x + y + z;  // ✓ Can access x, y directly
        // OR using parent method:
        return z + Parent::Sum();
    }
};
```

### Access Specifier Summary

|Specifier|Same Class|Derived Class|Outside Class|
|---|---|---|---|
|**private**|✓|✗|✗|
|**protected**|✓|✓|✗|
|**public**|✓|✓|✓|

---

## 04- Types of Inheritance

### A. Public Inheritance (MOST COMMON)

**Syntax:** `class Child : public Parent`

**Rules:**

- Private → stays Private (not accessible)
- Protected → stays Protected
- Public → stays Public

![[Public Inheritance.png]]
```cpp
class Parent {
    int x;           // private
protected:
    int y;           // protected
public:
    int z;           // public
    void SetZ(int _z) { z = _z; }
};

class Child : public Parent {
    // x: private (not accessible)
    // y: protected (accessible here)
    // z: public (accessible here and outside)
public:
    int a;
    void UseParent() {
        // x = 10;    // ✗ Error
        y = 20;       // ✓ OK
        z = 30;       // ✓ OK
    }
};

int main() {
    Child c;
    // c.x = 10;   // ✗ Error
    // c.y = 20;   // ✗ Error
    c.z = 30;      // ✓ OK
    c.SetZ(40);    // ✓ OK
}
```

### B. Protected Inheritance (RARE)

**Syntax:** `class Child : protected Parent`

**Rules:**

- Private → stays Private (not accessible)
- Protected → stays Protected
- Public → **becomes Protected**
![[Protected Inheritance.png]]

```cpp
class Parent {
protected:
    int y;
public:
    int z;
    void SetZ(int _z) { z = _z; }
};

class Child : protected Parent {
    // y: protected (accessible)
    // z: protected (accessible but not public anymore!)
    // SetZ(): protected
public:
    void UseParent() {
        y = 10;      // ✓ OK
        z = 20;      // ✓ OK
        SetZ(30);    // ✓ OK
    }
};

int main() {
    Child c;
    // c.z = 10;      // ✗ Error (z is now protected)
    // c.SetZ(20);    // ✗ Error (SetZ is now protected)
}
```

**Use Case:** Hide parent's public interface (utility classes)

### C. Private Inheritance (RARELY USED)

**Syntax:** `class Child : private Parent`

**Rules:**

- Private → stays Private (not accessible)
- Protected → **becomes Private**
- Public → **becomes Private**
![[Private Inheritance.png]]

```cpp
class Parent {
protected:
    int y;
public:
    int z;
    void SetZ(int _z) { z = _z; }
};

class Child : private Parent {
    // y: private (accessible here only)
    // z: private (accessible here only)
    // SetZ(): private
public:
    void UseParent() {
        y = 10;      // ✓ OK
        z = 20;      // ✓ OK
        SetZ(30);    // ✓ OK
    }
};

class SubChild : public Child {
    // Cannot access y, z, or SetZ()!
};

int main() {
    Child c;
    // c.z = 10;      // ✗ Error
    // c.SetZ(20);    // ✗ Error
}
```

**Use Case:** Composition-like relationship (e.g., Timer in Exam class)

---
## 05- Constructor and Destructor Chain

### Constructor Chain

**Order of execution:**

1. Parent constructor
2. Child constructor

**Order of destruction:**

1. Child destructor
2. Parent destructor

```cpp
Child c1;           // Parent def ctor → Child def ctor
                    // ... usage ...
                    // Child dest → Parent dest

Child c2(1, 2, 3);  // Parent 2p ctor → Child 3p ctor
                    // ... usage ...
                    // Child dest → Parent dest
```

### Constructor Chaining Syntax

```cpp
Child(int _x, int _y, int _z) : Parent(_x, _y) {
    // Parent members already initialized
    z = _z;
}
```

**Without chaining:**

```cpp
Child(int _x, int _y, int _z) {
    // Parent default constructor called automatically
    SetX(_x);  // Must use setters (less efficient)
    SetY(_y);
    z = _z;
}
```

---

## 06- Method Overriding

**Overriding** = Same method name and parameters, different implementation in child class

```cpp
class Geoshape {
protected:
    double dim1, dim2;
public:
    Geoshape(double _dim1, double _dim2) : dim1(_dim1), dim2(_dim2) {}
};

class Rectangle : public Geoshape {
public:
    Rectangle(double w, double h) : Geoshape(w, h) {}
    double Area() { return dim1 * dim2; }
};

class Circle : public Geoshape {
public:
    Circle(double radius) : Geoshape(radius, radius) {}
    double Area() { return 3.14 * dim1 * dim2; }
};

class Triangle : public Geoshape {
public:
    Triangle(double base, double height) : Geoshape(base, height) {}
    double Area() { return 0.5 * dim1 * dim2; }
};
```

### Calling Parent Method

```cpp
class Child : public Parent {
public:
    int Sum() {
        return z + Parent::Sum();  // Call parent's Sum()
        // return z + Sum();       // ✗ Infinite recursion!
    }
};
```

---

## 07- Pros and Cons

### Advantages

1. **Code Reusability**
    
    - Write common code once in base class
    - Avoid duplication
    
2. **Maintainability**
    
    - Changes in base class propagate to all derived classes
    - Easier to fix bugs and add features
    
3. **Extensibility**
    
    - Easy to add new classes with specialized behavior
    - Follow Open/Closed Principle
    
4. **Polymorphism** (with virtual functions)
    
    - Treat different objects uniformly
    - Dynamic behavior selection
    
5. **Logical Hierarchy**
    
    - Models real-world IS-A relationships
    - Example: Circle IS-A Geoshape

### Disadvantages

1. **Tight Coupling**
    
    - Child depends heavily on parent
    - Changes in parent may break child classes
    
2. **Complexity**
    
    - Deep inheritance hierarchies are hard to understand
    - Multiple inheritance can cause diamond problem(child can have more parent)
    
3. **Reduced Flexibility**
    
    - Cannot change parent at runtime
    - Composition is sometimes better
    
4. **Performance Overhead**
    
    - Virtual function calls have small overhead
    - Larger object sizes
    
5. **Fragile Base Class Problem**
    
    - Changes to base class can break derived classes
    - Must consider all children when modifying parent

---

## 08- When to Use

### USE Inheritance When:

1. **True IS-A Relationship**
    
    ```cpp
    Circle IS-A Geoshape  ✓
    Car IS-A Vehicle      ✓
    Dog IS-A Animal       ✓
    ```
    
2. **Shared Behavior**
    
    - Multiple classes need same functionality
    - Common interface with different implementations
    
3. **Polymorphic Behavior**
    
    - Need to treat different types uniformly
    - Runtime type selection
    
4. **Framework/Library Design**
    
    - Providing extension points
    - Template Method pattern

### AVOID Inheritance When:

1. **HAS-A Relationship** (use Composition instead)
    
    ```cpp
    Car HAS-A Engine  → Use composition
    House HAS-A Door  → Use composition
    ```
    
2. **Only Code Reuse**
    
    - If no logical relationship exists
    - Consider utility classes or composition
    
3. **Implementation Details**
    
    - Don't inherit just to access protected members
    - Use delegation instead
    
4. **Shallow/Flat Hierarchies Work Better**
    
    - Favor composition over inheritance
    - Keep hierarchies shallow (2-3 levels max)

---

## 09- Memory Diagrams

### 1. Simple Parent Object

```
Parent p1(3, 4);

Memory Layout:
┌─────────────┐
│   Parent    │
├─────────────┤
│ x: 3        │ (4 bytes)
│ y: 4        │ (4 bytes)
└─────────────┘
Total: 8 bytes
```

### 2. Child Object (Public Inheritance)

```
Child c1(1, 2, 3);

Memory Layout:
┌─────────────┐
│   Child     │
├─────────────┤
│ x: 1        │ (4 bytes) ← Parent part
│ y: 2        │ (4 bytes) ← Parent part
├─────────────┤
│ z: 3        │ (4 bytes) ← Child part
└─────────────┘
Total: 12 bytes

Note: Child contains the entire Parent object
```

### 3. Multi-Level Inheritance

```cpp
class SubChild : public Child {
    int a;
};

SubChild sc(1, 2, 3, 4);

Memory Layout:
┌─────────────┐
│  SubChild   │
├─────────────┤
│ x: 1        │ (4 bytes) ← Parent part
│ y: 2        │ (4 bytes) ← Parent part
├─────────────┤
│ z: 3        │ (4 bytes) ← Child part
├─────────────┤
│ a: 4        │ (4 bytes) ← SubChild part
└─────────────┘
Total: 16 bytes
```

### 4. Constructor/Destructor Execution

```cpp
Child c2(1, 2, 3);

Construction Order:
┌──────────────────┐
│ 1. Parent ctor   │ → Initializes x, y
│    x = 1, y = 2  │
├──────────────────┤
│ 2. Child ctor    │ → Initializes z
│    z = 3         │
└──────────────────┘

Final State:
┌─────────────┐
│ x: 1        │
│ y: 2        │
│ z: 3        │
└─────────────┘

Destruction Order (reverse):
┌──────────────────┐
│ 1. Child dest    │ → Cleans up z
├──────────────────┤
│ 2. Parent dest   │ → Cleans up x, y
└──────────────────┘
```

### 5. Array of Objects

```cpp
Child arr[3];

Memory Layout:
┌─────────────┐ ← arr[0]
│ x: 0        │
│ y: 0        │
│ z: 0        │
├─────────────┤ ← arr[1]
│ x: 0        │
│ y: 0        │
│ z: 0        │
├─────────────┤ ← arr[2]
│ x: 0        │
│ y: 0        │
│ z: 0        │
└─────────────┘
Total: 36 bytes (3 × 12 bytes)

Construction:
Parent ctor (arr[0])
Child ctor (arr[0])
Parent ctor (arr[1])
Child ctor (arr[1])
Parent ctor (arr[2])
Child ctor (arr[2])
```

### 6. Dynamic Allocation

```cpp
Child* ptr = new Child(1, 2, 3);

Stack:                  Heap:
┌─────────────┐        ┌─────────────┐
│ ptr: 0x1000 │───────→│ x: 1        │ @ 0x1000
└─────────────┘        │ y: 2        │
                       │ z: 3        │
                       └─────────────┘

delete ptr;  // Must call destructor manually
```

### 7. Protected vs Private Access

```cpp
class Parent {
    int x;           // Private
protected:
    int y;           // Protected
public:
    int z;           // Public
};

class Child : public Parent {
    void Access() {
        // x = 10;   ✗ Cannot access
        y = 20;      ✓ Can access
        z = 30;      ✓ Can access
    }
};

Memory (Same Layout):
┌─────────────┐
│ x: ?        │ ← Private (not accessible in Child)
│ y: 20       │ ← Protected (accessible in Child)
│ z: 30       │ ← Public (accessible everywhere)
└─────────────┘
```

---
## 10- 
## 10.1 -Constructors are NOT inherited - This is CORRECT

**Why?**

- Constructors have the **same name as the class**
- If inherited, they would have the wrong name
- Each class needs its own constructor to initialize its own members

**Example:**

```cpp
class Parent {
public:
    Parent(int x) { }  // Parent constructor
};

class Child : public Parent {
    // Parent(int x) is NOT inherited
    // We cannot call: Child c(10); using Parent's constructor
    
    // Must define Child's own constructor:
    Child(int x) : Parent(x) { }  // Calls Parent constructor
};
```

## 10.2- Static members ARE inherited - But with special rules

**The truth:**

- Static members **ARE inherited** (accessible in child class)
- But there's only **ONE copy** shared by all classes
- Child doesn't create a new copy

**Example:**

```cpp
class Parent {
public:
    static int count;  // One copy shared
    
    static void Display() {
        cout << "Count: " << count;
    }
};

int Parent::count = 0;  // Initialize once

class Child : public Parent {
    // Child inherits 'count' and 'Display()'
    // But doesn't create new copies
};

int main() {
    Parent::count = 5;
    
    cout << Child::count;      // 5 (same variable!)
    Child::Display();          // Works - inherited
    
    Child::count = 10;
    cout << Parent::count;     // 10 (same variable!)
}
```

### Updated Explanation

#### What IS Inherited:

| Member Type                         | Inherited? | Notes                     |
| ----------------------------------- | ---------- | ------------------------- |
| **Data members** (private)          | ✅ Yes      | Exist but not accessible  |
| **Data members** (protected/public) | ✅ Yes      | Accessible                |
| **Member functions**                | ✅ Yes      | All functions inherited   |
| **Static members**                  | ✅ Yes      | Shared, not duplicated    |
| **Constructors**                    | ❌ No       | Must define in each class |
| **Destructor**                      | ❌ No       | Must define in each class |
| **Assignment operator**             | ❌ No       | Not inherited             |
| **Friend functions**                | ❌ No       | Not members               |
### Better Statement:

**Original (needs correction):**

> Child inherits EVERYTHING from parent except constructors and static members

**Corrected:**

> Child inherits EVERYTHING from parent, but:
> 
> - **Constructors** are NOT inherited (must define your own)
> - **Destructors** are NOT inherited (must define your own)
> - **Static members** ARE inherited but shared (only one copy exists)
> - **Copy assignment operator** is NOT inherited
> - **Friend functions** are NOT inherited (they're not members)


### Visual Example

```cpp
class Parent {
private:
    int x;                    // ✅ Inherited (not accessible)
protected:
    int y;                    // ✅ Inherited (accessible)
public:
    int z;                    // ✅ Inherited (accessible)
    static int count;         // ✅ Inherited (shared)
    
    void Show() { }           // ✅ Inherited
    static void Display() { } // ✅ Inherited (shared)
    
    Parent() { }              // ❌ NOT inherited
    ~Parent() { }             // ❌ NOT inherited
    
    Parent& operator=(const Parent&) { } // ❌ NOT inherited
    
    friend void Print(){} // ❌ NOT inherited
};

class Child : public Parent {
    // Inherits: x, y, z, count, Show(), Display()
    // Must define: Constructor, Destructor, Assignment
};
```


### Memory Diagram

```cpp
Parent::count = 100;

Parent p1, p2;
Child c1, c2;

Memory:
┌─────────────────────┐
│  Static Memory      │
├─────────────────────┤
│ Parent::count: 100  │ ◄─── ONE copy only
│                     │      Shared by Parent & Child
└─────────────────────┘
         ↑
         │
    ┌────┴────┐
    │         │
  Parent    Child
  (access) (access)
```
---
## 11- Best Practices

1. **Use public inheritance by default** (for IS-A relationships)
2. **Keep inheritance hierarchies shallow** (prefer composition)
3. **Use protected for data meant to be inherited**
4. **Always use constructor chaining** (: Parent(...))
5. **Override carefully** (consider virtual functions)
6. **Follow Liskov Substitution Principle**
7. **Prefer composition over inheritance** when in doubt

---
## 12- Common Pitfalls

### 1. Forgetting Constructor Chaining

```cpp
// ✗ Bad
Child(int x, int y, int z) {
    SetX(x);  // Inefficient
    SetY(y);
    this->z = z;
}

// ✓ Good
Child(int x, int y, int z) : Parent(x, y) {
    this->z = z;
}
```

### 2. Accessing Private Members

```cpp
// ✗ Error
int SumXYZ() {
    return x + y + z;  // x, y are private
}

// ✓ Correct
int SumXYZ() {
    return GetX() + GetY() + z;
}
```

### 3. Infinite Recursion

```cpp
// ✗ Infinite loop
int Sum() {
    return z + Sum();  // Calls itself!
}

// ✓ Correct
int Sum() {
    return z + Parent::Sum();
}
```

---

## 13- Summary

- **Inheritance** = Code reuse + Logical hierarchy
- **Use** public inheritance for IS-A relationships
- **Avoid** deep hierarchies (prefer composition)
- **Remember** constructor/destructor order
- **Use** protected for data meant to be inherited
- **Always** consider if composition is better

---
### <span style="color:#3498db">Created By Abdullah Ali</span>
***
## <span style="color:#27ae60;font:300px;align-items:center">وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ﴾ [هود: 88] ﴿ </span>
