import { ClipboardText } from '@phosphor-icons/react';
import style from './ZeroTasks.module.css'

export function ZeroTasks() {
  return (
    <div className={style.zeroTasks}>
      <ClipboardText size={56} />
      <strong>Você ainda não tem tarefas cadastradas</strong>
      <span>Crie tarefas e organize seus itens a fazer</span>
    </div>
  )
}