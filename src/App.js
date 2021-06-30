import "./styles.css";
import { useState } from "react";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { Modal, Input, Button, Row, Col, Typography } from "antd";
import { Formik } from "formik";

import "antd/dist/antd.css";

import MyTable from "./component/MyTable";
import MyForm from "./component/MyForm";
import validationSchema from "./util/validationSchema";
import initValues from "./util/initValues";

export default function App() {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("new");
  const [selectedData, setSelectedData] = useState(null);

  const saveData = (data) => {
    const { key } = data;
    if (key) {
      setData((preData) => [
        { ...data, updateDateTime: moment().format("YYYY-MM-DD HH:mm:ss") },
        ...preData.filter((item) => item.key !== key),
      ]);
    } else {
      setData((preData) => [
        {
          key: uuidv4(),
          createDateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
          updateDateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
          ...data,
        },
        ...preData,
      ]);
    }
  };

  const deleteData = (key) => {
    setData((preData) => preData.filter((item) => item.key !== key));
  };

  const onEdit = (key) => {
    setSelectedData(data.find((item) => item.key === key));
    setMode("edit");
    openModal();
  };

  const onInsert = () => {
    setSelectedData(initValues);
    setMode("new");
    openModal();
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const submitForm = (values, actions) => {
    saveData(values);
    closeModal();
  };

  const randomData = () =>
    saveData({
      pNo: "this is a no",
      pName: "this is a name",
      pSpec: "this is a spec",
      pQuantity: 0,
      pDesc: "this is a desc",
      pWay: "STORE",
      pDate: moment(),
      pTime: moment(),
    });

  return (
    <div style={{ paddingTop: "32px", height: "100vh" }}>
      <Row>
        <Col style={{ display: "flex", justifyContent: "center" }}>
          <Typography.Title>Products</Typography.Title>
        </Col>
      </Row>
      {/* <Row style={{ marginBottom: "1rem" }}>
        <Col span='6' offset='1'>
          <Input.Search enterButton='搜尋' size='large' onSearch={(value) => console.log(value)} />
        </Col>
      </Row> */}
      <Row>
        <Col span='22' offset='1'>
          <MyTable data={data} onDelete={deleteData} onEdit={onEdit} />
        </Col>
      </Row>
      <Row
        style={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Col style={{ margin: "0.5rem" }}>
          <Button type='primary' icon='question' onClick={randomData}>
            隨機
          </Button>
        </Col>
        <Col style={{ margin: "0.5rem" }}>
          <Button type='primary' icon='form' onClick={onInsert}>
            新增
          </Button>
        </Col>
      </Row>
      <Modal
        destroyOnClose
        title={mode}
        visible={modalOpen}
        onCancel={closeModal}
        footer={null}
        style={{ top: 20 }}
        width='80%'
      >
        <Formik
          enableReinitialize
          initialValues={selectedData}
          validateOnBlur
          validationSchema={validationSchema}
          onSubmit={submitForm}
        >
          <MyForm />
        </Formik>
      </Modal>
    </div>
  );
}
