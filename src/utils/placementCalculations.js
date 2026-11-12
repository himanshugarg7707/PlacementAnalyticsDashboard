// Shared calculations used by the branch and placement analytics screens.
export function getPlacementRate(placed, totalStudents) {
  if (!totalStudents) return '0.0';
  return ((placed / totalStudents) * 100).toFixed(1);
}

export function getBranchPlacementRate(branch) {
  const placed = branch.placed ?? branch.studentsPlaced ?? 0;
  return getPlacementRate(placed, branch.totalStudents);
}

export function getPercentChange(currentValue, previousValue) {
  if (!previousValue) return null;
  return (((currentValue - previousValue) / previousValue) * 100).toFixed(1);
}
