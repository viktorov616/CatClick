import React, { useState, useEffect, useReducer, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { usePrevious } from '../utils/hooks';
import Cursor from '../img/cursor.png';
import { basicFormReducer } from '../utils/hooks';
import skillsConfig from '../configs/skills';

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
  ({
    hp: maxHp,
    picture,
    triggerNextFoe,
    code,
    handleHitFoe,
    foeIndex,
    heroAttackDamage,
    foeRef,
    skills,
  }) => {
    const animationControls = useAnimation();
    const animationHpControls = useAnimation();
    const previousCode = usePrevious(code);
    const initialState =
      skills?.reduce((result, skill) => {
        result[skill] = {
          cooldown: skillsConfig[skill].initialDelay,
          active: false,
          timerId: null,
        };
        return result;
      }, {}) ?? {};
    const [skillsState, dispatch] = useReducer(basicFormReducer, initialState);

    const timers = useRef({});
    // useEffect(() => {
    //   Object.entries(skillsState).forEach(([field, state]) => {
    //     const { active, timerId, cooldown } = state;

    //     if (!active && !timerId) {
    //       timers.current[field] = setTimeout(() => {
    //         dispatch({
    //           type: 'changeField',
    //           field,
    //           value: {
    //             ...state,
    //             timerId: null,
    //             active: true,
    //             cooldown:
    //               skillsConfig[field].cooldown + skillsConfig[field].duration,
    //           },
    //         });
    //       }, cooldown * 1000);
    //       dispatch({
    //         type: 'changeField',
    //         field,
    //         value: {
    //           ...state,
    //           timerId: timers.current[field],
    //         },
    //       });
    //     } else if (active) {
    //       setTimeout(() => {
    //         dispatch({
    //           type: 'changeField',
    //           field,
    //           value: {
    //             ...state,
    //             active: false,
    //             cooldown: skillsConfig[field].cooldown,
    //           },
    //         });
    //       }, skillsConfig[field].duration * 1000);
    //     }
    //   });
    // }, [skillsState]);

    useEffect(() => {
      return () => {
        Object.values(timers).forEach((timer) => clearTimeout(timer));
      };
    }, []);

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
    }, [foeIndex, animationControls, animationHpControls]);

    const [hp, setHp] = useState(maxHp);
    const foeImage = require(`../img/${picture}`);

    function handleSetHp() {
      const updatedHp = hp - heroAttackDamage;

      if (updatedHp <= 0) {
        triggerNextFoe();
      } else {
        setHp(updatedHp);
      }
    }

    return (
      <StyledFoeWrapper>
        <StyledFoe
          ref={foeRef}
          style={{
            transformOrigin: 'top left',
            display: previousCode !== code ? 'none' : 'block',
          }}
          animate={animationControls}
          initial={{ opacity: 0, scale: 0.1 }}
          foeImage={foeImage}
          onClick={() => {
            if (!skillsState.block?.active) {
              handleHitFoe();
              handleSetHp();
            }
          }}
        />
        <StyledHpBar animate={animationHpControls} maxHp={maxHp} hp={hp} />
      </StyledFoeWrapper>
    );
  }
);

export default Foe;
