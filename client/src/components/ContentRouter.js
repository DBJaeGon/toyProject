import React, { useEffect } from "react";
// import { useSelector } from 'react-redux';
import { Switch, Route, useHistory } from "react-router-dom";
import Home from "components/contentPage/Home";
import SignIn from "components/contentPage/sign/SignIn";
import SignUp from "components/contentPage/sign/SignUp";
import HeaderNav from "components/HeaderNav";
import MyInfo from "components/contentPage/MyInfo";
import Images from "components/imagePage/Images";
import Chat from "components/contentPage/Chat";
import Boards from "components/boardPage/Boards";
import Empty from "components/contentPage/Empty";
import Auth from "hoc/auth";
import { Layout } from "antd";
import Admin from "components/adminPage/Admin";
import { useDispatch } from "react-redux";
import { currentLoc } from "_reducer/headerNavReducer";
import FindPw from "./contentPage/FindPw";
// import { currentLoc } from '_reducer/HeaderNavReducer';

const { Content, Footer } = Layout;

const ContentRouter = () => {
  // const { nav } = useSelector((state) => state.toggles);
  // style={{ marginLeft: `${nav ? 80 : 200}px` }}
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(currentLoc(history.location.pathname));
  }, [dispatch, history]);

  return (
    <Layout>
      <HeaderNav />
      <Content style={{ margin: "24px 16px 0" }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Switch>
            <Route exact path="/" component={Auth(Home, null)} />
            <Route path="/boards" component={Auth(Boards, null)} />
            <Route path="/Image" component={Auth(Images, null)} />
            <Route path="/chat" component={Auth(Chat, true)} />
            <Route path="/signIn" component={Auth(SignIn, false)} />
            <Route path="/signUp" component={Auth(SignUp, false)} />
            <Route path="/myInfo" component={Auth(MyInfo, true)} />
            {/* <Route path="/setting" component={Auth(Admin, true, true)} /> */}
            <Route path="/setting" component={Auth(Admin, true)} />
            <Route path="/findPw" component={Auth(FindPw, false)} />
            <Route component={Auth(Empty, null)} />
          </Switch>
        </div>
      </Content>
      <Footer style={{ marginTop: "40px", textAlign: "center" }}>
        Toy Project ©2021 Created by Jaegon
      </Footer>
    </Layout>
  );
};

export default ContentRouter;
