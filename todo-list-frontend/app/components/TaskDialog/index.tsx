"use client"
import { Task } from "@/app/types/task";
import { useState } from "react"
import "./style.css"

interface TaskDialogProps {
    isNewTask: boolean;
    onOpenTaskDialog: (newState: boolean) => void;
    selectedTask: Task | null;
    onSuccessMessageChange: (newMessage: string) => void;
    onShowSuccessMessage: (newState: boolean) => void;
    onErrorMessageChange: (newMessage: string) => void;
    onShowErrorMessage: (newState: boolean) => void;
    onRevalidateStateChange: (newState: boolean) => void;
}


export default function TaskDialog (
{
    isNewTask = true,
    selectedTask,
    onOpenTaskDialog,
    onSuccessMessageChange,
    onShowSuccessMessage,
    onErrorMessageChange,
    onShowErrorMessage,
    onRevalidateStateChange
} : TaskDialogProps) {
    const [currentTask, setCurrentTask] = useState<Task | null>(() => {
        if (isNewTask) {
            return {
            id: 0,
            name: "Tarefa doméstica",
            typeId: 1,
            description: ""
            };
        }
        return selectedTask!;
    });

    async function saveNewTask(newTask: Task) {
        try {
            const requestBody = {
                typeId: newTask.typeId,
                name: newTask.name,
                description: newTask.description
            }

            const response = await fetch('/api/create-task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) {
                const message: string = "Ocorreu um erro ao criar a tarefa";
                onErrorMessageChange(message);
                throw new Error(message);
            } else {
                onShowSuccessMessage(true);
                handleCloseDialog();
                onSuccessMessageChange("Tarefa criada com sucesso!");
                onRevalidateStateChange(true);
                setTimeout(() => {
                    onShowSuccessMessage(false);
                }, 2500);
            }

        } catch (error) {
            console.error("Error: ", error);
            onShowErrorMessage(true);
            handleCloseDialog();
            setTimeout(() => {
                onShowErrorMessage(false);
            }, 2500);
        }
    }

    async function editTask(newTask: Task) {
        try {
            const response = await fetch('/api/update-task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask)
            });
            if (!response.ok) {
                const message: string = "Ocorreu um erro ao editar a tarefa";
                onErrorMessageChange(message);
                throw new Error(message);
            } else {
                onShowSuccessMessage(true);
                handleCloseDialog();
                onSuccessMessageChange("Tarefa editada com sucesso!");
                onRevalidateStateChange(true);
                setTimeout(() => {
                    onShowSuccessMessage(false);
                }, 2500);
            }

        } catch (error) {
            console.error("Error: ", error);
            onShowErrorMessage(true);
            handleCloseDialog();
            setTimeout(() => {
                onShowErrorMessage(false);
            }, 2500);
        }
    }

    const handleCloseDialog = () => {
        setCurrentTask(null);
        onOpenTaskDialog(false);
    }

    const handleEditDescription = (typeId: number) => {
        switch(typeId) {
            case 1:
            setCurrentTask(prev => prev ? { ...prev, name: "Tarefa doméstica"  } : null);
            break;
            case 2:
            setCurrentTask(prev => prev ? { ...prev, name: "Tarefa do trabalho"  } : null);
            break;
            case 3:
            setCurrentTask(prev => prev ? { ...prev, name: "Lazer e recreação"  } : null);
            break;
            case 4:
            setCurrentTask(prev => prev ? { ...prev, name: "Estudos"  } : null);
            break;
            default: return "";
        }
    }

    const handleSaveTask = (isNewTask: boolean) => {
        if (currentTask) {
            if(isNewTask) {
                saveNewTask(currentTask);
            } else {
                editTask(currentTask);
            }
        }
    }


    return (
        <div className="z-70 w-[100vh] border b-2 border-zinc-400 bg-zinc-800 rounded-lg p-8">
            <div className="flex flex-col gap-16">
                <header className="w-full flex justify-between items-center">
                    <h2 className="text-xl text-amber-100">
                        <strong>{isNewTask ? 'Adicionar nova tarefa' : `Editar - ${selectedTask?.name}: ${selectedTask?.description}`}</strong>
                    </h2>
                    <button
                        className="cursor-pointer text-lg hover:text-zinc-400"
                        onClick={handleCloseDialog}
                    >
                            <strong>x</strong>
                    </button>
                </header>
                <div className="form flex flex-col gap-6 w-full]">
                    <div className="flex flex-col gap-3">
                        <label>Tipo da tarefa</label>
                        <select
                            name="tasks"
                            value={currentTask?.typeId.toString() || ""}
                            onChange={(e) => {
                                const newTypeId = Number(e.target.value);
                                setCurrentTask(prev => prev ? { ...prev, typeId: newTypeId } : null);
                                handleEditDescription(newTypeId);
                            }}
                            style={{
                                border: 'solid 1px gray',
                                borderRadius: '8px',
                                height: '40px',
                                width: '100%',
                                padding: '8px 8px',
                                fontSize: '14px'
                            }}>
                            <option className="select-option rounded-first" value="1">Tarefa doméstica</option>
                            <option className="select-option" value="2">Tarefa do trabalho</option>
                            <option className="select-option" value="3">Lazer e recreação</option>
                            <option className="select-option rounded-last" value="4">Estudos</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-3">
                        <label>Descrição</label>
                        <input
                            type="text"
                            value={currentTask?.description || ""}
                            onChange={(e) => {
                                const newDescription = e.target.value;
                                setCurrentTask(prev => prev ? { ...prev, description: newDescription } : null);
                            }}
                            style={{
                                border: 'solid 1px gray',
                                borderRadius: '8px',
                                height: '40px',
                                width: '100%',
                                padding: '8px 8px',
                                fontSize: '14px'
                            }}></input>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-end mt-12 gap-2">
                <button
                    className="cursor-pointer border border-zinc-500 py-1 px-2 rounded-md text-sm hover:bg-zinc-900 hover:border-zinc-600"
                    onClick={handleCloseDialog}
                >
                    Cancelar
                </button>
                <button
                    className="cursor-pointer border border-zinc-600 bg-zinc-700 py-1 px-2 rounded-md text-sm hover:bg-zinc-600 hover:border-zinc-500"
                    onClick={() => handleSaveTask(isNewTask)}
                >
                    Salvar
                </button>
            </div>
        </div>
    )
}