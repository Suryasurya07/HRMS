import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress(); // Get the loading progress

  return (
    <Html center>
      <div className="canvas-load">
        {/* Display the loading percentage */}
        <p
          style={{
            fontSize: 18,
            color: "#ffffff",
            fontWeight: 800,
            marginTop: 40,
            textAlign: "center",
          }}
        >
          {progress.toFixed(2)}%
        </p>
        {/* Optionally, you can include a loading spinner */}
        <div style={{ marginTop: 10 }}>
          <div className="spinner"></div>
        </div>
      </div>
    </Html>
  );
};

export default Loader;
