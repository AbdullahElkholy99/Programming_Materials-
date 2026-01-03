### Definition

**Operator Overloading** allows you to redefine how operators (+, -, multiply, equals, etc.) work with user-defined types.

### Types of Overloading

1. **Member Function** - operator is part of the class
2. **Standalone Function** - operator is outside the class

### Example: Complex Number Operators

```cpp
class Complex {
private:
    int real, img;
public:
    // 1. Addition (c1 + c2)
    Complex operator+(const Complex& right) {
        Complex result;
        result.real = this->real + right.real;
        result.img = this->img + right.img;
        return result;
    }
    
    // 2. Addition with integer (c1 + 10)
    Complex operator+(int num) {
        return Complex(real + num, img);
    }
    
    // 3. Pre-increment (++c1)
    Complex& operator++() {
        real++;
        img++;
        return *this;  // Return reference
    }
    
    // 4. Post-increment (c1++)
    Complex operator++(int) {  // Dummy parameter
        Complex original(real, img);
        real++;
        img++;
        return original;  // Return old value
    }
    
    // 5. Compound assignment (c1 += c2)
    Complex& operator+=(const Complex& right) {
        real += right.real;
        img += right.img;
        return *this;
    }
    
    // 6. Comparison (c1 > c2)
    bool operator>(const Complex& right) {
        return real > right.real && img > right.img;
    }
    
    // 7. Assignment (c1 = c2) - USELESS for this class
    Complex& operator=(const Complex& right) {
        real = right.real;
        img = right.img;
        return *this;
    }
};

// 8. Standalone: integer + complex (10 + c1)
Complex operator+(int num, Complex& right) {
    return right + num;  // Reuse member operator
}
```

### Memory Diagram: Pre vs Post Increment

```
Initial State:
c1: real=3, img=4

┌──────────────────────────────────────────────┐
│ Pre-increment: ++c1                          │
├──────────────────────────────────────────────┤
│ 1. Increment c1                              │
│    c1: real=4, img=5                         │
│ 2. Return reference to c1                    │
│    Result points to c1                       │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ Post-increment: c1++                         │
├──────────────────────────────────────────────┤
│ 1. Save original state                       │
│    temp: real=3, img=4                       │
│ 2. Increment c1                              │
│    c1: real=4, img=5                         │
│ 3. Return copy of original                   │
│    Result: real=3, img=4                     │
└──────────────────────────────────────────────┘
```

### Assignment Operator (=)

#### For Stack Class (MANDATORY)

```cpp
Stack& operator=(const Stack& right) {
    // 1. CRITICAL: Avoid memory leak
    delete[] this->arr;
    
    // 2. Copy data
    tos = right.tos;
    size = right.size;
    arr = new int[size];
    for (int i = 0; i < tos; i++) {
        arr[i] = right.arr[i];
    }
    
    // 3. Return *this for chaining (s1 = s2 = s3)
    return *this;
}
```

#### Memory Diagram: Assignment Operator

```
Before: s1 = s2

s1:                           s2:
┌─────────────┐              ┌─────────────┐
│ arr: 0x1000 │───┐          │ arr: 0x2000 │───┐
└─────────────┘   │          └─────────────┘   │
                  ▼                            ▼
          Heap (0x1000)               Heap (0x2000)
          ┌────┬────┐                ┌────┬────┬────┐
          │ 99 │ 88 │                │ 10 │ 20 │ 30 │
          └────┴────┘                └────┴────┴────┘

Step 1: Delete old s1 memory
        delete[] arr;  // Free 0x1000

Step 2: Allocate new memory and copy
s1:
┌─────────────┐
│ arr: 0x3000 │───┐
└─────────────┘   │
                  ▼
          Heap (0x3000)
          ┌────┬────┬────┐
          │ 10 │ 20 │ 30 │  (Copied from s2)
          └────┴────┴────┘

After: s1 and s2 have independent memory
```

### Pros and Cons

|Pros|Cons|
|---|---|
|✅ Intuitive syntax (c1 + c2)|❌ Can be confusing if overused|
|✅ Consistent with built-in types|❌ Must implement carefully|
|✅ Code readability|❌ Some operators can't be overloaded|
|✅ Enables chaining (c1 = c2 = c3)|❌ Performance considerations|

### When to Use?

|Use Operator Overloading|Avoid Operator Overloading|
|---|---|
|✅ Mathematical operations|❌ Obscure operations|
|✅ Comparison operators|❌ Non-intuitive meanings|
|✅ Stream I/O (<<, >>)|❌ Side effects in operators|
|✅ Smart pointers|❌ Confusion with semantics|

### Do I need Assignment Operator?

```
Does your class have pointer members?
│
├─ YES → Write explicit operator= (MANDATORY)
│         Delete old memory first!
│         Perform deep copy
│         Return *this
│
└─ NO → Is default behavior sufficient?
          │
          ├─ YES → Don't write it (useless)
          │
          └─ NO → Write it only if needed
```

---
### <span style="color:#3498db">Created By Abdullah Ali</span>
***
## <span style="color:#27ae60;font:300px;align-items:center">وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ﴾ [هود: 88] ﴿ </span>
