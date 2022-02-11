export class IDSupplier {
  value = 0;

  setStartingValue(value) {
    this.value = value;
  }

  getID() {
    return this.value++;
  }

  reset() {
    this.value = 0;
  }
}