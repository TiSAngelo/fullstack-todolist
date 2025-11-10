"use client"
import { Task } from "../../types/task";

interface TodoListProps {
    todoList: Task[];
    onOpenTaskDialog: (newState: boolean) => void;
    setEditTask: (newState: boolean) => void;
    onSelectTask: (selectedTask: Task) => void;
    onDeleteClick: (newState: boolean) => void;
}


export default function TodoList ({todoList, onOpenTaskDialog, setEditTask, onSelectTask, onDeleteClick}: TodoListProps) {

    const handleEditTask = (task: Task) => {
        setEditTask(false);
        onOpenTaskDialog(true);
        onSelectTask(task);
    }


    return (
        <>
            <ul className="flex flex-col gap-4 w-full overflow-y-auto">
                {
                    todoList.map((task: Task) => (
                        <li key={`task-${task.id}`}
                            className=" flex w-full justify-between items-end gap-4 p-4 border border-zinc-500 b-1 rounded-md bg-zinc-800"
                        >
                            <div className="flex w-full gap-20">
                                <span className="flex flex-col gap-1">
                                    <label className="text-amber-100"><strong>Tipo:</strong></label>
                                    <p className="text-sm min-w-40">{task.name}</p>
                                </span>
                                <span className="flex flex-col gap-1">
                                    <label className="text-amber-100"><strong>Descrição:</strong></label>
                                    <p className="text-sm">{task.description}</p>
                                </span>
                            </div>
                            <div className="flex justify-end items-end h-full gap-2">
                                <button
                                    className="cursor-pointer border border-zinc-600 bg-zinc-700 py-1 px-2 rounded-md text-sm hover:bg-zinc-600 hover:border-zinc-500"
                                    onClick={() => handleEditTask(task)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="cursor-pointer border border-zinc-500 py-1 px-2 rounded-md text-sm hover:bg-zinc-900 hover:border-zinc-600"
                                    onClick={() => {
                                        onDeleteClick(true);
                                        onSelectTask(task);
                                    }}
                                >
                                    Deletar
                                </button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}