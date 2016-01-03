class DiscussionDTO {
  id: string
  url: string;
  status: EDiscussionDoneStatus;
  page: number;
  lastPost: IPost;
  wePosted: number;
  dateStarted: moment.Moment;
  dateOfLastAction: moment.Moment;

  constructor(id: string, url: string, status: EDiscussionDoneStatus, page: number, lastPost: IPost, wePosted: number, dateStarted: moment.Moment, dateOfLastAction: moment.Moment) {
    this.url = url;
    this.status = status;
    this.page = page;
    this.lastPost = lastPost;
    this.dateStarted = dateStarted;
    this.dateOfLastAction = dateOfLastAction;
  }
}
