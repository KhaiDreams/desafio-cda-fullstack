import { useToast } from "@chakra-ui/react";
import { LogoutApi } from "../../../../services/logout/logout.service";
import { IoMdLogOut } from "react-icons/io";
import { useUser } from "../../../../contexts/context-user/context-user";

export const Logout = () => {
  const toast = useToast();
  const { setUser } = useUser();
  const handleLogout = async () => {
    try {
      const { status, data, error } = await LogoutApi();
      if (status !== 200) {
        throw new Error(error || data?.message || "Erro desconhecido");
      }
      setUser(null);

      return toast({
        title: "Usuário deslogado.",
        description: data?.message || error,
        status: "success",
        duration: 3500,
        variant: "left-accent",
        position: "top-right",
        isClosable: true,
      });
    } catch (error: any) {
      return toast({
        title: "Erro ao deslogar usuário.",
        description: error.message,
        status: "error",
        duration: 3500,
        variant: "left-accent",
        position: "top-right",
        isClosable: true,
      });
    }
  };
  return (
    <button
      className="p-2 rounded-full hover:bg-white/30 hover:text-[--color-one] duration-300 ease-linear"
      onClick={handleLogout}
    >
      <IoMdLogOut />
    </button>
  );
};
