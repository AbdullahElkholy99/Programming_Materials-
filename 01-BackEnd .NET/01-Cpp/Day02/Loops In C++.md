## Table of Contents

1. [[#01- Introduction to Loops]]
2. [[#02- For Loop]]
3. [[#03- Nested For Loops]]
4. [[#04- Do-While Loop]]
5. [[#05- While Loop]]
6. [[#06-Do-While vs While]]
7. [[#07- Common Pitfalls]]
8. [[#08- Best Practices]]

---

## 01- Introduction to Loops

### Why Loops?

**Problem without loops:**

```cpp
cout << "Hello SD and OS\n";
cout << "Hello SD and OS\n";
cout << "Hello SD and OS\n";
cout << "Hello SD and OS\n";
cout << "Hello SD and OS\n";
```

**Issues with copy-paste:**

- Bad programming practice
- Redundant effort
- High cost of declaration
- High cost of modifications

**Solution:** Use loops to repeat code efficiently.

---

## 02- For Loop

### Definition

Used when you know the **specific number of iterations** in advance.

### Syntax

```cpp
for (initial_value; condition; increment/decrement)
{
    // Code here executes if condition is true
}
```

### Execution Order

```cpp
// Step #1: Initialize
// Step #2: Check condition
// Step #3: Execute code block
// Step #4: Increment/Decrement
// Step #5: Go back to step #2
```

### Basic Example

```cpp
int main()
{
    // #1: i=1   #2: i<6?   #5: Check again   #4: i++
    for (int i = 1; i < 6; i++)
    {
        // #3: Execute
        cout << "Hello SD & OS\n";
    }
    
    // Memory: i = 1, 2, 3, 4, 5, 6 (stops when i=6)
    
    // Output:
    // Hello SD & OS
    // Hello SD & OS
    // Hello SD & OS
    // Hello SD & OS
    // Hello SD & OS
    
    return 0;
}
```

### Decrementing Loop

```cpp
int main()
{
    for (int i = 10; i > 0; i--)
    {
        cout << i << endl;
    }
    // Output: 10 9 8 7 6 5 4 3 2 1
    
    return 0;
}
```

---

## 03- Nested For Loops

### Definition

A loop inside another loop. Useful for working with multi-dimensional data structures.

### Example

```cpp
int main()
{
    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < 4; j++)
        {
            cout << i << "," << j << endl;
        }
    }
    
    // Memory: i = 0, 1, 2 | j = 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3
    
    // Output:
    // 0,0
    // 0,1
    // 0,2
    // 0,3
    // 1,0
    // 1,1
    // 1,2
    // 1,3
    // 2,0
    // 2,1
    // 2,2
    // 2,3
    
    return 0;
}
```

### Multiple Variables in For Loop

```cpp
for (int i = 0, j = 0; i < 10 || j < 11; i++, j--)
{
    // Code here
}
```

---

## 04- Do-While Loop

### Definition

Used when you need to execute code **at least once** and don't know the exact number of iterations.

### Syntax

```cpp
do
{
    // Code here executes at least once
} while (condition);
```

### Key Feature

**Executes code FIRST, then checks condition.**

### Example: Accumulator

```cpp
int main()
{
    int container = 0;
    int num;

    do
    {
        cout << "Enter a number\n";
        cin >> num;  // 10, 70, -100, 1000
        container += num;
        cout << "Debug: " << container << endl;
    } while (container < 100);
    
    cout << "Container = " << container;

    return 0;
}
```

### Example: Input Validation (Age)

```cpp
int main()
{
    int age;
    
    do
    {
        cout << "Enter age (18-60)\n";
        cin >> age;  // 80, 90, 10, 22
    } while (age < 18 || age > 60);
    
    cout << "Age = " << age << endl;  // 22

    return 0;
}
```

### Example: Input Validation (Even Number)

```cpp
int main()
{
    int evenNum;

    do
    {   
        cout << "Enter even number\n";
        cin >> evenNum;  // 10
    } while (evenNum % 2 != 0);
    
    cout << "Even number is " << evenNum << endl;  // 10
    
    return 0;
}
```

---

## 05- While Loop

### Definition

Used when you need to check the condition **before** executing the code and don't know the exact number of iterations.

### Syntax

```cpp
while (condition)
{
    // Code here executes if condition is true
}
```

### Key Feature

**Checks condition FIRST, then executes code (may never execute).**

### Example: Accumulator

```cpp
int main()
{
    int container = 0;
    int num;

    while (container < 100)
    {
        cout << "Enter a number\n";
        cin >> num;  // 10, 70, -100, 1000
        container += num;
        cout << "Debug: " << container << endl;
    }
    
    cout << "Container = " << container;

    return 0;
}
```

---

## 06-Do-While vs While

### Comparison Table

|Feature|Do-While|While|
|---|---|---|
|**Execution**|Execute first, then check|Check first, then execute|
|**Minimum Executions**|At least once|Zero or more times|
|**Use Case**|When code must run at least once|When code may not need to run|

### When to Use Do-While

Use do-while when you need to:

- Get user input that must be validated
- Execute code at least once before checking a condition
- Initialize variables through user input before checking them

**Example Scenario:**

```cpp
// Need to enter age first, then validate
do
{
    cout << "Enter age\n";
    cin >> age;
} while (age < 18 || age > 60);
```

### When to Use While

Use while when:

- The condition should be checked before any execution
- The code block might not need to execute at all
- You're processing data that might already meet the exit condition

---

## 07- Common Pitfalls

### Pitfall 1: Accidental Assignment in Condition

```cpp
int main()
{
    int age = 10;
    
    if (age = 0)  // WRONG! Assignment, not comparison
    {
        cout << "True: " << age;  // Never executes
    }
    else
    {
        cout << "False";  // Always executes
    }
    // Memory: age = 0 (reassigned!)
    
    return 0;
}
```

**Correct:**

```cpp
if (age == 0)  // Comparison operator
```

### Pitfall 2: Semicolon After For Loop

```cpp
int main()
{
    for (int i = 0; i < 10; i++);  // WRONG! Semicolon here
    {
        // This code executes only once, not 10 times
        cout << "This runs once!" << endl;
    }
    
    return 0;
}
```

**Correct:**

```cpp
for (int i = 0; i < 10; i++)  // No semicolon
{
    // Code here runs 10 times
}
```

---

## 08- Best Practices

### 1. Choose the Right Loop

- **For loop:** When you know the number of iterations
- **Do-while loop:** When code must execute at least once
- **While loop:** When the condition should be checked first

### 2. Input Validation

Always use do-while for input validation:

```cpp
int evenNum;
do
{
    cout << "Enter even number\n";
    cin >> evenNum;
} while (evenNum % 2 != 0);
```

### 3. Avoid Infinite Loops

Ensure your loop has a way to exit:

```cpp
// INFINITE LOOP - BAD
while (true)
{
    cout << "Forever...\n";
}

// GOOD
int counter = 0;
while (counter < 10)
{
    cout << "Count: " << counter << endl;
    counter++;  // Exit condition
}
```

### 4. Use Meaningful Variable Names

```cpp
// Bad
for (int x = 0; x < 10; x++) { }

// Good
for (int studentIndex = 0; studentIndex < 10; studentIndex++) { }
```

### 5. Initialize Loop Variables

```cpp
int sum = 0;  // Initialize before use
for (int i = 0; i < 10; i++)
{
    sum += i;
}
```

---

## 09- Summary

|Loop Type|Iterations Known?|Minimum Executions|Best Use Case|
|---|---|---|---|
|**For**|Yes|0|Counting, arrays, specific iterations|
|**While**|No|0|Condition-based, may not execute|
|**Do-While**|No|1|Input validation, must execute once|

---
### <span style="color:#3498db">Created By Abdullah Ali</span>
***
## <span style="color:#27ae60;font:300px;align-items:center">وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ﴾ [هود: 88] ﴿ </span>
