interface IRuntimeMessage {
  type: IRuntimeMessageType;
  payload: any
}

interface INext {
  func(object: any): void,
  parameter: any
}

interface IFavesTrack {
  dateOfLast: Date,
  count: number
}

interface IItemsForYou {
  lastFaved: Date
}

interface ICrawlingMode {
  lastSet: Date,
  mode: CrawlingMode
}

interface IShopItem {

}

interface IPost {
  id: string,
  url: string
}
