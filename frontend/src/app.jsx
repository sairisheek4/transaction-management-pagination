import { useState, useEffect } from "react";
import TransactionFilters from "./components/TransactionFilters";
import TransactionTable from "./components/TransactionTable";
import Pagination from "./components/Pagination";
import StatusMessage from "./components/StatusMessage";
import { getTransactions } from "./services/transactionService";

export default function App() {
    const [filters, setFilters] = useState({
        accountId: "101",
        size: "5",
        sortBy: "transactionDate",
        direction: "DESC",
    });

    const [transactions, setTransactions] = useState([]);
    const [pageInfo, setPageInfo] = useState(null);
    const [status, setStatus] = useState({ type: "", message: "" });
    const [currentPage, setCurrentPage] = useState(0);

    async function fetchData(page = 0) {
        setStatus({ type: "loading", message: "Fetching transactions..." });
        try {
            const data = await getTransactions({
                accountId: filters.accountId,
                page,
                size: filters.size,
                sortBy: filters.sortBy,
                direction: filters.direction,
            });
            setTransactions(data.content);
            setPageInfo(data);
            setCurrentPage(data.number);
            setStatus({ type: "", message: "" });
        } catch (err) {
            setTransactions([]);
            setPageInfo(null);
            setStatus({ type: "error", message: `Could not load transactions. ${err.message}` });
        }
    }

    useEffect(() => { fetchData(0); }, []);

    const handlePrevious = () => { if (currentPage > 0) fetchData(currentPage - 1); };
    const handleNext = () => { if (pageInfo && currentPage < pageInfo.totalPages - 1) fetchData(currentPage + 1); };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Transaction viewer</h1>
            <div style={styles.subtitle}>Testing pagination & sorting against the transaction API</div>

            <TransactionFilters filters={filters} onChange={setFilters} onSubmit={() => fetchData(0)} />
            <StatusMessage type={status.type} message={status.message} />
            {!status.message && <TransactionTable transactions={transactions} />}
            <Pagination pageInfo={pageInfo} onPrevious={handlePrevious} onNext={handleNext} />
        </div>
    );
}

const styles = {
    container: { maxWidth: "960px", margin: "0 auto", padding: "32px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" },
    heading: { fontSize: "20px", fontWeight: 600, marginBottom: "4px" },
    subtitle: { color: "#666", fontSize: "13px", marginBottom: "24px" },
};