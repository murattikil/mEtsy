class Task {
  dto: TaskDTO;
  repo = new Repo();

  constructor(dto: TaskDTO) {
    this.dto = dto;
  }

  continue() {
    switch (this.dto.status) {
      case ETaskStatus.NotStarted:
      case ETaskStatus.InProgress:
        this.do();

        break;


      case ETaskStatus.DoneForNow:
        if (this.canContinueNow()) {
          this.dto.status = ETaskStatus.InProgress;
        }
        break;

      case ETaskStatus.DoneForever:
        this.repo.tasks.removeById(this.dto.id).then(() => {
          return this.dto.status;
        });
        break;
    }
  }

  private do(): Promise<boolean> {
    this.dto.status = ETaskStatus.InProgress;
    return this.repo.tasks.saveById(this.dto.id, this.dto).then(() => {
      switch (this.dto.type) {
        case ETaskType.Favathon:
          debugger
          let faver = new FavathonDiscussionFaver(this.dto);
          return faver.do().then((successfullyFavedPage:boolean) => {
            if (successfullyFavedPage) {
              if (faver.isLastPage()) {
                //successfullyFavedPage == true AND isLastPage == true
                if (this.dto.discussion.wePosted == 0) {
                  //we haven't posted yet
                  this.dto.discussion.wePosted = 1;
                  this.dto.dateModified = moment();
                  this.dto.status = ETaskStatus.DoneForNow;
                  return this.repo.tasks.saveById(this.dto.id, this.dto).then(() => {
                    faver.submitMyPost();
                    return true;
                  });
                }
                else {
                  if (!faver.getDiscussionCreationMoment().isSame(moment(), "day")) {
                    //isLastPage == true AND discussion is from yesterday - we can close the task
                    this.dto.dateModified = this.dto.dateCompleted = moment();
                    this.dto.status = ETaskStatus.DoneForever;
                  }
                  else {
                    //isLastPage == true, but the discussion is still from today, we need to wait and rerun task
                    this.dto.dateModified = moment();
                    this.dto.status = ETaskStatus.DoneForNow;
                  }
                }
                return this.repo.tasks.saveById(this.dto.id, this.dto).then(() => {
                  return true;
                });
                //closing isLastPage == true
              }
              else {
                //not last page, and we faver the this page completely, then go to next page
                this.dto.status = ETaskStatus.InProgress;
                this.dto.dateModified = moment();
                return this.repo.tasks.saveById(this.dto.id, this.dto).then(() => {
                  faver.goNextPage();
                  return true;
                });
              }
              //closing successfullyFavedPage == true
            }
            else {
              //page was not faved successfully
              this.dto.status = ETaskStatus.DoneForNow;
              this.dto.dateModified = moment();
              return this.repo.tasks.saveById(this.dto.id, this.dto).then(() => {
                return true;
              });
            }
          });

        case ETaskType.Other:
          return Promise.resolve(true);
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
