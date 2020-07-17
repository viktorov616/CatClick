const shop = {
  moneyMult: {
    initialCost: 300,
    img: 'upgrade_moneybag.png',
  },
  moneyBuff: {
    initialCost: 1,
    img: 'money_buff.png',
    duration: 120,
  },
  attackDamage: {
    initialCost: 1000,
    img: 'kunai.png',
  },
};

export default shop;

export const shopOrder = ['moneyMult', 'moneyBuff', 'attackDamage'];
