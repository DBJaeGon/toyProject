import { useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { currentLoc } from '_reducer/HeaderNavReducer';
import { fetchSignOut } from '_reducer/userReducer';
// import { navToggle } from '../_reducer/togglesReducer';
import { Layout, Menu, Modal, message } from 'antd';
import { 
  HomeOutlined,
  ContainerOutlined,
  CameraOutlined,
  LoginOutlined,
  LogoutOutlined,
  UnlockTwoTone,
  LockTwoTone,
  ExclamationCircleOutlined,
  SettingOutlined,
  MessageOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
const { confirm } = Modal;

const SiderNav = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const { result } = useSelector(state => state.user.signInState);
    const { userInfo: { role }} = useSelector(state => state.user.authState);
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = async () => {
        setCollapsed(!collapsed);
    };

    const showConfirm = () => {
        confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: 'Sign Out Now?',
            async onOk() {
                try {
                    const result = await dispatch(fetchSignOut());
                    const signOutState = unwrapResult(result);
                    if(signOutState.signOutSuccess) {
                        history.push('/');
                        await dispatch(currentLoc(history.location.pathname));
                        message.success("Sign Out!");
                    }
                } catch (error) {
                    message.error(error);
                }
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    };

    const onSelect = async(values) => {
        const loc = values.domEvent.target.innerText
        if(loc !== 'Sign Out') {
            await dispatch(currentLoc(history.location.pathname));
        }
    };
    
    return (
        <Sider 
            collapsible 
            collapsed={collapsed} 
            onCollapse={onCollapse}
            style={{
                overflow: "auto",
                height: "100vh",
                position: "sticky",
                top: 0,
                left: 0
            }}
        >
            <div className={`${!collapsed ? "logo" : "logo-trans"}`}>
                {!collapsed ? <UnlockTwoTone twoToneColor="#722ed1" style={{fontSize: "34px"}} /> : <LockTwoTone twoToneColor="#722ed1" style={{fontSize: "34px", }}/>}
                <div className={`${!collapsed ? "logo-title" : "logo-title-trans"}`}>
                    <span>MyNote</span>
                </div>
            </div>
            <Menu theme="dark" defaultSelectedKeys={['/']} mode="inline" onSelect={onSelect} selectedKeys={[location.pathname]}>
                <Menu.Item key="/" icon={<HomeOutlined />}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="/boards" icon={<ContainerOutlined />}>
                    <Link to="/boards">Borad</Link>
                </Menu.Item>
                <Menu.Item key="/image" icon={<CameraOutlined />} >
                    <Link to="/image">Image</Link>
                </Menu.Item>
                <Menu.Item key="/chat" icon={<MessageOutlined />}>
                    <Link to="/chat" >Chat</Link>
                </Menu.Item>
                {result ? 
                    <Menu.Item key="/signOut" icon={<LogoutOutlined />} onClick={showConfirm} >
                        Sign Out
                    </Menu.Item> 
                    :
                    <Menu.Item key="/signIn" icon={<LoginOutlined />}>
                        <Link to="/signIn">Sign In</Link>
                    </Menu.Item>         
                }
                {role ?
                    <Menu.Item key="/setting" icon={<SettingOutlined />}>
                        <Link to="/setting">Setting</Link>
                    </Menu.Item>
                    :
                    null
                }
            </Menu>
        </Sider>
    );
};

export default SiderNav;