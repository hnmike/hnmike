
```dataviewjs
const button = dv.el('button', 'Click me');

button.onclick = () => {
	//Whatever code you want to execute
    console.log('Button clicked!');
};

dv.table(
	["Column 1","Buttons"], 
	[["Bar",button]]
);

```


```dataviewjs

const button = "`BUTTON[help-button]`";

dv.table(
	["Column 1","Buttons"], 
	[["Bar",button]]
);

```

Task: `BUTTON[New Task]`

```meta-bind-button
style: primary
id: addTask
hidden: true
label: ✅ New Task
actions:
  - type: command
    command: quickadd:choice:fab59d4e-6ecc-446b-ac64-a3fc9239cd3a
```