### Section 1: Function Overloading

#### Q1: What is the output?

```cpp
class Calculator {
public:
    int Add(int x, int y) {
        return x + y;
    }
    double Add(double x, double y) {
        return x + y;
    }
    int Add(int x, int y, int z) {
        return x + y + z;
    }
};

int main() {
    Calculator c;
    cout << c.Add(5, 3) << endl;
    cout << c.Add(2.5, 3.5) << endl;
    cout << c.Add(1, 2, 3) << endl;
}
```

**Answer:**

```
8
6
6
```

**Explanation:**

- First call: `Add(int, int)` → 5 + 3 = 8
- Second call: `Add(double, double)` → 2.5 + 3.5 = 6.0
- Third call: `Add(int, int, int)` → 1 + 2 + 3 = 6

---

#### Q2: Will this code compile? Why or why not?

cpp

```cpp
class Test {
public:
    int Process(int x, int y) {
        return x + y;
    }
    double Process(int x, int y) {
        return x * y;
    }
};
```

**Answer:** ❌ **NO, it will NOT compile.**

**Explanation:** Function overloading **ignores return type**. Both functions have the same signature: `Process(int, int)`. The compiler cannot distinguish between them based on return type alone. This causes an ambiguity error.

---

#### Q3: Identify the error and fix it

cpp

```cpp
class Math {
public:
    int Add(int x, int y) { return x + y; }
    int Add(int x, int y) { return x - y; }
};
```

**Answer:** **Error:** Duplicate function signature. Both functions have the same name and parameters.

**Fix:** Either:

1. Change function name:

cpp

```cpp
int Add(int x, int y) { return x + y; }
int Subtract(int x, int y) { return x - y; }
```

2. Or change parameter list:

cpp

```cpp
int Add(int x, int y) { return x + y; }
int Add(int x, int y, int z) { return x + y + z; }
```

---

### Section 2: Default Arguments

#### Q4: What is the output?

cpp

```cpp
class Demo {
public:
    void Print(int a = 1, int b = 2, int c = 3) {
        cout << a << " " << b << " " << c << endl;
    }
};

int main() {
    Demo d;
    d.Print();
    d.Print(10);
    d.Print(10, 20);
    d.Print(10, 20, 30);
}
```

**Answer:**

```
1 2 3
10 2 3
10 20 3
10 20 30
```

**Explanation:** Default arguments are used from right to left when not provided.

---

#### Q5: Will this compile? Fix if not.

cpp

```cpp
class Math {
public:
    int Calculate(int x = 5, int y, int z = 10) {
        return x + y + z;
    }
};
```

**Answer:** ❌ **NO, will NOT compile.**

**Error:** Default arguments must be specified from **right to left**. If `y` is required, `x` cannot have a default value.

**Fix:**

cpp

```cpp
int Calculate(int x, int y, int z = 10) {
    return x + y + z;
}
```

Or:

cpp

```cpp
int Calculate(int x = 5, int y = 8, int z = 10) {
    return x + y + z;
}
```

---

#### Q6: What's the problem here?

cpp

```cpp
class Test {
public:
    int Add(int x = 0, int y = 0) {
        return x + y;
    }
    int Add(int x, int y) {
        return x * y;
    }
};

int main() {
    Test t;
    cout << t.Add(5, 3);  // Which function?
}
```

**Answer:** ❌ **AMBIGUITY ERROR**

**Explanation:** When calling `Add(5, 3)`, the compiler can't decide:

- Should it call `Add(int=0, int=0)` with arguments 5, 3?
- Or should it call `Add(int, int)` with arguments 5, 3?

Both are equally valid matches. **Never mix overloading with default arguments in this way.**

---

### Section 3: Constructors

#### Q7: What is the output?

cpp

```cpp
class Box {
    int width;
public:
    Box() {
        width = 10;
        cout << "Default ctor: width = " << width << endl;
    }
    Box(int w) {
        width = w;
        cout << "Param ctor: width = " << width << endl;
    }
};

int main() {
    Box b1;
    Box b2(25);
    Box b3 = 30;
}
```

**Answer:**

```
Default ctor: width = 10
Param ctor: width = 25
Param ctor: width = 30
```

**Explanation:**

- `b1` calls default constructor
- `b2(25)` calls parameterized constructor
- `b3 = 30` also calls parameterized constructor (implicit conversion)

---

#### Q8: How many constructors are called? How many destructors?

cpp

```cpp
class Item {
public:
    Item() { cout << "Ctor "; }
    ~Item() { cout << "Dest "; }
};

void Test() {
    Item i1, i2;
}

int main() {
    Test();
    cout << "Main continues" << endl;
    return 0;
}
```

**Answer:**

```
Ctor Ctor Dest Dest Main continues
```

**Explanation:**

- 2 constructors called (for i1, i2)
- 2 destructors called when Test() ends (LIFO: i2 then i1)
- Destructors called before returning to main

**Count:** 2 constructors, 2 destructors

---

#### Q9: Fix this code

cpp

```cpp
class Student {
    string name;
    int age;
public:
    // Want to create students with:
    // Student s1;           // name="Unknown", age=0
    // Student s2("Ali");    // name="Ali", age=0
    // Student s3("Sara", 20); // name="Sara", age=20
};
```

**Answer:**

cpp

```cpp
class Student {
    string name;
    int age;
public:
    Student() {
        name = "Unknown";
        age = 0;
    }
    
    Student(string n) {
        name = n;
        age = 0;
    }
    
    Student(string n, int a) {
        name = n;
        age = a;
    }
};
```

**Better solution with default arguments:**

cpp

```cpp
class Student {
    string name;
    int age;
public:
    Student(string n = "Unknown", int a = 0) {
        name = n;
        age = a;
    }
};
```

---

### Section 4: Destructors

#### Q10: What's wrong with this code?

cpp

```cpp
class Array {
    int* data;
    int size;
public:
    Array(int s) {
        size = s;
        data = new int[size];
    }
    // No destructor!
};

int main() {
    for(int i = 0; i < 1000; i++) {
        Array arr(100);
    }
    return 0;
}
```

**Answer:** ❌ **MEMORY LEAK!**

**Problem:** Each loop iteration:

- Allocates 100 * sizeof(int) = 400 bytes
- Never frees the memory
- After 1000 iterations: 400,000 bytes leaked!

**Fix:** Add destructor:

cpp

```cpp
~Array() {
    delete[] data;
}
```

---

#### Q11: Predict the output

cpp

```cpp
class Demo {
    int id;
public:
    Demo(int i) {
        id = i;
        cout << "Ctor " << id << " ";
    }
    ~Demo() {
        cout << "Dest " << id << " ";
    }
};

int main() {
    Demo d1(1);
    {
        Demo d2(2);
        Demo d3(3);
    }
    Demo d4(4);
    return 0;
}
```

**Answer:**

```
Ctor 1 Ctor 2 Ctor 3 Dest 3 Dest 2 Ctor 4 Dest 4 Dest 1
```

**Explanation:**

1. `d1` created → "Ctor 1"
2. Enter block: `d2` created → "Ctor 2"
3. `d3` created → "Ctor 3"
4. Exit block: `d3` destroyed → "Dest 3" (LIFO)
5. `d2` destroyed → "Dest 2"
6. `d4` created → "Ctor 4"
7. main ends: `d4` destroyed → "Dest 4"
8. `d1` destroyed → "Dest 1"

---

#### Q12: When is destructor NOT needed explicitly?

Select all that apply:

- A) Class has dynamic memory allocation
- B) Class only has int, float, char members
- C) Class has file handle (FILE*)
- D) Class has only string and vector members
- E) Class manages database connection

**Answer:** **B and D**

**Explanation:**

- **A:** ❌ Need destructor to free memory
- **B:** ✅ POD types, compiler-generated destructor is fine
- **C:** ❌ Need destructor to close file
- **D:** ✅ string and vector have their own destructors (Rule of Zero)
- **E:** ❌ Need destructor to close connection

---

### Section 5: Stack Implementation

#### Q13: What's the output?

cpp

```cpp
class Stack {
    int arr[3];
    int tos;
public:
    Stack() { tos = 0; }
    void Push(int v) {
        if(tos < 3) arr[tos++] = v;
        else cout << "FULL ";
    }
    int Pop() {
        if(tos > 0) return arr[--tos];
        cout << "EMPTY ";
        return -1;
    }
};

int main() {
    Stack s;
    s.Push(10);
    s.Push(20);
    s.Push(30);
    s.Push(40);
    cout << s.Pop() << " ";
    cout << s.Pop() << " ";
}
```

**Answer:**

```
FULL 30 20
```

**Explanation:**

- Push 10, 20, 30 → Success (stack: [10, 20, 30])
- Push 40 → FULL (tos = 3, can't add more)
- Pop → Returns 30 (tos now 2)
- Pop → Returns 20 (tos now 1)

---

#### Q14: Draw the memory state

cpp

```cpp
Stack s(5);
s.Push(100);
s.Push(200);
```

Where Stack is:

cpp

```cpp
class Stack {
    int* arr;
    int size;
    int tos;
public:
    Stack(int s) {
        size = s;
        tos = 0;
        arr = new int[size];
    }
};
```

**Answer:**

```
Stack Memory:
┌─────────────────┐
│  s              │
│  ┌───────────┐  │
│  │ arr ──────┼──┼──┐
│  │ size = 5  │  │  │
│  │ tos = 2   │  │  │
│  └───────────┘  │  │
└─────────────────┘  │
                     │
Heap Memory:         │
┌────────────────────┼─┐
│ int[5] array       ↓ │
│ ┌───┬───┬───┬───┬───┐│
│ │100│200│ ? │ ? │ ? ││
│ └───┴───┴───┴───┴───┘│
│  [0] [1] [2] [3] [4] │
└──────────────────────┘
```

---

#### Q15: Why does second call fail?

cpp

```cpp
void ViewStack(Stack s) {
    // View stack contents
}

int main() {
    Stack s1(5);
    s1.Push(10);
    s1.Push(20);
    
    ViewStack(s1);  // Works
    ViewStack(s1);  // CRASH!
}
```

**Answer:** **SHALLOW COPY PROBLEM**

**Explanation:**

1. First `ViewStack(s1)`:
    - Creates copy of `s1` (pass by value)
    - `s1.arr` and `copy.arr` point to **same heap memory**
    - Function ends → `copy` destructor called
    - `delete[] arr` frees the memory
    - `s1.arr` now points to **freed memory** (dangling pointer)
2. Second `ViewStack(s1)`:
    - Tries to copy `s1` again
    - `s1.arr` points to freed memory
    - **Undefined behavior / CRASH**

**Fix:** Pass by reference:

cpp

```cpp
void ViewStack(const Stack& s) {
    // No copy, no problem
}
```

---

### Section 6: Static Members

#### Q16: What is the output?

cpp

```cpp
class Counter {
    static int count;
public:
    Counter() { count++; }
    ~Counter() { count--; }
    static int GetCount() { return count; }
};

int Counter::count = 0;

int main() {
    cout << Counter::GetCount() << " ";
    Counter c1;
    cout << Counter::GetCount() << " ";
    {
        Counter c2, c3;
        cout << Counter::GetCount() << " ";
    }
    cout << Counter::GetCount() << " ";
    return 0;
}
```

**Answer:**

```
0 1 3 1
```

**Explanation:**

- Start: count = 0
- After `c1`: count = 1
- After `c2, c3`: count = 3
- After block ends (c2, c3 destroyed): count = 1
- At end: c1 still alive, count = 1

---

#### Q17: Will this compile?

cpp

```cpp
class Test {
    static int x;
    int y;
public:
    static void Display() {
        cout << x << endl;
        cout << y << endl;  // Can we access y?
    }
};
```

**Answer:** ❌ **NO, compilation error on line `cout << y`**

**Explanation:** Static member functions:

- **CAN** access static members (x)
- **CANNOT** access non-static members (y)
- Reason: No `this` pointer in static functions
- `y` requires an object, static function has no object

**Fix:**

cpp

```cpp
static void Display(Test& obj) {
    cout << x << endl;
    cout << obj.y << endl;  // Now OK
}
```

---

#### Q18: Fix the initialization error

cpp

```cpp
class Config {
    static string appName;
public:
    static string GetAppName() {
        return appName;
    }
};

int main() {
    cout << Config::GetAppName();
}
```

**Answer:** **Missing initialization!**

**Fix:**

cpp

```cpp
class Config {
    static string appName;
public:
    static string GetAppName() {
        return appName;
    }
};

// MUST initialize outside class
string Config::appName = "MyApp";

int main() {
    cout << Config::GetAppName();
}
```

---

### Section 7: Friend Functions

#### Q19: What can ViewData access?

cpp

```cpp
class Secret {
private:
    int privateData;
protected:
    int protectedData;
public:
    int publicData;
    
    friend void ViewData(Secret& s);
};

void ViewData(Secret& s) {
    // Which can we access?
    cout << s.publicData;      // A
    cout << s.protectedData;   // B
    cout << s.privateData;     // C
}
```

**Answer:** ✅ **ALL THREE (A, B, C)**

**Explanation:** Friend functions can access:

- Public members ✅
- Protected members ✅
- Private members ✅

Friend functions bypass all access controls.

---

#### Q20: Identify the problem

cpp

```cpp
class Box {
    int width;
public:
    Box(int w) : width(w) {}
    friend void Double(Box b);
};

void Double(Box b) {
    b.width *= 2;
}

int main() {
    Box box(10);
    Double(box);
    // What is box.width now?
}
```

**Answer:** **Problem:** Pass by VALUE means the function modifies a **copy**, not the original.

`box.width` is still **10** (unchanged).

**Fix:** Pass by reference:

cpp

```cpp
void Double(Box& b) {
    b.width *= 2;
}
```

Now `box.width` becomes **20**.

---

### Section 8: Mixed Concepts

#### Q21: Complete the code

cpp

```cpp
class BankAccount {
    string owner;
    double balance;
    static int totalAccounts;
    
public:
    // TODO: Write constructor that:
    // 1. Sets owner and balance
    // 2. Increments totalAccounts
    // 3. Prints "Account created for [owner]"
    
    // TODO: Write destructor that:
    // 1. Decrements totalAccounts
    // 2. Prints "Account closed for [owner]"
    
    // TODO: Write static function GetTotalAccounts()
};

// TODO: Initialize static variable
```

**Answer:**

cpp

```cpp
class BankAccount {
    string owner;
    double balance;
    static int totalAccounts;
    
public:
    BankAccount(string o, double b) {
        owner = o;
        balance = b;
        totalAccounts++;
        cout << "Account created for " << owner << endl;
    }
    
    ~BankAccount() {
        totalAccounts--;
        cout << "Account closed for " << owner << endl;
    }
    
    static int GetTotalAccounts() {
        return totalAccounts;
    }
};

int BankAccount::totalAccounts = 0;
```

---

#### Q22: Find ALL errors

cpp

```cpp
class Calculator {
    static int result;
    
    Calculator(int x = 5, int y) {  // Error 1
        result = x + y;
    }
    
    int GetResult() {               // Error 2
        return result;
    }
    
    static void Reset() {           // Error 3
        result = 0;
        cout << this->result;
    }
};

Calculator::result = 0;             // Error 4

int main() {
    Calculator c;                   // Error 5
}
```

**Answer:** **5 Errors:**

1. **Error 1:** Default argument order wrong
    - Fix: `Calculator(int x, int y = 0)`
2. **Error 2:** Constructor missing return type keyword (should have NONE)
    - Current code looks fine unless missing constructor label
3. **Error 3:** Static function using `this` pointer
    - Fix: Remove `this->`, just use `result`
4. **Error 4:** Wrong initialization syntax
    - Fix: `int Calculator::result = 0;`
5. **Error 5:** Constructor requires argument `y`
    - Fix: Call `Calculator c(5, 10);` or fix constructor defaults

---

#### Q23: Memory leak or not?

cpp

```cpp
class A {
public:
    A() { cout << "A "; }
    ~A() { cout << "~A "; }
};

class B {
    A* ptr;
public:
    B() {
        ptr = new A();
        cout << "B "; }
    
    ~B() {
        cout << "~B ";
    }
};

int main() {
    B obj;
    return 0;
}
```

**Answer:** ✅ **YES, MEMORY LEAK!**

**Output:**

```
A B ~B
```

**Problem:**

- `ptr = new A()` allocates memory
- Destructor `~B()` doesn't call `delete ptr`
- Memory leaked (no `~A` for dynamically allocated A)

**Fix:**

cpp

```cpp
~B() {
    delete ptr;
    cout << "~B ";
}
```

**Corrected output:**

```
A B ~A ~B
```

---

#### Q24: Tricky Question - What's the output?

cpp

```cpp
class X {
    static int count;
public:
    X() { count++; }
    ~X() { count--; }
    static int GetCount() { return count; }
    
    friend X CreateX();
};

int X::count = 0;

X CreateX() {
    X temp;
    cout << X::GetCount() << " ";
    return temp;
}

int main() {
    X obj = CreateX();
    cout << X::GetCount();
    return 0;
}
```

**Answer:**

```
1 1
```

**Explanation:**

- `CreateX()` creates `temp` → count = 1, prints "1 "
- `return temp` → Return Value Optimization (RVO)
- No copy made (compiler optimized)
- `obj` is actually `temp` (same object)
- At end: count still 1, prints "1"

**Note:** Without RVO, you'd see copy constructor calls.

---

#### Q25: Design Challenge

Design a `Point` class with:

- Private x, y coordinates
- Constructors: default (0,0), parameterized (x,y)
- Method to calculate distance from another point
- Friend function to calculate distance between two points
- Static counter for total points created

**Answer:**

cpp

```cpp
#include <iostream>
#include <cmath>
using namespace std;

class Point {
private:
    double x, y;
    static int totalPoints;
    
public:
    // Default constructor
    Point() : x(0), y(0) {
        totalPoints++;
        cout << "Point created at origin\n";
    }
    
    // Parameterized constructor
    Point(double _x, double _y) : x(_x), y(_y) {
        totalPoints++;
        cout << "Point created at (" << x << "," << y << ")\n";
    }
    
    // Destructor
    ~Point() {
        totalPoints--;
        cout << "Point destroyed\n";
    }
    
    // Member function: distance from another point
    double DistanceTo(const Point& other) const {
        double dx = x - other.x;
        double dy = y - other.y;
        return sqrt(dx*dx + dy*dy);
    }
    
    // Getter for total points
    static int GetTotalPoints() {
        return totalPoints;
    }
    
    // Friend function declaration
    friend double Distance(const Point& p1, const Point& p2);
    
    // Display point
    void Display() const {
        cout << "(" << x << ", " << y << ")" << endl;
    }
};

// Initialize static member
int Point::totalPoints = 0;

// Friend function definition
double Distance(const Point& p1, const Point& p2) {
    double dx = p1.x - p2.x;
    double dy = p1.y - p2.y;
    return sqrt(dx*dx + dy*dy);
}

// Test
int main() {
    Point p1;              // (0, 0)
    Point p2(3, 4);        // (3, 4)
    Point p3(6, 8);        // (6, 8)
    
    cout << "Total points: " << Point::GetTotalPoints() << endl;
    
    cout << "Distance p1 to p2 (member): " 
         << p1.DistanceTo(p2) << endl;
    
    cout << "Distance p2 to p3 (friend): " 
         << Distance(p2, p3) << endl;
    
    return 0;
}
```

---

## Advanced Challenge Questions

### Q26: Copy Constructor Problem

cpp

```cpp
class Data {
    int* ptr;
public:
    Data(int val) {
        ptr = new int(val);
    }
    ~Data() {
        delete ptr;
    }
};

int main() {
    Data d1(100);
    Data d2 = d1;  // What happens?
    return 0;
}
```

**What's the problem? How to fix?**

**Answer:** **Problem:** Shallow copy → both `d1.ptr` and `d2.ptr` point to same memory. When destructors run: **DOUBLE DELETE → CRASH**

**Fix:** Implement deep copy constructor:

cpp

```cpp
Data(const Data& other) {
    ptr = new int(*other.ptr);  // Deep copy
}
```

---

### Q27: Constructor Initialization List

Which is better and why?

cpp

```cpp
// Version A
class Student {
    string name;
    int age;
public:
    Student(string n, int a) {
        name = n;
        age = a;
    }
};

// Version B
class Student {
    string name;
    int age;
public:
    Student(string n, int a) : name(n), age(a) {
    }
};
```

**Answer:** **Version B is better** (initialization list)

**Why:**

- **Version A:** Members first default-constructed, then assigned (2 operations)
- **Version B:** Members directly initialized (1 operation)
- More efficient, especially for complex objects
- **Required** for const members and references

---

### Q28: Predict Output (Tricky!)

cpp

```cpp
class Test {
    int x;
public:
    Test(int val = 0) : x(val) {
        cout << "C" << x << " ";
    }
    ~Test() {
        cout << "D" << x << " ";
    }
};

Test global(1);

int main() {
    Test local(2);
    static Test stat(3);
    Test* dynamic = new Test(4);
    return 0;
}
```

**Answer:**

```
C1 C2 C3 C4 D2 D3 D1
```

**Explanation:**

1. `global(1)` created before main → "C1"
2. `local(2)` created in main → "C2"
3. `stat(3)` created (static) → "C3"
4. `dynamic` created on heap → "C4"
5. main ends: `local` destroyed → "D2"
6. Program ends: `stat` destroyed → "D3"
7. Finally: `global` destroyed → "D1"
8. **`dynamic` NEVER destroyed** → Memory leak!

---

## Summary Table

|Concept|Key Points|Main Use Case|
|---|---|---|
|**Function Overloading**|Same name, different parameters|Same operation, different types|
|**Default Arguments**|Right-to-left rule|Optional parameters|
|**Constructor**|Initialize object state|RAII, resource allocation|
|**Destructor**|Cleanup resources|Free memory, close files|
|**Static Members**|Shared across all objects|Counters, shared config|
|**Friend Functions**|Access private members|Operator overloading, testing|

---

## Key Takeaways

1. **Constructors** ensure objects start in valid state
2. **Destructors** prevent resource leaks (RAII principle)
3. **Static members** are shared, not per-object
4. **Friend functions** break encapsulation - use sparingly
5. **Pass by reference** to avoid copy problems
6. **Always implement destructor** when using `new`/`delete`

---
### <span style="color:#3498db">Created By Abdullah Ali</span>
***
## <span style="color:#27ae60;font:300px;align-items:center">وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ﴾ [هود: 88] ﴿ </span>
