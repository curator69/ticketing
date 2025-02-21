import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@curator-ticketing/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
