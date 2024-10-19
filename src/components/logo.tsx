import Image from "next/image";
const Logo = () => {
  return (
    <>
      <Image
        src="/images/fjlogo.svg"
        alt="FutureJobs Logo"
        height={60}
        width={60}
      />
    </>
  );
};

export default Logo;
