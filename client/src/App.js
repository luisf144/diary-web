import React from 'react';
import Auth from './hoc/auth';
import { Switch, Route } from "react-router-dom";
import ImagesPage from './pages/ImagesPage';
import LoginPage from './pages/LoginPage';
import NavBar from './components/NavBar';
import RegisterPage from './pages/RegisterPage';
import PostDayPage from './pages/PostsPage';

import { Layout } from 'antd';

const { Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <NavBar/>

    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 100 }}>
      
      <div className="site-layout-background" style={{ padding: 24, minHeight: '70vh' }}>
        
      <React.Fragment >
          <Switch>
            <Route exact path="/images" component={Auth(ImagesPage, true, true)} />
            <Route exact path="/" component={Auth(PostDayPage, true)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
          </Switch>
        </React.Fragment>


      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Diary in Web ©2020.</Footer>
      

     

       
    </Layout>
  );
}

export default App;
