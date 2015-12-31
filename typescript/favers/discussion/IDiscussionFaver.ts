interface IDiscussionFaver {
  doFaving(): void;

  //events
  doneForNow(callback: () => void): void;
  itemFaved(callback: () => void): void;
  shopFaved(callback: () => void): void;
}
