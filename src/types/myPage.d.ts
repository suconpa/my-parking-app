interface MyPageSlice {
  myInfo: UserDetailInfoType;
  getMyInfo: (id: number) => Promise<UserDetailInfoType>;
  setMyInfo: (myinfo: Partial<UserDetailInfoType>) => void;
  updateMyInfo: (
    id: number,
    editedInfo: Partial<UserDetailInfoType>
  ) => Promise<Partial<UserDetailInfoType>>;
  getMyProducts: () => Promise<ProductListType>;
}
  

type UserDetailInfoType = UserBasicInfoType & { extra: ExtraType };

type MyPageResponseType = {
  config: object;
  data: {
    ok: number;
    item: UserDetailInfoType;
  };
};

type MyPageEditResponseType = {
  config: object;
  data: {
    ok: number;
    updated: Partial<UserDetailInfoType>;
  };
};

type MyPageErrorResType = {
  ok: 0;
  message: string;
  errorName: string;
};

type MyProductsResponseType = {
  config: object;
  data: {
    ok: number;
    item: ProductListType;
  };
}