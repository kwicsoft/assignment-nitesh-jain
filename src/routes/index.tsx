import React from 'react';
import { Switch, Route, Redirect ,BrowserRouter} from "react-router-dom";
import { useParams } from "react-router";

// Containers
const Task = React.lazy(() => import("../components/Task"));


function  TaskDetails() {
    let { taskId,userId } = useParams();
    return <Task taskId={taskId} userId={userId}></Task>;
  }
export default class Routes extends React.Component{
    render(){
        return  (<BrowserRouter>
            <Switch>
            <Route exact  path={"/task/:userId/:taskId"}>
                <React.Suspense fallback={<div>Loading</div>}>
                 <TaskDetails/>
                </React.Suspense>
            </Route>
            <Route  exact path={"/task/:userId"}>
                <React.Suspense fallback={<div>Loading</div>}>
                 <Task />
                </React.Suspense>
            </Route>
            <Route match path="/task">
                <React.Suspense fallback={<div>Loading</div>}>
                <Task />
                </React.Suspense>
            </Route>
            
            <Redirect to="/task" />
      </Switch></BrowserRouter>)
    }
}