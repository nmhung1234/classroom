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

    const onCopyToClipboard = async () => {
        try {
            // console.log(navigator);
            
            await navigator.clipboard.writeText(detailClass.referralCode);
            alert("Đã copy mã lớp vào Clipboard");
        } catch (err) {
            alert("Failed to copy");
        }
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
                    <p className="tooltip copy">
                        Mã lớp:{" "}
                        <span onClick={onCopyToClipboard}>
                            {detailClass.referralCode}
                        </span>
                        <span
                            className="tooltiptext"
                            style={{
                                fontSize: "12px",
                                letterSpacing: "0",
                                background: "#74b9ff",
                            }}
                        >
                            Copy mã lớp
                        </span>
                    </p>

                    {/* tootip */}
                    {/* <div className="tooltip"> */}
                    {/* </div> */}
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
                        {postListState.length ? (
                            ""
                        ) : (
                            <>
                                <p
                                    style={{
                                        margin: "0 auto",
                                        padding: "20px 30px",
                                        border: "1px solid var(--color-border)",
                                        borderRadius: "10px",
                                        marginTop: "20px",
                                        textAlign: "center",
                                    }}
                                    onClick={onShowCreateNoti}
                                >
                                    Tạo thông báo cho lớp học của bạn
                                </p>
                                <None />
                            </>
                        )}
                    </div>
                </div>
            </div>
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
