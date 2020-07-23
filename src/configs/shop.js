const shop = {
  moneyMult: {
    name: 'Money mult.',
    initialCost: 300,
    img: 'upgrade_moneybag.png',
    desc: 'Some description for Item 1',
  },
  moneyBuff: {
    name: 'Passive money buff',
    initialCost: 1000,
    img: 'money_buff.png',
    duration: 120,
    desc: 'Some description for Item 2',
  },
  attackDamage: {
    name: 'Attack damage',
    initialCost: 1000,
    img: 'kunai.png',
    desc: 'Some description for Item 3',
  },
  autoAttack: {
    name: 'Auto attack',
    initialCost: 1000,
    img: 'kunai.png',
    duration: 120,
    desc: 'Some description for Item 4',
  },
};

export default shop;

export const shopOrder = [
  'moneyMult',
  'moneyBuff',
  'attackDamage',
  'autoAttack',
];
