### Short documentation on how to work with GitHub on this project

1. Create a branch from the issue and use the issue name as branch name

2. Get the updated state of the project

```bash
git fetch origin
``` 

3. Checkout your branch by using or just in the UI with "checkout"

```bash
git checkout [MENT-xxx] XXXXXXXX
``` 

Example

```
git checkout [MENT-000] Define UserDetails Model
```

4. Before you commit and push your code feel free to format your single files

```
STRG + ALT + L 
```

5. Try to use the commit message structure provided:

````
[MENT-001]: feat(model): added UserDetails model
NUMBER        (main) feature      description
````