export type ActionError = { error: string };
export type ServerActionResponse<T = {}> = T | ActionError | undefined;

export function isActionError(error: any): error is ActionError {
  return error && "error" in error && error.error;
}