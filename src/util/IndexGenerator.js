let startingIndex = 0;

export class IndexGenerator {

  static nextIndex() {
    return startingIndex++;
  }

  static reset() {
    startingIndex = 0;
  }

}