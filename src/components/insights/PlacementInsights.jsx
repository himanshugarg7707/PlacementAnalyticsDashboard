import { useMemo, useState } from 'react';
import { companies, branches, collegeInfo, sectorWiseData, yearWiseTrend } from '../../data/placementData';
import { getBranchPlacementRate, getPercentChange, getPlacementRate } from '../../utils/placementCalculations';

export default function PlacementInsights({ onSelectCompany, onOpenQuestions, showToast }) {
  const [insightFilter, setInsightFilter] = useState('all');
  const [expandedInsight, setExpandedInsight] = useState(null);

  const analytics = useMemo(() => {
    const placementRate = getPlacementRate(collegeInfo.totalPlaced, collegeInfo.totalStudents);

    const sectorBreakdown = sectorWiseData
      .map((s) => ({
        ...s,
        pctOfOffers: ((s.offers / collegeInfo.totalOffers) * 100).toFixed(1),
      }))
      .sort((a, b) => b.offers - a.offers);

    const topPayingCompanies = [...companies]
      .sort((a, b) => b.ctc - a.ctc)
      .slice(0, 10);

    const topHiringCompanies = [...companies]
      .sort((a, b) => b.studentsHired - a.studentsHired)
      .slice(0, 10);

    const branchPerformance = branches.map((b) => {
      const placedCount = b.placed ?? b.studentsPlaced ?? 0;
      const rate = getBranchPlacementRate(b);
      return {
        ...b,
        placed: placedCount,
        placementRate: rate,
        gap: b.highestPackage - b.avgPackage,
      };
    }).sort((a, b) => parseFloat(b.placementRate) - parseFloat(a.placementRate));

    const tierDistribution = [
      { tier: 'Super Dream', count: collegeInfo.superDreamOffers, color: '#34d399' },
      { tier: 'Dream', count: collegeInfo.dreamOffers, color: '#60a5fa' },
      { tier: 'Normal', count: collegeInfo.normalOffers, color: '#94a3b8' },
    ];

    const yoyGrowth = yearWiseTrend.map((y, i) => {
      const prev = yearWiseTrend[i - 1];
      return {
        ...y,
        avgGrowth: prev ? getPercentChange(y.avgPackage, prev.avgPackage) : null,
        placementRate: getPlacementRate(y.totalPlaced, y.totalStudents),
      };
    });

    const ctcBuckets = [
      { range: '< 6 LPA', min: 0, max: 6, count: 0, color: '#94a3b8' },
      { range: '6–10 LPA', min: 6, max: 10, count: 0, color: '#60a5fa' },
      { range: '10–15 LPA', min: 10, max: 15, count: 0, color: '#8CD3DD' },
      { range: '15–25 LPA', min: 15, max: 25, count: 0, color: '#a78bfa' },
      { range: '25–40 LPA', min: 25, max: 40, count: 0, color: '#f59e0b' },
      { range: '40+ LPA', min: 40, max: Infinity, count: 0, color: '#34d399' },
    ];
    companies.forEach((c) => {
      const bucket = ctcBuckets.find((b) => c.ctc >= b.min && c.ctc < b.max);
      if (bucket) bucket.count++;
    });

    const keyInsights = [
      {
        id: 'placement-rate',
        title: 'Overall Placement Rate',
        value: `${placementRate}%`,
        detail: `${collegeInfo.totalPlaced} out of ${collegeInfo.totalStudents} students placed`,
        trend: 'up',
        icon: '📈',
      },
      {
        id: 'avg-package',
        title: 'Average Package',
        value: `₹${collegeInfo.averagePackage} LPA`,
        detail: `Median: ₹${collegeInfo.medianPackage} LPA • Highest: ₹${collegeInfo.highestPackage} LPA`,
        trend: 'up',
        icon: '💎',
      },
      {
        id: 'multi-offers',
        title: 'Multiple Offers',
        value: `${collegeInfo.totalOffers - collegeInfo.totalPlaced}`,
        detail: `${collegeInfo.totalOffers} total offers for ${collegeInfo.totalPlaced} placed students`,
        trend: 'up',
        icon: '🎯',
      },
      {
        id: 'companies-visited',
        title: 'Recruiters Participated',
        value: `${collegeInfo.totalCompanies}`,
        detail: `Across ${sectorWiseData.length} industry sectors`,
        trend: 'up',
        icon: '🏢',
      },
      {
        id: 'super-dream',
        title: 'Super Dream Offers',
        value: `${collegeInfo.superDreamOffers}`,
        detail: `${((collegeInfo.superDreamOffers / collegeInfo.totalOffers) * 100).toFixed(1)}% of all offers above ₹20 LPA`,
        trend: 'up',
        icon: '🚀',
      },
      {
        id: 'top-sector',
        title: 'Dominant Sector',
        value: sectorBreakdown[0]?.sector || 'Technology',
        detail: `${sectorBreakdown[0]?.offers || 0} offers (${sectorBreakdown[0]?.pctOfOffers || 0}% of all recruitments)`,
        trend: 'steady',
        icon: '🌐',
      },
    ];

    return {
      placementRate,
      sectorBreakdown,
      topPayingCompanies,
      topHiringCompanies,
      branchPerformance,
      tierDistribution,
      yoyGrowth,
      ctcBuckets,
      keyInsights,
    };
  }, []);

  return (
    <div
      id="insights"
      className="insights-container"
      data-tab-section="insights"
    >
      <span id="placement-insights" className="tab-anchor-alias" aria-hidden="true" />

      <div className="insights-header">
        <div>
          <span className="section-badge-pill">Analytics Intelligence</span>
          <h2 className="section-title-clean">Placement Insights &amp; Market Dynamics</h2>
          <p className="section-subtitle-clean">
            Statistical indicators, compensation percentiles, branch trajectories, and recruitment trends.
          </p>
        </div>

        <div className="insight-filter-pills">
          {['all', 'overview', 'compensation', 'sectors', 'branches', 'trends'].map((filter) => (
            <button
              key={filter}
              className={`insight-pill ${insightFilter === filter ? 'active' : ''}`}
              onClick={() => setInsightFilter(filter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {onOpenQuestions && (
        <div className="insights-tq-callout-card">
          <div className="tq-callout-left">
            <span className="tq-callout-badge">Interview Preparation</span>
            <h3 className="tq-callout-title">Top Companies Mostly Asked Questions</h3>
            <p className="tq-callout-sub">
              Frequently asked interview questions, system designs, and core concepts from top recruiters.
            </p>
          </div>
          <button
            type="button"
            className="btn-primary tq-callout-btn"
            onClick={() => onOpenQuestions('All')}
          >
            💡 View Questions
          </button>
        </div>
      )}

      <div className="insights-kpi-grid">
        {analytics.keyInsights.map((card) => (
          <div
            key={card.id}
            className={`insight-kpi-card ${expandedInsight === card.id ? 'expanded' : ''}`}
            onClick={() => setExpandedInsight(expandedInsight === card.id ? null : card.id)}
          >
            <div className="kpi-card-header">
              <div className="kpi-icon-bubble">{card.icon}</div>
              <div className={`kpi-trend-pill ${card.trend}`}>
                <span className="trend-arrow">{card.trend === 'up' ? '▲' : card.trend === 'down' ? '▼' : '●'}</span>
                <span>{card.trend === 'up' ? 'Growing' : card.trend === 'down' ? 'Dip' : 'Steady'}</span>
              </div>
            </div>

            <div className="kpi-card-body">
              <div className="kpi-value font-mono">{card.value}</div>
              <div className="kpi-title">{card.title}</div>
              <div className="kpi-detail">{card.detail}</div>
            </div>
          </div>
        ))}
      </div>

      {(insightFilter === 'all' || insightFilter === 'compensation') && (
        <div className="insight-section">
          <h3 className="insight-section-title">📊 Compensation Distribution (CTC Tiers)</h3>
          <div className="tier-bar-chart">
            {analytics.ctcBuckets.map((bucket) => {
              const maxCount = Math.max(...analytics.ctcBuckets.map((b) => b.count));
              const heightPct = maxCount > 0 ? (bucket.count / maxCount) * 100 : 0;
              return (
                <div key={bucket.range} className="tier-bar-col">
                  <div className="tier-bar-count font-mono">{bucket.count}</div>
                  <div className="tier-bar-track">
                    <div
                      className="tier-bar-fill"
                      style={{ height: `${heightPct}%`, backgroundColor: bucket.color }}
                    />
                  </div>
                  <div className="tier-bar-label font-mono">{bucket.range}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {(insightFilter === 'all' || insightFilter === 'overview') && (
        <div className="insight-grid-2col">
          <div className="insight-section">
            <h3 className="insight-section-title">🏆 Top 10 Highest CTC Recruiters</h3>
            <div className="leaderboard-list">
              {analytics.topPayingCompanies.map((c, i) => (
                <div
                  key={c.id}
                  className="leaderboard-row"
                  onClick={() => onSelectCompany?.(c)}
                >
                  <span className="lb-rank font-mono">{i + 1}</span>
                  <div className="lb-info">
                    <span className="lb-name">{c.name}</span>
                    <span className="lb-sector-tag">{c.sector}</span>
                  </div>
                  <span className="lb-ctc font-mono">₹{c.ctc.toFixed(1)} LPA</span>
                </div>
              ))}
            </div>
          </div>

          <div className="insight-section">
            <h3 className="insight-section-title">👥 Top 10 Volume Recruiters (Hires)</h3>
            <div className="leaderboard-list">
              {analytics.topHiringCompanies.map((c, i) => (
                <div
                  key={c.id}
                  className="leaderboard-row"
                  onClick={() => onSelectCompany?.(c)}
                >
                  <span className="lb-rank font-mono">{i + 1}</span>
                  <div className="lb-info">
                    <span className="lb-name">{c.name}</span>
                    <span className="lb-sector-tag">₹{c.ctc} LPA • {c.sector}</span>
                  </div>
                  <span className="lb-hires font-mono font-bold">{c.studentsHired} offers</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {(insightFilter === 'all' || insightFilter === 'sectors') && (
        <div className="insight-section">
          <h3 className="insight-section-title">🌐 Sector Breakdown (% of Total Offers)</h3>
          <div className="sector-bar-list">
            {analytics.sectorBreakdown.map((s) => (
              <div key={s.sector} className="sector-bar-row">
                <div className="sector-bar-meta">
                  <span className="sector-bar-label">{s.sector}</span>
                  <span className="sector-bar-value font-mono">
                    {s.offers} offers ({s.pctOfOffers}%) • Avg: ₹{s.avgCTC.toFixed(1)} LPA
                  </span>
                </div>
                <div className="sector-bar-track">
                  <div
                    className="sector-bar-fill"
                    style={{ width: `${s.pctOfOffers}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(insightFilter === 'all' || insightFilter === 'branches') && (
        <div className="insight-section">
          <h3 className="insight-section-title">🎓 Department Placement Rates</h3>
          <div className="branch-rate-grid">
            {analytics.branchPerformance.map((b) => {
              const rateNum = parseFloat(b.placementRate);
              const colorClass = rateNum >= 90 ? 'rate-high' : rateNum >= 75 ? 'rate-mid' : 'rate-low';
              return (
                <div key={b.id} className="branch-rate-card">
                  <div className="br-header">
                    <span className="br-code font-mono">{b.shortName}</span>
                    <span className={`br-badge font-mono ${colorClass}`}>{b.placementRate}%</span>
                  </div>
                  <div className="br-name">{b.name}</div>
                  <div className="br-progress-track">
                    <div
                      className={`br-progress-fill ${colorClass}`}
                      style={{ width: `${Math.min(rateNum, 100)}%` }}
                    />
                  </div>
                  <div className="br-meta font-mono">
                    <span>{b.placed}/{b.totalStudents} placed</span>
                    <span>₹{b.avgPackage} LPA avg</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {(insightFilter === 'all' || insightFilter === 'trends') && (
        <div className="insight-section">
          <h3 className="insight-section-title">📈 5-Year Placement Trend</h3>
          <div className="trend-table-wrapper">
            <table className="trend-table">
              <thead>
                <tr>
                  <th>Session</th>
                  <th>Placed</th>
                  <th>Placement %</th>
                  <th>Avg Package</th>
                  <th>Highest</th>
                  <th>Recruiters</th>
                  <th>YoY Growth</th>
                </tr>
              </thead>
              <tbody>
                {analytics.yoyGrowth.map((y) => (
                  <tr key={y.year}>
                    <td className="font-mono">{y.year}</td>
                    <td>{y.totalPlaced}/{y.totalStudents}</td>
                    <td className="font-mono font-bold">{y.placementRate}%</td>
                    <td className="font-mono">₹{y.avgPackage} L</td>
                    <td className="font-mono">₹{y.highestPackage} L</td>
                    <td>{y.companiesVisited}</td>
                    <td className={`yoy-cell ${y.avgGrowth && parseFloat(y.avgGrowth) > 0 ? 'positive' : ''}`}>
                      {y.avgGrowth ? `+${y.avgGrowth}%` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

