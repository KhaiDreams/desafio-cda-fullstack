import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { theme } from "../../ui/theme/theme";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, UseFormGetValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputsEdit, SchemaEdit } from "./types/edit-profile.type";
import { useUser } from "../../../contexts/context-user/context-user";
import { UploadImage } from "../../../services/firebase/firebase";
import { UpdateUserSendApi } from "../../../services/user/update/send-code/update-user-send.service";
import { SendCodeEditProfile } from "./send-code/send-code";
import { ConfirmCode } from "./confirm-code/confirm-code";
import { UpdateUserCancelApi } from "../../../services/user/update/cancel/cancel-update.service";
import { Loading } from "../../loading/loading";

const isChanged = (
  getValues: UseFormGetValues<any>,
  user: any,
  selectedImage: string
): boolean => {
  const currentValues = getValues();
  return (
    (currentValues.email && currentValues.email.length > 0) !== user?.email ||
    currentValues.username !== user?.username ||
    currentValues.fullname !== user?.fullname ||
    selectedImage !== user.avatar
  );
};

export const EditProfile = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: any;
}) => {
  const { user, setLoading } = useUser();
  const toast = useToast();
  const [wantBack, setWantBack] = useState<boolean>(false);
  const [confirmCode, setConfirmCode] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>(
    user?.avatar || ""
  );

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<InputsEdit>({
    resolver: yupResolver(SchemaEdit),
  });

  const checkIfChanged = () => {
    return isChanged(getValues, user, selectedImage);
  };

  const onSubmitSendCode: SubmitHandler<InputsEdit> = async ({
    file,
    email,
    fullname,
    username,
  }) => {
    try {
      setLoading(true);

      if (!checkIfChanged()) {
        throw new Error("Você precisa alterar algum campo.");
      }

      if (file?.[0]) {
        let url = await UploadImage(file!);
        setSelectedImage(url);
      }

      const { status, error, data } = await UpdateUserSendApi({
        email,
        username,
        fullname,
        avatar: selectedImage,
      });

      if (status !== 201) {
        throw new Error(data?.message || error || "Erro desconhecido");
      }

      setConfirmCode(true);

      toast({
        title: "Código enviado com sucesso.",
        description: "Verifique o código no seu email!",
        status: "success",
        duration: 3500,
        variant: "left-accent",
        position: "top-right",
        isClosable: true,
      });
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

  const toggleProfile = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const closeModal = async () => {
    if (checkIfChanged() && !wantBack && !confirmCode) {
      setWantBack(true);
      toast({
        title: "Formulário em progresso!",
        description: "Suas mudanças vão sumir se continuar.",
        status: "warning",
        duration: 3500,
        variant: "left-accent",
        position: "top-right",
        isClosable: true,
      });
      return;
    }

    await UpdateUserCancelApi();
    setWantBack(false);
    setConfirmCode(false);
    setSelectedImage(user?.avatar || "");
    setLoading(false);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
      <ModalOverlay
        backdropFilter="saturate(150%) blur(4px)"
        backdropInvert="50%"
        backdropBlur="10px"
      />
      <ModalContent
        bg={theme.colors.bg_secondary}
        borderRadius="6px"
        margin="0 10px"
      >
        <ModalBody borderRadius="6px" padding="0" position={"relative"}>
          <Loading />
          {confirmCode ? (
            <ConfirmCode onClose={closeModal} />
          ) : (
            <SendCodeEditProfile
              errors={errors}
              register={register}
              handleSubmit={handleSubmit}
              onSubmitSendCode={onSubmitSendCode}
              toggleProfile={toggleProfile}
              selectedImage={selectedImage}
              isChanged={checkIfChanged}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
