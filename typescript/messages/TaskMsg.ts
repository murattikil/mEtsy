class TaskMsg<T> extends BaseMsg {
  type: ETaskMsgType;
  payload: ITaskMsgPayload<T>;

  constructor(type: ETaskMsgType, payload: ITaskMsgPayload<T>) {
    super();
  }
}

interface ITaskMsgPayload<T> {
  dto: T,
  actionId : string
}

enum ETaskMsgType {
  ContinueFavathon
}
