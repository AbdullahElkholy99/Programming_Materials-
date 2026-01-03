## Table of Contents
 - [ ] *01- Association (Very Loosely Coupled)
 - [ ] *02- Aggregation (Loosely Coupled)
 - [ ] *03- Composition (Tightly Coupled)
 - [ ] *04- Composition vs Aggregation
 - [ ] *05- Memory Diagrams
 - [ ] *06- Best Practices
 - [ ] *07- Common Pitfalls
 - [ ] *08- Design Decision Guide
 - [ ] *09- Real-World Examples
 - [ ] *10- Summary*
---
## 01- Association (Very Loosely Coupled)

**Characteristics:**

- Peer-to-peer relationship
- Temporary connection
- Uses **pointer** to reference other class
- No ownership or dependency

**Example:**

```cpp
class Teacher {
    int id, age;
    string name;
    Subject* sub;  // Pointer (can be NULL)
};

class Subject {
    string name;
    int credits;
};
```

**Cardinality:** 0-1, 1-1, 1-M, M-M

**Memory Diagram:**

```
Teacher t1:                  Subject s1: 0x5000
┌──────────────┐            ┌──────────────┐
│ id: 101      │            │ name: "Math" │
│ name: "John" │            │ credits: 3   │
│ sub: 0x5000  │───────────→└──────────────┘
└──────────────┘            
                            Subject exists independently
                            Teacher just references it
```

## 02. Aggregation (Loosely Coupled)

#### What is Aggregation?

**Aggregation** (also called **Association**) is a #HAS-A relationship where one class contains references or pointers to objects of another class. The contained objects can exist independently of the container.

**Characteristics:**

- Whole vs. Part relationship
- Temporary relationship
- Uses **pointer** to reference
- No complete dependency -> Weak relationship

### Simple Definition:

```
Class A "HAS-A" Class B
Example: Picture HAS-A Line (but Line can exist without Picture)
```

**Example:**

```cpp
class Student {
    int id, age;
    string name;
    Department* dept;  // Pointer allocated in constructor
    
    Student() {
        dept = new Department[1];
    }
};

class Department {
    string name;
    int capacity;
};
```

**Cardinality:** 0-1, 1-1, 1-M, M-M

**Memory Diagram:**

```
Student s1:                  Department d1:
┌──────────────┐            ┌──────────────────┐
│ id: 201      │            │ name: "CS"       │
│ name: "Ali"  │            │ capacity: 100    │
│ dept: 0x6000 │───────────→└──────────────────┘
└──────────────┘            
                            Department can exist without Student
                            But Student creates it
```

### Aggregation vs Inheritance

|Aspect|Inheritance (IS-A)|Aggregation (HAS-A)|
|---|---|---|
|**Relationship**|Circle IS-A Shape|Car HAS-A Engine|
|**Coupling**|Tight (strong dependency)|Loose (weak dependency)|
|**Lifetime**|Child dies with parent|Objects independent|
|**Flexibility**|Fixed at compile-time|Can change at runtime|
|**Reusability**|Limited to hierarchy|High reusability|
|**Syntax**|`class Child : public Parent`|`Class* ptr;`|

### Implementation Examples

#### Example 1: Point Class (Building Block)

```cpp
class Point {
private:
    int x;
    int y;

public:
    void SetX(int _x) { x = _x; }
    int GetX() { return x; }
    void SetY(int _y) { y = _y; }
    int GetY() { return y; }
    
    Point() {
        x = y = 0;
        cout << "Point default constructor\n";
    }
    
    Point(int _x, int _y) {
        x = _x;
        y = _y;
        cout << "Point 2-param constructor\n";
    }
    
    ~Point() {
        cout << "Point destructor\n";
    }
    
    Point(const Point& old) {
        x = old.x;
        y = old.y;
        cout << "Point copy constructor\n";
    }
};
```

---

#### Example 2: Line Class (Composition)

**Line HAS-A Point** (Composition - strong ownership)

```cpp
class Line {
private:
    Point start;  // Composition: Line owns these Points
    Point end;    // Points die when Line dies

public:
    void SetStart(Point _start) { start = _start; }
    Point GetStart() { return start; }
    void SetEnd(Point _end) { end = _end; }
    Point GetEnd() { return end; }
    
    Line() {
        cout << "Line default constructor\n";
    }
    
    Line(int x1, int y1, int x2, int y2) {
        start.SetX(x1);
        start.SetY(y1);
        end.SetX(x2);
        end.SetY(y2);
        cout << "Line 4-param constructor\n";
    }
    
    ~Line() {
        cout << "Line destructor\n";
    }
    
    Line(const Line& old) {
        start = old.start;
        end = old.end;
        cout << "Line copy constructor\n";
    }
    
    void PrintLine() {
        cout << "Start (" << start.GetX() << "," << start.GetY() << ") ";
        cout << "End (" << end.GetX() << "," << end.GetY() << ")\n";
    }
};
```

**Memory Layout:**

```
Line object:
┌──────────────┐
│    Line      │
├──────────────┤
│ start:       │
│   x: 1       │
│   y: 2       │
├──────────────┤
│ end:         │
│   x: 3       │
│   y: 4       │
└──────────────┘
Total: 16 bytes (4 ints)
```

---

#### Example 3: Rectangle Class (Composition)

**Rectangle HAS-A Point** (Composition)

```cpp
class Rect {
private:
    Point ul;  // Upper-left corner (owned by Rect)
    Point lr;  // Lower-right corner (owned by Rect)

public:
    void SetUL(Point _ul) { ul = _ul; }
    Point GetUL() { return ul; }
    void SetLR(Point _lr) { lr = _lr; }
    Point GetLR() { return lr; }
    
    Rect() {
        cout << "Rect default constructor\n";
    }
    
    // Better: Initialize Points directly using member initializer list
    Rect(int x1, int y1, int x2, int y2) 
        : ul(x1, y1), lr(x2, y2) {
        cout << "Rect 4-param constructor\n";
    }
    
    ~Rect() {
        cout << "Rect destructor\n";
    }
    
    Rect(const Rect& old) {
        ul = old.ul;
        lr = old.lr;
        cout << "Rect copy constructor\n";
    }
    
    void PrintRect() {
        cout << "Upper-Left (" << ul.GetX() << "," << ul.GetY() << ") ";
        cout << "Lower-Right (" << lr.GetX() << "," << lr.GetY() << ")\n";
    }
};
```

**Constructor Order:**

```
Rect r1(1, 2, 3, 4);

Execution:
1. Point constructor (ul) → x=1, y=2
2. Point constructor (lr) → x=3, y=4
3. Rect constructor body

Destruction (reverse order):
1. Rect destructor
2. Point destructor (lr)
3. Point destructor (ul)
```

---

#### Example 4: Picture Class (Aggregation)

**Picture HAS-A Line** (Aggregation - weak ownership)

```cpp
class Picture {
private:
    Line* lPtr;   // Pointer to array (doesn't own)
    int lSize;    // Number of lines
    // Could also have: Rect* rPtr, Circle* cPtr, etc.

public:
    Picture() {
        lPtr = NULL;
        lSize = 0;
        cout << "Picture constructor\n";
    }
    
    // Set relationship - Picture doesn't create or destroy Lines
    void SetLines(Line* _lPtr, int _lSize) {
        lPtr = _lPtr;
        lSize = _lSize;
    }
    
    // Remove relationship
    void RemoveLines() {
        lPtr = NULL;
        lSize = 0;
    }
    
    // Use the aggregated objects
    void Execute() {
        for (int i = 0; i < lSize; i++) {
            lPtr[i].PrintLine();
        }
    }
    
    ~Picture() {
        // Notice: Picture does NOT delete lPtr
        // Lines exist independently
        cout << "Picture destructor\n";
    }
};
```

**Usage Example:**

```cpp
int main() {
    // Create Lines independently
    Line larr[3] = {
        Line(1, 2, 3, 4),
        Line(),
        Line()
    };
    
    // Create Picture
    Picture p1;
    
    // Set relationship between Picture and Lines
    p1.SetLines(larr, 3);
    
    // Use the relationship
    p1.Execute();  // Prints all 3 lines
    
    // Remove relationship
    p1.SetLines(NULL, 0);
    
    // Lines still exist here!
    larr[0].PrintLine();  // Still works
    
    return 0;
    // Lines destroyed here (not by Picture)
}
```


### Pros and Cons

#### Advantages of Aggregation

1. **Loose Coupling**
    
    - Objects are independent
    - Changes in one don't affect others
    - Easy to maintain
2. **Flexibility**
    
    - Can change relationships at runtime
    - Can add/remove associations dynamically
    - Not fixed at compile-time
3. **Reusability**
    
    - Objects can be shared between multiple containers
    - Same Line can be in multiple Pictures
    - Better code reuse
4. **Memory Management**
    
    - Objects created where needed
    - Can be allocated on stack or heap
    - Better control over lifecycle
5. **Testing**
    
    - Easy to test objects independently
    - Can mock aggregated objects
    - Better unit testing
6. **Scalability**
    
    - Can aggregate any number of objects
    - Dynamic sizing (arrays, vectors)
    - Grow/shrink at runtime

#### Disadvantages of Aggregation

1. **Complexity**
    
    - Need to manage pointers carefully
    - Risk of dangling pointers
    - More complex than direct members
2. **Memory Leaks**
    
    - Easy to forget who owns what
    - Need clear ownership rules
    - Careful with dynamic allocation
3. **Null Pointer Risk**
    
    - Pointers can be NULL
    - Must check before use
    - Runtime errors possible
4. **Performance**
    
    - Pointer indirection overhead
    - Cache misses (scattered memory)
    - Slower than direct members
5. **Responsibility Confusion**
    
    - Who creates objects?
    - Who destroys objects?
    - Needs clear documentation

---

### When to Use

#### USE Aggregation When:

1. **Objects Exist Independently**
    
    ```cpp
    Department HAS-A Employee  ✓
    Picture HAS-A Line         ✓
    Library HAS-A Book         ✓
    ```
    
2. **Shared Relationships**
    
    - One object belongs to multiple containers
    - Example: Student in multiple Courses
3. **Runtime Relationships**
    
    - Need to change associations dynamically
    - Add/remove objects at runtime
4. **Large Objects**
    
    - Objects are expensive to copy
    - Better to reference than duplicate
5. **Optional Relationships**
    
    - Objects may or may not exist
    - Example: Picture may have 0 to N lines
#### AVOID Aggregation When:

1. **Strong ownership needed** → Use Composition
2. **Objects are simple** → Use direct members
3. **No need for flexibility** → Use Composition
4. **Performance critical** → Consider direct members
---

## 03- Composition (Tightly Coupled)

**Characteristics:**

- Complete ownership (HAS-A relationship)
- Permanent relationship
- Uses **object** (not pointer) as member
- Complete dependency - part can't exist without whole
- Container creates and destroys objects
- Objects cannot exist without container

#Example01: `House HAS-A Room`

```cpp
class House {
    Room rooms[5];  // Direct objects - dies with House
};
```

**Example02:**

```cpp
class Room {
    Wall w1;  // Objects, not pointers
    Wall w2;
    Wall w3;
    Wall w4;
};

class Wall {
    int height, width;
    string color;
};
```

**Cardinality:** 1-1, 1-M

**Memory Diagram:**

```
Room r1:
┌────────────────────────────────────┐
│ w1: ┌──────────────┐               │
│     │ height: 10   │               │
│     │ width: 8     │               │
│     └──────────────┘               │
│                                    │
│ w2: ┌──────────────┐               │
│     │ height: 10   │               │
│     │ width: 12    │               │
│     └──────────────┘               │
│                                    │
│ w3: ┌──────────────┐               │
│     │ height: 8    │               │
│     └──────────────┘               │
│                                    │
│ w4: ┌──────────────┐               │
│     │ height: 8    │               │
│     └──────────────┘               │
└────────────────────────────────────┘

Walls are INSIDE Room
If Room is destroyed, all Walls are destroyed
Walls cannot exist independently
```

### Comparison Table

|Feature|Association|Aggregation|Composition|
|---|---|---|---|
|**Coupling**|Very Loose|Loose|Tight|
|**Relationship**|Peer-to-peer|Whole-Part|Ownership|
|**Duration**|Temporary|Temporary|Permanent|
|**Implementation**|Pointer|Pointer|Object|
|**Dependency**|None|None|Complete|
|**Cardinality**|0-1, 1-1, 1-M, M-M|0-1, 1-1, 1-M, M-M|1-1, 1-M|
|**Example**|Teacher-Subject|Student-Department|Room-Wall|

### Complete #Example: Composition

#### Point Class

```cpp
class Point {
private:
    int x, y;
public:
    Point() : x(0), y(0) {
        cout << "Point default ctor\n";
    }
    
    Point(int _x, int _y) : x(_x), y(_y) {
        cout << "Point 2p ctor\n";
    }
    
    ~Point() {
        cout << "Point destructor\n";
    }
    
    Point(const Point& old) : x(old.x), y(old.y) {
        cout << "Point copy ctor\n";
    }
    
    void SetX(int _x) { x = _x; }
    int GetX() const { return x; }
    void SetY(int _y) { y = _y; }
    int GetY() const { return y; }
};
```

#### Line Class

```cpp
class Line {
private:
    Point start;
    Point end;
public:
    Line() {
        cout << "Line default ctor\n";
    }
    
    Line(int x1, int y1, int x2, int y2) {
        start.SetX(x1);
        start.SetY(y1);
        end.SetX(x2);
        end.SetY(y2);
        cout << "Line 4p ctor\n";
    }
    
    ~Line() {
        cout << "Line destructor\n";
    }
    
    void PrintLine() {
        cout << "Start: (" << start.GetX() << "," 
             << start.GetY() << ") End: (" 
             << end.GetX() << "," << end.GetY() << ")\n";
    }
};
```

#### Rectangle Class (with Constructor Chaining)

```cpp
class Rect {
private:
    Point ul;  // Upper-left
    Point lr;  // Lower-right
public:
    Rect() {
        cout << "Rect default ctor\n";
    }
    
    Rect(int x1, int y1, int x2, int y2)
    : ul(x1, y1), lr(x2, y2)  // Constructor chaining
    {
        cout << "Rect 4p ctor\n";
    }
    
    ~Rect() {
        cout << "Rect destructor\n";
    }
    
    void PrintRect() {
        cout << "UL: (" << ul.GetX() << "," 
             << ul.GetY() << ") LR: (" 
             << lr.GetX() << "," << lr.GetY() << ")\n";
    }
};
```

### Execution Example

```cpp
int main() {
    {
        Rect r1(1, 2, 3, 4);
        r1.PrintRect();
    }
    return 0;
}
```

**Output:**

```
Point 2p ctor        // ul constructed
Point 2p ctor        // lr constructed
Rect 4p ctor         // Rect body executed
UL: (1,2) LR: (3,4)  // PrintRect output
Rect destructor      // r1 being destroyed
Point destructor     // lr destroyed (LIFO)
Point destructor     // ul destroyed (LIFO)
```

### Destruction Order (LIFO - Last In, First Out)

```
Construction Order:
1. Point ul
2. Point lr
3. Rect

Destruction Order (Reverse):
1. Rect
2. Point lr
3. Point ul

┌────────────────────────────────────┐
│ This is AUTOMATIC and guaranteed   │
│ by C++ language rules              │
└────────────────────────────────────┘
```

### What relation should I use?

```
How are my classes related?
│
├─ One class COMPLETELY OWNS another
│   (Room owns Walls)
│   └─ Use COMPOSITION (object member)
│
├─ One class HAS another temporarily
│   (Student has Department)
│   └─ Use AGGREGATION (pointer member)
│
└─ Classes just reference each other
    (Teacher knows about Subject)
    └─ Use ASSOCIATION (pointer member)
```

#### USE Composition When:

1. **Objects Cannot Exist Alone**
    
    ```cpp
    Car HAS-A Engine   ✓ (Composition)
    House HAS-A Room   ✓ (Composition)
    Body HAS-A Heart   ✓ (Composition)
    ```
    
2. **Strong Ownership**
    
    - Container fully controls object lifecycle
    - Objects created and destroyed with container
3. **Permanent Relationships**
    
    - Fixed at compile-time
    - Won't change during execution
4. **Small Objects**
    
    - Objects are cheap to embed
    - Better performance with direct members


---
## 04- Composition vs Aggregation

### Composition (Strong Ownership)

**Characteristics:**

- Container **owns** the objects
- Objects created **inside** the container
- Objects **die** when container dies
- **Direct object members** (not pointers)

**Example:**

```cpp
class Car {
    Engine engine;     // Composition: Car owns Engine
    Wheel wheels[4];   // Composition: Car owns Wheels
};
// Engine and Wheels die when Car dies
```

**Real-world:** House and Rooms, Car and Engine

### Aggregation (Weak Ownership)

**Characteristics:**

- Container **references** objects
- Objects created **outside** the container
- Objects **survive** when container dies
- **Pointers or references** to objects

**Example:**

```cpp
class Department {
    Employee* employees;  // Aggregation: Dept references Employees
    int count;
};
// Employees exist independently of Department
```

**Real-world:** Department and Employees, Picture and Lines
### Comparison Table

|Feature|Composition|Aggregation|
|---|---|---|
|**Relationship**|Strong HAS-A|Weak HAS-A|
|**Ownership**|Full ownership|No ownership|
|**Lifetime**|Dependent|Independent|
|**Creation**|Inside container|Outside container|
|**Destruction**|Container destroys|Container doesn't destroy|
|**Implementation**|Direct members|Pointers/References|
|**Example**|`Engine engine;`|`Engine* enginePtr;`|
|**UML Diamond**|Filled (◆)|Empty (◇)|

---
## 05- Memory Diagrams

### 1. Composition Example (Line with Points)

```cpp
Line line1(1, 2, 3, 4);

Stack Memory:
┌─────────────────────┐
│      line1          │
├─────────────────────┤
│ start:              │
│   x: 1              │ ◄─── Embedded object
│   y: 2              │
├─────────────────────┤
│ end:                │
│   x: 3              │ ◄─── Embedded object
│   y: 4              │
└─────────────────────┘
Total: 16 bytes
All memory contiguous
Points die when Line dies
```

---
### 2. Aggregation Example (Picture with Lines)

```cpp
Line larr[3];
Picture p1;
p1.SetLines(larr, 3);

Stack Memory:
┌─────────────────────┐        ┌─────────────────────┐
│       p1            │        │     larr[0]         │
├─────────────────────┤        ├─────────────────────┤
│ lPtr: 0x1000   ────────────→ │ start: Point(1,2)   │
│ lSize: 3            │        │ end: Point(3,4)     │
└─────────────────────┘        ├─────────────────────┤
                               │     larr[1]         │
                               ├─────────────────────┤
                               │ start: Point(0,0)   │
                               │ end: Point(0,0)     │
                               ├─────────────────────┤
                               │     larr[2]         │
                               ├─────────────────────┤
                               │ start: Point(0,0)   │
                               │ end: Point(0,0)     │
                               └─────────────────────┘

Notice:
- Picture only stores pointer and size
- Lines exist independently
- Lines survive if Picture is destroyed
```

---
### 3. Constructor/Destructor Order

#### Composition (Line with Points):

```cpp
Line line1(1, 2, 3, 4);

Construction:
┌─────────────────────────┐
│ 1. Point ctor (start)   │ → x=1, y=2
│ 2. Point ctor (end)     │ → x=3, y=4
│ 3. Line ctor body       │
└─────────────────────────┘

Destruction (reverse):
┌─────────────────────────┐
│ 1. Line destructor      │
│ 2. Point dest (end)     │
│ 3. Point dest (start)   │
└─────────────────────────┘
```

#### Aggregation (Picture with Lines):

```cpp
Line larr[3];
Picture p1;
p1.SetLines(larr, 3);

Construction:
┌─────────────────────────┐
│ 1. Point ctors (larr)   │ → 6 Points created
│ 2. Line ctors (larr)    │ → 3 Lines created
│ 3. Picture ctor         │ → Just sets pointer
└─────────────────────────┘

Destruction:
┌─────────────────────────┐
│ 1. Picture dest         │ → Doesn't touch Lines!
│ 2. Line dests (larr)    │ → Lines destroyed
│ 3. Point dests          │ → Points destroyed
└─────────────────────────┘

Key: Picture destructor does NOT destroy Lines
```

---
### 4. Rectangle with Composition

```cpp
Rect r1(10, 20, 100, 150);

Memory Layout:
┌─────────────────────┐
│        r1           │
├─────────────────────┤
│ ul (Point):         │
│   x: 10             │ ◄─── Upper-left corner
│   y: 20             │
├─────────────────────┤
│ lr (Point):         │
│   x: 100            │ ◄─── Lower-right corner
│   y: 150            │
└─────────────────────┘
Total: 16 bytes
Contiguous memory
Points embedded in Rect
```

---

### 5. Dynamic Aggregation

```cpp
Line* linesHeap = new Line[5];
Picture p1;
p1.SetLines(linesHeap, 5);

Stack:                    Heap:
┌─────────────────┐      ┌─────────────────┐
│       p1        │      │  Line[0]        │ @ 0x2000
├─────────────────┤      ├─────────────────┤
│ lPtr: 0x2000 ────────→ │  Line[1]        │
│ lSize: 5        │      ├─────────────────┤
└─────────────────┘      │  Line[2]        │
                         ├─────────────────┤
                         │  Line[3]        │
                         ├─────────────────┤
                         │  Line[4]        │
                         └─────────────────┘

Important: 
- Someone must call: delete[] linesHeap;
- Picture does NOT delete them
- Clear ownership needed!
```

---
### 6. Null Pointer Scenario

```cpp
Picture p1;  // lPtr = NULL, lSize = 0

Memory:
┌─────────────────┐
│       p1        │
├─────────────────┤
│ lPtr: NULL      │ ──→ (nowhere)
│ lSize: 0        │
└─────────────────┘

p1.Execute();  // Must check: if (lPtr != NULL)
```

---
### 7. Shared Aggregation

```cpp
Line shared(1, 2, 3, 4);
Picture p1, p2;
p1.SetLines(&shared, 1);
p2.SetLines(&shared, 1);

Memory:
┌──────────────┐      ┌──────────────────┐
│     p1       │      │    shared        │
├──────────────┤      ├──────────────────┤
│ lPtr ───────────┬──→│ start: (1,2)     │
│ lSize: 1     │  │   │ end: (3,4)       │
└──────────────┘  │   └──────────────────┘
                  │         ↑
┌──────────────┐   │         │
│     p2       │   │         │
├──────────────┤   │         │
│ lPtr ────────────┘         │
│ lSize: 1     │             │
└──────────────┘             │

Both Pictures reference same Line!
```

---
## 06-Best Practices

### 1. Use Member Initializer Lists (Composition)

```cpp
// ✗ Bad
Rect(int x1, int y1, int x2, int y2) {
    ul.SetX(x1);  // Inefficient: Points already constructed
    ul.SetY(y1);
    lr.SetX(x2);
    lr.SetY(y2);
}

// ✓ Good
Rect(int x1, int y1, int x2, int y2) 
    : ul(x1, y1), lr(x2, y2) {
    // Points constructed directly with values
}
```

### 2. Check NULL Pointers (Aggregation)

```cpp
// ✗ Dangerous
void Execute() {
    for (int i = 0; i < lSize; i++) {
        lPtr[i].PrintLine();  // Crash if lPtr is NULL!
    }
}

// ✓ Safe
void Execute() {
    if (lPtr != NULL) {
        for (int i = 0; i < lSize; i++) {
            lPtr[i].PrintLine();
        }
    }
}
```

### 3. Clear Ownership Rules

```cpp
class Picture {
private:
    Line* lPtr;  // Picture does NOT own these Lines
    
public:
    // Document: Caller retains ownership
    void SetLines(Line* lines, int count) {
        lPtr = lines;
        lSize = count;
    }
    
    ~Picture() {
        // Do NOT delete lPtr (we don't own it)
    }
};
```

### 4. Provide Relationship Management

```cpp
class Picture {
public:
    // Set relationship
    void SetLines(Line* lines, int count);
    
    // Remove relationship
    void RemoveLines() {
        lPtr = NULL;
        lSize = 0;
    }
    
    // Query relationship
    bool HasLines() const {
        return lPtr != NULL && lSize > 0;
    }
};
```

---

## 07- Common Pitfalls

### 1. Dangling Pointers

```cpp
// ✗ DANGER!
Picture p1;
{
    Line temp(1, 2, 3, 4);
    p1.SetLines(&temp, 1);
}  // temp destroyed here
p1.Execute();  // ✗ Crash! Accessing dead object
```

### 2. Memory Leaks

```cpp
// ✗ Leak!
Line* lines = new Line[10];
Picture p1;
p1.SetLines(lines, 10);
// Forgot: delete[] lines; ← Memory leak!
```

### 3. Confusion About Ownership

```cpp
// ✗ Who owns the Lines?
class Picture {
    Line* lPtr;
    ~Picture() {
        delete[] lPtr;  // ← Is this correct?
    }
};
// Need clear documentation!
```

---

## 08- Design Decision Guide

```
Need to represent "HAS-A" relationship?
│
├─→ Objects die together?
│   └─→ YES: Use Composition (direct members)
│       Example: Car has Engine
│
└─→ Objects exist independently?
    └─→ YES: Use Aggregation (pointers/references)
        Example: Department has Employees
```

---
## 09- Real-World Examples

### 1. University System

```cpp
// Composition: Course owns Assignments
class Course {
    Assignment assignments[10];  // Die with course
};

// Aggregation: Course references Students
class Course {
    Student* enrolledStudents;  // Students independent
    int count;
};
```

### 2. Graphics System

```cpp
// Composition: Shape owns properties
class Shape {
    Color color;     // Die with shape
    Point position;  // Die with shape
};

// Aggregation: Canvas references Shapes
class Canvas {
    Shape** shapes;  // Shapes can exist elsewhere
    int shapeCount;
};
```

### 3. Company Structure

```cpp
// Composition: Department owns Budget
class Department {
    Budget budget;  // Budget specific to this dept
};

// Aggregation: Department references Employees
class Department {
    Employee** staff;  // Employees can change depts
    int staffCount;
};
```

---

## 10- Summary

### Key Points

| Aspect       | Composition    | Aggregation  |
| ------------ | -------------- | ------------ |
| **Symbol**   | ◆ (filled)     | ◇ (empty)    |
| **Strength** | Strong         | Weak         |
| **Lifetime** | Together       | Independent  |
| **Syntax**   | `Type member;` | `Type* ptr;` |
| **Example**  | Car-Engine     | Library-Book |

### When to Choose

- **Composition**: Objects form a whole (Car-Engine)
- **Aggregation**: Objects are associated (Department-Employee)
- **Inheritance**: Objects are specialized (Circle-Shape)

### Memory Rule of Thumb

- **Composition**: Contiguous memory, better performance
- **Aggregation**: Scattered memory, more flexible

---

---
### <span style="color:#3498db">Created By Abdullah Ali</span>
***
## <span style="color:#27ae60;font:300px;align-items:center">وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ﴾ [هود: 88] ﴿ </span>
