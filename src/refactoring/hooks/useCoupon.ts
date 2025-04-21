import { useState } from "react";
import { Coupon } from "../../types.ts";
import { initialCoupons } from "../../constants/index.ts";

export const useCoupons = (initialCoupons: Coupon[]) => {
  return { coupons: initialCoupons, addCoupon: () => undefined };
};
