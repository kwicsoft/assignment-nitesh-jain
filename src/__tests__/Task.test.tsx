
import Task  from "../components/Task/index";
import React from "react";
import { render, fireEvent, waitForElement,screen } from "@testing-library/react";
import jest from "jest";

const props= {};
describe("<Task />", () => {
  test("Check Task With Out Pass Url Params", async () => {
  const { findByTestId } = render(<Task {...props}/>)
  const loginForm = await findByTestId("task-id");
  const addButton = await findByTestId("btn_Add");
  fireEvent.click(addButton);
  const inputTitle = await findByTestId("title");
  const inputDescription = await findByTestId("description");
   //check ADD Task Event With require.
  fireEvent.change(inputTitle, { target: { value: "" } });
  fireEvent.change(inputDescription, { target: { value: "" } });
  const closePopup= await findByTestId("m_cancle");
  fireEvent.click(closePopup);
   //check ADD Task Event 
  fireEvent.click(addButton);
  fireEvent.change(inputTitle, { target: { value: "test" } });
  fireEvent.change(inputDescription, { target: { value: "test description" } });
  //check data on UI after save
  const creastTask= await findByTestId("m_create");
  fireEvent.click(creastTask);
  screen.getByText(/test/i)

  //edit Action Check
  //const rowClick= await findByTestId("task0");
  //fireEvent.click(rowClick);

  //check edit button there
  //const taskEditButton = await findByTestId("task-edit-button");

  //fireEvent.click(closePopup);
  });
   test("Check Task With  Pass Url Params", async () => {
    const { findByTestId } = render(<Task {...props} taskId={"0"} userId={"0"}/>)
    const loginForm = await findByTestId("task-id");
    const addButton = await findByTestId("btn_Add");
    fireEvent.click(addButton);
    const inputTitle = await findByTestId("title");
    const inputDescription = await findByTestId("description");
     //check ADD Task Event With require.
    fireEvent.change(inputTitle, { target: { value: "" } });
    fireEvent.change(inputDescription, { target: { value: "" } });
    const closePopup= await findByTestId("m_cancle");
    fireEvent.click(closePopup);
     //check ADD Task Event 
    fireEvent.click(addButton);
    fireEvent.change(inputTitle, { target: { value: "test" } });
    fireEvent.change(inputDescription, { target: { value: "test description" } });
    //check data on UI after save
    const creastTask= await findByTestId("m_create");
    fireEvent.click(creastTask);
    //screen.getByText(/test/i)
  
    //edit Action Check
    const rowClick= await findByTestId("task0");
    fireEvent.click(rowClick);
  
    //check edit button there
    const taskEditButton = await findByTestId("task-edit-button");
    fireEvent.click(taskEditButton);
    const inputEditTitle = await findByTestId("edit_Title");
    const inputEditDescription = await findByTestId("edit_Description");

    fireEvent.change(inputEditTitle, { target: { value: "test1" } });
    fireEvent.change(inputEditDescription, { target: { value: "test1 description" } });
    
    const taskSaveButton = await findByTestId("btn_save");
    fireEvent.click(taskSaveButton);

    const changeStatusButton= await findByTestId("change-status");
    fireEvent.click(changeStatusButton);
  
    fireEvent.change(screen.getByTestId("exampleSelect"), {
      target: { value: "InProgress" }
    });
    
  })
});