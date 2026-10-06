const typeColors = { DEPOSIT: "#1a7f37", WITHDRAWAL: "#cf222e", TRANSFER: "#0969da" };

export default function TransactionTable({ transactions }) {
    if (!transactions || transactions.length === 0) {
        return <div style={styles.empty}>No transactions found for this account.</div>;
    }

    return (
        <table style={styles.table}>
            <thead>
            <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Description</th>
            </tr>
            </thead>
            <tbody>
            {transactions.map((txn) => (
                <tr key={txn.id}>
                    <td style={styles.td}>{txn.id}</td>
                    <td style={styles.td}>{txn.transactionDate}</td>
                    <td style={{ ...styles.td, color: typeColors[txn.transactionType], fontWeight: 500 }}>{txn.transactionType}</td>
                    <td style={styles.td}>{Number(txn.amount).toFixed(2)}</td>
                    <td style={styles.td}>{txn.description || ""}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

const styles = {
    table: { width: "100%", background: "white", borderCollapse: "collapse", borderRadius: "8px", overflow: "hidden", border: "1px solid #e2e2e2" },
    th: { textAlign: "left", padding: "10px 12px", fontSize: "13px", borderBottom: "1px solid #eee", background: "#fafafa", fontWeight: 600, color: "#444" },
    td: { textAlign: "left", padding: "10px 12px", fontSize: "13px", borderBottom: "1px solid #eee" },
    empty: { textAlign: "center", padding: "40px", color: "#888", fontSize: "13px", background: "white", border: "1px solid #e2e2e2", borderRadius: "8px" },
};