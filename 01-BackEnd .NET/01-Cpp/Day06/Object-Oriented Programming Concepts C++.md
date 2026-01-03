## *Table of Contents :* 
- [ ] Namespaces
- [ ] References (C++ Exclusive Feature)
- [ ] Swap Functions: Value vs Pointer vs Reference
- [ ] Struct vs Class: Access Modifiers
- [ ] Employee Class Example (Encapsulation)
- [ ] Complex Number Class
- [ ] The `this` Pointer
- [ ] Lab Assignment: Complex Class
- [ ] Key Concepts Summary
- [ ] Important Notes

---
## 1. Namespaces

### Definition

A **namespace** is a logical grouping for one or more data types with a specific name to achieve better organization and identity.

### Purpose

- Prevent naming conflicts
- Organize code logically
- Group related functionality

### Example: Book Namespaces

```cpp
#include<iostream>
using namespace std;

namespace BookRead {
    struct Book {
        string isbn;
        string authorName;
        int year;
        string title;
    };
}

namespace BookTicket {
    struct Book {
        string ticketNo;
        string passengerName;
        string from;
        string to;
    };
}

using namespace BookRead;

int main() {
    Book br1;              // BookRead::Book
    Book br2;              // BookRead::Book
    Book br3;              // BookRead::Book
    BookTicket::Book bt1;  // Explicit namespace
}
```

### Memory Diagram

```Stack-Memory:
┌─────────────────────────────────────┐
│ br1 (BookRead::Book)                │
│ ├─ isbn: ""                         │
│ ├─ authorName: ""                   │
│ ├─ year: 0                          │
│ └─ title: ""                        │
├─────────────────────────────────────┤
│ br2 (BookRead::Book)                │
│ ├─ isbn: ""                         │
│ ├─ authorName: ""                   │
│ ├─ year: 0                          │
│ └─ title: ""                        │
├─────────────────────────────────────┤
│ br3 (BookRead::Book)                │
│ ├─ isbn: ""                         │
│ ├─ authorName: ""                   │
│ ├─ year: 0                          │
│ └─ title: ""                        │
├─────────────────────────────────────┤
│ bt1 (BookTicket::Book)              │
│ ├─ ticketNo: ""                     │
│ ├─ passengerName: ""                │
│ ├─ from: ""                         │
│ └─ to: ""                           │
└─────────────────────────────────────┘
```

---
## 2. References (C++ Exclusive Feature)

### Definition

A **reference '&'** is an alias (alternative name) for another variable in memory. It shares the same memory address.

### Key Points

- Must be initialized when declared
- Cannot be reassigned to reference another variable
- Same memory address as the original variable

### Example

```cpp
int main() {
    int x = 10;      // Variable x at address 0x100
    int& y = x;      // y is a reference to x (same address 0x100)
    
    cout << x;       // 10
    cout << y;       // 10
    cout << &x;      // 0x100
    cout << &y;      // 0x100 (same address!)
    
    x = 100;
    cout << y;       // 100 (y reflects x's change)
    
    // int& z;       // COMPILE ERROR: must initialize
    return 0;
}
```

### Memory Diagram

```
Memory Address: 0x100
┌──────────────────┐
│  x = 10  ◄─────┐ │
│          │     │ │
│  y ──────┘     │ │  (y is just another name for x)
└────────────────┼─┘
                 │
    Both point to same location
```

**After x = 100:**

```
Memory Address: 0x100
┌──────────────────┐
│  x = 100  ◄────┐ │
│           │    │ │
│  y ───────┘    │ │
└────────────────┼─┘
```

---
## 3. Swap Functions: Value vs Pointer vs Reference

### Three Approaches to Swapping

#### 1. Pass by Value (Doesn't Work)

```cpp
void SwapV(int x, int y) {
    int tmp = x;
    x = y;
    y = tmp;
}  // Changes are lost when function ends
```

#### 2. Pass by Address/Pointer (Works, but verbose)

```cpp
void SwapA(int* x, int* y) {
    int tmp = *x;
    *x = *y;
    *y = tmp;
}  // Call: SwapA(&a, &b);
```

#### 3. Pass by Reference (Best approach)

```cpp
void SwapR(int& x, int& y) {
    int tmp = x;
    x = y;
    y = tmp;
}  // Call: SwapR(a, b);

int main() {
    int a = 10, b = 20;
    SwapR(a, b);  // a=20, b=10
}
```
=> It save memory , do not need extra space in memory
### Memory Diagrams

**Before Swap:**

```
Main Function Stack:
┌────────────────┐
│ a = 10  [0x10] │
│ b = 20  [0x20] │
└────────────────┘
```

**During SwapR(a, b):**

```
SwapR Stack Frame:
┌─────────────────────┐
│ x → points to a     │ ──→  [0x10] = 10
│ y → points to b     │ ──→  [0x20] = 20
│ tmp = 10            │
└─────────────────────┘

After swap operations:
[0x10] = 20  (was 10)
[0x20] = 10  (was 20)
```

**After Swap:**

```
Main Function Stack:
┌────────────────┐
│ a = 20  [0x10] │
│ b = 10  [0x20] │
└────────────────┘
```

### Summary Table

|Method|Syntax|Can Modify Original?|Use Case|
|---|---|---|---|
|**Pass by Value**|`void func(int x)`|❌ No|Read-only, small data|
|**Pass by Reference**|`void func(int& x)`|✅ Yes|Modify original|
|**Pass by Const Reference**|`void func(const int& x)`|❌ No|Read-only, large data (efficient)|

### Memory Impact

**Pass by Value:**

```
Original:  a = 10  [0x100]
           ↓ (copied)
Function:  x = 10  [0x200]  (separate copy)
```

**Pass by Reference:**

```
Original:  a = 10  [0x100]
           ↑
Function:  x ─────┘  (refers to same location)
```

---
## 4. Struct vs Class: Access Modifiers

### Key Differences
- **struct**: Default access is **public**
- **class**: Default access is **private**
### Access Modifier Rules
- **private**: Members accessible ONLY inside class/struct scope
- **public**: Members accessible inside AND outside class/struct scope

---

## 5. Employee Class Example (Encapsulation)

### The Problem: OOP Violation

```cpp
struct Employee {
    int id;
    int age;
    float salary;
};

int main() {
    Employee e1;
    e1.id = 1;        // Direct access (bad!)
    e1.salary = 50;   // No validation!
}
```

### The Solution: Encapsulation with Setters/Getters

```cpp
class Employee {
private:
    int id;
    int age;
    float salary;

public:
    void SetId(int _id) {
        id = _id;
    }
    
    int GetId() {
        return id;
    }
    
    void SetSalary(float _salary) {
        if (_salary >= 5000 && _salary <= 10000) {
            salary = _salary;
        } else {
            salary = 5000;  // Default value
        }
    }
    
    float GetSalary() {
        return salary;
    }
    
    void Print() {
        cout << "ID: " << id << endl;
        cout << "Age: " << age << endl;
        cout << "Salary: " << salary << endl;
    }
};
```

### Memory Diagram

```
Heap/Stack:
┌──────────────────────────────────┐
│ e1 (Employee object) - 12 bytes  │
│ ┌──────────────────────────────┐ │
│ │ id:     1      [4 bytes]     │ │ Private
│ │ age:    22     [4 bytes]     │ │ Private
│ │ salary: 1234.0 [4 bytes]     │ │ Private
│ └──────────────────────────────┘ │
│                                  │
│ Public Methods (not in memory):  │
│ - SetId()                        │
│ - GetId()                        │
│ - SetSalary()                    │
│ - GetSalary()                    │
│ - Print()                        │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│ e2 (Employee object) - 12 bytes  │
│ ┌──────────────────────────────┐ │
│ │ id:     2      [4 bytes]     │ │
│ │ age:    25     [4 bytes]     │ │
│ │ salary: 7500.0 [4 bytes]     │ │
│ └──────────────────────────────┘ │
└──────────────────────────────────┘
```

---
## 6. Complex Number Class

### Complete Implementation

```cpp
class Complex {
private:
    int real;
    int img;

public:
    void SetReal(int _real) {
        real = _real;
    }
    
    int GetReal() const {  // const: won't modify object
        return real;
    }
    
    void SetImg(int _img) {
        img = _img;
    }
    
    int GetImg() const {
        return img;
    }
    
    void Print() {
        if (img >= 0)
            cout << real << "+" << img << "i" << endl;
        else
            cout << real << img << "i" << endl;
    }
    
    // Member function: caller is left operand
    Complex Add(const Complex& right) {
        Complex result;
        result.real = real + right.real;  // this->real
        result.img = img + right.img;
        return result;
    }
};

// Standalone function: no access to private members
Complex AddComplex(const Complex& left, const Complex& right) {
    Complex result;
    int r = left.GetReal() + right.GetReal();
    int i = left.GetImg() + right.GetImg();
    result.SetReal(r);
    result.SetImg(i);
    return result;
}
```

### Usage Example

```cpp
int main() {
    Complex c1, c2, c3;
    
    c1.SetReal(3);
    c1.SetImg(4);
    
    c2.SetReal(5);
    c2.SetImg(6);
    
    c1.Print();  // 3+4i
    c2.Print();  // 5+6i
    
    // Using member function
    c3 = c1.Add(c2);  // c1 is caller (this), c2 is parameter
    
    // Using standalone function
    c3 = AddComplex(c1, c2);
    
    c3.Print();  // 8+10i
}
```

### Memory Diagram

```
Stack Memory:
┌─────────────────────────────────┐
│ c1 (Complex) - 8 bytes          │
│ ┌─────────────────────────────┐ │
│ │ real: 3    [4 bytes]        │ │
│ │ img:  4    [4 bytes]        │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ c2 (Complex) - 8 bytes          │
│ ┌─────────────────────────────┐ │
│ │ real: 5    [4 bytes]        │ │
│ │ img:  6    [4 bytes]        │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ c3 (Complex) - 8 bytes          │
│ ┌─────────────────────────────┐ │
│ │ real: 8    [4 bytes]        │ │
│ │ img:  10   [4 bytes]        │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘

During c3 = c1.Add(c2):
┌─────────────────────────────────┐
│ Temporary result object         │
│ ┌─────────────────────────────┐ │
│ │ real: 3 + 5 = 8             │ │
│ │ img:  4 + 6 = 10            │ │
│ └─────────────────────────────┘ │
│ (copied to c3)                  │
└─────────────────────────────────┘
```

---
## 7. The `this` Pointer

### Definition

Inside any **member function** (method), there is a **hidden input parameter** called `this`.

- Type: `ClassName* this`
- Points to the object that called the function

### Example with `this`

```cpp
class Complex {
private:
    int real;
    int img;

public:
    // Hidden parameter: Complex* this
    void SetReal(/*Complex* this,*/ int _real) {
        this->real = _real;  // Same as: (*this).real = _real;
        // real = _real;     // Also works (implicit this)
    }
    
    int GetReal(/*Complex* this*/) const {
        return this->real;
    }
    
    Complex Add(/*Complex* this,*/ const Complex& right) {
        Complex result;
        result.real = this->real + right.real;
        result.img = this->img + right.img;
        return result;
    }
};

int main() {
    Complex c1;
    c1.SetReal(3);  
    // Compiler transforms to: Complex::SetReal(&c1, 3);
    
    c1.Print();
    // Compiler transforms to: Complex::Print(&c1);
}
```

### Memory Diagram: `this` Pointer

```
When calling: c1.SetReal(3);

Stack:
┌──────────────────────────────┐
│ main() scope                 │
│ ┌──────────────────────────┐ │
│ │ c1 at address 0x100      │ │
│ │ ├─ real: ?               │ │
│ │ └─ img:  ?               │ │
│ └──────────────────────────┘ │
└──────────────────────────────┘
           │
           │ calls SetReal(3)
           ▼
┌──────────────────────────────┐
│ SetReal() scope              │
│ ┌──────────────────────────┐ │
│ │ this = 0x100  ───────────┼─┼──► Points to c1
│ │ _real = 3                │ │
│ └──────────────────────────┘ │
│                              │
│ Executes: this->real = 3     │
│ Updates c1.real at 0x100     │
└──────────────────────────────┘
```

### Key Points

- **Member functions** have `this` pointer
- **Standalone functions** do NOT have `this` pointer
- `this->member` and `member` are equivalent inside methods
- Use `this->` to avoid ambiguity or when parameter names match member names

---

## 8. Lab Assignment: Complex Class

### Requirements

Implement a Complex number class with:

1. Private members: `real`, `img`
2. Setters and getters
3. `Print()` method
4. `Add()` member function
5. `AddComplex()` standalone function

### Print Format Rules

|Real|Img|Output|
|---|---|---|
|3|4|`3+4i`|
|3|-4|`3-4i`|
|3|1|`3+i`|
|3|-1|`3-i`|
|0|1|`i`|
|0|-1|`-i`|
|0|0|`0`|
|1|0|`1`|

### Enhanced Print Implementation

```cpp
void Print() {
    // Special case: 0
    if (real == 0 && img == 0) {
        cout << "0" << endl;
        return;
    }
    
    // Real part
    if (real != 0) {
        cout << real;
    }
    
    // Imaginary part
    if (img != 0) {
        if (img == 1) {
            cout << (real != 0 ? "+" : "") << "i";
        } else if (img == -1) {
            cout << "-i";
        } else if (img > 0) {
            cout << (real != 0 ? "+" : "") << img << "i";
        } else {
            cout << img << "i";
        }
    }
    
    cout << endl;
}
```

---

## Key Concepts Summary

1. **Namespaces**: Organize code and prevent naming conflicts
2. **References**: Alias to existing variables (same memory address)
3. **Encapsulation**: Hide data, expose through methods
4. **this Pointer**: Hidden parameter in member functions pointing to caller object
5. **const Methods**: Promise not to modify object state
6. **Pass by Reference**: Efficient for large objects, allows modification
7. **Pass by Const Reference**: Efficient + read-only (best of both worlds)

---

## Important Notes

- Use `const` with getters: `int GetReal() const`
- Use `const&` for parameters you don't want to modify: `Add(const Complex& right)`
- **Member functions** can access private members directly
- **Standalone functions** must use getters/setters
- Classes promote **encapsulation** and **data validation**

---
### <span style="color:#3498db">Created By Abdullah Ali</span>
***
## <span style="color:#27ae60;font:300px;align-items:center">وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ﴾ [هود: 88] ﴿ </span>
