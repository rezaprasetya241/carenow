import { useEffect, useRef, useState } from "react";

interface Props {
  data: {
    id: number;
    name: string;
  }[];
  placeholder?: string;
  value?: string;
}

const MultipleDropdownComponent = ({ data, placeholder }: Props) => {
  const [show, setShow] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative" onClick={() => setShow(!show)}>
        <input
          name="treatments"
          id="treatments"
          type="text"
          readOnly
          value={selectedItems.join(", ")}
          //   value={value}
          placeholder={placeholder}
          className="border p-2 w-full cursor-pointer"
        />
        <svg
          className="w-2.5 h-2.5 ms-3 absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </div>
      {show && (
        <div className="absolute bg-white border w-full z-10 mt-1">
          <ul className="list-none p-2">
            {data?.length ? (
              data?.map((item) => (
                <li
                  onClick={() => handleItemClick(item.name)}
                  key={item.id}
                  className={`cursor-pointer p-2 ${
                    selectedItems.includes(item.name)
                      ? "bg-blue-500 text-white"
                      : ""
                  }`}
                >
                  {item.name}
                </li>
              ))
            ) : (
              <div className="text-center">
                <p>Data is empty</p>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultipleDropdownComponent;
