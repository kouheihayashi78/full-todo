import React, { useState } from "react";

interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

const Todo = async () => {
  const response = await fetch("http://localhost:8080/allTodos", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("データの取得に失敗しました");
  }

  const todoList: Todo[] = await response.json();

  return (
    <ul className="divide-y divide-gray-200 px-4">
      {todoList.map((todo: Todo) => (
        <li className="py-4" key={todo.id}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id={todo.id.toString()}
                name={todo.id.toString()}
                type="checkbox"
                className="h-4 w-4 text-teal-600 focus:ring-teal-500
                border-gray-300 rounded"
                checked={todo.isCompleted}
              />
              <label className="ml-3 block text-gray-900">
                <span className="text-lg font-medium mr-2"> {todo.title} </span>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <button className="duration-150 bg-green-600 hover:bg-green-700 text-white font-medium py-1 px-2 rounded">
                ✒
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded">
                ✖
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Todo;
