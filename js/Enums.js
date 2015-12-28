var CrawlingMode;
(function (CrawlingMode) {
    CrawlingMode[CrawlingMode["FavingItemsForYou"] = 0] = "FavingItemsForYou";
    CrawlingMode[CrawlingMode["FavingItemsILove"] = 1] = "FavingItemsILove";
    CrawlingMode[CrawlingMode["ShopsFromGroups"] = 2] = "ShopsFromGroups";
    CrawlingMode[CrawlingMode["FavingShops"] = 3] = "FavingShops";
})(CrawlingMode || (CrawlingMode = {}));
var WorkingMode;
(function (WorkingMode) {
    WorkingMode[WorkingMode["ItemsForYou"] = 0] = "ItemsForYou";
    WorkingMode[WorkingMode["ItemsILove"] = 1] = "ItemsILove";
    WorkingMode[WorkingMode["TeamFaving"] = 2] = "TeamFaving";
    WorkingMode[WorkingMode["TeamGathering"] = 3] = "TeamGathering";
})(WorkingMode || (WorkingMode = {}));
var TeamType;
(function (TeamType) {
    TeamType[TeamType["Favathon"] = 0] = "Favathon";
    TeamType[TeamType["Trendathon"] = 1] = "Trendathon";
    TeamType[TeamType["Clickathon"] = 2] = "Clickathon";
})(TeamType || (TeamType = {}));
var IRuntimeMessageType;
(function (IRuntimeMessageType) {
    IRuntimeMessageType[IRuntimeMessageType["DocumentReady"] = 0] = "DocumentReady";
    IRuntimeMessageType[IRuntimeMessageType["GoToUrl"] = 1] = "GoToUrl";
    IRuntimeMessageType[IRuntimeMessageType["TeamFaver"] = 2] = "TeamFaver";
})(IRuntimeMessageType || (IRuntimeMessageType = {}));
