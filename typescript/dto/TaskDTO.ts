class TaskDTO {
  id: string;
  dtoId: string;
  discussion: DiscussionDTO;
  type: ETaskType;
  status: ETaskStatus;

  dateCreated: moment.Moment;
  dateCompleted: moment.Moment;
  dateModified: moment.Moment;

  constructor(id: string, dateCreated: moment.Moment, dateCompleted: moment.Moment, dateModified: moment.Moment, dtoId: string, type: ETaskType, status : ETaskStatus) {
    this.id = id;
    this.dateCreated = dateCreated;
    this.dateCompleted = dateCompleted;
    this.dateModified = dateModified;
    this.dtoId = dtoId;
    this.type = type;
    this.status = status;
  }

  static deserialize(json: string): TaskDTO {
    var o = JSON.parse(json) as TaskDTO;

    o.dateCreated = moment(o.dateCreated);
    o.dateCompleted = moment(o.dateCompleted);
    o.dateModified = moment(o.dateModified);

    return o;
  }
}
