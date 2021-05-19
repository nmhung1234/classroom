import React, { useState } from "react";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
import refreshToken from "./../../utils/checkToken";
import { actDeleteCommentRequest } from "../../action/Action";
function Comment(props) {
    const { userProfile, onDeleteComment, comment } = props;

    console.log(userProfile);

    const [showActDelComment, setShowActDelComment] = useState(false);

    return (
        <div className="user-comment">
            <div className="avatar-user"></div>
            <div className="detail-comment">
                <div className="detail-user-comment">
                    <span className="name-user">{userProfile.username}</span>
                    <span className="date">{comment.createdAt}</span>
                </div>
                <div className="comment-content">{comment.content}</div>
                <div
                    className={
                        userProfile?.id == comment?.ownerId
                            ? "action"
                            : "action hide"
                    }
                    onClick={() => setShowActDelComment(!showActDelComment)}
                >
                    <span className="fas fa-ellipsis-v hover"></span>
                    <div
                        className={
                            showActDelComment ? "delete hover" : "delete hide"
                        }
                    >
                        <p onClick={() => refreshToken([onDeleteComment(comment.id)])}>Xóa</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Comment.propTypes = {};

// postDetail.propTypes = {};
const mapStateToProps = (state) => {
    return {
        userProfile: state.userProfile,
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        onDeleteComment: (idcomment) => {
            dispatch(actDeleteCommentRequest(idcomment));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Comment);
