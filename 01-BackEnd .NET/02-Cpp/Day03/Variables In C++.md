# C++ Variable Types

## Table of Contents

1. [[#01- Local Variables]]
2. [[#02- Global Variables]]
3. [[#03- Static Variables]]
---

## 01- Local Variables

### Definition

Variables declared inside a scope (within `{}` or `()`)

### Characteristics

- **Access:** Any code inside or below the scope
- **Lifetime:** Ends at the end of its scope
- **Storage:** Stack memory

### Example

```cpp
int Add(int a, int b) // a and b are local variables
{
    a = 44;
}

int main()
{  
    Add(11, 22);
    int a;
    int x;
    x = 100;
  
    for (int i = 0; i < 10; i++)
    {
        // i is only accessible here
    }
    // i = 55; // COMPILE ERROR - i is out of scope
  
    do
    {
        int result = 10;  
    }
    while (result == 10); // COMPILE ERROR - result is out of scope
  
    return 0;
}
```

---

## 02- Global Variables

### Definition

Variables declared outside any scope (before main function)

### Characteristics

- **Access:** Any code in the program
- **Lifetime:** Ends at the end of the program
- **Storage:** Data Segment (BSS)

### Example

```cpp
#include <iostream>
using namespace std;

int x = 10; // Global variable

void PrintMe()
{
    x = 100; // Can access global x
}

int main()
{  
    int x = -10; // Local variable shadows global x
  
    cout << x; // Prints: -10 (local variable)
    
    // C++ way to access global x
    cout << ::x; // Prints: 10 (global variable)
    ::x = 900; // Modifying global x
    
    // C style way to access global x
    {
        extern int x;
        x = 900;
    }
    
    return 0;
}
```

---

## 03- Static Variables

### Definition

Local variables declared with the `static` keyword, initialized only once in memory regardless of how many times the function is called

### Characteristics

- **Access:** Any code inside the scope
- **Lifetime:** Alive until program ends
- **Storage:** Data Segment (BSS)
- **Default Value:** Always initialized to 0

### Example Without Static

```cpp
void TryMe()
{
    int x = 0;
    x++;
    cout << x;
}

int main()
{
    TryMe(); // Output: 1
    TryMe(); // Output: 1
    TryMe(); // Output: 1
}
```

### Example With Static

```cpp
void TryMe()
{
    // This line executes at first function call ONLY
    static int x; // Automatically initialized to 0
    x++;
    cout << x;
}

int main()
{
    // int result; cout << result; // Would print garbage value
    TryMe(); // Output: 1
    TryMe(); // Output: 2
    TryMe(); // Output: 3
}
```

### Key Point

Static variables are declared ONCE and only ONCE in memory, maintaining their value between function calls.


---
### <span style="color:#3498db">Created By Abdullah Ali</span>
***
## <span style="color:#27ae60;font:300px;align-items:center">وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ﴾ [هود: 88] ﴿ </span>
