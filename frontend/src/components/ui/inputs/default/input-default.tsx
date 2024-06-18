import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";
import { theme } from "../../theme/theme";
import { IconType } from "react-icons";

export const InputDefault = ({
  classes,
  placeholder,
  error,
  register,
  name,
  Icon,
  value,
  disabled,
}: {
  name: string;
  classes?: string;
  placeholder: string;
  error?: string;
  Icon: IconType;
  value?: string;
  disabled?: boolean;
  register: UseFormRegister<any>;
}) => {
  return (
    <InputGroup flexDirection={"column"} w={"100%"}>
      <InputLeftElement
        pointerEvents="none"
        fontSize={"20px"}
        color={theme.colors.color_primary}
        top="4px"
      >
        <Icon />
      </InputLeftElement>
      <Input
        disabled={disabled}
        defaultValue={value}
        focusBorderColor="color_primary"
        isInvalid={Boolean(error)}
        placeholder={placeholder}
        size="lg"
        {...register(name)}
        className={`${classes} ${
          !error && "mb-[40px]"
        } w-full pl-7 pr-3 rounded-md relative focus:outline-[2px] duration-300 ease-linear items-center`}
      />
      {error && (
        <span className="text-[10px] uppercase italic my-3">{error}</span>
      )}
    </InputGroup>
  );
};
