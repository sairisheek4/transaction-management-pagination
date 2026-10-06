const API_BASE_URL = "http://localhost:8080/api/transactions";

export async function getTransactions({
                                          accountId,
                                          page = 0,
                                          size = 20,
                                          sortBy = "transactionDate",
                                          direction = "DESC",
                                      }) {
    const url = new URL(API_BASE_URL);
    url.searchParams.set("accountId", accountId);
    url.searchParams.set("page", page);
    url.searchParams.set("size", size);
    url.searchParams.set("sortBy", sortBy);
    url.searchParams.set("direction", direction);

    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok) {
        const message = data?.message || `Request failed with status ${response.status}`;
        throw new Error(message);
    }

    return data;
}