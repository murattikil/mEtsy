class TeamDTO {
  id: string;
  url: string;
  type: ETeamType;
  discussions: DiscussionDTO;

  constructor(id: string, url: string, type: ETeamType, discussions: DiscussionDTO) {
    this.id = id;
    this.url = url;
    this.type = type;
    this.discussions = discussions;
  }
}
