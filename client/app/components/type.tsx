export interface TodoProps {
    id: number;
    title: string;
    isCompleted: boolean;
}

export interface TodoArray extends TodoProps {
    todos: TodoProps[];
}

