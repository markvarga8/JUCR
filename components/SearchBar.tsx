import { Fragment, useState, useMemo, ChangeEvent, useRef } from "react";
import debounce from "lodash/debounce";
import omitBy from "lodash/omitBy";
import isEmpty from "lodash/isEmpty";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import cn from "classnames";
import { FaCertificate, FaGlobeAmericas, FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";
import SearchInput from "./form/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setSearchBarOpen } from "@/store/searchBar";

const items = [{ id: 1, name: "Workflow Inc.", category: "Clients", url: "#" }];

export default function Example() {
  const router = useRouter();
  const searchBarOpen = useSelector(
    (state: RootState) => state.searchBar.searchBarOpen
  );
  const dispatch = useDispatch();
  const searchInput = useRef<HTMLInputElement>(null);
  const debouncedEventHandler = useMemo(
    () =>
      debounce((event: ChangeEvent<HTMLInputElement>) => {
        router.push(
          {
            query: omitBy(
              {
                ...router.query,
                q: event.target.value,
                page: undefined,
              },
              isEmpty
            ),
          },
          undefined,
          { shallow: true }
        );
      }, 300),
    [router]
  );

  /////////
  const [query, setQuery] = useState("");

  const [open, setOpen] = useState(true);

  const filteredItems =
    query === ""
      ? []
      : items.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });

  const groups = filteredItems.reduce((groups, item) => {
    return {
      ...groups,
      [item.category]: [...(groups[item.category] || []), item],
    };
  }, {});

  return (
    <Transition.Root
      show={searchBarOpen}
      as={Fragment}
      afterLeave={() => setQuery("")}
      appear
    >
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => dispatch(setSearchBarOpen(false))}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox onChange={(item) => (window.location = item.url)}>
                <div className="relative">
                  <SearchInput
                    // @ts-ignore:next-line
                    onChange={debouncedEventHandler}
                    ref={searchInput}
                    defaultValue={router.query.q}
                  />
                </div>

                {query === "" && (
                  <div className="border-t border-gray-100 py-14 px-6 text-center text-sm sm:px-14">
                    <FaGlobeAmericas
                      className="mx-auto h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                    <p className="mt-4 font-semibold text-gray-900">
                      Search for clients and projects
                    </p>
                    <p className="mt-2 text-gray-500">
                      Quickly access clients and projects by running a global
                      search.
                    </p>
                  </div>
                )}

                {filteredItems.length > 0 && (
                  <Combobox.Options
                    static
                    className="max-h-80 scroll-pt-11 scroll-pb-2 space-y-2 overflow-y-auto pb-2"
                  >
                    {Object.entries(groups).map(([category, items]) => (
                      <li key={category}>
                        <h2 className="bg-gray-100 py-2.5 px-4 text-xs font-semibold text-gray-900">
                          {category}
                        </h2>
                        <ul className="mt-2 text-sm text-gray-800">
                          {items.map((item) => (
                            <Combobox.Option
                              key={item.id}
                              value={item}
                              className={({ active }) =>
                                cn(
                                  "cursor-default select-none px-4 py-2",
                                  active && "bg-indigo-600 text-white"
                                )
                              }
                            >
                              {item.name}
                            </Combobox.Option>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </Combobox.Options>
                )}

                {query !== "" && filteredItems.length === 0 && (
                  <div className="border-t border-gray-100 py-14 px-6 text-center text-sm sm:px-14">
                    <FaCertificate
                      className="mx-auto h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                    <p className="mt-4 font-semibold text-gray-900">
                      No results found
                    </p>
                    <p className="mt-2 text-gray-500">
                      We couldn’t find anything with that term. Please try
                      again.
                    </p>
                  </div>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
