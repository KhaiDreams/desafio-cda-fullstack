import { Button } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { theme } from "../../theme/theme";

export const ButtonDefault = ({
  isDisabled,
  Icon,
  content,
  onclick,
}: {
  isDisabled: boolean;
  Icon: IconType;
  content: string;
  onclick?: any;
}) => {
  return (
    <Button
      rightIcon={
        <Icon className="group-hover:translate-x-5 duration-300 ease-linear" />
      }
      onClick={onclick}
      variant="solid"
      type="submit"
      size="lg"
      isDisabled={isDisabled}
      bg={theme.colors.color_primary}
      color={theme.colors.bg_primary}
      _hover={{
        bg: theme.colors.color_secondary,
      }}
      className="group shadow-snipped w-full"
      fontSize={"19px"}
    >
      {content}
    </Button>
  );
};
