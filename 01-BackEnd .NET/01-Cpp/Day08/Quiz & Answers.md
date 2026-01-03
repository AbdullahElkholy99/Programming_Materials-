## 📝 Section 1: Copy Constructor (Basic)

### Q1: When is the copy constructor automatically called?

**Answer:** The copy constructor is automatically called in **three cases**:

1. **Passing an object by value** to a function
2. **Returning an object by value** from a function
3. **Creating an object from another object** (initialization)

```cpp
void func(Complex c) { }  // Case 1: pass by value

Complex func2() {
    Complex temp;
    return temp;  // Case 2: return by value
}

Complex c1(3, 4);
Complex c2 = c1;  // Case 3: initialization
Complex c3(c1);   // Case 3: initialization
```

---

### Q2: What is the problem with this code? Fix it.

```cpp
class Stack {
    int* arr;
    int size;
public:
    Stack(int s) {
        size = s;
        arr = new int[size];
    }
    ~Stack() { delete[] arr; }
};

int main() {
    Stack s1(5);
    Stack s2 = s1;  // What happens?
    return 0;
}
```

**Answer:** **Problem:** No explicit copy constructor! Default shallow copy happens:

- Both `s1.arr` and `s2.arr` point to the **same memory**
- When `s2` is destroyed, it deletes the array
- When `s1` is destroyed, it tries to delete **already deleted memory** → **CRASH!**

**Fix:**

```cpp
class Stack {
    int* arr;
    int size;
public:
    Stack(int s) {
        size = s;
        arr = new int[size];
    }
    
    // Add copy constructor (MANDATORY)
    Stack(const Stack& old) {
        size = old.size;
        arr = new int[size];  // Allocate NEW memory
        for (int i = 0; i < size; i++) {
            arr[i] = old.arr[i];  // Deep copy
        }
    }
    
    ~Stack() { delete[] arr; }
};
```

---

### Q3: Is a copy constructor needed for this class? Why or why not?

```cpp
class Student {
    int id;
    string name;
    double gpa;
};
```

**Answer:** **NO**, a copy constructor is **NOT needed** (useless).

**Reason:**

- All members are **simple data types** (int, string, double)
- No pointers or dynamic memory allocation
- Default bitwise copy works perfectly fine
- String class has its own copy constructor, so it's handled automatically

---

## 📝 Section 2: Copy Constructor (Advanced)

### Q4: What is the output of this code? Explain each line.

```cpp
class Complex {
    int real, img;
public:
    Complex() { 
        real = img = 0;
        cout << "Default ctor\n"; 
    }
    Complex(int r, int i) { 
        real = r; img = i;
        cout << "2p ctor\n"; 
    }
    Complex(const Complex& old) { 
        real = old.real; img = old.img;
        cout << "Copy ctor\n"; 
    }
    ~Complex() { cout << "Destructor\n"; }
};

void func(Complex c) {
    cout << "Inside func\n";
}

int main() {
    Complex c1(3, 4);
    func(c1);
    cout << "Back in main\n";
    return 0;
}
```

**Answer:**

```
2p ctor          ← c1 created with (3,4)
Copy ctor        ← c1 passed by value, copy constructor called
Inside func      ← Inside the function
Destructor       ← Parameter destroyed when func ends
Back in main     ← Back to main
Destructor       ← c1 destroyed at end of main
```

**Explanation:**

1. `Complex c1(3, 4)` → Calls 2-parameter constructor
2. `func(c1)` → Pass by value triggers copy constructor
3. Function executes
4. Parameter is destroyed (destructor called)
5. Back to main
6. `c1` is destroyed (destructor called)

---

### Q5: What's wrong with this copy constructor?

```cpp
class Stack {
    int* arr;
    int size;
public:
    Stack(Stack old) {  // ❌ Wrong!
        size = old.size;
        arr = new int[size];
    }
};
```

**Answer:** **Problem:** Parameter is passed **by value** instead of **by reference**!

**What happens:**

- Calling the copy constructor requires passing an object by value
- Passing by value requires calling the copy constructor
- This creates **infinite recursion** → **Stack overflow!**

**Fix:**

```cpp
Stack(const Stack& old) {  // ✅ Correct: pass by reference
    size = old.size;
    arr = new int[size];
}
```

---

## 📝 Section 3: Operator Overloading (Basic)

### Q6: What is the difference between ++c1 and c1++?

```cpp
class Complex {
    int real, img;
public:
    Complex& operator++() {      // Pre-increment
        real++; img++;
        return *this;
    }
    
    Complex operator++(int) {    // Post-increment
        Complex temp(real, img);
        real++; img++;
        return temp;
    }
};
```

**Answer:**

|Feature|++c1 (Pre-increment)|c1++ (Post-increment)|
|---|---|---|
|**When incremented**|Before returning|After returning|
|**Return type**|Reference `Complex&`|Value `Complex`|
|**Returns**|Modified object|Original value|
|**Performance**|Faster (no copy)|Slower (creates copy)|
|**Signature**|`operator++()`|`operator++(int)`|

**Example:**

```cpp
Complex c1(3, 4);

Complex c2 = ++c1;  // Pre: c1 becomes (4,5), c2 is (4,5)
Complex c3 = c1++;  // Post: c3 is (4,5), c1 becomes (5,6)
```

---

### Q7: Complete this operator overloading for Complex class

```cpp
class Complex {
    int real, img;
public:
    // Overload + operator for: c3 = c1 + c2
    Complex operator+(const Complex& right) {
        // Fill in the blank
    }
};
```

**Answer:**

```cpp
Complex operator+(const Complex& right) {
    Complex result;
    result.real = this->real + right.real;
    result.img = this->img + right.img;
    return result;
}

// Alternative shorter version:
Complex operator+(const Complex& right) {
    return Complex(real + right.real, img + right.img);
}
```

---

### Q8: Why can't this be a member function? Write it correctly.

```cpp
// We want: Complex c3 = 10 + c1;
// Where c1 is Complex(3, 4)
// Result should be Complex(13, 4)
```

**Answer:** **Problem:** The left operand (10) is an `int`, not a `Complex` object. Member functions require the left operand to be an object of the class.

**Solution:** Use a **standalone function**:

```cpp
Complex operator+(int num, Complex& right) {
    return Complex(right.GetReal() + num, right.GetImg());
}

// Or reuse the member operator:
Complex operator+(int num, Complex& right) {
    return right + num;  // Calls Complex::operator+(int)
}
```

**Now both work:**

```cpp
c3 = c1 + 10;  // Uses member function
c3 = 10 + c1;  // Uses standalone function
```

---

## 📝 Section 4: Assignment Operator

### Q9: What's the critical error in this assignment operator?

```cpp
class Stack {
    int* arr;
    int size;
public:
    Stack& operator=(const Stack& right) {
        size = right.size;
        arr = new int[size];
        for (int i = 0; i < size; i++) {
            arr[i] = right.arr[i];
        }
        return *this;
    }
};
```

**Answer:** **Critical Error:** **Memory leak!** The old memory is not deleted before allocating new memory.

**What happens:**

```cpp
Stack s1(10), s2(5);
s1 = s2;  // s1's original array (10 elements) is LEAKED!
```

**Fix:**

```cpp
Stack& operator=(const Stack& right) {
    delete[] arr;  // ✅ MUST delete old memory first!
    
    size = right.size;
    arr = new int[size];
    for (int i = 0; i < size; i++) {
        arr[i] = right.arr[i];
    }
    return *this;
}
```

---

### Q10: What does "return *this" enable? Why is it important?

```cpp
Complex& operator=(const Complex& right) {
    real = right.real;
    img = right.img;
    return *this;  // Why?
}
```

**Answer:** **Enables chaining:** Allows multiple assignments in one statement.

```cpp
Complex c1, c2, c3, c4;
c1 = c2 = c3 = c4;  // Chain assignment

// This is evaluated as:
c1 = (c2 = (c3 = c4));

// How it works:
// 1. c3 = c4 returns c3
// 2. c2 = c3 returns c2
// 3. c1 = c2 completes
```

**Without `return *this`:**

- Function returns `void`
- Chaining wouldn't compile
- Can't write `c1 = c2 = c3`

---

## 📝 Section 5: Object Relations

### Q11: Identify the type of relationship and explain why

```cpp
// Example 1
class Room {
    Wall w1, w2, w3, w4;  // Objects
};

// Example 2
class Student {
    Department* dept;  // Pointer
};

// Example 3
class Teacher {
    Subject* sub;  // Pointer (nullable)
};
```

**Answer:**

**Example 1: COMPOSITION**

- Room **completely owns** the walls
- Walls are **object members** (not pointers)
- Walls **cannot exist** without the room
- **Permanent relationship**
- When room is destroyed, walls are automatically destroyed

**Example 2: AGGREGATION**

- Student **has a** department
- Uses **pointer** (allocated in constructor)
- Department can exist independently
- **Temporary relationship** (student can change departments)
- Whole-part relationship

**Example 3: ASSOCIATION**

- Teacher **knows about** a subject
- Uses **pointer** (can be NULL)
- Very loose connection
- **Peer-to-peer relationship**
- No ownership or dependency

---

### Q12: Convert this from Aggregation to Composition

```cpp
class Car {
    Engine* engine;
public:
    Car() {
        engine = new Engine();
    }
    ~Car() {
        delete engine;
    }
};
```

**Answer:**

```cpp
class Car {
    Engine engine;  // Object instead of pointer
public:
    Car() {
        // Engine default constructor called automatically
    }
    // No need for destructor - Engine destroyed automatically
};

// With parameters using constructor chaining:
class Car {
    Engine engine;
public:
    Car(int hp) : engine(hp) {  // Constructor chaining
        // Engine already initialized
    }
};
```

**Changes:**

1. ✅ Pointer → Object
2. ✅ No manual `new`/`delete`
3. ✅ Automatic destruction
4. ✅ Stronger ownership

---

## 📝 Section 6: Constructor Chaining

### Q13: What's the output? Count function calls.

```cpp
class Point {
public:
    Point() { cout << "Point default\n"; }
    Point(int x, int y) { cout << "Point 2p\n"; }
};

class Line {
    Point start, end;
public:
    Line(int x1, int y1, int x2, int y2) {
        start.SetX(x1);
        start.SetY(y1);
        end.SetX(x2);
        end.SetY(y2);
        cout << "Line ctor\n";
    }
};

int main() {
    Line l(1, 2, 3, 4);
    return 0;
}
```

**Answer:**

```
Point default    ← start default constructor
Point default    ← end default constructor
Line ctor        ← Line constructor body
```

**Function calls:**

- 2 default constructors (wasted!)
- 4 setter calls
- 1 Line constructor **Total: 7 calls**

**Problem:** Points are constructed with default values, then **overwritten** by setters → **Wasteful!**

---

### Q14: Rewrite Q13 using constructor chaining. What's the output?

**Answer:**

```cpp
class Line {
    Point start, end;
public:
    Line(int x1, int y1, int x2, int y2)
    : start(x1, y1), end(x2, y2)  // Constructor chaining
    {
        cout << "Line ctor\n";
    }
};

int main() {
    Line l(1, 2, 3, 4);
    return 0;
}
```

**Output:**

```
Point 2p         ← start(1, 2) called directly
Point 2p         ← end(3, 4) called directly
Line ctor        ← Line constructor body
```

**Function calls:**

- 2 parameterized constructors (efficient!)
- 0 setter calls
- 1 Line constructor **Total: 3 calls** (57% fewer calls!)

---

## 📝 Section 7: Comprehensive Problems

### Q15: Find ALL errors in this code and fix them

```cpp
class Stack {
    int* arr;
    int size;
public:
    Stack(int s) {
        size = s;
        arr = new int[size];
    }
    
    Stack(Stack old) {
        size = old.size;
        arr = old.arr;
    }
    
    Stack operator=(Stack right) {
        size = right.size;
        arr = new int[size];
        for (int i = 0; i < size; i++)
            arr[i] = right.arr[i];
    }
    
    ~Stack() {
        delete arr;
    }
};
```

**Answer:** **5 ERRORS FOUND:**

```cpp
class Stack {
    int* arr;
    int size;
public:
    Stack(int s) {
        size = s;
        arr = new int[size];
    }
    
    // ❌ Error 1: Pass by value (infinite recursion)
    // ❌ Error 2: Shallow copy (arr = old.arr)
    // ✅ Fix:
    Stack(const Stack& old) {  // Pass by reference
        size = old.size;
        arr = new int[size];   // Allocate new memory
        for (int i = 0; i < size; i++)
            arr[i] = old.arr[i];  // Deep copy
    }
    
    // ❌ Error 3: Pass by value (unnecessary copy)
    // ❌ Error 4: No memory leak prevention
    // ❌ Error 5: Wrong return type (Stack instead of Stack&)
    // ❌ Error 6: No return statement
    // ✅ Fix:
    Stack& operator=(const Stack& right) {  // Pass by reference
        delete[] arr;  // Prevent memory leak
        size = right.size;
        arr = new int[size];
        for (int i = 0; i < size; i++)
            arr[i] = right.arr[i];
        return *this;  // Return reference
    }
    
    // ❌ Error 7: delete arr (should be delete[])
    // ✅ Fix:
    ~Stack() {
        delete[] arr;  // Use delete[] for arrays
    }
};
```

**Summary of Errors:**

1. Copy constructor passes by value
2. Copy constructor does shallow copy
3. Assignment operator passes by value
4. Assignment operator doesn't delete old memory
5. Assignment operator returns `Stack` instead of `Stack&`
6. Assignment operator missing `return *this`
7. Destructor uses `delete` instead of `delete[]`

---

### Q16: Memory diagram question

```cpp
class Point {
    int x, y;
public:
    Point(int a, int b) : x(a), y(b) {}
};

class Rect {
    Point ul, lr;
public:
    Rect(int x1, int y1, int x2, int y2)
    : ul(x1, y1), lr(x2, y2) {}
};

int main() {
    Rect r(10, 20, 30, 40);
    return 0;
}
```

**Draw the memory layout and show the construction order.**

**Answer:**

**Construction Order:**

```
1. Memory allocated for Rect r
2. Point(10, 20) called for ul
3. Point(30, 40) called for lr
4. Rect constructor body executes
```

**Memory Layout:**

```
Stack Memory:
┌─────────────────────────────────────┐
│ main()                              │
│                                     │
│  r (Rect object):                   │
│  ┌─────────────────────────────────┤
│  │ ul (Point):                     │
│  │  ┌──────────────┐               │
│  │  │ x: 10        │               │
│  │  │ y: 20        │               │
│  │  └──────────────┘               │
│  │                                  │
│  │ lr (Point):                     │
│  │  ┌──────────────┐               │
│  │  │ x: 30        │               │
│  │  │ y: 40        │               │
│  │  └──────────────┘               │
│  └─────────────────────────────────┘
└─────────────────────────────────────┘

Total memory: 4 integers = 16 bytes (typically)
```

**Destruction Order (LIFO):**

```
1. Rect destructor
2. Point destructor (lr) 
3. Point destructor (ul)
```

---

### Q17: Design Problem

**You need to create a `Book` class and a `Library` class. A library contains multiple books. Books can exist without a library. Which relationship should you use and why? Write the code.**

**Answer:**

**Relationship: AGGREGATION** (Loosely Coupled)

**Reasoning:**

- Library has books (whole-part)
- Books can exist independently of library
- Books can be moved between libraries
- Temporary relationship

**Code:**

```cpp
class Book {
    string title;
    string author;
    string isbn;
public:
    Book(string t, string a, string i) 
        : title(t), author(a), isbn(i) {}
    
    string GetTitle() const { return title; }
    void Display() {
        cout << title << " by " << author << endl;
    }
};

class Library {
    string name;
    Book** books;      // Array of pointers
    int bookCount;
    int capacity;
public:
    Library(string n, int cap) : name(n), capacity(cap) {
        books = new Book*[capacity];
        bookCount = 0;
    }
    
    void AddBook(Book* book) {
        if (bookCount < capacity) {
            books[bookCount++] = book;
        }
    }
    
    void RemoveBook(int index) {
        if (index < bookCount) {
            // Don't delete book - it exists independently
            for (int i = index; i < bookCount - 1; i++) {
                books[i] = books[i + 1];
            }
            bookCount--;
        }
    }
    
    void DisplayBooks() {
        cout << "Library: " << name << endl;
        for (int i = 0; i < bookCount; i++) {
            books[i]->Display();
        }
    }
    
    ~Library() {
        delete[] books;  // Delete array, NOT the books themselves
    }
};

// Usage
int main() {
    Book b1("1984", "Orwell", "123");
    Book b2("Animal Farm", "Orwell", "456");
    
    Library lib("City Library", 100);
    lib.AddBook(&b1);
    lib.AddBook(&b2);
    
    lib.DisplayBooks();
    
    // Books still exist after library is destroyed
    return 0;
}
```

**Key Points:**

- ✅ Books are stored as **pointers**
- ✅ Library doesn't delete books (they exist independently)
- ✅ Books can be added/removed
- ✅ Loose coupling maintained

---

### Q18: Performance Question

**Which is more efficient and why?**

```cpp
// Version A
class Line {
    Point start, end;
public:
    Line(int x1, int y1, int x2, int y2) {
        start.SetX(x1); start.SetY(y1);
        end.SetX(x2); end.SetY(y2);
    }
};

// Version B
class Line {
    Point start, end;
public:
    Line(int x1, int y1, int x2, int y2)
    : start(x1, y1), end(x2, y2) {}
};
```

**Answer:**

**Version B is MORE efficient**

**Analysis:**

|Version A (Without Chaining)|Version B (With Chaining)|
|---|---|
|2 default constructors|2 parameterized constructors|
|4 setter function calls|0 setter calls|
|Values set twice (default then changed)|Values set once directly|
|**Total: 7 function calls**|**Total: 3 function calls**|
|Slower execution|Faster execution|
|More stack frames|Fewer stack frames|

**Execution Time Comparison:**

```
Version A:
┌─────────────────────────────────┐
│ Point()          ← start        │ ~5 operations
│ Point()          ← end          │ ~5 operations
│ SetX(x1)                        │ ~3 operations
│ SetY(y1)                        │ ~3 operations
│ SetX(x2)                        │ ~3 operations
│ SetY(y2)                        │ ~3 operations
│ Line body                       │ ~2 operations
├─────────────────────────────────┤
│ Total: ~24 operations           │
└─────────────────────────────────┘

Version B:
┌─────────────────────────────────┐
│ Point(x1, y1)    ← start        │ ~5 operations
│ Point(x2, y2)    ← end          │ ~5 operations
│ Line body                       │ ~2 operations
├─────────────────────────────────┤
│ Total: ~12 operations           │
└─────────────────────────────────┘

Performance Improvement: 50% faster!
```

---

## 📝 Section 8: Tricky Questions

### Q19: What's the output? Explain why.

```cpp
class Complex {
    int real, img;
public:
    Complex(int r = 0, int i = 0) : real(r), img(i) {
        cout << "Ctor(" << real << "," << img << ")\n";
    }
    Complex(const Complex& old) : real(old.real), img(old.img) {
        cout << "Copy(" << real << "," << img << ")\n";
    }
    ~Complex() {
        cout << "Dest(" << real << "," << img << ")\n";
    }
    Complex operator+(const Complex& right) {
        return Complex(real + right.real, img + right.img);
    }
};

int main() {
    Complex c1(3, 4);
    Complex c2(5, 6);
    Complex c3 = c1 + c2;
    return 0;
}
```

**Answer:**

```
Ctor(3,4)        ← c1 constructed
Ctor(5,6)        ← c2 constructed
Ctor(8,10)       ← result created inside operator+
Dest(8,10)       ← result destroyed (temporary)
Dest(8,10)       ← c3 destroyed
Dest(5,6)        ← c2 destroyed
Dest(3,4)        ← c1 destroyed
```

**Wait! Why no Copy Constructor?**

**Explanation:**

- `Complex c3 = c1 + c2;` looks like assignment, but it's actually **initialization**
- Modern compilers use **Return Value Optimization (RVO)**
- The temporary object is constructed directly in `c3`'s memory location
- Copy constructor is **elided** (optimized away)

**Without RVO (older compilers):**

```
Ctor(3,4)        ← c1
Ctor(5,6)        ← c2
Ctor(8,10)       ← temp result in operator+
Copy(8,10)       ← copy temp to c3
Dest(8,10)       ← temp destroyed
Dest(8,10)       ← c3 destroyed
Dest(5,6)        ← c2 destroyed
Dest(3,4)        ← c1 destroyed
```

---

### Q20: Will this compile? If not, why? If yes, what's the problem?

```cpp
class Stack {
    int* arr;
    int size;
public:
    Stack(int s = 5) {
        size = s;
        arr = new int[size];
    }
};

int main() {
    Stack s1;
    Stack s2 = s1;
    Stack s3;
    s3 = s1;
    return 0;
}
```

**Answer:**

**YES, it compiles** (compiler generates default copy constructor and assignment operator)

**BUT SERIOUS RUNTIME PROBLEM:**

```cpp
Stack s1;          // arr points to 0x1000
Stack s2 = s1;     // s2.arr ALSO points to 0x1000 (shallow copy)
Stack s3;          // arr points to 0x2000
s3 = s1;          // s3.arr now points to 0x1000 (0x2000 LEAKED!)

// At end of main:
// s3 destructor: delete[] 0x1000 ✓
// s2 destructor: delete[] 0x1000 ✗ CRASH! (already deleted)
// s1 destructor: delete[] 0x1000 ✗ CRASH! (already deleted)
```

**Problems:**

1. **Shallow copy** - all point to same memory
2. **Memory leak** - s3's original array at 0x2000 is lost
3. **Double/triple deletion** - same memory deleted multiple times
4. **Crash or undefined behavior**

**Solution:** Write explicit copy constructor and assignment operator!

---

## 🎯 Bonus Challenge Questions

### Q21: What's the minimum number of constructors needed for this to work?

```cpp
int main() {
    Complex c1;              // ???
    Complex c2(5);           // ???
    Complex c3(3, 4);        // ???
    Complex c4 = c3;         // ???
    Complex c5 = 10;         // ???
    return 0;
}
```

**Answer:**

**Minimum: 1 constructor with default parameters!**

```cpp
class Complex {
    int real, img;
public:
    // One constructor to rule them all!
    Complex(int r = 0, int i = 0) : real(r), img(i) {}
    
    // Copy constructor auto-generated (or write explicitly)
    Complex(const Complex& old) : real(old.real), img(old.img) {}
};

// How each line works:
Complex c1;           // Complex(0, 0)
Complex c2(5);        // Complex(5, 0)
Complex c3(3, 4);     // Complex(3, 4)
Complex c4 = c3;      // Copy constructor
Complex c5 = 10;      // Complex(10, 0) - implicit conversion
```

**Alternative: Explicit constructors (no implicit conversion)**

```cpp
explicit Complex(int r = 0, int i = 0);

// Now this won't compile:
Complex c5 = 10;  // ❌ Error: implicit conversion disabled

// Must use explicit construction:
Complex c5(10);   // ✅ OK
```

---

### Q22: Advanced - What's the output and why?

```cpp
class Base {
public:
    Base() { cout << "Base\n"; }
    ~Base() { cout << "~Base\n"; }
};

class Member {
public:
    Member() { cout << "Member\n"; }
    ~Member() { cout << "~Member\n"; }
};

class Derived {
    Member m;
public:
    Derived() { cout << "Derived\n"; }
    ~Derived() { cout << "~Derived\n"; }
};

int main() {
    Derived d;
    return 0;
}
```

**Answer:**

```
Member           ← m constructed first
Derived          ← Derived constructor body
~Derived         ← Derived destructor body
~Member          ← m destroyed last (LIFO)
```

**Rule:**

1. **Construction order:** Member objects → Constructor body
2. **Destruction order:** Destructor body → Member objects (reverse)
3. **Always LIFO** (Last In, First Out)

---

## 📊 Quick Reference Summary

### When to Write Copy Constructor?

```
Has pointer members? ──YES──→ MANDATORY ✅
        │
        NO
        ↓
Default works fine? ──YES──→ DON'T WRITE ❌
        │
        NO
        ↓
For debugging only? ──YES──→ OPTIONAL 🤷
```

### When to Write Assignment Operator?

```
Has pointer members? ──YES──→ MANDATORY ✅
        │                     (Remember: delete old memory!)
        NO
        ↓
Need special behavior? ──YES──→ WRITE IT ✅
        │
        NO
        ↓
DON'T WRITE ❌
```

### Choose Relationship Type

```
Complete ownership? ──YES──→ COMPOSITION (object member)
        │
        NO
        ↓
Temporary ownership? ──YES──→ AGGREGATION (pointer)
        │
        NO
        ↓
Just reference? ──YES──→ ASSOCIATION (pointer/nullable)
```

---

## 🏆 Final Exam Question

### Q23: Ultimate Challenge

**Create a `StudentGradeBook` class that:**

- Stores student name and ID
- Has a dynamic array of grades
- Supports adding grades
- Calculates average
- Can be copied safely
- Supports assignment
- Can display info

**Write complete implementation with all necessary functions.**

**Answer:**

```cpp
class StudentGradeBook {
private:
    string name;
    int id;
    double*
```


---
### <span style="color:#3498db">Created By Abdullah Ali</span>
***
## <span style="color:#27ae60;font:300px;align-items:center">وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ﴾ [هود: 88] ﴿ </span>
