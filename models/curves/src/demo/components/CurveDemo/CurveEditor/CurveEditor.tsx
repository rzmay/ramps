import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import './CurveEditor.scss';
import { Curve } from '../../../../../index';
import CurveSettingsEditor from './CurveSettingsEditor/CurveSettingsEditor';

interface CurveEditorProps<T> {
    curve: Curve<T>
}

function CurveEditor<T>(props: CurveEditorProps<T>): React.ReactElement {
  return (
    <div className="tab-container">
      <Tabs defaultActiveKey="keyframe" id="curve-editor">
        <Tab eventKey="keyframe" title="Keyframes" className="tab-content">
          <div>
            <p>fuck off</p>
          </div>
        </Tab>
        <Tab eventKey="modifiers" title="Modifiers" className="tab-content">
          <p>fuck off 3</p>
        </Tab>
        <Tab eventKey="curve" title="Curve & Display" className="tab-content">
          <CurveSettingsEditor<T> curve={props.curve} />
        </Tab>
        <Tab eventKey="code" title="Code" className="tab-content">
          <p>fuck meself</p>
        </Tab>
      </Tabs>
    </div>
  );
}

export default CurveEditor;
