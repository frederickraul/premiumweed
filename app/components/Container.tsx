import Loading from "../Loading";

interface ContainerProps{
    children: React.ReactNode;
    isLoading?: boolean;
}

const Container:React.FC<ContainerProps> = ({
    children,
    isLoading
}) => {
  return (
    <>
      {isLoading && (
        <Loading/>
      )}
    <div 
      className="
        max-w-[960px]
        mx-auto
        xl:px-0
        md:px-10
        sm:px-2
        px-4
      ">
      {children }
      </div>
      </>
  )
}

export default Container