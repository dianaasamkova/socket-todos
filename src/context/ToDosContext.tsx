import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

export interface ITodo {
    _id: string;
    name: string;
    description: string;
    progress: number;
}

interface TodosContextType {
    todos: ITodo[];
    setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const TodosContext = createContext<TodosContextType>({
    todos: [],
    setTodos: () => {
    },
});

export const useTodos = () => useContext(TodosContext);

interface TodosProviderProps {
    children: React.ReactNode;
}

export const TodosProvider: React.FC<TodosProviderProps> = ({children}) => {
    const [todos, setTodos] = useState<ITodo[]>([]);

    useEffect(() => {
        const getTodos = async () => {
            try {
                const {data} = await axios.get<ITodo[]>("http://localhost:8000/api/todos");
                setTodos(data);
            } catch (error) {
                console.error("Failed to fetch todos:", error);
            }
        };

        getTodos();
    }, []);

    return (
        <TodosContext.Provider value={{todos, setTodos}}>
            {children}
        </TodosContext.Provider>
    );
};
