export interface ConfigModel {
  // Langs:
  langs: string[];
  defaultLang: string;
  // Navbar:
  navigation: Navigation[];
  products: Products[];
  collections: Collections[];
}

export interface Navigation {
  name: string;
  url?: string;
  links?: { name: string; url: string }[];
}

export interface Products {
  name: string;
  price: number;
  label: boolean;
}

export interface Collections {
  name: string;
  label: boolean;
}
