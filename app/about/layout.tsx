import RandomLayout from "../../src/components/RandomLayout";

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-black w-full flex flex-col justify-center items-center">
      {children}
      <div className="w-96">
        <RandomLayout />
      </div>
    </div>
  );
};

export default AboutLayout;
