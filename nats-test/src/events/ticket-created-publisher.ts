import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@curator-ticketing/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
