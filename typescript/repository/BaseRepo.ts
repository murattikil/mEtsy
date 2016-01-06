class BaseRepo<T> {
  protected local = chrome.storage.local;
  protected sync = chrome.storage.sync;

  constructor(private collectionName: string) {

  }

  getAll(): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
      let dflt = {};
      dflt[this.collectionName] = "[]";
      this.local.get(dflt, (result: any) => {
        let parsedArray = JSON.parse(result[this.collectionName]);
        console.log("[BaseRepo]: Retrieved all", this.collectionName, "(len:" + parsedArray.length + ") are:", parsedArray);
        resolve(parsedArray as T[]);
      })
    });
  }
  getById(id: string): Promise<T> {
    return this.getAll().then((all) => {
      return _.find(all, (item: any) => {
        item.id == id;
      });
    });
  }

  saveAll(all: T[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let save = {};
      save[this.collectionName] = all;
      save[this.collectionName] = JSON.stringify(save[this.collectionName], null, 4);
      this.local.set(save, () => {
        if (chrome.runtime.lastError) {
          console.log("[BaseRepo]: Error in saveAll:", chrome.runtime.lastError);
        }
        console.log("[BaseRepo]: Saved all", this.collectionName, "(len:" + all.length + ") are:", all);
        resolve();
      });
    });
  }

  saveById(id: string, dto: T): Promise<void> {
    return this.getAll().then((all) => {
      //console.log("[BaseRepo]: SaveById: Before save:", all);
      var exists = _.some(all, (item: any) => {
        return item.id == id;
      });
      if (exists) {
        _.each(all, (item: any) => {
          if (item.id == id) {
            item = dto;
          }
        });
      }
      else {
        all.push(dto);
      }
      return this.saveAll(all);
    });
  }

  removeById(id: string): Promise<void> {
    return this.getAll().then((all) => {
      all = _.filter(all, (item: any) => {
        return item.id != id;
      })
      return this.saveAll(all);
    });
  }
}
