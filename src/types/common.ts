export interface ApiStatus {
  loading: boolean;
  error: string | null;
}

// lấy một hoặc nhieu key trong object chuyển sang ?:
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;
