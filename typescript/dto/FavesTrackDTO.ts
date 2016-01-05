class FavesTrackDTO {
  count: number;
  dateOfLast: moment.Moment;

  constructor(count: number, dateOfLast: moment.Moment) {
    this.count = count;
    this.dateOfLast = dateOfLast;
  }
}
