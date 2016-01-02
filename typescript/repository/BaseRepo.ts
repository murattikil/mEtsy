class BaseRepo<T> {
  protected local = chrome.storage.local;
  protected sync = chrome.storage.sync;

  constructor(private collectionName: string) {

  }

  protected getAll(): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {

      let dflt = {};
      dflt[this.collectionName] = [];

      this.local.get(dflt, (result) => {
        console.log("[BaseRepo]: All", this.collectionName, "are:", result);
        resolve(result[this.collectionName] as T[]);
      })
    });
  }

  protected getById(id: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      return this.getAll().then((all) => {
        return all[id];
      });
    });
  }

  protected saveAll(collection: T[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let save = {};
      save[this.collectionName] = collection;

      this.local.set(save, () => {
        if (chrome.runtime.lastError) {
          console.log("[BaseRepo]: Error in saveAll:", chrome.runtime.lastError);
        }
        resolve();
      })
    });
  }

  protected saveById(id: string, dto: T): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.getAll().then((all) => {
        dto["id"] = id;
        all[id] = dto;
        return this.saveAll(all);
      })
    });
  }
}
