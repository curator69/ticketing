import { Message } from "node-nats-streaming";
import {
  Listener,
  Subjects,
  TicketCreatedEvent,
} from "@curator-ticketing/common";
import { Ticket } from "../../models/ticket";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = "orders-service";

  onMessage(data: TicketCreatedEvent["data"], msg: Message): void {}
}
