import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import "antd/dist/antd.css";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
}

function UploadAvatar(props) {
    const { userProfile } = props;
    // console.log(userProfile);

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const handleChange = (info) => {
       
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            console.log(info.file.response.data.url);

            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl) => {
                setLoading(false);
                setImageUrl(imageUrl);
                props.setLinkAvatar(info.file.response.data.url[0]);
            });
        }
    };
    useEffect(() => {
        userProfile.avatar ? setImageUrl(userProfile.avatar) : "";
    }, [userProfile]);

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return (
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            name={"files"}
            action="https://citaclassroom.xyz/api/upload"
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
                uploadButton
            )}
        </Upload>
    );
}

const mapStateToProps = (state) => {
    return {
        userProfile: state.userProfile,
    };
};

export default connect(mapStateToProps, null)(UploadAvatar);
