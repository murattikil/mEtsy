class ListingsRepo extends BaseRepo<ListingDTO> {

  constructor(){
    super("listings");
  }

  getAll(since?: moment.Moment): Promise<ListingDTO[]> {
    if (since) {
      return super.getAll().then( (result) => {
        return  _.filter(result, (l) => {
          return l.dateListed.isAfter(since);
        });
      });
    }
    else {
      return super.getAll();
    }
  }

  getRandom(count: number, since?: moment.Moment): Promise<ListingDTO[]> {
    return this.getAll(since).then((all) => {
      return _.sample(all, count);
    });
  }
}
