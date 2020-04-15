import React, { useEffect, useState } from 'react';
import ParticleScene from './scripts/ParticleScene';
import 'bootstrap/dist/css/bootstrap.min.css';

function ParticleCanvas(): React.ReactElement {
  const [didMount, setDidMount] = useState(false);

  const divRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    // Ensure that load only fires once
    if (!didMount) {
      setDidMount(true);

      const scene = new ParticleScene(divRef);

      scene.start();
    }
  }, []);

  return (
    <div
      className="m-0 p-0 w-100 h-100 particle-canvas"
      ref={divRef}
    />
  );
}

export default ParticleCanvas;
