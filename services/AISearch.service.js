const { SearchIndexClient, SearchClient, AzureKeyCredential, odata } = require("@azure/search-documents");
const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";
const indexName = process.env.INDEX_NAME||"model00";

const client = new SearchClient(endpoint, indexName, new AzureKeyCredential(apiKey));

async function PerformSearch(searchText) {
    const options = {
        includeTotalCount: true,
        top : 10,
        count : true,
    };
    const results = await client.search(searchText, options);
    let searchResults = [];
    for await (const result of results.results) {
        searchResults.push(result.document);
    }
    return searchResults;
}

module.exports = {
    PerformSearch
}