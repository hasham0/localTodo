"use client";
import { todoTs } from "@/types";
import React, { useEffect, useState } from "react";
import Fields from "./Fields";
import List from "./List";

type Props = {};

export default function UserInput({}: Props) {
  const [editID, setEditID] = useState<number>();
  const [list, setList] = useState<todoTs[]>([]);
  const [updateBtn, setUpdateBtn] = useState<boolean>(false);
  const [userInputs, setUserInputs] = useState<todoTs>({
    todoText: "",
    status: "pending",
  });

  const initialState = () => {
    setUserInputs({
      todoText: "",
      status: "pending",
    });
  };

  //creating todos array at LS or fetching existing
  useEffect(() => {
    const getTodoList = localStorage.getItem("todos");
    if (getTodoList) {
      const check = JSON.parse(getTodoList);
      setList(check);
    } else {
      const todoListsArr = JSON.stringify([]);
      localStorage.setItem("todos", todoListsArr);
      setList([]);
    }
  }, []);

  // getting user inputs
  const getData = (data: todoTs) => {
    const listClone = list.slice();
    if (data) {
      listClone.push(data);
      localStorage.setItem("todos", JSON.stringify(listClone));
      setList(listClone);
    }
  };

  // clear all in fiels and LS
  const handleClearAll = () => {
    localStorage.clear();
    setList([]);
    initialState();
  };

  // handle Edit
  const handleEdit = (id: number) => {
    let listClone = list.slice();
    setUpdateBtn(true);
    setEditID(id);
    setUserInputs({
      todoText: listClone[id].todoText,
      status: listClone[id].status,
    });
  };

  //handle Reset
  const handleReset = () => initialState();

  // handle delete
  const handleDelete = (id: number) => {
    let listClone = list.slice();
    listClone.splice(id, 1);
    localStorage.setItem("todos", JSON.stringify(listClone));
    setList(listClone);
  };

  // handle update
  const handleUpdate = () => {
    let listClone = list.slice();
    if (typeof editID === "number") {
      listClone.splice(editID, 1, userInputs);
      localStorage.setItem("todos", JSON.stringify(listClone));
      setList(listClone);
      initialState();
      setUpdateBtn(false);
    }
  };

  return (
    <div className="border-2 border-black w-1/2 mx-auto m-5">
      <Fields
        getDatahandle={getData}
        handleClearAll={handleClearAll}
        updateBtn={updateBtn}
        userInputs={userInputs}
        setUserInputs={setUserInputs}
        handleUpdate={handleUpdate}
        handleReset={handleReset}
      />
      <section className="flex justify-center m-6">
        <table className="w-full">
          <thead>
            <tr className="border-2 border-red-600 uppercase bg-gray-200 ">
              <th>id</th>
              <th>task</th>
              <th>status</th>
              <th>edit</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {list.map((item: todoTs, index: number) => {
              return (
                <List
                  values={item}
                  id={index}
                  key={index}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
