import { LuArrowRight } from "react-icons/lu";
import { InputPassword } from "../../../ui/inputs/password/input-password";
import { InputDefault } from "../../../ui/inputs/default/input-default";
import { HiOutlineMail } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { InputsEdit } from "../types/edit-profile.type";
import { useUser } from "../../../../contexts/context-user/context-user";
import { ButtonDefault } from "../../../ui/button/default/button-default";

export const SendCodeEditProfile = ({
  selectedImage,
  handleSubmit,
  onSubmitSendCode,
  toggleProfile,
  register,
  errors,
}: {
  selectedImage: string;
  handleSubmit: Function;
  onSubmitSendCode: Function;
  toggleProfile: any;
  isChanged: any;
  register: UseFormRegister<InputsEdit>;
  errors: FieldErrors<InputsEdit>;
}) => {
  const { user, loading } = useUser();
  return (
    <form
      className="flex flex-col items-center justify-center w-full relative overflow-hidden rounded-md"
      onSubmit={handleSubmit(onSubmitSendCode)}
    >
      <span className="absolute w-[110%] h-[135px] rotate-[17deg] rounded-[6px] right-[-40px] top-[-75px] shadow-snipped border-[1px] border-[--color-one] border-solid bg-[--color-bg-primary]"></span>
      <div className="relative m-4 w-fit">
        <img
          alt="profile logo"
          src={selectedImage}
          className="max-h-[80px] max-w-[80px] min-h-[80px] min-w-[80px] border-[1px] border-[--color-one] shadow-snipped border-solid rounded-full object-cover"
          width={80}
          height={80}
        />
        <label
          htmlFor="fileInput"
          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-49%] cursor-pointer "
        >
          <input
            {...register("file")}
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={toggleProfile}
            className="sr-only"
            disabled={loading}
          />
          <div className="w-[78px] h-[77px] rounded-full flex items-center justify-center border-custom-grayOne bg-custom-grayOne/60  duration-300 ease-linear bg-black/50 hover:bg-black/70">
            <MdModeEdit className="text-2xl text-custom-textColor/60" />
          </div>
        </label>
      </div>
      <div className="w-full px-4 mt-12">
        <InputDefault
          Icon={FaRegUser}
          placeholder="Nome completo"
          error={errors.fullname?.message}
          classes="text-lg shadow-snipped"
          register={register}
          value={user?.fullname || ""}
          name="fullname"
          disabled={loading}
        />{" "}
        <InputDefault
          Icon={FaRegUser}
          placeholder="Nome de usuário"
          error={errors.username?.message}
          classes="text-lg shadow-snipped"
          register={register}
          value={user?.username || ""}
          name="username"
          disabled={loading}
        />{" "}
        <InputDefault
          Icon={HiOutlineMail}
          placeholder="Email"
          error={errors.email?.message}
          classes="text-lg shadow-snipped"
          register={register}
          value={user?.email || ""}
          name="email"
          disabled={loading}
        />{" "}
        <InputPassword
          disable={true}
          value="Inspencionar né genio?"
          register={register}
          placeholder="Insira sua senha"
          error={errors.password?.message}
          classes="text-lg shadow-snipped"
          name="password"
        />
      </div>
      <div className="flex gap-5 w-full px-4 pb-6">
        <ButtonDefault
          Icon={LuArrowRight}
          content="CONFIRMAR"
          isDisabled={loading}
        />
      </div>
    </form>
  );
};
