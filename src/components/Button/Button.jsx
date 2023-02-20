import React from "react";
import styles from "./button.module.css";

function AppButton({
  label,
  onClick,
  type,
  withoutBg = false,
  className,
  prefixIcon,
  postfixIcon,
  fixWidth = false,
  disabled,
  style,
  textSmall = false,
  ...rest
}) {
  let finalClassNames = "";

  if (withoutBg) {
    finalClassNames += `${styles.btnLight} px-2`;
  } else {
    finalClassNames += `${styles.btnDark} px-2`;
  }

  if (className) {
    finalClassNames += ` ${className}`;
  }

  if(textSmall){
    finalClassNames += ` ${styles.textSmall}`;
  }

  if(fixWidth){
    finalClassNames += ` ${styles.width}`;
  }
  return (
    <button className={finalClassNames} onClick={onClick} type={type} style={style} {...rest} disabled={disabled}>
      {prefixIcon && prefixIcon}
      {label}
      {postfixIcon && postfixIcon}
    </button>
  );
}

export default AppButton;
