import React from 'react';
import {
   ListGroup, ListGroupItem
} from 'reactstrap';
import "./HistoryTask.css";
interface HistroyTaskProps{
    historyData:any[];
}
const HistroyTask = (props: HistroyTaskProps) => {
  
 return (
     <div className="col-md-12 task">

         {props.historyData[0]? <ul className="timeline">
             {props.historyData[0].taskHistory.length && props.historyData[0].taskHistory.reverse().map((x:any)=>
                {return(<li>
                    <a target="_blank" href="https://www.totoprayogo.com/#">Update By: {x.updateBy}</a>
                <a href="#" className="float-right">{x.taskUpdateDate}</a>
                <p>Assign -:{x.taskAssign||"Undefined"}</p>
                <p>Status-:{x.taskStatus}</p>
                <p>Title-:{x.taskTitle}</p>
                <p>Description-:{x.taskDescription}</p>
                </li>)}) }  
         </ul>:  <ListGroup className="pt-5">
                                    <ListGroupItem tag="a" href="#" action>{"No History Found"}
                                    </ListGroupItem>
                                </ListGroup>}
     </div>);
}

export default HistroyTask;