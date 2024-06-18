import { ButtonGift } from "../ui/button/button-gift/button-gift";

export const KeyGame = () =>{
return (
  <div className="px-2 rounded-md shadow-snipped border-[1px] border-[--color-one] border-solid w-full h-full flex flex-col justify-between">
    {" "}
    <div>
      <h1 className="w-full text-2xl font-semibold text-[--color-one] text-center mt-6">
        Foguetinho
      </h1>
      <p className="text-xs w-full mt-5 text-white/50">
        Neste jogo, você coloca uma quantia de dinheiro e o objetivo é retirar sua aposta antes que o foguete exploda. O multiplicador do valor da aposta vai aumentando à medida que o foguete sobe, mas se você não retirar sua aposta a tempo e o foguete explodir, você perde o valor apostado. A ideia é tentar maximizar os ganhos retirando a aposta no momento certo.
      </p>
    </div>
    <div className="flex flex-col gap-4 mb-4">
      <p className="w-full text-center text-xs text-red-600">
        JOGO AINDA EM DESENVOLVIMENTO, POR ENQUANTO PEGUE EMBLEMAS ALEATORIOS.
      </p>
      <div className="max-w-64 mx-auto w-full">
        <ButtonGift/>
      </div>
    </div>
  </div>
);
}