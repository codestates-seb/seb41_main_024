type alertPropsType = {
  alertNum: string;
};

const Alert = ({ alertNum }: alertPropsType) => {
  return (
    <div className="flex justify-center items-center w-14 h-14 ">
      <div className="flex justify-center items-center w-6 h-6 rounded-full bg-primary">
        <p className="text-xs text-center text-white">{alertNum}</p>
      </div>
    </div>
  );
};

export default Alert;
