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
      if (all.length > 0) {
        return all[0];
      }
      else {
        return null;
      }
    });
  }

  insertTest(): Promise<void> {
    let d: DiscussionDTO = {} as DiscussionDTO;
    d.id = Utils.newId();
    d.url = "https://www.etsy.com/teams/20553/a-promotion-commotion/discuss/17250904/?ref=team_page";
    d.wePosted = 0;

    let t: TaskDTO = {} as TaskDTO;
    t.id = Utils.newId();
    t.type = ETaskType.Favathon;
    t.discussion = d;
    t.status = ETaskStatus.NotStarted;
    t.dateCreated = moment();
    t.dateCompleted = null;
    t.dateModified = null;


    return this.saveById(t.id, t);
  }

  // getUndone(since: moment.Moment): Promise<DiscussionDTO[]> {
  //   return this.getAll().then((discussions) => {
  //     return _.where(discussions, (d: DiscussionDTO) => {
  //       return d.isDone == false && since.isBefore(d.dateStarted);
  //     });
  //   });
  // }
}
