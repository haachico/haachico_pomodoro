import { useEffect, useRef } from "react";
import "./Dropdown.css";
import { capitaliseHeading } from "../../utils";

type DropdownProps = {
  label: string;
  onToggle: () => void;
  isOpen: boolean;
  options: string[];
  selectOption: (option: string) => void;
  selectedOption: string;
  normalisedStatus?: (status: string) => string;
  source?: string;
};

const Dropdown: React.FC<DropdownProps> = ({
  label,
  onToggle,
  isOpen,
  options,
  selectOption,
  selectedOption,
  source,
  // normalisedStatus,
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

  // const normalised =
  //   normalisedStatus || ((status: string) => status.toLowerCase());

  return (
    <div
      ref={dropdownRef}
      className={`dropdown-mainContainer ${
        source === "viewAll" ? "viewAll" : "createTask"
      }`}
      onClick={onToggle}
      style={{
        cursor: "pointer",
      }}
    >
      <div>
        <h4>
          {selectedOption !== ""
            ? `${capitaliseHeading(selectedOption)}`
            : `Select ${label}`}
        </h4>
      </div>
      {isOpen && (
        <div
          className="drop-down"
          style={{
            width:
              source === "viewAll"
                ? "95%"
                : source === "createTask"
                ? "97%"
                : "100%",
          }}
        >
          {options.map((option) => (
            <p
              key={option}
              onClick={() => {
                selectOption(option);
              }}
              style={{
                border:
                  label === "Status"
                    ? option.toLowerCase() === selectedOption.toLowerCase()
                      ? "1px solid #ffffff"
                      : "none"
                    : label === "Priority"
                    ? option.toLowerCase() === selectedOption.toLowerCase()
                      ? "1px solid #ffffff"
                      : "none"
                    : label === "Category"
                    ? option.toLowerCase() === selectedOption.toLowerCase()
                      ? "1px solid #ffffff"
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
