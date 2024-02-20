// // zustand store 생성
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { createAuthSlice } from "./authSlice";
import { createMyPageSlice } from "./MyPageSlice";
import { createProductSlice } from "./ProductSlice";
import { createPurchaseSlice } from "./PurchaseSlice";
import { createSearchSlice } from "./searchSlice";
import { themeSlice } from "./themeSlice";
import { createImageSlice } from "./imageSlice";
import { createCustomAxiosSlice } from "./customAxiosSlice";

export const useBoundStore = create<
    AuthSlice &
    MyPageSlice &
    PurchaseSlice &
    ProductSlice &
    SearchSlice &
    ThemeSlice &
    ImageSlice & 
    customAxiosSlice
>()(
  devtools(
    persist(
      (...a) => ({
        ...createAuthSlice(...a),
        ...createMyPageSlice(...a),
        ...createProductSlice(...a),
        ...createPurchaseSlice(...a),
        ...themeSlice(...a),
        ...createSearchSlice(...a),
        ...createImageSlice(...a),
        ...createCustomAxiosSlice(...a),
      }),
      {
        name: "boundStore",
        partialize: (state) => ({
          userToken: state.userToken,
          userBasicInfo: state.userBasicInfo,
          isLoggedIn: state.isLoggedIn,
          productDetailData: state.productDetailData,
          isDark: state.isDark,
          navSelectedValue: state.navSelectedValue,
        }),
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);


export const useAuthSlice = () => useBoundStore((state)=>{
  return  {
  userToken: state.userToken,
  userBasicInfo : state.userBasicInfo,
  isLoggedIn: state.isLoggedIn,
  verifyEmail: state.verifyEmail,
  signUp: state.signUp,
  login: state.login,
  updateUserBasicInfo: state.updateUserBasicInfo,
  logout: state.logout,
} satisfies AuthSlice})


export const useMyPageSlice = () => useBoundStore((state)=>{
  return {
    myInfo: state.myInfo,
    getMyInfo : state.getMyInfo,
    setMyInfo : state.setMyInfo,
    updateMyInfo : state.updateMyInfo,
    getMyProducts : state.getMyProducts,
} satisfies MyPageSlice})


export const useThemeSlice = () => useBoundStore((state)=>{
  return {
  isDark: state.isDark,
  setIsDark: state.setIsDark,
  isToastOpen: state.isToastOpen,
  alertText: state.alertText,
  bgColor: state.bgColor,
  navSelectedValue: state.navSelectedValue,
  setNavSelected: state.setNavSelected,
  setIsToastOpen: state.setIsToastOpen,
  setAlertText: state.setAlertText,
  setBgColor: state.setBgColor,
  } satisfies ThemeSlice})


export const usePurchaseSlice = () => useBoundStore((state)=>{
  return {
    productDetailData: state.productDetailData,
    setProductDetailData: state.setProductDetailData,
  } satisfies PurchaseSlice})


export const useSearchSlice = () => useBoundStore((state)=>{
  return {
    searchItemsInThisBound: state.searchItemsInThisBound, 
    searchItemsInThisBoundAndPeriod : state.searchItemsInThisBoundAndPeriod,
  } satisfies SearchSlice })


export const useProductSlice = () => useBoundStore((state) => {
  return {
    productItem : state.productItem,
    productList : state.productList,
  } satisfies ProductSlice })


export const useImageSlice = () => useBoundStore((state)=>{
  return {
  uploadImage : state.uploadImage
} satisfies ImageSlice})


export const useCustomAxiosSlice = () => useBoundStore((state)=>{
  return {
  useCustomAxios : state.useCustomAxios
} satisfies customAxiosSlice})
// customAxiosSlice

