export function chunkArray(array: any[], chunkSize: number) {
    const chunks = [];

    do {
        chunks.push(array.splice(0, chunkSize));
    } while (array.length);

    return chunks;
}
