## Table of Contents

- [[#01- Introduction]]
- [[#02- Program Structure C++]]
- [[#03- Basic Input/Output]]
- [[#04- Operators]]
- [[#05- Conditional or Ternary Operator]]
- [[#06- Quick Reference]]
 
---

## 01- Introduction

### Key Characteristics

- **Case Sensitive**: C++ distinguishes between uppercase and lowercase
    - `int x` is different from `int X`
- **Keywords**: All C++ keywords are lowercase
    - Examples: `int`, `main`, `float`, `double`

---

## 02- Program Structure C++

### Complete Skeleton

```cpp
// file.cpp

// 1. Preprocessing
#include<iostream>  // For console input/output
#include<math.h>    // For mathematical functions like sqrt()
using namespace std;

// 2. Global Declarations
// - Global variables
// - Function declarations
// - Struct definitions

// 3. Entry Point
int main()
{
    // 4. Local Declarations
    // - Local variables
    // - Processing logic
    // - Operators
    
    // 5. Program Exit Status
    return 0;  // 0 = successful execution
}
```

### Structure Breakdown

1. **Preprocessing**: Include necessary libraries
2. **Global Declarations**: Variables/functions accessible throughout the program
3. **Entry Point**: `main()` function where execution begins
4. **Local Declarations**: Variables/logic within functions
5. **Return Statement**: `return 0` indicates successful program execution

---

## 03- Basic Input/Output

### Output with `cout`

#### Example 1: Simple Print

```cpp
#include<iostream>
using namespace std;

int main()
{
    cout << "Hello SD" << endl;
    cout << "Hello OS";
    return 0;
}
```

**Output:**

```
Hello SD
Hello OS
```

#### Special Characters

- `\n` - New line
- `\t` - Tab
- `endl` - End line (flushes buffer)

#### Example 2: Printing Variables

```cpp
#include<iostream>
using namespace std;

int main()
{
    int age = 22;
    float salary = 1.2;
    
    cout << "Your age is " << age << endl;
    cout << "Your age is " << age << " and salary is " << salary << endl;
    
    return 0;
}
```

**Output:**

```
Your age is 22
Your age is 22 and salary is 1.2
```

### Memory Addresses

```cpp
#include<iostream>
using namespace std;

int main()
{
    int x = 22;
    char ch = 'M';
    
    cout << "Value of x is " << x << endl;
    cout << "Address of x is " << &x << endl;
    
    cout << "Value of ch is " << ch << endl;
    cout << "Address of ch is " << &ch << endl;
    
    return 0;
}
```

**Note:** `&` operator returns the memory address of a variable

### Input with `cin`

```cpp
#include<iostream>
using namespace std;

int main()
{
    int age;
    
    cout << "Please enter your age: ";
    cin >> age;  // Reads until ENTER is pressed
    
    cout << "Your age is " << age << endl;
    
    return 0;
}
```

---

## 04- Operators

### 1. Arithmetic Operators

#### A. Binary Operators

- `+` Addition
- `-` Subtraction
- `*` Multiplication
- `/` Division
- `%` Modulus (remainder)

```cpp
int x = 3, y = 4, z;
z = y % x;  // z = 1 (remainder of 4/3)
```

#### B. Unary Operators (Increment/Decrement)

**Postfix** (`x++`): Use current value, then increment

```cpp
int x = 3, z;
z = x++;  // Step 1: z = x (z=3), Step 2: x++ (x=4)
cout << x;  // Output: 4
cout << z;  // Output: 3
```

**Prefix** (`++x`): Increment first, then use

```cpp
int x = 3, z;
z = ++x;  // Step 1: ++x (x=4), Step 2: z = x (z=4)
cout << x;  // Output: 4
cout << z;  // Output: 4
```

**Remember:**

```cpp
int x = 1, z;

// Method 1: Regular addition
z = x + 1;  // x = 1, z = 2

// Method 2: Prefix increment
z = ++x;    // x = 2, z = 2
```

### 2. Compound Assignment Operators

- `+=` (x += y means x = x + y)
- `-=` (x -= y means x = x - y)
- `*=` (x **= y means x = x * y)
- `/=` (x /= y means x = x / y)
- `%=` (x %= y means x = x % y)

**Note:** `==` is comparison (NOT assignment)

```cpp
int x = 3, y = 4;
x += y;  // x = x + y = 7
```

### 3. Comparison Operators

Returns `1` for true, `0` for false

- `>` Greater than
- `<` Less than
- `>=` Greater than or equal
- `<=` Less than or equal
- `==` Equal to
- `!=` Not equal to

```cpp
int x = 3, y = 4, z = 5, a = 3;

cout << (x >= a);  // Output: 1 (true)
cout << (x == a);  // Output: 1 (true)
cout << (x != y);  // Output: 1 (true)
```

### 4. Logical Operators

#### AND Operator (`&&`)

Returns `1` only if ALL conditions are true

```cpp
int x = 3, y = 4, z = 5;
cout << (x > y && y < z && z > x);  // Output: 0 (false)
// x > y is false, so entire expression is false
```

#### OR Operator (`||`)

Returns `1` if ANY condition is true

```cpp
cout << (x < y || y < z || z > x);  // Output: 1 (true)
// x < y is true, so entire expression is true
```

---
## 05- Conditional or Ternary Operator
---
## 06- Quick Reference

### Common Mistakes to Avoid

- Using `==` instead of `=` for assignment
- Forgetting semicolons `;`
- Case sensitivity issues (`Int` vs `int`)
- Division by zero (program may crash)

### Best Practices

- Always initialize variables before use
- Use meaningful variable names
- Add comments to explain complex logic
- Return 0 from main() to indicate success
- Use `endl` or `\n` for better output formatting

---
# interpreter VS Compiler 
interpreter : 
	- Execute line by line 
	- 
compiler : 
	- execute all file 


| Feature           | Translator                                 | Compiler                                                 | Interpreter                         |
| ----------------- | ------------------------------------------ | -------------------------------------------------------- | ----------------------------------- |
| Definition        | Converts code from one language to another | Converts entire program to machine code before execution | Converts and runs code line by line |
| Execution         | Depends on type                            | Fast after compilation                                   | Slower (interprets each line)       |
| Error handling    | Depends on type                            | Shows all errors after compilation                       | Stops at first error                |
| Output            | Depends on type                            | Executable file                                          | Immediate execution (no file)       |
| Example Languages | All                                        | C, C++                                                   | Python, JavaScript                  |
