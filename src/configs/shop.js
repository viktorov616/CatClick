const shop = {
  moneyMult: {
    initialCost: 300,
    img: 'upgrade_moneybag.png',
  },
  moneyBuff: {
    initialCost: 1000,
    img: 'money_buff.png',
    duration: 120,
  },
  attackDamage: {
    initialCost: 1000,
    img: 'kunai.png',
  },
  autoAttack: {
    initialCost: 1000,
    img: 'kunai.png',
    duration: 120,
  },
};

export default shop;

export const shopOrder = ['moneyMult', 'moneyBuff', 'attackDamage', 'autoAttack'];
