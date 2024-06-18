import { LuArrowRight } from "react-icons/lu";
import { ButtonDefault } from "../default/button-default";
import { GiftEmblemApi } from "../../../../services/user/gift-emblem/gift-emblem.service";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Loading } from "../../../loading/loading";
import { theme } from "../../theme/theme";
import { useUser } from "../../../../contexts/context-user/context-user";
import { useState } from "react";
import { EmblemI, UserI } from "../../../../entities/user.entites";
import { RankingI } from "../../../../entities/ranking.entitie";

type Category = "ouro" | "prata" | "bronze";

export const ButtonGift = () => {
  const toast = useToast();
  const { setUser, user, setLoading, loading, ranking, setRanking } = useUser();
  const [emblem, setEmblem] = useState<EmblemI | null>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const onSubmit = async () => {
    try {
      onOpen();
      setLoading(true);
  
      console.log('Enviando requisição para GiftEmblemApi');
      const { status, error, data } = await GiftEmblemApi();
  
      if (status !== 200 || !data?.emblem) {
        throw new Error(error ?? "Ocorreu um erro interno.");
      }
  
      setEmblem(data.emblem);
  
      let newData = {
        ...user,
        emblems: [...(user?.emblems ?? []), data.emblem],
        points: (user?.points ?? 0) + (data.emblem?.value ?? 0),
      } as UserI;
  
      let newRanking = ranking
        ?.map((rankedUser) => {
          if (rankedUser.id === user?.id && data.emblem) {
            return {
              ...rankedUser,
              points: rankedUser.points + data.emblem.value,
            };
          }
          return rankedUser;
        })
        .sort((a, b) => b.points - a.points) as RankingI[];
  
      newRanking.forEach((rankedUser, index) => {
        if (rankedUser.id === user?.id) newData.ranking = index + 1;
      });
  
      setUser(newData);
      setRanking(newRanking);
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

  const category_color: { ouro: string; prata: string; bronze: string } = {
    ouro: "--color-one",
    prata: "#c0c0c0",
    bronze: "#6e4d25",
  };
  const category = emblem ? (emblem.category as Category) : "bronze";
  const borderColorClass = `${category_color[category]}`;

  return (
    <>
      <ButtonDefault
        Icon={LuArrowRight}
        content="Resgatar"
        isDisabled={loading}
        onclick={onSubmit}
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
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
            <div className="w-full flex flex-col justify-between items-center relative min-h-[300px] min-w-[300px]">
              {loading ? (
                <Loading />
              ) : (
                <>
                  <h2 className="w-full text-2xl font-semibold text-[--color-one] text-center my-6">
                    PARABÉNS!
                  </h2>
                  <img
                    src={emblem?.image}
                    alt="emblema novo"
                    className={`w-24 h-24 border-8  rounded-full shadow-snipped border-[${borderColorClass}] border-solid`}
                  />
                  <p
                    className={`w-full text-xl font-semibold text-[${borderColorClass}] text-center my-6`}
                  >
                    +{emblem?.value} PONTOS
                  </p>
                  <p className="text-sm mb-6 mx-2">
                    Você foi agraciado com o Emblema de{" "}
                    <strong>{emblem?.slug}</strong>, Categoria{" "}
                    <strong>{emblem?.category}</strong>!
                  </p>
                </>
              )}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
