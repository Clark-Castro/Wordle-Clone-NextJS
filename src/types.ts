export type BlockData = {
  color: string;
  letter: string;
};

export type RowData = Record<`b${1 | 2 | 3 | 4 | 5}`, BlockData>;
