export abstract class Event {

  public equals(vo?: Event): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }

    return JSON.stringify(this) === JSON.stringify(vo);
  }
}