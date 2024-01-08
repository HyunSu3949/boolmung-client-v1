import React, { useState, forwardRef } from "react";
import { PolymorphicComponentProps, PolymorphicRef } from "../types/types";

type _ButtonProps = {
  fontSize: number;
  color: string;
  bgColor: string;
  hoverBgColor: string;
  text: string;
};

export type ButtonProps<T extends React.ElementType> =
  PolymorphicComponentProps<T, _ButtonProps>;

type ButtonComponent = <T extends React.ElementType = "button">(
  props: ButtonProps<T>
) => React.ReactElement | null;

export const Button: ButtonComponent = forwardRef(
  <T extends React.ElementType = "span">(
    { as, fontSize, color, bgColor, hoverBgColor, ...props }: ButtonProps<T>,
    ref: PolymorphicRef<T>["ref"]
  ) => {
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };
    const Element = as || "button";
    // size, color, backgroundColor를 style로 적용
    return (
      <Element
        ref={ref}
        {...props}
        style={{
          fontSize,
          color,
          backgroundColor: isHovering ? bgColor : hoverBgColor,
          cursor: isHovering ? "pointer" : "none",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    );
  }
);
