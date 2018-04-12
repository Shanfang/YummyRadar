export class Review {
  id: string;
  text: string;
  dba_id?: string;
  c_id?: string;
  r_id?: string;
  time?: string; //oracle Date -> String
  star?: number;
  cool_num?: number;
  funny_num?: number;
  useful_num?: number;
}
