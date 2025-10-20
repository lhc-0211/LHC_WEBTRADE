export interface ApiStatus {
  loading: boolean;
  error: string | null;
}

// lấy một hoặc nhieu key trong object chuyển sang ?:
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};
