
import Task  from "../components/Task/index";
import React from "react";
import { render, fireEvent, waitForElement,screen } from "@testing-library/react";
import jest from "jest";

const props= {};
describe("<Task />", () => {
  test("Check Task With Out Pass Url Params", async () => {
  const { findByTestId } = render(<Task {...props}/>)
  //Case 1-: Check UI Render.
  const addButton = await findByTestId("btn_Add");
  fireEvent.click(addButton);
  const inputTitle = await findByTestId("title");
  const inputDescription = await findByTestId("description");
  //Case 2-: Check ADD Task Event With Require And Add Task Button Disabled.
  const creastTask= await findByTestId("m_create");
  fireEvent.change(inputTitle, { target: { value: "" } });
  fireEvent.change(inputDescription, { target: { value: "" } });
  expect(creastTask).toBeDisabled();
  // Case 3-: Cancel Button Event To Close Popup
  const closePopup= await findByTestId("m_cancle");
  fireEvent.click(closePopup);
  //Case 4-: Check ADD Task Event With Data 
  fireEvent.click(addButton);
  fireEvent.change(inputTitle, { target: { value: "test" } });
  fireEvent.change(inputDescription, { target: { value: "test description" } });
  //Case 5-: Check Data on UI After Save List Check Title
  fireEvent.click(creastTask);
  });
  test("Check Task With  Pass Url Params", async () => {
  const { findByTestId } = render(<Task {...props} taskId={"0"} userId={"0"}/>)
  //Case 1-: Check UI Render.
  const addButton = await findByTestId("btn_Add");
  fireEvent.click(addButton);
  const inputTitle = await findByTestId("title");
  const inputDescription = await findByTestId("description");
  //Case 2-: Check ADD Task Event With Require And Add Task Button Disabled.
  const creastTask= await findByTestId("m_create");
  fireEvent.change(inputTitle, { target: { value: "" } });
  fireEvent.change(inputDescription, { target: { value: "" } });
  expect(creastTask).toBeDisabled();
  // Case 3-: Cancel Button Event To Close Popup
  const closePopup= await findByTestId("m_cancle");
  fireEvent.click(closePopup);
  //Case 4-: Check ADD Task Event With Data 
  fireEvent.click(addButton);
  fireEvent.change(inputTitle, { target: { value: "test" } });
  fireEvent.change(inputDescription, { target: { value: "test description" } });
  //Case 5-: Check Data on UI After Save List Check Title
  fireEvent.click(creastTask);
  
    //Case 6-: List Task Click On Title
    const rowClick= await findByTestId("task0");
    fireEvent.click(rowClick);
    //Case 7-: List Task Click On Title And Edit Button There or Not
    const taskEditButton = await findByTestId("task-edit-button");
    fireEvent.click(taskEditButton);
    //Case 8-: Edit Previous Data And Save Check List Title Update
    const inputEditTitle = await findByTestId("edit_Title");
    const inputEditDescription = await findByTestId("edit_Description");
    fireEvent.change(inputEditTitle, { target: { value: "test1" } });
    fireEvent.change(inputEditDescription, { target: { value: "test1 description" } });
    const taskSaveButton = await findByTestId("btn_save");
    fireEvent.click(taskSaveButton);
    //Case 9-: Chnage Status Of Task And Check Value
    const changeStatusButton= await findByTestId("change-status");
    fireEvent.click(changeStatusButton);
    fireEvent.change(screen.getByTestId("exampleSelect"), {
      target: { value: "InProgress" }
    });
    
  })
});