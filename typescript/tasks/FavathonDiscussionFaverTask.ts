class FavathonDiscussionFaverTask implements ITask<DiscussionDTO>{
  id: string;
  dto: DiscussionDTO;
  status: ETaskStatus;
  repo: Repo;
  type = "FavathonDiscussionFaverTask";


  constructor(id: string, dto: DiscussionDTO) {
    this.id = id;
    this.dto = dto;
    this.status = ETaskStatus.InProgress;
    this.repo = new Repo();
  }

  continue(): Promise<boolean> {
    return this.repo.discussions.getById(this.dto.id).then((dto) => {
      this.dto = dto;

      switch (this.dto.status) {
        case EDiscussionStatus.DoneForever:
          this.status = ETaskStatus.DoneForever;
          return false;

        case EDiscussionStatus.DoneForNow:
          if (moment().diff(dto.dateOfLastAction, "hours") > 4) {
            return this.sendContinueMessage();
          }
          else {
            return true;
          }

        case EDiscussionStatus.NotStarted:
          return this.sendContinueMessage();
      }
    });
  }

  reload() {
  }

  private sendContinueMessage(): boolean {
    let msg = new TaskMsg(ETaskMsgType.ContinueFavathon, <ITaskMsgPayload<DiscussionDTO>>{ dto: this.dto, actionId: this.id });
    msg.send();
    return true;
  }
}
