import { useState } from "react";

function TaskItem({task, index, onDelete, onToggle}){
    return(
        <li> 
            <input type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(index)}
            />
            {task.text}
            <button onClick={() => onDelete(index)}>delete</button>
        </li>
    )
}
    function App(){
    const [tasks, setTasks] = useState([])
    const [input, setInput] = useState('') 

    function addTasks(){ 
        if(input ==='') return
        setTasks([...tasks, {text: input, completed: false}
        ])
        setInput('')
    }
    function deleteTask(index){
        setTasks(tasks.filter((_, i) => i !== index))
    }
    function togggleTask(index){
        setTasks(
            tasks.map((task, i) => {
              if(i === index){
                return {
                    ...task,
                    completed:!task.completed
                }
              }  
              return task 
            })
        )
    }
    return(
        <div>
            <h1>My Todo list</h1>
            <p>{tasks.length} tasks remaining</p>
            <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTasks()}
            placeholder="Enter a task"
            />
            <button onClick={addTasks}>Add task</button>
            <ul>
                {tasks.map((tasks, index) => (
                    <TaskItem key ={index} task ={tasks} index ={index} onDelete={deleteTask} onToggle = {togggleTask}/>
                ))}
            </ul>
        </div>
    );
}

export default App; 