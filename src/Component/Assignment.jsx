import React, { useEffect, useState } from 'react'
import axios from "axios";
import {
  Typography,
  Descriptions,
  Button,
  Spin,
  Row,
  Divider,
  notification,
} from "antd";
const { Title } = Typography;
function Assignment() {
    const [selectedData, setSelectedData] = useState([]);
    const [loader, setLoader] = useState(false);
   useEffect(() => {
       data();

   }, [])
   
   async function data ()  {
        setLoader(true);
        await axios({
          method: "GET",
          url: "https://randomuser.me/api",
        }).then((response) => {
            console.log(response)
            if (response.status === 200 && response.data) {
                setLoader(false);
                let responseData =  response?.data;
                setSelectedData(responseData?.results);
                localStorage.setItem("users_lists", JSON.stringify(responseData?.results));
            }
        }).catch((error) => {
            console.log(error);
            notification["error"]({
              message: "Unable to display data",
            });
                setLoader(false);

        })
    }
  return (
    <div style={{ padding: "1%" }}>
      <Spin spinning={loader}>
        <Row justify="center">
          <Title>React Assignment</Title>
        </Row>
        <Divider style={{ margin: 0 }}></Divider>
        <Row justify="center">
          <Descriptions
            title="User Info"
            layout="horizontal"
            bordered
            style={{ width: "80%" }}
          >
            <Descriptions.Item label="User Name">
              {selectedData.map((e) => {
                return e.name.title + " " + e.name.first + " " + e.name.last;
              })}
            </Descriptions.Item>
            <Descriptions.Item label="Email ID">
              {selectedData.map((d) => {
                return d.email;
              })}
            </Descriptions.Item>
          </Descriptions>
        </Row>
        <Row style={{ marginTop: "2%" }} justify="center">
          <Button
            type="primary"
            onClick={() => {
              data();
            }}
          >
            Refresh
          </Button>
        </Row>
      </Spin>
    </div>
  );
}

export default Assignment