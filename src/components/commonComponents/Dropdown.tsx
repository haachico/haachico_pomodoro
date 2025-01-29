import { useEffect, useRef } from "react";

type DropdownProps = {
  label: string;
  onToggle: () => void;
  isOpen: boolean;
  options: string[];
  selectOption: (option: string) => void;
  selectedOption: string;
  normalisedStatus?: (status: string) => string;
};

const Dropdown: React.FC<DropdownProps> = ({
  label,
  onToggle,
  isOpen,
  options,
  selectOption,
  selectedOption,
  normalisedStatus,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        isOpen
      ) {
        onToggle();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onToggle]);

  const normalised =
    normalisedStatus || ((status: string) => status.toLowerCase());

  return (
    <div ref={dropdownRef}>
      <h4
        onClick={onToggle}
        style={{
          cursor: "pointer",
        }}
      >
        {label}
      </h4>
      {isOpen && (
        <div className="drop-down">
          {options.map((option) => (
            <p
              key={option}
              onClick={() => {
                selectOption(option);
              }}
              style={{
                border:
                  label === "Status"
                    ? normalised(option) === normalised(selectedOption)
                      ? "1px solid #000"
                      : "none"
                    : label === "Priority"
                    ? option.toLowerCase() === selectedOption.toLowerCase()
                      ? "1px solid #000"
                      : "none"
                    : label === "Category"
                    ? option.toLowerCase() === selectedOption.toLowerCase()
                      ? "1px solid #000"
                      : "none"
                    : "none",
              }}
            >
              {option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
