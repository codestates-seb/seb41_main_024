const ChatIcon = () => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="26" height="26" fill="url(#pattern0)" fillOpacity="0.7" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_53_1869" transform="scale(0.00195312)" />
        </pattern>
        <image
          id="image0_53_1869"
          width="512"
          height="512"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default ChatIcon;