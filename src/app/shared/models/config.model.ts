export interface ConfigModel {
  // Langs:
  langs: string[];
  defaultLang: string;
  // Navbar:
  navigation: Navigation[];
}

export interface Navigation {
  name: string;
  url?: string;
  links?: { name: string; url: string }[];
}
