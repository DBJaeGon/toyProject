import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { currentLoc } from '_reducer/HeaderNavReducer';
import { Layout, Row, Col, Avatar, Button } from 'antd';

const { Header } = Layout;

const throttle = (callback, wait) => {
    let waiting = true;

    return () => {
        if(waiting) {
            callback();
            waiting = false;
            setTimeout(() => {
                waiting = true;
            }, wait);
        }
    };
};

const HeaderNav = () => {

    const dispatch = useDispatch();
    const [isScrolled, setIsScrolled] = useState(false);
    const { headerNav } = useSelector(state => state.headerNav);
    const { result } = useSelector(state => state.user.signInState)

    const onDelayScroll = useMemo(() => 
        throttle(() => {
            const next = window.scrollY >= 50;
            if(next !== isScrolled) setIsScrolled(next);
    }, 30), [isScrolled]);
    // const headerShadow = () => {
    //     console.log("스크롤이벤트");
    //     console.log(window.scrollY)
    //     if(window.scrollY >= 100 && !isScrolled) {
    //         console.log("true state변경", window.scrollY, isScrolled)
    //         setIsScrolled(true);
    //     } 
    //     if(window.scrollY < 100 && isScrolled) {
    //         console.log("false state변경", window.scrollY, isScrolled)
    //         setIsScrolled(false);
    //     }
    // };

    // const selected = async() => {
    //     const selectedMenu = document.querySelector('.ant-menu-item-selected');
    //     await dispatch(currentLoc(selectedMenu.innerText));
    // };
    
    useEffect(() => {
        window.addEventListener("scroll", onDelayScroll);
        const selectedMenu = document.querySelector('.ant-menu-item-selected');
        dispatch(currentLoc(selectedMenu.innerText));
        return () => {
            window.removeEventListener("scroll", onDelayScroll);
        };
    }, [onDelayScroll, dispatch]);

    const onClick = async () => {
        if(result) {
            await dispatch(currentLoc("MyInfo"));
        } else {
            await dispatch(currentLoc("Sign In"));
        }
    };

    return (
        <Header className={`site-layout-background ${isScrolled ? "header-shadow" : ""}`} style={{ padding: 0, position: "sticky", top: 0, zIndex: 100 }}>
            <Row>
                <Col span={3} style={{textAlign: "center", fontSize: "17px", fontWeight: "bold"}}>
                    {headerNav}
                </Col>
                <Col span={1} offset={19} style={{textAlign: "center"}}>
                    {result ? 
                        <Link to="/myInfo">
                            <Avatar style={{background: "#722ed1"}} onClick={onClick}>
                                User
                            </Avatar>
                        </Link>
                        :
                        <Link to="/signIn">
                            <Button onClick={onClick}>Sign In</Button>
                        </Link>
                    }
                    
                </Col>
            </Row>
        </Header>
    );
};

export default HeaderNav;