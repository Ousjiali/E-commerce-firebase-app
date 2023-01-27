export const takeOnly = <T>(list: T[], max: number): T[] => ((list?.length || 0) > max)
    ? list.slice(0, max)
    : list;