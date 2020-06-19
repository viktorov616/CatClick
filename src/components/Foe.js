import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { usePrevious } from '../utils/hooks'

const StyledFoe = styled(motion.div)`
  background-image: url(${(props) => props.foeImage});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 300px;
  height: 475px;
  position: absolute;
  right: 175px;
  bottom: 20px;

  .hp-bar {
    width: 100%;
    height: 20px;
    top: -35px;
    position: absolute;
    background: red;
    border: 4px solid #440303;
    &:before {
      content: '';
      position: absolute;
      display: block;
      background: #fff;
      width: ${(props) => 100 - (100 / props.maxHp) * props.hp}%;
      height: 100%;
      right: 0;
    }
  }
`;

const Foe = React.memo(({
  hp: maxHp,
  picture,
  triggerNextFoe,
  code,
  handleHitFoe,
  foeIndex,
}) => {
  const animationControls = useAnimation();
  const previousCode = usePrevious(code);

  useEffect(() => {
    setHp(maxHp);
  }, [maxHp, foeIndex]);

  useEffect(() => {
    const animate = async () => {
      await animationControls.start({
        opacity: 0,
        scale: .4,
        transition: { duration: 0 },
      });
      animationControls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, ease: 'easeOut' },
      });
    }

    animate()
  }, [foeIndex, animationControls]);

  const [hp, setHp] = useState(maxHp);
  const foeImage = require(`../img/${picture}`);

  function handleSetHp() {
    if (hp <= 0) {
      triggerNextFoe();
    } else {
      setHp(hp - 250);
    }
  }

  return (
    <StyledFoe
      key="visibleNotice"
      className="info-notice__inner"
      style={{ transformOrigin: 'top left', display: previousCode !== code ? 'none' : 'block' }}
      animate={animationControls}
      initial={{ opacity: 0, scale: 0.1 }}
      foeImage={foeImage}
      onClick={() => {
        handleHitFoe();
        handleSetHp();
      }}
      maxHp={maxHp}
      hp={hp}
    >
      <div className="hp-bar"></div>
    </StyledFoe>
  );
})

export default Foe;
