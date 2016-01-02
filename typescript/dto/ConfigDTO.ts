class ConfigDTO {
  isFirstRunEver: boolean;

  constructor(isFirstRunEver: boolean) { }

  static default(): ConfigDTO {
    return new ConfigDTO(true);
  }
}
