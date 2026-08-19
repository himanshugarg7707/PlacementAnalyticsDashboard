import { collegeInfo } from '../data/placementData';

export default function StatsOverview() {
  const placementPct = ((collegeInfo.totalPlaced / collegeInfo.totalStudents) * 100).toFixed(1);

  return (
    <div className="hero-stats-glass-bar" role="region" aria-label="Key placement statistics">
      <div className="stat-item">
        <span className="stat-label">Companies</span>
        <span className="stat-val font-mono highlight-ice-aqua">{collegeInfo.totalCompanies}</span>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <span className="stat-label">Placed</span>
        <span className="stat-val font-mono">
          {placementPct}%
          <small> ({collegeInfo.totalPlaced})</small>
        </span>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <span className="stat-label">Highest CTC</span>
        <span className="stat-val font-mono highlight-ice-aqua">₹{collegeInfo.highestPackage}L</span>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <span className="stat-label">Average CTC</span>
        <span className="stat-val font-mono">₹{collegeInfo.averagePackage}L</span>
      </div>
    </div>
  );
}
