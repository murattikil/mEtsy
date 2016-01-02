class ListingDTO {
  id: string;
  url: string;
  dateListed: moment.Moment;
  
  constructor(id: string, url: string) {
    this.id = id;
    this.url = url;
  }
}
