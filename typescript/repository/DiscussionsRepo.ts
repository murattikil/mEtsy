class DiscussionsRepo extends BaseRepo<DiscussionDTO> {

  constructor(){
    super("discussions");
  }

  getUndone(since: moment.Moment): Promise<DiscussionDTO[]> {
    return this.getAll().then((discussions) => {
      return _.where(discussions, (d: DiscussionDTO) => {
        return d.isDone == false && since.isBefore(d.dateStarted);
      });
    });
  }
}
