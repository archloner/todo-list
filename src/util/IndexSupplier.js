let startingIndex = 0;

export class IndexSupplier {

  static nextIndex() {
    return startingIndex++;
  }

  static reset() {
    startingIndex = 0;
  }

}