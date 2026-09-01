export type ActionSuccess<T> = { success: true; data: T };
export type ActionFailure = { success: false; error: string };
export type ActionResult<T> = ActionSuccess<T> | ActionFailure;

export async function safeAction<T>(
  fn: () => Promise<T>,
): Promise<ActionResult<T>> {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return { success: false, error: message };
  }
}
