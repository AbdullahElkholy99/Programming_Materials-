## Table of Contents

1. [[#01- If Statement]]
2. [[#02- If-Else Statement]]
3. [[03- If-Else If-Else Ladder]]
4. [[#04- Nested If Statements]]
5. [[#05- Multiple Independent If Statements]]
6. [[#06- Switch Statement]]
7. [[#07- Switch vs If-Else]]
8. [[#08- Important Notes]]
9. [[#09- Best Practices]]

---

## 01- If Statement

### Syntax

```cpp
if (condition)
{
    // Code here executes if condition is true
}
```

### Description

Executes a block of code only when the condition evaluates to true.

---

## 02- If-Else Statement

### Syntax

```cpp
if (condition)
{
    // Code here executes if condition is true
}
else
{
    // Code here executes if condition is false
}
```
### Description

Provides an alternative path when the condition is false.

---

## 03- If-Else If-Else Ladder

### Syntax

```cpp
if (condition1)
{
    // Code here executes if condition1 is true
}
else if (condition2)
{
    // Code here executes if condition2 is true
}
else if (condition3)
{
    // Code here executes if condition3 is true
}
else
{
    // Code here executes if all conditions are false
}
```

### Example: Grade System

```cpp
#include <iostream>
using namespace std;

int main()
{
    int grade;
    cout << "Please enter grade\n";
    cin >> grade;

    if (grade >= 85)
    {
        cout << "A";
    }
    else if (grade >= 75 && grade < 85)
    {
        cout << "B";
    }
    else if (grade >= 65 && grade < 75)
    {
        cout << "C";
    }
    else
    {
        cout << "Invalid input";
    }
    
    return 0;
}
```

### Example: Month Names (Not Recommended)

```cpp
int main()
{
    int month;
    cout << "Enter month number\n";
    cin >> month;

    if (month == 1)
    {
        cout << "Jan";
    }
    else if (month == 2)
    {
        cout << "Feb";
    }
    else if (month == 3)
    {
        cout << "Mar";
    }
    else if (month == 4)
    {
        cout << "Apr";
    }
    // ... more months
    else
    {
        cout << "Invalid input";
    }
    
    return 0;
}
```

**Note:** Using if-else for checking specific values is not recommended. Use switch instead.

---

## 04- Nested If Statements

### Syntax

```cpp
if (condition1)
{
    if (condition2)
    {
        // Code here executes if both conditions are true
    }
}
else if (condition3)
{
    // Code here executes if condition3 is true
}
```

### Description

If statements can be nested inside other if statements for more complex conditions.

---

## 05- Multiple Independent If Statements

### Syntax

```cpp
if (condition1)
{
    // Code here executes if condition1 is true
}
if (condition2)
{
    // Code here executes if condition2 is true
}
if (condition3)
{
    // Code here executes if condition3 is true
}
```

### Description

Unlike if-else ladders, each if statement is evaluated independently. Multiple blocks can execute.

---

## 06- Switch Statement

### Definition

The switch statement is designed for checking specific values efficiently. It is available for **int** and **char** data types only.

### Syntax

```cpp
switch (variable)
{
    case value1:
        // Code
        break;
    case value2:
        // Code
        break;
    case value3:
        // Code
        break;
    default:
        // Code when no case matches
        break;
}
```

### Example: Month Names (Recommended)

```cpp
int main()
{
    int month;
    cout << "Enter month number\n";
    cin >> month;
    
    switch (month)
    {
        case 1:
            cout << "Jan";
            break;
        case 2:
            cout << "Feb";
            break;
        case 3:
            cout << "Mar";
            break;
        case 4:
            cout << "Apr";
            break;
        case 5:
            cout << "May";
            break;
        case 6:
            cout << "Jun";
            break;
        case 7:
            cout << "Jul";
            break;
        case 8:
            cout << "Aug";
            break;
        case 9:
            cout << "Sep";
            break;
        case 10:
            cout << "Oct";
            break;
        case 11:
            cout << "Nov";
            break;
        case 12:
            cout << "Dec";
            break;
        default:
            cout << "Invalid";
            break;
    }
    
    return 0;
}
```

### Example: Grade Evaluation with Fall-Through

```cpp
int main()
{
    char grade;
    cout << "Enter grade" << endl;
    cin >> grade;

    switch (grade)
    {
        case 'A':
        case 'a':
            cout << "Excellent\n";
            break;
        case 'B':
        case 'b':
            cout << "Very Good\n";
            break;
        case 'C':
        case 'c':
            cout << "Good\n";
            break;
        case 'D':
        case 'd':
            cout << "Fair\n";
            break;
        default:
            cout << "Invalid\n";
            break;
    }
    
    return 0;
}
```

---
## 07- Switch vs If-Else

### When to Use Switch

**Use switch when:**

- Checking a variable against multiple specific values
- Working with int or char types only
- Need cleaner, more readable code for equality comparisons

**Advantages:**

- More efficient for multiple value checks
- Cleaner and more readable
- Better performance for many cases

### When to Use If-Else

**Use if-else when:**

- Checking ranges of values (e.g., grade >= 85)
- Complex conditions with logical operators (&&, ||)
- Working with data types other than int or char
- Comparing different variables

## how switch work : 

| Type        | Works in             | Internal Mechanism                     | Performance | Notes                            |
| ----------- | -------------------- | -------------------------------------- | ----------- | -------------------------------- |
| **Integer** | C, C++, Java, etc.   | Direct integer comparison / jump table | ⚡ Fast      | Most efficient                   |
| **Char**    | C, C++, Java, etc.   | Treated as integer (ASCII)             | ⚡ Fast      | Equivalent to integer            |
| **String**  | Java, C# (not C/C++) | Hash + equals() comparison             | ⚙️ Slower   | Needs more memory and processing |

---

## 08- Important Notes

### Break Statement

The `break` statement is crucial in switch statements:

```cpp
switch (grade)
{
    case 'A':
        cout << "Excellent\n";
        // Forgot break - FALL THROUGH to next case!
    case 'B':
        cout << "Very Good\n";
        break;
}
```

**Without break:** Execution continues to the next case (fall-through behavior).

### Fall-Through Feature

Fall-through can be useful for grouping cases:

```cpp
case 'A':
case 'a':
    cout << "Excellent\n";
    break;  // Both 'A' and 'a' execute this code
```

### Default Case

The `default` case handles all values not explicitly covered:

```cpp
default:
    cout << "Invalid input";
    break;
```

### Switch Limitations

1. **Only works with int and char**
2. **Cannot use ranges** (e.g., case 1-10)
3. **Cannot use variables in case labels** (must be constants)
4. **Each case must have a constant value**

---

## 09- Best Practices

1. Always use `break` unless intentional fall-through is desired
2. Include a `default` case for error handling
3. Use switch for equality checks with specific values
4. Use if-else for range checks and complex conditions
5. Keep switch statements readable by proper indentation
6. Comment intentional fall-through cases


---
### <span style="color:#3498db">Created By Abdullah Ali</span>
***
## <span style="color:#27ae60;font:300px;align-items:center">وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ﴾ [هود: 88] ﴿ </span>
