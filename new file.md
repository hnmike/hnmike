```dataviewjs
const button = "`BUTTON[help-button]`"; 
dv.table( ["Column 1","Buttons"],
		 [["Bar",button]] );
 ````


```meta-bind-button 
style: primary
id: addTask
hidden: false
label: ✅ New Task
actions:
  - type: command
    command: quickadd:choice:7a26a750-d8b3-441f-97b2-de6c14049fc7
```


```meta-bind-button
style: primary
id: addActivity
hidden: false
label: 🏃‍♂️ New Activity
actions:
  - type: command
    command: quickadd:choice:785625a3-b068-4b7b-9b32-876b271d7997
```

```meta-bind-button
style: primary
id: addFile
hidden: false
label: 📂 New File
actions:
  - type: command
    command: quickadd:choice:b4ee2cb1-7dd7-4337-9bbc-3dfe89c5f284
```


