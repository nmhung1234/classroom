import * as Types from "./../constant/Types";
import axios from "./../utils/customAxios";



export const actRegisterRequest = (dataregister) => {
    return (dispatch) => {
        console.log(dataregister);
        return (
            axios.post("user/register",dataregister).then(response =>{
                dispatch(register(response));
            })
        )
    }
}
export const register = (dataregister) => {
    return {
        type: Types.REGISTER_ACCOUNT,
        dataregister
    }
}
// --------------------Login---------------------------------------------

export const actLoginRequest = (datalogin) => {
    return (dispatch) => {
        return (
            axios.post("user/login",datalogin).then(response =>{
                dispatch(login(response.data));
            })
        )
    }
}

export const login = (datalogin) => {
    return {
        type: Types.LOGIN,
        datalogin
    }
}
// --------------------CreateClass---------------------------------------------

export const actCreateClassRequest = (data) => {
    return (dispatch) => {
        return (
            axios.post("user/class",data).then(response =>{
                dispatch(createClass(response.data.data));
            })
        )
    }
}
export const createClass = (response) => {
    return {
        type: Types.CREATE_CLASS,
        response
    }
}
// --------------------JoinClass---------------------------------------------

export const actJoinClassRequest = (idclass) => {
    return (dispatch) => {
        return (
            axios.post(`user/class/join`, {referralCode: idclass}).then(response =>{
                dispatch(joinClass(response));
            })
        )
    }
}

export const joinClass = (response) => {
    return {
        type: Types.JOIN_CLASS,
        response
    }
}

// -----------------------DeleteClass------------------------------------------

export const actDeleteClassRequest = (idclass) => {
    return (dispatch) => {
        return (
            axios.delete(`user/class/${idclass}`,).then(response =>{
                dispatch(deleteClass({response, idclass}));
            })
        )
    }
}
export const deleteClass = (idclass) => {
    return {
        type: Types.DELETE_CLASS,
        idclass
    }
}
// --------------------LeaveClass---------------------------------------------

export const actLeaveClassRequest = (idclass) => {
    return (dispatch) => {
        return (
            axios.delete(`user/class/${idclass}/leave`,).then(response =>{
                dispatch(leaveClass({response, idclass}));
            })
        )
    }
}

export const leaveClass = (response) => {
    return {
        type: Types.LEAVE_CLASS,
        response
    }
}
// --------------------getOwnClass---------------------------------------------


export const actgetOwnClassRequest = () => {
    return (dispatch) => {
        return (
            axios.get("user/class/own").then((response) => {
                dispatch(getOwnClass(response));
            })
        )
    }
}
export const getOwnClass = (response) => {
    return {
        type: Types.GET_OWN_CLASS,
        response
    }
}
// ---------------------getListClass--------------------------------------------

export const actgetListClassRequest = () => {
    return (dispatch) => {
        return (
            axios.get("user/class").then((response) => {
                dispatch(getListClass(response));
            })
        )
    }
}
export const getListClass = (response) => {
    return {
        type: Types.GET_LIST_CLASS,
        response
    }
}
// ------------------------GetPost-----------------------------------------

export const actGetPostRequest = (idclass) => {
    return (dispatch) => {
        return (
            axios.get(`/user/class/${idclass}/post`).then((response) => {
                console.log(response);
                dispatch(getPost(response))
            })
        )
    }
}

export const getPost = (response) => {
    return {
        type: Types.GET_POST,
        response
    }
}


// -----------------------UpPost------------------------------------------

export const actUpPostRequest = (content) => {
    return (dispatch) => {
        return (
            axios.post(`user/post`, content).then((response) => {
                console.log(response);
                dispatch(upPost(response))
            })
        )
    }
}
export const upPost = (response) => {
    return {
        type: Types.UP_POST,
        response
    }
}
// -----------------------DeletePost------------------------------------------

export const actDeletePostRequest = (idpost) => {
    return (dispatch) => {
        return (
            axios.delete(`user/post/${idpost}`).then((response) => {
                console.log(response);
                dispatch(deletePost({response, idpost}))
            })
        )
    }
}
export const deletePost = (response) => {
    return {
        type: Types.DELETE_POST,
        response
    }
}

// -----------------------EditPost------------------------------------------

export const actEditPostRequest = (datapost) => {
    return (dispatch) => {
        return (
            axios.put(`user/post/${datapost.id}`, datapost.content).then((response) => {
                console.log(response);
                dispatch(editPost(response))
            })
        )
    }
}
export const editPost = (response) => {
    return {
        type: Types.EDIT_POST,
        response
    }
}


// -----------------------------------------------------------------



// --------- dont use thunk ------------

export const logout = () => {
    return {
        type: Types.LOGOUT,
    }
}

// khi click vào lớp ở dashboard thì gửi thông tin class lên để trả về cho detail class
export const detailClass = (detail) => {
    return {
        type: Types.DETAIL_CLASS,
        detail
    }
}