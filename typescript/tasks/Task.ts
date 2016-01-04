class Task {
  dto: TaskDTO;
  repo = new Repo();

  constructor(dto: TaskDTO) {
    this.dto = dto;
  }

  continue() {
    switch (this.dto.status) {
      case ETaskStatus.DoneForever:
        this.repo.tasks.removeById(this.dto.id).then(() => {
          return this.dto.status;
        });
        break;

      case ETaskStatus.DoneForNow:
        if (this.canContinueNow()) {
          this.dto.status = ETaskStatus.InProgress;
        }
    }
  }

  private do() {
    this.dto.status = ETaskStatus.InProgress;
    this.repo.tasks.saveById(this.dto.id, this.dto).then(() => {
      switch (this.dto.type) {
        case ETaskType.Favathon:
          debugger
          let faver = new FavathonDiscussionFaver(this.dto.discussion);
          faver.favePage().then(() => {
            if (!faver.isLastPage()) {
              faver.goNextPage();
            }
            else if (!faver.getDiscussionCreationMoment().isSame(moment(), "day")) {
              this.dto.status = ETaskStatus.DoneForever;
            }
            if (this.dto.discussion.wePosted == 0) {
              this.dto.discussion.wePosted = this.dto.discussion.wePosted + 1;
              this.repo.tasks.saveById(this.dto.id, this.dto).then(() => {
                faver.submitMyPost();
              });
            }
            this.repo.tasks.saveById(this.dto.id, this.dto);
          });

        case ETaskType.Other:
          return true;
      }
    });
  }

  canContinueNow(): boolean {
    if (this.dto.status == ETaskStatus.DoneForNow) {
      switch (this.dto.type) {
        case ETaskType.Favathon:
          return !moment().isSame(this.dto.dateModified, "hour");
        case ETaskType.Other:
          return true;
      }
    }
  }
}
