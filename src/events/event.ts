export abstract class EventBase {

  public equals(vo?: EventBase): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }

    return JSON.stringify(this) === JSON.stringify(vo);
  }
}