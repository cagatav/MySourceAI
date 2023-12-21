const TypingAnimation = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-white to-stone-200 animate-pulse"></div>
      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-white to-stone-200 animate-pulse delay-100"></div>
      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-white to-stone-200 animate-pulse delay-200"></div>
    </div>
  );
};

export default TypingAnimation;
