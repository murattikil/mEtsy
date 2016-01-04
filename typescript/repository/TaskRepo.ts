class TasksRepo extends BaseRepo<TaskDTO> {

  constructor() {
    super("tasks");
  }

  getAll(since?: moment.Moment): Promise<TaskDTO[]> {
    if (since) {
      return super.getAll().then((result) => {
        return _.filter(result, (l) => {
          return l.dateCreated.isAfter(since);
        });
      });
    }
    else {
      return super.getAll();
    }
  }

  getFirst(): Promise<TaskDTO> {
    return super.getAll().then((all) => {
      if (Object.keys(all).length > 0) {
        return all[Object.keys(all)[0]];
      }
      else {
        return null;
      }
    });
  }

}
