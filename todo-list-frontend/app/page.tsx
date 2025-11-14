"use client";
import { useEffect, useState } from "react";
import { Task } from "./types/task";
import TodoList from "./components/TodoList";
import TaskDialog from "./components/TaskDialog";


export default function Home() {
  const [todos, setTodos] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [showConfirmationDelete, setShowConfirmationDelete] = useState<boolean>(false);
  const [isNewTask, setIsNewTask] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [mustRevalidate, setMustRevalidate] = useState<boolean>(false);

  const handleShowDialog = (newState: boolean) => {
    setShowEditDialog(newState);
  }

  const handleMustRevalidate = (newState: boolean) => {
    setMustRevalidate(newState);
  }

  const handleSetNewTask = (newState: boolean) => {
    setIsNewTask(newState);
  }

  const handleSelectTask = (selectedTask: Task) => {
    setSelectedTask(selectedTask);
  }

  const handleDeleteClick = (newState: boolean) => {
    setShowConfirmationDelete(newState);
  }

  async function fetchTodos() {

    try {
      const response = await fetch("/api/get-all-tasks");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      setTodos([]);
      console.error("Erro ao buscar todos:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteOk = async () => {
    handleDeleteClick(false);
    try {
      if (!selectedTask) return
      const requestBody = {
        taskId: selectedTask?.id
      }

      const response = await fetch(`/api/delete-task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if(!response.ok) {
        const message: string = "Ocorreu um erro ao deletar a tarefa selecionada.";
        setErrorMessage(message);
        throw new Error(message);
      } else {
        setShowSuccessMessage(true);
        setSelectedTask(null);
        fetchTodos();
        setSuccessMessage("Tarefa deletada com sucesso!");
        setTimeout(() => {
          setShowSuccessMessage(false);
        },2500);
      }

    } catch (error) {
      console.error("Error: ", error);
      setShowErrorMessage(true);
      setSelectedTask(null);
      setTimeout(() => {
        setShowErrorMessage(false)
      }, 2500);
    }
  }

  useEffect(() => {
    if(mustRevalidate) {
      fetchTodos();
      setMustRevalidate(false);
    }
  }, [mustRevalidate]);

  useEffect(() => {
    fetchTodos();
  }, []);


  useEffect(() => {
    if (showEditDialog) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showEditDialog]);

  if (loading) return <div className="w-full h-screen flex items-center justify-center text-3xl text-amber-200 animate-pulse">Carregando...</div>;

  const headerHeightClass = "h-36";
  const headerPaddingTop = "pt-36";
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
      <header
        className={`
          fixed top-0 left-1/2 transform -translate-x-1/2 z-50 px-1
          w-full max-w-3xl ${headerHeightClass}
          flex items-center justify-between
          bg-linear-to-t from-black/10 to-zinc-50 dark:bg-linear-to-t dark:from-black/5 dark:from:70% dark:to-black dark:to-30%  text-amber-50
        `}
      >
        <h1 className="text-2xl font-semibold">Lista de tarefas</h1>
          { showConfirmationDelete &&
            <div className="flex items-center justify center gap-2 text-xs bg-amber-500/30 text-shadow-amber-100 p-4 rounded-md border b-2 border-amber-700">
              <p>Você tem certeza que deseja deletar esta tarefa?</p>
              <button
                className="cursor-pointer border border-zinc-500  bg-zinc-800 py-1 px-2 rounded-md text-sm hover:bg-zinc-900 hover:border-zinc-600 text-white"
                onClick={() => {
                  setShowConfirmationDelete(false);
                  setSelectedTask(null);
                }}
              >
                Não
              </button>
              <button
                className="cursor-pointer border border-zinc-600 bg-zinc-700 py-1 px-2 rounded-md text-sm hover:bg-zinc-600 hover:border-zinc-500 text-white"
                onClick={handleDeleteOk}
              >
                Sim
              </button>
            </div>
          }
          { showErrorMessage &&
            <div className="flex items-center justify center gap-2 text-xs bg-red-500/30 text-shadow-red-100 p-4 rounded-md border b-2 border-red-700">
              <p>{errorMessage}</p>
            </div>
          }
          { showSuccessMessage &&
            <div className="flex items-center justify center gap-2 text-xs bg-green-500/30 text-shadow-green-100 p-4 rounded-md border b-2 border-green-700">
              <p>{successMessage}</p>
            </div>
          }
        <button
          className="cursor-pointer border border-zinc-600 bg-zinc-700 py-1 px-2 rounded-md text-sm hover:bg-zinc-600 hover:border-zinc-500 text-white"
          onClick={() => {
            handleShowDialog(true);
            handleSetNewTask(true);
          }}
        >
          Nova tarefa
        </button>
      </header>
      { todos.length > 0 &&
        <main className={`w-full max-w-3xl mx-auto ${headerPaddingTop} py-8`}>
          <TodoList
            todoList={todos}
            onOpenTaskDialog={handleShowDialog}
            setEditTask={handleSetNewTask}
            onSelectTask={handleSelectTask}
            onDeleteClick={handleDeleteClick}
          />
        </main>
      }

        { showEditDialog &&
          <div className="fixed inset-0 bg-black/30 backdrop-blur-xl z-60 flex justify-center items-center" style={{height: '100vh'}}>
              <TaskDialog
                onOpenTaskDialog={handleShowDialog}
                isNewTask={isNewTask}
                selectedTask={selectedTask}
                onRevalidateStateChange={handleMustRevalidate}
                onSuccessMessageChange={setSuccessMessage}
                onShowSuccessMessage={setShowSuccessMessage}
                onErrorMessageChange={setErrorMessage}
                onShowErrorMessage={setShowErrorMessage}
              />
          </div>
        }
    </div>
  );
}