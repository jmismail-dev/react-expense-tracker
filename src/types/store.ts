type InitialStoreStateData<T> = T extends object
  ? {
      create: T | null;
      edit: T | null;
      get: T | null;
      list: T[] | null;
      delete: T | null;
    }
  : T extends string
  ? {
      create: string | null;
      edit: string | null;
      get: string | null;
      list: string | null;
      delete: string | null;
    }
  : {
      create: boolean;
      edit: boolean;
      get: boolean;
      list: boolean;
      delete: boolean;
    };

export type InitialStoreStateType<T> = {
  data: InitialStoreStateData<T>;
  has_error: InitialStoreStateData<boolean>;
  loading: InitialStoreStateData<boolean>;
  error: InitialStoreStateData<string>;
};
