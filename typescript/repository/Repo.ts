class Repo {
  teams: TeamsRepo;
  discussions: DiscussionsRepo;

  constructor() {
    this.teams = new TeamsRepo();
    this.discussions = new DiscussionsRepo();
  }
}
