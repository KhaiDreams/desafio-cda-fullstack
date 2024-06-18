import {
  HStack,
  PinInput,
  PinInputField,
  useToast,
} from "@chakra-ui/react";
import { LuArrowRight } from "react-icons/lu";
import { FormEvent, useState } from "react";
import { UpdateUserConfirmApi } from "../../../../services/user/update/confirm-code/confirm-code.service";
import { UpdateUserSendApi } from "../../../../services/user/update/send-code/update-user-send.service";
import { useUser } from "../../../../contexts/context-user/context-user";
import { ButtonDefault } from "../../../ui/button/default/button-default";

export const ConfirmCode = ({ onClose }: { onClose: any }) => {
  const [valueInput, setValueInput] = useState<string>("");
  const toast = useToast();
  const { setUser, loading, setLoading } = useUser();
  const handleChange = (value: string) => {
    setValueInput(value);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { error, status, data } = await UpdateUserConfirmApi(valueInput);
      if (status !== 200) {
        throw new Error(error || data?.message || "Erro desconhecido");
      }

      setUser((prevState: any) => ({
        ...prevState,
        username: data!.username!,
        fullname: data!.fullname!,
        email: data!.email!,
        avatar: data!.avatar!,
      }));

      toast({
        title: "Usuario atualizado!",
        description: "Seus dados foram atualizados com sucesso",
        status: "success",
        duration: 3500,
         variant: "left-accent",
            position: "top-right",
            isClosable: true,
      });
      onClose();
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar usuário!",
        description: error.message,
        status: "error",
        duration: 3500,
         variant: "left-accent",
            position: "top-right",
            isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    try {
      setLoading(true);
      const { status, error, data } = await UpdateUserSendApi({});

      if (status !== 201) {
        throw new Error(error || data?.message || "Erro desconhecido");
      }
      toast({
        title: "Código reenviado!",
        description: "Verifique seu e-mail novamente.",
        status: "error",
        duration: 3500,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar usuário!",
        description: error.message,
        status: "error",
        duration: 3500,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-between w-full max-w-96 mx-auto pb-4 pt-8 px-2"
    >
      <p
        className={`w-full max-w-96 mx-auto text-xl text-[--color-one] mb-5 uppercase max-md:text-lg font-semibold`}
      >
        What your code?
      </p>
      <HStack className="flex justify-between">
        <PinInput
          value={valueInput}
          onChange={handleChange}
          manageFocus={true}
          autoFocus
          otp
          placeholder="0"
          id="pin"
        >
          <PinInputField
            className="inputPin py-8"
            outline={"none"}
            outlineOffset={0}
            autoFocus={true}
          />
          <PinInputField
            className="inputPin py-8"
            outline={"none"}
            outlineOffset={0}
          />
          <PinInputField
            className="inputPin py-8"
            outline={"none"}
            outlineOffset={0}
          />
          <PinInputField
            className="inputPin py-8"
            outline={"none"}
            outlineOffset={0}
          />
          <PinInputField
            className="inputPin py-8"
            outline={"none"}
            outlineOffset={0}
          />
          <PinInputField
            className="inputPin py-8"
            outline={"none"}
            outlineOffset={0}
          />
        </PinInput>
      </HStack>
      <div className="uppercase text-[10px] underline text-custom-pink mt-5 cursor-pointer">
        <button onClick={resendCode}>Resend Code</button>
      </div>
      <div className="uppercase text-[10px] underline text-custom-pink mt-5 cursor-pointer">
        <button className="text-red-600" onClick={onClose}>
          cancel
        </button>
      </div>
      <div className="flex w-full justify-between py-8">
        <ButtonDefault
          Icon={LuArrowRight}
          content="CONFIRMAR"
          isDisabled={valueInput.length < 6 || loading}
        />
      </div>
    </form>
  );
};
