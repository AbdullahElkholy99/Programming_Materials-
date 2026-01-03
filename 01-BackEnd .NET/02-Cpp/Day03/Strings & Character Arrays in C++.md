# **Guide:**
1. [[]]
---
# 01- String Concept in C++

- There is no data type called string in traditional C
- We use string as an array of characters
- Example: `char name[14+1];`
    - The +1 is for the null terminator `\0`
- When using `cin>>name;` it reads until space or Enter
- Memory storage: `|a|l|i|\0|||`
    - Each character occupies one cell
    - `\0` marks the end of the string
- When printing with `cout<<name;` it prints until `\0`
- Libraries like `<string.h>` or `<cstring>` provide string functions

---
# 02- ASCII Code Examples

### <span style="color:#16a085">Example 1: Reading ASCII with `cin`</span>

```cpp
#include <iostream>
using namespace std;

int main()
{
    char ch;
    cout << "Enter any key\n";
    cin >> ch;  // Type: M then press ENTER
    
    cout << "ASCII = " << (int)ch << endl;
    // Output: ASCII = 77 (for 'M')
    
    return 0;
}
```

**How it works:**

```
Input Process:
User types: M [ENTER]
           ↓
cin reads: 'M' (waits for ENTER)
           ↓
Stored in ch: 'M' (ASCII 77)
           ↓
Cast to int: (int)ch → 77

Note: cin stops at whitespace and requires ENTER
```

---

### <span style="color:#27ae60">Example 2: Reading ASCII with `getch()` (Immediate)</span>

```cpp
#include <iostream>
#include <conio.h>  // Required for getch()
using namespace std;

int main()
{
    char ch;
    cout << "Enter any key\n";
    ch = getch();  // Reads immediately, no ENTER needed
    
    cout << "ASCII = " << (int)ch << endl;
    
    return 0;
}
```

**Comparison: `cin` vs `getch()` vs `getche()`**

|Function|Header|Waits for ENTER?|Shows typed character?|Reads non-printable keys?|
|---|---|---|---|---|
|`cin >>`|`<iostream>`|✅ Yes|✅ Yes|❌ No (only printable)|
|`getch()`|`<conio.h>`|❌ No (immediate)|❌ No (hidden)|✅ Yes (arrows, F1-F12, etc.)|
|`getche()`|`<conio.h>`|❌ No (immediate)|✅ Yes (echoes)|✅ Yes (all keys)|

**Special Key Codes:**

```
ENTER key    → ASCII 13
SPACE key    → ASCII 32
ESC key      → ASCII 27
Backspace    → ASCII 8
Arrow keys   → Extended codes (require getch())
```

---

# 03- cin VS getche() 

### <span style="color:#c0392b">Problem: Using `cin` in Loop</span>

```cpp
int main()
{
    char name[15];
    
    cout << "Please enter name" << endl;
    for (int i = 0; i < 15; i++)
    {
        cin >> name[i]; 
    }
    
    // If user types: Saleh
    // Output: Enter name
    // S[ENTER]a[ENTER]l[ENTER]e[ENTER]h[ENTER][ENTER]...
    // Problem: Requires ENTER after EACH character!
}
```

**Issue:** `cin >>` waits for ENTER after each character, making input tedious.

---

### <span style="color:#3498db">Better: Using `getche()` in Loop</span>

```cpp
int main()
{
    char name[15];
    
    cout << "Please enter name" << endl;
    for (int i = 0; i < 15; i++)
    {
        name[i] = getche();  // Reads immediately, shows character
    }
    
    // If user types: Saleh
    // Output: Enter name
    // Saleh[ENTER][ENTER][ENTER][ENTER]...
    // Problem: Still requires 15 characters even if name is shorter!
}
```

**Issue:** Loop runs exactly 15 times, even if user wants to stop earlier.

---

### <span style="color:#9b59b6">Using Loop Until ENTER (ASCII 13)</span>

```cpp
int main()
{
    char name[15];
    char ch;
    int i = 0;
    
    cout << "Please enter name" << endl;
    
    // Input loop
    do
    {
        ch = getche();
        name[i] = ch;
        i++;
    }
    while(ch != 13);  // Stop when ENTER is pressed
    
    // Output loop
    i = 0;
    while(name[i] != 13)
    {
        cout << name[i];
        i++;
    }
    
    // If user types: Saleh[ENTER]
    // Output: Saleh (correct!)
    
    return 0;
}
```

**Memory Diagram:**

```
After typing "Saleh" and pressing ENTER:

name array:
┌───┬───┬───┬───┬───┬────┬───┬───┬───┐
│ S │ a │ l │ e │ h │ 13 │ ? │ ? │ ? │
└───┴───┴───┴───┴───┴────┴───┴───┴───┘
  0   1   2   3   4   5    6   7   8

Problem: Array stores ENTER (13) instead of proper terminator!
```

---

## <span style="color:#27ae60">Standard String Terminator: `\0`</span>

### <span style="color:#16a085">What is `\0`?</span>

- **Null terminator** or **delimiter**
- ASCII value: **0**
- Default value for uninitialized `char`
- Marks the **end of a string**
- Standard convention in C/C++

### <span style="color:#f39c12">Correct String Input (Using `\0`)</span>

```cpp
int main()
{
    char name[15];
    char ch;
    int i = 0;
    
    cout << "Please enter name" << endl;
    
    // Input loop
    while((ch = getche()) != 13)  // Read until ENTER
    {
        name[i] = ch;
        i++;
    }
    name[i] = '\0';  // ✅ Proper string terminator!
    
    // Output loop
    i = 0;
    while(name[i] != '\0')
    {
        cout << name[i];
        i++;
    }
    
    return 0;
}
```

**Memory Diagram - Correct Version:**

```
After typing "Ali" and pressing ENTER:

Input Process:
User types: A l i [ENTER]
           ↓ ↓ ↓   ↓
Loop reads: A l i   stops (ch==13)
           ↓ ↓ ↓
name[0-2]:  A l i
           ↓ ↓ ↓   ↓
Final step:         add '\0'

name array:
┌───┬───┬───┬────┬───┬───┬───┬───┐
│ A │ l │ i │ \0 │ ? │ ? │ ? │ ? │
└───┴───┴───┴────┴───┴───┴───┴───┘
  0   1   2   3    4   5   6   7

i = 3 (points to where '\0' should go)
name[3] = '\0'

Output Process:
i = 0
while(name[i] != '\0'):
  - name[0] = 'A' → print 'A'
  - name[1] = 'l' → print 'l'
  - name[2] = 'i' → print 'i'
  - name[3] = '\0' → STOP

Result: Ali ✓
```

---

## <span style="color:#3498db">Using `cin` for String Input</span>

### <span style="color:#9b59b6">Basic `cin` for Strings</span>

```cpp
int main()
{
    char name[15];
    
    cout << "Enter name\n";
    cin >> name;  // Type: Abdullah Ali [ENTER]
    
    cout << name;
    // Output: Abdullah (stops at space!)
    
    return 0;
}
```

**How `cin >>` works with character arrays:**

```
Input: "Abdullah Ali" [ENTER]
       ↓
cin reads until whitespace or ENTER:
       ↓
name: |A|b|d|u|l|l|a|h|\0|||||
                        ↑
                   Auto-added by cin!

Key Points:
1. cin >> automatically adds '\0'
2. Stops at FIRST whitespace (space, tab, newline)
3. "Ali" is left in input buffer (ignored)

Output: Abdullah
        Prints until '\0'
```

**Memory Diagram:**

```
After cin >> name with input "Abdullah Ali":

name array:
┌───┬───┬───┬───┬───┬───┬───┬───┬────┬───┬───┐
│ A │ b │ d │ u │ l │ l │ a │ h │ \0 │ ? │ ? │
└───┴───┴───┴───┴───┴───┴───┴───┴────┴───┴───┘
  0   1   2   3   4   5   6   7   8    9  10

Input buffer still contains: " Ali\n" (ignored)

When cout << name:
Prints from index 0 until '\0' at index 8
Output: Abdullah
```

---

## <span style="color:#f39c12">Using `string.h` Library Functions</span>

### <span style="color:#16a085">Reading Full Lines with `gets()`</span>

```cpp
#include <iostream>
#include <string.h>  // or <cstring>
using namespace std;

int main()
{
    char name[11 + 1];  // 11 characters + 1 for '\0'
    
    cout << "Enter name: ";
    gets(name);  // Reads entire line including spaces
    
    puts(name);  // Prints string with newline
    
    return 0;
}
```

**Comparison: `cin >>` vs `gets()`**

| Aspect              | `cin >>`   | `gets()`                         |
| ------------------- | ---------- | -------------------------------- |
| **Stops at space?** | ✅ Yes      | ❌ No (reads full line)           |
| **Adds `\0`?**      | ✅ Yes      | ✅ Yes                            |
| **Reads until**     | Whitespace | ENTER only                       |
| **Safe?**           | ✅ Safer    | ⚠️ Unsafe (buffer overflow risk) |

**Example:**

```
Input: "Aya Mohamed" [ENTER]

Using cin >>:
name: |A|y|a|\0|||||||||
Output: Aya

Using gets():
name: |A|y|a| |M|o|h|a|m|e|d|\0|
Output: Aya Mohamed
```

**Warning about `gets()`:**

```
gets() is DEPRECATED and UNSAFE!

Problem: No size checking
If user enters more than 11 characters:
┌────────────────────────────────┐
│ name[12] - Buffer overflow!    │
│ Overwrites adjacent memory     │
│ Can crash program or worse     │
└────────────────────────────────┘

Safer alternative: fgets() or cin.getline()
```

---

## <span style="color:#e67e22">String Initialization Methods</span>

### <span style="color:#3498db">Method 1: Character-by-Character Initialization</span>

```cpp
int main()
{
    // ❌ WRONG - Missing '\0'
    char fname[15] = {'A', 'l', 'i'};
    // Memory: |A|l|i|?|?|?|?|?|?|?|?|?|?|?|?|
    // Problem: No terminator! Undefined behavior when printing
    
    // ✅ CORRECT - With '\0'
    char fname[15] = {'A', 'l', 'i', '\0'};
    // Memory: |A|l|i|\0|?|?|?|?|?|?|?|?|?|?|?|
    
    cout << fname;  // Output: Ali ✓
    
    return 0;
}
```

**Memory Diagram - Comparison:**

```
WITHOUT '\0' (WRONG):
┌───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ A │ l │ i │ ? │ ? │ ? │ ? │ ? │ ? │
└───┴───┴───┴───┴───┴───┴───┴───┴───┘
              ↑
              No terminator!
              cout keeps reading garbage!

WITH '\0' (CORRECT):
┌───┬───┬───┬────┬───┬───┬───┬───┬───┐
│ A │ l │ i │ \0 │ ? │ ? │ ? │ ? │ ? │
└───┴───┴───┴────┴───┴───┴───┴───┴───┘
              ↑
              Terminator!
              cout stops here ✓
```

---

### <span style="color:#27ae60">Method 2: String Literal Initialization (Recommended)</span>

```cpp
int main()
{
    // Automatic size calculation
    char lname[] = "Abdelrahman";
    // Compiler automatically:
    // 1. Counts characters: 11
    // 2. Adds '\0': 12th character
    // 3. Sets size to 12
    
    // Explicit size
    char fname[15] = "Ali";
    // Compiler adds '\0' automatically
    // Memory: |A|l|i|\0|?|?|?|?|?|?|?|?|?|?|?|
    
    cout << fname << endl;  // Ali
    cout << lname << endl;  // Abdelrahman
    
    return 0;
}
```

**Memory Diagram - String Literal:**

```
char lname[] = "Abdelrahman";

Compiler Process:
1. Count: A-b-d-e-l-r-a-h-m-a-n = 11 characters
2. Add '\0': 11 + 1 = 12 total
3. Allocate: char lname[12]

Memory Layout:
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬────┐
│ A │ b │ d │ e │ l │ r │ a │ h │ m │ a │ n │ \0 │
└───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴────┘
  0   1   2   3   4   5   6   7   8   9  10  11

sizeof(lname) = 12 bytes
strlen(lname) = 11 characters (excludes '\0')

char fname[15] = "Ali";

Memory Layout:
┌───┬───┬───┬────┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ A │ l │ i │ \0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │
└───┴───┴───┴────┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
  0   1   2   3    4   5   6   7   8   9  10  11  12  13  14
              ↑
         Null terminator
         Rest initialized to 0

sizeof(fname) = 15 bytes (array size)
strlen(fname) = 3 characters (until '\0')
```

---

## <span style="color:#9b59b6">`string.h` Library Functions</span>

### <span style="color:#16a085">Common String Functions</span>

```cpp
#include <string.h>  // C-style
// or
#include <cstring>   // C++ style (preferred)
```

**Available Functions:**

|Function|Purpose|Example|
|---|---|---|
|`gets(arr)`|Read entire line|`gets(name);`|
|`puts(arr)`|Print string with newline|`puts(name);`|
|`strlen(arr)`|Get string length|`int len = strlen(name);`|
|`strcpy(dest, src)`|Copy string|`strcpy(name1, name2);`|
|`strcat(dest, src)`|Concatenate strings|`strcat(name1, " Ahmed");`|
|`strcmp(str1, str2)`|Compare strings|`if(strcmp(s1, s2) == 0)`|

_Note: We'll cover these functions in detail in the next section._

---

## <span style="color:#c0392b">Key Concepts Summary</span>

### <span style="color:#3498db">String Basics</span>

1. **No built-in string type** in C++ (use character arrays)
2. **Always terminate with `\0`** (null terminator, ASCII 0)
3. **Array size** should include space for `\0`

### <span style="color:#f39c12">Input Methods Comparison</span>

|Method|Reads Spaces?|Requires ENTER?|Adds `\0`?|Best For|
|---|---|---|---|---|
|`cin >>`|❌ No|✅ Yes|✅ Yes|Single words|
|`gets()`|✅ Yes|✅ Yes|✅ Yes|Full lines (unsafe)|
|`getche()`|✅ Yes|❌ No|❌ No|Character input|
|`getch()`|✅ Yes|❌ No|❌ No|Hidden input|

### <span style="color:#27ae60">Best Practices</span>

✅ **DO:**

- Always allocate `size + 1` for strings (space for `\0`)
- Use string literals: `char name[] = "Ali";`
- Check array bounds to prevent overflow
- Initialize strings properly

❌ **DON'T:**

- Forget to add `\0` terminator
- Use `gets()` (unsafe, prefer `fgets()`)
- Access beyond array bounds
- Leave strings uninitialized

---

## <span style="color:#e67e22">Important Notes</span>

### <span style="color:#8e44ad">Memory Considerations</span>

```cpp
// Size calculation for strings
char name[11 + 1];  // 11 characters + 1 for '\0'

// Examples:
"Aya"        → needs 4 bytes  (A, y, a, \0)
"Mohamed"    → needs 8 bytes  (M, o, h, a, m, e, d, \0)
"Abdelrahman"→ needs 12 bytes (11 chars + \0)
```

### <span style="color:#3498db">ASCII Values to Remember</span>

```
ENTER key (carriage return) → 13
Null terminator '\0'        → 0
Space ' '                   → 32
'0' (digit zero)            → 48
'A' (uppercase A)           → 65
'a' (lowercase a)           → 97
```

### <span style="color:#9b59b6">Why `\0` is Important</span>

```
Without '\0':
┌───┬───┬───┬───┬───┬───┐
│ A │ l │ i │ ? │ ? │ ? │  cout keeps reading!
└───┴───┴───┴───┴───┴───┘  Unpredictable output!

With '\0':
┌───┬───┬───┬────┬───┬───┐
│ A │ l │ i │ \0 │ ? │ ? │  cout stops here
└───┴───┴───┴────┴───┴───┘  Output: Ali ✓
              ↑
         Stop signal
```

---

## <span style="color:#27ae60">Quick Reference</span>

### <span style="color:#16a085">Creating Strings Checklist</span>

- [ ] Declare array with size + 1: `char name[N+1];`
- [ ] Choose input method based on needs
- [ ] Always add `\0` if building string manually
- [ ] Use string literals when possible: `char s[] = "text";`
- [ ] Prefer `fgets()` over `gets()` for safety

### <span style="color:#f39c12">Common Patterns</span>

```cpp
// Pattern 1: Initialize at declaration
char name[] = "Ali";

// Pattern 2: Read single word
cin >> name;

// Pattern 3: Read full line (safer)
cin.getline(name, 15);

// Pattern 4: Build string character by character
int i = 0;
while((ch = getche()) != 13)
    name[i++] = ch;
name[i] = '\0';
```

## **Processing Functions:**

**strcpy(L, R);** - String Copy

- Copies the content from R (right) to L (left)
- Overwrites the content of L
- Example: `strcpy(dest, "Hello");` → dest becomes "Hello"

**strcat(L, R);** - String Concatenate

- Appends R to the end of L
- L must have enough space to hold both strings
- Example: if L="Hello" and R=" World", after `strcat(L, R)` → L becomes "Hello World"

**strcmp(L, R);** - String Compare (case-sensitive)

- Compares two strings character by character using ASCII values
- Returns:
    - **0** if L equals R (strings are identical)
    - **Negative value** (< 0) if L comes before R alphabetically
    - **Positive value** (> 0) if L comes after R alphabetically
- Examples:

```cpp
  strcmp("abc", "abc")  // returns 0 (equal)
  strcmp("abc", "xyz")  // returns negative (abc < xyz)
  strcmp("xyz", "abc")  // returns positive (xyz > abc)
  strcmp("ABC", "abc")  // returns negative (uppercase comes before lowercase in ASCII)
```

**strcmpi(L, R);** - String Compare (case-insensitive)

- Same as strcmp but ignores case
- Example: `strcmpi("ABC", "abc")` returns 0 (equal)

**strlen(L);** - String Length

- Returns the number of characters before `\0`
- Does not count the null terminator
- Example: `strlen("Ali")` returns 3

**atoi(L);** - ASCII to Integer

- Converts string to integer
- Example: `atoi("123")` returns 123

**atof(L);** - ASCII to Float

- Converts string to floating-point number
- Example: `atof("3.14")` returns 3.14

## Practical Example

```cpp
int main()
{
    char fname[15] = "Ali";      // First name
    char lname[15] = "Osama";    // Last name
    char fullName[30];           // To store full name
    
    // Building full name using string functions
    strcpy(fullName, fname);     // Copy "Ali" to fullName
    strcat(fullName, " ");       // Add space → "Ali "
    strcat(fullName, lname);     // Add "Osama" → "Ali Osama"
    
    // Result: fullName = "Ali Osama"
    
    // Manual method (commented out):
    // fullName[0] = fname[0];   // 'A'
    // fullName[1] = fname[1];   // 'l'
    // fullName[2] = fname[2];   // 'i'
    // fullName[3] = ' ';        // space
    // fullName[4] = lname[0];   // 'O'
    // ... and so on
    
    // String to integer conversion example:
    // char num[10] = "22";
    // int x = atoi(num);        // x = 22 (as integer)
    
    return 0;
}
```

## strcmp() Examples with Results

```cpp
// Example 1: Equal strings
strcmp("Hello", "Hello");     // Result: 0

// Example 2: First string comes before second
strcmp("Apple", "Banana");    // Result: negative (A < B)

// Example 3: First string comes after second
strcmp("Zebra", "Apple");     // Result: positive (Z > A)

// Example 4: Case sensitivity
strcmp("hello", "Hello");     // Result: positive (lowercase 'h' > uppercase 'H' in ASCII)

// Example 5: Different lengths
strcmp("Hi", "Hello");        // Result: positive (i > e)
```

---
### <span style="color:#3498db">Created By Abdullah Ali</span>
***
## <span style="color:#27ae60;font:300px;align-items:center">وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ﴾ [هود: 88] ﴿ </span>
