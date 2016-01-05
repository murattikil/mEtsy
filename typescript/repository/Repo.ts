class Repo {
  teams: TeamsRepo;
  discussions: DiscussionsRepo;
  listings: ListingsRepo;
  tasks: TasksRepo;
  faves: FavesRepo;

  constructor() {
    this.teams = new TeamsRepo();
    this.discussions = new DiscussionsRepo();
    this.listings = new ListingsRepo();
    this.tasks = new TasksRepo();
    this.faves = new FavesRepo();
  }
}
