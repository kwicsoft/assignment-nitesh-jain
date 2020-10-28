import React from 'react';
import {
    Button, Form, Label, Input, ListGroup, ListGroupItem,
    Card, CardImg, CardBody, Badge,
    CardTitle, CardSubtitle
} from 'reactstrap';
import ModalPopup from "./../Popup";
import HistoryTask from "./../HistoryTask";
import "./Task.css";
/**
 * Props Option Which Recived By Url From Router
 */
interface TaskProps {
    taskId?: string;
    userId?: string;
}
interface TaskState {
    inputList: any[];
    isOpen: boolean;
    taskList: any[];
    taskStatus: string[];
    isEdit: boolean,
    isStatusChange: boolean;
    isHistoryView:boolean;
}
enum TaskStatus {
    ToDo = "ToDo",
    InProgress = "InProgress",
    Blocked = "Blocked",
    InQA = "InQA",
    Done = "Done",
    Deployed = "Deployed"
}
enum TaskStatusColor {
    ToDo = "secondary",
    InProgress = "primary",
    Blocked = "danger",
    InQA = "success",
    Done = "success",
    Deployed = "success"
}
type TaskStatusStrings = keyof typeof TaskStatusColor;
export default class Task extends React.Component<TaskProps, TaskState>{
    taskHistory:{taskHistory:any[],taskId:number}[];
    dummyUser:any[];
    constructor(props: any) {
        super(props);
        this.taskHistory=[];
        this.dummyUser=[{
            id:0,
            name: 'Nitesh Jain'},{
            id:1,
            name: 'Kamal Bohara'
            },
            {
                id:2,
                name: 'xyz'
            }
        ]
        this.state = {
            isEdit: false,
            isHistoryView:false,
            isStatusChange: false,
            taskStatus: ["ToDo", "InProgress", "Blocked", "InQA", "Done", "Deployed"],
            taskList: [],
            isOpen: false,
            inputList: [{
                index: 0,
                displayName: "Title",
                type: "text",
                name: "title",
                value: "",
                error: undefined
            },
            {
                index: 1,
                displayName: "Description",
                type: "textarea",
                name: "description",
                value: "",
                error: undefined
            }]
        }
    }

    componentDidMount() {
        const data = JSON.parse(localStorage.getItem("taskData") as string);
        this.setState({ taskList: data || [] });
        const historyData= JSON.parse(localStorage.getItem("histroyTask") as string);
        this.taskHistory=historyData||[];
    }
    /**
     * 
     * @param e : check event type  
     * @param x : task json
     */
    changeEvent = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>, x: any) => {
        const { inputList } = { ...this.state };
        if (e.target) {
            inputList[x.index].value = "";
            if (!e.target.value || e.target.value.trim() === "") {
                inputList[x.index].value = e.target.value;
                inputList[x.index].error = "require.";
            }
            else if (e.target.value && e.target.value.trim() !== "") {
                inputList[x.index].value = e.target.value;
                inputList[x.index].error = undefined;
            }
            this.setState({ inputList: inputList })
        }
    }
    /**
     * Add Task Data
     */
    saveEvent = ()=> {

        const { taskList, inputList } = { ...this.state };
        let dateTask = new Date();
        taskList.push({
            taskId: taskList.length.toString(),
            taskTitle: inputList[0].value,
            active: false,
            createBy: this.dummyUser.find(x=>x.id== this.props.userId? this.props.userId:0).name,//check only value not type
            updateBy: "",
            taskDescription: inputList[1].value,
            taskStatus: "ToDo",
            taskUpdateDate: "",
            taskCreateDate: dateTask.toUTCString(),
            taskAssign: undefined
        })
        inputList.forEach(x => {
            x.value = "";
            x.error = undefined;
        })
        localStorage.setItem("taskData", JSON.stringify(taskList))
        this.setState({ taskList: taskList, isOpen: false, inputList: inputList });
    }
    /**
     * Popup Opent Event
     */
    openPopup = () => {
        const { inputList } = { ...this.state };
        const cloneData = JSON.parse(JSON.stringify(inputList));
        cloneData.forEach((x: any) => {
            x.value = "";
            x.error = undefined;
        })
        this.setState({ isOpen: true, inputList: cloneData, isEdit: false });
    }

    updateTaskHistory=(taskId:number)=>{
        const { taskList, } = { ...this.state };
        const hisIndex= this.taskHistory.length?this.taskHistory.findIndex(x=>x.taskId===taskId):-1;
        if(hisIndex!==-1)
            this.taskHistory[hisIndex].taskHistory.push(taskList[taskId]);
        else{
            let dateTask = new Date();
            const userID = this.props.userId;
            this.taskHistory.push({
                taskId: taskId,
                taskHistory:[{...taskList[taskId],taskUpdateDate:dateTask.toUTCString(),updateBy:this.dummyUser.find(x=>x.id== userID? userID:0).name}]
            })
        }
        localStorage.setItem('histroyTask', JSON.stringify(this.taskHistory));
    }
    /**
     * 
     * @param x : Task Json Which Updated
     */
    updateData = (x: any) => {
        const { taskList, inputList } = { ...this.state };
        const userID = this.props.userId;
        let dateTask = new Date();
        //Update Task History
        this.updateTaskHistory(parseInt(x.taskId));
        //-------end task history--------
        taskList[parseInt(x.taskId)].taskTitle = inputList[0].value;
        taskList[parseInt(x.taskId)].taskDescription = inputList[1].value;
        taskList[parseInt(x.taskId)].updateBy = this.dummyUser.find(x=>x.id==userID||0).name;
        taskList[parseInt(x.taskId)].taskUpdateDate = dateTask.toUTCString();
        localStorage.setItem("taskData", JSON.stringify(taskList))
        this.setState({ taskList: taskList, isEdit: false });

    }
    /**
     * 
     * @param e : Handle Dropdown Event
     */
    statusChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { taskList } = { ...this.state };
        const taskID = this.props.taskId;
        const userID = this.props.userId;
        let dateTask = new Date();
        if (e.target && e.target.value && taskID && userID && e.target.value !== "Select") {
            this.updateTaskHistory(parseInt(taskID));
            taskList[parseInt(taskID)].taskStatus = e.target.value;
            taskList[parseInt(taskID)].updateBy = this.dummyUser.find(x=>x.id==userID||0).name;
            taskList[parseInt(taskID)].taskUpdateDate = dateTask.toUTCString();
            localStorage.setItem("taskData", JSON.stringify(taskList))
            this.setState({ taskList: taskList, isStatusChange: false });
        }
    }
    assignChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { taskList } = { ...this.state };
        const taskID = this.props.taskId;
        const userID = this.props.userId;
        let dateTask = new Date();
        if (e.target && e.target.value && taskID && userID && e.target.value !== "Select") {

            this.updateTaskHistory(parseInt(taskID));
            taskList[parseInt(taskID)].taskAssign = e.target.value;
            taskList[parseInt(taskID)].updateBy = this.dummyUser.find(x=>x.id==userID||0).name;
            taskList[parseInt(taskID)].taskUpdateDate = dateTask.toUTCString();
            localStorage.setItem("taskData", JSON.stringify(taskList))
            this.setState({ taskList: taskList, isStatusChange: false });
        }
    }
    /**
     * Render Navigation Menu
     */
    renterHeader = (): JSX.Element => {
        return (
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <span className="navbar-brand">Navbar</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    
                </div>
            </nav>)
    }
    
    render() {
        const { isOpen, inputList, taskList, isEdit, taskStatus, isStatusChange, isHistoryView } = this.state;
        const cardData = this.props.taskId && taskList[parseInt(this.props.taskId)];
        let statusList: any[] = [];
        if (cardData) {
            if (cardData.taskStatus === TaskStatus.ToDo)
                statusList = taskStatus.filter(x => x === TaskStatus.InProgress);
            if (cardData.taskStatus === TaskStatus.InProgress)
                statusList = taskStatus.filter(x => x === TaskStatus.Blocked || x === TaskStatus.InQA);
            if (cardData.taskStatus === TaskStatus.InQA)
                statusList = taskStatus.filter(x => x === TaskStatus.ToDo || x === TaskStatus.Done);
            if (cardData.taskStatus === TaskStatus.Done)
                statusList = taskStatus.filter(x => x === TaskStatus.Deployed);
            if (cardData.taskStatus === TaskStatus.Blocked)
                statusList = taskStatus.filter(x => x === TaskStatus.ToDo);
            statusList.unshift("Select");
        }
        return (
            <div id="task-id" data-testid={"task-id"}>
                {this.renterHeader()}
                <div className="container mt-5">
                    <div className="row">
                        <div className={`container col-lg-${(this.props.taskId !== undefined ? 8 : 12)} task`}>
                            <ModalPopup
                                title={"Create Task"}
                                buttonDiabled={inputList.findIndex(x => x.error !== undefined||x.value==="") === -1 ? false : true}
                                IsOpen={isOpen}
                                toggle={() => {
                                    this.setState({ isOpen: !this.state.isOpen })
                                }}
                                body={<Form>
                                    {inputList.map(x => {
                                        if (x.type === "text")
                                            return <div key={"add_title"}>
                                                <Label for={x.name} className="input-lable">{x.displayName}</Label>
                                                <Input type={x.type} name="email" data-testid={x.name} id={x.name} value={x.value} onBlur={e => this.changeEvent(e, x)} onChange={e => this.changeEvent(e, x)} />
                                                {x.error && <span className="error">{x.error}</span>}
                                            </div>
                                        else
                                            return <div key={"add_description"}>
                                                <Label for={x.name} className="input-lable">{x.displayName}</Label>
                                                <Input type="textarea" name="text" id={x.name} data-testid={x.name} value={x.value} onBlur={e => this.changeEvent(e, x)} onChange={e => this.changeEvent(e, x)} />
                                                {x.error && <span className="error">{x.error}</span>}
                                            </div>
                                    })}

                                </Form>}
                                saveEvent={this.saveEvent}>
                            </ModalPopup>

                            <div className="row">
                                <div className="col-lg-8 pd-0 pt-1 mt-2 mb-2">Task List</div>
                                <div className="col-lg-4 pd-0 mt-2 mb-2 task-header"><Button id="btn_Add" data-testid={"btn_Add"} onClick={this.openPopup}>ADD Task</Button></div>

                            </div>
                            {!taskList.length &&
                                <ListGroup>
                                    <ListGroupItem tag="a" href="#" action>{"No Task Found"}
                                    </ListGroupItem>
                                </ListGroup>
                            }
                            {taskList.map(x => {
                                return (
                                    <ListGroup>
                                        <ListGroupItem active={x.active} tag="a" action>

                                            <div className="d-flex">
                                                <div className="col-lg-8 pd-0">
                                                    <a data-testid={"task" + x.taskId} href={"/task/" + (this.props.userId ? this.props.userId : "0") + "/" + x.taskId}
                                                        onClick={
                                                            e => {
                                                                inputList.forEach(x => {
                                                                    x.value = "";
                                                                    x.error = undefined;
                                                                })

                                                                inputList[0].value = taskList[parseInt(x.taskId)].taskTitle;
                                                                inputList[1].value = taskList[parseInt(x.taskId)].taskDescription;
                                                                this.setState({ inputList: inputList });
                                                                //this.redirectNewUrl("/task/"+(this.props.userId?this.props.userId:"0")+"/"+x.taskId)

                                                            }
                                                        }
                                                    >{x.taskTitle}</a>
                                                </div>
                                                <div className="col-lg-1 pd-0">
                                                    <Badge color={TaskStatusColor[x.taskStatus as TaskStatusStrings]}>
                                                        {x.taskStatus}
                                                    </Badge>
                                                </div>
                                                <div className="col-lg-3 pd-0">
                                                    <img alt="name" src="data:image/png;base64,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"></img>
                                                    {x.taskAssign||"undefined"}
                                                </div>
                                            </div>
                                            {this.props.taskId === x.taskId && (<>
                                                {<div className={"task-button"}>{(!isEdit && !isHistoryView ) && <Button data-testid="task-edit-button" onClick={() => {
                                                    inputList[0].value = taskList[parseInt(x.taskId)].taskTitle;
                                                    inputList[0].error = undefined;
                                                    inputList[1].error = undefined;
                                                    inputList[1].value = taskList[parseInt(x.taskId)].taskDescription;
                                                    this.setState({ isEdit: true, inputList: inputList,isHistoryView:false  })

                                                }
                                            }>Edit</Button>}{(!isHistoryView && !isEdit) && <>&nbsp;<Button onClick={()=>{
                                                this.setState({ isEdit: false, isHistoryView:true })
                                            }}>View History</Button></>}</div>}
                                                {(!isEdit && !isHistoryView) && <div className={"task p-3"}>{x.taskDescription}</div>}
                                                {isHistoryView && <HistoryTask historyData={[this.taskHistory.find(t=>t.taskId.toString()===x.taskId)]}></HistoryTask>}
                                                {(isEdit) && <div className={"task p-3"}>
                                                    {inputList.map(p => {
                                                        if (p.type === "text")
                                                            return <div key={x.taskTitle}>
                                                                <Label for={"edit_Title"} className="input-lable">{p.displayName}</Label>
                                                                <Input type={p.type} name="title" data-testid={"edit_Title"} id={"edit_Title"} value={p.value} onBlur={e => this.changeEvent(e, p)} onChange={e => this.changeEvent(e, p)} />
                                                                {(p.error || !p.value) && <span className="error">{p.error}</span>}
                                                            </div>
                                                        else
                                                            return <div key={x.taskTitle + "des"}>
                                                                <Label for={"edit_Description"} className="input-lable">{p.displayName}</Label>
                                                                <Input data-testid={"edit_Description"} type="textarea" name="text" id={"edit_Description"} value={p.value} onBlur={e => this.changeEvent(e, p)} onChange={e => this.changeEvent(e, p)} />
                                                                {(p.error || !p.value) && <span className="error">{p.error}</span>}
                                                            </div>
                                                    })}
                                                    <Button data-testid={"btn_save"} disabled={inputList.findIndex(x => x.error !== undefined || x.value==="") === -1 ? false : true}
                                                        onClick={e => this.updateData(x)}
                                                    >Save</Button>
                            &nbsp;
                            <Button data-testid={"btn_cancle"} onClick={() => {

                                                        this.setState({ isEdit: false })
                                                    }}>Cancle</Button>
                                                </div>}
                                            </>)}
                                        </ListGroupItem>
                                    </ListGroup>
                                )
                            })}

                        </div>
                        {this.props.taskId !== undefined && cardData && (<div className="col-lg-4">
                            <div>
                                <Card>
                                    <div className="d-flex">
                                        <div>
                                            <CardImg top width="100px" src="data:image/png;base64,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" alt="Card image cap" />
                                            Assignee : 
                                            <Input key={cardData.taskAssign} type="select" name="select" data-testid="exampleAssign" id="exampleAssign" onChange={this.assignChnage}>
                                                {this.dummyUser.map(x => {
                                                    if (cardData.taskAssign === x.name)
                                                        return <option data-testid={x.name} value={x.name} selected>{x.name}</option>
                                                    else
                                                        return <option data-testid={x.name} value={x.name}>{x.name}</option>
                                                })}
                                            </Input>
                                        </div>
                                        <a className="profile-close" href={"/task/" + (this.props.userId ? this.props.userId : "0")}>Close</a>

                                    </div>
                                    <CardBody>
                                        <CardTitle>Task Id-: {this.props.taskId}</CardTitle>
                                        <CardSubtitle>Task Title-: {cardData.taskTitle}</CardSubtitle>
                                        <CardSubtitle>Task Create Date-: {(new Date(cardData.taskCreateDate)).toString()}</CardSubtitle>
                                        <br />
                                        {cardData.taskStatus !== TaskStatus.Deployed && (<CardSubtitle>Change Status : {!isStatusChange && <Button data-testid="change-status" onClick={() => this.setState({ isStatusChange: true })}>Edit</Button>}
                                            {isStatusChange && <Input key={cardData.taskStatus} type="select" name="select" data-testid="exampleSelect" id="exampleSelect" onChange={this.statusChnage}>
                                                {statusList.map(x => {
                                                    if (cardData.taskStatus === x)
                                                        return <option data-testid={x} value={x} selected>{x}</option>
                                                    else
                                                        return <option data-testid={x} value={x}>{x}</option>
                                                })}
                                            </Input>}

                                        </CardSubtitle>)}
                                        <CardSubtitle>Created By-: {cardData.createBy}</CardSubtitle>
                                        {cardData.updateBy !== "" && <CardSubtitle>Update By-: {cardData.updateBy}</CardSubtitle>}
                                        {cardData.updateBy !== "" && <CardSubtitle>Update By-: {(new Date(cardData.taskUpdateDate)).toString()}</CardSubtitle>}
                                    </CardBody>
                                </Card>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>)
    }
}