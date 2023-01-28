import useDebounceEffect from "@/hooks/useDebounceEffect";
import { useRouter } from "next/router";
import { FC, useEffect, useId, useState } from "react";
import { FaSearch } from "react-icons/fa";

interface OwnProps {
  prefix?: string;
}

type Props = OwnProps;

const SearchInput: FC<Props> = (props) => {
  const key = props.prefix ? `${props.prefix}-q` : "q";
  const id = useId();

  const router = useRouter();

  const [query, setQuery] = useState(router.query[key] || "");

  useEffect(() => {
    setQuery(router.query[key] || "");
  }, [router.query[key]]);

  useDebounceEffect(() => {
    if (typeof query === "string" && /\w{2}/i.test(query)) {
      router.push({ query: { ...router.query, [key]: query } });
    } else {
      const { [key]: _, ...rest } = router.query;

      router.push({ query: rest });
    }
  }, [query]);

  return (
    <div className="relative rounded-md shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <FaSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
        value={query}
        defaultValue={router.query[key] || ""}
        type="search"
        id={`${key}${id}-search`}
        className="block w-full h-10 rounded-md border-gray-300 pl-10 sm:text-sm focus:outline-none"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchInput;
