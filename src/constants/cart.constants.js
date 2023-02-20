export const productAmount = (data) => {
  return data.reduce((acc, item) => acc + item.price * item.quantity, 0)
};