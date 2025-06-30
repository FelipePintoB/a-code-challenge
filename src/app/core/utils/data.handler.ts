export const parseCSV = (csvText: string) => {
  const rows = [];
  const lines = csvText
    .trim()
    .split(/\r?\n/)
    .filter((d) => d);

  if (lines.length === 0) {
    return { columns: [], rows: [] };
  }

  const columns = parseLine(lines[0]);

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim()) {
      const row = parseLine(line);
      rows.push(row);
    }
  }

  return { columns, rows };
};

const parseLine = (line: string) => {
  return line.split(',').map((l) => l.trim());
};
