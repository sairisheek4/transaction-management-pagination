export default function TransactionFilters({ filters, onChange, onSubmit }) {
    const { accountId, size, sortBy, direction } = filters;

    const handleFieldChange = (field) => (e) => {
        onChange({ ...filters, [field]: e.target.value });
    };

    return (
        <div style={styles.controls}>
            <div style={styles.field}>
                <label style={styles.label}>Account ID</label>
                <input type="number" value={accountId} onChange={handleFieldChange("accountId")} style={styles.input} />
            </div>

            <div style={styles.field}>
                <label style={styles.label}>Page size</label>
                <select value={size} onChange={handleFieldChange("size")} style={styles.input}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>

            <div style={styles.field}>
                <label style={styles.label}>Sort by</label>
                <select value={sortBy} onChange={handleFieldChange("sortBy")} style={styles.input}>
                    <option value="transactionDate">Transaction date</option>
                    <option value="amount">Amount</option>
                    <option value="transactionType">Transaction type</option>
                </select>
            </div>

            <div style={styles.field}>
                <label style={styles.label}>Direction</label>
                <select value={direction} onChange={handleFieldChange("direction")} style={styles.input}>
                    <option value="DESC">Descending</option>
                    <option value="ASC">Ascending</option>
                </select>
            </div>

            <button style={styles.button} onClick={onSubmit}>Fetch</button>
        </div>
    );
}

const styles = {
    controls: { background: "white", border: "1px solid #e2e2e2", borderRadius: "8px", padding: "16px", display: "flex", gap: "12px", alignItems: "flex-end", flexWrap: "wrap", marginBottom: "16px" },
    field: { display: "flex", flexDirection: "column" },
    label: { fontSize: "12px", color: "#555", marginBottom: "4px" },
    input: { padding: "6px 8px", border: "1px solid #ccc", borderRadius: "6px", fontSize: "13px", minWidth: "100px", height: "34px" },
    button: { background: "#1a1a1a", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", fontSize: "13px", cursor: "pointer", height: "34px" },
};