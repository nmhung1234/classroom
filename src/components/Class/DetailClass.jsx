import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { actGetPostRequest } from "../../action/Action";
// import PropTypes from "prop-types";

import "./../../css/detailclass.css";
import CreateNoti from "./CreateNoti";
import PostDetail from "./PostDetail";

import refreshToken from "./../../utils/checkToken";
import None from "./../None/None";

function DetailClass(props) {
    const idclass = props.match.params.id;
    const { detailClass, postList, getPost } = props;

    const [showCreateNoti, setShowCreateNoti] = useState(false);
    const [postListState, setPostListState] = useState([]);

    const onShowCreateNoti = () => {
        setShowCreateNoti(!showCreateNoti);
    };

    //get post khi idclass thay doi
    useEffect(() => {
        refreshToken([getPost(idclass)]);
    }, [idclass]);

    //luu danh sach posts vao state
    useEffect(() => {
        setPostListState(postList);
    }, [postList]);

    return (
        <section className="insideclass">
            <div className="main">
                <div className="classname">
                    <p>{detailClass.className}</p>
                    <p>
                        Mã lớp: <span>{detailClass.referralCode}</span>
                    </p>
                </div>
                <div className="detail">
                    <div className="newfeed">
                        <CreateNoti
                            showCreateNoti={showCreateNoti}
                            onShowCreateNotiEvent={onShowCreateNoti}
                            idclass={idclass}
                        />
                        <div
                            className="create-noti"
                            style={
                                showCreateNoti
                                    ? { display: "none" }
                                    : { display: "flex" }
                            }
                            onClick={onShowCreateNoti}
                        >
                            <div className="avatar-user"></div>
                            <p>Tạo thông báo mới cho lớp học của bạn</p>
                        </div>
                        {/* <div className="new-noti">
                            <div className="avatar-user"></div>
                            <div>
                                <p>
                                    Ngô Trường Giang đã đăng 1 tài liệu mới:
                                    Slide
                                </p>
                                <p> 27 thg 4</p>
                            </div>
                        </div> */}
                        {postListState?.map((post) => (
                            <PostDetail key={post.id} datapost={post} />
                        ))}
                    </div>
                </div>
            </div>
            {postListState ? "" : <None />}
        </section>
    );
}

// DetailClass.propTypes = {
//     match: PropTypes.object.isRequired,
//     location: PropTypes.object.isRequired,
//     history: PropTypes.object.isRequired,
// };

const mapStateToProps = (state) => {
    return {
        detailClass: state.detailClass,
        postList: state.postList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPost: (idclass) => {
            dispatch(actGetPostRequest(idclass));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailClass);
