import React, { useEffect } from 'react';
import styled from 'styled-components';
import HeroImage from '../img/naruto.png';
import { motion, useAnimation } from 'framer-motion';

const StyledHero = styled(motion.div)`
  background-image: url(${HeroImage});
  background-repeat: no-repeat;
  background-size: contain;
  bottom: 20px;
  left: 500px;
  height: 450px;
  position: absolute;
  width: 310px;
`;

const Hero = React.memo(({ animateHero, setAnimateHero }) => {
  const animationControls = useAnimation();

  useEffect(() => {
    const animate = async () => {
      await animationControls.start({
        left: Math.random() > 0.8 ? '550px' : '520px',
        transition: { duration: 0.1 },
      });
      animationControls.start({
        left: '500px',
        transition: { duration: 0.2 },
      });
      setAnimateHero(false);
    };

    if (animateHero) animate();
  }, [animateHero, animationControls, setAnimateHero]);

  return <StyledHero animate={animationControls} />;
});

export default Hero
