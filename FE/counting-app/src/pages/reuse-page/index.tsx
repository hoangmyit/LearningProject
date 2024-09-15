import React, { useState, useMemo, useRef, useEffect } from 'react';

const ReusePage: React.FC = () => {
  const [isShow, setIsShow] = useState<boolean>(true);
  const hasLoggedRef = useRef<boolean>(false);

  const memoizedChildComponents = useMemo(() => (
    <>
      <ReuseChildComponent name="Child 1" hasLoggedRef={hasLoggedRef} />
      <ReuseChildComponent name="Child 2" hasLoggedRef={hasLoggedRef} />
      <ReuseChildComponent name="Child 3" hasLoggedRef={hasLoggedRef} />
    </>
  ), [hasLoggedRef]);

  return (
    <div className="w-full bg-blue-300 h-full flex-row p-4">
      <div className="mb-4">
        <button
          type="button"
          onClick={() => setIsShow(!isShow)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          {isShow ? 'Hide' : 'Show'} Components
        </button>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Direct Children:</h2>
        {memoizedChildComponents}
      </div>
      <ReuseParentComponent isShow={isShow}>
        {memoizedChildComponents}
      </ReuseParentComponent>
    </div>
  );
};

const ReuseParentComponent: React.FC<{ isShow: boolean; children: React.ReactNode }> = React.memo(({ isShow, children }) => {
  return (
    <div className="w-full bg-slate-400 p-4 mt-4">
      <h2 className="font-bold mb-2">Parent Component</h2>
      {isShow && children}
    </div>
  );
});

interface ReuseChildComponentProps {
  name: string;
  hasLoggedRef: React.MutableRefObject<boolean>;
}

const ReuseChildComponent: React.FC<ReuseChildComponentProps> = ({ name, hasLoggedRef }) => {
  useEffect(() => {
    if (!hasLoggedRef.current) {
      console.log(`Reuse Child ${name} mounted.`);
      hasLoggedRef.current = true;
    }
  }, [name, hasLoggedRef]);

  return <div className="w-fit bg-green-400 m-2 p-2">{name}</div>;
}

export default ReusePage;
