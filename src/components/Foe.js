import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { usePrevious } from '../utils/hooks';
import Cursor from '../img/cursor.png';

const StyledFoeWrapper = styled.div`
  position: absolute;
  right: 175px;
  bottom: 20px;
`;

const StyledFoe = styled(motion.div)`
  background-image: url(${(props) => props.foeImage});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 300px;
  height: 475px;
  &:hover {
    cursor: url(${Cursor}), auto;
  }
`;

const StyledHpBar = styled(motion.div)`
  width: 100%;
  height: 20px;
  top: -35px;
  position: absolute;
  background: red;
  border: 4px solid #440303;
  &:before {
    background: #fff;
    content: '';
    display: block;
    height: 100%;
    position: absolute;
    right: 0;
    width: ${(props) => 100 - (100 / props.maxHp) * props.hp}%;
  }
`;

const Foe = React.memo(
  ({ hp: maxHp, picture, triggerNextFoe, code, handleHitFoe, foeIndex }) => {
    const animationControls = useAnimation();
    const animationHpControls = useAnimation();
    const previousCode = usePrevious(code);

    useEffect(() => {
      setHp(maxHp);
    }, [maxHp, foeIndex]);

    useEffect(() => {
      const animate = async () => {
        animationHpControls.start({
          display: 'none',
          opacity: 0,
          width: 0,
          transition: { duration: 0 },
        });
        await animationControls.start({
          opacity: 0,
          scale: 0.4,
          transition: { duration: 0 },
        });
        animationControls.start({
          opacity: 1,
          scale: 1,
          transition: { duration: 0.7, ease: 'easeOut' },
        });
        animationHpControls.start({
          display: 'block',
          opacity: 1,
          width: '100%',
          transition: { duration: 0.7, ease: 'easeOut' },
        });
      };

      animate();
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
      <StyledFoeWrapper>
        <StyledFoe
          key="visibleNotice"
          className="info-notice__inner"
          style={{
            transformOrigin: 'top left',
            display: previousCode !== code ? 'none' : 'block',
          }}
          animate={animationControls}
          initial={{ opacity: 0, scale: 0.1 }}
          foeImage={foeImage}
          onClick={() => {
            handleHitFoe();
            handleSetHp();
          }}
        ></StyledFoe>
        <StyledHpBar animate={animationHpControls} maxHp={maxHp} hp={hp} />
      </StyledFoeWrapper>
    );
  }
);

export default Foe;
