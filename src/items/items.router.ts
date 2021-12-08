/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express"; //importing express package and its internal type definitions request and response
import * as ItemService from "./items.service"; //imports all export functions from items.service module
import { BaseItem, Item } from "./item.interface"; //importing the created interfaces 

/**
 * Router Definition
 */

export const itemsRouter = express.Router(); //defining the express router - like a "mini-app" because it functions as complete middleware and routing system
//need more explanation
/**
 * Controller Definitions
 */

// GET items

itemsRouter.get("/", async (req: Request, res: Response) => { //setting function as async to look for request and resposne
  try {
    const items: Item[] = await ItemService.findAll(); //looks through the whole items store object (In-memory store object)
    //when whole item store found, server would send response 200, if not then response 500

    res.status(200).send(items); //http 200 okay response
  } catch (e) {
    res.status(500).send(e.message); //internal server error response
  }
});


// GET items/:id


itemsRouter.get("/:id", async (req: Request, res: Response) => { //request and response function for specific item id
  const id: number = parseInt(req.params.id, 10); //to return the id as a number (and not string), using base of 10???
  try {
    const item: Item = await ItemService.find(id); //if item is found/not found, then responses 200,404, 500 will return

    if (item) {
      return res.status(200).send(item);// okay response
    }

    res.status(404).send("item not found"); //404 not found
  } catch (e) {
    res.status(500).send(e.message);//internal server error
  }
});


// POST items

itemsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item: BaseItem = req.body; 

    const newItem = await ItemService.create(item); //declaring newItem and using ItemService.create function to make it using BaseItem

    res.status(201).json(newItem);//response 201 means successful creation of a resource
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// PUT items/:id


itemsRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const itemUpdate: Item = req.body; //declare itemUpdate as Item so that updated item can be recognized as same type???

    const existingItem: Item = await ItemService.find(id); //declare existingItem as item and use the ItemService.find function to find id

    if (existingItem) {
      const updatedItem = await ItemService.update(id, itemUpdate); // function response to finding id - update it
      return res.status(200).json(updatedItem); //send 200 okay response
    }

    const newItem = await ItemService.create(itemUpdate);

    res.status(201).json(newItem); //201 response for successful new creation of resource
  } catch (e) {
    res.status(500).send(e.message);
  }
});


// DELETE items/:id

itemsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await ItemService.remove(id);

    res.sendStatus(204); //no content successful response. confirms that item is deleted
  } catch (e) {
    res.status(500).send(e.message);
  }
});