const shop = {
  moneyMult: {
    name: 'Money mult.',
    initialCost: 300,
    img: 'upgrade_moneybag.png',
    desc: 'Increases money per second',
  },
  moneyBuff: {
    name: 'Passive money buff',
    initialCost: 1000,
    img: 'money_buff.png',
    duration: 120,
    desc: 'Increases money per hit for a limited time',
  },
  attackDamage: {
    name: 'Attack damage',
    initialCost: 1000,
    img: 'kunai.png',
    desc: 'Increases hero attack damage',
  },
  autoAttack: {
    name: 'Auto attack',
    initialCost: 1000,
    img: 'kunai.png',
    duration: 120,
    desc: 'Enables hero auto attack for a limited time',
  },
};

export default shop;

export const shopOrder = [
  'moneyMult',
  'moneyBuff',
  'attackDamage',
  'autoAttack',
];
