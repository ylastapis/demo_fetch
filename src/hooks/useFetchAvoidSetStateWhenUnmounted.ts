import { useCallback, useEffect, useState } from 'react';

/**
 * Will fetch as soon as a dependency of the useEffect changes.
 * Prevent set state on unmounted component
 */
export const useFetchAvoidSetStateWhenUnmounted = <T>(
    uri: string
) => {
    const [data, setData] = useState<null | T>(null);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<null | any>(null);
    const [shallFetch, setShallFetch] = useState(false);
    const doRequest = useCallback(() => setShallFetch(true), []);

    useEffect(() => {
        /** create a new variable, INSIDE the useEffect, to handle cancellation **/
        let didCancel = false;

        const callRequest = () => {
            setLoading(true);
            setFetchError(null);
            setShallFetch(false);

            fetch(uri)
                .then(response => response.json())
                .then((data: T) => {
                    /** prevent setState when unmounted **/
                    if (!didCancel) {
                        setData(data);
                        setLoading(false);
                    }
                })
                .catch(e => {
                    /** prevent setState when unmounted **/
                    if (!didCancel) {
                        setFetchError(e);
                        setLoading(false);
                    }
                })
            ;
        };

        if (shallFetch) {
            callRequest();
        }

        /** when unmounted, toggle boolean to prevent setState when request call is finished **/
        return () => {
            didCancel = true;
        }
    }, [uri, shallFetch]);

    return {
        data,
        loading,
        fetchError,
        doRequest,
    };
};
