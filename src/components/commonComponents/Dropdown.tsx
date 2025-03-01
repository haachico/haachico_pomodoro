import { useEffect, useRef } from "react";
import "./Dropdown.css";
import { capitaliseHeading } from "../../utils";
import dropDown from "../../assets/downArrow.svg";

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
        !dropdownRef.current.contains(e.target as Node)
      ) {
        onToggle();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  // const normalised =
  //   normalisedStatus || ((status: string) => status.toLowerCase());

  return (
    <div
      ref={dropdownRef}
      className={`dropdown-mainContainer ${
        source === "viewAll" ? "view-all" : "createTask"
      }`}
      style={{
        cursor: "pointer",
        borderRadius: isOpen ? "10px 10px 0 0" : "10px",
      }}
    >
      <div
        className="dropdown-header"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        <h4>
          {selectedOption !== ""
            ? `${capitaliseHeading(selectedOption)}`
            : `Select ${label}`}
        </h4>
        <img
          src={dropDown}
          alt="dropdown"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            filter: "invert(100%)",
          }}
        />
      </div>
      {isOpen && (
        <div
          className="drop-down"
          style={{
            width:
              source === "viewAll"
                ? "95%"
                : source === "createTask"
                ? "97.8%"
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
