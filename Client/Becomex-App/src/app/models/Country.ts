import { Currencies } from "./Currencies";
import { Flags } from "./Flags";
import { Languages } from "./Languages";
import { RegionalBlocs } from "./RegionalBlocs";

export interface Country {
  name: string;
  alpha3Code: string;
  currencies: Currencies[];
  flags: Flags;
  regionalBlocs: RegionalBlocs[];
  borders: string[];
  population: string;
  region: string;
  timezones: string[];
  languages: Languages[];
  capital: string;
}
