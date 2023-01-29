const reducer = (accumulator, currentItem) =>
  accumulator + currentItem.adNairaPrice;
const getCartTotal = (user) => user?.reducer(reducer, 0);
export default getCartTotal;
