export function LoadingOverlay() {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        background: "rgba(255, 255, 255, 0.6)",
        zIndex: 99999,
      }}
    >
      <div
        className="spinner-border text-dark"
        style={{
          width: "3rem",
          height: "3rem",
        }}
      ></div>
    </div>
  );
}
