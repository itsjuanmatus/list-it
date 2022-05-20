export type City = {
  _id: string;
  city_id: number;
  name: string;
  ascii_name: string;
  alternate_names: string[];
  country_code: string;
  timezone: string;
  country: {
    country_id: number;
    iso: string;
    country: string;
    currency_code: string;
    currency_symbol: string;
    phone: string;
    postal_code_format: string;
    postal_code_regex: string;
    languages: string[];
    cities: {
      city_id: number;
      name: string;
    }[];
  };
};
