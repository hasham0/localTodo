import { todoTs } from "@/types";
import React, { ChangeEvent, FormEvent } from "react";

type SetUserInputsCallback = ((pre: todoTs | null) => void) | void;

interface Props {
  getDatahandle: (data: todoTs) => void;
  handleClearAll: () => void;
  updateBtn: boolean;
  userInputs: todoTs;
  setUserInputs: any;
  handleUpdate: () => void;
  handleReset: () => void;
}

export default function Fields({
  getDatahandle,
  handleClearAll,
  updateBtn,
  userInputs,
  setUserInputs,
  handleReset,
  handleUpdate,
}: Props) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userInputs?.todoText) return;
    getDatahandle(userInputs);
    setUserInputs({
      todoText: "",
      status: "pending",
    });
  };
  return (
    <form
      className="p-5 flex gap-4 flex-col justify-center items-center border-4 border-black flex-wrap"
      onSubmit={handleSubmit}
    >
      <label htmlFor="todoText">
        <input
          className="border-2 border-black p-1 text-center capitalize"
          type="text"
          placeholder="Enter your todo"
          value={userInputs?.todoText}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setUserInputs((pre: todoTs | null) => {
              if (pre) {
                return { ...pre, todoText: event.target.value };
              }
              return null;
            });
          }}
        />
      </label>

      <label
        className="flex flex-col"
        htmlFor="status"
      >
        Choose a Status
        <select
          className="p-2"
          id="status"
          name="status"
          value={userInputs?.status}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            setUserInputs((pre: todoTs) => {
              if (pre) {
                return { ...pre, status: event.target.value };
              }
              return null;
            });
          }}
        >
          <option value="pending">pending</option>
          <option value="done">done</option>
        </select>
      </label>
      <span>
        {updateBtn ? (
          <button
            className="bg-black text-white hover:bg-gray-300 hover:text-black p-2 rounded-lg capitalize duration-200 ease-in-out"
            type="button"
            onClick={handleUpdate}
          >
            update todo
          </button>
        ) : (
          <span className="space-x-5">
            <button
              className="bg-black text-white hover:bg-gray-300 hover:text-black p-2 rounded-lg capitalize duration-200 ease-in-out"
              type="submit"
            >
              add todo
            </button>
            <button
              className="bg-black text-white hover:bg-gray-300 hover:text-black p-2 rounded-lg capitalize duration-200 ease-in-out"
              type="button"
              onClick={handleReset}
            >
              reset
            </button>
          </span>
        )}
      </span>
      <span className="space-x-5">
        <button
          className="bg-black text-white hover:bg-gray-300 hover:text-black p-2 rounded-lg capitalize duration-200 ease-in-out"
          type="button"
          onClick={handleClearAll}
        >
          clear
        </button>
      </span>
    </form>
  );
}
