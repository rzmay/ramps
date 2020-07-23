import React, { useEffect, useState } from 'react';
import ThreeDemoScene from '../scripts/ThreeDemoScene';
import './ThreeDemoCanvas.scss';

interface ThreeDemoCanvasProps {
  scene: ThreeDemoScene;
  divRef: React.RefObject<HTMLDivElement>;
}

function ThreeDemoCanvas(props: React.PropsWithChildren<ThreeDemoCanvasProps>): React.ReactElement {
  const [didMount, setDidMount] = useState(false);

  const [scene, setScene] = useState(props.scene);

  useEffect(() => {
    // Ensure that load only fires once
    if (!didMount) {
      setDidMount(true);

      scene.start();
    }
  }, []);

  return (
    <div
      className="m-0 p-0 w-100 h-100 vector3-demo-canvas"
      ref={props.divRef}
    >
      {props.children}
    </div>
  );
}

export default ThreeDemoCanvas;
