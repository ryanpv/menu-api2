// src/items/items.service.ts

/**
 * Data Model Interfaces
 */

import { BaseItem, Item } from "./item.interface"; //imports the interfaces created in item/s.interface.ts files
import { Items } from "./items.interface";

/**
 * In-Memory Store
 */
// simple in-memory store represented as an object - so you do not have to use external database to store records
// everytime server is restarted, Express wipes in-memory store, BUT since using ts-node-dev, it only happens when we make changes to service module file
let items: Items = {
  1: {
    id: 1,
    name: "Burger",
    price: 599,
    description: "Tasty",
    image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
  },
  2: {
    id: 2,
    name: "Pizza",
    price: 299,
    description: "Cheesy",
    image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
  },
  3: {
    id: 3,
    name: "Tea",
    price: 199,
    description: "Informative",
    image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
  }
};

/**
 * Service Methods
 */

export const findAll = async (): Promise<Item[]> => Object.values(items); // findAll returns the whole itemS store object

export const find = async (id: number): Promise<Item> => items[id]; // find receives the id and then returns the single store element 

// async meaning not occurring at the same time???
// what is Promise<Item>??? Task<T> object/method that models asynchronous operations???

export const create = async (newItem: BaseItem): Promise<Item> => { //create method receives object of type BaseItem as argument while providing all required values to define new item (no id)
  const id = new Date().valueOf(); //this is to create new id

  items[id] = {
    id,
    ...newItem,
  };

  return items[id];
};

export const update = async ( //to update existing item
  id: number, //argument - used to find item in store
  itemUpdate: BaseItem //argument - used to update the id specific item
): Promise<Item | null> => { //cant find item, then null is returned
  const item = await find(id); 

  if (!item) {
    return null;
  }

  items[id] = { id, ...itemUpdate };

  return items[id];
};

export const remove = async (id: number): Promise<null | void> => { //method to remove item, "promises" to return null/void
  const item = await find(id); //when item id is found, function will run the 'await' function line to return null or delete item[id]

  if (!item) { 
    return null; //if item is not found, null is returned
  }

  delete items[id]; //deletes the found item of the corresponding id
};