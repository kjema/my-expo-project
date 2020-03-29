// import { StackNavigationProp } from "@react-navigation/stack";
// import { RouteProp } from "@react-navigation/native";

import { ProductParamList } from "./ProductParamList";

export type SearchParamList = {
  Search: undefined;
} & ProductParamList;

// export type SearchStackNavProps<T extends keyof SearchParamList> = {
//   navigation: StackNavigationProp<SearchParamList, T>;
//   route: RouteProp<SearchParamList, T>;
// };
