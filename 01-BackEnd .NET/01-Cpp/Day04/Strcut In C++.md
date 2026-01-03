## **Learning Objectives**:

- Understanding function prototypes and their necessity
- Working with structures to model real-world entities
- Implementing arrays of structures for multiple records
- Applying input validation for data integrity
- Recognizing pass-by-value mechanism in C++
# C++ Code Agenda - Functions and Structures

## 1. **Function Prototypes**

- **Concept**: Declaring functions before using them
- **Purpose**: Informs the compiler about function existence before definition
- **Syntax**:

```cpp
     int Add(int left, int right);  // with parameter names
     int Sub(int, int);              // without parameter names (both valid)
```

- **Key Point**: Without prototype, calling `Add(11,22)` before definition causes compile error
- **Difference**:
    - **Declaration** (Prototype): Tells compiler function exists
    - **Definition**: Actual implementation of the function

## 2. **Structure Definition - Employee**

- **Purpose**: Grouping related data together
- **Members**:
    - `int id` - Employee identification number
    - `char name[18]` - Employee name (18 characters)
    - `int age` - Employee age
    - `float salary` - Employee salary
- **Memory**: Total size = 30 bytes
- **Syntax**: `Employee e1;` creates an instance

## 3. **PrintEmployee Function**

- **Purpose**: Display employee information
- **Parameter**: Takes `Employee` struct by value
- **Implementation**: Uses `cout` to print all member variables
- **Pass by Value**: Creates a copy of the entire struct (30 bytes copied)

## 4. **Working with Single Employee Objects**

### Employee e1 (Direct Assignment)

- Values assigned directly in code
- Uses `strcpy()` for string assignment
- Example: `e1.id = 1;`, `strcpy(e1.name, "Ali");`

### Employee e2 (User Input)

- Interactive input using `cin`
- User enters: id, name, age, salary
- Note: `gets()` mentioned but commented (unsafe function)

## 5. **Array of Employees**

- **Declaration**: `Employee employees[3];`
- **Memory**: 90 bytes (3 × 30 bytes)

### Input Loop (First for loop)

- Iterates 3 times to fill array
- **Input Validation** for age:

````cpp
     do {
         cout << "Enter age\n";
         cin >> employees[i].age;
     } while(employees[i].age < 18 || employees[i].age > 60);
```
   - **Validation Rule**: Age must be between 18 and 60
   - Uses `do-while` to ensure at least one attempt
   
   ### Output Loop (Second for loop)
   - Calls `PrintEmployee()` for each array element
   - Displays all 3 employees' data

## 6. **Key Concepts Demonstrated**

   ### Function Organization
   - Prototype → Usage → Definition
   - Prevents forward reference errors

   ### Structures
   - Custom data types
   - Logical grouping of related data
   - Dot operator (`.`) for member access

   ### Arrays of Structures
   - Homogeneous collection of complex data
   - Index-based access: `employees[i]`

   ### Input Validation
   - `do-while` loop ensures valid data
   - Business rule: working age range (18-60)

   ### Parameter Passing
   - Pass by value creates copies
   - Function receives independent copy of data
   - Original data remains unchanged

## 7. **Code Flow Summary**
```
Program Start
    ↓
Function Prototypes Declared
    ↓
Main Function Begins
    ↓
Create Employee Array [3]
    ↓
Input Loop (i = 0 to 2)
    ├→ Enter ID
    ├→ Enter Name  
    ├→ Enter Age (validated: 18-60)
    └→ Enter Salary
    ↓
Output Loop (i = 0 to 2)
    └→ Call PrintEmployee() for each
    ↓
Program End
````

## 8. **Important Notes**

- **strcpy()**: Required for C-string assignment (char arrays)
- **Pass by Value**: Each `PrintEmployee()` call copies 30 bytes
- **Validation**: Only age is validated, other fields are not
- **Memory Efficiency**: Pass by reference would be more efficient for large structs
- **Missing Headers**: Code comments suggest `#include` statements are omitted

---
### <span style="color:#3498db">Created By Abdullah Ali</span>
***
## <span style="color:#27ae60;font:300px;align-items:center">وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ﴾ [هود: 88] ﴿ </span>
