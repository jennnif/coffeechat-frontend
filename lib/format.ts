export const fmt = {
  dtLocalToIso(v: string) {
    // input[type=datetime-local] -> ISO
    if (!v) return v;
    const d = new Date(v);
    return d.toISOString();
  },
};
