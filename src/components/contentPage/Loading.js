import React from 'react'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Loading = () => {
    return (
        <Spin indicator={<LoadingOutlined style={{fontSize: "24px"}} />} />
    );
};

export default Loading;
