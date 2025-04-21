import { CartItem, Coupon } from "../../types";

export const calculateItemTotal = (item: CartItem) => {
  return 0;
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  return 0;
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {

  console.log('cart:', cart);
  const totalBeforeDiscount = cart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const totalDiscount = cart.reduce((discount, item) => {
    const applicableDiscount = item.product.discounts
      ?.filter(d => item.quantity >= d.quantity)
      .sort((a, b) => b.rate - a.rate)[0]; // 가장 높은 할인율 적용

    const discountAmount = applicableDiscount
      ? item.product.price * item.quantity * applicableDiscount.rate
      : 0;

    return discount + discountAmount;
  }, 0);

  let couponDiscount = 0;
  if (selectedCoupon) {
    if (selectedCoupon.discountType === 'percentage') {
      couponDiscount = totalBeforeDiscount * (selectedCoupon.discountValue / 100);
    } else if (selectedCoupon.discountType === 'amount') {
      couponDiscount = selectedCoupon.discountValue;
    }
  }

  const totalAfterDiscount = totalBeforeDiscount - totalDiscount - couponDiscount;
  console.log('totalBeforeDiscount', totalBeforeDiscount);
  console.log('totalDiscount', totalDiscount);
  console.log('couponDiscount', couponDiscount);
  console.log('totalAfterDiscount', totalAfterDiscount);
  
  return {
    totalBeforeDiscount,
    totalAfterDiscount: Math.max(totalAfterDiscount, 0), // 총 금액은 0 이상이어야 함
    totalDiscount: totalDiscount + couponDiscount,
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  return [];
};
