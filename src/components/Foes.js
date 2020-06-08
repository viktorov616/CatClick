import React, { useState } from 'react';
import orderConfig from '../configs/order'
import foesConfig from '../configs/foes'
import Foe from './Foe';

export default function Foes() {
  const [foeIndex, setFoeIndex] = useState(0);
  console.log({foeIndex})
  const handleTriggerNextFoe = () => {
    console.log(orderConfig.length)
    setFoeIndex((index) => (index >= orderConfig.length - 1) ? 0 : index + 1)
  }

  return (
    <Foe
      {...foesConfig[orderConfig[foeIndex]]}
      code={orderConfig[foeIndex]}
      triggerNextFoe={handleTriggerNextFoe}
    />
  )
}
