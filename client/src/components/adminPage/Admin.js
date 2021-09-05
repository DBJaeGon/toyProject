import React from 'react';
import { Tabs } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import MainImage from 'components/adminPage/MainImage';

const { TabPane } = Tabs;

const Admin = () => {
    return (
        <Tabs defaultActiveKey="1" size="large" >
            <TabPane
                tab={
                    <span>
                        <UploadOutlined />
                        Main Image Upload
                    </span>
                }
                key="1"
            >
                <MainImage />
            </TabPane>
            <TabPane
                tab={
                    <span>
                        Test01
                    </span>
                }
                key="2"
            >
                context02
            </TabPane>
            <TabPane
                tab={
                    <span>
                        Test02
                    </span>
                }
                key="3"
            >
                test<br/>
                .<br/>
                .<br/>
                .<br/>
                .<br/>
                .<br/>
                .<br/>
                .<br/>
                .<br/>
                .<br/>
                .<br/>
                .<br/>
                .<br/>
                .<br/>
                .<br/>
                .<br/>
                .<br/>
                .<br/>
                .<br/>
                .<br/>
                .<br/>
            </TabPane>
        </Tabs>
    );
};

export default Admin;
