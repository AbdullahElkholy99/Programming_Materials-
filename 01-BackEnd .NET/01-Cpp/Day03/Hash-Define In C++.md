# C++ **`#define`** Preprocessor Directive

## Table of Contents

1. [What is #define]
2. [Syntax]
3. [Use Cases]
4. [Code Examples]

---

## 01- What is  **`#define`** 

### Definition

The `#define` directive is a preprocessor command that creates macro data before compile time.

### Purpose

- Used to create constant values or expressions (macros) under a specific name
- The preprocessor replaces all instances of the macro name with its value before compilation
- Can be used anywhere in the program after its definition

---

## 02- Syntax

```cpp
#define MacroName MacroValue
```

**Components:**

- `#define` - The preprocessor directive
- `MacroName` - The identifier you want to create
- `MacroValue` - The value or expression to replace the name with

---
## 03- Use Cases

### 1. Constant Values

Using `#define` to create named constants for better code readability and maintainability.

### 2. Array Dimensions

Defining array sizes that can be easily modified in one place.

### 3. Code Expressions

Creating reusable code snippets or expressions.

---

## 04- Code Examples

### Example 1: Basic Constants

```cpp
#include <iostream>
#define ABC 55
#define ROW 5
#define COL 6

using namespace std;

int main()
{
    int x = ABC;  // x = 55
    int y = ABC;  // y = 55
  
    int arr[ROW][COL];  // int arr[5][6]
  
    for (int i = 0; i < ROW; i++)
    {
        for (int j = 0; j < COL; j++)
        {
            // Process 2D array
        }
    }
    
    return 0;
}
```

### Example 2: Using Macros in Functions

```cpp
#include <iostream>
#define ABC 55
#define XYZ 3

using namespace std;

void TryMe()
{
    int left = ABC;      // left = 55
    int arr[XYZ];        // int arr[3]
}

int main()
{
    TryMe();
    return 0;
}
```

### Example 3: Complete Program

```cpp
#include <iostream>
#define MAX_ROWS 5
#define MAX_COLS 6
#define CONSTANT_VALUE 55

using namespace std;

void TryMe()
{
    int left = CONSTANT_VALUE;
    int arr[3];
}

int main()
{
    int x = CONSTANT_VALUE;
    int y = CONSTANT_VALUE;
  
    int arr[MAX_ROWS][MAX_COLS];
  
    // First loop using defined constants
    for (int i = 0; i < MAX_ROWS; i++)
    {
        for (int j = 0; j < MAX_COLS; j++)
        {
            arr[i][j] = i + j;
        }
    }
    
    // Second loop using literal values
    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < 4; j++)
        {
            // Process elements
        }
    }
  
    return 0;
}
```

---

## 05- Key Points

1. **Preprocessor Directive:** `#define` is processed before compilation
2. **Text Replacement:** The preprocessor replaces all occurrences of the macro name with its value
3. **No Semicolon:** `#define` statements do not end with a semicolon
4. **Scope:** Macros are visible from the point of definition to the end of the file
5. **No Type Checking:** Unlike `const` variables, macros have no type safety
6. **Convention:** Macro names are typically written in UPPERCASE

---

## 06- Alternative: const vs  **`#define`** 

Modern C++ often prefers `const` variables over `#define` for type safety:

```cpp
// Using #define
#define PI 3.14159

// Using const (preferred in modern C++)
const double PI = 3.14159;
```

**Advantages of const:**

- Type safety
- Scope control
- Debugger friendly
- Respects C++ scope rules

---
### <span style="color:#3498db">Created By Abdullah Ali</span>
***
## <span style="color:#27ae60;font:300px;align-items:center">وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ﴾ [هود: 88] ﴿ </span>
