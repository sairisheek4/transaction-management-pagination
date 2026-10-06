export default function StatusMessage({ type, message }) {
    if (!message) return null;
    const style = type === "error" ? styles.error : styles.loading;
    return <div style={{ ...styles.base, ...style }}>{message}</div>;
}

const styles = {
    base: { padding: "12px", borderRadius: "6px", fontSize: "13px", marginBottom: "16px" },
    error: { background: "#ffebe9", color: "#cf222e", border: "1px solid #ffc1bc" },
    loading: { background: "#f0f6ff", color: "#0969da", border: "1px solid #cae0ff" },
};