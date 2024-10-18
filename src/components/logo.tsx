import Image from "next/image";
const Logo = () => {
  return (
    <>
      <Image
        src="/images/fjlogo.svg"
        alt="FutureJobs Logo"
        height={80}
        width={80}
      />
    </>
  );
};

export default Logo;
