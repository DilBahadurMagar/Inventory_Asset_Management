function delay(ms: number = 400): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function wrap<T>(data: T): Promise<T> {
  await delay();
  return data;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number = 400) {
    super(message);
    this.status = status;
  }
}
