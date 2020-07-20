const shop = {
  moneyMult: {
    name: 'Money mult.',
    initialCost: 300,
    img: 'upgrade_moneybag.png',
  },
  moneyBuff: {
    name: 'Passive money buff',
    initialCost: 1000,
    img: 'money_buff.png',
    duration: 120,
  },
  attackDamage: {
    name: 'Attack damage',
    initialCost: 1000,
    img: 'kunai.png',
  },
  autoAttack: {
    name: 'Auto attack',
    initialCost: 1000,
    img: 'kunai.png',
    duration: 120,
  },
};

export default shop;

export const shopOrder = ['moneyMult', 'moneyBuff', 'attackDamage', 'autoAttack'];
