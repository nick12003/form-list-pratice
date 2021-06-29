import {
  Form,
  Col,
  Row,
  DatePicker,
  TimePicker,
  Input,
  Radio,
  Button
} from "antd";
import { useFormikContext } from "formik";
import MyFormItem from "./MyFormItem";

const MyForm = () => {
  const { setFieldValue, setFieldTouched, submitForm } = useFormikContext();
  return (
    <Form>
      <Row>
        <Col span={6} offset={1}>
          <MyFormItem label="商品編號" name="pNo">
            {({ field }) => <Input {...field} />}
          </MyFormItem>
        </Col>
        <Col span={6} offset={2}>
          <MyFormItem label="商品名稱" name="pName">
            {({ field }) => <Input {...field} />}
          </MyFormItem>
        </Col>
        <Col span={6} offset={2}>
          <MyFormItem label="商品規格" name="pSpec">
            {({ field }) => <Input {...field} />}
          </MyFormItem>
        </Col>
      </Row>
      <Row>
        <Col span={6} offset={1}>
          <MyFormItem label="商品數量" name="pQuantity">
            {({ field }) => <Input {...field} />}
          </MyFormItem>
        </Col>
        <Col span={6} offset={2}>
          <MyFormItem label="運送方式" name="pWay">
            {({ field }) => (
              <Radio.Group {...field}>
                <Radio value="STORE">超商取貨</Radio>
                <Radio value="HOME">宅配</Radio>
              </Radio.Group>
            )}
          </MyFormItem>
        </Col>
      </Row>
      <Row>
        <Col span={22} offset={1}>
          <MyFormItem label="商品描述" name="pDesc">
            {({ field }) => <Input.TextArea {...field} />}
          </MyFormItem>
        </Col>
      </Row>
      <Row>
        <Col span={6} offset={1}>
          <MyFormItem label="上架時間(日期)" name="pDate">
            {({ field }) => (
              <DatePicker
                {...field}
                onChange={(v) => {
                  setFieldTouched("pDate", true, false);
                  setFieldValue("pDate", v, true);
                }}
              />
            )}
          </MyFormItem>
        </Col>
        <Col span={6} offset={2}>
          <MyFormItem label="上架時間(時間)" name="pTime">
            {({ field }) => (
              <TimePicker
                {...field}
                onChange={(v) => {
                  setFieldTouched("pTime", true, false);
                  setFieldValue("pTime", v, true);
                }}
              />
            )}
          </MyFormItem>
        </Col>
      </Row>
      <Row>
        <Col span={2} offset={20}>
          <Button type="primary" size="large" onClick={submitForm}>
            確定
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default MyForm;
