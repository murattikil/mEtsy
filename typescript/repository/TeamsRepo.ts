class TeamsRepo extends BaseRepo {
  getAll(): Promise<Array<TeamDTO>> {
    return new Promise<TeamDTO[]>((resolve, reject) => {
      this.local.get("teams", (res) => {
        let teams: Array<TeamDTO> = [];
        if (res["teams"]) {
          teams = JSON.parse(res["teams"]);
        }
        console.log("Teams are:", teams);
        resolve(teams);
      });
    });
  }

  getById(id: string): Promise<TeamDTO> {
    return this.getAll().then((teams) => {
      return _.find(teams, (t) => {
        t.id == id;
      })
    });
  }
}
