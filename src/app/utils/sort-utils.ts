export function sortData<T>(data: T[], sortBy: string, sortOrder: 'asc' | 'desc'): T[] {
  return [...data].sort((a, b) => {
    let valueA = (a as any)[sortBy];
    let valueB = (b as any)[sortBy];
    let compareValue = 0;

    if (valueA instanceof Date && valueB instanceof Date) {
      compareValue = valueA.getTime() - valueB.getTime(); // Date comparison
    } else if (typeof valueA === 'string' && typeof valueB === 'string') {
      compareValue = valueA.localeCompare(valueB); // String comparison
    } else if (typeof valueA === 'number' && typeof valueB === 'number') {
      compareValue = valueA - valueB; // Numeric comparison
    }

    return sortOrder === 'desc' ? -compareValue : compareValue;
  });
}
