import { Ref } from "vue";

declare module "@/share/hooks/use-request" {
  export type BaseRequestOptions<T> = {
    defaultValue?: T;
  };

  export type RequestOptions<T> = {
    needToken?: boolean;
    baseUrl?: string;
    url: (() => string) | string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    timeout?: number;
    headers?: (() => Record<string, any>) | Record<string, any>;
    data?: (() => Record<string, any>) | Record<string, any>;
    preHandler?: (data: any) => T;
    showLoading?: boolean;
    loadingText?: string;
    showError?: boolean;
    beforeError?: (error: Error) => void;
  };

  export interface RequestResult<T> {
    data: Ref<T>;
    loading: Ref<boolean>;
    fetch: (options?: RequestOptions<T>) => Promise<T>;
    error: Ref<any>;
  }

  export function useRequest<T = any>(
    options: BaseRequestOptions<T> & RequestOptions<T>
  ): RequestResult<T>;
}
