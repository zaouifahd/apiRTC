export const meiliIndexes = {
  places: {
    primaryKey: "id",
    searchableAttributes: ["name", "description", "aiSummary", "category", "city", "wilaya"],
    filterableAttributes: ["category", "city", "wilaya", "priceLevel", "averageRating", "_geo"],
    sortableAttributes: ["averageRating", "reviewCount", "createdAt", "_geo"]
  },
  professionals: {
    primaryKey: "id",
    searchableAttributes: ["name", "headline", "bio", "category", "city", "wilaya"],
    filterableAttributes: ["category", "city", "wilaya", "verifiedStatus", "isAfritePro", "averageRating"],
    sortableAttributes: ["averageRating", "reviewCount", "completedMissions", "createdAt"]
  },
  requests: {
    primaryKey: "id",
    searchableAttributes: ["title", "description", "category", "city", "wilaya"],
    filterableAttributes: ["category", "city", "wilaya", "status", "budgetMin", "budgetMax"],
    sortableAttributes: ["createdAt", "dueAt", "budgetMax"]
  }
} as const;
