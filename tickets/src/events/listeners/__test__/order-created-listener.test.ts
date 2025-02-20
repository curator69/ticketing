import { OrderCreatedEvent, OrderStatus } from "@curator-ticketing/common";
import { Ticket } from "../../../models/Ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCreatedListener } from "../order-created-listener";
import mongoose from "mongoose";

const setup = async () => {
  // create an instance of the listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  // create and save a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 99,
    userId: "asdf",
  });

  await ticket.save();

  // create the fake data event
  const data: OrderCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: "asdf",
    expiresAt: "asdf",
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};
