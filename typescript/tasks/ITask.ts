interface ITask<T> {
  id: string,
  continue: () => Promise<boolean>,
  status: ETaskStatus,
  dto: T,
  type: string
}

enum ETaskStatus {
  InProgress,
  DoneForNow,
  DoneForever
}
