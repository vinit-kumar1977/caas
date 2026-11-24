export class TestCleanup {
  private readonly cleanups: Array<() => void | Promise<void>> = [];

  add(cleanup: () => void | Promise<void>): void {
    this.cleanups.push(cleanup);
  }

  async run(): Promise<void> {
    for (const cleanup of [...this.cleanups].reverse()) {
      await cleanup();
    }
    this.cleanups.length = 0;
  }
}
