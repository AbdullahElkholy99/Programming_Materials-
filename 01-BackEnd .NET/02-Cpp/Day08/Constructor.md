## Copy Constructor

### Definition

A **Copy Constructor** is a special constructor that creates a new object as a copy of an existing object. It's #automatically called in three cases:

1. **Pass by value** - passing an object to a function
2. **Return by value** - returning an object from a function
3. **Object initialization** - creating an object from another object

### Syntax

```cpp
ClassName(const ClassName& oldObject) {
    // Copy members from oldObject to this
}
```

### When is Copy Constructor MANDATORY?

The copy constructor is **MANDATORY** when your class contains:

- **Pointers** that dynamically allocate memory
- **Resources** that need deep copying (files, network connections, etc.)

**Why?** Without an explicit copy constructor, C++ performs a **bitwise copy** (shallow copy), which copies pointer values but not the data they point to. This leads to:

- **Double deletion** - both objects point to same memory, destructor deletes it twice
- **Memory leaks** - original data is lost
- **Unintended sharing** - changes in one object affect another

### Example: Stack Class (MUST have Copy Constructor)

```cpp
class Stack {
private:
    int* arr;      // Pointer to dynamic array
    int size;
    int tos;       // Top of stack
public:
    // Copy Constructor (MANDATORY)
    Stack(const Stack& oldObj) {
        tos = oldObj.tos;
        size = oldObj.size;
        arr = new int[size];  // Allocate NEW memory
        for (int i = 0; i < tos; i++) {
            arr[i] = oldObj.arr[i];  // Deep copy
        }
    }
    
    ~Stack() {
        delete[] arr;  // Each object deletes its own memory
    }
};
```

### Memory Diagram: Without Copy Constructor (PROBLEM)

```
Stack s1:                    Stack s2 = s1; (Shallow Copy)
┌─────────────┐             ┌─────────────┐
│ size: 5     │             │ size: 5     │
│ tos: 3      │             │ tos: 3      │
│ arr: 0x1000 │────┐        │ arr: 0x1000 │────┐
└─────────────┘    │        └─────────────┘    │
                   │                            │
                   └─────────┬──────────────────┘
                             ▼
                    Heap Memory (0x1000)
                    ┌────┬────┬────┬────┬────┐
                    │ 10 │ 20 │ 30 │ ?? │ ?? │
                    └────┴────┴────┴────┴────┘
                    
Problem: BOTH objects point to SAME memory!
When one destructor runs, the other has a dangling pointer!
```

### Memory Diagram: With Copy Constructor (SOLUTION)

```
Stack s1:                    Stack s2 = s1; (Deep Copy)
┌─────────────┐             ┌─────────────┐
│ size: 5     │             │ size: 5     │
│ tos: 3      │             │ tos: 3      │
│ arr: 0x1000 │────┐        │ arr: 0x2000 │────┐
└─────────────┘    │        └─────────────┘    │
                   │                            │
                   ▼                            ▼
           Heap (0x1000)                Heap (0x2000)
           ┌────┬────┬────┐            ┌────┬────┬────┐
           │ 10 │ 20 │ 30 │            │ 10 │ 20 │ 30 │
           └────┴────┴────┘            └────┴────┴────┘
           
Solution: Each object has its OWN memory!
Destructors work independently without issues.
```

### Example: Complex Class (Useless Copy Constructor)

```cpp
class Complex {
private:
    int real;
    int img;
public:
    // Copy Constructor (USELESS - no pointers)
    Complex(const Complex& old) {
        real = old.real;
        img = old.img;
    }
};
```

**Why useless?** The default bitwise copy works perfectly for simple data types (int, double, etc.). Writing an explicit copy constructor here is redundant.

### Pros and Cons

|Pros|Cons|
|---|---|
|✅ Prevents memory corruption|❌ Extra code to write|
|✅ Enables deep copying|❌ Performance overhead|
|✅ Safe resource management|❌ Easy to forget|
|✅ Prevents dangling pointers|❌ Must update when adding pointers|

### When to Use?

|Use Copy Constructor|Don't Use Copy Constructor|
|---|---|
|✅ Class has pointer members|❌ Only primitive types|
|✅ Class manages resources (files, sockets)|❌ No dynamic memory|
|✅ Need independent copies|❌ Default behavior sufficient|

### Do I need a Copy Constructor?

```
Does your class have pointer members?
│
├─ YES → Write explicit copy constructor (MANDATORY)
│         Perform deep copy
│         Allocate new memory
│
└─ NO → Is default behavior sufficient?
          │
          ├─ YES → Don't write it (useless)
          │
          └─ NO → Write it for debugging/logging only
```

---

## Constructor Chaining

### Definition

**Constructor Chaining** is initializing member objects in the initializer list rather than in the constructor body.

### Benefits

1. **Performance** - constructs objects directly
2. **Less Code** - no redundant assignments
3. **Mandatory** for const members and references

### Without Constructor Chaining

```cpp
class Line {
private:
    Point start;
    Point end;
public:
    Line(int x1, int y1, int x2, int y2) {
        // 1. Default constructors called for start and end
        // 2. Then assignments happen (wasteful)
        start.SetX(x1);
        start.SetY(y1);
        end.SetX(x2);
        end.SetY(y2);
    }
};
```

**Output:**

```
Point def ctor (start)
Point def ctor (end)
Line 4p ctor
```

**Total:** 6 function calls (2 constructors + 4 setters)

### With Constructor Chaining

```cpp
class Rect {
private:
    Point ul;
    Point lr;
public:
    Rect(int x1, int y1, int x2, int y2)
    : ul(x1, y1), lr(x2, y2)  // Initializer list
    {
        // Member objects already constructed with values
        cout << "Rect 4p ctor\n";
    }
};
```

**Output:**

```
Point 2p ctor (ul)
Point 2p ctor (lr)
Rect 4p ctor
```

**Total:** 3 function calls only!

### Memory Execution Flow

```
┌────────────────────────────────────────────────┐
│ Without Chaining: Line l(1,2,3,4)              │
├────────────────────────────────────────────────┤
│ Step 1: Allocate Line object in memory         │
│         ┌─────────────────┐                    │
│         │ start: ?, ?     │                    │
│         │ end: ?, ?       │                    │
│         └─────────────────┘                    │
│                                                │
│ Step 2: Call Point default ctor for start      │
│         ┌─────────────────┐                    │
│         │ start: 0, 0     │                    │
│         │ end: ?, ?       │                    │
│         └─────────────────┘                    │
│                                                │
│ Step 3: Call Point default ctor for end        │
│         ┌─────────────────┐                    │
│         │ start: 0, 0     │                    │
│         │ end: 0, 0       │                    │
│         └─────────────────┘                    │
│                                                │
│ Step 4: Execute Line constructor body          │
│         start.SetX(1), SetY(2)                 │
│         end.SetX(3), SetY(4)                   │
│         ┌─────────────────┐                    │
│         │ start: 1, 2     │  ← Wasted work!    │
│         │ end: 3, 4       │                    │
│         └─────────────────┘                    │
└────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│ With Chaining: Rect r(1,2,3,4)                 │
├────────────────────────────────────────────────┤
│ Step 1: Allocate Rect object in memory         │
│         ┌─────────────────┐                    │
│         │ ul: ?, ?        │                    │
│         │ lr: ?, ?        │                    │
│         └─────────────────┘                    │
│                                                │
│ Step 2: Call Point(1,2) ctor for ul            │
│         ┌─────────────────┐                    │
│         │ ul: 1, 2        │  ← Direct init!    │
│         │ lr: ?, ?        │                    │
│         └─────────────────┘                    │
│                                                │
│ Step 3: Call Point(3,4) ctor for lr            │
│         ┌─────────────────┐                    │
│         │ ul: 1, 2        │                    │
│         │ lr: 3, 4        │  ← Direct init!    │
│         └─────────────────┘                    │
│                                                │
│ Step 4: Execute Rect constructor body          │
│         (No extra work needed!)                │
└────────────────────────────────────────────────┘
```

### Pros and Cons

|Pros|Cons|
|---|---|
|✅ Better performance|❌ Different syntax to learn|
|✅ Less redundant code|❌ Can't use complex logic|
|✅ Required for const/references|❌ Initialization order matters|
|✅ Cleaner design||

### When to Use?

**Always use constructor chaining when:**

- Class has object members
- Initializing const members
- Initializing reference members
- Performance matters
- Want cleaner code

### Should I use Constructor Chaining?

```
Do I have object members in my class?
│
├─ YES → Use constructor chaining
│         Better performance
│         Cleaner code
│
└─ NO → Not applicable
```

---
### <span style="color:#3498db">Created By Abdullah Ali</span>
***
## <span style="color:#27ae60;font:300px;align-items:center">وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ﴾ [هود: 88] ﴿ </span>
