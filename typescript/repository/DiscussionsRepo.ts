/// <reference path="../../typings/lodash/lodash.d.ts"/>

class DiscussionsRepo extends BaseRepo {
  getAll(): Promise<Array<DiscussionDTO>> {
    return new Promise<DiscussionDTO[]>((resolve, reject) => {
      this.local.get("discussions", (res) => {
        let discussions: Array<DiscussionDTO> = [];
        if (res["discussions"]) {
          discussions = JSON.parse(res["discussions"]);
        }
        console.log("Discussions are:", discussions);
        resolve(discussions);
      });
    });
  }

  getById(id: string): Promise<DiscussionDTO> {
    return this.getAll().then((discussions) => {
      return _.find(discussions, (t) => {
        return t.id == id;
      })
    });
  }

  getUndone(since: moment.Moment): Promise<DiscussionDTO[]> {
    return this.getAll().then((discussions) => {
      return _.where(discussions, (d: DiscussionDTO) => {
        return d.isDone == false && since.isBefore(d.dateStarted);
      });
    });
  }
}
