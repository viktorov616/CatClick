import React, { useState, useCallback } from 'react';
import foesConfig from '../configs/foes';
import Foe from './Foe';

export default function Foes({
  handleFoeHit,
  heroAttackDamage,
  foeRef,
  triggerNextFoeCallback,
  handleTriggerNextLocation,
  order,
  location,
}) {
  const [foeIndex, setFoeIndex] = useState(0);

  const handleTriggerNextFoe = useCallback(() => {
    triggerNextFoeCallback({ foe: foesConfig[order[foeIndex]] });
    setFoeIndex((index) => (index >= order.length - 1 ? 0 : index + 1));
    if (foeIndex >= order.length - 1) handleTriggerNextLocation();
  }, [foeIndex, triggerNextFoeCallback, handleTriggerNextLocation, order]);

  return (
    <Foe
      key={`location-${location}_foe-${foeIndex}`}
      {...foesConfig[order[foeIndex]]}
      foeIndex={foeIndex}
      code={order[foeIndex]}
      triggerNextFoe={handleTriggerNextFoe}
      handleHitFoe={handleFoeHit}
      heroAttackDamage={heroAttackDamage}
      foeRef={foeRef}
    />
  );
}
