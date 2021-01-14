import React from 'react';
import { Spin } from 'antd';
import './Spinner.scss';

const Spinner = () => {
    return (
        <div className='spinner'>
            <h3>Loading...</h3>
            <Spin size="large" />
        </div>
    );
};

export default Spinner;