import { branches } from '../data/placementData';

export default function BranchWise() {
    return (
        <section className="animate-in" aria-labelledby="branches-heading">
            <div className="section-header">
                <div>
                    <h3 id="branches-heading">Branch-Wise Placement Data</h3>
                    <p className="section-desc">
                        Detailed placement statistics for each department
                    </p>
                </div>
            </div>

            <div className="branch-grid">
                {branches.map((branch) => {
                    const pct = ((branch.placed / branch.totalStudents) * 100).toFixed(1);
                    return (
                        <div
                            className="branch-card"
                            key={branch.id}
                        >
                            <div className="branch-card-header">
                                <h4>{branch.name}</h4>
                                <span className="branch-abbr">
                                    {branch.shortName}
                                </span>
                            </div>

                            <div className="branch-stats">
                                <div className="branch-stat">
                                    <span className="label">Total Students</span>
                                    <span className="value">{branch.totalStudents}</span>
                                </div>
                                <div className="branch-stat">
                                    <span className="label">Placed</span>
                                    <span className="value">
                                        {branch.placed}
                                    </span>
                                </div>
                                <div className="branch-stat">
                                    <span className="label">Avg Package</span>
                                    <span className="value">₹{branch.avgPackage}L</span>
                                </div>
                                <div className="branch-stat">
                                    <span className="label">Highest</span>
                                    <span className="value">
                                        ₹{branch.highestPackage}L
                                    </span>
                                </div>
                            </div>

                            <div className="placement-progress" style={{ marginTop: '16px' }}>
                                <p style={{ margin: 0 }}>
                                    <strong>Placement Rate:</strong> {pct}%
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="charts-row">
                <div className="chart-card">
                    <h4>Placement % by Branch</h4>
                    <ul>
                        {branches
                            .sort(
                                (a, b) =>
                                    b.placed / b.totalStudents - a.placed / a.totalStudents
                            )
                            .map((branch) => {
                                const pct = ((branch.placed / branch.totalStudents) * 100).toFixed(1);
                                return (
                                    <li key={branch.id} style={{ marginBottom: '8px' }}>
                                        <strong>{branch.shortName}:</strong> {pct}%
                                    </li>
                                );
                            })}
                    </ul>
                </div>

                <div className="chart-card">
                    <h4>Average CTC by Branch (in LPA)</h4>
                    <ul>
                        {[...branches]
                            .sort((a, b) => b.avgPackage - a.avgPackage)
                            .map((branch) => (
                                <li key={branch.id} style={{ marginBottom: '8px' }}>
                                    <strong>{branch.shortName}:</strong> ₹{branch.avgPackage}L
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}