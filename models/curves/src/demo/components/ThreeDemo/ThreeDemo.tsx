import React, { useEffect, useState } from 'react';
import ThreeDemoScene from './scripts/ThreeDemoScene';
import './ThreeDemo.scss';
import ThreeDemoCanvas from './ThreeDemoCanvas/ThreeDemoCanvas';

function ThreeDemo(props: React.PropsWithChildren<any>): React.ReactElement {
  const [didMount, setDidMount] = useState(false);

  const divRef = React.createRef<HTMLDivElement>();
  const [scene, setScene] = useState(new ThreeDemoScene(divRef));

  return (
    <ThreeDemoCanvas scene={scene} divRef={divRef}>
      {React.Children.toArray(props.children).flatMap((child) => {
        if (typeof child === 'string') {
          return null;
        } if (typeof child === 'number') {
          return null;
        } if (child === {}) {
          return null;
        }
        // @ts-ignore
        return React.cloneElement(child, { scene });
      })}
    </ThreeDemoCanvas>
  );
}

export default ThreeDemo;
