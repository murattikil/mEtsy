class DiscussionDTO {
  id: string
  url: string;
  lastPost: DiscussionPostDTO;
  wePosted: number;
  dateStarted: moment.Moment;

  constructor(id: string, url: string, lastPost: DiscussionPostDTO, wePosted: number, dateStarted: moment.Moment) {
    this.id = id;
    this.url = url;
    this.lastPost = lastPost;
    this.dateStarted = dateStarted;
  }

  static deserialize(json: string) {
    let o: DiscussionDTO = JSON.parse(json);

    o.dateStarted = moment(o.dateStarted);

    return 0;
  }
}
