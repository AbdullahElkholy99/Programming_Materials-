## Table of Contents

1. [[#01- Introduction to Functions]]
2. [[#02- Function Syntax]]
3. [[#03- Function Types]]
4. [[#04- Function Parameters]]
5. [[#05- Return Values]]
6. [[#06- Function Evolution Example]]
7. [[#07- SOLID Principles (SRP)]]
8. [[#08- Best Practices]]
9. [[#09- Magic Box Problem]]
10. [[#10- Key Points to Remember]]
11. [[#11- Summary]]
---

## 01- Introduction to Functions

### Problem Without Functions

```cpp
int main()
{
    cout << "Hello";
    cout << "Good morning";
    cout << "Good Bye";
    cout << "------------";
    
    // ... more code ...
    
    cout << "Hello";
    cout << "Good morning";
    cout << "Good Bye";
    cout << "------------";
    
    // ... more code ...
    
    cout << "Hello";
    cout << "Good morning";
    cout << "Good Bye";
    cout << "------------";
    
    return 0;
}
```

**Issues:**

- Code repetition
- Hard to maintain
- Difficult to modify
- Poor organization

### Solution: Functions

A **function** is a group of code statements together with a specific name. When you need to use this code, you call that name.

---
## 02- Function Syntax

```cpp
ReturnType FunctionName(input_parameters)
{
    // Code here
}
```

### Components

1. **Return Type**: The data type the function returns
    - `void` if function returns nothing
    - Any data type (`int`, `double`, `char`, etc.) if function returns a value
2. **Function Name**: Identifier for the function
3. **Parameters**: Input values (optional)
4. *Argument:* pass value to function 
5. **Function Body**: Code enclosed in braces `{}`

### Key Rule

If a function returns anything other than `void`, it **must** use the `return` keyword.

---

## 03- Function Types

### 1. Void Function (No Return Value)

```cpp
void TryMe()
{
    cout << "Hello";
    cout << "Good morning";
    cout << "Good Bye";
}

int main()
{
    // Call the function
    TryMe();
    
    // ... more code ...
    
    TryMe();
    
    // ... more code ...
    
    TryMe();
    
    return 0;
}
```

### 2. Function with Return Value

```cpp
int Add(int left, int right)
{
    return left + right;
}

int main()
{
    int result = Add(5, 3);  // result = 8
    cout << result;
    
    return 0;
}
```

---

## 04- Function Parameters

### Without Parameters

```cpp
void Greet()
{
    cout << "Hello, World!" << endl;
}
```

### With Parameters

```cpp
void Greet(string name)
{
    cout << "Hello, " << name << "!" << endl;
}

int main()
{
    Greet("Alice");  // Output: Hello, Alice!
    Greet("Bob");    // Output: Hello, Bob!
}
```

### Multiple Parameters

```cpp
void Add(int left, int right)
{
    int result = left + right;
    cout << "Result = " << result << endl;
}

int main()
{
    int x, y;
    cout << "Enter x\n";
    cin >> x;  // 3
    cout << "Enter y\n";
    cin >> y;  // 4
    
    // Compiler passes VALUES
    Add(x, y);  // Equivalent to: Add(3, 4)
    
    return 0;
}
```

**Important:** The compiler passes **VALUES** of variables, not the variables themselves.

---
## 05- Return Values

### Basic Return

```cpp
int Add(int left, int right)
{
    int result = left + right;
    return result;  // Compiler returns VALUE: return 7;
}
```

### Simplified Return

```cpp
int Add(int left, int right)
{
    return left + right;  // Direct return
}
```

### Using Return Values

```cpp
int main()
{
    int x, y;
    cout << "Enter x\n";
    cin >> x;  // 3
    cout << "Enter y\n";
    cin >> y;  // 4
    
    // Option 1: Call without using return value
    Add(x, y);  // Does nothing with result
    
    // Option 2: Store return value
    int z = Add(x, y);
    cout << z;  // Output: 7
    
    // Option 3: Use return value directly
    cout << Add(x, y);  // Output: 7
    
    return 0;
}
```

### Unreachable Code

```cpp
int Add(int left, int right)
{
    return left + right;
    
    // UNREACHABLE CODE - Never executes
    int abc = 10;
    cout << abc;
}
```

**Warning:** Any code after a `return` statement is unreachable and will not execute.

---
## 06- Function Evolution Example

### Version 1: Function Handles Everything

```cpp
void Add()
{
    int result;
    int x, y;
    cout << "Enter x\n";
    cin >> x;  // 3
    cout << "Enter y\n";
    cin >> y;  // 4
    result = x + y;
    cout << "x + y = " << result << endl;
}

int main()
{
    Add();  // Output: 7
    return 0;
}
```

**Issues:**

- Function does too many things (input, calculation, output)
- Not reusable
- Violates Single Responsibility Principle

### Version 2: Function with Parameters

```cpp
void Add(int left, int right)
{
    int result;
    result = left + right;
    cout << "Result = " << result << endl;
}

int main()
{
    int x, y;
    cout << "Enter x\n";
    cin >> x;  // 3
    cout << "Enter y\n";
    cin >> y;  // 4
    Add(x, y);  // Compiler passes VALUES: Add(3, 4)
    
    return 0;
}
```

**Improvements:**

- Input separated from calculation
- More reusable
- Still couples calculation with output

### Version 3: Function Returns Value

```cpp
int Add(int left, int right)
{
    return left + right;
}

int main()
{
    int x, y;
    cout << "Enter x\n";
    cin >> x;  // 3
    cout << "Enter y\n";
    cin >> y;  // 4
    
    int z = Add(x, y);
    cout << z;  // Output: 7
    
    // Or directly:
    cout << Add(x, y);  // Output: 7
    
    return 0;
}
```

**Best Version:**

- Single Responsibility: Only performs addition
- Fully reusable
- Caller decides what to do with result
- Follows SOLID principles

---

## 07- SOLID Principles  (SRP)

### Single Responsibility Principle (SRP)

**Definition:** A function should have one, and only one, reason to change. Each function should do one thing well.

**Bad Example:**

```cpp
void ProcessStudent()
{
    // Gets input
    // Validates data
    // Calculates grade
    // Saves to database
    // Prints result
    // Sends email
}
```

**Good Example:**

```cpp
void GetStudentInput() { }
bool ValidateStudentData() { }
double CalculateGrade() { }
void SaveToDatabase() { }
void PrintResult() { }
void SendEmail() { }
```

**Benefits:**

- Easier to test
- Easier to maintain
- More reusable
- Better organization

---

## 08- Best Practices

### 1. Use Descriptive Names

```cpp
// Bad
void fn() { }
int calc(int a, int b) { }

// Good
void PrintReport() { }
int CalculateTotal(int price, int quantity) { }
```

### 2. Keep Functions Small

A function should do one thing and do it well. If a function is too long, break it into smaller functions.

```cpp
// Bad - Too many responsibilities
void ProcessOrder()
{
    ValidateOrder();
    CalculateTotal();
    ApplyDiscount();
    ProcessPayment();
    UpdateInventory();
    SendConfirmation();
}

// Good - Each task is a separate function
void ValidateOrder() { }
double CalculateTotal() { }
double ApplyDiscount(double total) { }
bool ProcessPayment(double amount) { }
void UpdateInventory() { }
void SendConfirmation() { }
```

### 3. Avoid Side Effects

Functions should avoid modifying global state or variables outside their scope.

```cpp
// Bad - Modifies global variable
int total = 0;
void AddToTotal(int value)
{
    total += value;  // Side effect
}

// Good - Returns value
int Add(int a, int b)
{
    return a + b;
}
```

### 4. Use Return Values Appropriately

```cpp
// Bad - Prints inside function
void Calculate(int a, int b)
{
    cout << a + b;  // Hard to reuse
}

// Good - Returns value
int Calculate(int a, int b)
{
    return a + b;  // Flexible usage
}
```

### 5. Document Complex Functions

```cpp
/**
 * Calculates the area of a circle
 * @param radius The radius of the circle
 * @return The area of the circle
 */
double CalculateCircleArea(double radius)
{
    return 3.14159 * radius * radius;
}
```

---

## 09- Magic Box Problem : 

### Custom Function for Console Manipulation

```cpp
#include <stdlib.h>
#include <windows.h>
#include <iostream>
using namespace std;

void gotoxy(int column, int row)
{
    COORD coord;
    coord.X = column;
    coord.Y = row;
    SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE), coord);
}

int main()
{
    int size, row,col;
    size=3;
    row=1;
    col= size/2 + 1;

    for(int i=1;i<=size*size;i++)
    {

        gotoxy(col,row);
        cout<<i;
        
        //process before i became 2
        if(i%size!=0) //reminder => i is odd 
        {
            row--;
            col--;
            if(col<1){col=size;}
            if(row<1){row=size;}
        }
        else  //no reminder
        {
            row++;
        }
    } 
    return 0;
}
```

**Note:** This function uses Windows-specific libraries and works only on Windows systems.

---

## 10- Key Points to Remember

1. Functions promote code reusability
2. Each function should have a single responsibility
3. Use parameters to make functions flexible
4. Return values for maximum reusability
5. Code after `return` is unreachable
6. Compiler passes values, not variables
7. Choose meaningful function names
8. Keep functions small and focused
---
## 11- Summary

|Feature|Description|Example|
|---|---|---|
|**Void Function**|Returns nothing|`void Print() { }`|
|**Return Function**|Returns a value|`int Add(int a, int b) { }`|
|**Parameters**|Input to function|`void Display(string msg) { }`|
|**Return Statement**|Exits and returns value|`return result;`|
|**Function Call**|Executing a function|`Add(5, 3);`|


---
### <span style="color:#3498db">Created By Abdullah Ali</span>
***
## <span style="color:#27ae60;font:300px;align-items:center">وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ﴾ [هود: 88] ﴿ </span>
