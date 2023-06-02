import './global.css'
import { Header } from './components/Header'
import { PlusCircle } from '@phosphor-icons/react';
import style from './App.module.css'
import { Task } from './components/Task';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { ZeroTasks } from './components/ZeroTasks';
import { v4 as uuidv4 } from 'uuid';

export interface Tasks {
  id: string
  title: string
  isCompleted: boolean
}

function App() {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [newTask, setNewTask] = useState('')

  const amountOfTasks = tasks.length;
  const amountOfCompletedTasks = tasks.filter(task => task.isCompleted === true).length;

  const isNewTaskEmpty = newTask.length === 0;

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    setTasks([{ title: newTask, isCompleted: false, id: uuidv4() }, ...tasks
    ])
    setNewTask('')
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setNewTask(event.target.value);
  }


  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Opa! Esse preencha a tarefa, é obrigatório ...')
  }

  function deleteTask(taskToDelete: Tasks) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== taskToDelete.id;
    })
    setTasks(tasksWithoutDeletedOne);
  }

  function completeTask(taskToComplete: Tasks) {
    const completedTasks = tasks.map(task => {
      if (task.id === taskToComplete.id) {
        return taskToComplete
      } else {
        return task
      }
    })
    setTasks(completedTasks)
  }


  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <form onSubmit={handleCreateNewTask}>
          <div className={style.todoInput}>
            <input
              value={newTask}
              onChange={handleNewTaskChange}
              onInvalid={handleNewTaskInvalid}
              required
              type="text"
              placeholder='Adicione uma nova tarefa'
              name='taskInput'
            />

            <button
              title={isNewTaskEmpty ? 'Preencha a tarefa' : 'Criar nova tarefa'}
              onClick={handleCreateNewTask}
              type='submit'
              disabled={isNewTaskEmpty}
            >Criar <PlusCircle size={16} weight='bold' /> </button>
          </div>
        </form>
        <section>
          <div className={style.status}>
            <strong className={style.createdTasks}>Tarefas criadas</strong>
            <div title="Número de tarefas" className={style.counter}>
              <strong>{amountOfTasks}</strong>
            </div>
          </div>
          <div className={style.status}>
            <strong className={style.doneTasks}>Concluídas</strong>
            <div title="Número de tarefas" className={style.counter}>
              <strong>{amountOfCompletedTasks}</strong> de <strong>{amountOfTasks}</strong>
            </div>
          </div>
        </section>
        <main>
          {
            tasks.length === 0
              ?
              <ZeroTasks />
              :
              (
                tasks.map(task => {
                  return (
                    <Task
                      key={task.id}
                      taskProps={task}
                      onDeleteTask={deleteTask}
                      onCompleteTask={completeTask}
                    />
                  )
                }
                )
              )
          }
        </main>
      </div>
    </div>
  )
}

export default App
