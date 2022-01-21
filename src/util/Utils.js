export class Utils {
 
  static capitalize(str) {
    console.log(str, typeof str)
    const capitalizedString = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalizedString;
  }

}