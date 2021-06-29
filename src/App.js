import "./styles.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Modal, Button, Row, Col, Typography } from "antd";
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
        ...preData.filter((item) => item.key !== key),
        data
      ]);
    } else {
      setData((preData) => [...preData, { key: uuidv4(), ...data }]);
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
  return (
    <div style={{ paddingTop: "32px", height: "100vh" }}>
      <Row>
        <Col style={{ display: "flex", justifyContent: "center" }}>
          <Typography.Title>Products</Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col span="22" offset="1">
          <MyTable data={data} onDelete={deleteData} onEdit={onEdit} />
        </Col>
      </Row>
      <Row>
        <Col
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Button type="primary" icon="form" onClick={onInsert}>
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
        width="80%"
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
