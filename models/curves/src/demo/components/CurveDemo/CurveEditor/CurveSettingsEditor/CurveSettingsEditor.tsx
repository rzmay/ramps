import React from 'react';
import './CurveSettingsEditor.scss';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Curve } from '../../../../../../index';
import EndBehavior from '../../../../../EndBehavior';

interface CurveSettingsEditorProps<T> {
    curve: Curve<T>
}

function CurveSettingsEditor<T>(props: CurveSettingsEditorProps<T>): React.ReactElement {
  const endBehaviorNums = Object.keys(EndBehavior).filter((e) => !isNaN(Number(e)));
  const endBehaviorEntries = endBehaviorNums.map((n) => EndBehavior[n]);

  return (
    <div>
      <div>
        <h5>Curve Settings</h5>
        <Container className="curve-settings-container">
          <Row>
            <Col><strong>End Behavior</strong></Col>
            <Col>
              <Form.Control
                as="select"
                onChange={(e) => {
                  const { value } = e.target as HTMLInputElement;
                  props.curve.endBehaviour = EndBehavior[value];
                }}
              >
                {endBehaviorEntries.map((e) => (
                  <option key={e}>{e}</option>
                ))}
              </Form.Control>
            </Col>
          </Row>
          <Row>
            <Col><strong>Smoothing</strong></Col>
            <Col>
              <Form.Control
                type="number"
                defaultValue={props.curve.smoothing}
                step={0.05}
                onChange={(e) => {
                  const { value } = e.target as HTMLInputElement;
                  if (!isNaN(Number(value))) {
                    props.curve.smoothing = Number(value);
                  }
                }}
              />
            </Col>
          </Row>
        </Container>
        <hr />
        <h5>Display Settings</h5>
        <Container className="display-settings-container">
          <Row>
            <Col sm={6}><strong>Range</strong></Col>
            <Col sm={3}>
              <Form.Label>Min</Form.Label>
              <Form.Control type="number" defaultValue={0} />
            </Col>
            <Col sm={3}>
              <Form.Label>Max</Form.Label>
              <Form.Control type="number" defaultValue={props.curve.endTime} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default CurveSettingsEditor;
