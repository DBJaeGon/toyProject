import React from 'react';
import { Result, Button} from 'antd';
import { Link } from 'react-router-dom';
import { currentLoc } from '_reducer/HeaderNavReducer';
import { useDispatch } from 'react-redux';

const Empty = () => {
    const dispatch = useDispatch();
    return (
        <Result 
            status="404"
            title="404"
            subTitle="존재하지 않는 페이지입니다."
            extra={<Button type="primary" onClick={() => dispatch(currentLoc("/"))}><Link to="/">Back Home</Link></Button>}
        />
    );
};

export default Empty;