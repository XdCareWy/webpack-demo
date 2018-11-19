import { useEffect, useRef, useState } from 'react';

const InitialAsyncState = {
  loading: true,
  result: undefined,
  error: undefined,
};

const defaultSetLoading = asyncState => InitialAsyncState;
const defaultSetResult = (result, asyncState) => ({
  loading: false,
  result: result,
  error: undefined,
});
const defaultSetError = (error, asyncState) => ({
  loading: false,
  result: undefined,
  error: error,
});

const DefaultOptions = {
  setLoading: defaultSetLoading,
  setResult: defaultSetResult,
  setError: defaultSetError,
};
const normalizeOptions = options => ({
  ...DefaultOptions,
  ...options,
});

const useAsyncState = options => {
  const [value, setValue] = useState(InitialAsyncState);
  return {
    value,
    setLoading: () => setValue(options.setLoading(value)),
    setResult: result => setValue(options.setResult(result, value)),
    setError: error => setValue(options.setError(error, value)),
  };
};

export const useAsync = (asyncFunction, params = []) => {
  const AsyncState = useAsyncState(DefaultOptions);

  const executeAsyncOperation = () => {
    const promise = asyncFunction(params);
    promise.then(
      result => {
        AsyncState.setResult(result);
      },
      error => {
        AsyncState.setError(error);
      }
    );
  };

  useEffect(() => {
    executeAsyncOperation();
  }, params);

  return {
    ...AsyncState.value,
    execute: () => executeAsyncOperation(),
  };
};
