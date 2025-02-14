
const Parent = ({children}) => {
  return (
    <div className='children'>
      {children}
      
    </div>
  )
}
export default Parent

const Container1 = ({ children }) => {
  return <div className='container1'>{children}</div>;
};

export {Container1}



