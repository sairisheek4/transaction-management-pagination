export default function Pagination({ pageInfo, onPrevious, onNext }) {
    if (!pageInfo) return null;
    const { number, totalPages, totalElements, first, last } = pageInfo;

    return (
        <div style={styles.footer}>
            <div style={styles.info}>
                Page {number + 1} of {totalPages || 1} — {totalElements} total record{totalElements === 1 ? "" : "s"}
            </div>
            <div style={styles.pager}>
                <button style={styles.button} onClick={onPrevious} disabled={first}>Previous</button>
                <button style={styles.button} onClick={onNext} disabled={last}>Next</button>
            </div>
        </div>
    );
}

const styles = {
    footer: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px", fontSize: "13px", color: "#555" },
    pager: { display: "flex", gap: "8px" },
    button: { height: "30px", padding: "4px 12px", background: "#1a1a1a", color: "white", border: "none", borderRadius: "6px", fontSize: "13px", cursor: "pointer" },
};