import { Trash } from "@phosphor-icons/react";
import style from "./Task.module.css";
import { Tasks } from "../App";

interface TaskProps {
  taskProps: Tasks,
  onDeleteTask: (taskToDelete: Tasks) => void,
  onCompleteTask: (taskToComplete: Tasks) => void
}

export function Task({ taskProps, onDeleteTask, onCompleteTask }: TaskProps) {
  function handleDeleteTask() {
    onDeleteTask(taskProps);
  }
  const toComplete = taskProps.isCompleted === false ? true : false
  const newTaskProps = { ...taskProps, isCompleted: toComplete }
  function handleCompleteTasks() {
    onCompleteTask(newTaskProps)
  }

  return (

    <div>
      <form>
        <div className={style.task}>
          <div className={style.formGroup}>
            <input id={taskProps.id} checked={!toComplete} onChange={handleCompleteTasks} type="checkbox" />
            <label htmlFor={taskProps.id}>{taskProps.title}</label>
          </div>

          <button onClick={handleDeleteTask} title="Excluir task">
            <Trash size={20} />
          </button>
        </div>
      </form>
    </div>
  )
}