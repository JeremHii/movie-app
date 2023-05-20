export class DateUtils {
  static formatDate(date: Date) {
    //@ts-ignore
    const day = String(date.getDate()).padStart(2, "0");
    //@ts-ignore
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  static formatDateUS(date: Date) {
    //@ts-ignore
    const day = String(date.getDate()).padStart(2, "0");
    //@ts-ignore
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }
}
