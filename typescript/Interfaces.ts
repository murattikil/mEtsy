interface IRuntimeMessage {
  type: IRuntimeMessageType;
  payload: any;
}



interface INext {
  func(object: any): void,
  parameter: any;
}
