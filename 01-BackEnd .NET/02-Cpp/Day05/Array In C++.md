## Table of Contents

1. [Introduction to Arrays]
2. [One-Dimensional Arrays]
3. [Array Memory and Addressing]
4. [Array Initialization]
5. [Two-Dimensional Arrays]
6. [2D Array Initialization]
7. [Important Notes]

---

## Introduction to Arrays

### Problem Statement

Without arrays, storing data for multiple entities becomes impractical:

```cpp
// 20 students with 5 subjects each
float std1sub1, std1sub2, std1sub3, std1sub4, std1sub5;
float std2sub1, std2sub2, std2sub3, std2sub4, std2sub5;
// ... This creates 100 variables!
```

### Solution

Arrays allow us to store multiple values under one variable name, reducing 100 variables to just 20 (or eventually to 1 with 2D arrays).

### Definition

An array is a **fixed-size collection of data** with the **same data type**, stored **sequentially in memory**.

---

## One-Dimensional Arrays

### Syntax

```cpp
DataType variableName[arraySize];
```

### Declaration Examples

```cpp
int arr[5];
// Declares an array of 5 integers
// Size in memory: 5 * sizeof(int) = 5 * 4 = 20 bytes
```

### Accessing Array Elements

Arrays use **zero-based indexing** (index starts from 0).

```cpp
int arr[10];
// Memory:  arr |1| | |8| | | | | | |
// Index:        0 1 2 3 4 5 6 7 8 9

// SET values
arr[0] = 1;
arr[3] = 8;

// GET values
cout << arr[0];        // Output: 1
cout << arr[1];        // Output: rubbish (uninitialized)
int result = arr[3];   // result = 8
```

### Complete Example

```cpp
int main()
{
    int arr[5];
    
    // Input values
    for(int i = 0; i < 5; i++)
    {
        cout << "Enter number at index " << i << endl;
        cin >> arr[i];
    }
    
    // Output values
    for (int i = 0; i < 5; i++)
    {
        cout << "Number at index " << i << " = " << arr[i] << endl;
    }
    
    return 0;
}
```

### Array Size in Memory

```cpp
int main()
{
    double darr[5];  // Size: 40 bytes (5 * 8)
    char carr[5];    // Size: 5 bytes (5 * 1)
}
```

---

## Array Memory and Addressing

### Array Name as Address

```cpp
int main()
{
    int arr[5];
    cout << arr;  // Output: 0x10 (memory address)
    
    // The array name itself is the address of the first element
    // This address is CONSTANT and cannot be changed
    
    return 0;
}
```

**Key Point:** The array name represents a constant address pointing to the first element.

---
## Array Initialization

### Basic Initialization

```cpp
int main()
{
    // Uninitialized array (contains garbage values)
    int arr[5];  // arr|#|#|#|#|#|
    
    // Manual initialization to zero
    for (int i = 0; i < 5; i++)
    {
        arr[i] = 0;
    }
    
    // Direct initialization
    int arr[5] = {1, 2, 3, 4, 5};     // arr|1|2|3|4|5|
    int arr[10] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    
    // Partial initialization (rest filled with zeros)
    int arr[10] = {1, 2, 3, 4};       // arr|1|2|3|4|0|0|0|0|0|0|
    
    // Initialize all to zero
    int arr[5] = {0, 0, 0, 0, 0};     // arr|0|0|0|0|0|
    int arr[10] = {0};                // arr|0|0|0|0|0|0|0|0|0|0|
    
    // Size inferred from initialization
    int arr[] = {1, 2, 3, 4, 5};      // Size = 5
    
    return 0;
}
```

### Initialization Rules

**Valid:**

```cpp
int arr[5] = {1, 2, 3, 4, 5};
int arr[] = {1, 2, 3, 4, 5};
int arr[10] = {0};
```

**Invalid:**

```cpp
int arr[];                    // COMPILE ERROR (no size)
int arr[5] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};  // COMPILE ERROR (too many values)

// Cannot reassign after declaration
int arr[5];
arr = {1, 2, 3, 4, 5};       // COMPILE ERROR
arr = 0x10;                  // COMPILE ERROR (constant address)
```

### Dynamic Array Size (Non-Standard)

```cpp
// NOT STANDARD (works with some compilers like Code::Blocks)
int size;
cout << "Enter array size\n";
cin >> size;
int arr[size];  // Non-standard C++

// Standard way to dynamically allocate arrays is covered later
```

---

## Two-Dimensional Arrays

### Syntax

```cpp
int arr[rowSize][colSize];
```

### Declaration and Access

```cpp
int main()
{
    // Declare 2D array with 3 rows and 4 columns
    int arr[3][4];
    
    // Size in memory: 3 * 4 * sizeof(int) bytes
    
    // Access individual elements
    arr[0][0] = 1;
    arr[0][1] = 2;
    arr[0][2] = 3;
    arr[0][3] = 4;
    arr[1][0] = 5;
    arr[1][1] = 6;
    // ...
}
```

### Input and Output

```cpp
int main()
{
    int arr[3][4];
    
    // Input values
    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < 4; j++)
        {
            cout << "Enter number at index " << i << "," << j << endl;
            cin >> arr[i][j];  
        }
    }
    
    // Output as list
    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < 4; j++)
        {
            cout << "Number at index " << i << "," << j 
                 << " = " << arr[i][j] << endl;
        }
    }
    
    // Output as table
    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < 4; j++)
        {
            cout << arr[i][j] << "\t";
        }
        cout << endl;
    }
}
```

### Practical Example: Sum of Rows

```cpp
int main()
{
    int arr[3][4];
    int sum[3] = {0};  // Initialize sum array to zero
    
    // Input array values
    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < 4; j++)
        {
            cin >> arr[i][j];
        }
    }
    
    // Calculate sum of each row
    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < 4; j++)
        {
            sum[i] += arr[i][j];
        }
    }
    
    // Display row sums
    for (int i = 0; i < 3; i++)
    {
        cout << "Sum of row " << i << ": " << sum[i] << endl;
    }
    
    return 0;
}
```

---

## 2D Array Initialization

### Valid Initialization

```cpp
int main()
{
    // Full initialization
    int arr[3][4] = {{1, 1, 1, 1}, {2, 2, 2, 2}, {3, 3, 3, 3}};
    
    int arr[2][3] = {{1, 1, 1}, {2, 2, 2}};
    
    // Size can be inferred for rows but NOT columns
    int arr[][3] = {{1, 1, 1}, {2, 2, 2}, {3, 3, 3}};
    
    // Partial initialization with different row sizes
    int arr[][3] = {{1}, {2, 2}, {3, 3, 3}};
    /*
    output : 
	    1 0 0 
	    2 2 0
	    3 3 3
    */
}
```

### Invalid Initialization

```cpp
int main()
{
    // COMPILE ERROR - must specify column size
    int arr[][] = {{1, 1, 1}, {2, 2, 2}};
}
```

---

## Important Notes

### Memory Addressing in 2D Arrays

```cpp
int main()
{
    int arr[3][4];
    
    // arr          -> Base address of entire array
    // arr[0]       -> Address of first row (first element)
    // arr[0][0]    -> Integer value at [0][0]
}
```

### Key Points to Remember

1. **Array indices start from 0**
2. **Array size is fixed at compile time** (for standard arrays)
3. **Array name is a constant address**
4. **Uninitialized arrays contain garbage values**
5. **Partial initialization fills remaining elements with zeros**
6. **In 2D arrays, column size must always be specified**
7. **Arrays are stored sequentially in memory**
8. **Cannot reassign array after declaration**

### Getting Array Length

```cpp
int arr[5];
int length = sizeof(arr) / sizeof(int);  // length = 5
```

---
### <span style="color:#3498db">Created By Abdullah Ali</span>
***
## <span style="color:#27ae60;font:300px;align-items:center">وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ﴾ [هود: 88] ﴿ </span>
