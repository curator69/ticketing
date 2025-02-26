import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from "@curator-ticketing/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
