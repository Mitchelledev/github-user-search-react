import { useState } from "react";

function TaskItem({task, index, onDelete, onToggle}){
    return(
        <li className="flex gap-2 justify-center py-2"> 
            <input type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(index)}
            />
            {task.text}
            <button onClick={() => onDelete(index)} className="bg-red-500 text-white rounded px-2 py-0 hover:bg-red-700">delete</button>
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
    function toggleTask(index){
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
            <h1 className="text-4xl font-bold text-blue-600">My Todo list</h1>
            <p>{tasks.length} tasks remaining</p>
            <div className="flex gap-2 justify-center">
            <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTasks()}
            placeholder="Enter a task"
            className="px-4 py-2 border border-gray-300 rounded hover:border-blue-500"
            />
            <button onClick={addTasks} className="px-4 py-2 bg-blue-600 text-white rounded bg-blue-500 hover:bg-blue-700">Add task</button>
            </div>
            <ul>
                {tasks.map((tasks, index) => (
                    <TaskItem key ={index} task ={tasks} index ={index} onDelete={deleteTask} onToggle ={toggleTask}/>
                ))}
            </ul>
        </div>
    );
}

export default App; 