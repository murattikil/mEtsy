class Repo {
  teams: TeamsRepo;
  discussions: DiscussionsRepo;
  listings: ListingsRepo;

  constructor() {
    this.teams = new TeamsRepo();
    this.discussions = new DiscussionsRepo();
    this.listings = new ListingsRepo();
  }
}
