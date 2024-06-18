import { SubmitHandler, useForm } from "react-hook-form";
import { InputsLogin, SchemaLogin } from "./types/login-form-type";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginApi } from "../../../../services/login/login.service";
import { Button, useToast } from "@chakra-ui/react";
import { useUser } from "../../../../contexts/context-user/context-user";
import { InputDefault } from "../../../../components/ui/inputs/default/input-default";
import { InputPassword } from "../../../../components/ui/inputs/password/input-password";
import { LuArrowRight, LuLock } from "react-icons/lu";
import { theme } from "../../../../components/ui/theme/theme";
import { DecodeUser } from "../../../../utils/decode/user/decode-user";

export const LoginForm = () => {
  const toast = useToast();
  const { setUser, setLoading } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsLogin>({ resolver: yupResolver(SchemaLogin) });

  const onSubmit: SubmitHandler<InputsLogin> = async ({
    credential,
    password,
  }) => {
    try {
      setLoading(true);
      const { status, error, data } = await LoginApi({ credential, password });

      if (data?.token && status === 200) {
        const decoded = DecodeUser(data.token);
        if (decoded) {
          setUser(decoded);
          return toast({
            title: "Login bem sucedido.",
            description: "Comece a jogar e competir.",
            status: "success",
            duration: 3500,
            variant: "left-accent",
            position: "top-right",
            isClosable: true,
          });
        }
        throw new Error("Erro ao decodificar token.");
      }
      throw new Error(error || "Token não fornecido.");
    } catch (error: any) {
      return toast({
        title: "Erro ao logar usuário.",
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
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 w-full relative"
    >
      <InputDefault
        Icon={LuLock}
        placeholder="Email ou username"
        error={errors.credential?.message}
        classes="text-lg shadow-snipped"
        register={register}
        name="credential"
      />
      <div className="flex flex-col items-end">
        <InputPassword
          register={register}
          placeholder="Senha"
          error={errors.password?.message}
          classes="text-lg shadow-snipped"
          name="password"
          forgot={true}
        />
      </div>
      <Button
        rightIcon={<LuArrowRight className="group-hover:translate-x-5" />}
        variant="solid"
        type="submit"
        size="lg"
        bg={theme.colors.color_primary}
        color={theme.colors.bg_primary}
        _hover={{
          bg: theme.colors.color_secondary,
        }}
        className="group shadow-snipped"
        fontSize={"19px"}
      >
        Entrar
      </Button>
    </form>
  );
};
