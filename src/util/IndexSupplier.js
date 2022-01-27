export class IndexSupplier {
  static startingIndex = 0;

  static nextIndex() {
    return ++this.startingIndex;
  }

  static reset() {
    this.startingIndex = 0;
  }

}