import { useState, useEffect, useMemo } from "react";
import supabase from "../supabase/supabaseClient";

const useSupabaseFetch = (table, options = {}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const memoOptions = useMemo(() => options, [options?.page, options?.limit, options?.filter]);


    const fetchData = async () => {
        setLoading(true);
        setError(null);

        // If no table is provided, don't attempt to fetch — return empty stable state.
        if (!table) {
            setData([]);
            setLoading(false);
            setError(null);
            return;
        }

        try {
            let query = supabase.from(table).select(options.select || "*");

            // Optional filters
            if (options.filter) {
                // example: { column: 'category_id', operator: 'eq', value: 3 }
                const { column, operator, value } = options.filter;
                query = query.filter(column, operator, value);
            }

            // Optional ordering
            if (options.orderBy) {
                query = query.order(options.orderBy, { ascending: options.ascending ?? true });
            }

            // Pagination
            // NOTE: when requesting random results we avoid applying server-side limit/range
            // so we can shuffle the full result set client-side and then slice to the desired limit.
            if (!options.random) {
                if (options.page && options.limit) {
                    const from = (options.page - 1) * options.limit;
                    const to = from + options.limit - 1;
                    query = query.range(from, to);
                } else if (options.limit) {
                    query = query.limit(options.limit);
                }
            }

            // Handle single row
            if (options.single) {
                query = query.single();
            }

            // Fetch
            const { data, error } = options.single
                ? await query.single() // only one record
                : await query;

            if (error) throw error;

            // If randomization is requested, shuffle client-side and slice to limit (if provided).
            let resultData = data || [];
            if (options.random && Array.isArray(resultData)) {
                // Fisher-Yates shuffle
                const shuffled = [...resultData];
                for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }
                resultData = typeof options.limit === 'number' ? shuffled.slice(0, options.limit) : shuffled;
            }

            setData(resultData);
        } catch (err) {
            console.error("Supabase fetch error:", err);
            setError(err.message || "Error fetching data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!table) return; // don't run when table is falsy
        fetchData();
    }, [table, options.page, options.limit, options.filter?.value]);

    return { data, loading, error, refetch: fetchData };
};

export default useSupabaseFetch;
