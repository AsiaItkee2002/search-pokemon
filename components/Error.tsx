interface ErrorProps {
    message: string;
  }
  
  export default function Error({ message }: ErrorProps) {
    return <p className="text-center text-red-500">{message}</p>;
  }
  