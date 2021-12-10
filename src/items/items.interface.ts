// src/items/items.interface.ts

// this file holds definition of an items type

import { Item } from "./item.interface"; //imports the baseItem 

export interface Items {
  [key: number]: Item;
}

