
// eslint-disable-next-line react/prop-types
const SubTypeSelector = ({ subType, currentSubType , setSubType }) => {
  const label = {
    ppv: 'Pay Per View',
    subscription: 'Part of Subscription'
  }
  return (
    <div 
      onClick={() => setSubType(subType)} 
      className={`flex border-2 rounded-lg px-6 py-2 cursor-pointer ${currentSubType == subType ? 'bg-accentColor border-2 border-gray-500' : 'bg-white'}`}
    >
      <p className="text-xs text-gray-700 font-bold">
        {label[subType]}
      </p>
    </div>        
  );
}

export default SubTypeSelector;