class Repo {
  teams: TeamsRepo;
  discussions: DiscussionsRepo;
  listings: ListingsRepo;
  tasks: TasksRepo;

  constructor() {
    this.teams = new TeamsRepo();
    this.discussions = new DiscussionsRepo();
    this.listings = new ListingsRepo();
    this.tasks = new TasksRepo();
  }
}
