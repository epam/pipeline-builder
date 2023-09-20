export function measure<T>(
  description: string,
  action: () => T,
  measureTime: boolean = true,
): T {
  if (!measureTime) {
    return action();
  }
  console.time(description);
  const result = action();
  console.timeEnd(description);
  return result;
}

export async function measureAsync<T>(
  description: string,
  action: () => Promise<T>,
  measureTime: boolean = true,
): Promise<T> {
  if (!measureTime) {
    return action();
  }
  console.time(description);
  try {
    return await action();
  } finally {
    console.timeEnd(description);
  }
}
