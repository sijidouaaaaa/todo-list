// 路由

import React from 'react';  
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';  
import TodoList from './pages/todo-list/todo-list.jsx';  

  
function App() {  
  return (  
    <Router>  
      <Switch>  
        <Route exact path="/" component={TodoList} />   
        {/* 其他路由 */}  
      </Switch>  
    </Router>  
  );  
}  
  
export default App;