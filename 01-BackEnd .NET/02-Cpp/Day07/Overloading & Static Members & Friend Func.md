## Table of Contents

1. [Function Overloading]
2. [Default Arguments]
3. [Constructors]
4. [Destructors]
5. [Stack Implementation]
6. [Static Members]
7. [[#07. Friend Functions]]
---
## 01. Function Overloading

### Definition

Functions in the **same scope** with the **same name** but different parameters (number, type, or order). Return type is **ignored** in overloading.

### Example

```cpp
class Math {
public:
    int Add(int x, int y) {
        return x + y;
    }
    int Add(int x, int y, int z) {
        return x + y + z;
    }
};

int main() {
    Math obj;
    cout << obj.Add(1, 2);      // Calls first Add
    cout << obj.Add(1, 2, 3);   // Calls second Add
}
```

### Memory Diagram

```
Stack Memory:                      Code Segment:
┌──────────────────┐         ┌────────────────────────┐
│  main()          │         │ Math::Add(int,int)     │
│  ┌────────────┐  │         │ Math::Add(int,int,int) │
│  │ obj (Math) │  │         └────────────────────────┘
│  └────────────┘  │          
│                  │ 
│  Add(1,2) call   │
│  Add(1,2,3) call │
└──────────────────┘
```

### Advantages :

- Improves code readability
- Same logical operation uses same name
- Type-safe polymorphism at compile-time
- No need to remember multiple function names

### Disadvantages :

- Can lead to ambiguity with default arguments
- Increases code size (more functions in binary)
- Compiler must do name mangling
- Can confuse developers if overused

### When to Use

- When same operation works on different data types
- Mathematical operations (Add, Multiply, etc.)
- Constructors with different initialization options
- Print/Display functions for different formats

### When NOT to Use

- When functions do fundamentally different things
- When combined with default arguments (causes ambiguity)
- When it makes code less clear

---
## 02. Default Arguments

### Definition

Parameters with default values. Must be specified **from right to left**. If a middle parameter has a default, all parameters to its right must also have defaults.

### Valid Examples

#### Version 1: All Parameters Default

```cpp
class Math {
public:
    int Add(int x = 0, int y = 0, int z = 0) {
        return x + y + z;
    }
};

int main() {
    Math obj;
    cout << obj.Add(1, 2, 3); // 6
    cout << obj.Add(1, 2);    // 3
    cout << obj.Add(1);       // 1
    cout << obj.Add();        // 0
}
```

#### Version 2: Last Two Default

```cpp
class Math {
public:
    int Add(int x, int y = 0, int z = 0) {
        return x + y + z;
    }
};

int main() {
    Math obj;
    cout << obj.Add(1, 2, 3); // 6
    cout << obj.Add(1, 2);    // 3
    cout << obj.Add(1);       // 1
    cout << obj.Add();        // ERROR: x is required
}
```

### Memory Diagram

```
Stack Memory (Add(1)):
┌──────────────────┐
│  Add() frame     │
│  ┌────────────┐  │
│  │ x = 1      │  │
│  │ y = 0      │  │  (default used)
│  │ z = 0      │  │  (default used)
│  └────────────┘  │
│  return = 1      │
└──────────────────┘
```

### Invalid Example :

```cpp
int Add(int x = 0, int y, int z) // ERROR!
{
    return x + y + z;
}
// Error: optional parameters must appear after all required parameters
```

### Ambiguity Problem

```cpp
class Math {
    int Add(int x = 0, int y = 0, int z = 0) {
        return x + y + z;
    }
    int Add(int x, int y) {
        return x + y;
    }
};

int main() {
    Math obj;
    cout << obj.Add(1, 2); // ERROR -> AMBIGUOUS! Which Add to call?
}
```

### Advantages :

- Reduces number of overloaded functions
- Backwards compatibility when adding parameters
- Cleaner API for common use cases
- Less code duplication

### Disadvantages :

- Can cause ambiguity with overloading
- Must follow right-to-left rule
- Can hide bugs if default is wrong
- Less explicit at call site

### When to Use

- Optional configuration parameters
- Functions with sensible defaults
- When most calls use the same values
- Library APIs for backwards compatibility

### When NOT to Use

- When all parameters are equally important
- When no sensible default exists
- Combined with overloading (ambiguity risk)
- When explicit is better than implicit

---
## 03. Constructors

### Definition

Special member function that:

- Has the **same name** as the class
- Has **no return type** (not even void)
- Called **automatically** when object is created
- Can be **overloaded**
- Usually **public** (can be private for design patterns)

### Example with Multiple Constructors

```cpp
class Complex {
private:
    int real;
    int img;
    
public:
    // Default constructor
    Complex() {
        cout << "Complex default ctor\n";
        real = 3;
        img = 4;
    }
    
    // 2-parameter constructor
    Complex(int _real, int _img) {
        cout << "Complex 2p ctor\n";
        real = _real;
        img = _img;
    }
    
    // 1-parameter constructor
    Complex(int _num) {
        cout << "Complex 1p ctor\n";
        real = img = _num;
    }
};

int main() {
    Complex c1;         // Calls default ctor
    Complex c2(5, 6);   // Calls 2p ctor
    Complex c3(7);      // Calls 1p ctor
    
    // Output:
    // Complex default ctor
    // Complex 2p ctor
    // Complex 1p ctor
}
```

### Memory Diagram

```
Stack Memory at each creation:

After Complex c1;      After Complex c2(5, 6);      After Complex c3(7);
┌──────────────────┐    ┌──────────────────┐       ┌──────────────────┐
│  c1              │    │  c2              │       │  c3              │
│  ┌────────────┐  │    │  ┌────────────┐  │       │  ┌────────────┐  │
│  │ real = 3   │  │    │  │ real = 5   │  │       │  │ real = 7   │  │
│  │ img = 4    │  │    │  │ img = 6    │  │       │  │ img = 7    │  │
│  └────────────┘  │    │  └────────────┘  │       │  └────────────┘  │
└──────────────────┘    └──────────────────┘       └──────────────────┘
```

### Default Constructor

- **Implicitly generated** by compiler if:
    - No constructor is explicitly defined
    - Initializes members to garbage values
- **Not generated** if you define any constructor
- After defining any constructor, you must explicitly define default constructor if needed

### Advantages 

- Automatic initialization (no garbage values)
- Multiple ways to initialize objects
- Ensures object is always in valid state
- Can enforce invariants (ثوابت)
- Resource acquisition (RAII pattern)

### Disadvantages 

- Can be forgotten (leading to uninitialized objects)
- Multiple constructors increase code complexity
- Can hide initialization errors
- May be called unintentionally (دون قصد)

### When to Use

- **Always** - every class should have proper constructors
- Resource allocation (memory, files, connections)
- Setting initial valid state
- Complex initialization logic
- Dependency injection

### When NOT to Use

- POD (Plain Old Data) structs with aggregate initialization
- When factory functions are more appropriate
- When default member-wise initialization is sufficient (C++11+)

---
## 04. Destructors

### Definition

Special member function that:

- Has the **same name** as class with `~` (tilde) prefix
- Has **no return type** (not even void)
- **Cannot be overloaded** (only one destructor per class)
- Called **automatically** when object is destroyed
- Must be **public**
- **Implicitly exists** if not defined

### When is Destructor Called?

1. Object goes **out of scope**
2. Object is **explicitly deleted** (for dynamic objects)
3. Program terminates

### Example

```cpp
class Complex {
private:
    int real;
    int img;
    
public:
    Complex() {
        cout << "Complex default ctor\n";
        real = 3;
        img = 4;
    }
    
    Complex(int _real, int _img) {
        cout << "Complex 2p ctor\n";
        real = _real;
        img = _img;
    }
    
    Complex(int _num) {
        cout << "Complex 1p ctor\n";
        real = img = _num;
    }
    
    ~Complex() {
        cout << "Complex destructor\n";
    }
};

int main() {
    Complex c1, c2(5, 6), c3(7);
    
    // Output:
    // Complex default ctor
    // Complex 2p ctor
    // Complex 1p ctor
    // Complex destructor  (c3)
    // Complex destructor  (c2)
    // Complex destructor  (c1)
    
    return 0;
}
```

### Memory Diagram - Object Lifecycle

```
Program Start:
┌────────────┐
│ Stack      │
│ (empty)    │
└────────────┘

After creating c1, c2, c3:
┌────────────┐
│ Stack      │
│ ┌────────┐ │ ← c3 (created last)
│ │ c3     │ │
│ ├────────┤ │
│ │ c2     │ │
│ ├────────┤ │
│ │ c1     │ │ ← c1 (created first)
│ └────────┘ │
└────────────┘

At return 0 (LIFO destruction):
Step 1: ~c3 called
Step 2: ~c2 called
Step 3: ~c1 called
```

### Critical Use Case: Dynamic Memory

```cpp
class Draft {
    int* ptr;
    
public:
    Draft() {
        ptr = new int[5];  // Allocate memory in heap
    }
    
    ~Draft() {
        delete[] ptr;      // MUST free memory
    }
};

void TryMe() {
    Draft o1;
}  // Destructor called here, memory freed

int main() {
    TryMe();  // Memory allocated and freed
    TryMe();  // Memory allocated and freed
    TryMe();  // Memory allocated and freed
    return 0;
}
```

### Memory Diagram - With Dynamic Allocation

```
When Draft object created:
Stack:              Heap:
┌────────────┐     ┌──────────────────┐
│ o1         │     │ int[5] array     │
│ ┌────────┐ │     │ ┌──┬──┬──┬──┬──┐ │
│ │ptr ────┼─┼────→│ │  │  │  │  │  │ │
│ └────────┘ │     │ └──┴──┴──┴──┴──┘ │
└────────────┘     └──────────────────┘

When destructor called:
Stack:              Heap:
┌────────────┐     ┌──────────────────┐
│ (empty)    │     │ (freed)          │
└────────────┘     └──────────────────┘
```

### Advantages 

- Automatic resource cleanup (RAII)
- Prevents memory leaks
- Closes files/connections automatically
- Exception-safe resource management
- No need to remember to cleanup

### Disadvantages 

- Can't fail gracefully (shouldn't throw exceptions)
- Order of destruction can be tricky
- Virtual destructors add overhead
- Can hide resource management complexity

### When to Use (Explicit Destructor)

- **Dynamic memory allocation** (new/delete)
- File handles (fopen/fclose)
- Database connections
- Network sockets
- Mutex locks
- Any acquired resource that needs cleanup

### When NOT to Use (Explicit Destructor)

- Simple POD types (int, float, etc.)
- Classes with only stack-allocated members
- When Rule of Zero applies (use smart pointers)
- When compiler-generated is sufficient (كافٍ)

### Real Purpose of Explicit Destructor

1. **Database connections** - close connection
2. **File operations** - close file handles
3. **Dynamic allocation** - free heap memory
4. **Resource locks** - release mutexes/semaphores
5. **Network sockets** - close connections

---
## 05. Stack Implementation

### Version 1: Static Array (No Dynamic Memory)

```cpp
class Stack {
private:
    int arr[5];
    int tos;  // top of stack
    
public:
    Stack() {
        cout << "Stack ctor\n";
        tos = 0;
    }
    
    ~Stack() {
        cout << "Stack dest\n";
        // Destructor not critical here (no dynamic memory)
    }
    
    void Push(int value) {
        if (tos != 5) {
            arr[tos] = value;
            tos++;
        } else {
            cout << "FULL!!!\n";
        }
    }
    
    int Pop() {
        int result = -123;
        if (tos != 0) {
            tos--;
            result = arr[tos];
        } else {
            cout << "EMPTY!!!\n";
        }
        return result;
    }
};

int main() {
    Stack s1;
    s1.Push(10);//10 
    s1.Push(20);//10 20 
    s1.Push(30);//10 20 30 
    s1.Push(40);//10 20 30 40
    s1.Push(50);//10 20 30 40 50
    s1.Push(60);  // FULL!!!
    s1.Push(70);  // FULL!!!
    
    cout << s1.Pop();  // 50
    cout << s1.Pop();  // 40
    cout << s1.Pop();  // 30
    cout << s1.Pop();  // 20
    cout << s1.Pop();  // 10
    cout << s1.Pop();  // EMPTY!!! -123
    cout << s1.Pop();  // EMPTY!!! -123
}
```

### Memory Diagram - Static Stack

```
Stack Memory:                         After 3 Pops:
┌──────────────────────────┐            ┌──────────────────────────┐
│  s1                      │            │  s1                      │
│  ┌────────────────────┐  │            │  ┌────────────────────┐  │    
│  │ arr[5]             │  │            │  │ arr[5]             │  │
│  │ ┌──┬──┬──┬──┬──┐   │  │            │  │ ┌──┬──┬──┬──┬──┐   │  │ 
│  │ │10│20│30│40│50│   │  │            │  │ │10│20│30│  │  │   │  │  
│  │ └──┴──┴──┴──┴──┘   │  │            │  │ └──┴──┴──┴──┴──┘   │  │
│  │ tos = 5            │  │            │  │ tos = 2            │  │
│  └────────────────────┘  │            │  └────────────────────┘  │  
└──────────────────────────┘            └──────────────────────────┘
After Push(60) - FULL:            │       Note : (40,50 still in memory)
tos = 5 (max capacity reached)    │     
```

### Version 2: Dynamic Array

```cpp
class Stack {
private:
    int* arr;      // Pointer to dynamic array
    int size;      // Capacity
    int tos;       // Current top position
    
public:
    // Default constructor (size = 5)
    Stack() {
        tos = 0;
        size = 5;
        arr = new int[size];
        cout << "Stack def ctor\n";
    }
    
    // Parameterized constructor
    Stack(int _size) {
        tos = 0;
        size = _size;
        arr = new int[size];
        cout << "Stack 1p ctor\n";
    }
    
    // Destructor - CRITICAL for dynamic memory
    ~Stack() {
        // Optional: clear array
        for (int i = 0; i < size; i++) {
            arr[i] = -1;
        }
        
        delete[] arr;  // MUST free memory
        
        cout << "Stack dest\n";
    }
    
    void Push(int value) {
        if (!IsFull()) {
            arr[tos] = value;
            tos++;
        } else {
            cout << "FULL!!!\n";
        }
    }
    
    int Pop() {
        int result = -123;
        if (!IsEmpty()) {
            tos--;
            result = arr[tos];
        } else {
            cout << "EMPTY!!!\n";
        }
        return result;
    }
    
    bool IsFull() { return tos == size; }
    bool IsEmpty() { return tos == 0; }
};
```

### Memory Diagram - Dynamic Stack

```
After Stack s1(10):

Stack:                  Heap:
┌────────────────┐     ┌──────────────────────────┐
│  s1            │     │  Dynamic array (size 10) │
│  ┌──────────┐  │     │  ┌──┬──┬──┬──┬──┬──┬──┐  │
│  │arr ──────┼──┼────→│  │  │  │  │  │  │  │  │  │
│  │size = 10 │  │     │  └──┴──┴──┴──┴──┴──┴──┘  │
│  │tos = 0   │  │     └──────────────────────────┘
│  └──────────┘  │
└────────────────┘

After Push(10), Push(20), Push(30):

Stack:                  Heap:
┌────────────────┐     ┌──────────────────────────┐
│  s1            │     │  Dynamic array (size 10) │
│  ┌──────────┐  │     │  ┌──┬──┬──┬──┬──┬──┬──┐  │
│  │arr ──────┼──┼────→│  │10│20│30│  │  │  │  │  │
│  │size = 10 │  │     │  └──┴──┴──┴──┴──┴──┴──┘  │
│  │tos = 3   │  │     └──────────────────────────┘
│  └──────────┘  │
└────────────────┘

At destructor:
- Loop sets all elements to -1
- delete[] arr frees heap memory
- Stack frame destroyed
```

### Advantages 

- **Encapsulation**: Internal array is hidden
- **LIFO guarantee**: Enforced by design
- **Memory safety**: Bounds checking in Push/Pop
- **Flexible size**: Dynamic version allows any size
- **Clear interface**: Simple Push/Pop operations

### Disadvantages 

- **Fixed size**: Once created, size cannot change
- **Magic number**: Pop returns -123 on empty (not type-safe)
- **No exception handling**: Just prints error
- **Memory overhead**: Dynamic version needs heap allocation
- **Performance**: Heap allocation slower than stack

### When to Use

- Function call management (system stack)
- Expression evaluation (postfix, infix)
- Backtracking algorithms (maze, chess)
- Undo/Redo functionality
- Browser history (back button)
- Parenthesis matching
- Depth-First Search (DFS)

### When NOT to Use

- Need random access to elements
- Need to search/sort frequently
- FIFO behavior required (use Queue)
- Need to insert/delete from middle
- Memory is extremely limited

### Design Improvements

1. **Use exceptions** instead of -123 magic number
2. **Template** for any data type
3. **Dynamic resizing** (like std::vector)
4. **Iterator support** for traversal
5. **Copy constructor** for deep copying

---
## 06. Static Members

### Definition

**Static member variables** (class variables):

- Shared by **all objects** of the class
- Only **one copy** exists in memory (BSS segment)
- Lifetime: **entire program execution**
- Accessed by **class name**, not object name
- Must be **initialized outside class** definition

### Example: Counter for Live Objects

```cpp
class Stack {
private:
    int* arr;
    int size;
    int tos;
    static int counter;  // Declaration only
    
public:
    // Static getter (can be called without object)
    static int GetCounter() {
        return counter;
    }
    
    Stack() {
        counter++;  // Increment on construction
        tos = 0;
        size = 5;
        arr = new int[size];
        cout << "Stack def ctor\n";
    }
    
    Stack(int _size) {
        counter++;  // Increment on construction
        tos = 0;
        size = _size;
        arr = new int[size];
        cout << "Stack 1p ctor\n";
    }
    
    ~Stack() {
        counter--;  // Decrement on destruction
        delete[] arr;
        cout << "Stack dest\n";
    }
};

// MUST initialize static member outside class
int Stack::counter = 0;

int main() {
    Stack s1, s2(10), s3;
    
    // Wrong way (doesn't make sense semantically)
    cout << s1.GetCounter();  // 3
    
    // Correct way
    cout << Stack::GetCounter();  // 3
    
    return 0;
}
```

### Memory Diagram - Static Members

```
BSS Segment (Global/Static Storage):
┌────────────────────────┐
│ Stack::counter = 0     │ ← ONE copy for ALL objects
└────────────────────────┘

After Stack s1, s2(10), s3:

BSS Segment:
┌────────────────────────┐
│ Stack::counter = 3     │ ← Shared by s1, s2, s3
└────────────────────────┘

Stack Memory:
┌────────────────┐
│  s1            │
│  ┌──────────┐  │
│  │arr → heap│  │
│  │size = 5  │  │
│  │tos = 0   │  │
│  └──────────┘  │
├────────────────┤
│  s2            │
│  ┌──────────┐  │
│  │arr → heap│  │
│  │size = 10 │  │
│  │tos = 0   │  │
│  └──────────┘  │
├────────────────┤
│  s3            │
│  ┌──────────┐  │
│  │arr → heap│  │
│  │size = 5  │  │
│  │tos = 0   │  │
│  └──────────┘  │
└────────────────┘

Note: counter is NOT inside any object!
```

### Static Member Functions

```cpp
class Stack {
    static int counter;
    
public:
    // Static function - no 'this' pointer
    static int GetCounter() {
        return counter;  // Can only access static members
        // return tos;   // ERROR! Cannot access non-static
    }
};

// Called without object
int count = Stack::GetCounter();
```

### Advantages 

- **Shared state** across all instances
- **Memory efficient** (one copy, not per object)
- **Class-level operations** (factory methods, counters)
- **No object needed** for static functions
- **Global-like access** with class scope protection

### Disadvantages 

- **Not thread-safe** by default
- **Hidden dependencies** (global state issues)
- **Testing difficulty** (shared mutable state)
- **Cannot be virtual**
- **Must initialize outside class** (extra step)

### When to Use

- **Object counting** (live instances, total created)
- **Shared configuration** (max size, limits)
- **Factory methods** (create objects)
- **Singleton pattern** implementation
- **Utility functions** (Math::Abs, String::Compare)
- **Constants** (static const members)

### When NOT to Use

- When data should be per-instance
- When thread safety is critical (without synchronization)
- When testing requires isolation
- When polymorphism is needed (can't be virtual)

### Common Use Cases

1. **Connection pools** (database, network)
2. **Caching** (shared cache across instances)
3. **ID generation** (auto-increment IDs)
4. **Configuration** (app-wide settings)
5. **Resource limits** (max memory, connections)

---
## 07. Friend Functions

### Definition

**Friend function**:
- **Standalone function** (not a member)
- Can access **private and protected members** of class
- Declared inside class with `friend` keyword
- Defined outside class (normal function)
- **Not inherited** by derived classes
- Breaks encapsulation (use sparingly)

### Example

```cpp
class Stack {
private:
    int* arr;
    int size;
    int tos;
    
public:
    Stack(int _size) {
        tos = 0;
        size = _size;
        arr = new int[_size];
    }
    
    ~Stack() {
        delete[] arr;
    }
    
    void Push(int value) {
        if (!IsFull()) {
            arr[tos++] = value;
        }
    }
    
    bool IsFull() { return tos == size; }
    bool IsEmpty() { return tos == 0; }
    
    // Friend declaration
    friend void ViewStack(Stack param);
};

// Friend function definition (standalone)
void ViewStack(Stack param) {
    // Can access private members!
    for (int i = 0; i < param.tos; i++) {
        cout << param.arr[i] << endl;
    }
}

int main() {
    Stack s1(10);
    s1.Push(10);
    s1.Push(20);
    s1.Push(30);
    
    ViewStack(s1);  // Works! Can access private members
}
```

### Memory Diagram - Friend Function Access

```
Stack Memory during ViewStack(s1):

┌────────────────────────────────┐
│  main()                        │
│  ┌──────────┐                  │
│  │ s1       │                  │
│  │ arr → ┐  │                  │
│  │ tos=3 │  │                  │
│  └───────┼──┘                  │
│          │                     │
│          ↓                     │
│  ┌────────────────────┐        │
│  │ Heap: [10][20][30] │        │
│  └────────────────────┘        │
├────────────────────────────────┤
│  ViewStack(Stack param)        │
│  ┌──────────┐                  │
│  │ param    │ ← COPY of s1     │
│  │ arr → ┐  │                  │
│  │ tos=3 │  │   SHALLOW COPY   │
│  └───────┼──┘   Same arr!      │
│          │                     │
│          ↓                     │
│  ┌───────────────────┐         │
│  │ Heap: [10][20][30]│ ← SAME! │
│  └───────────────────┘         │
└────────────────────────────────┘
```

### Critical Problem with Friend Function

```cpp
void ViewStack(Stack param) {  // Pass by VALUE
    // Creates COPY of Stack
    // arr pointer is copied (shallow copy)
    // When function ends, param's destructor called
    // delete[] arr executed
    // ORIGINAL s1.arr now points to freed memory!
}

int main() {
    Stack s1(10);
    s1.Push(10);
    s1.Push(20);
    
    ViewStack(s1);  // Works fine
    ViewStack(s1);  // CRASH! arr already deleted
}
```

### Memory Diagram - The Problem

```
Before ViewStack(s1):
┌────────────┐     ┌──────────────┐
│ s1.arr ────┼────→│ [10][20]     │
└────────────┘     └──────────────┘

During ViewStack (param created):
┌────────────┐     ┌──────────────┐
│ s1.arr ────┼────→│ [10][20]     │
│            │     │              │
│ param.arr ─┼─────┘ ← Same pointer!
└────────────┘

After ViewStack returns (~param called):
┌────────────┐     ┌──────────────┐
│ s1.arr ────┼─╳──→│ [FREED]      │ ← Dangling pointer!
└────────────┘     └──────────────┘

Second ViewStack(s1) call:
- Tries to access freed memory
- UNDEFINED BEHAVIOR / CRASH
```

### Solution: 
 **[1] Pass by Reference:**

```cpp
friend void ViewStack(const Stack& param);

void ViewStack(const Stack& param) {
    // No copy, no destructor call on param
    for (int i = 0; i < param.tos; i++) {
        cout << param.arr[i] << endl;
    }
}
```

 **[2] Deep Copy Constructor:**
 ```cpp
class Stack 
{
	//code
	
	//constructor : 
	Stack(const Stack& other) {
	    size = other.size;
	    tos = other.tos;
	    arr = new int[size];
	    for (int i = 0; i <= tos; ++i)
	        arr[i] = other.arr[i];
	}

	//code

};

//pass by value
void ViewStack(Stack param) {
    // yes copy, yes destructor call on param for new copy of object
    for (int i = 0; i < param.tos; i++) {
        cout << param.arr[i] << endl;
    }
}


```

 **Note : copy constructor To demonstrate shallow copy => Fail 
 ```cpp
class Stack 
{
	//code
	
	//constructor : 
	Stack(const Stack& other) {
	    size = other.size;
	    tos = other.tos;
	    arr = other.arr;
	}

	//code

};

//pass by value
void ViewStack(Stack param) {
    // yes copy, yes destructor call on param for new copy of object
    for (int i = 0; i < param.tos; i++) {
        cout << param.arr[i] << endl;
    }
}
```

### Advantages 

- **Operator overloading** (cout << obj)
- **Two classes** need mutual access
- **Testing/debugging** (inspect private state)
- **Performance** (direct access, no getter/setter overhead)
- **Special relationships** between classes

### Disadvantages 

- **Breaks encapsulation** (violates OOP principles)
- **Tight coupling** (friend knows internal details)
- **Not inherited** (not reusable in derived classes)
- **Maintenance burden** (changes require friend updates)

---
### <span style="color:#3498db">Created By Abdullah Ali</span>
***
## <span style="color:#27ae60;font:300px;align-items:center">وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ﴾ [هود: 88] ﴿ </span>



post linkedin 

**هنتكلم النهارده عن مفهوم مهم جدًا في الـ C++ والـ OOP: الفرق بين Shallow Copy و Deep Copy.**


 **أولاً: Shallow Copy ((defualt copy))**

- بيعمل نسخة “سطحية” من الكائن — يعني بيـنسخ القيم العادية اللي في الـ stack (زي `int x = 5`)،  
    لكن لو فيه `pointer` أو `reference` فهو بيـنسخ **العنوان فقط**، مش البيانات اللي وراه.
    
- أي تعديل أو حذف في النسخة الجديدة هيتأثر بيه الكائن الأصلي لأنها بتشاور على نفس المكان في الذاكرة.
    
- الميزة الوحيدة إنها **سريعة جدًا** لأنها مجرد نسخ للعناوين.


 **ثانيًا: Deep Copy**

- بيعمل نسخة “عميقة” حقيقية من الكائن — يعني بينسخ **البيانات نفسها** مش مجرد المؤشرات.
    
- بالتالي لو عدّلت أو حذفت حاجة في النسخة الجديدة، الكائن الأصلي **مش هيتأثر** نهائيًا.
    
- دي ميزة قوية جدًا في الكائنات اللي فيها مؤشرات ديناميكية.
    
- عيبها الوحيد إنها **أبطأ** شوية لأنها بتتعامل مع ذاكرة جديدة.
-