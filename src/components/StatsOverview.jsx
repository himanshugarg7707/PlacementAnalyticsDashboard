import { collegeInfo } from '../data/placementData';

export default function StatsOverview() {
  const placementPct = ((collegeInfo.totalPlaced / collegeInfo.totalStudents) * 100).toFixed(1);

  const stats = [
    {
      icon: '🏢',
      iconBg: 'rgba(99, 102, 241, 0.15)',
      value: collegeInfo.totalCompanies,
      label: 'Companies Visited',
      change: '+12 from last year',
      positive: true,
    },
    {
      icon: '🎓',
      iconBg: 'rgba(16, 185, 129, 0.15)',
      value: `${placementPct}%`,
      label: 'Students Placed',
      change: `${collegeInfo.totalPlaced} out of ${collegeInfo.totalStudents}`,
      positive: true,
    },
    {
      icon: '💰',
      iconBg: 'rgba(245, 158, 11, 0.15)',
      value: `₹${collegeInfo.highestPackage}L`,
      label: 'Highest Package',
      change: '+₹6.5L from last year',
      positive: true,
    },
    {
      icon: '📊',
      iconBg: 'rgba(168, 85, 247, 0.15)',
      value: `₹${collegeInfo.averagePackage}L`,
      label: 'Average Package',
      change: '+₹0.8L from last year',
      positive: true,
    },
  ];

  return (
    <div className="stats-grid" role="region" aria-label="Key placement statistics">
      {stats.map((stat, index) => (
        <div
          className={`stat-card animate-in animate-in-delay-${index + 1}`}
          key={stat.label}
        >
          <div
            className="stat-icon"
            style={{ background: stat.iconBg }}
            aria-hidden="true"
          >
            {stat.icon}
          </div>
          <div className="stat-value counter-animate">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
          <div className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
            {stat.positive ? '▲' : '▼'} {stat.change}
          </div>
        </div>
      ))}
    </div>
  );
}
