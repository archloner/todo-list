export class IndexSupplier {
  static startingIndex = 0;

  // static?
  // constructor() {
  //   this.startingIndex = 0;
  // }

  // constructor(startingIndex) {
  //   this.startingIndex = startingIndex;
  // }

  static nextIndex() {
    return this.startingIndex++;
  }

  static reset() {
    this.startingIndex = 0;
  }

}