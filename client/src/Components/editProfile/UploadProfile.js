import React from "react";
import { Upload, message } from "antd";
import axios from "axios";

import { Avatar } from "@material-ui/core";

import "antd/dist/antd.css";

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

class UploadProfile extends React.Component {
  state = {
    loading: false
  };

  handleChange = async info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      const formData = new FormData();
      formData.append("profileImage", info.file.originFileObj);
      const config = {
        header: {
          "Content-Type": "multipart/form-data"
        }
      };
      try {
        const res = await axios.post("api/users/image", formData, config);
        this.setState({
          imageUrl: `/img/profiles/${res.data}`,
          loading: false
        });
      } catch (error) {
        message.error(error.response.data.msg);
        this.setState({
          loading: false
        });
      }
    }
  };

  render() {
    const { imageUrl } = this.state;
    const { img } = this.props;
    return (
      <>
        <Upload
          style={{ margin: "0 auto" }}
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? (
            <Avatar
              src={imageUrl}
              alt="avatar"
              style={{ width: "150px", height: "150px" }}
              variant="square"
            />
          ) : (
            <Avatar
              src={img}
              alt="avatar"
              style={{ width: "150px", height: "150px" }}
              variant="square"
            />
          )}
        </Upload>
      </>
    );
  }
}

export default UploadProfile;
