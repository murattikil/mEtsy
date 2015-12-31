class DiscussionDTO {
  id: string
  url: string;
  isDone: boolean;
  page: number;
  lastPost: IPost;
  dateStarted: moment.Moment;
  dateModified: moment.Moment;

  constructor(id: string, url: string, isDone: boolean, page: number, lastPost: IPost, dateStarted: moment.Moment, dateModified: moment.Moment) {
    this.url = url;
    this.isDone = isDone;
    this.page = page;
    this.lastPost = lastPost;
    this.dateStarted = dateStarted;
    this.dateModified = dateModified;
  }
}
