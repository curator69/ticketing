import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from "@curator-ticketing/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
