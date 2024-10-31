import ExpandLessIcon from "@mui/icons-material/ExpandLess";
const ScrollToTop = () => {
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <span onClick={() => goToTop()} className="curve pointer">
      <ExpandLessIcon />
    </span>
  );
};

export default ScrollToTop;
