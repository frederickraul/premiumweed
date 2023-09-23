import Loading from "../Loading";

interface ContainerProps{
    children: React.ReactNode;
    isLoading?: boolean;
    full?:boolean;
}

const Container:React.FC<ContainerProps> = ({
    children,
    isLoading,
    full
}) => {
  return (
    <>
      {isLoading && (
        <Loading/>
      )}
    <div 
      className={`
        ${full ? 'w-full': 'max-w-[960px]'}
        mx-auto
        xl:px-0
        md:px-10
        sm:px-2
        px-4
      `}>
      {children }
      </div>
      </>
  )
}

export default Container