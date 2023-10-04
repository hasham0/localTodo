import { todoTs } from "@/types";
import { Pencil, PencilIcon, Trash2 } from "lucide-react";
import React from "react";

type Props = {
  values: todoTs;
  id: number;
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
};

export default function List({ values, id, handleDelete, handleEdit }: Props) {
  return (
    <tr
      className={`text-center w-full border-2 border-black ${
        values.status === "done" ? "bg-green-300" : "bg-red-300"
      }`}
    >
      <td>{id + 1}</td>
      <td>{values.todoText}</td>
      <td>{values.status}</td>
      <td>
        <button
          className="bg-white p-2 m-1 hover:bg-gray-700 hover:text-white duration-200 ease-out rounded-full"
          onClick={() => handleEdit(id)}
        >
          <PencilIcon />
        </button>
      </td>
      <td>
        <button
          className="bg-white p-2 m-1 hover:bg-red-700 hover:text-white duration-200 ease-out rounded-full"
          onClick={() => handleDelete(id)}
        >
          <Trash2 />
        </button>
      </td>
    </tr>
  );
}
