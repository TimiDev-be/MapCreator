export const PrintFormatsRecord = {
  // A series
  A0:  [2384, 3370],
  A1:  [1684, 2384],
  A2:  [1191, 1684],
  A3:  [842,  1191],
  A4:  [595,  842], 
  A5:  [420,  595],
  A6:  [298,  420],
  A7:  [210,  298],
  A8:  [147,  210],
  A9:  [105,  147],
  A10: [74,   105],

  // B series
  B0:  [2835, 4008],
  B1:  [2004, 2835],
  B2:  [1417, 2004],
  B3:  [1001, 1417],
  B4:  [709,  1001],
  B5:  [499,  709],
  B6:  [354,  499],
  B7:  [249,  354],
  B8:  [176,  249],
  B9:  [125,  176],
  B10: [88,   125],

  // C series
  C0:  [2599, 3677],
  C1:  [1837, 2599],
  C2:  [1298, 1837],
  C3:  [918,  1298],
  C4:  [649,  918],
  C5:  [459,  649],
  C6:  [323,  459],
  C7:  [230,  323],
  C8:  [162,  230],
  C9:  [113,  162],
  C10: [79,   113],
  DL:  [312,  624],

  // US formats
  Letter:             [612,  792],
  'Government-Letter':[576,  756],
  Legal:              [612,  1008],
  'Junior-Legal':     [576,  360],
  Ledger:             [1224, 792],
  Tabloid:            [792,  1224],
  'Credit-Card':      [153,  243],
} as const;

export type PrintFormats = (typeof PrintFormatsRecord)[keyof typeof PrintFormatsRecord];