## *Table of Contents :* 
- [ ] What is a Pointer ? 
- [ ] Pointer Syntax
- [ ] Assigning Address to Pointer
- [ ] Size of Pointers
- [ ] Pointer Arithmetic
- [ ] Void Pointer (General Purpose Pointer)
- [ ] Pointer to Array
- [ ] Pointer to Character Array
- [ ] Pointer to Pointer
- [ ] Swap Functions - Pass by Value vs Pass by Address
- [ ] Passing Arrays to Functions
- [ ] Pointer to Structure
- [ ] Array of Pointers & Void Pointers in C++
- [ ] Dynamic Memory Allocation in C++
---
## <span style="color:#3498db">What is a Pointer?</span>

### <span style="color:#9b59b6">Definition</span>

A **pointer** is a **variable that carries the  #address of another variable in memory**.

```cpp
int main()
{
    int x = 10;     // Regular variable
    char ch = 'A';  // Regular variable
    
    // Without pointers, we can only access variables directly
}
```

**Memory Diagram:**

```
Stack Memory:
┌─────────────────┐     ┌─────────────────┐
│ Address: 0x104  │     │ Address: 0x100  │
│ Variable: ch    │     │ Variable: x     │
│ Value: 'A'      │     │ Value: 10       │
│ Size: 1 byte    │     │ Size: 4 bytes   │
└─────────────────┘     └─────────────────┘
```
---
## <span style="color:#f39c12">Pointer Declaration</span>

### <span style="color:#16a085">Basic Syntax</span>

```cpp
int main()
{
    int x;       // Regular integer variable (contains RUBBISH Value)
    char ch = 'A';
    
    // Pointer to integer
    int *ptr;    // Contains NULL initially
    
    // Pointer to char
    char *cptr;  // Contains NULL initially
    
    return 0;
}
```

**Syntax Pattern:**

```cpp
type *pointerName;
```

**Memory Diagram:**

```Stack-Memory
┌─────────────────────┐   ┌─────────────────────┐
│ Address: 0x100      │   │ Address: 0x104      │
│ Variable: x         │   │ Variable: ch        │
│ Value: ??? (rubbish)│   │ Value: 'A' (65)     │
│ Size: 4 bytes       │   │ Size: 1 byte        │
└─────────────────────┘   └─────────────────────┘
┌─────────────────────┐   ┌─────────────────────┐
│ Address: 0x108      │   │ Address: 0x10C      │
│ Variable: ptr       │   │ Variable: cptr      │
│ Value: NULL (0x0)   │   │ Value: NULL (0x0)   │
│ Size: 4/8 bytes     │   │ Size: 4/8 bytes     │
└─────────────────────┘   └─────────────────────┘
```
---
## <span style="color:#27ae60">Assigning Address to Pointer</span>

### <span style="color:#3498db">Using Address-of Operator (&)</span>

```cpp
int main()
{
    int x = 10;
    
    int *ptr;  // Declare pointer
    
    ptr = &x;  // ✅ CORRECT: Assign address of x to ptr
    
    // ❌ WRONG:
    // ptr = x;  // Logic error! Assigns VALUE (10) as ADDRESS
    //           // Will cause runtime error later
    
    return 0;
}
```

**Memory Diagram:**

```
Stack Memory:
┌─────────────────────┐
│ Address: 0x100      │
│ Variable: x         │
│ Value: 10           │
│ Size: 4 bytes       │
└─────────────────────┘
         ↑
         │ points to
         │
┌─────────────────────┐
│ Address: 0x108      │
│ Variable: ptr       │
│ Value: 0x100 ───────┘ (stores address of x)
│ Size: 4/8 bytes     │
└─────────────────────┘
```
### <span style="color:#c0392b">⚠️ Critical Warning</span>

```cpp
ptr = x;  // Compiles but creates LOGIC ERROR!
          // Treats value 10 as memory address
          // Accessing invalid memory → Runtime error
```

**Memory Diagram (Wrong):**

```
Stack Memory:
┌─────────────────────┐
│ Address: 0x100      │
│ Variable: x         │
│ Value: 10           │
└─────────────────────┘

┌─────────────────────┐
│ Address: 0x108      │
│ Variable: ptr       │
│ Value: 0x0A (10) ───┐ ❌ Treats 10 as address!
└─────────────────────┘  │
                        │
                        ↓
                Invalid Memory (0x0A)
                Will cause CRASH!
```
---
## <span style="color:#9b59b6">Dereferencing Pointers</span>

### <span style="color:#f39c12">Accessing Value via Pointer</span>

```cpp
int main()
{
    int x = 10;
    int *ptr;
    ptr = &x;
    
    // Change value of x directly
    x = 100;
    
    // Change value of x via pointer (dereferencing)
    *ptr = 100;  // *ptr accesses the place ptr points to
    
    cout << *ptr;  // Output: 100
    // *ptr === x (they refer to the same location)
    
    // ❌ WRONG:
    // cout << *x;  // Error! x is not a pointer
    
    return 0;
}
```

**Memory Diagram - Before `*ptr = 100`:**

```
Stack Memory:
┌─────────────────────┐
│ Address: 0x100      │
│ Variable: x         │
│ Value: 10           │ ← Can be accessed via x
└─────────────────────┘ ← Can be accessed via *ptr
         ↑
         │ ptr points here
         │
┌─────────────────────┐
│ Address: 0x108      │
│ Variable: ptr       │
│ Value: 0x100 ───────┘
└─────────────────────┘
```

**Memory Diagram - After `*ptr = 100`:**

```
Stack Memory:
┌─────────────────────┐
│ Address: 0x100      │
│ Variable: x         │
│ Value: 100 ✅       │ ← Changed via *ptr
└─────────────────────┘
         ↑
         │ ptr still points here
         │
┌─────────────────────┐
│ Address: 0x108      │
│ Variable: ptr       │
│ Value: 0x100 ───────┘
└─────────────────────┘

Note: x and *ptr refer to the same memory location!
```
### <span style="color:#16a085">Example with Different Types</span>

```cpp
int main()
{
    float y = 1.2;
    float *fptr = &y;
    
    cout << *fptr;  // Output: 1.2
    
    // ❌ WRONG:
    // cout << *y;  // Error! y is not a pointer
    
    return 0;
}
```

---
## <span style="color:#e67e22">Size of Pointers</span>

### <span style="color:#8e44ad">Platform-Dependent Sizes</span>
  Pointer size depends on the **application architecture**, not the type it points to:

```cpp
int main()
{
    int *ptr;
    double *dptr;
    char *cptr;
    
    cout << sizeof(ptr);      // 4 or 8 bytes
    cout << sizeof(int*);     // 4 or 8 bytes
    cout << sizeof(dptr);     // 4 or 8 bytes
    cout << sizeof(double*);  // 4 or 8 bytes
    cout << sizeof(cptr);     // 4 or 8 bytes
    cout << sizeof(char*);    // 4 or 8 bytes
    
    return 0;
}
```

| <span style="color:#2980b9">Architecture</span> | <span style="color:#2980b9">Pointer Size</span> | <span style="color:#2980b9">Example</span> |
| ----------------------------------------------- | ----------------------------------------------- | ------------------------------------------ |
| **32-bit**                                      | 4 bytes                                         | Code::Blocks 17.12                         |
| **64-bit**                                      | 8 bytes                                         | Code::Blocks 23.12                         |

**Key Point:** All pointers have the same size regardless of type!

**Memory Diagram (32-bit system):**

```
Stack Memory:
┌─────────────────────┐
│ Address: 0x100      │
│ Variable: ptr       │
│ Type: int*          │
│ Size: 4 bytes       │ ← All pointers same size!
└─────────────────────┘
┌─────────────────────┐
│ Address: 0x104      │
│ Variable: dptr      │
│ Type: double*       │
│ Size: 4 bytes       │ ← Same as int*
└─────────────────────┘
┌─────────────────────┐
│ Address: 0x108      │
│ Variable: cptr      │
│ Type: char*         │
│ Size: 4 bytes       │ ← Same size regardless of type
└─────────────────────┘
```
---
## <span style="color:#c0392b">Type Mismatch (NOT RECOMMENDED)</span>

```cpp
int main()
{
    int x = 10;
    
    float *fptr = &x;  // ⚠️ No compile error, but BAD practice!
    
    cout << *fptr;     // ⚠️ Nonsense output - interprets int bytes as float
    
    return 0;
}
```

**Why avoid?** The pointer interprets the data incorrectly, leading to garbage values.

---
## ➕➖ <span style="color:#3498db">Pointer Arithmetic</span>

### <span style="color:#9b59b6">Increment/Decrement Operations</span>

```cpp
int main()
{
    int x = 10; //4 
    int *ptr = &x;  // Assume ptr = 0x10
    
    ptr++;          // Now ptr = 0x14 (moved by 4 bytes)
    
    double y = 1.2;
    double *dptr = &y;  // Assume dptr = 0x20
    
    dptr++;         // Now dptr = 0x28 (moved by 8 bytes)
    
    // Alternative syntax:
    cout << ++ptr;    // Increment then use
    cout << ptr + 1;  // Use with offset
    
    return 0;
}
```

**Memory Diagram - Integer Pointer:**

```
Before ptr++:
┌─────────────────────┐
│ Address: 0x100      │
│ Variable: x         │
│ Value: 10           │
└─────────────────────┘
         ↑
         │ ptr points here (0x100)
         │
┌─────────────────────┐
│ Address: 0x108      │
│ Variable: ptr       │
│ Value: 0x100 ───────┘
└─────────────────────┘

After ptr++:
┌─────────────────────┐
│ Address: 0x100      │
│ Variable: x         │
│ Value: 10           │
└─────────────────────┘
┌─────────────────────┐
│ Address: 0x104      │ ← ptr now points here
│ ???                 │    (undefined memory)
└─────────────────────┘
         ↑
         │
┌─────────────────────┐
│ Address: 0x108      │
│ Variable: ptr       │
│ Value: 0x104 ───────┘ Moved by sizeof(int) = 4 bytes
└─────────────────────┘
```

**Memory Diagram - Double Pointer:**

```
Before dptr++:
┌─────────────────────┐
│ Address: 0x200      │
│ Variable: y         │
│ Value: 1.2          │
│ Size: 8 bytes       │
└─────────────────────┘
         ↑
         │ dptr points here (0x200)
         │
┌─────────────────────┐
│ Address: 0x300      │
│ Variable: dptr      │
│ Value: 0x200 ───────┘
└─────────────────────┘

After dptr++:
┌─────────────────────┐
│ Address: 0x200      │
│ Variable: y         │
│ Value: 1.2          │
└─────────────────────┘
┌─────────────────────┐
│ Address: 0x208      │ ← dptr now points here
│ ???                 │
└─────────────────────┘
         ↑
         │
┌─────────────────────┐
│ Address: 0x300      │
│ Variable: dptr      │
│ Value: 0x208 ───────┘ Moved by sizeof(double) = 8 bytes
└─────────────────────┘
```
### <span style="color:#16a085">Arithmetic Rules</span>

- **ptr++** → moves by `sizeof(type)` bytes
- **int*** → moves by 4 bytes
- **double*** → moves by 8 bytes
- **char*** → moves by 1 byte

---
## <span style="color:#f39c12">Void Pointer (General Purpose Pointer)</span>

### <span style="color:#3498db">What is a Void Pointer?</span>

A **void pointer** (`void*`) is a **generic pointer** that can point to any data type, but:

- **Cannot be dereferenced directly**
- **Must be cast to specific type** before use
-  Cannot be incremented
-  Used for dynamic allocation
### <span style="color:#f39c12">Basic Example</span>

```cpp
int main()
{
    int x = 10;
    void *ptr;
    
    ptr = &x;  // ✅ Can store any type of address
    
    // ❌ WRONG: Cannot dereference void pointer
    // cout << *ptr;  // Compilation Error!
    
    return 0;
}
```

**Memory Diagram:**

```
Stack Memory:
┌─────────────────────┐
│ Address: 0x100      │
│ Variable: x         │
│ Type: int           │
│ Value: 10           │
│ Size: 4 bytes       │
└─────────────────────┘
         ↑
         │ Generic pointer (no type info)
         │
┌─────────────────────┐
│ Address: 0x108      │
│ Variable: ptr       │
│ Type: void*         │ ← Generic: can point to ANY type
│ Value: 0x100 ───────┘
│ Size: 4/8 bytes     │
└─────────────────────┘
```
---
## <span style="color:#27ae60">Solutions for Using Void Pointers</span>

### <span style="color:#16a085">Solution 1: Implicit Casting (Assignment)</span>

```cpp
int main()
{
    int x = 10;
    void *ptr;
    ptr = &x;
    
    // ✅ Implicit casting through assignment
    int *tmpPtr = ptr;  // Automatically casts void* to int*
    
    cout << *tmpPtr;    // Output: 10
    
    // Note: Explicit casting is useless here
    // int *tmpPtr = (int*)ptr;  // Works but unnecessary
    
    return 0;
}
```

**Memory Diagram:**

```
Stack Memory:
┌─────────────────────┐
│ Address: 0x100      │
│ Variable: x         │
│ Type: int           │
│ Value: 10           │
└─────────────────────┘
         ↑              ↑
         │              │
         │              └─────────────┐
         │                            │
┌─────────────────────┐      ┌────────────────────┐
│ Address: 0x108      │      │ Address: 0x10C     │
│ Variable: ptr       │      │ Variable: tmpPtr   │
│ Type: void*         │      │ Type: int*         │
│ Value: 0x100 ───────┘      │ Value: 0x100 ──────┘
└─────────────────────┘      └────────────────────┘
   (generic pointer)            (typed pointer)
   Cannot dereference           Can dereference!

Process:
1. ptr = &x         → ptr stores 0x100 (as void*)
2. tmpPtr = ptr     → Compiler implicitly casts void* to int*
3. *tmpPtr          → Now we can dereference (knows it's int)
4. Result: 10
```
---

### <span style="color:#9b59b6">Solution 2: Explicit Casting (Direct Access)</span>

```cpp
int main()
{
    int x = 10;
    void *ptr;
    ptr = &x;
    
    // ✅ Explicit casting is REQUIRED for direct dereferencing
    cout << *((int*)ptr);  // Output: 10
    
    // Breakdown:
    // 1. (int*)ptr        → Cast void* to int*
    // 2. *((int*)ptr)     → Dereference the int pointer
    
    return 0;
}
```

**Memory Diagram with Step-by-Step:**

```
Stack Memory:
┌─────────────────────┐
│ Address: 0x100      │
│ Variable: x         │
│ Type: int           │
│ Value: 10           │
│ Bytes: 00 00 00 0A  │ (hexadecimal)
└─────────────────────┘
         ↑
         │
┌─────────────────────┐
│ Address: 0x108      │
│ Variable: ptr       │
│ Type: void*         │
│ Value: 0x100 ───────┘
└─────────────────────┘

Step-by-Step: *((int*)ptr)

Step 1: ptr
        Result: 0x100 (address)
        Type: void*

Step 2: (int*)ptr
        Result: 0x100 (same address)
        Type: int* (now typed!)
        
        Before cast: void* → "address to unknown type"
        After cast:  int*  → "address to int type"

Step 3: *((int*)ptr)
        Result: 10 (value at 0x100)
        Type: int
        
        Dereference: Go to address 0x100
                    Read 4 bytes (int size)
                    Interpret as int
                    Return value: 10
```
---
## <span style="color:#e67e22">Complete Void Pointer Example</span>

```cpp
int main()
{
    int x = 10;
    float y = 3.14;
    char z = 'A';
    
    void *ptr;
    
    // Point to int
    ptr = &x;
    cout << "Integer: " << *((int*)ptr) << endl;
    
    // Point to float
    ptr = &y;
    cout << "Float: " << *((float*)ptr) << endl;
    
    // Point to char
    ptr = &z;
    cout << "Char: " << *((char*)ptr) << endl;
    
    return 0;
}
```

**Output:**

```
Integer: 10
Float: 3.14
Char: A
```

**Complete Memory Diagram:**

```
Stack Memory - All Variables:
┌─────────────────────┐ ┌─────────────────────┐
│ Address: 0x100      │ │ Address: 0x104      │
│ Variable: x         │ │ Variable: y         │
│ Type: int           │ │ Type: float         │
│ Value: 10           │ │ Value: 3.14         │
│ Size: 4 bytes       │ │ Size: 4 bytes       │
└─────────────────────┘ └─────────────────────┘
┌─────────────────────┐ ┌─────────────────────┐
│ Address: 0x108      │ │ Address: 0x10C      │
│ Variable: z         │ │ Variable: ptr       │
│ Type: char          │ │ Type: void*         │
│ Value: 'A' (65)     │ │ Value: ??? (changes)│
│ Size: 1 byte        │ └─────────────────────┘
└─────────────────────┘

Scenario 1: ptr = &x
┌─────────────────────┐
│ ptr                 │
│ Value: 0x100 ───────┼→ points to x (int)
└─────────────────────┘
Access: *((int*)ptr) → 10

Scenario 2: ptr = &y
┌─────────────────────┐
│ ptr                 │
│ Value: 0x104 ───────┼→ points to y (float)
└─────────────────────┘
Access: *((float*)ptr) → 3.14

Scenario 3: ptr = &z
┌─────────────────────┐
│ ptr                 │
│ Value: 0x108 ───────┼→ points to z (char)
└─────────────────────┘
Access: *((char*)ptr) → 'A'

Key Insight: Same pointer, different types!
void* is flexible but requires explicit casting.
```

---
## <span style="color:#8e44ad">Key Concepts Summary</span>

### <span style="color:#3498db">Array of Pointers Rules</span>

1. **Array name cannot be assigned to** - it's a constant pointer
2. **Each element must store an address** - use `&` operator
3. **Array name decays to pointer** - `arr` becomes `&arr[0]`
4. **`*ptrArr` is same as `ptrArr[0]`** - first element access

### <span style="color:#9b59b6">Void Pointer Rules</span>

1. **Generic pointer** - can point to any type
2. **Cannot dereference directly** - must cast first
3. **Implicit casting** - works with assignment
4. **Explicit casting** - required for direct access

---

## <span style="color:#f39c12">Casting Comparison Table</span>

| <span style="color:#2980b9">Method</span> | <span style="color:#2980b9">Syntax</span> | <span style="color:#2980b9">When to Use</span> |
| ----------------------------------------- | ----------------------------------------- | ---------------------------------------------- |
| **Implicit Casting**                      | `int* tmp = voidPtr;`                     | Assignment to typed pointer                    |
| **Explicit Casting**                      | `*((int*)voidPtr)`                        | Direct dereferencing                           |

---
## <span style="color:#27ae60">Pointer to Array</span>

### <span style="color:#3498db">Assignment Methods</span>

```cpp
int main()
{
    int arr[5] = {1, 2, 3, 4, 5};
    int *ptr;
    
    // ✅ CORRECT ways to assign:
    ptr = arr;      // ✅ Recommended - array name decays to pointer
    ptr = &arr;     // ✅ Works but less common
    ptr = &arr[0];  // ✅ Explicit first element address
    
    // ❌ WRONG:
    // ptr = arr[0];  // ❌ Assigns VALUE (1), not address
    
    return 0;
}
```

**Memory Diagram:**

```
Stack Memory:
┌─────────────────────────────────────────────────┐
│ Array name: arr                                 │
│ Starting address: 0x100                         │
├─────────┬─────────┬─────────┬─────────┬─────────┤
│ 0x100   │ 0x104   │ 0x108   │ 0x10C   │ 0x110   │
│ arr[0]  │ arr[1]  │ arr[2]  │ arr[3]  │ arr[4]  │
│ Value:1 │ Value:2 │ Value:3 │ Value:4 │ Value:5 │
└─────────┴─────────┴─────────┴─────────┴─────────┘
    ↑
    │ ptr points to first element
    │
┌─────────────────────┐
│ Address: 0x120      │
│ Variable: ptr       │
│ Value: 0x100 ───────┘ (same as &arr[0])
└─────────────────────┘
```
---
### <span style="color:#9b59b6">Three Methods to Access Array Elements</span>

#### <span style="color:#16a085">Method 1: Pointer Increment (Requires Reset)</span>

```cpp
// Assignment
*ptr = 10;
ptr++;
*ptr = 20;
ptr++;
*ptr = 30;
ptr++;
*ptr = 40;
ptr++;
*ptr = 50;
ptr++;

// ⚠️ REMEMBER to reset!
ptr = arr;

// Access
cout << *ptr;
ptr++;
cout << *ptr;
ptr++;
cout << *ptr;
ptr++;
cout << *ptr;
ptr++;
cout << *ptr;
ptr++;

// ⚠️ REMEMBER to reset!
ptr = arr;
```

**Advantage:** Simple syntax    ,      **Disadvantage:** Must remember to reset pointer

**Memory Diagram - Step by Step:**

```Initial-State:
┌───────┬───────┬───────┬───────┬───────┐
│ 0x100 │ 0x104 │ 0x108 │ 0x10C │ 0x110 │
│  10   │  20   │  30   │  40   │  50   │
└───────┴───────┴───────┴───────┴───────┘
  ↑
  ptr = 0x100 (*ptr = 10)

After ptr++:
┌───────┬───────┬───────┬───────┬───────┐
│ 0x100 │ 0x104 │ 0x108 │ 0x10C │ 0x110 │
│  10   │  20   │  30   │  40   │  50   │
└───────┴───────┴───────┴───────┴───────┘
          ↑
          ptr = 0x104 (*ptr = 20)

After ptr++:
┌───────┬───────┬───────┬───────┬───────┐
│ 0x100 │ 0x104 │ 0x108 │ 0x10C │ 0x110 │
│  10   │  20   │  30   │  40   │  50   │
└───────┴───────┴───────┴───────┴───────┘
                  ↑
                  ptr = 0x108 (*ptr = 30)
				   .
				   .
After ptr = arr (reset):
┌───────┬───────┬───────┬───────┬───────┐
│ 0x100 │ 0x104 │ 0x108 │ 0x10C │ 0x110 │
│  10   │  20   │  30   │  40   │  50   │
└───────┴───────┴───────┴───────┴───────┘
  ↑
  ptr = 0x100 (back to start)
```
---
#### <span style="color:#f39c12">Method 2: Pointer Arithmetic (No Reset Needed)</span>

```cpp
// Assignment
*(ptr + 0) = 10;
*(ptr + 1) = 20;
*(ptr + 2) = 30;
*(ptr + 3) = 40;
*(ptr + 4) = 50;

// Access
cout << *(ptr + 0);  // 10
cout << *(ptr + 1);  // 20
cout << *(ptr + 2);  // 30
cout << *(ptr + 3);  // 40
cout << *(ptr + 4);  // 50
```

**Advantage:** No need to reset pointer **Disadvantage:** More verbose(تفصيلا) syntax

**Memory Diagram:**

```
Array in Memory:
┌───────┬───────┬───────┬───────┬───────┐
│ 0x100 │ 0x104 │ 0x108 │ 0x10C │ 0x110 │
│  10   │  20   │  30   │  40   │  50   │
└───────┴───────┴───────┴───────┴───────┘
  ↑       ↑       ↑       ↑       ↑
  │       │       │       │       │
ptr+0   ptr+1   ptr+2   ptr+3   ptr+4
0x100   0x104   0x108   0x10C   0x110

ptr always stays at 0x100
But (ptr + n) calculates: 0x100 + (n * sizeof(int))
```
---
#### <span style="color:#27ae60">Method 3: Array Indexer (RECOMMENDED)</span>

```cpp
// When pointer points to array, it acts like array [indexer]

// Input
for (int i = 0; i < 5; i++)
{
    cout << "Enter # at index " << i << endl;
    cin >> ptr[i];
}

// Output
for (int i = 0; i < 5; i++)
{
    cout << "# at index " << i << " = " << ptr[i] << endl;
}
```

**Advantage:** Clean, readable, familiar syntax 
**Recommended:** Use this method most of the time

**Memory Diagram:**

```
Array in Memory:
┌───────┬───────┬───────┬───────┬───────┐
│ 0x100 │ 0x104 │ 0x108 │ 0x10C │ 0x110 │
├───────┼───────┼───────┼───────┼───────┤
│ ptr[0]│ ptr[1]│ ptr[2]│ ptr[3]│ ptr[4]│
│  10   │  20   │  30   │  40   │  50   │
└───────┴───────┴───────┴───────┴───────┘
  ↑
  ptr = 0x100

Note: ptr[i] is equivalent to *(ptr + i)
```
---
## <span style="color:#c0392b">Array as Constant Pointer</span>

```cpp
int main()
{
    int arr[5];
    
    // Array name is a constant pointer
    *(arr + 0) = 10;
    *(arr + 1) = 20;
    *(arr + 2) = 30;
    *(arr + 3) = 40;
    *(arr + 4) = 50;
    
    // Or using indexer notation
    arr[0] = 10;
    arr[1] = 20;
    arr[2] = 30;
    arr[3] = 40;
    arr[4] = 50;
    
    return 0;
}
```

**Important:** Array name **cannot be reassigned** (it's constant)

---
## <span style="color:#e67e22">Pointer to Character Array</span>

### <span style="color:#8e44ad">Three Access Methods</span>

```cpp
int main()
{
    char name[15];
    char *cptr;
    cptr = name;
    
    // ═══════════════════════════════════════
    // Method 1: Pointer Increment (Less Used)
    // ═══════════════════════════════════════
    *cptr = 'A';
    cptr++;
    *cptr = 'l';
    cptr++;
    *cptr = 'i';
    cptr++;
    *cptr = '\0';
    cptr++;
    
    // ⚠️ REMEMBER to reset
    cptr = name;
    
    cout << *cptr;  // A
    cptr++;
    cout << *cptr;  // l
    cptr++;
    cout << *cptr;  // i
    cptr++;
    
    // ⚠️ REMEMBER to reset
    cptr = name;
    
    // ═══════════════════════════════════════
    // Method 2: Pointer Arithmetic
    // ═══════════════════════════════════════
    *(cptr + 0) = 'A';
    *(cptr + 1) = 'l';
    *(cptr + 2) = 'i';
    *(cptr + 3) = '\0';
    
    cout << *(cptr + 0);  // A
    cout << *(cptr + 1);  // l
    cout << *(cptr + 2);  // i
    
    // ═══════════════════════════════════════
    // Method 3: Array Indexer (Recommended)
    // ═══════════════════════════════════════
    cptr[0] = 'A';
    cptr[1] = 'l';
    cptr[2] = 'i';
    cptr[3] = '\0';
    
    cout << cptr[0];  // A
    cout << cptr[1];  // l
    cout << cptr[2];  // i
    
    // String input/output
    cin >> cptr;
    cout << cptr;
    
    // Using <string.h> functions
    gets(cptr);
    puts(cptr);
    
    return 0;
}
```

---
## <span style="color:#9b59b6">Pointer to Pointer</span>

### <span style="color:#3498db">Double Pointer Concept</span>

```cpp
int main()
{
    int x = 10;          // Value: 10, Address: 0x10
    
    int *ptr = &x;       // Points to x, Address: 0x20
    
    int * *ptrToPtr = &ptr;  // Points to ptr, Address: 0x30
    
    // ═══════════════════════════════════════
    // Variable x
    // ═══════════════════════════════════════
    cout << x;       // 10 (value)
    cout << &x;      // 0x10 (address)
    // cout << *x;   // ❌ Error! x is not a pointer
    
    // ═══════════════════════════════════════
    // Pointer ptr
    // ═══════════════════════════════════════
    cout << ptr;     // 0x10 (points to x)
    cout << &ptr;    // 0x20 (address of ptr)
    cout << *ptr;    // 10 (value of x)
    
    // ═══════════════════════════════════════
    // Pointer to Pointer ptrToPtr
    // ═══════════════════════════════════════
    cout << ptrToPtr;    // 0x20 (points to ptr)
    cout << &ptrToPtr;   // 0x30 (address of ptrToPtr)
    cout << *ptrToPtr;   // 0x10 (value of ptr = address of x)
    cout << **ptrToPtr;  // 10 (value of x)
    
    return 0;
}
```

**Memory Diagram:**

```Stack-Memory
┌─────────────────────┐
│ Address: 0x100      │
│ Variable: x         │
│ Value: 10           │
│ Type: int           │
└─────────────────────┘
         ↑
         │ ptr points here
         │
┌─────────────────────┐
│ Address: 0x108      │
│ Variable: ptr       │
│ Value: 0x100 ───────┘
│ Type: int*          │
└─────────────────────┘
         ↑
         │ ptrToPtr points here
         │
┌─────────────────────┐
│ Address: 0x110      │
│ Variable: ptrToPtr  │
│ Value: 0x108 ───────┘
│ Type: int**         │
└─────────────────────┘

Access methods:
- x            → 10
- *ptr         → 10 (dereference once: goes to 0x100)
- **ptrToPtr   → 10 (dereference twice: 0x108 → 0x100 → value)
- *ptrToPtr    → 0x100 (dereference once: value in ptr)
- ptrToPtr     → 0x108 (address of ptr)
```
---
### <span style="color:#c0392b">Common Mistake - Wrong Type</span>

```cpp
int main()
{
    int x = 10;
    int *ptr = &x;
    
    // ❌ WRONG: Should be int**
    int *ptrToPtr = &ptr;  // Type mismatch!
    
    // This will cause compilation errors:
    // cout << **ptrToPtr;  // Error!
    
    return 0;
}
```

**Fix:** Use `int **ptrToPtr = &ptr;`

---
## <span style="color:#27ae60">Swap Functions - Pass by Value vs Pass by Address</span>

### <span style="color:#e74c3c">❌ Pass by Value (Doesn't Work)</span>

```cpp
void Swap(int left, int right)
{
    int tmp;
    tmp = left;
    left = right;
    right = tmp;
    // Changes only LOCAL copies, not original variables
}

int main()
{
    int x = 3;
    int y = 5;
    
    cout << "Before Swap\n";
    cout << "x = " << x;  // 3
    cout << "y = " << y;  // 5
    
    Swap(x, y);  // Passes VALUES (copies)
    
    cout << "After Swap\n";
    cout << "x = " << x;  // Still 3 ❌
    cout << "y = " << y;  // Still 5 ❌
    
    return 0;
}
```

**Memory Diagram:**

```
main() Stack Frame:
┌─────────────────────┐
│ Address: 0x100      │
│ Variable: x         │
│ Value: 3            │ ← Original stays unchanged
└─────────────────────┘
┌─────────────────────┐
│ Address: 0x104      │
│ Variable: y         │
│ Value: 5            │ ← Original stays unchanged
└─────────────────────┘

Swap() Stack Frame (created during call):
┌─────────────────────┐
│ Address: 0x200      │
│ Variable: left      │
│ Value: 3 → 5 ✓      │ ← Copy changed
└─────────────────────┘
┌─────────────────────┐
│ Address: 0x204      │
│ Variable: right     │
│ Value: 5 → 3 ✓      │ ← Copy changed
└─────────────────────┘
┌─────────────────────┐
│ Address: 0x208      │
│ Variable: tmp       │
│ Value: 3            │
└─────────────────────┘

After Swap() returns:
Swap() frame is destroyed ❌
Only copies were swapped!
Original x and y unchanged!
```
---
### <span style="color:#27ae60">Pass by Address (Works Correctly)</span>

```cpp
void Swap(int* left, int* right)
{
    int tmp = *left;    // Get value at address
    *left = *right;    // Modify original x
    *right = tmp;      // Modify original y
}

int main()
{
    int x = 3;
    int y = 5;
    
    cout << "Before Swap\n";
    cout << "x = " << x;  // 3
    cout << "y = " << y;  // 5
    
    Swap(&x, &y);  // Passes ADDRESSES
    
    cout << "After Swap\n";
    cout << "x = " << x;  // 5 ✅
    cout << "y = " << y;  // 3 ✅
    
    return 0;
}
```

### <span style="color:#3498db">Comparison Table</span>

| <span style="color:#2980b9">Aspect</span> | <span style="color:#2980b9">Pass by Value</span> | <span style="color:#2980b9">Pass by Address</span> |
| ----------------------------------------- | ------------------------------------------------ | -------------------------------------------------- |
| **Parameter Type**                        | `int param`                                      | `int* param`                                       |
| **Function Call**                         | `func(x)`                                        | `func(&x)`                                         |
| **Modifies Original**                     | ❌ No                                             | ✅ Yes                                              |
| **Creates Copy**                          | ✅ Yes                                            | ❌ No (passes address)                              |

---
## <span style="color:#f39c12">Passing Arrays to Functions</span>

### <span style="color:#c0392b">❌ Non-Standard Methods</span>

```cpp
// Not recommended - doesn't convey size info
void PrintArray(int param[], int _size) {}

// Not recommended - size is fixed at compile time
void PrintArray(int param[5]) {}
```

---
### <span style="color:#27ae60">Standard Method (Recommended)</span>

```cpp
// Standard way - using pointer with size parameter
void printArray(int *param, int _size)
{
    for (int i = 0; i < _size; i++)
    {
        cout << param[i] << " ";
    }
}

// For 2D arrays
void print2DArray(int *param, int _rows, int _cols)
{
    // Access like: param[row * cols + col]
}

int main()
{
    int arr[5] = {1, 2, 3, 4, 5};
    printArray(arr, 5);
    
    int arr2[3][4];
    print2DArray(arr2, 3, 4);
    
    return 0;
}
```

**Why Standard?**

- Pointer explicitly shows pass-by-address
- Size parameter makes function flexible
- Works with any array size

---
## <span style="color:#e67e22">Pointer to Structure</span>

### <span style="color:#8e44ad">Struct Definition</span>

```cpp
struct Employee
{
    int id; //4 byte
    char name[12]; // 12 byte
    int age; //4 byte
}; // 20 byte
```

### <span style="color:#3498db">Accessing Structure Members</span>

```cpp
int main()
{
    Employee e1;        // Size: 20 bytes
    
    Employee *empPtr;   // Size: 4 or 8 bytes
    
    empPtr = &e1;
    
    // ═══════════════════════════════════════
    // Method 1: Dereference with Dot Operator
    // ═══════════════════════════════════════
    (*empPtr).id = 1;
    strcpy((*empPtr).name, "Ali");
    (*empPtr).name = "Ali"; // XXXXXXXXXx Wrong
    (*empPtr).age = 22;
    
    // ═══════════════════════════════════════
    // Method 2: Arrow Operator (RECOMMENDED)
    // ═══════════════════════════════════════
    // -> is exclusive for pointer to struct
    
    empPtr->id = 1;              // Same as (*empPtr).id
    empPtr->age = 22;            // Same as (*empPtr).age
    strcpy(empPtr->name, "Sara");  // Same as (*empPtr).name
    
    // Output
    cout << empPtr->id;
    cout << empPtr->name;
    cout << empPtr->age;
    
    return 0;
}
```

**Memory Diagram:**

```
Stack Memory:

Employee Structure (e1):
┌──────────────────────────────────┐
│ Address: 0x100                   │ ← empPtr points here
│ ┌──────────────────────────────┐ │
│ │ id (4 bytes)                 │ │
│ │ Value: 1                     │ │ empPtr->id
│ └──────────────────────────────┘ │
│ ┌──────────────────────────────┐ │
│ │ name[12] (12 bytes)          │ │
│ │ Value: "Ali\0"               │ │ empPtr->name
│ └──────────────────────────────┘ │
│ ┌──────────────────────────────┐ │
│ │ age (4 bytes)                │ │
│ │ Value: 22                    │ │ empPtr->age
│ └──────────────────────────────┘ │
│ Total size: 20 bytes             │
└──────────────────────────────────┘
         ↑
         │
┌─────────────────────┐
│ Address: 0x120      │
│ Variable: empPtr    │
│ Type: Employee*     │
│ Value: 0x100 ───────┘
│ Size: 4/8 bytes     │
└─────────────────────┘

Arrow operator (->) breakdown:
empPtr->id   ≡ (*empPtr).id   ≡ access id at address 0x100
empPtr->name ≡ (*empPtr).name ≡ access name at address 0x104
empPtr->age  ≡ (*empPtr).age  ≡ access age at address 0x110
```
### <span style="color:#27ae60">Operator Comparison</span>

| <span style="color:#2980b9">Notation</span> | <span style="color:#2980b9">Usage</span> | <span style="color:#2980b9">When to Use</span> |
| ------------------------------------------- | ---------------------------------------- | ---------------------------------------------- |
| **`.` (dot)**                               | `e1.id`                                  | Direct structure access                        |
| **`->` (arrow)**                            | `empPtr->id`                             | Pointer to structure                           |
| **`(*ptr).`**                               | `(*empPtr).id`                           | Pointer (verbose way)                          |

**Recommendation:** Use **arrow operator (`->`)** for pointers - it's cleaner and more readable!

---
## <span style="color:#9b59b6">Complete Pointer Summary Table</span>

|<span style="color:#2980b9">Concept</span>|<span style="color:#2980b9">Syntax</span>|<span style="color:#2980b9">Example</span>|
|---|---|---|
|**Declaration**|`type* ptr;`|`int* ptr;`|
|**Get Address**|`&variable`|`ptr = &x;`|
|**Dereference**|`*ptr`|`*ptr = 10;`|
|**Pointer Size**|Always 4 or 8 bytes|`sizeof(ptr)`|
|**Increment**|`ptr++`|Moves by `sizeof(type)`|
|**Array Assignment**|`ptr = arr;`|`int* ptr = arr;`|
|**Double Pointer**|`type** ptr;`|`int** ptr;`|
|**Void Pointer**|`void* ptr;`|`void* ptr = &x;`|
|**Arrow Operator**|`ptr->member`|`empPtr->id`|

---
## <span style="color:#27ae60">Best Practices Checklist</span>

### <span style="color:#3498db">Declaration & Initialization</span>

- [ ] Always initialize pointers (`= nullptr` or `= &variable`)
- [ ] Match pointer type with variable type
- [ ] Use `&` to get addresses

### <span style="color:#f39c12">Usage</span>

- [ ] Dereference with `*` to access value
- [ ] Use array indexer `[]` when pointing to arrays
- [ ] Reset pointer after increment operations
- [ ] Cast void pointers before dereferencing

### <span style="color:#9b59b6">Functions</span>

- [ ] Pass by address to modify original values
- [ ] Include size parameter when passing arrays
- [ ] Use arrow operator `->` for structure pointers

### <span style="color:#c0392b">Safety</span>

- [ ] Check for nullptr before dereferencing
- [ ] Avoid assigning values as addresses
- [ ] Don't mix pointer types without casting
- [ ] Remember array names are constant pointers

---
# <span style="color:#e67e22">Array of Pointers & Void Pointers in C++</span>
## <span style="color:#3498db">Array of Pointers - Basic Concepts</span>

### <span style="color:#9b59b6">Declaration & Memory</span>

```cpp
int* ptrarr[4];  // Array of 4 pointers
                 // Size: 4*4 = 16 bytes (32-bit) or 4*8 = 32 bytes (64-bit)
```

**Memory Diagram (32-bit system):**

```
Stack Memory:
┌──────────────────────────────────────────────────┐
│ Array name: ptrarr                               │
│ Starting address: 0x200                          │
├────────────┬────────────┬────────────┬───────────┤
│ 0x200      │ 0x204      │ 0x208      │ 0x20C     │
│ ptrarr[0]  │ ptrarr[1]  │ ptrarr[2]  │ ptrarr[3] │
│ int*       │ int*       │ int*       │ int*      │
│ NULL/???   │ NULL/???   │ NULL/???   │ NULL/???  │
│ (4 bytes)  │ (4 bytes)  │ (4 bytes)  │ (4 bytes) │
└────────────┴────────────┴────────────┴───────────┘

Total size: 4 pointers × 4 bytes = 16 bytes
Each element can store ONE address (pointer to int)
```
---
## <span style="color:#f39c12">Storing Addresses in Array of Pointers</span>

### <span style="color:#16a085">Example 1: Individual Variables</span>

```cpp
int main()
{
    int a = 1, b = 2, c = 3, d = 4;
    int* ptrarr[4];
    
    // ❌ WRONG attempts:
    ptrarr = a;        // ❌ Cannot assign int to array name
    ptrarr = &a;       // ❌ Cannot assign address to array name
    ptrarr[0] = a;     // ❌ Assigning value instead of address
                       //    (No compile error, but LOGIC ERROR!)
    
    // ✅ CORRECT:
    ptrarr[0] = &a;    // ✅ Storing address of 'a'
    ptrarr[1] = &b;    // ✅ Storing address of 'b'
    ptrarr[2] = &c;    // ✅ Storing address of 'c'
    ptrarr[3] = &d;    // ✅ Storing address of 'd'
    
    return 0;
}
```

**Memory Diagram:**

```Stack-Memory-Individual-Variables:
┌─────────────────────┐
│ Address: 0x100      │
│ Variable: a         │
│ Value: 1            │
└─────────────────────┘
┌─────────────────────┐
│ Address: 0x104      │
│ Variable: b         │
│ Value: 2            │
└─────────────────────┘
┌─────────────────────┐
│ Address: 0x108      │
│ Variable: c         │
│ Value: 3            │
└─────────────────────┘
┌─────────────────────┐
│ Address: 0x10C      │
│ Variable: d         │
│ Value: 4            │
└─────────────────────┘

Array of Pointers:
┌───────────────────────────────────────────────┐
│ ptrArr (starting at 0x200)                    │
├───────────┬───────────┬───────────┬───────────┤
│ ptrArr[0] │ ptrArr[1] │ ptrArr[2] │ ptrArr[3] │
│ 0x200     │ 0x204     │ 0x208     │ 0x20C     │
│ Value:    │ Value:    │ Value:    │ Value:    │
│ 0x100 ────┼→ 0x104 ───┼→ 0x108 ───┼→ 0x10C    │
└───────────┴───────────┴───────────┴───────────┘
     │            │            │            │
     ↓            ↓            ↓            ↓
     a            b            c            d
    (1)          (2)          (3)          (4)

Access:
*ptrArr[0] = 1  (dereference pointer at index 0)
*ptrArr[1] = 2  (dereference pointer at index 1)
*ptrArr[2] = 3  (dereference pointer at index 2)
*ptrArr[3] = 4  (dereference pointer at index 3)
```

### <span style="color:`#c0392b`">Common Mistakes</span>

```cpp
int a = 1, b = 2, c = 3, d = 4;
int* ptrarr[4];

// ❌ WRONG:
ptrarr[0] = a;  // Stores VALUE (1) as ADDRESS!
```

**Memory Diagram - WRONG Approach:**

```Stack-Memory:
┌─────────────────────┐
│ Address: 0x100      │
│ Variable: a         │
│ Value: 1            │
└─────────────────────┘

Array of Pointers (WRONG):
┌────────────┐
│ ptrarr[0]  │
│ 0x200      │
│ Value:     │
│ 0x001 ─────┼─→ INVALID! Treats 1 as address
└────────────┘    │
                  ↓
            Address 0x001 (doesn't exist)
            ❌ RUNTIME ERROR when dereferenced!

Problem: ptrarr[0] = a assigns VALUE (1)
Instead of: ptrarr[0] = &a (assigns ADDRESS 0x100)
```
### <span style="color:#27ae60">Array Initialization with Default Values</span>

```cpp
int main()
{
    int a = 1, b = 2, c = 3, d = 4;
    
    // ✅ Initialize array of pointers directly
    int* ptrArr[4] = {&a, &b, &c, &d};
    
    // Now:
    // ptrArr[0] points to a
    // ptrArr[1] points to b
    // ptrArr[2] points to c
    // ptrArr[3] points to d
    
    cout << *ptrArr[0] << endl;  // Output: 1
    cout << *ptrArr[1] << endl;  // Output: 2
    cout << *ptrArr[2] << endl;  // Output: 3
    cout << *ptrArr[3] << endl;  // Output: 4
    
    return 0;
}
```

---
## <span style="color:#e67e22">Example 2: Array of Pointers to Array Elements</span>

### <span style="color:#8e44ad">Comprehensive Analysis</span>

```cpp
int main()
{
    int arr[4] = {1, 2, 3, 4};
    int* ptrArr[4];
    
    // ❌ WRONG attempts:
    ptrArr = arr;          // ❌ Cannot assign array to array
    ptrArr = &arr;         // ❌ Type mismatch (int(*)[4] vs int*[4])
    ptrArr = arr[0];       // ❌ Assigning int value (1) to array name
    ptrArr = &arr[0];      // ❌ Cannot assign address to array name
    ptrArr[0] = arr[0];    // ❌ Assigning value (1) instead of address
    
    // ✅ CORRECT attempts:
    ptrArr[0] = arr;       // ✅ arr decays to &arr[0]
    ptrArr[0] = &arr;      // ✅ Address of entire array (same location)
    ptrArr[0] = &arr[0];   // ✅ Explicit address of first element
    
    *ptrArr = arr;         // ✅ Same as ptrArr[0] = arr
    
    return 0;
}
```

**Complete Memory Diagram:**

```
Stack Memory - Original Array:
┌───────────────────────────────────────────────────┐
│ Array: arr (starting at 0x100)                    │
├───────────┬───────────┬───────────┬───────────────┤
│ 0x100     │ 0x104     │ 0x108     │ 0x10C         │
│ arr[0]    │ arr[1]    │ arr[2]    │ arr[3]        │
│ Value: 1  │ Value: 2  │ Value: 3  │ Value: 4      │
└───────────┴───────────┴───────────┴───────────────┘
      ↑           ↑           ↑           ↑
      │           │           │           │
      │           │           │           │
Array of Pointers to Array Elements:
┌──────────────────────────────────────────────────┐
│ Array: ptrArr (starting at 0x200)                │
├────────────┬────────────┬────────────┬───────────┤
│ ptrArr[0]  │ ptrArr[1]  │ ptrArr[2]  │ ptrArr[3] │
│ 0x200      │ 0x204      │ 0x208      │ 0x20C     │
│            │            │            │           │
│ Value:     │ Value:     │ Value:     │ Value:    │
│ 0x100 ─────┼→ 0x104 ────┼→ 0x108 ────┼→ 0x10C    │
└────────────┴────────────┴────────────┴───────────┘

Visualization of Pointers:
ptrArr[0] ──→ arr[0] (points to first element)
ptrArr[1] ──→ arr[1] (points to second element)
ptrArr[2] ──→ arr[2] (points to third element)
ptrArr[3] ──→ arr[3] (points to fourth element)

Access Examples:
- ptrArr[0]     → 0x100 (address of arr[0])
- *ptrArr[0]    → 1 (value of arr[0])
- ptrArr[1]     → 0x104 (address of arr[1])
- *ptrArr[1]    → 2 (value of arr[1])
- *(ptrArr[2])  → 3 (value of arr[2])
```
---
## <span style="color:#9b59b6">Assignment Rules Table</span>

| <span style="color:#2980b9">Statement</span> | <span style="color:#2980b9">Valid?</span> | <span style="color:#2980b9">Explanation</span> |
| -------------------------------------------- | ----------------------------------------- | ---------------------------------------------- |
| `ptrArr = arr`                               | <span style="color:#e74c3c">❌</span>      | Cannot assign to array name                    |
| `ptrArr = &arr`                              | <span style="color:#e74c3c">❌</span>      | Type mismatch                                  |
| `ptrArr = arr[0]`                            | <span style="color:#e74c3c">❌</span>      | Assigning value, not address                   |
| `ptrArr = &arr[0]`                           | <span style="color:#e74c3c">❌</span>      | Cannot assign to array name                    |
| `ptrArr[0] = arr`                            | <span style="color:#27ae60">✅</span>      | arr decays to pointer                          |
| `ptrArr[0] = &arr`                           | <span style="color:#27ae60">✅</span>      | Address of entire array                        |
| `ptrArr[0] = arr[0]`                         | <span style="color:#e74c3c">❌</span>      | Assigning value, not address                   |
| `ptrArr[0] = &arr[0]`                        | <span style="color:#27ae60">✅</span>      | Explicit address                               |
| `*ptrArr = arr`                              | <span style="color:#27ae60">✅</span>      | Same as `ptrArr[0] = arr`                      |


---
## <span style="color:#c0392b">Common Pitfalls</span>

### <span style="color:#e74c3c">Mistake 1: Logic Error (No Compile Error!)</span>

```cpp
int a = 10;
int* ptr[4];

ptr[0] = a;  // ⚠️ Compiles but stores VALUE as ADDRESS!
             // ptr[0] now points to address 10 (invalid!)
```

### <span style="color:#e74c3c">Mistake 2: Dereferencing Void Pointer</span>

```cpp
void* ptr = &x;
cout << *ptr;  // ❌ Compilation Error!
```

### <span style="color:#e74c3c">Mistake 3: Wrong Cast Type</span>

```cpp
float f = 3.14;
void* ptr = &f;

cout << *((int*)ptr);  // ⚠️ Interprets float bytes as int!
                       // Output: garbage value
```

---
## <span style="color:#27ae60">Best Practices</span>

### <span style="color:#16a085">For Array of Pointers</span>

```cpp
// ✅ Use initialization when possible
int* ptrArr[4] = {&a, &b, &c, &d};

// ✅ Always use & to get addresses
ptrArr[0] = &variable;

// ✅ Verify pointer before dereferencing
if (ptrArr[0] != nullptr) {
    cout << *ptrArr[0];
}
```

### <span style="color:#3498db">For Void Pointers</span>

```cpp
// ✅ Always cast before use
int* intPtr = (int*)voidPtr;

// ✅ Or cast inline
cout << *((int*)voidPtr);

// ✅ Document what type the void* holds
void* ptr = &x;  // Points to int
```

---

## <span style="color:#9b59b6">Quick Reference</span>

### <span style="color:#f39c12">Array of Pointers Checklist</span>

- [ ] Declare: `type* arrayName[size]`
- [ ] Initialize with addresses: `{&a, &b, &c}`
- [ ] Access element: `*arrayName[i]`
- [ ] Remember: array name is constant
- [ ] Use `&` to get addresses

### <span style="color:#e67e22">Void Pointer Checklist</span>

- [ ] Declare: `void* ptr`
- [ ] Can point to any type
- [ ] Must cast before dereferencing
- [ ] Use `(type*)ptr` for casting
- [ ] Document the actual type stored

---
# <span style="color:#e67e22">Dynamic Memory Allocation in C++</span>
## Overview

Dynamic allocation allows us to allocate memory at **runtime** rather than compile-time, giving us flexibility in memory management.

---
## Static Arrays vs Dynamic Allocation

### Static Arrays Limitations

- **Fixed size** at compile-time
- Cannot be declared based on runtime values
- **Cannot be modified or deleted** until end of scope
- Size must be known beforehand

### Dynamic Allocation Advantages

- Allocate memory at **runtime**
- Size can be determined by user input or calculations
- **Deallocate whenever needed** (manual memory management in C, C++)
- Stored in **Heap memory** (C, C++, Java, C#)

---
## Syntax

### High-Level Languages (HLL)

```cpp
new keyword
```

```c
malloc() function
```

### C++ Dynamic Allocation

```cpp
// Allocate 5 integers
int* ptr = new int[5];  // 5 * 4 = 20 bytes in heap

// Allocate 5 characters
char* ptr = new char[5]; // 5 * 1 = 5 bytes in heap

// Standard way: runtime size
int size;
cout << "Enter array size: ";
cin >> size;
double* dPtr = new double[size]; // 8 * size = # bytes in heap
```

---
## Complete Example

### Basic Dynamic Array Allocation

```cpp
int main()
{
    int size = 5;
    
    // Allocate array dynamically
    int *ptr = new int[size];
    
    // From this moment: int *ptr == int ptr[5]
    
    // Assignment using pointer arithmetic
    *(ptr + 0) = 10;
    *(ptr + 1) = 20;
    *(ptr + 2) = 30;
    *(ptr + 3) = 40;
    *(ptr + 4) = 50;
    
    // Access using pointer arithmetic
    cout << *(ptr + 0) << endl;
    cout << *(ptr + 1) << endl;
    cout << *(ptr + 2) << endl;
    cout << *(ptr + 3) << endl;
    cout << *(ptr + 4) << endl;
    
    return 0;
}
```

**Memory Diagram - Stack vs Heap:**

```
Stack Memory:
┌─────────────────────┐
│ Address: 0x100      │
│ Variable: size      │
│ Type: int           │
│ Value: 5            │
│ Size: 4 bytes       │
└─────────────────────┘
┌─────────────────────┐
│ Address: 0x104      │
│ Variable: ptr       │
│ Type: int*          │
│ Value: 0x2000 ──────┼──┐ Points to Heap!
│ Size: 4/8 bytes     │  │
└─────────────────────┘  │
                         │
                         ↓
Heap Memory (Dynamically Allocated):
┌────────────────────────────────────────────────────┐
│ Allocated block starting at: 0x2000                │
├──────────┬──────────┬──────────┬──────────┬────────┤
│ 0x2000   │ 0x2004   │ 0x2008   │ 0x200C   │ 0x2010 │
│ ptr[0]   │ ptr[1]   │ ptr[2]   │ ptr[3]   │ ptr[4] │
│ Value:10 │ Value:20 │ Value:30 │ Value:40 │ Value:50│
└──────────┴──────────┴──────────┴──────────┴────────┘

Total allocated: 5 × 4 bytes = 20 bytes in Heap

Key Differences:
Stack:
- Fixed size at compile time
- Automatic cleanup (when scope ends)
- Limited size (~1-8 MB)
- Fast allocation

Heap:
- Dynamic size at runtime ✓
- Manual cleanup required (delete[])
- Large size (limited by system RAM)
- Slower allocation
```
---

## Array Indexer Notation

When a pointer points to an array, it can act like an array using **indexer notation** `[]`:

```cpp
int main()
{
    int size = 5;
    int *ptr = new int[size];
    
    // Input using array notation
    for (int i = 0; i < size; i++)
    {
        cout << "Enter element #" << i << ": ";
        cin >> ptr[i];
    }
    
    // Output using array notation
    for (int i = 0; i < size; i++)
    {
        cout << "Element #" << i << " = " << ptr[i] << endl;
    }
    
    // ⚠️ WARNING: Out of bounds access
    ptr[6] = 400;  // Runtime Error!
    
    return 0;
}
```

---

## Important Notes

### Memory Safety

- Accessing array out of bounds (e.g., `ptr[6]` when size is 5) causes **runtime error**
- Always ensure index is within valid range: `0` to `size-1`
### Best Practices

1. Always check array bounds before access
2. Remember to deallocate memory using `delete[]` when done
3. Avoid memory leaks by properly managing heap memory

### Proper Memory Deallocation

```cpp
// After you're done using the array
delete[] ptr;
ptr = nullptr;  // Good practice to avoid dangling pointer
```

---

## 🧠 Key Concepts Summary

| Concept                 | Description                                  |
| ----------------------- | -------------------------------------------- |
| **Heap Memory**         | Where dynamically allocated memory is stored |
| **`new` keyword**       | Allocates memory dynamically in C++          |
| **Pointer Arithmetic**  | `*(ptr + i)` accesses element at index `i`   |
| **Array Notation**      | `ptr[i]` is equivalent to `*(ptr + i)`       |
| **Runtime Allocation**  | Size determined during program execution     |
| **Manual Deallocation** | Use `delete[]` to free memory                |

---
## Syntax Reference

```cpp
// Single value allocation
int* p = new int(15);    // Allocate single integer with initial value 15
delete p;                   // Deallocate single integer

// Array allocation
int* arr = new int[size];   // Allocate array
delete[] arr;               // Deallocate array (note the [])
```
---
# Advanced Dynamic Memory Allocation in C++

## <span style="color:#e74c3c">Memory Deallocation</span>

### <span style="color:#3498db">Basic Deallocation Example</span>

```cpp
int main()
{
    // Allocate 5 integers
    int *ptr = new int[5];
    
    for (int i = 0; i < 5; i++)
    {
        ptr[i] = 10;
    }
    
    // Deallocate this array
    // delete[] removes from the address of first element
    delete[] ptr;
    
    return 0;
}
```

### <span style="color:#9b59b6">How `delete[]` Works</span>

> **Important Concept:**
> 
> - `delete[]` **removes protection** for allocated bytes
> - Any application can now write in this memory space
> - **ptr still carries the address** (e.g., 0x10) → becomes **undefined/dangling pointer**
> - `delete[]` does **NOT remove values/state**, only removes protection

---
## <span style="color:#c0392b">`delete` vs `delete[]`</span>

| <span style="color:#2980b9">Command</span> | <span style="color:#2980b9">Usage</span> | <span style="color:#2980b9">Purpose</span> |
| ------------------------------------------ | ---------------------------------------- | ------------------------------------------ |
| `delete[] ptr`                             | ✅ For arrays                             | Removes entire array                       |
| `delete ptr`                               | ✅ For single objects                     | Removes non-array object                   |
### <span style="color:#e74c3c">Critical Warning</span>

```cpp
int* ptr = new int[5];

delete[] ptr;  // ✅ CORRECT - for arrays
delete ptr;    // ❌ WRONG - undefined behavior!
```

---
## <span style="color:#c0392b">Dangerous Memory Leakage</span>

### <span style="color:#e74c3c">Memory Leak Example</span>

```cpp
void TryMe()
{
    int *ptr = new int[5];
    
    // No delete[] here!
    // Memory leaked when function ends
}

int main()
{
    TryMe();  // Leaks 20 bytes
    TryMe();  // Leaks another 20 bytes
    TryMe();  // Leaks another 20 bytes
    // Total: 60 bytes leaked!
    
    return 0;
}
```

**Problem:** Each call allocates memory but never frees it. Memory accumulates until program ends.

**Memory Diagram - Showing Leak:**

```
After First TryMe() Call:
Stack (TryMe frame - DESTROYED after return):
┌─────────────────────┐
│ ptr (destroyed)     │ ← Stack frame removed!
│ Value: 0x2000       │
└─────────────────────┘
         ╳ Lost reference!
         
Heap (STILL ALLOCATED):
┌──────────────────────┐
│ 0x2000: [int×5]      │ ← 20 bytes LEAKED!
│ No pointer to it     │ ← Cannot delete
└──────────────────────┘

After Second TryMe() Call:
Stack (TryMe frame - DESTROYED):
┌─────────────────────┐
│ ptr (destroyed)     │
│ Value: 0x2020       │
└─────────────────────┘
         ╳ Lost reference!

Heap:
┌──────────────────────┐
│ 0x2000: [int×5]      │ ← First leak (20 bytes)
├──────────────────────┤
│ 0x2020: [int×5]      │ ← Second leak (20 bytes)
└──────────────────────┘

After Third TryMe() Call:
Heap:
┌──────────────────────┐
│ 0x2000: [int×5]      │ ← First leak (20 bytes)
├──────────────────────┤
│ 0x2020: [int×5]      │ ← Second leak (20 bytes)
├──────────────────────┤
│ 0x2040: [int×5]      │ ← Third leak (20 bytes)
└──────────────────────┘

Total Memory Leaked: 60 bytes (and growing with each call!)

Problem: Pointer on stack destroyed, but heap memory persists!
Solution: Either delete[] before return, or return pointer to caller.
```

---
### <span style="color:#27ae60">Correct Way - Return Pointer</span>

```cpp
int* TryMe2()
{
    int *ptr = new int[5];
    return ptr;  // Return pointer to caller
}

int main()
{
    int *xptr = TryMe2();
    
    // Use the array
    for (int i = 0; i < 5; i++)
    {
        xptr[i] = i * 10;
        cout << xptr[i] << " ";
    }
    
    // Clean up
    delete[] xptr;
    
    return 0;
}
```

**Solution:** Return the pointer so caller can deallocate it later.

**Memory Diagram - Correct Flow:**

```
During TryMe2() execution:
Stack (TryMe2 frame):
┌─────────────────────┐
│ Address: 0x100      │
│ Variable: ptr       │
│ Value: 0x2000 ──────┼──┐
└─────────────────────┘  │
                         ↓
Heap:
┌──────────────────────┐
│ 0x2000: [int×5]      │ ← Allocated
└──────────────────────┘

After TryMe2() returns to main():
Stack (main frame):
┌─────────────────────┐
│ Address: 0x100      │
│ Variable: xptr      │
│ Value: 0x2000 ──────┼──┐ Received from TryMe2
└─────────────────────┘  │
                         ↓
Heap:
┌───────────────────────────────────┐
│ 0x2000                            │
├──────┬──────┬──────┬──────┬───────┤
│  0   │  10  │  20  │  30  │  40   │
└──────┴──────┴──────┴──────┴───────┘

After delete[] xptr:
Stack:
┌─────────────────────┐
│ xptr                │
│ Value: 0x2000       │ (dangling pointer)
└─────────────────────┘
         │
         ↓
Heap:
┌──────────────────────┐
│ 0x2000: FREED        │ ← Memory returned to OS
│ (unprotected)        │ ← Can be reused by any program
└──────────────────────┘

✓ No memory leak!
✓ Proper cleanup
✓ Pointer returned so main() could delete it
```
---
## <span style="color:#f39c12">Dynamic 2D Arrays - Array of Pointers</span>

### <span style="color:#16a085">Method 1: Static Array of Pointers</span>

```cpp
int main()
{
    int col = 4;
    int* ptrArr[3];  // Static array of 3 pointers (on Stack)
    
    // Allocate each row dynamically (on Heap)
    ptrArr[0] = new int[col];
    ptrArr[1] = new int[col];
    ptrArr[2] = new int[col];
    /*
    1 2 3 
    4 5 6
    7 8 9 
    1 0 5
    
    */
    // From this moment: int* ptrArr[3] acts like int ptrArr[3][4]
    
    // Access element
    **ptrArr = 10;  // Same as ptrArr[0][0] = 10
    
    // Deallocation
    delete ptrArr;       // ❌ WRONG - cannot delete from Stack!
    delete[] ptrArr[0];  // ✅ CORRECT
    delete[] ptrArr[1];  // ✅ CORRECT
    delete[] ptrArr[2];  // ✅ CORRECT

    return 0;
}
```

**Complete Memory Diagram:**

```
Stack Memory:
┌──────────────────────────────────────────────┐
│ Variable: col = 4                            │
│ Address: 0x100                               │
└──────────────────────────────────────────────┘
┌──────────────────────────────────────────────┐
│ Array: ptrArr[3] (Static)                    │
│ Starting address: 0x104                      │
├────────────┬────────────┬────────────────────┤
│ ptrArr[0]  │ ptrArr[1]  │ ptrArr[2]          │
│ 0x104      │ 0x108      │ 0x10C              │
│ Value:     │ Value:     │ Value:             │
│ 0x2000 ────┼→ 0x2010 ───┼→ 0x2020            │
└────────────┴────────────┴────────────────────┘
      │            │            │
      ↓            ↓            ↓
Heap Memory (Dynamic Arrays):
┌──────────────────────────────────────────────┐
│ Row 0 (address 0x2000):                      │
├──────────┬──────────┬──────────┬─────────────┤
│ 0x2000   │ 0x2004   │ 0x2008   │ 0x200C      │
│ [0][0]=10│ [0][1]=0 │ [0][2]=0 │ [0][3]=0    │
└──────────┴──────────┴──────────┴─────────────┘

┌───────────────────────────────────────────────┐
│ Row 1 (address 0x2010):                       │
├──────────┬──────────┬──────────┬─────────────┤
│ 0x2010   │ 0x2014   │ 0x2018   │ 0x201C      │
│ [1][0]=0 │ [1][1]=0 │ [1][2]=20│ [1][3]=0    │
└──────────┴──────────┴──────────┴─────────────┘

┌───────────────────────────────────────────────┐
│ Row 2 (address 0x2020):                       │
├──────────┬──────────┬──────────┬─────────────┤
│ 0x2020   │ 0x2024   │ 0x2028   │ 0x202C      │
│ [2][0]=0 │ [2][1]=0 │ [2][2]=0 │ [2][3]=30   │
└──────────┴──────────┴──────────┴─────────────┘

Memory Sizes:
- ptrArr[3]: 3 × 4 bytes = 12 bytes (Stack)
- Each row: 4 × 4 bytes = 16 bytes (Heap)
- Total Heap: 3 rows × 16 bytes = 48 bytes

Deallocation Order:
1. delete[] ptrArr[0] → Free row 0 (0x2000)
2. delete[] ptrArr[1] → Free row 1 (0x2010)
3. delete[] ptrArr[2] → Free row 2 (0x2020)
(Cannot delete ptrArr itself - it's on Stack!)
```
---
## <span style="color:#3498db">Fully Dynamic 2D Arrays</span>

### <span style="color:#9b59b6">Method 2: Double Pointer (Recommended)</span>

```cpp
int main()
{
    int col = 4;
    int row = 3;
    int** ptrArr ;  // Double pointer
    
    // Allocate array of pointers (on Heap)
    ptrArr = new int*[row];
    
    // Allocate each row (on Heap)
    ptrArr[0] = new int[col];
    ptrArr[1] = new int[col];
    ptrArr[2] = new int[col];
    
    // From this moment: int** ptrArr acts like int ptrArr[3][4]
    
    // Access elements
    ptrArr[0][0] = 10;
    ptrArr[1][2] = 20;
    
    // Deallocation (order matters!)
    delete[] ptrArr[0];  // Free each row first
    delete[] ptrArr[1];
    delete[] ptrArr[2];
    delete[] ptrArr;     // Then free the array of pointers
    
    return 0;
}
```

**Memory Diagram:**

```
Stack Memory:
┌──────────────────────────────────────────────┐
│ Variable: col = 4                            │
│ Address: 0x100                               │
└──────────────────────────────────────────────┘
┌──────────────────────────────────────────────┐
│ Variable: row = 3                            │
│ Address: 0x104                               │
└──────────────────────────────────────────────┘
┌──────────────────────────────────────────────┐
│ Variable: ptrArr                             │
│ Type: int**                                  │
│ Address: 0x108                               │
│ Value: 0x2000 ───────────────────┐           │
│ Size: 4/8 bytes                  │           │
└──────────────────────────────────┼───────────┘
                                   │
                                   ↓
Heap Memory - Level 1 (Array of Pointers):
┌──────────────────────────────────────────────┐
│ Address: 0x2000 (allocated by new int*[3])  │
├────────────┬────────────┬────────────────────┤
│ ptrArr[0]  │ ptrArr[1]  │ ptrArr[2]          │
│ 0x2000     │ 0x2004     │ 0x2008             │
│            │            │                    │
│ Value:     │ Value:     │ Value:             │
│ 0x3000 ────┼→ 0x3010 ───┼→ 0x3020            │
└────────────┴────────────┴────────────────────┘
      │            │            │
      ↓            ↓            ↓
Heap Memory - Level 2 (Actual Integer Arrays):
┌──────────────────────────────────────────────┐
│ Row 0 (address 0x3000):                      │
│ Allocated by: ptrArr[0] = new int[4]        │
├──────────┬──────────┬──────────┬────────────┤
│ 0x3000   │ 0x3004   │ 0x3008   │ 0x300C     │
│ [0][0]   │ [0][1]   │ [0][2]   │ [0][3]     │
│ Value:10 │ Value:0  │ Value:0  │ Value:0    │
└──────────┴──────────┴──────────┴────────────┘

┌──────────────────────────────────────────────┐
│ Row 1 (address 0x3010):                      │
│ Allocated by: ptrArr[1] = new int[4]        │
├──────────┬──────────┬──────────┬────────────┤
│ 0x3010   │ 0x3014   │ 0x3018   │ 0x301C     │
│ [1][0]   │ [1][1]   │ [1][2]   │ [1][3]     │
│ Value:0  │ Value:0  │ Value:20 │ Value:0    │
└──────────┴──────────┴──────────┴────────────┘

┌──────────────────────────────────────────────┐
│ Row 2 (address 0x3020):                      │
│ Allocated by: ptrArr[2] = new int[4]        │
├──────────┬──────────┬──────────┬────────────┤
│ 0x3020   │ 0x3024   │ 0x3028   │ 0x302C     │
│ [2][0]   │ [2][1]   │ [2][2]   │ [2][3]     │
│ Value:0  │ Value:0  │ Value:0  │ Value:30   │
└──────────┴──────────┴──────────┴────────────┘

Memory Allocation Summary:
╔═══════════════════════════════════════════════╗
║ Location    │ What                │ Size      ║
╠═════════════╪═════════════════════╪═══════════╣
║ Stack       │ ptrArr variable     │ 4/8 bytes ║
║ Heap Level1 │ Array of 3 pointers │ 12 bytes  ║
║ Heap Level2 │ Row 0 (4 ints)      │ 16 bytes  ║
║ Heap Level2 │ Row 1 (4 ints)      │ 16 bytes  ║
║ Heap Level2 │ Row 2 (4 ints)      │ 16 bytes  ║
╠═════════════╧═════════════════════╧═══════════╣
║ Total Heap Memory: 60 bytes                   ║
╚═══════════════════════════════════════════════╝

Access Path Example for ptrArr[1][2]:
1. Start: ptrArr (0x108 on Stack)
2. Read: ptrArr → 0x2000 (address of pointer array)
3. Navigate: ptrArr[1] → 0x2000 + 4 = 0x2004
4. Read: Value at 0x2004 → 0x3010 (address of row 1)
5. Navigate: ptrArr[1][2] → 0x3010 + (2×4) = 0x3018
6. Read: Value at 0x3018 → 20 ✓

Deallocation Order (CRITICAL!):
Step 1: delete[] ptrArr[0]  → Free 0x3000 (row 0)
Step 2: delete[] ptrArr[1]  → Free 0x3010 (row 1)
Step 3: delete[] ptrArr[2]  → Free 0x3020 (row 2)
Step 4: delete[] ptrArr     → Free 0x2000 (pointer array)

❌ WRONG ORDER would cause memory leak:
If you delete[] ptrArr first, you lose access to ptrArr[0], 
ptrArr[1], ptrArr[2], and cannot free the rows!
```
---
## <span style="color:#e74c3c">Common Mistake - Wrong Type</span>

### <span style="color:#c0392b">Incorrect Declaration</span>

```cpp
int main()
{
    int col = 4;
    int row = 3;
    int* ptrArr;  // ❌ WRONG TYPE - should be int**
    
    ptrArr = new int*[row];  // ❌ Type mismatch!
    
    ptrArr[0] = new int[col];
    ptrArr[1] = new int[col];
    ptrArr[2] = new int[col];
    
    // This will cause compilation errors or runtime issues
    
    return 0;
}
```

**Problem:** `int*` cannot properly hold an array of pointers. Use `int**` instead.

**Memory Diagram - Why It Fails:**

```
What you're trying to do:
Stack:
┌─────────────────────┐
│ ptrArr              │
│ Type: int*          │ ← Single pointer to int
│ Expected: address   │ ← Points to ONE int
│ of ONE integer      │
└─────────────────────┘

What new int*[3] creates:
Heap:
┌──────────────────────────────────┐
│ Array of 3 POINTERS              │
│ Each element is int* (4/8 bytes) │
├──────────┬──────────┬────────────┤
│ int*     │ int*     │ int*       │
└──────────┴──────────┴────────────┘

Problem:
int* ptrArr expects to point to: int
new int*[3] creates array of:    int*

TYPE MISMATCH! 
int* ≠ int*[3]

Correct Declaration:
┌─────────────────────┐
│ ptrArr              │
│ Type: int**         │ ← Pointer to pointer
│ Points to: array    │ ← Can point to array of pointers
│ of pointers         │
└─────────────────────┘
         │
         ↓
┌──────────────────────────────────┐
│ Array of pointers (int*[3])      │ ✓ Match!
└──────────────────────────────────┘
```
---
## <span style="color:#f39c12">Dynamic Arrays of Structures</span>

### <span style="color:#3498db">Pointer to Struct Example</span>

```cpp
struct Employee // 4 + 12 + 4 = 20 bytes
{
	int id;        // 4 bytes
    char name[12]; // 12 bytes
	int age;       // 4 bytes
};

int main()
{
    int empSize = 3;
    
    // Allocate array of Employee structures
    Employee* empPtr = new Employee[empSize]; // 3 * 20 = 60 bytes
    
    // From this moment: Employee* empPtr acts like Employee empPtr[3]
    
    // Method 1: Array notation with dot operator
    for (int i = 0; i < empSize; i++)
    {
        empPtr[i].id = i + 1;
        strcpy(empPtr[i].name, "Sama");
        empPtr[i].age = 22 + i;
    }
    
    // Method 2: Pointer notation with arrow operator
    empPtr->id = 1;                    // Same as empPtr[0].id
    strcpy(empPtr->name, "Ahmed");     // Same as empPtr[0].name
    empPtr->age = 25;                  // Same as empPtr[0].age
    
    (empPtr + 1)->id = 2;              // Same as empPtr[1].id
    strcpy((empPtr + 1)->name, "Sara"); // Same as empPtr[1].name
    (empPtr + 1)->age = 30;            // Same as empPtr[1].age
    
    // Display
    for (int i = 0; i < empSize; i++)
    {
        cout << "ID: " << empPtr[i].id << endl;
        cout << "Name: " << empPtr[i].name << endl;
        cout << "Age: " << empPtr[i].age << endl;
        cout << "---" << endl;
    }
    
    // Don't forget to deallocate!
    delete[] empPtr;
    
    return 0;
}
```

**Complete Memory Diagram:**

```
Stack Memory:
┌──────────────────────────────────────────────┐
│ Variable: empSize                            │
│ Type: int                                    │
│ Address: 0x100                               │
│ Value: 3                                     │
└──────────────────────────────────────────────┘
┌──────────────────────────────────────────────┐
│ Variable: empPtr                             │
│ Type: Employee*                              │
│ Address: 0x104                               │
│ Value: 0x2000 ───────────────────┐           │
└──────────────────────────────────┼───────────┘
                                   │
                                   ↓
Heap Memory (Array of 3 Employee structures):
┌──────────────────────────────────────────────┐
│ Employee[0] - Starting at 0x2000             │
│ ┌──────────────────────────────────────────┐ │
│ │ Address: 0x2000                          │ │
│ │ Member: id                               │ │
│ │ Type: int                                │ │
│ │ Value: 1                                 │ │
│ │ Size: 4 bytes                            │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ Address: 0x2004                          │ │
│ │ Member: name[12]                         │ │
│ │ Type: char array                         │ │
│ │ Value: "Ahmed\0"                         │ │
│ │ Size: 12 bytes                           │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ Address: 0x2010                          │ │
│ │ Member: age                              │ │
│ │ Type: int                                │ │
│ │ Value: 25                                │ │
│ │ Size: 4 bytes                            │ │
│ └──────────────────────────────────────────┘ │
│ Total: 20 bytes                              │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ Employee[1] - Starting at 0x2014             │
│ ┌──────────────────────────────────────────┐ │
│ │ Address: 0x2014                          │ │
│ │ Member: id                               │ │
│ │ Value: 2                                 │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ Address: 0x2018                          │ │
│ │ Member: name[12]                         │ │
│ │ Value: "Sara\0"                          │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ Address: 0x2024                          │ │
│ │ Member: age                              │ │
│ │ Value: 30                                │ │
│ └──────────────────────────────────────────┘ │
│ Total: 20 bytes                              │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ Employee[2] - Starting at 0x2028             │
│ ┌──────────────────────────────────────────┐ │
│ │ Address: 0x2028                          │ │
│ │ Member: id                               │ │
│ │ Value: 3                                 │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ Address: 0x202C                          │ │
│ │ Member: name[12]                         │ │
│ │ Value: "Ali\0"                           │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ Address: 0x2038                          │ │
│ │ Member: age                              │ │
│ │ Value: 28                                │ │
│ └──────────────────────────────────────────┘ │
│ Total: 20 bytes                              │
└──────────────────────────────────────────────┘

Total Heap Allocation: 3 × 20 = 60 bytes

Access Methods Comparison:
╔═══════════════════════════════════════════════╗
║ Array Notation    │ Pointer Notation          ║
╠═══════════════════╪═══════════════════════════╣
║ empPtr[0].id      │ empPtr->id                ║
║ empPtr[0].name    │ empPtr->name              ║
║ empPtr[0].age     │ empPtr->age               ║
╠═══════════════════╪═══════════════════════════╣
║ empPtr[1].id      │ (empPtr + 1)->id          ║
║ empPtr[1].name    │ (empPtr + 1)->name        ║
║ empPtr[1].age     │ (empPtr + 1)->age         ║
╠═══════════════════╪═══════════════════════════╣
║ empPtr[2].id      │ (empPtr + 2)->id          ║
║ empPtr[2].name    │ (empPtr + 2)->name        ║
║ empPtr[2].age     │ (empPtr + 2)->age         ║
╚═══════════════════╧═══════════════════════════╝

How Pointer Arithmetic Works:
empPtr          → 0x2000 (Employee[0])
empPtr + 1      → 0x2000 + 20 = 0x2014 (Employee[1])
empPtr + 2      → 0x2000 + 40 = 0x2028 (Employee[2])

Note: Moves by sizeof(Employee) = 20 bytes each time!

Arrow Operator (->) Breakdown:
empPtr->id          ≡ (*empPtr).id
(empPtr + 1)->age   ≡ (*(empPtr + 1)).age

Process:
1. empPtr + 1       → Calculate address: 0x2000 + 20 = 0x2014
2. *(empPtr + 1)    → Dereference: get Employee at 0x2014
3. .age             → Access age member at offset 16 within struct
4. Final address    → 0x2014 + 16 = 0x2024
5. Read value       → 30
```
---
## <span style="color:#9b59b6">Access Notation Comparison</span>

### <span style="color:#16a085">For Arrays of Structures</span>

|<span style="color:#2980b9">Array Notation</span>|<span style="color:#2980b9">Pointer Notation</span>|<span style="color:#2980b9">Equivalent</span>|
|---|---|---|
|`empPtr[0].id`|`empPtr->id`|`(*empPtr).id`|
|`empPtr[1].id`|`(empPtr + 1)->id`|`(*(empPtr + 1)).id`|
|`empPtr[i].id`|`(empPtr + i)->id`|`(*(empPtr + i)).id`|

---
## <span style="color:#27ae60">Key Takeaways</span>

### <span style="color:#3498db">Memory Management Rules</span>

1. **Always pair** `new` with `delete` or `new[]` with `delete[]`
2. **Delete in reverse order** for 2D arrays (rows first, then array of pointers)
3. **Return pointers** from functions if caller needs to manage memory
4. **Set to nullptr** after deletion to avoid dangling pointers

### <span style="color:#e67e22">2D Array Approaches</span>

| <span style="color:#2980b9">Approach</span> | <span style="color:#2980b9">Declaration</span> | <span style="color:#2980b9">Flexibility</span> |
| ------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| **Static array of pointers**                | `int* arr[3]`                                  | Rows dynamic, columns dynamic                  |
| **Fully dynamic**                           | `int** arr`                                    | Both fully dynamic                             |

### <span style="color:#9b59b6">Structure Access</span>

- Use **`.`** (dot) operator with array notation: `empPtr[i].member`
- Use **`->`** (arrow) operator with pointer notation: `empPtr->member`
- Arrow is shorthand: `ptr->member` ≡ `(*ptr).member`

---

## <span style="color:#8e44ad">Quick Reference Checklist</span>

- [ ] Use `delete[]` for arrays, `delete` for single objects
- [ ] Always deallocate memory before program ends
- [ ] Return pointers if memory needs to outlive function
- [ ] For 2D arrays: delete rows before deleting pointer array
- [ ] Set pointers to `nullptr` after deletion
- [ ] Match allocation type with deallocation type
- [ ] Use `int**` for fully dynamic 2D arrays
- [ ] Remember: `->` for pointers, `.` for direct access

---
### <span style="color:#3498db">Created By Abdullah Ali</span>
***
## <span style="color:#27ae60;font:300px;align-items:center">وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ﴾ [هود: 88] ﴿ </span>
