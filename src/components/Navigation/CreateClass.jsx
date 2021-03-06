import React, { useState } from 'react';
import { connect } from 'react-redux';

import './../../css/createclass.css';
import refreshToken from '../../utils/checkToken';
import { actCreateClassRequest } from '../../action/Class';

function CreateClass(props) {
    const [className, setClassName] = useState('');

    const onHandleForm = (e) => {
        e.preventDefault();
        const createclass = {
            className: className,
            cover: '',
            status: 1,
        };
        refreshToken([props.onCreateClass(createclass)]);
        props.history.push('/');
    };

    // quay lai
    const onGoBack = () => {
        props.history.push('/');
    };

    return (
        <div className="createclass">
            <div className="form">
                <p>Tạo lớp học</p>
                <form onSubmit={onHandleForm}>
                    <input
                        type="text"
                        value={className}
                        placeholder="Nhập tên lớp"
                        onChange={(e) => setClassName(e.target.value)}
                    />
                    <div className="btn">
                        <button type="reset" onClick={onGoBack}>
                            Hủy
                        </button>
                        <button type="submit" style={className != '' ? { background: '#2C7EEA', color: 'white' } : {}}>
                            Tạo
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// CreateClass.propTypes = {

// }
const mapDispatchToProps = (dispatch, props) => {
    return {
        onCreateClass: (classname) => {
            dispatch(actCreateClassRequest(classname));
        },
    };
};

export default connect(null, mapDispatchToProps)(CreateClass);
