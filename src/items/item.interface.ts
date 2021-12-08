// src/items/item.interface.ts


// this is to model the data (items)

export interface BaseItem {
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface Item extends BaseItem {
  id: number;
} // for additional items - syntax for TS???

