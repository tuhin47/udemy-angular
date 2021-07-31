export class CounterService {
  count: number = 0;

  countActions(action: string) {
    console.log(action + "=>" + (++this.count));
  }
}
