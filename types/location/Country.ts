export type Country = {
  _id: string;
  iso: string;
  country: string;
  capital: string;
  currency_code: string;
  currency_name: string;
  currency_symbol: string;
  phone: string;
  postal_code_format: string;
  postal_code_regex: string;
  languages: string[];
  country_id: number;
  cities: {
    city_id: number;
    name: string;
  }[];
};
