import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { LuKeyRound } from "react-icons/lu";
import { theme } from "../../theme/theme";

export const InputPassword = ({
  classes,
  forgot,
  placeholder,
  error,
  register,
  name,
  disable,
  value,
}: {
  name: string;
  disable?: boolean;
  value?: string;
  forgot?: boolean;
  classes?: string;
  placeholder: string;
  error?: string;
  register: UseFormRegister<any>;
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <InputGroup flexDirection={"column"}>
      <InputLeftElement
        pointerEvents="none"
        fontSize={"20px"}
        top="4px"
        color={theme.colors.color_primary}
      >
        <LuKeyRound />
      </InputLeftElement>
      <Input
        value={value}
        disabled={disable}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        size="lg"
        focusBorderColor="color_primary"
        isInvalid={Boolean(error)}
        {...register(name)}
        className={`${classes} ${
          !error && !forgot && "mb-4"
        } w-full py-2 pl-7 pr-3 rounded-md relative bg-[--color-bg-secondary] focus:outline-[2px] duration-300 ease-linear`}
      />
      {!disable && (
        <InputRightElement
          fontSize={"20px"}
          onClick={() => setVisible(!visible)}
          cursor="pointer"
          top="4px"
        >
          {visible ? <FaRegEyeSlash /> : <FaRegEye />}
        </InputRightElement>
      )}
      <div
        className={`text-[10px] uppercase italic my-3 flex ${
          error ? "justify-between" : " justify-end"
        }`}
      >
        {error && <span>{error}</span>}
        {forgot && (
          <a
            href="/forgot-password"
            className="text-[10px] uppercase italic underline"
          >
            Esqueci a senha
          </a>
        )}
      </div>
    </InputGroup>
  );
};
